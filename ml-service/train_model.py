import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, GlobalAveragePooling2D, Dropout
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.callbacks import EarlyStopping, ReduceLROnPlateau
import json

# ==================================
# DATASET PATH
# ==================================
dataset_path = "dataset"

# ==================================
# IMAGE GENERATOR
# ==================================
train_datagen = ImageDataGenerator(
    rescale=1./255,
    validation_split=0.2,

    rotation_range=20,
    zoom_range=0.2,
    width_shift_range=0.2,
    height_shift_range=0.2,
    shear_range=0.2,
    horizontal_flip=True,
    fill_mode="nearest"
)

# ==================================
# TRAIN DATA
# ==================================
train_data = train_datagen.flow_from_directory(
    dataset_path,
    target_size=(224, 224),
    batch_size=32,
    class_mode="categorical",
    subset="training"
)

# ==================================
# VALIDATION DATA
# ==================================
val_data = train_datagen.flow_from_directory(
    dataset_path,
    target_size=(224, 224),
    batch_size=32,
    class_mode="categorical",
    subset="validation"
)

# ==================================
# SAVE CLASS NAMES
# ==================================
class_names = list(train_data.class_indices.keys())

with open("class_names.json", "w") as f:
    json.dump(class_names, f)

print("Class names:", class_names)

# ==================================
# PRETRAINED MODEL
# ==================================
base_model = MobileNetV2(
    weights="imagenet",
    include_top=False,
    input_shape=(224, 224, 3)
)

base_model.trainable = False

# ==================================
# FINAL MODEL
# ==================================
model = Sequential([
    base_model,

    GlobalAveragePooling2D(),

    Dropout(0.3),

    Dense(128, activation="relu"),

    Dropout(0.2),

    Dense(len(class_names), activation="softmax")
])

# ==================================
# COMPILE
# ==================================
model.compile(
    optimizer=Adam(learning_rate=0.001),
    loss="categorical_crossentropy",
    metrics=["accuracy"]
)

# ==================================
# CALLBACKS
# ==================================
early_stop = EarlyStopping(
    monitor="val_accuracy",
    patience=3,
    restore_best_weights=True
)

reduce_lr = ReduceLROnPlateau(
    monitor="val_loss",
    factor=0.5,
    patience=2
)

# ==================================
# TRAIN
# ==================================
history = model.fit(
    train_data,
    validation_data=val_data,
    epochs=15,
    callbacks=[early_stop, reduce_lr]
)

# ==================================
# SAVE MODEL
# ==================================
model.save("plant_disease_model.h5")

print("✅ Improved model trained successfully")