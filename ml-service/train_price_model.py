import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error
import pickle
import os

# 1. Load the cleaned data
FILE_PATH = r'C:\Users\kunal desai\smart-agri-ai\data\processed\belgaum_master.csv'
df = pd.read_csv(FILE_PATH)

# Clean date and sort (Important for Time Series)
df['Month_Year'] = df['Month_Year'].str.replace('"', '').str.replace(',', '').str.strip()
df['Date'] = pd.to_datetime(df['Month_Year'], format='%B %Y')
df = df.sort_values('Date')

# 2. FEATURE ENGINEERING: Create the "Lag" (Previous Month Price)
# This gives the AI a reference point
df['Prev_Month_Price'] = df['Price'].shift(1)
df = df.dropna() # Remove the first row because it doesn't have a 'previous' price

# 3. Prepare X (Input) and y (Target)
X = df[['Prev_Month_Price']] # We use last month's price to predict...
y = df['Price']             # ...this month's price

# Split data: 80% for training, 20% for testing
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, shuffle=False)

# 4. Train the Model (Random Forest is great for small datasets)
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# 5. Evaluate
predictions = model.predict(X_test)
error = mean_absolute_error(y_test, predictions)

print(f"🤖 AI Model Training Complete!")
print(f"📉 Average Prediction Error: Rs. {error:.2f}")

# 6. Save the trained "Brain" to a file
with open('price_model.pkl', 'wb') as f:
    pickle.dump(model, f)
print("💾 Model saved as 'price_model.pkl'")

# 7. Make a sample prediction for NEXT month
last_price = df['Price'].iloc[-1]
next_prediction = model.predict([[last_price]])
print(f"\n🔮 Prediction for next month: Rs. {next_prediction[0]:.2f} (Based on current price of Rs. {last_price})")