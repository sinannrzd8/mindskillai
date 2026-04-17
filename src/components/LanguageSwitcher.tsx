import { useTranslation } from 'react-i18next';
import { useRef, useEffect, useState } from 'react';
import { SUPPORTED_LANGUAGES } from '@/i18n/config';
import { ChevronDown } from 'lucide-react';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLanguage = i18n.language;
  const currentLangData = SUPPORTED_LANGUAGES[currentLanguage as keyof typeof SUPPORTED_LANGUAGES] || SUPPORTED_LANGUAGES.en;

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-lg border border-input bg-background px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent/10 focus:outline-none focus:ring-2 focus:ring-primary/30"
        aria-label="Language selector"
      >
        <span className="text-base">{currentLangData.flag}</span>
        <span className="hidden sm:inline text-xs">{currentLangData.nativeName}</span>
        <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-50 mt-2 w-48 rounded-lg border border-border bg-card shadow-lg overflow-hidden animate-fade-in-up">
          <div className="p-1">
            {Object.entries(SUPPORTED_LANGUAGES).map(([code, langData]) => (
              <button
                key={code}
                onClick={() => handleLanguageChange(code)}
                className={`w-full flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-all text-left ${
                  currentLanguage === code
                    ? 'bg-primary/10 text-primary'
                    : 'text-foreground hover:bg-muted'
                }`}
              >
                <span className="text-base">{langData.flag}</span>
                <div className="flex-1">
                  <div className="font-medium">{langData.name}</div>
                  <div className="text-xs text-muted-foreground">{langData.nativeName}</div>
                </div>
                {currentLanguage === code && (
                  <div className="h-2 w-2 rounded-full bg-primary" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
