import { createContext, useContext, useEffect, useState } from "react";
import { LANGUAGE_BY_CODE } from "../i18n/messages";

const LanguageContext = createContext({ language: "en", languageInfo: LANGUAGE_BY_CODE.en, setLanguage: () => {} });

// First visit only: pick the first supported language from the browser's list
// ("ta-IN" → "ta", "zh-CN" exact). A saved choice always wins afterwards.
export function detectBrowserLanguage(preferences = []) {
  for (const preference of preferences) {
    if (!preference) continue;
    if (LANGUAGE_BY_CODE[preference]) return preference;
    const exact = Object.keys(LANGUAGE_BY_CODE).find((code) => code.toLowerCase() === preference.toLowerCase());
    if (exact) return exact;
    const base = preference.split("-")[0].toLowerCase();
    const primary = Object.keys(LANGUAGE_BY_CODE).find((code) => code.split("-")[0].toLowerCase() === base);
    if (primary) return primary;
  }
  return "en";
}

function initialLanguage() {
  try {
    const saved = localStorage.getItem("language");
    if (LANGUAGE_BY_CODE[saved]) return saved;
  } catch { /* storage unavailable: fall through to detection */ }
  if (typeof navigator === "undefined") return "en";
  return detectBrowserLanguage(navigator.languages?.length ? navigator.languages : [navigator.language]);
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(initialLanguage);
  const languageInfo = LANGUAGE_BY_CODE[language] || LANGUAGE_BY_CODE.en;
  useEffect(() => {
    try { localStorage.setItem("language", language); } catch { /* storage unavailable */ }
    document.documentElement.lang = language;
    document.documentElement.dir = languageInfo.dir;
  }, [language, languageInfo.dir]);
  return <LanguageContext.Provider value={{ language, languageInfo, setLanguage }}>{children}</LanguageContext.Provider>;
}

export const useLanguage = () => useContext(LanguageContext);
