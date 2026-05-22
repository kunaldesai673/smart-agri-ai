import pandas as pd
import pickle
import os

# Path to our unified dataset
DATA_PATH = r'C:\Users\kunal desai\smart-agri-ai\data\processed\belgaum_final_ai_data.csv'

def run_predictor():
    print("\n==============================================")
    print("🌾 BELGAUM SMART AGRI: AUTOMATED PREDICTOR 🌾")
    print("==============================================")

    # 1. Ensure dataset exists
    if not os.path.exists(DATA_PATH):
        print(f"❌ Error: Dataset not found at {DATA_PATH}!")
        return

    df = pd.read_csv(DATA_PATH)
    df['Month_Year'] = df['Month_Year'].astype(str).str.replace('"', '').str.strip()

    # 2. Get Crop Choice from user
    print("Select Crop for Automatic Forecasting:")
    print("1. Wheat")
    print("2. Maize")
    crop_choice = input("👉 Enter choice (1 or 2): ").strip()

    if crop_choice == '1':
        crop_name = 'Wheat'
    elif crop_choice == '2':
        crop_name = 'Maize'
    else:
        print("❌ Invalid selection! Please choose 1 or 2.")
        return

    # 3. Check for the corresponding trained crop model
    model_path = f'{crop_name.lower()}_model.pkl'
    if not os.path.exists(model_path):
        print(f"❌ Error: {model_path} not found! Run train_smart_price_model.py first.")
        return

    with open(model_path, 'rb') as f:
        model = pickle.load(f)

    # 4. AUTOMATICALLY extract the most recent month data for this specific crop
    crop_df = df[df['Crop'] == crop_name].copy()
    
    if crop_df.empty:
        print(f"❌ Error: No records found for {crop_name} in your CSV file.")
        return

    # Sort to ensure we pick the absolute latest record in sequence
    crop_df['Date'] = pd.to_datetime(crop_df['Month_Year'], format='%B, %Y', errors='coerce')
    crop_df = crop_df.sort_values('Date').reset_index(drop=True)
    
    # Grab the absolute last row (most recent data entry)
    latest_record = crop_df.iloc[-1]
    
    # Extract historical parameters automatically from the dataset
    curr_p = float(latest_record['Price'])
    # Handle possible empty text dashes '-' safely
    change_m = 0.0 if str(latest_record['Change_M']) == '-' else float(str(latest_record['Change_M']).rstrip('%'))
    curr_r = float(latest_record['Rainfall_mm'])
    as_of_date = latest_record['Month_Year']

    print(f"\n📂 [AUTO-LOAD] Successfully retrieved latest dataset parameters:")
    print(f"🗓️ Data Month: {as_of_date}")
    print(f"💰 Baseline Price: Rs. {curr_p:.2f}/Quintal")
    print(f"📈 Current MoM Trend: {change_m}%")
    print(f"🌧️ Recorded Rainfall: {curr_r} mm")

    # 5. Build features dynamically and run calculation
    # Using named DataFrame columns to cleanly avoid the previous 'UserWarning'
    input_df = pd.DataFrame([[curr_p, change_m, curr_r]], 
                            columns=['Prev_Month', 'Change_M', 'Rainfall_mm'])

    prediction = model.predict(input_df)[0]

    # 6. Output Final Summary Report
    print(f"\n--- AI ANALYSIS REPORT FOR {crop_name.upper()} ---")
    print(f"📅 Forecasted Price for next sequence: Rs. {prediction:.2f}")
    
    diff = prediction - curr_p
    
    if diff > 0:
        print(f"✅ TREND: Prices are expected to RISE by Rs. {abs(diff):.2f}")
        print("📢 ADVICE: Hold your stock if possible for higher profits next month.")
    else:
        print(f"⚠️ TREND: Prices are expected to DROP by Rs. {abs(diff):.2f}")
        print("📢 ADVICE: Consider selling your produce now to avoid losses.")

if __name__ == "__main__":
    run_predictor()