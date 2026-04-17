# ⚡ QUICK START GUIDE - i18n Implementation for Developers

## 🎯 5-Minute Setup for Any Component

### Copy-Paste Template

```typescript
import { useTranslation } from 'react-i18next';

export default function YourComponent() {
  // ✅ Step 1: Always add this line
  const { t } = useTranslation();

  // ✅ Step 2: Replace ALL hardcoded text with t() calls
  return (
    <div>
      <h1>{t('section.key')}</h1>
      <p>{t('section.description')}</p>
      <button>{t('buttons.save')}</button>
    </div>
  );
}
```

---

## 🔑 Finding Translation Keys

### Option 1: Search in Translation File
```bash
# Open: src/i18n/locales/en.json
# Search for your text or category
# Example: ctrl+f → "Dashboard"
```

### Option 2: By Section

| Need | Section | Example Key |
|------|---------|-------------|
| Navigation text | `navigation.` | `t('navigation.features')` |
| Button text | `buttons.` | `t('buttons.save')` |
| Error messages | `errors.` | `t('errors.loginFailed')` |
| Form labels | `auth.` or `onboarding.` | `t('auth.emailAddress')` |
| Dashboard items | `dashboard.` | `t('dashboard.careerReadiness')` |
| Page titles | `sidebar.` or page name | `t('sidebar.dashboard')` |

### Option 3: View Full Key List
```
Less than 1 minute: Open src/i18n/locales/en.json in editor
Search by Ctrl+F for your text
Copy the exact key path
```

---

## 🔄 3-Step Conversion Process

### Step 1: Identify Hardcoded Text
```typescript
// BEFORE (has hardcoded English)
<h1>Welcome Back</h1>
<button>Save Changes</button>
<span>Loading...</span>
```

### Step 2: Find Translation Keys
```typescript
// Search en.json for keys, find:
// "dashboard.greeting": "Welcome Back"
// "buttons.save": "Save Changes"
// "common.loading": "Loading..."
```

### Step 3: Replace with t() Calls
```typescript
// AFTER (uses translations)
<h1>{t('dashboard.greeting')}</h1>
<button>{t('buttons.save')}</button>
<span>{t('common.loading')}</span>
```

---

## 📊 Common Patterns

### Simple Text
```typescript
<h1>{t('header.title')}</h1>
<p>{t('header.subtitle')}</p>
<button>{t('buttons.start')}</button>
```

### Using Variables
```typescript
// If you need dynamic content:
<p>Hello, {userName}</p>  // ✅ Keep this as-is

// But translate the static parts:
<p>{t('common.greeting')}, {userName}</p>
```

### Data-Driven Lists (Recommended)
```typescript
// Define data with translation KEY references
const items = [
  { titleKey: 'features.adaptiveLearning', ... },
  { titleKey: 'features.emotionalAnalytics', ... },
];

// Render using keys
{items.map(item => (
  <div key={item.titleKey}>
    <h3>{t(item.titleKey)}</h3>  // ✅ Automatic translation
  </div>
))}
```

### Conditional Text
```typescript
// ✅ Good: Translate each condition separately
{isLoggedIn ? t('buttons.logout') : t('buttons.login')}

// ❌ Avoid: Don't translate conditionally
// {isLoggedIn && t('buttons.logout')}  // Only one branch translated
```

---

## 🚀 Testing Your Changes

### Quick Test (30 seconds):
1. Save your component
2. Go to Navbar → Language Switcher
3. Click different languages (TR, RU, DE, AZ)
4. Your component text should change instantly
5. NO page reload should happen

### What to Look For:
- ✅ Text changes when you switch languages
- ✅ All text in your component is translated
- ✅ No hardcoded English remains
- ✅ Console shows no warnings about missing keys

### If Something's Wrong:
```
Error: Missing translation key
→ Check the key exists in en.json
→ Check spelling matches exactly
→ Restart dev server if needed
```

---

## 📝 Component Checklist

Before committing changes:

- [ ] `import { useTranslation }` added
- [ ] `const { t } = useTranslation()` on first line of component
- [ ] All visible text replaced with `t('key')`
- [ ] Tested language switching (instant update?)
- [ ] No console warnings about missing keys
- [ ] Layout/styling still correct
- [ ] Tested on mobile (if applicable)

---

## 🎯 High-Priority Components

Do these FIRST (highest impact):

### 1. DashboardPage.tsx
- Metrics cards (Career Readiness, Emotional State)
- Chart titles and labels
- Greeting text ("Good Morning, Alex")
- ~25 hardcoded texts to replace

**Keys to use:** `dashboard.` section

### 2. OnboardingPage.tsx
- Career path options
- Quiz questions/answers
- Step titles and descriptions
- Form field labels
- ~32 hardcoded texts to replace

**Keys to use:** `onboarding.` section

### 3. DashboardLayout.tsx (Sidebar)
- Navigation items (student/teacher/admin)
- Section titles
- Status labels
- ~15 hardcoded texts to replace

