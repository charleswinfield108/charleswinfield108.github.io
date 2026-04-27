# Feature Spec — Setup & Deploy

> **Prerequisite:** Read [ai-spec.md](../ai-spec.md) before implementing anything in this feature.

---

## 1. Feature Goal & Scope

### Goal
Bootstrap the portfolio project from a blank slate — scaffold the React + Vite application, configure Vite for GitHub Pages, and wire up a GitHub Actions workflow so that every push to `main` automatically builds and deploys the live site.

At the end of this feature the URL `https://charleswinfield.github.io` must load a working React application, and the full CI/CD pipeline must be green.

### In scope
- Scaffold React + Vite (TypeScript) via `npm create vite@latest`
- Configure `vite.config.ts` with the correct `base` path for GitHub Pages
- Create `.github/workflows/deploy.yml` for automated build + deploy
- Create `.env.example` with placeholder Supabase variable names
- Add `.env` to `.gitignore`
- Establish the folder structure described in `ai-spec.md`
- Initial commit on `feature/setup-deploy`, merged to `dev`, then `dev` → `main`

### Out of scope
- Any UI design or section content (covered in later features)
- Supabase client initialisation (Feature 05 — Contact Form)
- Routing setup beyond a basic `App.tsx` placeholder (routing formalised in Feature 02)
- React Router installation (not needed until actual pages exist)

---

## 2. Requirements Breakdown

### R1 — Vite scaffold
- Run: `npm create vite@latest charleswinfield.github.io` (inside the repo root, or scaffold and move files)
- Framework: **React**
- Variant: **TypeScript**
- Result: `package.json`, `vite.config.ts`, `tsconfig.json`, `src/main.tsx`, `src/App.tsx`, `index.html` all present

### R2 — Vite base path
- `vite.config.ts` must set `base: '/'`
- This ensures asset paths resolve correctly when served from `https://charleswinfield.github.io` (root repo, not a subdirectory repo)
- Navigating to any hash-based or client-side route must keep the URL at `https://charleswinfield.github.io` — no `/home`, `/portfolio`, or other path segments in the public URL

### R3 — GitHub Actions deploy workflow
- File: `.github/workflows/deploy.yml`
- Trigger: `push` to `main`
- Steps in order:
  1. Checkout code (`actions/checkout@v4`)
  2. Set up Node.js 20 (`actions/setup-node@v4` with `node-version: 20`)
  3. Install dependencies: `npm ci`
  4. Build: `npm run build`
  5. Deploy `dist/` to GitHub Pages (`peaceiris/actions-gh-pages` or `actions/deploy-pages` with upload artifact pattern)
- If environment variables are required for the build, they must be injected from **GitHub Actions repository secrets** (not hardcoded)
- Required secrets to configure in GitHub repo settings: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`

### R4 — Environment variable discipline
- `.env` is listed in `.gitignore` — never committed
- `.env.example` is committed with placeholder values:
  ```
  VITE_SUPABASE_URL=your_supabase_project_url
  VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
  ```
- All client-accessible env vars use the `VITE_` prefix

### R5 — Folder structure
Create the following directories (with `.gitkeep` if empty) to establish the layout from `ai-spec.md`:
```
src/
  components/
    ui/
    sections/
  pages/
  lib/
  types/
public/
  assets/
LeetCode-Challenges/
```

### R6 — GitHub Pages configuration
- Repository Settings → Pages → Source must be set to **GitHub Actions** (not a branch)
- After the first successful workflow run, `https://charleswinfield.github.io` must return HTTP 200

---

## 3. Interfaces Involved

### Pages
| Route | Component | Notes |
|---|---|---|
| `/` | `src/App.tsx` | Placeholder only at this stage — "Portfolio coming soon" or similar |

### Components
None at this stage — `App.tsx` contains only a placeholder `<h1>`.

### GitHub Actions workflow
| File | Purpose |
|---|---|
| `.github/workflows/deploy.yml` | Build on push to `main`, deploy `dist/` to Pages |

### Configuration files
| File | Purpose |
|---|---|
| `vite.config.ts` | `base: '/'`, React plugin |
| `tsconfig.json` | TypeScript strict config |
| `.env.example` | Documents required env vars |
| `.gitignore` | Excludes `node_modules/`, `dist/`, `.env` |

---

## 4. Data, Validations & Expected Behaviour

### Build output
- `npm run build` must exit 0
- `dist/` directory must be produced containing `index.html` and hashed asset files
- `dist/index.html` must reference assets with paths starting from `/` (not `./`)

### Environment variables
- If `VITE_SUPABASE_URL` or `VITE_SUPABASE_ANON_KEY` are referenced anywhere in source at build time, they must be provided via GitHub secrets or the build will fail
- At this feature stage they are not yet referenced in source, so the secrets are configured but not yet required

### URL behaviour
- `https://charleswinfield.github.io` → loads React app, stays at that URL
- No trailing path segments should appear in the address bar for the home view
- Refreshing the page must not produce a 404 (for a single-page app on GitHub Pages, a `404.html` redirect trick or hash-based routing may be required — decision made here: **use hash routing** (`#/`) to avoid the 404 problem on GitHub Pages without a custom server)

### TypeScript
- `tsc --noEmit` must pass with zero errors after scaffold
- `strict: true` must be present in `tsconfig.json`

---

## 5. User Flow

```
Developer pushes to main
        │
        ▼
GitHub Actions triggers deploy.yml
        │
        ├─ npm ci          (install exact deps from package-lock.json)
        ├─ npm run build   (Vite produces dist/)
        └─ Deploy dist/    (upload to GitHub Pages)
                │
                ▼
        https://charleswinfield.github.io loads React app
```

---

## 6. Acceptance Criteria

All criteria must pass before merging `feature/setup-deploy` → `dev` → `main`.

- [ ] **AC1** — `npm install` and `npm run build` both complete with exit code 0 locally
- [ ] **AC2** — `tsc --noEmit` passes with zero TypeScript errors
- [ ] **AC3** — `vite.config.ts` contains `base: '/'`
- [ ] **AC4** — `.github/workflows/deploy.yml` exists and contains triggers for `push` to `main`, runs `npm ci`, `npm run build`, and deploys `dist/`
- [ ] **AC5** — `.env` is present in `.gitignore` and is not committed
- [ ] **AC6** — `.env.example` is committed with `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` placeholder entries
- [ ] **AC7** — The GitHub Actions workflow runs green on the first push to `main`
- [ ] **AC8** — `https://charleswinfield.github.io` returns HTTP 200 and renders the React app
- [ ] **AC9** — The URL bar shows `https://charleswinfield.github.io` (no extra path segments) on the home view
- [ ] **AC10** — Folder structure matches the layout in `ai-spec.md` (src/components/ui, src/components/sections, src/pages, src/lib, src/types, public/assets, LeetCode-Challenges)

---

*Last updated: 2026-04-26 | Depends on: ai-spec.md | Next: feature-02-hero-about.md*
