"use client";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../translations";

export default function Footer() {
  const { lang } = useLanguage();
  const t = translations[lang];

  return (
    <footer className="bg-gray-900 text-gray-400 px-6 md:px-8 py-14">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <img src="/logo.png" alt="Kasala.lk" className="w-8 h-8 rounded-lg" />
            <span className="text-white font-bold">Kasala.Lk</span>
          </div>
          <p className="text-sm">{t.footer_tagline}</p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3 text-sm">{t.footer_product}</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/dashboard" className="hover:text-white transition">{t.nav_dashboard}</a></li>
            <li><a href="/report" className="hover:text-white transition">{t.nav_report}</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3 text-sm">{t.footer_company}</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/#about" className="hover:text-white transition">{t.nav_about}</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3 text-sm">{t.footer_legal}</h4>
          <p className="text-sm">{t.footer_legal_text}</p>
        </div>
      </div>
      <div className="max-w-6xl mx-auto border-t border-gray-800 mt-10 pt-6 text-sm text-center">
        © 2026 Kasala.lk — Built for a cleaner Sri Lanka 🇱🇰
      </div>
    </footer>
  );
}