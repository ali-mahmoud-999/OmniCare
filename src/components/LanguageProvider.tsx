"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "ar";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  dir: "ltr" | "rtl";
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  dir: "ltr",
});

export const useLanguage = () => useContext(LanguageContext);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedLang = localStorage.getItem("omnicare_lang") as Language;
    if (savedLang === "en" || savedLang === "ar") {
      setLanguageState(savedLang);
    }
    setMounted(true);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("omnicare_lang", lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  };

  if (!mounted) {
    return <div className="invisible">{children}</div>;
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, dir: language === "ar" ? "rtl" : "ltr" }}>
      <div dir={language === "ar" ? "rtl" : "ltr"} className={language === "ar" ? "font-cairo" : "font-inter"}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}
