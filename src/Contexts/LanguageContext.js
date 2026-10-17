import { createContext, useContext, useEffect, useState } from "react";
import { LANGUAGE_BY_CODE } from "../i18n/messages";

const LanguageContext = createContext({ language: "en", languageInfo: LANGUAGE_BY_CODE.en, setLanguage: () => {} });

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem("language");
    return LANGUAGE_BY_CODE[saved] ? saved : "en";
  });
  const languageInfo = LANGUAGE_BY_CODE[language] || LANGUAGE_BY_CODE.en;
  useEffect(() => {
    localStorage.setItem("language", language);
    document.documentElement.lang = language;
    document.documentElement.dir = languageInfo.dir;
  }, [language, languageInfo.dir]);
  return <LanguageContext.Provider value={{ language, languageInfo, setLanguage }}>{children}</LanguageContext.Provider>;
}

export const useLanguage = () => useContext(LanguageContext);
