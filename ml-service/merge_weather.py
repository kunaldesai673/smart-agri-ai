import pandas as pd
import os

# 1. Define the paths
PRICE_FILE = r'C:\Users\kunal desai\smart-agri-ai\data\processed\belgaum_master.csv'
RAIN_FILE = r'C:\Users\kunal desai\smart-agri-ai\data\processed\belgaum_rainfall.csv'
OUTPUT_FILE = r'C:\Users\kunal desai\smart-agri-ai\data\processed\belgaum_final_ai_data.csv'

# 2. Check if the files exist
if not os.path.exists(PRICE_FILE) or not os.path.exists(RAIN_FILE):
    print("❌ Error: One of the source files is missing. Please check your data/processed folder.")
    exit()

# 3. Load the datasets
print("📖 Loading datasets...")
df_price = pd.read_csv(PRICE_FILE)
df_rain = pd.read_csv(RAIN_FILE)

# 4. Clean Date Strings (Ensures perfect matching)
# Removes extra quotes, commas, and spaces like ' May, 2026",,'
df_price['Month_Year'] = df_price['Month_Year'].str.replace('"', '').str.replace(',', '').str.strip()
df_rain['Month_Year'] = df_rain['Month_Year'].str.strip()

# 5. Merge the data
# We use an 'inner' join to keep only months where we have BOTH price and rainfall
df_final = pd.merge(df_price, df_rain, on='Month_Year', how='inner')

# 6. Final Clean: Convert Rainfall to numeric and fill <NA> with 0
df_final['Rainfall_mm'] = pd.to_numeric(df_final['Rainfall_mm'], errors='coerce').fillna(0)

# 7. Save the final AI-ready dataset
df_final.to_csv(OUTPUT_FILE, index=False)

print(f"✅ Success! Final dataset created at: {OUTPUT_FILE}")
print("\n--- Preview of Final AI Data (Price + Rainfall) ---")
print(df_final[['Month_Year', 'Crop', 'Price', 'Rainfall_mm']].head())