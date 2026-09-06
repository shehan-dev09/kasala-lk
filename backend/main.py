from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import pandas as pd
from datetime import date

app = FastAPI(title="Kasala.lk Prediction API")

# Allow the frontend (running on a different port/domain) to call this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # tighten this to your actual frontend URL before going live
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model + encoders once at startup
model = joblib.load("model/model.pkl")
zone_encoder = joblib.load("model/zone_encoder.pkl")
season_encoder = joblib.load("model/season_encoder.pkl")

# Zone reference data (must match what you used in generate_data.py)
ZONES = {
    "Colombo": {"population": 750000},
    "Kandy": {"population": 130000},
    "Galle": {"population": 100000},
}

class PredictionRequest(BaseModel):
    zone: str
    date: date
    rainfall_mm: float = 5.0
    prev_volume_tons: float = None  # optional, we'll estimate if not given

@app.get("/")
def root():
    return {"message": "Kasala.lk Prediction API is running"}

@app.get("/zones")
def get_zones():
    return list(ZONES.keys())

@app.post("/predict")
def predict(req: PredictionRequest):
    if req.zone not in ZONES:
        raise HTTPException(status_code=400, detail=f"Unknown zone: {req.zone}")

    population = ZONES[req.zone]["population"]
    day_of_week = req.date.weekday()
    is_weekend = 1 if day_of_week >= 5 else 0

    # Simple Poya check (ideally load from a shared list, hardcoded here for now)
    poya_days_2026 = [
        "2026-01-03", "2026-02-01", "2026-03-02", "2026-04-01",
        "2026-05-01", "2026-05-30", "2026-06-29", "2026-07-29",
        "2026-08-27", "2026-09-26", "2026-10-25", "2026-11-24", "2026-12-23"
    ]
    is_poya = 1 if req.date.isoformat() in poya_days_2026 else 0

    month = req.date.month
    season = "monsoon" if month in [5, 6, 9, 10, 11] else "dry"

    prev_volume = req.prev_volume_tons or (population * 0.7 / 1000)  # rough fallback estimate

    zone_encoded = zone_encoder.transform([req.zone])[0]
    season_encoded = season_encoder.transform([season])[0]

    input_df = pd.DataFrame([{
        "zone_encoded": zone_encoded,
        "population": population,
        "day_of_week": day_of_week,
        "is_weekend": is_weekend,
        "is_poya": is_poya,
        "rainfall_mm": req.rainfall_mm,
        "season_encoded": season_encoded,
        "prev_volume_tons": prev_volume,
    }])

    predicted_volume = model.predict(input_df)[0]

    base = population * 0.7 / 1000
    if predicted_volume > base * 1.15:
        demand = "HIGH"
    elif predicted_volume > base * 0.95:
        demand = "MEDIUM"
    else:
        demand = "LOW"

    return {
        "zone": req.zone,
        "date": req.date.isoformat(),
        "predicted_waste_tons": round(predicted_volume, 2),
        "demand_level": demand,
    }