**Keys to use:** `sidebar.` section

---

## 🔗 Reference Resources

### Files You'll Need:
```
✅ src/pages/LoginPage.tsx          (fully converted - SEE THIS FIRST)
✅ src/pages/LandingPage.tsx        (hero section converted - GOOD EXAMPLE)
✅ src/i18n/locales/en.json         (all translation keys - REFERENCE)
✅ I18N_IMPLEMENTATION_GUIDE.md      (detailed patterns - FOR COMPLEX CASES)
```

### Quick Lookup:
```
Need a key?
→ Open src/i18n/locales/en.json
→ Ctrl+F search for your text
→ Copy the key path
→ Use: t('key.path')
```

---

## ❌ Common Mistakes to Avoid

### ❌ Don't:
```typescript
// Forgot to import
<h1>{t('title')}</h1>  // ❌ t is undefined

// Forgot to call hook
const MyComponent = () => {
  // Missing: const { t } = useTranslation();
  return <h1>{t('title')}</h1>;  // ❌ Error
};

// Key doesn't exist
<h1>{t('nonexistent.key')}</h1>  // ❌ Falls back to English

// Mixed hardcoded and translated
<h1>Welcome {t('dashboard.name')}</h1>  // ❌ "Welcome" is hardcoded

// Forgot translation keys in data
const items = [{title: 'Item'}];  // ❌ Hardcoded
{items.map(i => <h3>{i.title}</h3>)}  // ❌ Won't translate
```

### ✅ Do:
```typescript
// Import at top
import { useTranslation } from 'react-i18next';

// Call hook first thing in component
const { t } = useTranslation();

// Use exact key that exists in en.json
<h1>{t('dashboard.greeting')}</h1>

// Translate ALL visible text
<h1>{t('section.title')}</h1>
{t('section.subtitle')}

// Use keys in data structures
const items = [
  { titleKey: 'section.title', descKey: 'section.desc' }
];
{items.map(i => (
  <h3>{t(i.titleKey)}</h3>
))}
```

---

## 📞 Quick Help

### "Where's the translation key?"
→ Open `src/i18n/locales/en.json`  
→ Ctrl+F search for your text  
→ Copy the key (e.g., `dashboard.careerReadiness`)  
→ Use: `t('dashboard.careerReadiness')`

### "Why isn't my text translating?"
1. Check key exists in en.json (Ctrl+F)
2. Check spelling matches exactly
3. Check you called `const { t } = useTranslation()`
4. Restart dev server
5. Check console for warnings

### "How do I test?"
1. Save file (npm/yarn auto-recompiles)
2. In Navbar, click Language Switcher
3. Change to Turkish (TR)
4. Your text should change instantly
5. If not → Check console for errors

### "Can I add new translation keys?"
Yes! Add to all 5 language files:
- en.json, tr.json, ru.json, de.json, az.json
- Use same key path in all files
- Then use: `t('new.key')`

---

## ✨ Pro Tips

### Tip 1: Use Sections Wisely
```typescript
// Group related keys under sections
buttons.save, buttons.cancel, buttons.delete
dashboard.title, dashboard.subtitle, dashboard.metrics
```

### Tip 2: Translation Files Are Your Reference
```
The source of truth is: src/i18n/locales/en.json
All other languages (tr, ru, de, az) mirror this structure
```

### Tip 3: Copy Working Examples
```
LoginPage.tsx and LandingPage.tsx work perfectly
Copy their pattern exactly for your component
```

### Tip 4: Test Early and Often
```
After each component, test language switching
Don't wait until the end to test everything
Catch issues immediately
```

---

## 🎓 Learning Path

1. **First:** Read this file (you are here)
2. **Second:** Look at src/pages/LoginPage.tsx (working example)
3. **Third:** Look at src/pages/LandingPage.tsx (another example)
4. **Fourth:** Open src/i18n/locales/en.json (see all keys)
5. **Fifth:** Convert your first component
6. **Test:** Change language in Navbar
7. **Repeat:** Move to next component

---

## 🚀 Ready to Start?

```typescript
// Copy this template:
import { useTranslation } from 'react-i18next';

export default function MyComponent() {
  const { t } = useTranslation();

  return (
    <div>
      {/* Replace all text with t() calls */}
    </div>
  );
}

// 1. Add the template
// 2. Find translation keys in en.json
// 3. Replace hardcoded text with t() calls
// 4. Test language switching
// 5. Commit!
```

---

## 📊 Conversion Stats

- **Pattern:** Same for all 25+ remaining components
- **Time per component:** 15-20 minutes
- **Difficulty:** Easy (just search-and-replace with proper keys)
- **Testing:** Switch language → Text updates instantly ✅
- **Automation:** 70% could be scripted

**Total Time for All:** 6-8 hours (can be parallelized)

---

*Created: April 17, 2026*  
*For: MindSkill AI Team*  
*Questions? Check I18N_IMPLEMENTATION_GUIDE.md or see examples in LoginPage.tsx*
