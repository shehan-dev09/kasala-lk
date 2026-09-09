"use client";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="flex justify-between items-center px-6 md:px-10 py-4 bg-white/95 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <a href="/" className="flex items-center gap-2 md:gap-3">
          <img src="/public/logo.png" alt="Kasala.lk logo" className="w-9 h-9 rounded-lg" />
          <span className="text-xl font-bold text-brand-700" style={{ fontFamily: "var(--font-heading)" }}>
            Kasala.Lk
          </span>
        </a>

        <nav className="hidden md:flex gap-8 text-sm font-medium text-gray-700">
          <a href="/dashboard" className="hover:text-brand-600 transition">Dashboard</a>
          <a href="/#about" className="hover:text-brand-600 transition">About</a>
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
          <a href="/#about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="/report" onClick={() => setMenuOpen(false)}>Report Issue</a>
        </div>
      )}
    </>
  );
}