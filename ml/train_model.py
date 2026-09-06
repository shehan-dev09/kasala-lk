import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error
from sklearn.preprocessing import LabelEncoder
import joblib

# Load the data me generated
df = pd.read_csv("synthetic_waste_data.csv")

# Encode categorical columns (zone, season) into numbers the model can use
zone_encoder = LabelEncoder()
season_encoder = LabelEncoder()

df["zone_encoded"] = zone_encoder.fit_transform(df["zone"])
df["season_encoded"] = season_encoder.fit_transform(df["season"])

# Features (inputs) and target (what we're predicting)
features = [
    "zone_encoded", "population", "day_of_week", "is_weekend",
    "is_poya", "rainfall_mm", "season_encoded", "prev_volume_tons"
]
X = df[features]
y = df["waste_volume_tons"]

# Split into training and test sets
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Train the model
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Evaluate it
predictions = model.predict(X_test)
mae = mean_absolute_error(y_test, predictions)
print(f"Mean Absolute Error: {mae:.2f} tons")

# Save the model AND the encoders (we need encoders later to convert zone names)
joblib.dump(model, "model.pkl")
joblib.dump(zone_encoder, "zone_encoder.pkl")
joblib.dump(season_encoder, "season_encoder.pkl")

print("Model saved: model.pkl")
print("Encoders saved: zone_encoder.pkl, season_encoder.pkl")

# Show feature importance (which factors matter most)
importance = pd.DataFrame({
    "feature": features,
    "importance": model.feature_importances_
}).sort_values("importance", ascending=False)
print("\nFeature importance:")
print(importance)