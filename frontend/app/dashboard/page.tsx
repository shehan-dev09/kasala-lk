"use client";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import dynamic from "next/dynamic";

const ZoneMap = dynamic(() => import("../components/ZoneMap"), { ssr: false });


import { useState, useEffect } from "react";

const ZONES = ["Colombo", "Kandy", "Galle"];
const API_URL = "kasala-lk-production.up.railway.app";


export default function Dashboard() {
  const [zone, setZone] = useState("Colombo");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [rainfall, setRainfall] = useState(5);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [forecast, setForecast] = useState<any[]>([]);
  const [zoneData, setZoneData] = useState<Record<string, { demand: string; tons: number }>>({});


  useEffect(() => {
  loadForecast(zone);
}, []);

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
      setZoneData((prev) => ({
        ...prev,
        [data.zone]: { demand: data.demand_level, tons: data.predicted_waste_tons },
      }));
    } catch (err) {
      setError("Could not reach the prediction server. Is the backend running?");
    } finally {
      setLoading(false);
    }
  }

  async function loadForecast(selectedZone: string) {
  try {
    const res = await fetch(`${API_URL}/forecast/${selectedZone}`);
    const data = await res.json();
    setForecast(data.forecast);
  } catch (err) {
    console.error("Forecast fetch failed", err);
  }
}

  const demandColor: Record<string, string> = {
    HIGH: "bg-red-100 text-red-700 border-red-300",
    MEDIUM: "bg-yellow-100 text-yellow-700 border-yellow-300",
    LOW: "bg-green-100 text-green-700 border-green-300",
  };

  return (
    <>
    <Header />
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
                onChange={(e) => {
                    setZone(e.target.value);
                    loadForecast(e.target.value);
                }}
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

                {forecast.length > 0 && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-3">7-Day Forecast — {zone}</h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={forecast}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="predicted_waste_tons"
                  stroke="#15803d"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-3">Zone Map</h2>
          <ZoneMap zoneData={zoneData} />
        </div>
      </div>
    </main>
     <Footer />
  </>
  );
}
