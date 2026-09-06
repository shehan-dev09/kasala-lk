"use client";

import { useState } from "react";

const ZONES = ["Colombo", "Kandy", "Galle"];
const API_URL = "http://127.0.0.1:8000";

export default function Dashboard() {
  const [zone, setZone] = useState("Colombo");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [rainfall, setRainfall] = useState(5);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handlePredict() {
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await fetch(`${API_URL}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          zone,
          date,
          rainfall_mm: rainfall,
        }),
      });
      if (!res.ok) throw new Error("Prediction failed");
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError("Could not reach the prediction server. Is the backend running?");
    } finally {
      setLoading(false);
    }
  }

  const demandColor: Record<string, string> = {
    HIGH: "bg-red-100 text-red-700 border-red-300",
    MEDIUM: "bg-yellow-100 text-yellow-700 border-yellow-300",
    LOW: "bg-green-100 text-green-700 border-green-300",
  };

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-sm border">
        <h1 className="text-2xl font-bold mb-6 text-green-700">
          Kasala.lk — Demand Dashboard
        </h1>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Zone</label>
            <select
              value={zone}
              onChange={(e) => setZone(e.target.value)}
              className="w-full border rounded-lg p-2"
            >
              {ZONES.map((z) => (
                <option key={z} value={z}>{z}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border rounded-lg p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Expected Rainfall (mm)
            </label>
            <input
              type="number"
              value={rainfall}
              onChange={(e) => setRainfall(Number(e.target.value))}
              className="w-full border rounded-lg p-2"
            />
          </div>

          <button
            onClick={handlePredict}
            disabled={loading}
            className="w-full bg-green-700 text-white py-3 rounded-lg font-semibold hover:bg-green-800 disabled:opacity-50"
          >
            {loading ? "Predicting..." : "Get Prediction"}
          </button>
        </div>

        {error && (
          <p className="mt-4 text-sm text-red-600">{error}</p>
        )}

        {result && (
          <div className={`mt-6 p-4 rounded-lg border ${demandColor[result.demand_level]}`}>
            <p className="text-sm">Zone: <strong>{result.zone}</strong></p>
            <p className="text-sm">Date: <strong>{result.date}</strong></p>
            <p className="text-lg mt-2">
              Demand Level: <strong>{result.demand_level}</strong>
            </p>
            <p className="text-lg">
              Estimated Waste: <strong>{result.predicted_waste_tons} tons</strong>
            </p>
          </div>
        )}
      </div>
    </main>
  );
}