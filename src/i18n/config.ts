import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from './locales/en.json';
import trTranslations from './locales/tr.json';
import ruTranslations from './locales/ru.json';
import azTranslations from './locales/az.json';
import deTranslations from './locales/de.json';

export const SUPPORTED_LANGUAGES = {
  en: { name: 'English', flag: '🇬🇧', nativeName: 'English' },
  tr: { name: 'Turkish', flag: '🇹🇷', nativeName: 'Türkçe' },
  ru: { name: 'Russian', flag: '🇷🇺', nativeName: 'Русский' },
  az: { name: 'Azerbaijani', flag: '🇦🇿', nativeName: 'Azərbaycanca' },
  de: { name: 'German', flag: '🇩🇪', nativeName: 'Deutsch' },
};

export const resources = {
  en: { translation: enTranslations },
  tr: { translation: trTranslations },
  ru: { translation: ruTranslations },
  az: { translation: azTranslations },
  de: { translation: deTranslations },
};

// Get saved language from localStorage or default to English
const savedLanguage = localStorage.getItem('language') || 'en';

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLanguage,
    fallbackLng: 'en',
    defaultNS: 'translation',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

// Save language preference to localStorage whenever it changes
i18n.on('languageChanged', (lng) => {
  localStorage.setItem('language', lng);
});

export default i18n;
