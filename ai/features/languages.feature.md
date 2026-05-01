---
feature: Multi-Language Support (EN / FR)
file: ai/features/languages.feature.md
---

## Goal
Allow users to switch the site language between English and French, with all user-facing text translated and the preference persisted across sessions.

## Scope
**In:** English (default) and French translations, language switcher in the header, all navigation / headings / paragraphs / buttons / labels / form fields translated, `localStorage` persistence.
**Out:** Auto-detection of browser language beyond the initial default, RTL languages, admin/back-office panel translation.

---

## Requirements

| # | Requirement |
|---|-------------|
| 1 | At least two languages are supported: English (`en`) and French (`fr`) |
| 2 | A language switcher button/toggle is visible in the header on every page |
| 3 | All user-facing text is translated: navigation, headings, paragraphs, buttons, labels, placeholders, and form feedback messages |
| 4 | Language preference is persisted in `localStorage` under the key `i18nextLng` |
| 5 | Translation strings are organised in structured JSON files (`src/i18n/en.json`, `src/i18n/fr.json`) |
| 6 | Switching language updates all visible text instantly without a page reload |

---

## User Flow
1. User visits site → `i18next` reads `localStorage` key → defaults to `"en"` if not set
2. User clicks language switcher (e.g., `EN | FR`) → `i18next.changeLanguage()` called → all text re-renders in the new language → `localStorage` updated automatically
3. User returns → saved language loaded, content renders immediately in correct language

---

## Interfaces

**Library:** `react-i18next` + `i18next` + `i18next-browser-languagedetector`

**Config:** `src/i18n/index.ts`
- Initialises i18next with `en` and `fr` namespaces
- Sets `fallbackLng: 'en'`

**Translation files:**
- `src/i18n/en.json` — all English strings
- `src/i18n/fr.json` — all French strings

**Hook:** `useTranslation()` from `react-i18next` — used in every component that renders user-facing text

**Component:** `src/components/Header.tsx`
- Renders `EN | FR` toggle buttons that call `i18n.changeLanguage()`

---

## Data & Validation
- Translation keys are namespaced by section (e.g., `nav.home`, `hero.tagline`, `contact.form.submit`)
- Missing keys fall back to `en` automatically via i18next `fallbackLng`
- `localStorage` key: `i18nextLng` — managed automatically by `i18next-browser-languagedetector`

---

## Acceptance Criteria
- [ ] Language switcher visible in header on all pages
- [ ] Clicking FR switches all visible text to French instantly
- [ ] Clicking EN switches back to English
- [ ] Page refresh preserves the selected language
- [ ] All navigation links, headings, buttons, and form labels are translated
- [ ] Form validation and feedback messages are translated
- [ ] No untranslated strings visible in either language
