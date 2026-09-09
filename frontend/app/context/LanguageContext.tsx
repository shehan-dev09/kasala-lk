"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "en" | "si";

interface LanguageContextType {
  lang: Language;
  toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>("en");

  // Load saved language on first mount
  useEffect(() => {
    const saved = localStorage.getItem("kasala_lang") as Language | null;
    if (saved === "en" || saved === "si") {
      setLang(saved);
    }
  }, []);

  const toggleLang = () => {
    setLang((prev) => {
      const next = prev === "en" ? "si" : "en";
      localStorage.setItem("kasala_lang", next);
      return next;
    });
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}