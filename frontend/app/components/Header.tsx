"use client";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../translations";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang, toggleLang } = useLanguage();
  const t = translations[lang];

  return (
    <>
      <header className="flex justify-between items-center px-6 md:px-10 py-4 bg-white/95 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <a href="/" className="flex items-center gap-2 md:gap-3">
          <img src="/logo.png" alt="Kasala.lk logo" className="w-9 h-9 rounded-lg" />
          <span className="text-xl font-bold text-brand-700" style={{ fontFamily: "var(--font-heading)" }}>
            Kasala.Lk
          </span>
        </a>

        <nav className="hidden md:flex gap-8 text-sm font-medium text-gray-700">
          <a href="/dashboard" className="hover:text-brand-600 transition">{t.nav_dashboard}</a>
          <a href="/#about" className="hover:text-brand-600 transition">{t.nav_about}</a>
          <a href="/report" className="hover:text-brand-600 transition">{t.nav_report}</a>
        </nav>

        {/* DESKTOP toggle + Get Started */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={toggleLang}
            className="relative flex items-center bg-gray-100 rounded-full p-1 w-[76px] h-8 transition-colors"
          >
            <span
              className={`absolute top-1 left-1 w-[34px] h-6 bg-white rounded-full shadow-sm transition-transform duration-300 ${
                lang === "si" ? "translate-x-[36px]" : "translate-x-0"
              }`}
            ></span>
            <span className={`relative z-10 w-1/2 text-center text-xs font-semibold transition-colors ${lang === "en" ? "text-brand-700" : "text-gray-400"}`}>
              EN
            </span>
            <span className={`relative z-10 w-1/2 text-center text-xs font-semibold transition-colors ${lang === "si" ? "text-brand-700" : "text-gray-400"}`}>
              සිං
            </span>
          </button>

          <a href="/dashboard" className="bg-brand-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-brand-800 transition">
            {t.nav_getstarted}
          </a>
        </div>

        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* MOBILE menu dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white border-b px-6 py-4 flex flex-col gap-4 text-sm font-medium">
          <a href="/dashboard" onClick={() => setMenuOpen(false)}>{t.nav_dashboard}</a>
          <a href="/#about" onClick={() => setMenuOpen(false)}>{t.nav_about}</a>
          <a href="/report" onClick={() => setMenuOpen(false)}>{t.nav_report}</a>

          <div className="border-t pt-4 mt-2 flex items-center justify-between">
            <span className="text-sm text-gray-500">Language</span>
            <button
              onClick={toggleLang}
              className="relative flex items-center bg-gray-100 rounded-full p-1 w-[76px] h-8 transition-colors"
            >
              <span
                className={`absolute top-1 left-1 w-[34px] h-6 bg-white rounded-full shadow-sm transition-transform duration-300 ${
                  lang === "si" ? "translate-x-[36px]" : "translate-x-0"
                }`}
              ></span>
              <span className={`relative z-10 w-1/2 text-center text-xs font-semibold transition-colors ${lang === "en" ? "text-brand-700" : "text-gray-400"}`}>
                EN
              </span>
              <span className={`relative z-10 w-1/2 text-center text-xs font-semibold transition-colors ${lang === "si" ? "text-brand-700" : "text-gray-400"}`}>
                සිං
              </span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}