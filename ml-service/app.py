from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import numpy as np
import tensorflow as tf
from werkzeug.utils import secure_filename
from tensorflow.keras.preprocessing import image
import json

app = Flask(__name__)
CORS(app)

# -------------------------
# CONFIG
# -------------------------
UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

# -------------------------
# LOAD MODELS SAFELY
# -------------------------
print("🔄 Loading AI Models...")
try:
    leaf_model = tf.keras.models.load_model("leaf_detector.h5")
    print("✅ leaf_detector.h5 loaded successfully.")
except Exception as e:
    print("⚠️ leaf_detector.h5 missing or failed to load. Verification skipped.", e)
    leaf_model = None

try:
    disease_model = tf.keras.models.load_model("plant_disease_model.h5")
    print("✅ plant_disease_model.h5 loaded successfully.")
except Exception as e:
    print("❌ CRITICAL: plant_disease_model.h5 failed to load!", e)
    disease_model = None

# -------------------------
# LOAD NEW MULTI-LANG DICTIONARY
# -------------------------
try:
    with open("disease_info.json", "r", encoding="utf-8") as f:
        disease_info = json.load(f)
    print("✅ Multi-language disease_info.json loaded successfully.")
except Exception as e:
    print("❌ ERROR: Could not read disease_info.json!", e)
    disease_info = {}

# Order must match exactly your training classes
model_classes = [
    "Apple_Black_Rot",
    "Apple_Healthy",
    "Apple_Scab",
    "Potato_Early_Blight",
    "Potato_Healthy",
    "Potato_Late_Blight",
    "Tomato_Early_Blight",
    "Tomato_Healthy",
    "Tomato_Late_Blight"
]

# -------------------------
# IMAGE RE-SHAPING UTILITIES
# -------------------------
def preprocess_leaf(path):
    img = image.load_img(path, target_size=(128, 128))
    img = image.img_to_array(img)
    img = np.expand_dims(img, axis=0)
    return img / 255.0

def preprocess_disease(path):
    img = image.load_img(path, target_size=(224, 224))
    img = image.img_to_array(img)
    img = np.expand_dims(img, axis=0)
    return img / 255.0

# -------------------------
# REST ENDPOINTS
# -------------------------
@app.route("/")
def home():
    return "🌿 Crop Disease Detection API Server Running (Isolated)"

@app.route("/predict", methods=["POST"])
def predict():
    filepath = None
    try:
        # 1. Check Input Files
        if "image" not in request.files:
            return jsonify({"success": False, "error": "No image field found in payload"}), 400

        file = request.files["image"]
        if file.filename == "":
            return jsonify({"success": False, "error": "Empty filename transferred"}), 400

        # 2. Local File Write
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config["UPLOAD_FOLDER"], filename)
        file.save(filepath)

        # 3. Running Leaf Verification (Only if model loaded successfully)
        if leaf_model is not None:
            leaf_img = preprocess_leaf(filepath)
            leaf_pred = leaf_model.predict(leaf_img, verbose=0)[0][0]
            
            # Assuming binary sigmoid setup: closer to 1.0 means NOT a leaf
            if leaf_pred > 0.99: 
                return jsonify({
                    "success": True,
                    "type": "not_leaf",
                    "message": "The upload does not appear to be a plant leaf.",
                    "confidence": round(float(leaf_pred) * 100, 2)
                })

        # 4. Disease Core Engine Execution
        if disease_model is None:
            return jsonify({"success": False, "error": "Disease Classification model is offline."}), 500
            
        disease_img = preprocess_disease(filepath)
        pred = disease_model.predict(disease_img, verbose=0)[0]
        pred = np.array(pred).astype(np.float32)

        # Manual Softmax normalization if model output layer is unscaled
        if np.max(pred) > 1.0 or np.sum(pred) < 0.99:
            pred = np.exp(pred - np.max(pred))
            pred = pred / np.sum(pred)

        index = int(np.argmax(pred))
        confidence = float(pred[index]) * 100
        disease_key = model_classes[index]

        # 5. Extract Multi-Language Payload from our new dictionary
        multi_lang_data = disease_info.get(disease_key)
        if not multi_lang_data:
            return jsonify({"success": False, "error": f"Key {disease_key} missing from dictionary."}), 500

        # 6. Apply Minimum Detection Confidence Filter
        if confidence < 25:
            return jsonify({
                "success": True,
                "type": "unknown",
                "disease": "Low inference capability",
                "confidence": round(confidence, 2)
            })

        # 7. Output Result Payload
        return jsonify({
            "success": True,
            "type": "disease",
            "confidence": round(confidence, 2),
            "full_data": multi_lang_data,
            "class_id": disease_key
        })

    except Exception as e:
        print("🔴 CRITICAL RUNTIME SYSTEM ERROR:", str(e))
        return jsonify({"success": False, "error": f"Internal execution error: {str(e)}"}), 500

    finally:
        if filepath and os.path.exists(filepath):
            try:
                os.remove(filepath)
            except Exception as e:
                print("Failed cleaning cache file:", e)

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=5001,debug=False)