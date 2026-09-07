"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";

const ZONES = ["Colombo", "Kandy", "Galle"];

export default function AdminPanel() {
  const [zone, setZone] = useState("Colombo");
  const [collectionDate, setCollectionDate] = useState(new Date().toISOString().split("T")[0]);
  const [actualTons, setActualTons] = useState("");
  const [notes, setNotes] = useState("");
  const [logs, setLogs] = useState<any[]>([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    loadLogs();
  }, []);

  async function loadLogs() {
    const { data, error } = await supabase
      .from("actual_collections")
      .select("*")
      .order("collection_date", { ascending: false })
      .limit(10);
    if (!error && data) setLogs(data);
  }

  async function handleSubmit() {
    setStatus("Saving...");
    const { error } = await supabase.from("actual_collections").insert([
      {
        zone,
        collection_date: collectionDate,
        actual_tons: parseFloat(actualTons),
        notes,
      },
    ]);
    if (error) {
      setStatus("Error saving entry");
      console.error(error);
    } else {
      setStatus("Saved!");
      setActualTons("");
      setNotes("");
      loadLogs();
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-sm border">
        <h1 className="text-2xl font-bold mb-2 text-green-700">Kasala.lk — Admin Panel</h1>
        <p className="text-sm text-gray-500 mb-6">
          Log actual collected tonnage — this data will be used to improve prediction accuracy over time.
        </p>

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
            <label className="block text-sm font-medium mb-1">Collection Date</label>
            <input
              type="date"
              value={collectionDate}
              onChange={(e) => setCollectionDate(e.target.value)}
              className="w-full border rounded-lg p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Actual Tons Collected</label>
            <input
              type="number"
              step="0.01"
              value={actualTons}
              onChange={(e) => setActualTons(e.target.value)}
              className="w-full border rounded-lg p-2"
              placeholder="e.g. 580.5"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Notes (optional)</label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full border rounded-lg p-2"
              placeholder="e.g. delayed due to heavy rain"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-green-700 text-white py-3 rounded-lg font-semibold hover:bg-green-800"
          >
            Save Entry
          </button>

          {status && <p className="text-sm text-gray-600">{status}</p>}
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-3">Recent Entries</h2>
          <div className="space-y-2">
            {logs.map((log) => (
              <div key={log.id} className="border rounded-lg p-3 text-sm flex justify-between">
                <span>{log.zone} — {log.collection_date}</span>
                <span className="font-semibold">{log.actual_tons} tons</span>
              </div>
            ))}
            {logs.length === 0 && (
              <p className="text-sm text-gray-400">No entries yet.</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}