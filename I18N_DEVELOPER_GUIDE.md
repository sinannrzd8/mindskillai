# 🚀 i18n Migration - Developer Quick Reference

## How to Migrate Components to i18n

### Step 1: Import useTranslation Hook
```typescript
import { useTranslation } from 'react-i18next';
```

### Step 2: Use Translation Hook in Component
```typescript
export default function MyComponent() {
  const { t } = useTranslation();
  
  // Now use t('key.path') for all text
}
```

### Step 3: Replace Hardcoded Text

#### ❌ BEFORE (Hardcoded):
```typescript
<h1>Welcome to MindSkill</h1>
<p>Start your learning journey</p>
<button>Get Started</button>
```

#### ✅ AFTER (Translated):
```typescript
<h1>{t('header.welcome')}</h1>
<p>{t('header.subtitle')}</p>
<button>{t('navigation.getStarted')}</button>
```

---

## Key Path Structure

All translations follow this pattern:
```
t('section.key')
```

### Example Sections:
- `navigation.*` - Top navigation items
- `header.*` - Hero/header section
- `features.*` - Feature cards
- `pricing.*` - Pricing section
- `dashboard.*` - Dashboard page
- `auth.*` - Login/signup forms
- `buttons.*` - Common buttons
- `errors.*` - Error messages
- `sidebar.*` - Navigation menus
- `onboarding.*` - Onboarding flow
- `roadmap.*` - Learning roadmap
- `settings.*` - Settings page
- `community.*` - Community section

---

## Available Translation Keys

Check `src/i18n/locales/en.json` for all available keys.

### Quick Key Lookup:

#### Common:
```
t('common.appName')     // "MindSkill"
t('common.appNameBrand') // "AI"
t('common.slogan')       // "Learning That Understands You"
t('common.tagline')      // Full tagline
```

#### Navigation:
```
t('navigation.features')
t('navigation.pricing')
t('navigation.getStarted')
t('navigation.logIn')
```

#### Auth:
```
t('auth.createAccount')
t('auth.welcomeBack')
t('auth.continueWithGoogle')
t('auth.emailAddress')
t('auth.password')
t('auth.signIn')
t('auth.demoCredentials')
```

#### Buttons:
```
t('buttons.save')
t('buttons.cancel')
t('buttons.delete')
t('buttons.next')
t('buttons.back')
```

#### Errors:
```
t('errors.loginFailed')
t('errors.fieldRequired')
t('errors.invalidEmail')
t('errors.unexpectedError')
```

---

## Components to Update

### Priority: HIGH
- [ ] `src/pages/LandingPage.tsx`
  - Hero section (title, subtitle, buttons)
  - Features section
  - Stats section
  - Testimonials
  - Social proof

- [ ] `src/pages/OnboardingPage.tsx`
  - All step titles & descriptions
  - Career options
  - Assessment questions
  - Results display

- [ ] `src/pages/DashboardPage.tsx`
  - All metric titles
  - Card labels
  - Activity descriptions

- [ ] `src/components/DashboardLayout.tsx`
  - Sidebar navigation items
  - Logout button

### Priority: MEDIUM
- [ ] `src/pages/PricingPage.tsx`
- [ ] `src/components/Navbar.tsx` (check for remaining hardcoded text)
- [ ] `src/components/Footer.tsx`
- [ ] `src/pages/RoadmapPage.tsx`
- [ ] `src/pages/EmotionalAnalyticsPage.tsx`

### Priority: LOW
- [ ] Other page files
- [ ] Modal/dialog components
- [ ] Tooltips
- [ ] Helper text

---

## Testing Translation

### Automatic Testing:
```typescript
// Check if a translation key exists
const key = 'auth.createAccount';
const translated = t(key);
console.log(translated); // Should show translated text
```

### Manual Testing:
1. Go to landing page
2. Click language switcher
3. Select different language
4. Verify all text updates instantly
5. Refresh page
6. Verify language preference persists

---

## Language Codes & Flags

```
en 🇬🇧 English
tr 🇹🇷 Turkish
ru 🇷🇺 Russian
az 🇦🇿 Azerbaijani
de 🇩🇪 German
```

---

## Common Mistakes to Avoid

❌ **DON'T:**
```typescript
// Hardcoded text mixed with translation
<p>Click {t('buttons.save')} to {action}</p>

// Translation in conditional (can be problematic)
const text = isSignUp ? "Create Account" : "Sign In";
```

✅ **DO:**
```typescript
// Full translation
<p>{t('someSection.clickSaveAction')}</p>

// Translation outside conditional
const key = isSignUp ? 'auth.createAccountBtn' : 'auth.signIn';
const text = t(key);
```

---

## Adding New Translation Keys

If you need a new key that doesn't exist:

1. Add it to `src/i18n/locales/en.json` first
2. Add it to other language files:
   - `tr.json`
   - `ru.json`
   - `az.json`
   - `de.json`

Example:
```json
// en.json
"mySection": {
  "newKey": "English text here"
}

// tr.json
"mySection": {
  "newKey": "Türkçe metin"
}

// ru.json
"mySection": {
  "newKey": "Русский текст"
}

// az.json
"mySection": {
  "newKey": "Azərbaycanca mətn"
}

// de.json
"mySection": {
  "newKey": "Deutscher Text"
}
```

---

## Performance Tips

✅ Translations are pre-loaded (good performance)
✅ Use `const { t } = useTranslation()` for consistent performance
✅ Avoid calling `useTranslation()` in loops

---

## Useful Resources

- i18next docs: https://www.i18next.com/
- React-i18next: https://react.i18next.com/
- Translation files: `src/i18n/locales/`
- Config: `src/i18n/config.ts`

---

## Checklist Template

When migrating a component:

- [ ] Import useTranslation
- [ ] Add `const { t } = useTranslation();`
- [ ] Replace all hardcoded text with `t('key.path')`
- [ ] Verify all keys exist in translation files
- [ ] Test with multiple languages
- [ ] Check responsive layout
- [ ] Verify no console warnings
- [ ] Mark PR as i18n migration

---

**Happy Translating! 🌍**
