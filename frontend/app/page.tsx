"use client";
import { MapPin, BarChart3, Route } from "lucide-react";
import { useState } from "react";
import { Menu, X } from "lucide-react";
export default function Home() {
const [menuOpen, setMenuOpen] = useState(false);
  
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header */}      
<header className="flex justify-between items-center px-6 md:px-10 py-4 bg-white/95 backdrop-blur-sm shadow-sm sticky top-0 z-50">
  <div className="flex items-center gap-3">
    <img src="/logo.png" alt="Kasala.lk logo" className="w-9 h-9 rounded-lg" />
    <span className="text-xl font-bold text-brand-700" style={{ fontFamily: "var(--font-heading)" }}>
      Kasala.Lk
    </span>
  </div>

  <nav className="hidden md:flex gap-8 text-sm font-medium text-gray-700">
    <a href="/dashboard" className="hover:text-brand-600 transition">Dashboard</a>
    <a href="#about" className="hover:text-brand-600 transition">About</a>
    <a href="/report" className="hover:text-brand-600 transition">Report Issue</a>
  </nav>

  <a href="/dashboard" className="hidden md:inline-block bg-brand-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-brand-800 transition">
    Get Started
  </a>

  <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
    {menuOpen ? <X size={24} /> : <Menu size={24} />}
  </button>
</header>

{menuOpen && (
  <div className="md:hidden bg-white border-b px-6 py-4 flex flex-col gap-4 text-sm font-medium">
    <a href="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</a>
    <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
    <a href="/report" onClick={() => setMenuOpen(false)}>Report Issue</a>
  </div>
)}


      {/* Hero section */}
<section className="relative py-32 px-6 md:px-16 text-white overflow-hidden">
  <video
    autoPlay
    loop
    muted
    playsInline
    className="absolute inset-0 w-full h-full object-cover"
  >
    <source src="/hero-bg.mp4" type="video/mp4" />
  </video>
  <div className="absolute inset-0 bg-gradient-to-br from-brand-900/90 via-brand-700/85 to-brand-500/80"></div>

  <div className="relative z-10 max-w-3xl mx-auto text-center">
    <h2 className="text-4xl md:text-5xl font-extrabold mb-4" style={{ fontFamily: "var(--font-heading)" }}>
      Smarter Waste Collection for Sri Lanka
    </h2>
    <p className="text-lg mb-8 opacity-90">
      Kasala.lk (කසල.lk) predicts garbage collection demand across Sri Lankan cities,
      helping councils plan smarter and reduce overflow.
    </p>
    <div className="flex justify-center gap-4">
      <a href="/dashboard" className="bg-white text-brand-700 px-7 py-3.5 rounded-xl font-semibold hover:bg-brand-50 transition shadow-lg">
        View Dashboard
      </a>
      <a href="/report" className="border-2 border-white text-white px-7 py-3.5 rounded-xl font-semibold hover:bg-white/10 transition">
        Report a Problem
      </a>
    </div>
  </div>
</section>

<section className="bg-white border-b">
  <div className="max-w-4xl mx-auto grid grid-cols-3 divide-x divide-gray-200 py-8">
    <div className="text-center">
      <p className="text-3xl font-bold text-brand-700">3</p>
      <p className="text-sm text-gray-500">Cities Covered</p>
    </div>
    <div className="text-center">
      <p className="text-3xl font-bold text-brand-700">24/7</p>
      <p className="text-sm text-gray-500">Live Predictions</p>
    </div>
    <div className="text-center">
      <p className="text-3xl font-bold text-brand-700">ML</p>
      <p className="text-sm text-gray-500">Powered Forecasting</p>
    </div>
  </div>
</section>

      {/* Feature cards */}     


<section className="grid md:grid-cols-3 gap-6 px-8 py-20 max-w-6xl mx-auto">
  <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all">
    <div className="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center mb-4">
      <MapPin className="text-brand-600" size={24} />
    </div>
    <h3 className="font-bold text-lg mb-2 text-gray-900">Zone Predictions</h3>
    <p className="text-gray-500 text-sm leading-relaxed">
      See predicted waste demand for Colombo, Kandy, and Galle — updated daily.
    </p>
  </div>

  <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all">
    <div className="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center mb-4">
      <BarChart3 className="text-brand-600" size={24} />
    </div>
    <h3 className="font-bold text-lg mb-2 text-gray-900">Forecast Charts</h3>
    <p className="text-gray-500 text-sm leading-relaxed">
      Track waste trends over time to plan truck allocation ahead of demand spikes.
    </p>
  </div>

  <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all">
    <div className="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center mb-4">
      <Route className="text-brand-600" size={24} />
    </div>
    <h3 className="font-bold text-lg mb-2 text-gray-900">Smart Routes</h3>
    <p className="text-gray-500 text-sm leading-relaxed">
      Get suggested collection routes based on predicted demand per zone.
    </p>
  </div>
