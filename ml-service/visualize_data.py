import pandas as pd
import matplotlib.pyplot as plt
import os

# 1. Load the master file
FILE_PATH = r'C:\Users\kunal desai\smart-agri-ai\data\processed\belgaum_master.csv'
df = pd.read_csv(FILE_PATH)

# 2. Clean the Date column (remove the extra quotes and commas)
df['Month_Year'] = df['Month_Year'].str.replace('"', '').str.replace(',', '').str.strip()

# 3. Convert to proper datetime format for sorting
# Note: This assumes format like "February 2023"
df['Date_Proper'] = pd.to_datetime(df['Month_Year'], format='%B %Y')
df = df.sort_values('Date_Proper')

print("📊 Cleaned Data Preview:")
print(df[['Date_Proper', 'Crop', 'Price']].head())

# 4. Create a Price Trend Graph
plt.figure(figsize=(10, 5))
for crop in df['Crop'].unique():
    crop_data = df[df['Crop'] == crop]
    plt.plot(crop_data['Date_Proper'], crop_data['Price'], marker='o', label=crop)

plt.title('Wholesale Price Trend in Belgaum')
plt.xlabel('Date')
plt.ylabel('Price (Rs./Quintal)')
plt.legend()
plt.grid(True)
plt.xticks(rotation=45)
plt.tight_layout()

# Save the graph
plt.savefig('price_trend.png')
print("\n📈 Graph saved as 'price_trend.png'. Open it to see the trends!")
plt.show()