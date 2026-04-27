# Feature Spec — Project Layout (Header & Footer)

> **Prerequisite:** Read [ai-spec.md](../ai-spec.md) before implementing anything in this feature.

---

## 1. Feature Goal & Scope

### Goal
Establish the global page layout that wraps every view in the portfolio: a sticky header with navigation and AI-generated logo, a footer with contact and copyright information, and full responsive behaviour from mobile (≤ 768px) to desktop (> 768px). Every future section and page slots into this layout without modification.

### In scope
- `Layout` wrapper component (`src/components/Layout.tsx`) — renders header + `<main>` slot + footer
- `Header` / `Navbar` component — sticky, logo, nav links
- `Footer` component — contact info, social links, copyright notice
- AI-generated personal logo image (placed in `public/assets/`)
- Global responsive rules: desktop horizontal nav, mobile icon-based bottom nav
- Wiring `App.tsx` so that all routes render inside `Layout`

### Out of scope
- Section content (Hero, About, Projects, etc.) — covered in later features
- Page routing beyond what is already stubbed in `App.tsx` (routing formalised in Feature 02)
- Dark / light mode toggle — covered in Feature 08
- Contact form functionality — covered in Feature 05
- Admin login / back office pages — covered in Features 06 & 07

---

## 2. Requirements Breakdown

### R1 — Layout wrapper
- `src/components/Layout.tsx` accepts `children` (React nodes) and renders:
  ```
  <div class="layout">
    <Header />
    <main>{children}</main>
    <Footer />
  </div>
  ```
- `App.tsx` wraps all route components inside `<Layout>`
- Every page automatically inherits the header and footer without importing them individually

### R2 — Header / Navbar
- File: `src/components/Header.tsx`
- Must be `position: sticky` (or `fixed`) at `top: 0`, above page content (`z-index` above sections)
- Contains:
  - AI-generated logo (links to `/` or home anchor)
  - Navigation links to all main sections: Home, About, Projects, Experience, Contact
- Consistent background colour and styling across all pages (no per-page overrides)
- Logo and nav links are visible simultaneously on desktop

### R3 — Footer
- File: `src/components/Footer.tsx`
- Renders at the bottom of every page after all section content
- Must include:
  - At least one contact method (email address or `mailto:` link)
  - Social links (GitHub, LinkedIn — at minimum)
  - Copyright notice: `© {currentYear} Charles Winfield. All rights reserved.`
- `currentYear` is generated dynamically via `new Date().getFullYear()` — never hardcoded

### R4 — AI-generated personal logo
- Logo image generated using an AI image tool (e.g. DALL·E, Midjourney, Adobe Firefly)
- Saved to `public/assets/logo.png` (or `.svg`)
- Rendered in `Header` as an `<img>` or inline SVG
- Wrapped in a link that navigates to the Home page (`/` or `#home`)
- `alt` attribute set to a meaningful description: e.g. `"Charles Winfield logo"`
- Scales correctly without overflow on all viewport sizes

### R5 — Global responsive behaviour

#### Desktop (> 768px)
- Navigation links displayed **horizontally** in the header, in a single row
- Logo and nav links share the same header bar
- All section content displayed at full width with comfortable padding

#### Mobile (≤ 768px)
- Navigation links become **icon-based** and move to a **bottom navigation bar** (fixed at bottom of viewport)
- Logo remains in the top header, scaled down appropriately
- No horizontal scrolling — all content fits within the viewport width
- Images scale with `max-width: 100%`
- Sections stack vertically
- Text remains readable (minimum 16px body font, adequate line-height)
- No content overflows the viewport (`overflow-x: hidden` on `body` as a safety net)

---

## 3. Interfaces Involved

### Components
| File | Purpose |
|---|---|
| `src/components/Layout.tsx` | Wraps all pages; composes Header + main slot + Footer |
| `src/components/Header.tsx` | Sticky top bar — logo + desktop nav |
| `src/components/Footer.tsx` | Bottom bar — contact info + social links + copyright |
| `src/components/BottomNav.tsx` | Mobile-only icon nav (fixed bottom) |

### Pages / Routes
No new routes introduced in this feature. `Layout` wraps existing stubs in `App.tsx`.

### Assets
| File | Purpose |
|---|---|
| `public/assets/logo.png` (or `.svg`) | AI-generated personal logo |

### Styles
Global layout styles live in `src/index.css`. Component-scoped styles use a co-located `.css` file (e.g. `Header.css`) or CSS Modules if preferred — pick one pattern and apply it consistently.

---

## 4. Data, Validations & Expected Behaviour

