import { createContext, useContext, useEffect, useState } from "react";

const LanguageContext = createContext({ language: "en", setLanguage: () => {} });

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => localStorage.getItem("language") || "en");
  useEffect(() => { localStorage.setItem("language", language); document.documentElement.lang = language; }, [language]);
  return <LanguageContext.Provider value={{ language, setLanguage }}>{children}</LanguageContext.Provider>;
}

export const useLanguage = () => useContext(LanguageContext);
