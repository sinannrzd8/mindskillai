import { useTranslation } from 'react-i18next';

/**
 * Custom hook for translations
 * Usage: const t = useTrans(); then t('navigation.features')
 */
export function useTrans() {
  const { t } = useTranslation();
  return t;
}

/**
 * Custom hook for i18n instance and language change
 * Usage: const { changeLanguage, language } = useLanguage();
 */
export function useLanguage() {
  const { i18n } = useTranslation();
  return {
    changeLanguage: i18n.changeLanguage,
    language: i18n.language,
    languages: i18n.languages,
  };
}
