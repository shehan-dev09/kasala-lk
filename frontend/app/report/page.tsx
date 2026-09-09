"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../translations";

const ZONES = ["Colombo", "Kandy", "Galle"];

export default function ReportPage() {
  const { lang } = useLanguage();
  const t = translations[lang];

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
      setStatus(t.report_validation);
      return;
    }
    setStatus(t.report_submitting);
    const { error } = await supabase.from("problem_reports").insert([
      { zone, description, location_text: locationText, status: "open" },
    ]);
    if (error) {
      setStatus(t.report_error);
      console.error(error);
    } else {
      setStatus(t.report_thanks);
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
          <h1 className="text-2xl font-bold mb-2 text-brand-700">{t.report_title}</h1>
          <p className="text-sm text-gray-500 mb-6">{t.report_subtitle}</p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">{t.report_zone}</label>
              <select value={zone} onChange={(e) => setZone(e.target.value)} className="w-full border rounded-lg p-2">
                {ZONES.map((z) => (
                  <option key={z} value={z}>{z}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">{t.report_location}</label>
              <input
                type="text"
                value={locationText}
                onChange={(e) => setLocationText(e.target.value)}
                className="w-full border rounded-lg p-2"
                placeholder={t.report_location_placeholder}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">{t.report_description}</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border rounded-lg p-2"
                rows={4}
                placeholder={t.report_description_placeholder}
              />
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-brand-700 text-white py-3 rounded-lg font-semibold hover:bg-brand-800"
            >
              {t.report_submit}
            </button>

            {status && <p className="text-sm text-gray-600">{status}</p>}
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-3">{t.report_recent}</h2>
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
              {reports.length === 0 && <p className="text-sm text-gray-400">{t.report_none}</p>}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}