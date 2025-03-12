
import React, { createContext, useContext, useState, useEffect } from 'react';
import { fr } from '../locales/fr';
import { en } from '../locales/en';

type Language = 'fr' | 'en';
type Translations = typeof fr | typeof en;

type LanguageContextType = {
  language: Language;
  t: (key: keyof typeof fr) => string;
  toggleLanguage: () => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('language');
    return (savedLanguage as Language) || 'fr';
  });

  const [translations, setTranslations] = useState<Translations>(language === 'fr' ? fr : en);

  useEffect(() => {
    localStorage.setItem('language', language);
    setTranslations(language === 'fr' ? fr : en);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prevLang => (prevLang === 'fr' ? 'en' : 'fr'));
  };

  const t = (key: keyof typeof fr) => {
    return translations[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, t, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
