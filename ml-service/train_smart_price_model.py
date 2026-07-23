import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error, mean_absolute_percentage_error
import pickle
import os

# 1. Load the merged multi-crop dataset
FILE_PATH = r'C:\Users\kunal desai\smart-agri-ai\data\processed\belgaum_final_ai_data.csv'

# Local fallback if absolute path isn't found
if not os.path.exists(FILE_PATH):
    FILE_PATH = 'belgaum_final_ai_data.csv'

if not os.path.exists(FILE_PATH):
    print(f"❌ Error: Dataset file not found at {FILE_PATH}")
    exit()

df = pd.read_csv(FILE_PATH)
print(f"📂 Successfully loaded {len(df)} records.")

# Clean date string formatting and convert to datetime objects
df['Month_Year'] = df['Month_Year'].astype(str).str.replace('"', '').str.strip()
df['Date'] = pd.to_datetime(df['Month_Year'], format='%B, %Y', errors='coerce')

# Fallback parser if comma formatting varies
if df['Date'].isna().any():
    df['Date'] = pd.to_datetime(df['Month_Year'], errors='coerce')

df = df.sort_values(['Crop', 'Date']).reset_index(drop=True)

# 2. Clean numeric formatting across all columns
df.replace('-', np.nan, inplace=True)

for col in ['Price', 'Prev_Month', 'Rainfall_mm']:
    if col in df.columns:
        df[col] = pd.to_numeric(
            df[col].astype(str).str.replace(',', '').str.strip(), 
            errors='coerce'
        )

for col in ['Change_M', 'Change_Y']:
    if col in df.columns:
        df[col] = pd.to_numeric(
            df[col].astype(str).str.rstrip('%').str.replace('+', '', regex=False).str.strip(), 
            errors='coerce'
        )

# 3. Process and train separate models for each crop
crops = df['Crop'].unique()

print("\n==========================================================")
print(f"🚀 TRAINING DEDICATED SMART BRAINS FOR {len(crops)} CROPS")
print(f"🌱 Registered Crops: {', '.join(crops)}")
print("==========================================================")

for crop in crops:
    print(f"\n🚜 Training Smart Model for: {crop.upper()}...")
    
    # Filter dataset for specific crop
    crop_df = df[df['Crop'] == crop].copy().sort_values('Date').reset_index(drop=True)
    
    # Interpolate missing historical points
    crop_df['Prev_Month'] = crop_df['Prev_Month'].interpolate(method='linear').bfill().ffill()
    crop_df['Change_M'] = crop_df['Change_M'].interpolate(method='linear').bfill().ffill()
    crop_df['Rainfall_mm'] = crop_df['Rainfall_mm'].fillna(0.0)
    crop_df['Price'] = crop_df['Price'].interpolate(method='linear').bfill().ffill()
    
    # 4. Inputs (X) and Target (y)
    X = crop_df[['Prev_Month', 'Change_M', 'Rainfall_mm']]
    y = crop_df['Price']
    
    # Split into train/test to evaluate model performance
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.15, random_state=42, shuffle=False)
    
    # 5. Train Random Forest Model
    model = RandomForestRegressor(n_estimators=150, max_depth=10, random_state=42)
    model.fit(X_train, y_train)
    
    # Evaluate model accuracy
    preds = model.predict(X_test)
    mae = mean_absolute_error(y_test, preds)
    mape = mean_absolute_percentage_error(y_test, preds) * 100
    
    print(f"   📊 Accuracy: {100 - mape:.2f}% | Avg Error (MAE): Rs. {mae:.2f}")
    
    # Re-fit on full crop dataset before saving for production deployment
    model.fit(X, y)
    
    # 6. Save crop-specific pickle file
    model_filename = f"{crop.lower().strip()}_model.pkl"
    with open(model_filename, 'wb') as f:
        pickle.dump(model, f)
        
    print(f"   💾 Saved successfully as '{model_filename}'")
    
    # 7. Next Month Forecast Check
    last_row = crop_df.iloc[-1]
    last_price = float(last_row['Price'])
    last_change = float(last_row['Change_M'])
    last_rain = float(last_row['Rainfall_mm'])
    
    # Predict next month using current month's price as new Prev_Month
    sample_pred = model.predict([[last_price, last_change, last_rain]])[0]
    diff = sample_pred - last_price
    direction = "📈 UP" if diff >= 0 else "📉 DOWN"
    
    print(f"   🔮 AI Forecast for Next Month: Rs. {sample_pred:.2f} ({direction} by Rs. {abs(diff):.2f})")
    print("----------------------------------------------------------")

print("\n🚀 ALL 6 INDIVIDUAL CROP MODELS SUCCESSFULLY TRAINED & SAVED!")
print("==========================================================")