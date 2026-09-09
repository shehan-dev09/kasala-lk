"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../translations";

const ZONES = ["Colombo", "Kandy", "Galle"];

export default function AdminPanel() {
  const { lang } = useLanguage();
  const t = translations[lang];

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
    setStatus(t.admin_saving);
    const { error } = await supabase.from("actual_collections").insert([
      { zone, collection_date: collectionDate, actual_tons: parseFloat(actualTons), notes },
    ]);
    if (error) {
      setStatus(t.admin_error);
      console.error(error);
    } else {
      setStatus(t.admin_saved);
      setActualTons("");
      setNotes("");
      loadLogs();
    }
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 px-6 py-12">
        <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-sm border">
          <h1 className="text-2xl font-bold mb-2 text-brand-700">{t.admin_title}</h1>
          <p className="text-sm text-gray-500 mb-6">{t.admin_subtitle}</p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">{t.admin_zone}</label>
              <select value={zone} onChange={(e) => setZone(e.target.value)} className="w-full border rounded-lg p-2">
                {ZONES.map((z) => (
                  <option key={z} value={z}>{z}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">{t.admin_date}</label>
              <input
                type="date"
                value={collectionDate}
                onChange={(e) => setCollectionDate(e.target.value)}
                className="w-full border rounded-lg p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">{t.admin_tons}</label>
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
              <label className="block text-sm font-medium mb-1">{t.admin_notes}</label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full border rounded-lg p-2"
                placeholder={t.admin_notes_placeholder}
              />
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-brand-700 text-white py-3 rounded-lg font-semibold hover:bg-brand-800"
            >
              {t.admin_save}
            </button>

            {status && <p className="text-sm text-gray-600">{status}</p>}
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-3">{t.admin_recent}</h2>
            <div className="space-y-2">
              {logs.map((log) => (
                <div key={log.id} className="border rounded-lg p-3 text-sm flex justify-between">
                  <span>{log.zone} — {log.collection_date}</span>
                  <span className="font-semibold">{log.actual_tons} tons</span>
                </div>
              ))}
              {logs.length === 0 && <p className="text-sm text-gray-400">{t.admin_none}</p>}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}