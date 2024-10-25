import { useContext, createContext, useState, ReactNode } from "react";
import i18n from "../components/common/LangConfig";

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const useLang = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLang must be used within a LanguageProvider");
  }
  return context;
};

export const LangProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<string>(i18n.language);

  const changeLanguage = (selectedLang: string) => {
    setLanguage(selectedLang);
    localStorage.setItem("lang", selectedLang);
    i18n.changeLanguage(selectedLang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
