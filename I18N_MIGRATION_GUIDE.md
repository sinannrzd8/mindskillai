"""
MULTILINGUAL INTEGRATION GUIDE
===============================

This guide shows how to integrate i18n translations into your existing pages.

QUICK START:
1. Import useTranslation hook:
   import { useTranslation } from 'react-i18next';

2. Use translations in component:
   const { t } = useTranslation();

3. Replace hardcoded text with translation keys:
   OLD: <h1>Learning That Understands You</h1>
   NEW: <h1>{t('header.title')} {t('header.titleGradient')}</h1>

EXAMPLE CONVERTING LANDING PAGE:
================================

import { useTranslation } from 'react-i18next';

export default function LandingPage() {
  const { t } = useTranslation();
  
  const features = [
    { 
      icon: Brain, 
      title: t('features.adaptiveLearning'),  // Translatable
      desc: t('features.adaptiveLearningDesc'),
      color: "from-primary to-chart-blue" 
    },
    // ... repeat for other features
  ];
  
  const stats = [
    { value: "50K+", label: t('stats.activeLearners') },
    { value: "94%", label: t('stats.completionRate') },
    { value: "2.5x", label: t('stats.fasterLearning') },
    { value: "500+", label: t('stats.certifications') },
  ];
  
  return (
    <div>
      <h1 className="...">
        {t('header.title')}<br />
        <span className="gradient-text">{t('header.titleGradient')}</span>
      </h1>
      <p className="...">{t('header.subtitle')}</p>
      
      <button className="...">
        {t('buttons.startFreeTrial')}
      </button>
    </div>
  );
}

HOW TO ADD TRANSLATIONS:
=======================

1. If text key is missing in translations, ADD IT to all locale files:
   - src/i18n/locales/en.json
   - src/i18n/locales/tr.json
   - src/i18n/locales/ru.json
   - src/i18n/locales/az.json

2. Follow the hierarchy structure (common.*, navigation.*, buttons.*, etc.)

3. Test language switching in browser dev tools:
   localStorage.setItem('language', 'tr'); // Switch to Turkish
   window.location.reload();

SUPPORTED TRANSLATION KEYS:
===========================

common.* - App name, slogan, general text
navigation.* - Nav links, labels
header.* - Hero section
features.* - Feature descriptions
steps.* - How it works steps
stats.* - Statistics labels
testimonials.* - Testimonial labels
pricing.* - Pricing page
dashboard.* - Dashboard labels
auth.* - Login/Register
settings.* - Settings page
community.* - Community page
buttons.* - Button text
errors.* - Error messages

LANGUAGE SWITCHER LOCATION:
===========================
Header Navbar - Integrated into navigation
Mobile Menu - Appears in mobile nav dropdown
Stored in localStorage - Persists across sessions

ADDING A NEW LANGUAGE:
=====================

1. Create new locale file: src/i18n/locales/xx.json
2. Add to config: src/i18n/config.ts
   - Add to SUPPORTED_LANGUAGES object
   - Add to resources object
   - Add import statement

3. Example for Spanish:
   SUPPORTED_LANGUAGES = {
     ...existing,
     es: { name: 'Spanish', flag: '🇪🇸', nativeName: 'Español' },
   }

BEST PRACTICES:
===============

✓ Always use translation keys in JSX
✓ Keep translations organized hierarchically
✓ Use exact key names in all locale files
✓ Test all languages before deployment
✓ Use useTranslation hook for consistency
✓ Wrap dynamic content (name, date) properly
✓ Some content like API responses may not need translation

EXAMPLE WITH DYNAMIC CONTENT:
=============================

// ❌ Wrong - Translation outside of render
const greeting = t('navigation.welcome') + username;

// ✓ Correct - Use i18next interpolation
// In JSON: { "greeting": "Welcome {{name}}" }
const greeting = t('navigation.welcome', { name: username });

// Or compose in JSX:
<p>{t('navigation.welcome')} {username}</p>
"""

Just reference this guide when migrating pages to use translations.
