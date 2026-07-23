import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error, mean_absolute_percentage_error
import pickle
import json
import os

# 1. Load the cleaned master dataset (6 Crops: Wheat, Maize, Soyabean, Groundnut, Onion, Potato)
FILE_PATH = r'C:\Users\kunal desai\smart-agri-ai\data\processed\belgaum_master.csv'

if not os.path.exists(FILE_PATH):
    # Fallback if path is local to current directory
    FILE_PATH = 'belgaum_crop_prices.csv'

df = pd.read_csv(FILE_PATH)
print(f"📂 Loaded dataset with {len(df)} total rows.")

# 2. Clean Date and Sort chronologically (Critical for Time Series)
df['Month_Year'] = df['Month_Year'].astype(str).str.replace('"', '').str.replace(',', '').str.strip()
df['Date'] = pd.to_datetime(df['Month_Year'], format='%B %Y')
df = df.sort_values(['Crop', 'Date']).reset_index(drop=True)

# Clean numerical columns
df['Price'] = pd.to_numeric(df['Price'], errors='coerce')
df['Rainfall_mm'] = pd.to_numeric(df['Rainfall_mm'], errors='coerce').fillna(0.0)

# --- FEATURE ENGINEERING ---
# Calculate Lag (Previous Month Price) separately per crop to avoid price bleeding across commodities
df['Prev_Month_Price'] = df.groupby('Crop')['Price'].shift(1)
df = df.dropna(subset=['Price', 'Prev_Month_Price']).reset_index(drop=True)

# Convert Crop text categories into numeric codes dynamically for all 6 crops
df['Crop'] = df['Crop'].astype('category')
df['Crop_Encoded'] = df['Crop'].cat.codes

# Create dictionary mapping: {0: 'Groundnut', 1: 'Maize', 2: 'Onion', 3: 'Potato', 4: 'Soyabean', 5: 'Wheat'}
crop_mapping = dict(enumerate(df['Crop'].cat.categories))
print("\n🌱 Registered 6-Crop Index Mappings:")
for code, name in crop_mapping.items():
    print(f"   [{code}] ➔ {name}")

# Save crop mapping so your Flask / FastAPI server uses exact same codes
with open('crop_mapping.pkl', 'wb') as f:
    pickle.dump(crop_mapping, f)

with open('crop_mapping.json', 'w') as f:
    json.dump({v: k for k, v in crop_mapping.items()}, f, indent=2)

# 3. Prepare Feature Matrix (X) and Target Vector (y)
X = df[['Prev_Month_Price', 'Crop_Encoded', 'Rainfall_mm']] 
y = df['Price']             

# Train-Test Split (no shuffle to preserve temporal order)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.15, random_state=42, shuffle=False)

# 4. Train the Multi-Crop Random Forest Model
model = RandomForestRegressor(n_estimators=150, max_depth=12, random_state=42)
model.fit(X_train, y_train)

# 5. Model Evaluation
predictions = model.predict(X_test)
mae = mean_absolute_error(y_test, predictions)
mape = mean_absolute_percentage_error(y_test, predictions) * 100

print(f"\n🤖 AI Model Training Complete!")
print(f"📉 Average Prediction Error (MAE): Rs. {mae:.2f}")
print(f"🎯 Model Accuracy (100 - MAPE): {100 - mape:.2f}%")

# 6. Save the trained model artifact
MODEL_SAVE_PATH = 'smart_price_model.pkl'
with open(MODEL_SAVE_PATH, 'wb') as f:
    pickle.dump(model, f)
print(f"💾 Model saved as '{MODEL_SAVE_PATH}'")

# 7. Sample Predictions across ALL 6 Crops
print("\n🔮 Latest Sample Predictions across All 6 Crops:")
print("=" * 65)

for code, crop_name in crop_mapping.items():
    crop_rows = df[df['Crop'] == crop_name]
    if not crop_rows.empty:
        latest = crop_rows.iloc[-1]
        last_price = float(latest['Price'])
        rain = float(latest['Rainfall_mm'])
        
        pred = model.predict([[last_price, code, rain]])[0]
        diff = pred - last_price
        direction = "📈 UP" if diff >= 0 else "📉 DOWN"
        
        print(f"• {crop_name:<10} | Current: Rs. {last_price:>7.2f} | Predicted: Rs. {pred:>7.2f} ({direction} by Rs. {abs(diff):.2f})")

print("=" * 65)