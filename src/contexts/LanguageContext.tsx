import React, { createContext, useContext } from 'react';
import { useTranslation } from 'react-i18next';

interface LanguageContextType {
  t: (key: string, options?: any) => string;
  language: string;
  changeLanguage: (lang: string) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { t, i18n } = useTranslation();

  const value: LanguageContextType = {
    t,
    language: i18n.language,
    changeLanguage: i18n.changeLanguage,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

/**
 * Hook to use language context throughout the app
 * Usage: const { t, language, changeLanguage } = useLanguageContext();
 */
export const useLanguageContext = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguageContext must be used within LanguageProvider');
  }
  return context;
};
