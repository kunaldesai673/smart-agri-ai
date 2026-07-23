import pandas as pd
import os

# 1. Define the paths
PRICE_FILE = r'C:\Users\kunal desai\smart-agri-ai\data\processed\belgaum_master.csv'
RAIN_FILE = r'C:\Users\kunal desai\smart-agri-ai\data\processed\belgaum_rainfall.csv'
OUTPUT_FILE = r'C:\Users\kunal desai\smart-agri-ai\data\processed\belgaum_final_ai_data.csv'

# 2. Check if files exist
if not os.path.exists(PRICE_FILE) or not os.path.exists(RAIN_FILE):
    print("❌ Error: One of the source files is missing.")
    exit()

print("📖 Loading datasets...")
df_price = pd.read_csv(PRICE_FILE)
df_rain = pd.read_csv(RAIN_FILE)

# 3. Clean Month_Year strings in both dataframes for a flawless match
df_price['Clean_Month'] = df_price['Month_Year'].astype(str).str.replace('"', '').str.replace(',', '').str.strip().str.lower()
df_rain['Clean_Month'] = df_rain['Month_Year'].astype(str).str.replace('"', '').str.replace(',', '').str.strip().str.lower()

# 4. Drop any old rainfall columns in price data to prevent conflicts
for col in ['Rainfall_mm', 'Rainfall', 'rain']:
    if col in df_price.columns:
        df_price.drop(columns=[col], inplace=True)

# 5. Create a lookup dictionary from the weather file
rain_mapping = dict(zip(df_rain['Clean_Month'], df_rain['Rainfall_mm']))

# 6. Map rainfall directly into the master price dataframe (Preserves all crops!)
df_price['Rainfall_mm'] = df_price['Clean_Month'].map(rain_mapping)

# 7. Clean up temp columns and fill missing rainfall with 0.0
df_price.drop(columns=['Clean_Month'], inplace=True)
df_price['Rainfall_mm'] = pd.to_numeric(df_price['Rainfall_mm'], errors='coerce').fillna(0.0)

# 8. Save the final multi-crop AI-ready dataset
os.makedirs(os.path.dirname(OUTPUT_FILE), exist_ok=True)
df_price.to_csv(OUTPUT_FILE, index=False)

print(f"✅ Success! Multi-crop dataset created at: {OUTPUT_FILE}")
print(f"📊 Total Rows in Final Dataset: {len(df_price)}")
print("\n--- Preview of Crops & Rainfall ---")
print(df_price[['Month_Year', 'Crop', 'Price', 'Rainfall_mm']].head(10))