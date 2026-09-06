import pandas as pd
import numpy as np

np.random.seed(42)

# Zone base data (population + baseline per-capita waste rate kg/person/day)
zones = {
    "Colombo": {"population": 750000, "per_capita_kg": 0.75},
    "Kandy": {"population": 130000, "per_capita_kg": 0.60},
    "Galle": {"population": 100000, "per_capita_kg": 0.55},
}

# Sri Lankan Poya days for 2026
poya_days = pd.to_datetime([
    "2026-01-03", "2026-02-01", "2026-03-03", "2026-04-01",
    "2026-04-30", "2026-05-30", "2026-06-29", "2026-07-28",
    "2026-08-27", "2026-09-26", "2026-10-25", "2026-11-24",
    "2026-12-23"
])

def generate_zone_data(zone_name, days=365):
    info = zones[zone_name]
    dates = pd.date_range(start="2026-01-01", periods=days, freq="D")

    rows = []
    prev_volume = info["population"] * info["per_capita_kg"] / 1000  # tons baseline

    for date in dates:
        day_of_week = date.dayofweek  # 0=Mon ... 6=Sun
        is_weekend = 1 if day_of_week >= 5 else 0
        is_poya = 1 if date in poya_days else 0

        # Simulate weather: rainfall in mm (monsoon months = higher chance of rain)
        month = date.month
        monsoon = month in [5, 6, 9, 10, 11]  # rough SL monsoon months
        rainfall = np.random.exponential(15 if monsoon else 5)
        season = "monsoon" if monsoon else "dry"

        # Base volume from population
        base = info["population"] * info["per_capita_kg"] / 1000  # tons

        # Multipliers based on real-world logic
        weekend_mult = 1.15 if is_weekend else 1.0
        poya_mult = 1.25 if is_poya else 1.0
        rain_mult = 0.9 if rainfall > 20 else 1.0  # heavy rain delays/reduces collection
        prev_mult = 0.5 + 0.5 * (prev_volume / base)  # some autocorrelation

        volume = base * weekend_mult * poya_mult * rain_mult * prev_mult
        volume += np.random.normal(0, base * 0.05)  # small random noise
        volume = max(volume, 0)

        # Demand label
        if volume > base * 1.15:
            demand = "HIGH"
        elif volume > base * 0.95:
            demand = "MEDIUM"
        else:
            demand = "LOW"

        rows.append({
            "zone": zone_name,
            "date": date,
            "population": info["population"],
            "day_of_week": day_of_week,
            "is_weekend": is_weekend,
            "is_poya": is_poya,
            "rainfall_mm": round(rainfall, 2),
            "season": season,
            "prev_volume_tons": round(prev_volume, 2),
            "waste_volume_tons": round(volume, 2),
            "demand_level": demand,
        })

        prev_volume = volume

    return pd.DataFrame(rows)

# Generate for all zones and combine
all_data = pd.concat([generate_zone_data(z) for z in zones], ignore_index=True)
all_data.to_csv("synthetic_waste_data.csv", index=False)
print(f"Generated {len(all_data)} rows")
print(all_data.head())