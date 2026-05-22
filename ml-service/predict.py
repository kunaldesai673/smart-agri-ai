import numpy as np
import tensorflow as tf
from tensorflow.keras.preprocessing import image
import json

# Load model
model = tf.keras.models.load_model("plant_disease_model.h5")

# Load class names (we created this from training step)
with open("class_names.json", "r") as f:
    class_names = json.load(f)

# Image path (CHANGE THIS later if needed)
img_path = "test.jpg"

# Load and preprocess image
img = image.load_img(img_path, target_size=(128, 128))
img_array = image.img_to_array(img)
img_array = np.expand_dims(img_array, axis=0)
img_array = img_array / 255.0

# Predict
prediction = model.predict(img_array)
predicted_index = np.argmax(prediction)

# Output result
print("Predicted Disease:", class_names[predicted_index])