</section>

<section id="about" className="bg-brand-50 py-24 px-6">
  <div className="max-w-5xl mx-auto text-center mb-14">
    <h2 className="text-3xl font-bold mb-3" style={{ fontFamily: "var(--font-heading)" }}>
      How Kasala.lk Works
    </h2>
    <p className="text-gray-600 max-w-xl mx-auto">
      A simple pipeline that turns local data into actionable collection plans.
    </p>
  </div>
  <div className="max-w-5xl mx-auto grid md:grid-cols-4 gap-6">
    {[
      { step: "01", title: "Collect Data", desc: "Population, weather, events, and past collection volumes." },
      { step: "02", title: "ML Prediction", desc: "Our model forecasts demand per zone, per day." },
      { step: "03", title: "Councils Act", desc: "Truck allocation and routes adjust to real demand." },
      { step: "04", title: "Feedback Loop", desc: "Actual collection data improves future accuracy." },
    ].map((item) => (
      <div key={item.step} className="bg-white p-6 rounded-2xl border border-gray-100">
        <span className="text-brand-300 font-extrabold text-3xl">{item.step}</span>
        <h3 className="font-bold mt-3 mb-2">{item.title}</h3>
        <p className="text-sm text-gray-500">{item.desc}</p>
      </div>
    ))}
  </div>
</section>

      {/* Transparency note */}
      <section className="bg-white border-t px-8 py-10 text-center text-sm text-gray-500">
        <p className="max-w-2xl mx-auto">
          Kasala.lk's predictions currently use a model trained on published waste-generation
          rates and estimated patterns. Accuracy improves as real collection data is logged
          by participating councils.
        </p>
      </section>

      <section className="relative py-24 px-6 text-white overflow-hidden">
  <div
    className="absolute inset-0 bg-cover bg-fixed bg-center"
    style={{ backgroundImage: "url('/city-bg.jpg')" }}
  ></div>
  <div className="absolute inset-0 bg-brand-900/80"></div>
  <div className="relative z-10 max-w-3xl mx-auto text-center">
    <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: "var(--font-heading)" }}>
      Built for Sri Lanka's Cities
    </h2>
    <p className="opacity-90">
      From Colombo's dense urban zones to Kandy's hill-country routes, Kasala.lk adapts
      predictions to local patterns — not generic estimates.
    </p>
  </div>
</section>

      {/* Footer */}
<footer className="bg-gray-900 text-gray-400 px-8 py-14">
  <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-10">
    <div>
      <div className="flex items-center gap-2 mb-3">
        <img src="/logo.png" alt="Kasala.lk" className="w-8 h-8 rounded-lg" />
        <span className="text-white font-bold">Kasala.Lk</span>
      </div>
      <p className="text-sm">Smarter waste collection for a cleaner Sri Lanka.</p>
    </div>
    <div>
      <h4 className="text-white font-semibold mb-3 text-sm">Product</h4>
      <ul className="space-y-2 text-sm">
        <li><a href="/dashboard" className="hover:text-white transition">Dashboard</a></li>
        <li><a href="/report" className="hover:text-white transition">Report Issue</a></li>
      </ul>
    </div>
    <div>
      <h4 className="text-white font-semibold mb-3 text-sm">Company</h4>
      <ul className="space-y-2 text-sm">
        <li><a href="#about" className="hover:text-white transition">About</a></li>
      </ul>
    </div>
    <div>
      <h4 className="text-white font-semibold mb-3 text-sm">Legal</h4>
      <p className="text-sm">Predictions are model estimates, refined with real council data over time.</p>
    </div>
  </div>
  <div className="max-w-6xl mx-auto border-t border-gray-800 mt-10 pt-6 text-sm text-center">
    © 2026 Kasala.lk — Built for a cleaner Sri Lanka 🇱🇰
  </div>
</footer>

    </main>
  );
}