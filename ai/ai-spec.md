# AI Specification — charleswinfield.github.io Portfolio

> **READ THIS FIRST.** Every feature implementation must align with this document.
> When in doubt, defer to the rules here rather than inventing new patterns.

---

## 1. Project Identity & Scope

### What this is
A personal developer portfolio — Module 16 (final module) of the Full-Stack Development Program. This is a public-facing professional presence deployed as a static site to GitHub Pages at `charleswinfield.github.io`. It is also an AI-native project: all features are specified via structured AI documents before implementation.

### Goals
- Present a clean, fast, accessible personal brand
- Showcase projects, skills, and experience
- Allow employers to contact Charles via a Supabase-backed contact form
- Provide a hidden admin back office to view submitted contact messages
- Be trivially maintainable by a solo developer

### Deliverables (graded)
1. Portfolio website (React + Vite) live on GitHub Pages
2. `README.md` explaining the project to someone with zero prior context
3. This `ai-spec.md` + eight feature specification documents (in `./ai/`)
4. `CONCEPTS.md` listing 3 challenging concepts + recorded video
5. LeetCode challenge solutions + recorded video + screenshots at `./LeetCode-Challenges/<challenge-name>.png`
6. Technical Demonstration & Code Overview video of the live site
7. Any completed extra miles

### In scope
- Landing / hero section
- About section (bio, skills, background)
- Projects showcase (cards linking to repos / live demos)
- Experience / timeline section
- Contact form (data persisted in Supabase)
- Admin login page (hidden from navigation, direct URL only)
- Admin back office (view contact form submissions)
- Light/dark mode toggle
- Responsive design (mobile-first)
- GitHub Actions CI/CD pipeline deploying `main` → GitHub Pages

### Out of scope
- Custom backend server (Supabase is the only backend)
- Server-side rendering (static / client-side only)
- Blog (may be added later — do not scaffold it now)
- Multi-language / i18n (English only)
- A/B testing or feature flags

---

## 2. Architecture & Repo Structure

### Framework
**React 18+ with Vite** — bootstrapped via `npm create vite@latest`, React template.

This is a pure client-side static site. No SSR, no API routes, no server processes at runtime. Supabase is the sole backend service, accessed directly from the browser via its JS client.

### Deployment target
**GitHub Pages** via GitHub Actions. Pushing to `main` triggers the workflow, which builds the Vite app and deploys the `dist/` directory to Pages. The live URL is `https://charleswinfield.github.io`.

### Branching model
```
feature/* ──► dev ──► main ──► (auto-deploy to GitHub Pages)
```
- All feature work happens on `feature/<name>` branches cut from `dev`
- Merge feature branches back to `dev` when complete
- Merge `dev` → `main` to trigger deployment
- **Only `main` is graded**

### Intended directory layout

```
portfolio/
├── ai/
│   ├── ai-spec.md              ← this file (read first)
│   └── feature-*.md            ← eight feature spec documents
├── public/
│   └── assets/                 ← images, icons, fonts (served as-is)
├── src/
│   ├── main.tsx                ← Vite entry point
│   ├── App.tsx                 ← root component + routing
│   ├── index.css               ← global styles / CSS variables
│   ├── components/
│   │   ├── ui/                 ← reusable UI atoms (Button, Card, Input…)
│   │   └── sections/           ← page-section components (Hero, About, Projects…)
│   ├── pages/
│   │   ├── Home.tsx            ← main portfolio page (assembles all sections)
│   │   ├── Login.tsx           ← hidden admin login (not in nav)
│   │   └── Admin.tsx           ← admin back office (contact submissions)
│   ├── lib/
│   │   ├── supabase.ts         ← Supabase client initialisation
│   │   └── data.ts             ← static content: projects, skills, experience
│   └── types/
│       └── index.ts            ← shared TypeScript interfaces
├── .github/
│   └── workflows/
│       └── deploy.yml          ← build + deploy to GitHub Pages
├── LeetCode-Challenges/
│   └── <challenge-name>.png    ← solution screenshots
├── .env                        ← local env vars (NEVER committed)
├── .env.example                ← committed placeholder showing required vars
├── .gitignore                  ← must include .env
├── vite.config.ts
├── tsconfig.json
├── package.json
├── CONCEPTS.md
└── README.md
```

