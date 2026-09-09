"use client";
import Header from "./components/Header";
import Footer from "./components/Footer";
import {
  MapPin, BarChart3, Route, Menu, X, ArrowRight,
  Database, Brain, Truck, RefreshCw,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";


export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <Header />

      {menuOpen && (
        <div className="md:hidden bg-white border-b px-6 py-4 flex flex-col gap-4 text-sm font-medium">
          <a href="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="/report" onClick={() => setMenuOpen(false)}>Report Issue</a>
        </div>
      )}

      {/* Hero section */}
      <section className="relative py-14 md:py-20 px-6 md:px-16 text-white overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/hero-photo.jpg"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-br from-brand-dark/95 via-brand-700/90 to-brand-500/85"></div>

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-extrabold mb-4"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Smarter Waste Collection for Sri Lanka
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-base md:text-lg mb-6 opacity-90"
          >
            Kasala.lk (කසල.lk) predicts garbage collection demand across Sri Lankan cities,
            helping councils plan smarter and reduce overflow.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <a href="/dashboard" className="group bg-white text-brand-700 px-7 py-3.5 rounded-xl font-semibold hover:bg-brand-50 active:scale-95 transition-all shadow-lg inline-flex items-center justify-center gap-2">
              View Dashboard
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="/report" className="border-2 border-white text-white px-7 py-3.5 rounded-xl font-semibold hover:bg-white/10 transition text-center">
              Report a Problem
            </a>
          </motion.div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-brand-700">
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/20 py-3 sm:py-6">
          <div className="text-center py-4 sm:py-0">
            <p className="text-3xl font-bold text-white">3</p>
            <p className="text-sm text-brand-100">Cities Covered</p>
          </div>
          <div className="text-center py-4 sm:py-0">
            <p className="text-3xl font-bold text-white">24/7</p>
            <p className="text-sm text-brand-100">Live Predictions</p>
          </div>
          <div className="text-center py-4 sm:py-0">
            <p className="text-3xl font-bold text-white">ML</p>
            <p className="text-sm text-brand-100">Powered Forecasting</p>
          </div>
        </div>
      </section>

      {/* Feature cards */}
      <section className="px-6 md:px-8 py-16 md:py-20 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-brand-600 font-semibold text-sm uppercase tracking-wider mb-2">
            What You Get
          </p>
          <h2 className="text-3xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>
            Everything councils need in one place
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center mb-4">
              <MapPin className="text-brand-600" size={24} />
            </div>
            <h3 className="font-bold text-lg mb-2 text-gray-900">Zone Predictions</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              See predicted waste demand for Colombo, Kandy, and Galle — updated daily.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center mb-4">
              <BarChart3 className="text-brand-600" size={24} />
            </div>
            <h3 className="font-bold text-lg mb-2 text-gray-900">Forecast Charts</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Track waste trends over time to plan truck allocation ahead of demand spikes.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center mb-4">
              <Route className="text-brand-600" size={24} />
            </div>
            <h3 className="font-bold text-lg mb-2 text-gray-900">Smart Routes</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Get suggested collection routes based on predicted demand per zone.
            </p>
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <section id="about" className="bg-brand-50 py-16 md:py-24 px-6">
        <div className="max-w-5xl mx-auto text-center mb-14">
          <p className="text-brand-600 font-semibold text-sm uppercase tracking-wider mb-2">
            The Process
          </p>
          <h2 className="text-3xl font-bold mb-3" style={{ fontFamily: "var(--font-heading)" }}>
            How Kasala.lk Works
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            A simple pipeline that turns local data into actionable collection plans.
          </p>
        </div>
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { step: "01", title: "Collect Data", desc: "Population, weather, events, and past collection volumes.", icon: Database },
            { step: "02", title: "ML Prediction", desc: "Our model forecasts demand per zone, per day.", icon: Brain },
            { step: "03", title: "Councils Act", desc: "Truck allocation and routes adjust to real demand.", icon: Truck },
            { step: "04", title: "Feedback Loop", desc: "Actual collection data improves future accuracy.", icon: RefreshCw },
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-brand-300 font-extrabold text-3xl">{item.step}</span>
                  <Icon className="text-brand-600" size={28} />
                </div>
                <h3 className="font-bold mt-1 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* City section (with transparency note merged in) */}
      <section className="relative py-16 md:py-24 px-6 text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center md:bg-fixed"
          style={{ backgroundImage: "url('/city-bg.jpg')" }}
        ></div>
        {/* Darkened, layered overlay for readability + depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/85 via-brand-dark/75 to-brand-dark/90"></div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative z-10 max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: "var(--font-heading)" }}>
            Built for Sri Lanka's Cities
          </h2>
          <p className="opacity-95 mb-6 text-base md:text-lg">
            From Colombo's dense urban zones to Kandy's hill-country routes, Kasala.lk adapts
            predictions to local patterns — not generic estimates.
          </p>
          <p className="text-sm opacity-80 border-t border-white/20 pt-6 max-w-xl mx-auto">
            Predictions currently use a model trained on published waste-generation rates and
            estimated patterns — accuracy improves as real collection data is logged by
            participating councils.
          </p>
        </motion.div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}