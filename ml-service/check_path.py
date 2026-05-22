import os
import glob

# Current location of the script
print(f"📍 Script is running from: {os.getcwd()}")

# The path we are trying to reach
raw_path = os.path.join('..', 'data', 'raw')
print(f"🔎 Looking for folder at: {os.path.abspath(raw_path)}")

# Check if the folder exists
if os.path.exists(raw_path):
    print("✅ Folder 'data/raw' EXISTS.")
    # List EVERYTHING in that folder
    files = os.listdir(raw_path)
    print(f"📁 Files found in folder: {files}")
else:
    print("❌ Folder 'data/raw' NOT FOUND. Check your folder spelling.")

# Check for .csv files specifically
csv_files = glob.glob(os.path.join(raw_path, "*.csv"))
print(f"📊 CSV files found (*.csv): {len(csv_files)}")