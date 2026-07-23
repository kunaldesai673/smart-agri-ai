import { createContext, useContext, useState } from "react";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  // Default global language set to English ('en')
  const [globalLang, setGlobalLang] = useState('en');

  return (
    <LanguageContext.Provider value={{ globalLang, setGlobalLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}