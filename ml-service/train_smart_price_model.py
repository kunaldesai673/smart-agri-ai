import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor
import pickle
import os

# 1. Load the merged multi-crop data we created
FILE_PATH = r'C:\Users\kunal desai\smart-agri-ai\data\processed\belgaum_final_ai_data.csv'

if not os.path.exists(FILE_PATH):
    print(f"❌ Error: Dataset file not found at {FILE_PATH}")
    exit()

df = pd.read_csv(FILE_PATH)

# Clean up raw text quotes or spaces from formatting loops
df['Month_Year'] = df['Month_Year'].astype(str).str.replace('"', '').str.strip()

# 2. Sort by date properly so the sequence is chronologically ordered
df['Date'] = pd.to_datetime(df['Month_Year'], format='%B, %Y', errors='coerce')
df = df.sort_values('Date').reset_index(drop=True)

# Replace any data text dashes '-' with NaN and convert percentage strings to numeric floats
df.replace('-', np.nan, inplace=True)
for col in ['Change_M', 'Change_Y']:
    if col in df.columns:
        df[col] = df[col].astype(str).str.rstrip('%').astype(float)

# 3. Process and train models separately for each crop type
crops = df['Crop'].unique()

print("\n==============================================")
# Loop over each crop ('Wheat', 'Maize')
for crop in crops:
    print(f"🚜 Training Smart Brain for: {crop.upper()}...")
    
    # Filter out entries just for this specific crop
    crop_df = df[df['Crop'] == crop].copy()
    
    # Handle missing values inside this specific crop profile cleanly using linear interpolation
    crop_df['Change_M'] = crop_df['Change_M'].interpolate(method='linear').bfill().ffill()
    crop_df['Prev_Month'] = crop_df['Prev_Month'].astype(float).interpolate(method='linear').bfill().ffill()
    crop_df['Price'] = crop_df['Price'].astype(float)
    
    # 4. Define our Inputs (X) and Target variable (y)
    # Using the exact clean features we aggregated together
    X = crop_df[['Prev_Month', 'Change_M', 'Rainfall_mm']]
    y = crop_df['Price']
    
    # 5. Train the Random Forest Model
    model = RandomForestRegressor(n_estimators=100, random_state=42)
    model.fit(X, y)
    
    # 6. Save the new dedicated crop brain file
    model_filename = f'{crop.lower()}_model.pkl'
    with open(model_filename, 'wb') as f:
        pickle.dump(model, f)
        
    print(f"💾 Saved successfully as '{model_filename}'")
    
    # 7. Test sample visualization output for confirmation
    last_row = crop_df.iloc[-1]
    last_price = float(last_row['Price'])
    last_change = float(last_row['Change_M'])
    last_rain = float(last_row['Rainfall_mm'])
    
    sample_pred = model.predict([[last_price, last_change, last_rain]])[0]
    print(f"🔮 AI Sample Prediction for next month: Rs.{sample_pred:.2f}")
    print("----------------------------------------------")

print("🚀 ALL SMART AI CROPS TRAINING COMPLETE!")
print("==============================================")