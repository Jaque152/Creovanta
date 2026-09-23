"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { dictionaries, Language } from "./dictionaries";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: typeof dictionaries.es;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>("es");

  useEffect(() => {
    // Solo accedemos a localStorage cuando el cliente ya se montó
    const saved = localStorage.getItem("Devion_lang") as Language;
    if (saved === "es" || saved === "en") {
      setLangState(saved);
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    if (typeof window !== "undefined") {
      localStorage.setItem("Devion_lang", newLang);
    }
  };

  const t = dictionaries[lang];

  // RETORNAMOS EL PROVEEDOR DIRECTAMENTE SIN BLOCAR EL SSR
  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage debe usarse dentro de un LanguageProvider");
  }
  return context;
}