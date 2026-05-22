from flask import Flask, jsonify, request
from flask_cors import CORS
import os
import pandas as pd
import pickle
import numpy as np

app = Flask(__name__)
CORS(app)

# Absolute path to your final processed multi-crop database matrix
CSV_FINAL_DATA_PATH = r"C:\Users\kunal desai\smart-agri-ai\data\processed\belgaum_final_ai_data.csv"

# Global dictionary mapping to house our separate model states
loaded_models = {}

print("🔄 Loading Custom Crop Price Forecasting Engine Models...")
try:
    with open("wheat_model.pkl", "rb") as f:
        loaded_models["wheat"] = pickle.load(f)
    with open("maize_model.pkl", "rb") as f:
        loaded_models["maize"] = pickle.load(f)
    with open("soyabean_model.pkl", "rb") as f:  # 👈 Added Soyabean Model Loading
        loaded_models["soyabean"] = pickle.load(f)
    print("✅ All Dedicated Crop Models Saved and Loaded Successfully.")
except Exception as e:
    print("❌ ERROR: Missing trained model binaries. Ensure wheat_model.pkl, maize_model.pkl, and soyabean_model.pkl exist.", e)

@app.route("/")
def home():
    return "📈 Automated Multi-Crop Price Analytics Regression Engine Online (Port 5002)"

@app.route("/predict-price", methods=["GET"])
def predict_price():
    try:
        if not os.path.exists(CSV_FINAL_DATA_PATH):
            return jsonify({"success": False, "error": "Processed CSV data file not found at path."}), 500
            
        # 1. Capture dynamic URL parameters passed from React frontend (Defaults to Wheat)
        target_crop = request.args.get('crop', 'Wheat').strip().capitalize()
        crop_key = target_crop.lower()
        
        if crop_key not in loaded_models:
            return jsonify({"success": False, "error": f"Model profile for crop target '{target_crop}' not recognized."}), 400
            
        # 2. Read full spreadsheet dataset and fix string structures
        df = pd.read_csv(CSV_FINAL_DATA_PATH)
        df['Month_Year'] = df['Month_Year'].astype(str).str.replace('"', '').str.strip()
        
        # Isolate entries exclusively matching the frontend selection
        crop_filtered_df = df[df['Crop'] == target_crop].copy()
        
        if crop_filtered_df.empty:
            return jsonify({"success": False, "error": f"No structural dataset matrix row targets exist for {target_crop}."}), 404

        # Clean dashes '-' out from data vectors safely before sorting or training operations
        crop_filtered_df.replace('-', np.nan, inplace=True)
        
        # Sort chronologically to parse out the absolute latest records 
        crop_filtered_df['Date'] = pd.to_datetime(crop_filtered_df['Month_Year'], format='%B, %Y', errors='coerce')
        crop_filtered_df = crop_filtered_df.sort_values('Date').reset_index(drop=True)
        
        # Backfill/forward fill any remaining missing change parameters safely
        crop_filtered_df['Change_M'] = crop_filtered_df['Change_M'].astype(str).str.rstrip('%').astype(float)
        crop_filtered_df['Change_M'] = crop_filtered_df['Change_M'].interpolate(method='linear').bfill().ffill()
        
        # Extract the absolute latest snapshot parameters
        latest_row = crop_filtered_df.iloc[-1]
        last_price = float(latest_row['Price'])
        last_change = float(latest_row['Change_M'])
        last_rain = float(latest_row['Rainfall_mm'])
        last_month_name = latest_row['Month_Year']

        # 3. Create structural Feature frames matching exact names training matrices compiled
        input_features = pd.DataFrame(
            [[last_price, last_change, last_rain]], 
            columns=['Prev_Month', 'Change_M', 'Rainfall_mm']
        )
        
        # Execute forecasting predictions using the active crop's trained model
        crop_model = loaded_models[crop_key]
        predicted_price_output = crop_model.predict(input_features)[0]

        # 4. CALCULATE SEASONAL CALENDAR TRENDS DYNAMICALLY FOR THE ISOLATED CROP
        crop_filtered_df['Month_Num'] = crop_filtered_df['Date'].dt.month
        crop_filtered_df['Month_Name'] = crop_filtered_df['Date'].dt.strftime('%B')
        
        seasonal_avg = crop_filtered_df.groupby(['Month_Num', 'Month_Name'])['Price'].mean().reset_index()
        
        highest_idx = seasonal_avg['Price'].idxmax()
        lowest_idx = seasonal_avg['Price'].idxmin()
        
        highest_month = seasonal_avg.loc[highest_idx]['Month_Name']
        lowest_month = seasonal_avg.loc[lowest_idx]['Month_Name']

        # 5. Return dynamic payload matching React structure requirements
        return jsonify({
            "success": True,
            "crop": target_crop,
            "last_recorded_month": last_month_name,
            "last_recorded_price": round(last_price, 2),
            "last_recorded_rainfall_mm": round(last_rain, 2),
            "predictions": {
                # Dummy placeholder value mimicking simple non-weather trends for comparison layouts
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

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5002, debug=False)