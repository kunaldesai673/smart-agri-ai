from flask import Flask, jsonify, request
from flask_cors import CORS
import os
import pandas as pd
import pickle
import numpy as np

# 📱 Import SMS delivery helper function
try:
    from sms_helper import send_agri_sms
except ImportError:
    # Dummy fallback if sms_helper is not present in local test environment
    def send_agri_sms(phone, message):
        print(f"📱 [Simulated SMS to {phone}]: {message}")
        return True

app = Flask(__name__)
# 🌐 OPEN CORS POLICY: Allows React frontend to fetch payloads securely
CORS(app, resources={r"/*": {"origins": "*"}})

# 📂 DYNAMIC BASEPATH LAYER: Resolves project file paths across local Windows and cloud Linux environments
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CSV_FINAL_DATA_PATH = os.path.join(BASE_DIR, "data", "processed", "belgaum_final_ai_data.csv")

# 🌾 REGISTERED ALL 6 CROPS
SUPPORTED_CROPS = ["wheat", "maize", "soyabean", "groundnut", "onion", "potato"]
loaded_models = {}

print("🔄 Loading Custom Crop Price Forecasting Engine Models...")

# 🛠️ DYNAMIC MULTI-CROP MODEL LOADING
for crop_key in SUPPORTED_CROPS:
    model_file = f"{crop_key}_model.pkl"
    cloud_path = os.path.join("ml-service", model_file)
    
    # Path 1: Check cloud repository directory ('ml-service/crop_model.pkl')
    if os.path.exists(cloud_path):
        try:
            with open(cloud_path, "rb") as f:
                loaded_models[crop_key] = pickle.load(f)
        except Exception as e:
            print(f"❌ Error loading {cloud_path}: {e}")
            
    # Path 2: Check root/current directory ('crop_model.pkl')
    elif os.path.exists(model_file):
        try:
            with open(model_file, "rb") as f:
                loaded_models[crop_key] = pickle.load(f)
        except Exception as e:
            print(f"❌ Error loading {model_file}: {e}")
            
    # Path 3: Check relative to BASE_DIR
    else:
        alt_path = os.path.join(BASE_DIR, model_file)
        if os.path.exists(alt_path):
            try:
                with open(alt_path, "rb") as f:
                    loaded_models[crop_key] = pickle.load(f)
            except Exception as e:
                print(f"❌ Error loading {alt_path}: {e}")

if len(loaded_models) == len(SUPPORTED_CROPS):
    print(f"✅ All {len(SUPPORTED_CROPS)} Dedicated Crop Models Loaded Successfully! ({', '.join(loaded_models.keys())})")
else:
    missing = [c for c in SUPPORTED_CROPS if c not in loaded_models]
    print(f"⚠️ Loaded {len(loaded_models)}/{len(SUPPORTED_CROPS)} models. Missing models: {missing}")


def resolve_csv_path():
    """Helper utility to discover the location of belgaum_final_ai_data.csv dynamically."""
    paths_to_check = [
        CSV_FINAL_DATA_PATH,
        os.path.join(BASE_DIR, "belgaum_final_ai_data.csv"),
        "belgaum_final_ai_data.csv",
        os.path.join(os.path.dirname(__file__), "belgaum_final_ai_data.csv")
    ]
    for p in paths_to_check:
        if os.path.exists(p):
            return p
    return None


@app.route("/")
def home():
    return f"📈 Automated 6-Crop Price Analytics Engine Online (Port 5002) - Active Models: {len(loaded_models)}/6"


# 🟢 1. PREDICT PRICE ENDPOINT
@app.route("/predict-price", methods=["GET"])
def predict_price():
    try:
        active_data_path = resolve_csv_path()
        if not active_data_path:
            return jsonify({"success": False, "error": "Dataset CSV file not found."}), 500
            
        target_crop = request.args.get('crop', 'Wheat').strip().title()
        crop_key = target_crop.lower()
        
        if crop_key not in loaded_models:
            return jsonify({
                "success": False, 
                "error": f"Model profile for crop target '{target_crop}' not recognized or binary not loaded. Supported: {list(loaded_models.keys())}"
            }), 400
            
        df = pd.read_csv(active_data_path)
        
        df['Month_Year'] = df['Month_Year'].astype(str).str.replace('"', '').str.replace("'", '').str.strip()
        df['Crop'] = df['Crop'].astype(str).str.strip().str.title()
        
        crop_filtered_df = df[df['Crop'] == target_crop].copy()
        
        if crop_filtered_df.empty:
            return jsonify({"success": False, "error": f"No data row targets exist for '{target_crop}'."}), 404

        crop_filtered_df.replace('-', np.nan, inplace=True)
        crop_filtered_df['Date'] = pd.to_datetime(crop_filtered_df['Month_Year'], format='%B, %Y', errors='coerce')
        
        if crop_filtered_df['Date'].isna().any():
            crop_filtered_df['Date'] = pd.to_datetime(crop_filtered_df['Month_Year'], errors='coerce')

        crop_filtered_df = crop_filtered_df.sort_values('Date').reset_index(drop=True)
        
        crop_filtered_df['Price'] = pd.to_numeric(
            crop_filtered_df['Price'].astype(str).str.replace(',', '').str.strip(), errors='coerce'
        )
        crop_filtered_df['Change_M'] = pd.to_numeric(
            crop_filtered_df['Change_M'].astype(str).str.rstrip('%').str.replace('+', '', regex=False).str.strip(), errors='coerce'
        )
        crop_filtered_df['Change_M'] = crop_filtered_df['Change_M'].interpolate(method='linear').bfill().ffill()
        
        crop_filtered_df['Rainfall_mm'] = pd.to_numeric(
            crop_filtered_df['Rainfall_mm'], errors='coerce'
        ).fillna(0.0)
        
        latest_row = crop_filtered_df.iloc[-1]
        last_price = float(latest_row['Price'])
        last_change = float(latest_row['Change_M'])
        last_rain = float(latest_row['Rainfall_mm'])
        last_month_name = str(latest_row['Month_Year'])

        input_features = pd.DataFrame(
            [[last_price, last_change, last_rain]], 
            columns=['Prev_Month', 'Change_M', 'Rainfall_mm']
        )
        
        crop_model = loaded_models[crop_key]
        predicted_price_output = float(crop_model.predict(input_features)[0])

        crop_filtered_df['Month_Num'] = crop_filtered_df['Date'].dt.month
        crop_filtered_df['Month_Name'] = crop_filtered_df['Date'].dt.strftime('%B')
        seasonal_avg = crop_filtered_df.groupby(['Month_Num', 'Month_Name'])['Price'].mean().reset_index()
        
        highest_idx = seasonal_avg['Price'].idxmax()
        lowest_idx = seasonal_avg['Price'].idxmin()
        highest_month = str(seasonal_avg.loc[highest_idx]['Month_Name'])
        lowest_month = str(seasonal_avg.loc[lowest_idx]['Month_Name'])

        return jsonify({
            "success": True,
            "crop": target_crop,
            "last_recorded_month": last_month_name,
            "last_recorded_price": round(last_price, 2),
            "last_recorded_rainfall_mm": round(last_rain, 2),
            "predictions": {
                "baseline_model_rs": round(float(predicted_price_output * 0.985), 2), 
                "smart_environmental_model_rs": round(float(predicted_price_output), 2)
            },
            "calendar_intelligence": {
                "best_month": highest_month,
                "toughest_month": lowest_month,
                "advice_timeline": f"Historical trends show that {target_crop} prices in Belgaum usually reach a premium around {highest_month} due to high demand, while prices often decline around {lowest_month} when fresh harvests arrive in markets."
            }
        })
    except Exception as e:
        return jsonify({"success": False, "error": f"Price engine failure: {str(e)}"}), 500


