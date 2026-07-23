import pandas as pd
import requests
import os
from datetime import datetime

print("🌐 Connecting to Open-Meteo Historical Archive for Belgaum Rainfall (2020 - Present)...")

# Belgaum Coordinates
LAT, LON = 15.8497, 74.4977
START_DATE = "2020-01-01"
END_DATE = datetime.now().strftime("%Y-%m-%d")

# Open-Meteo Free Archive API Endpoint for Daily Rain Sums
url = (
    f"https://archive-api.open-meteo.com/v1/archive?"
    f"latitude={LAT}&longitude={LON}"
    f"&start_date={START_DATE}&end_date={END_DATE}"
    f"&daily=rain_sum&timezone=Asia/Kolkata"
)

try:
    response = requests.get(url)
    data = response.json()

    if "daily" in data:
        # Build daily dataframe from API response
        daily_df = pd.DataFrame({
            "Date": pd.to_datetime(data["daily"]["time"]),
            "Rain_mm": data["daily"]["rain_sum"]
        })
        
        # Convert daily precipitation into Monthly sums (e.g., "January 2020")
        daily_df["Month_Year"] = daily_df["Date"].dt.strftime("%B %Y")
        monthly_df = daily_df.groupby("Month_Year", sort=False)["Rain_mm"].sum().reset_index()
        
        monthly_df.columns = ["Month_Year", "Rainfall_mm"]
        monthly_df["Rainfall_mm"] = monthly_df["Rainfall_mm"].round(1)

        # Sort chronologically or keep standard format
        # Save using your absolute path
        OUTPUT_PATH = r'C:\Users\kunal desai\smart-agri-ai\data\processed\belgaum_rainfall.csv'
        os.makedirs(os.path.dirname(OUTPUT_PATH), exist_ok=True)
        
        monthly_df.to_csv(OUTPUT_PATH, index=False)
        
        print(f"✅ Success! Weather data saved to: {OUTPUT_PATH}")
        print(f"📊 Total Months Fetched: {len(monthly_df)}")
        print("\n--- Preview of Weather Data ---")
        print(monthly_df.head(10))
    else:
        print("❌ Error: API response did not include daily data fields.", data)

except Exception as e:
    print(f"❌ Connection error: {e}")