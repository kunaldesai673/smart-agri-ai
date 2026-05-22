import pandas as pd
from datetime import datetime
import meteostat as ms
import os

# 1. Define the Time Period
start = datetime(2022, 1, 1)
end = datetime.now()

print("🌐 Connecting to Meteostat Station: 43197 (Belgaum)...")

try:
    # 2. Directly target the Belgaum Station by its ID
    # This is more reliable than using Latitude/Longitude
    data = ms.monthly('43197', start, end)
    df = data.fetch()

    # 3. Handle the case where 'df' might be None
    if df is None:
        print("⚠️ Direct station data unavailable. Searching for any nearby data...")
        # Fallback: Search for any station within 50km
        stations = ms.stations().nearby(15.85, 74.50)
        station = stations.fetch(1)
        data = ms.monthly(station, start, end)
        df = data.fetch()

    if df is not None and not df.empty:
        # 4. Clean and Format
        weather_df = df.reset_index()
        # Newer versions of Meteostat use 'time' as the index name
        weather_df = weather_df[['time', 'prcp']]
        weather_df.columns = ['Date', 'Rainfall_mm']
        
        # Format date to match your price CSV (e.g., "February 2023")
        weather_df['Month_Year'] = weather_df['Date'].dt.strftime('%B %Y')

        # 5. Save using Absolute Path
        OUTPUT_PATH = r'C:\Users\kunal desai\smart-agri-ai\data\processed\belgaum_rainfall.csv'
        os.makedirs(os.path.dirname(OUTPUT_PATH), exist_ok=True)
        
        weather_df[['Month_Year', 'Rainfall_mm']].to_csv(OUTPUT_PATH, index=False)
        
        print(f"✅ Success! Weather data saved to: {OUTPUT_PATH}")
        print("\n--- Preview of Weather Data ---")
        print(weather_df[['Month_Year', 'Rainfall_mm']].head())
    else:
        print("❌ No data could be retrieved. The Meteostat server might be down.")

except Exception as e:
    print(f"❌ Error during fetch: {e}")