### Data model
Static content (projects, skills, experience) lives in `src/lib/data.ts` as exported TypeScript constants. Dynamic data (contact form submissions) lives in Supabase. Components only render — they don't own content or make up data.

---

## 3. Allowed Technologies & Constraints

### Core stack (required)
| Layer | Choice | Notes |
|---|---|---|
| Framework | React 18+ + Vite | `npm create vite@latest`, React + TypeScript template |
| Language | TypeScript (strict) | No `.js` or `.jsx` files in `src/` |
| Routing | React Router v6 | Client-side routing; `<BrowserRouter>` |
| Styling | Custom CSS + CSS variables | No CSS-in-JS; Tailwind is optional |
| Backend | Supabase | Contact form storage + admin auth only |
| Deployment | GitHub Actions + GitHub Pages | Push to `main` = auto deploy |
| Icons | One icon library (e.g. `lucide-react`) | Do not mix libraries |

### Environment variables
- All env vars must use the **`VITE_` prefix** to be accessible in Vite client code
- Required vars: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`
- `.env` is **never committed** — add it to `.gitignore`
- Provide `.env.example` with placeholder values (committed)
- In GitHub Actions, env vars are injected via **repository secrets** at build time

### Admin credentials (fixed, not configurable)
```
Email:    admin@codeboxx.com
Password: C0deB0xx4dm!n
```
These are used to authenticate against Supabase Auth. Hard-code them in documentation only — never in source code.

### Admin login page
- Route: `/login` (or similar — decided in the feature spec)
- **Not included in the navigation menu**
- Accessed only by typing the URL directly
- On successful auth, redirects to `/admin`
- `/admin` is a protected route — unauthenticated users are redirected to `/login`

### Explicitly forbidden
- Custom backend server (Express, Fastify, etc.)
- Any SSR / server-side rendering
- `.env` committed to the repository (automatic failing criterion)
- Multiple icon libraries
- CSS-in-JS runtime libraries (styled-components, emotion)
- `any` type in TypeScript — use `unknown` + type narrowing instead
- Admin login link appearing anywhere in the public navigation

---

## 4. Coding Standards & Conventions

### TypeScript
- `strict: true` in `tsconfig.json`, no exceptions
- Prefer `interface` over `type` for object shapes; use `type` for unions / aliases
- No `as SomeType` casts unless unavoidable — prefer type guards
- Export shared types from `src/types/index.ts`; colocate component-private types with the component

### React
- Functional components only — no class components
- One component per file; filename matches the exported component name (PascalCase)
- Props interfaces named `<ComponentName>Props`
- Named exports for all components; default export only for page-level components (`pages/`)

### File naming
| Type | Convention | Example |
|---|---|---|
| React component | PascalCase `.tsx` | `ProjectCard.tsx` |
| Utility / lib | camelCase `.ts` | `supabase.ts` |
| Config files | framework default | `vite.config.ts` |
| CSS | kebab-case | `hero-section.css` |

### Styling
- Use CSS custom properties (variables) for all colors, spacing, and typography tokens defined in `index.css`
- Mobile-first: write base styles for mobile, layer responsive overrides with media queries
- No inline `style={{}}` props except for truly dynamic runtime values
- Extract repeated patterns into reusable components, not duplicated class strings

### Comments
- Write comments only for non-obvious WHY — never for WHAT the code does
- No TODO comments committed to `main`; use GitHub Issues instead

### Accessibility
- All images must have meaningful `alt` text
- Interactive elements must be keyboard-navigable
- Color contrast must meet WCAG AA minimum
- Use semantic HTML elements (`<nav>`, `<main>`, `<section>`, `<article>`)

---

## 5. Global Definition of Done

A feature is **Done** when ALL of the following are true:

### Correctness
- [ ] Feature works as described on desktop (Chrome, Firefox) and mobile viewport
- [ ] No TypeScript errors (`tsc --noEmit` passes)
- [ ] No ESLint errors or warnings
- [ ] No `console.log` or debug code left in

### Build & Deployment
- [ ] `npm run build` succeeds and produces a valid `dist/` output
- [ ] The GitHub Actions deploy workflow passes on `main`
- [ ] No broken links or missing assets on the deployed site

### Quality
- [ ] Responsive at 375px, 768px, and 1280px breakpoints
- [ ] Light and dark mode both render correctly (if toggle is implemented)
- [ ] Component is accessible: keyboard navigable, semantic HTML, meaningful alt text
- [ ] No hardcoded content that belongs in `src/lib/data.ts`
- [ ] No unused imports or dead code

### Security
- [ ] `.env` is not committed (verify via `git status` and `.gitignore`)
- [ ] No secrets or credentials appear in source code

### Process
- [ ] Feature developed on a `feature/*` branch from `dev`
- [ ] Merged to `dev` before promotion to `main`
- [ ] PR title is ≤ 70 characters and describes the change

---

## 6. Cross-Feature Rules

These rules apply to every feature, regardless of scope.

1. **Static client-side only.** No server-side rendering, no custom backend. Supabase is the only external service. Verify that every package works in a pure client-side Vite build before adding it.

2. **`.env` is never committed.** This is a hard grading criterion. Always verify `.gitignore` includes `.env` before the first commit.

3. **Admin login is hidden.** The `/login` route must not appear in any navigation element, header, footer, or sitemap. It is accessed by typing the URL directly.

4. **Single public page, section-based layout.** The portfolio is one scrollable page. Do not create separate public routes for sections. Each section is a React component rendered inside `Home.tsx`.

5. **Data lives in `data.ts`, not in components.** Any content a human might update (project titles, descriptions, skills, dates) must live in `src/lib/data.ts`.

6. **Branching discipline is graded.** Work on `feature/*` branches. Never commit directly to `main`. Only `main` is evaluated.

7. **VITE_ prefix is mandatory.** Any env var read in client code must start with `VITE_`. Supabase vars injected via GitHub secrets must also use this prefix.

8. **Mobile first.** Write base styles for mobile, override for larger viewports. Never start from desktop and work downward.

9. **Performance budget.** Target Lighthouse score ≥ 90 across all four categories. Reject changes that push any category below 90.

10. **This spec is authoritative.** If the spec contradicts a clever idea, follow the spec and open a discussion before deviating. Update this file when the project's direction genuinely changes.

---

## 7. Feature Spec Documents

Eight feature specification documents must be created in `./ai/` before implementation begins. Each document covers one vertical slice of the application:

| # | File | Feature |
|---|---|---|
| 1 | `feature-01-project-setup.md` | Vite init, folder structure, GitHub Actions, base routing |
| 2 | `feature-02-hero-about.md` | Hero section, About section, personal bio |
| 3 | `feature-03-projects.md` | Projects showcase section |
| 4 | `feature-04-experience.md` | Experience / timeline section, skills |
| 5 | `feature-05-contact-form.md` | Contact form UI + Supabase submission |
| 6 | `feature-06-admin-login.md` | Hidden login page + Supabase auth |
| 7 | `feature-07-admin-backoffice.md` | Protected admin page, contact submissions table |
| 8 | `feature-08-ui-polish.md` | Dark mode, responsive polish, Lighthouse audit |

Each feature spec must include: goal, user stories, acceptance criteria, component list, data model (if any), and edge cases.

---

*Last updated: 2026-04-26*
