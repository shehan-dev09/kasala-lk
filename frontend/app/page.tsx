"use client";
import {
  MapPin, BarChart3, Route,
  Database, Brain, Truck, RefreshCw, ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useLanguage } from "./context/LanguageContext";
import { translations } from "./translations";

export default function Home() {
  const { lang } = useLanguage();
  const t = translations[lang];

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <Header />

      {/* Hero section */}
      <section className="relative py-20 md:py-32 px-6 md:px-16 text-white overflow-hidden">
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
            {t.hero_title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-base md:text-lg mb-6 opacity-90"
          >
            {t.hero_subtitle}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <a href="/dashboard" className="group bg-white text-brand-700 px-7 py-3.5 rounded-xl font-semibold hover:bg-brand-50 active:scale-95 transition-all shadow-lg inline-flex items-center justify-center gap-2">
              {t.hero_btn_dashboard}
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="/report" className="border-2 border-white text-white px-7 py-3.5 rounded-xl font-semibold hover:bg-white/10 transition text-center">
              {t.hero_btn_report}
            </a>
          </motion.div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-brand-700">
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/20 py-3 sm:py-6">
          <div className="text-center py-4 sm:py-0">
            <p className="text-3xl font-bold text-white">3</p>
            <p className="text-sm text-brand-100">{t.stats_cities}</p>
          </div>
          <div className="text-center py-4 sm:py-0">
            <p className="text-3xl font-bold text-white">24/7</p>
            <p className="text-sm text-brand-100">{t.stats_predictions}</p>
          </div>
          <div className="text-center py-4 sm:py-0">
            <p className="text-3xl font-bold text-white">ML</p>
            <p className="text-sm text-brand-100">{t.stats_ml}</p>
          </div>
        </div>
      </section>

      {/* Feature cards */}
      <section className="px-6 md:px-8 py-16 md:py-20 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-brand-600 font-semibold text-sm uppercase tracking-wider mb-2">
            {t.features_eyebrow}
          </p>
          <h2 className="text-3xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>
            {t.features_title}
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
            <h3 className="font-bold text-lg mb-2 text-gray-900">{t.feature1_title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">{t.feature1_desc}</p>
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
            <h3 className="font-bold text-lg mb-2 text-gray-900">{t.feature2_title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">{t.feature2_desc}</p>
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
            <h3 className="font-bold text-lg mb-2 text-gray-900">{t.feature3_title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">{t.feature3_desc}</p>
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <section id="about" className="bg-brand-50 py-16 md:py-24 px-6">
        <div className="max-w-5xl mx-auto text-center mb-14">
          <p className="text-brand-600 font-semibold text-sm uppercase tracking-wider mb-2">
            {t.howitworks_eyebrow}
          </p>
          <h2 className="text-3xl font-bold mb-3" style={{ fontFamily: "var(--font-heading)" }}>
            {t.howitworks_title}
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">{t.howitworks_subtitle}</p>
        </div>
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { step: "01", title: t.step1_title, desc: t.step1_desc, icon: Database },
            { step: "02", title: t.step2_title, desc: t.step2_desc, icon: Brain },
            { step: "03", title: t.step3_title, desc: t.step3_desc, icon: Truck },
            { step: "04", title: t.step4_title, desc: t.step4_desc, icon: RefreshCw },
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

      {/* City section */}
      <section className="relative py-20 md:py-16 lg:py-24 px-6 text-white overflow-hidden min-h-[400px] flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center md:bg-fixed"
          style={{ backgroundImage: "url('/city-bg.jpg')" }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/85 via-brand-dark/75 to-brand-dark/90"></div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative z-10 max-w-3xl mx-auto text-center px-2"
        >
          <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: "var(--font-heading)" }}>
            {t.city_title}
          </h2>
          <p className="opacity-95 mb-6 text-base md:text-lg">{t.city_desc}</p>
          <p className="text-sm opacity-80 border-t border-white/20 pt-6 max-w-xl mx-auto">
            {t.city_note}
          </p>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}