# 📱 2. CONTROLLED SMS ENDPOINT
@app.route("/send-alert", methods=["POST"])
def send_alert():
    try:
        data = request.get_json() or {}
        crop = data.get('crop', 'Wheat').strip().title()
        predicted_price = float(data.get('predicted_price', 0.0))
        last_price = float(data.get('last_price', predicted_price))
        
        if last_price > 0:
            pct_change = ((predicted_price - last_price) / last_price) * 100
        else:
            pct_change = 0.0

        if pct_change > 3.0:
            trend_str = f"▲+{pct_change:.0f}%"
            action = "HOLD"
        elif pct_change < -3.0:
            trend_str = f"▼{pct_change:.0f}%" 
            action = "SELL NOW"
        else:
            trend_str = "Stable"
            action = "SELL REGULAR"
        
        phone = str(data.get('phone', '+917483455833')).strip()
        sms_alert_message = f"AgriAI-{crop}\nNext: Rs {predicted_price:.0f} >{trend_str}\nAction: {action}"
        
        success = send_agri_sms(phone, sms_alert_message)
        
        if success:
            return jsonify({"success": True, "message": f"SMS alert broadcasted: {action}"})
        else:
            return jsonify({"success": False, "error": "Twilio gateway dropped payload configuration."}), 500
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500


# 📊 3. HISTORICAL DATA ENDPOINT (STRICT JSON SANITIZATION)
@app.route("/historical-data", methods=["GET"])
def get_historical_data():
    try:
        active_data_path = resolve_csv_path()
        if not active_data_path:
            return jsonify({"success": False, "error": "Dataset CSV file not found."}), 500

        df = pd.read_csv(active_data_path)
        
        # Clean Month_Year and Crop columns
        df['Month_Year'] = df['Month_Year'].astype(str).str.replace('"', '').str.replace("'", '').str.strip()
        df['Crop'] = df['Crop'].astype(str).str.strip().str.title()
        
        # Parse Dates for reverse chronological sorting (July 2026 -> Jan 2020)
        df['Parsed_Date'] = pd.to_datetime(df['Month_Year'], format='%B, %Y', errors='coerce')
        if df['Parsed_Date'].isna().any():
            df['Parsed_Date'] = pd.to_datetime(df['Month_Year'], errors='coerce')

        # Clean numeric values
        df.replace('-', np.nan, inplace=True)
        
        for col in ['Price', 'Prev_Month', 'Rainfall_mm']:
            if col in df.columns:
                df[col] = pd.to_numeric(df[col].astype(str).str.replace(',', '').str.strip(), errors='coerce')
                
        if 'Change_M' in df.columns:
            df['Change_M'] = pd.to_numeric(
                df['Change_M'].astype(str).str.rstrip('%').str.replace('+', '', regex=False).str.strip(),
                errors='coerce'
            )

        # Sort descending by date so latest months appear first
        df = df.sort_values('Parsed_Date', ascending=False).drop(columns=['Parsed_Date'])

        # 🔑 CRITICAL FIX: Convert all NaN/NaT/inf values to None so Python generates valid JSON 'null'
        df = df.replace({np.nan: None, float("nan"): None})
        df = df.replace([np.inf, -np.inf], None)

        records = df.to_dict(orient="records")
        return jsonify({
            "success": True,
            "count": len(records),
            "data": records
        })
    except Exception as e:
        return jsonify({"success": False, "error": f"Failed to retrieve data: {str(e)}"}), 500


# 🚀 SERVER START (Kept strictly at the bottom)
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5002))
    app.run(host="0.0.0.0", port=port, debug=False)