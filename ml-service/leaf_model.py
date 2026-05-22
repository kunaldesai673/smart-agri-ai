import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense, Dropout
from tensorflow.keras.preprocessing.image import ImageDataGenerator

# -------------------------
# DATASET PATH
# -------------------------
# Ensure this folder contains two subfolders: 'leaf' and 'not_leaf'
dataset_path = "dataset_leaf"

# -------------------------
# IMPROVED IMAGE GENERATOR (Data Augmentation)
# -------------------------
# Augmentation creates variations of your images so the model 
# doesn't get confused by different angles or lighting.
datagen = ImageDataGenerator(
    rescale=1./255,
    rotation_range=25,       # Randomly rotate images
    width_shift_range=0.2,   # Randomly translate horizontally
    height_shift_range=0.2,  # Randomly translate vertically
    shear_range=0.2,         # Apply shear mapping
    zoom_range=0.2,          # Random zoom
    horizontal_flip=True,    # Flip images horizontally
    fill_mode='nearest',     # Fill empty pixels after transform
    validation_split=0.2     # 20% for testing
)

# -------------------------
# TRAIN DATA
# -------------------------
train = datagen.flow_from_directory(
    dataset_path,
    target_size=(128, 128),
    batch_size=32,
    class_mode="binary",
    subset="training",
    shuffle=True
)

# -------------------------
# VALIDATION DATA
# -------------------------
val = datagen.flow_from_directory(
    dataset_path,
    target_size=(128, 128),
    batch_size=32,
    class_mode="binary",
    subset="validation"
)

# -------------------------
# UPDATED MODEL ARCHITECTURE
# -------------------------
model = Sequential([
    # Layer 1
    Conv2D(32, (3,3), activation="relu", input_shape=(128,128,3)),
    MaxPooling2D(2,2),

    # Layer 2
    Conv2D(64, (3,3), activation="relu"),
    MaxPooling2D(2,2),

    # Layer 3
    Conv2D(128, (3,3), activation="relu"),
    MaxPooling2D(2,2),

    Flatten(),

    # Fully Connected Layers
    Dense(128, activation="relu"),
    Dropout(0.4), # Helps prevent overfitting to specific photos

    # Output Layer: Sigmoid is perfect for Binary (Leaf vs Not Leaf)
    Dense(1, activation="sigmoid")
])

# -------------------------
# COMPILE
# -------------------------
model.compile(
    optimizer="adam",
    loss="binary_crossentropy",
    metrics=["accuracy"]
)

# -------------------------
# TRAIN
# -------------------------
print("Starting Training...")
model.fit(
    train,
    validation_data=val,
    epochs=15 # Increased slightly to allow for augmentation learning
)

# -------------------------
# SAVE MODEL
# -------------------------
model.save("leaf_detector.h5")

# Check class indices to be sure
print("Class Indices:", train.class_indices)
print("✅ Leaf model trained and saved as leaf_detector.h5")