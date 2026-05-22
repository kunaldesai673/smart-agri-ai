import pandas as pd
import glob
import os
import re

# 1. HARDCODED DIRECT PATHS (Based on your terminal output)
RAW_FOLDER = r'C:\Users\kunal desai\smart-agri-ai\data\raw'
PROCESSED_FOLDER = r'C:\Users\kunal desai\smart-agri-ai\data\processed'
OUTPUT_FILE = os.path.join(PROCESSED_FOLDER, 'belgaum_master.csv')

# Ensure the processed folder exists
os.makedirs(PROCESSED_FOLDER, exist_ok=True)

# 2. Get all CSV files
# Using * to catch everything in that folder
all_files = glob.glob(os.path.join(RAW_FOLDER, "*.csv"))
master_list = []

print(f"🚀 Starting merge of {len(all_files)} files...")
print(f"📂 Looking inside: {RAW_FOLDER}")

for file in all_files:
    try:
        fname = os.path.basename(file)
        
        # Open and read the header line to get Crop and Date
        with open(file, 'r', encoding='utf-8', errors='ignore') as f:
            header_text = f.readline()
        
        # Regex to pull Crop and Date from Agmarknet title
        crop_match = re.search(r"Analysis for (.*?) in", header_text)
        date_match = re.search(r"- (.*)", header_text)
        
        crop = crop_match.group(1).strip() if crop_match else "Unknown"
        date = date_match.group(1).strip() if date_match else "Unknown"

        # Read the table - Agmarknet CSVs usually need skipping 2 rows
        df = pd.read_csv(file, header=None, skiprows=2)
        
        # Standard Agmarknet Columns
        df.columns = ['District', 'Price', 'Prev_Month', 'Prev_Year', 'Change_M', 'Change_Y']
        
        # 3. Filter for Belgaum or Belagavi
        belgaum_row = df[df['District'].str.contains('Belgaum|Belagavi', case=False, na=False)].copy()
        
        if not belgaum_row.empty:
            belgaum_row['Crop'] = crop
            belgaum_row['Month_Year'] = date
            master_list.append(belgaum_row)
            print(f"✅ Success: {crop} ({date})")
        
    except Exception as e:
        # If a file is empty or formatted differently, skip it
        continue

# 4. Save Result
if master_list:
    final_df = pd.concat(master_list, ignore_index=True)
    
    # Clean the price column
    final_df['Price'] = pd.to_numeric(final_df['Price'], errors='coerce')
    final_df = final_df.dropna(subset=['Price'])
    
    final_df.to_csv(OUTPUT_FILE, index=False)
    print(f"\n✨ DONE! Master file created at: {OUTPUT_FILE}")
    print(f"📊 Total Records: {len(final_df)}")
else:
    print("\n❌ Error: Files were found, but no 'Belgaum' data was found inside them.")