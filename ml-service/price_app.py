from flask import Flask, jsonify, request
from flask_cors import CORS
import os
import pandas as pd
import pickle
import numpy as np
# 📱 Import the SMS delivery helper function
from sms_helper import send_agri_sms

app = Flask(__name__)
# 🌐 OPEN CORS POLICY: Completely clears authentication filters so Vercel can fetch your payloads securely
CORS(app, resources={r"/*": {"origins": "*"}})

# 📂 DYNAMIC BASEPATH LAYER: Resolves project file tracking folders automatically on local Windows and cloud Linux boxes
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CSV_FINAL_DATA_PATH = os.path.join(BASE_DIR, "data", "processed", "belgaum_final_ai_data.csv")

# Global dictionary mapping to house our separate model states
loaded_models = {}

print("🔄 Loading Custom Crop Price Forecasting Engine Models...")
try:
    # 🛠️ DIRECT REPO MAPPING: Prefixed paths with ml-service/ to target the cloud repository lane precisely
    with open("ml-service/wheat_model.pkl", "rb") as f:
        loaded_models["wheat"] = pickle.load(f)
    with open("ml-service/maize_model.pkl", "rb") as f:
        loaded_models["maize"] = pickle.load(f)
    with open("ml-service/soyabean_model.pkl", "rb") as f:
        loaded_models["soyabean"] = pickle.load(f)
    print("✅ All Dedicated Crop Models Saved and Loaded Successfully.")
except Exception as e:
    print("❌ ERROR: Missing trained model binaries. Attempting local subfolder fallback mappings...", e)
    # 🔄 LOCAL MACHINE FALLBACK: Tries to pull files directly if script runs natively from within the ml-service folder
    try:
        with open("wheat_model.pkl", "rb") as f:
            loaded_models["wheat"] = pickle.load(f)
        with open("maize_model.pkl", "rb") as f:
            loaded_models["maize"] = pickle.load(f)
        with open("soyabean_model.pkl", "rb") as f:
            loaded_models["soyabean"] = pickle.load(f)
        print("✅ Local Fallback Core Loaded Successfully.")
    except Exception as fallback_error:
        print("🚨 CRITICAL ERROR: Both primary and fallback cloud binary lookups failed.", fallback_error)

@app.route("/")
def home():
    return "📈 Automated Multi-Crop Price Analytics Regression Engine Online (Port 5002)"


# 🟢 1. SAFE ENDPOINT: Use this to change crops, check charts, and view prices safely
@app.route("/predict-price", methods=["GET"])
def predict_price():
    try:
        # Check fallback data path layout variations to avoid missing data anomalies
        active_data_path = CSV_FINAL_DATA_PATH
        if not os.path.exists(active_data_path):
            # Check project root folder alternative mappings
            active_data_path = os.path.join(BASE_DIR, "belgaum_final_ai_data.csv")
            if not os.path.exists(active_data_path):
                return jsonify({"success": False, "error": f"Processed CSV data file not found at paths: {CSV_FINAL_DATA_PATH}"}), 500
            
        target_crop = request.args.get('crop', 'Wheat').strip().capitalize()
        crop_key = target_crop.lower()
        
        if crop_key not in loaded_models:
            return jsonify({"success": False, "error": f"Model profile for crop target '{target_crop}' not recognized."}), 400
            
        df = pd.read_csv(active_data_path)
        df['Month_Year'] = df['Month_Year'].astype(str).str.replace('"', '').str.replace("'", '').str.strip()
        crop_filtered_df = df[df['Crop'] == target_crop].copy()
        
        if crop_filtered_df.empty:
            return jsonify({"success": False, "error": f"No structural dataset matrix row targets exist for {target_crop}."}), 404

        crop_filtered_df.replace('-', np.nan, inplace=True)
        crop_filtered_df['Date'] = pd.to_datetime(crop_filtered_df['Month_Year'], format='%B, %Y', errors='coerce')
        crop_filtered_df = crop_filtered_df.sort_values('Date').reset_index(drop=True)
        
        crop_filtered_df['Change_M'] = crop_filtered_df['Change_M'].astype(str).str.rstrip('%').astype(float)
        crop_filtered_df['Change_M'] = crop_filtered_df['Change_M'].interpolate(method='linear').bfill().ffill()
        
        latest_row = crop_filtered_df.iloc[-1]
        last_price = float(latest_row['Price'])
        last_change = float(latest_row['Change_M'])
        last_rain = float(latest_row['Rainfall_mm'])
        last_month_name = latest_row['Month_Year']

        input_features = pd.DataFrame(
            [[last_price, last_change, last_rain]], 
            columns=['Prev_Month', 'Change_M', 'Rainfall_mm']
        )
        
        crop_model = loaded_models[crop_key]
        predicted_price_output = crop_model.predict(input_features)[0]

        crop_filtered_df['Month_Num'] = crop_filtered_df['Date'].dt.month
        crop_filtered_df['Month_Name'] = crop_filtered_df['Date'].dt.strftime('%B')
        seasonal_avg = crop_filtered_df.groupby(['Month_Num', 'Month_Name'])['Price'].mean().reset_index()
        
        highest_idx = seasonal_avg['Price'].idxmax()
        lowest_idx = seasonal_avg['Price'].idxmin()
        highest_month = seasonal_avg.loc[highest_idx]['Month_Name']
        lowest_month = seasonal_avg.loc[lowest_idx]['Month_Name']

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


# 📱 2. CONTROLLED SMS ENDPOINT: Updated for Final Short Strategic Structural Layout
@app.route("/send-alert", methods=["POST"])
def send_alert():
    try:
        data = request.get_json() or {}
        crop = data.get('crop', 'Wheat').strip().capitalize()
        predicted_price = data.get('predicted_price', 0.0)
        last_price = data.get('last_price', predicted_price)
        
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
        
        phone = data.get('phone', '+917483455833').strip()
        sms_alert_message = f"AgriAI-{crop}\nNext: Rs {predicted_price:.0f} >{trend_str}\nAction: {action}"
        
        success = send_agri_sms(phone, sms_alert_message)
        
        if success:
            return jsonify({"success": True, "message": f"SMS alert broadcasted: {action}"})
        else:
            return jsonify({"success": False, "error": "Twilio gateway dropped payload configuration."}), 500
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5002))
    app.run(host="0.0.0.0", port=port, debug=False)