### Navigation link list
Defined as a constant array in the component (or in `src/lib/data.ts` if reused elsewhere):
```ts
const NAV_LINKS = [
  { label: 'Home',       href: '#home'       },
  { label: 'About',      href: '#about'       },
  { label: 'Projects',   href: '#projects'    },
  { label: 'Experience', href: '#experience'  },
  { label: 'Contact',    href: '#contact'     },
];
```
Hash-based links (`#section`) are used because the portfolio is a single scrollable page (per `ai-spec.md` Rule 2).

### Social links
Defined as constants — real URLs must be substituted before the feature is marked Done:
```ts
const SOCIAL_LINKS = [
  { label: 'GitHub',   href: 'https://github.com/charleswinfield108',  icon: GithubIcon   },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/...',            icon: LinkedinIcon },
];
```

### Copyright year
```ts
const year = new Date().getFullYear();
// renders: © 2026 Charles Winfield. All rights reserved.
```

### Logo behaviour
- Clicking the logo scrolls to / navigates to the top of the page
- `alt` text is non-empty and descriptive
- Image does not stretch or pixelate; use an appropriately sized source file

### Sticky header behaviour
- Header remains visible at the top of the viewport as the user scrolls down
- Header does not overlap content below it — `<main>` has top padding equal to header height

### Mobile bottom nav behaviour
- Shown only on viewports ≤ 768px (via CSS media query, not JS)
- Each nav item displays an icon (from `lucide-react`) + a short label beneath it
- Active / current section is visually highlighted (e.g. coloured icon or underline)
- Fixed positioning does not cover page content — `<main>` has bottom padding equal to bottom nav height on mobile

---

## 5. User Flow

### Desktop
```
User visits https://charleswinfield.github.io
        │
        ▼
Page loads → Header visible at top (sticky)
        │   Logo (left) + nav links (right): Home | About | Projects | Experience | Contact
        │
        ▼
User scrolls → Header stays fixed at top
        │
        ▼
User clicks nav link → page scrolls to that section (hash anchor)
        │
        ▼
Footer visible at bottom of page content
        │   Email · GitHub · LinkedIn · Copyright notice
```

### Mobile
```
User visits site on phone
        │
        ▼
Header at top → Logo only (compact)
        │
        ▼
Bottom nav bar fixed at bottom → icon + label for each section
        │
        ▼
User taps icon → page scrolls to that section
        │
        ▼
Footer still present below all content (above bottom nav padding)
```

---

## 6. Acceptance Criteria

All criteria must pass before merging `feature/header-footer` → `dev`.

### Layout
- [ ] **AC1** — `Layout.tsx` exists and wraps `Header`, `<main>`, and `Footer` in that order
- [ ] **AC2** — All routes / pages in `App.tsx` render inside `<Layout>` — header and footer appear on every view

### Header
- [ ] **AC3** — Header is visible at the top of the viewport on page load
- [ ] **AC4** — Header remains visible (sticky/fixed) when the user scrolls down
- [ ] **AC5** — Header contains the AI-generated logo and all five navigation links
- [ ] **AC6** — Header background and styling are consistent across all pages

### Footer
- [ ] **AC7** — Footer appears at the bottom of every page
- [ ] **AC8** — Footer contains an email contact method, at least GitHub and LinkedIn links, and a copyright notice
- [ ] **AC9** — Copyright year is generated dynamically (not hardcoded)

### Logo
- [ ] **AC10** — Logo is an AI-generated image placed in `public/assets/`
- [ ] **AC11** — Logo has a meaningful, non-empty `alt` attribute
- [ ] **AC12** — Clicking the logo navigates to the top of the Home page
- [ ] **AC13** — Logo does not overflow or distort at any tested viewport width

### Responsive behaviour
- [ ] **AC14** — On desktop (> 768px): nav links are horizontal in the header
- [ ] **AC15** — On mobile (≤ 768px): nav links become icons in a fixed bottom bar; desktop nav is hidden
- [ ] **AC16** — No horizontal scrolling appears on a 375px viewport
- [ ] **AC17** — No content overflows the viewport at 375px, 768px, or 1280px
- [ ] **AC18** — Images scale correctly (`max-width: 100%`) and do not overflow their containers
- [ ] **AC19** — Body text is readable (≥ 16px) on mobile without zooming

### Build
- [ ] **AC20** — `npm run build` passes with zero errors
- [ ] **AC21** — `tsc --noEmit` passes with zero TypeScript errors

---

*Last updated: 2026-04-26 | Depends on: ai-spec.md, setup-deploy.feature.md | Next: feature-03-hero-about.md*
