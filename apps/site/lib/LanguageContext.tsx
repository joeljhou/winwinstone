"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { translations } from "./translations";

export type Language = "en" | "zh";

type TranslationSet = typeof translations.en;

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: TranslationSet;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

function getStoredLanguage(): Language {
  if (typeof window === "undefined") return "en";
  const saved = localStorage.getItem("siteLanguage");
  return saved === "zh" ? "zh" : "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(getStoredLanguage);

  useEffect(() => {
    document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
  }, [language]);

  const toggleLanguage = () => {
    const next = language === "en" ? "zh" : "en";
    setLanguage(next);
    localStorage.setItem("siteLanguage", next);
  };

  const t = translations[language] as TranslationSet;

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}

