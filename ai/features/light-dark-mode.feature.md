---
feature: Light & Dark Mode
file: ai/features/light-dark-mode.feature.md
---

## Goal
Allow users to switch between a dark theme (default) and a light theme across the entire site, with their preference persisted and OS preference respected automatically.

## Scope
**In:** Theme toggle button in the header, CSS variable overrides for light theme, localStorage persistence, `prefers-color-scheme` default, smooth transitions across all pages and components.
**Out:** Per-section theming, high-contrast or additional theme variants.

---

## Requirements

| # | Requirement |
|---|-------------|
| 1 | A toggle button/switch is visible and accessible on every page (rendered in the Header) |
| 2 | All theme-dependent colors use CSS custom properties (variables) |
| 3 | A `[data-theme="light"]` attribute on `<html>` overrides the dark defaults |
| 4 | Theme preference is saved to `localStorage` under the key `theme` |
| 5 | On first visit with no saved preference, the OS `prefers-color-scheme` is used as default |
| 6 | A smooth CSS transition is applied globally when switching themes |
| 7 | All components and pages must render correctly in both themes |

---

## User Flow
1. User visits site → app reads `localStorage.theme` → falls back to `prefers-color-scheme` → applies `data-theme` to `<html>`
2. User clicks the toggle → theme flips → `data-theme` updated on `<html>` → `localStorage` updated
3. User returns on next visit → saved theme is loaded immediately before paint

---

## Interfaces

**Hook:** `src/hooks/useTheme.ts`
- Reads initial theme from `localStorage` → falls back to `window.matchMedia`
- Exposes `{ theme, toggleTheme }` — `theme` is `'dark' | 'light'`
- Writes `data-theme` attribute to `document.documentElement`
- Saves to `localStorage` on every toggle

**Component:** `src/components/Header.tsx`
- Renders a `<button>` with a sun/moon icon that calls `toggleTheme`

**Styles:** `src/index.css`
- `:root` defines the dark theme defaults
- `[data-theme="light"]` overrides semantic tokens with light equivalents
- `html { transition: background-color 0.3s ease, color 0.3s ease; }`

---

## Data & Validation
- `localStorage` key: `"theme"` — accepted values: `"dark"` | `"light"`
- Invalid or missing values fall back to OS preference, then `"dark"`

---

## Acceptance Criteria
- [ ] Toggle button visible in header on all pages
- [ ] Clicking toggle switches theme visually across all components
- [ ] Refreshing the page preserves the selected theme
- [ ] First visit without saved preference matches OS setting
- [ ] No flash of wrong theme on load
- [ ] All text, backgrounds, borders, and cards render legibly in light mode
