"use client";
import { createContext, useContext, useState, useEffect } from "react";

import en from "./en.json";  
import hi from "./hi.json"; 
import mr from "./mr.json"; 

export const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिन्दी" },
  { code: "mr", label: "मराठी" },
];

const translationsMap = { en, hi, mr };
const I18nContext = createContext();
export function I18nProvider({ children }) {
  const [lang, setLang] = useState("en");
  const [translations, setTranslations] = useState(en);

  const changeLang = (newLang) => {
    setLang(newLang);
    localStorage.setItem("lang", newLang);
    setTranslations(translationsMap[newLang] || en);
  };

  useEffect(() => {
    const savedLang = localStorage.getItem("lang") || "en";
    changeLang(savedLang);
  }, []);

  const t = (key) => {
    return key.split(".").reduce((obj, k) => obj?.[k], translations) || key;
  };

  return (
    <I18nContext.Provider value={{ lang, changeLang, t, LANGUAGES }}>
      {children}
    </I18nContext.Provider>
  );
}

export const useI18n = () => useContext(I18nContext);