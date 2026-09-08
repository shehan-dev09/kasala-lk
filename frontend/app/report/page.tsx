"use client";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";

const ZONES = ["Colombo", "Kandy", "Galle"];

export default function ReportPage() {
  const [zone, setZone] = useState("Colombo");
  const [description, setDescription] = useState("");
  const [locationText, setLocationText] = useState("");
  const [reports, setReports] = useState<any[]>([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    loadReports();
  }, []);

  async function loadReports() {
    const { data, error } = await supabase
      .from("problem_reports")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(10);
    if (!error && data) setReports(data);
  }

  async function handleSubmit() {
    if (!description.trim()) {
      setStatus("Please describe the issue.");
      return;
    }
    setStatus("Submitting...");
    const { error } = await supabase.from("problem_reports").insert([
      {
        zone,
        description,
        location_text: locationText,
        status: "open",
      },
    ]);
    if (error) {
      setStatus("Error submitting report");
      console.error(error);
    } else {
      setStatus("Report submitted — thank you!");
      setDescription("");
      setLocationText("");
      loadReports();
    }
  }

  const statusColor: Record<string, string> = {
    open: "bg-red-100 text-red-700",
    resolved: "bg-green-100 text-green-700",
  };

  return (

    <>
    <Header />
    <main className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-sm border">
        <h1 className="text-2xl font-bold mb-2 text-green-700">Report a Problem</h1>
        <p className="text-sm text-gray-500 mb-6">
          Overflowing bin? Missed collection? Let us know and it'll be shared with the local council.
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
            <label className="block text-sm font-medium mb-1">Location (street/area)</label>
            <input
              type="text"
              value={locationText}
              onChange={(e) => setLocationText(e.target.value)}
              className="w-full border rounded-lg p-2"
              placeholder="e.g. Galle Road, near Bambalapitiya station"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">What's the issue?</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border rounded-lg p-2"
              rows={4}
              placeholder="e.g. Bin overflowing for 3 days, attracting stray animals"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-green-700 text-white py-3 rounded-lg font-semibold hover:bg-green-800"
          >
            Submit Report
          </button>

          {status && <p className="text-sm text-gray-600">{status}</p>}
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-3">Recent Reports</h2>
          <div className="space-y-2">
            {reports.map((r) => (
              <div key={r.id} className="border rounded-lg p-3 text-sm">
                <div className="flex justify-between items-start">
                  <span className="font-medium">{r.zone} — {r.location_text}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${statusColor[r.status] || "bg-gray-100 text-gray-600"}`}>
                    {r.status}
                  </span>
                </div>
                <p className="text-gray-600 mt-1">{r.description}</p>
              </div>
            ))}
            {reports.length === 0 && (
              <p className="text-sm text-gray-400">No reports yet.</p>
            )}
          </div>
        </div>
      </div>
    </main>
    <Footer />
    </>
  );
}