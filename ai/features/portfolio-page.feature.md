# Feature Spec — Portfolio Page

> **Prerequisite:** Read [ai-spec.md](../ai-spec.md) before implementing anything in this feature.
> This feature depends on the Layout established in [header-footer.feature.md](header-footer.feature.md).

---

## 1. Feature Goal & Scope

### Goal
Build the Portfolio page — a combined résumé and project showcase. It presents Charles's education history, professional work experience, and a curated set of projects, all in a single scrollable page accessible from the navigation. A downloadable PDF version of the résumé is available directly from the page. At least two AI-generated images reinforce the visual identity of the page.

### In scope
- Portfolio page component (`src/pages/Portfolio.tsx`) rendered inside `Layout`
- Education section: ≥ 1 institution entry, reverse chronological order
- Work experience section: ≥ 1 role entry, reverse chronological order, with responsibilities / achievements
- Projects / portfolio section: ≥ 1 project entry with name, tech stack, description, and image
- Downloadable PDF résumé — linked from the page, file stored in `public/assets/`
- At least 2 AI-generated images with proper `alt` text, tool documented in this spec
- All content sourced from `src/lib/data.ts`

### Out of scope
- Contact form — covered in Feature 05
- Admin / Supabase interaction — covered in Features 05–07
- Dark / light mode styling — covered in Feature 08
- Animation / scroll reveals — covered in Feature 08
- CV generation at runtime — the PDF is a pre-exported static file
- Filtering or searching projects

---

## 2. Requirements Breakdown

### R1 — Portfolio page route
- The Portfolio page is accessible via the navigation (nav link label: "Portfolio" or "Résumé")
- Because the portfolio is a single scrollable page (per `ai-spec.md` Rule 2), this nav link scrolls to a `#portfolio` anchor on the Home page **or** the page is a dedicated route — decision: use a **dedicated route `/portfolio`** since this page contains substantial standalone content (résumé + projects)
- Renders inside `<Layout>` — header and footer inherited automatically

### R2 — Education section
- Section ID: `#education`
- Section heading: "Education" (h2)
- Displays ≥ 1 educational institution entry
- Each entry must include:
  - **Institution name** (e.g. "CodeBoxx Technology")
  - **Degree / program** (e.g. "Full-Stack Development Program")
  - **Dates** — start and end (or "Present"), formatted consistently (e.g. "Sept 2024 – May 2026")
- Entries are in **reverse chronological order** — most recent first
- Content sourced from `EDUCATION` array in `src/lib/data.ts`

### R3 — Work experience section
- Section ID: `#experience`
- Section heading: "Experience" (h2)
- Displays ≥ 1 work experience entry
- Each entry must include:
  - **Title / role** (e.g. "Junior Developer")
  - **Organization** (e.g. "Acme Corp")
  - **Dates** — start and end (or "Present"), formatted consistently
  - **Description** — ≥ 1 sentence mentioning responsibilities or achievements (not a single-word tag)
- Entries are in **reverse chronological order** — most recent first
- Content sourced from `WORK_EXPERIENCE` array in `src/lib/data.ts`

### R4 — Projects / portfolio section
- Section ID: `#projects`
- Section heading: "Projects" (h2)
- Displays ≥ 1 project entry
- Each entry must include:
  - **Project name**
  - **Tech stack** — list of technologies used (e.g. ["React", "Supabase", "Vite"])
  - **Description** — ≥ 2 sentences explaining what the project is and its purpose
  - **Image** — a screenshot, mockup, or AI-generated illustration representing the project; must have `alt` text
- Layout is visually organized: cards, grid, or horizontal timeline — not a plain list
- Content sourced from `PROJECTS` array in `src/lib/data.ts`

### R5 — Downloadable PDF résumé
- A clearly labelled button or link ("Download CV" / "Download Résumé") is visible on the page
- Clicking it triggers a browser download of a PDF file
- The PDF is stored as a static file: `public/assets/charles-winfield-cv.pdf`
- Link uses the `download` attribute: `<a href="/assets/charles-winfield-cv.pdf" download>`
- The PDF is a pre-exported document (Word → PDF, Canva → PDF, or equivalent) — not generated at runtime

### R6 — Visual section structure
- The page has **at least 3 distinct sections**: Education, Experience, Projects
- Sections are visually separated by spacing, alternating background colours, or dividers
- Each section has a visible h2 heading
- Sections are in a logical reading order: Education → Experience → Projects (or reverse, as long as consistent)

### R7 — AI-generated images
- **At least 2** images on the page are generated using an AI image tool
- Suitable uses: section header illustration, decorative background element, avatar / portrait, project placeholder image
- Saved to `public/assets/` (e.g. `public/assets/portfolio-hero.png`, `public/assets/project-placeholder.png`)
- Each image has a non-empty, meaningful `alt` attribute
- The AI tool and prompt summary are documented in Section 4 of this spec

---

## 3. Interfaces Involved

### Pages
| Route | Component | Notes |
|---|---|---|
| `/portfolio` | `src/pages/Portfolio.tsx` | Assembles all three sections; renders inside `Layout` |

### Section components
| File | Section | ID |
|---|---|---|
| `src/components/sections/Education.tsx` | Education history entries | `#education` |
| `src/components/sections/Experience.tsx` | Work experience entries | `#experience` |
| `src/components/sections/Projects.tsx` | Project / portfolio cards | `#projects` |

### Shared / UI components
| File | Purpose |
|---|---|
| `src/components/ui/TimelineEntry.tsx` | Reusable entry: institution/org, role/degree, dates, description (used by Education + Experience) |
| `src/components/ui/ProjectCard.tsx` | Reusable card: name, tech tags, description, image |

### Data
| File | Exports |
|---|---|
| `src/lib/data.ts` | `EDUCATION`, `WORK_EXPERIENCE`, `PROJECTS` |

### Types
| File | Interfaces |
|---|---|
| `src/types/index.ts` | `EducationEntry`, `WorkEntry`, `Project` |

### Assets
| File | Purpose |
|---|---|
| `public/assets/charles-winfield-cv.pdf` | Static downloadable résumé PDF |
| `public/assets/portfolio-hero.png` | AI-generated page hero / section illustration |
| `public/assets/project-placeholder.png` | AI-generated project image (if no screenshot available) |

---

## 4. Data, Validations & Expected Behaviour

### `EducationEntry` interface
```ts
export interface EducationEntry {
  id: string;
  institution: string;   // required, non-empty
  program: string;       // required, non-empty
  startDate: string;     // e.g. "Sept 2024"
  endDate: string;       // e.g. "May 2026" | "Present"
}
```

### `EDUCATION` array (minimum)
```ts
export const EDUCATION: EducationEntry[] = [
  {
    id: 'codeboxx',
    institution: 'CodeBoxx Technology',
    program: 'Full-Stack Development Program',
    startDate: 'Sept 2024',
    endDate: 'May 2026',
  },
  // most recent first — add more entries above older ones
];
```

### `WorkEntry` interface
```ts
export interface WorkEntry {
  id: string;
  role: string;           // required, non-empty
  organization: string;   // required, non-empty
  startDate: string;
  endDate: string;        // "Present" if current
  description: string;    // ≥ 1 sentence — required, never empty
}
```

### `WORK_EXPERIENCE` array (minimum)
```ts
export const WORK_EXPERIENCE: WorkEntry[] = [
  {
    id: 'role-1',
    role: 'Full-Stack Developer (Student)',
    organization: 'CodeBoxx Technology',
    startDate: 'Sept 2024',
    endDate: 'Present',
    description: 'Built 15 full-stack modules simulating real client projects — covering React, Node.js, REST APIs, SQL databases, and cloud deployment.',
  },
  // most recent first
];
```

### `Project` interface
```ts
export interface Project {
  id: string;
  name: string;           // required, non-empty
  tech: string[];         // ≥ 1 technology — required
  description: string;    // ≥ 2 sentences — required
  image: string;          // path to image in public/assets/ — required
  imageAlt: string;       // non-empty alt text — required
  repoUrl?: string;       // optional GitHub link
  liveUrl?: string;       // optional live demo link
}
```

### `PROJECTS` array (minimum)
```ts
export const PROJECTS: Project[] = [
  {
    id: 'portfolio',
    name: 'Personal Portfolio',
    tech: ['React', 'Vite', 'TypeScript', 'Supabase', 'GitHub Actions'],
    description: 'A personal developer portfolio built from scratch as the final module of the Full-Stack Development Program. Showcases projects, skills, and experience, with a Supabase-backed contact form and admin back office.',
    image: '/assets/project-placeholder.png',
    imageAlt: 'Screenshot of the personal portfolio website',
    repoUrl: 'https://github.com/charleswinfield108/charleswinfield.github.io',
    liveUrl: 'https://charleswinfield.github.io',
  },
  // add more projects
];
```

### AI image documentation
| Image file | AI tool used | Prompt summary |
|---|---|---|
| `public/assets/portfolio-hero.png` | *(fill in after generation)* | Professional résumé / career-themed hero illustration |
| `public/assets/project-placeholder.png` | *(fill in after generation)* | Abstract tech / development themed project image |

> **Action required:** After generating images, update the table above with the tool name and a brief prompt description.

### Validation rules
- All `description` fields must be non-empty strings — TypeScript enforces this (no `?` on the field)
- `Project.imageAlt` must be non-empty — enforced by type (no `?`)
- `Project.tech` must have ≥ 1 entry — enforced by type (`string[]`, validated in code review)
- Date strings must follow a consistent format across all entries (e.g. "Mon YYYY" — enforced by convention, documented here)
- The PDF file must exist at `public/assets/charles-winfield-cv.pdf` before the feature is merged

### Expected behaviour
- PDF download link opens a browser download dialogue (or downloads directly) — it does not open in a new tab unless the browser forces it
- All project images load without broken-image placeholders; use explicit `aspect-ratio` or `width`/`height` to prevent layout shift
- Education and experience entries are visually ordered most-recent-first — the data array order determines render order, so the array must be kept in reverse chronological order

---

## 5. User Flow

```
User clicks "Portfolio" / "Résumé" in the navigation
        │
        ▼
/portfolio loads inside Layout (Header + Footer inherited)
        │
        ▼
Page hero / introduction visible above fold
  → AI-generated image + page title ("Portfolio" or "Résumé")
  → "Download CV" button
        │
        ▼
User scrolls down
        │
        ▼
Education section (#education)
  → Most recent institution first
  → Each entry: institution name, program, dates
        │
        ▼
User scrolls down
        │
        ▼
Experience section (#experience)
  → Most recent role first
  → Each entry: role, organization, dates, description of responsibilities
        │
        ▼
User scrolls down
        │
        ▼
Projects section (#projects)
  → Cards/grid: project name, tech tags, description, image
  → Optional: repo / live demo links per card
        │
        ▼
Footer (rendered by Layout)

────────────────────────
Download flow (any point on page):
        │
User clicks "Download CV"
        ▼
Browser downloads charles-winfield-cv.pdf
```

---

## 6. Acceptance Criteria

All criteria must pass before merging `feature/portfolio-page` → `dev`.

### Routing
- [ ] **AC1** — `/portfolio` loads the Portfolio page without a redirect
- [ ] **AC2** — The page renders inside `Layout` — header and footer are present
- [ ] **AC3** — The navigation contains a link that takes the user to this page

### Education section
- [ ] **AC4** — At least one education entry is displayed
- [ ] **AC5** — Every entry includes institution name, program/degree, and start + end dates
- [ ] **AC6** — Entries are in reverse chronological order (most recent first)

### Work experience section
- [ ] **AC7** — At least one work experience entry is displayed
- [ ] **AC8** — Every entry includes role/title, organization, dates, and a description of ≥ 1 sentence
- [ ] **AC9** — Descriptions mention responsibilities or achievements — not just a job title repeated
- [ ] **AC10** — Entries are in reverse chronological order (most recent first)

### Projects section
- [ ] **AC11** — At least one project is displayed
- [ ] **AC12** — Every project includes name, tech stack, description of ≥ 2 sentences, and an image
- [ ] **AC13** — Every project image has a non-empty `alt` attribute
- [ ] **AC14** — Project descriptions explain what the project is and its purpose

### PDF download
- [ ] **AC15** — A clearly labelled download button or link is visible on the page
- [ ] **AC16** — Clicking it triggers a download of `charles-winfield-cv.pdf`
- [ ] **AC17** — The PDF file exists at `public/assets/charles-winfield-cv.pdf` and is not empty

### Visual structure
- [ ] **AC18** — The page has at least 3 visually distinct sections (Education, Experience, Projects) with h2 headings
- [ ] **AC19** — Sections are visually separated — no content bleeding between sections

### AI-generated images
- [ ] **AC20** — At least 2 images on the page were generated by an AI tool
- [ ] **AC21** — Both images are stored in `public/assets/`
- [ ] **AC22** — Both images have non-empty, meaningful `alt` text
- [ ] **AC23** — The AI tool and prompt summary are documented in the Section 4 table of this spec

### Data & code quality
- [ ] **AC24** — All content (education, experience, projects) lives in `src/lib/data.ts`, not hardcoded in components
- [ ] **AC25** — `tsc --noEmit` passes with zero errors
- [ ] **AC26** — `npm run build` succeeds with zero errors

### Responsive
- [ ] **AC27** — Page layout is correct and readable at 375px, 768px, and 1280px viewports
- [ ] **AC28** — No horizontal scrolling appears on a 375px viewport
- [ ] **AC29** — Project images scale correctly and do not overflow their containers on mobile

---

*Last updated: 2026-04-26 | Depends on: ai-spec.md, header-footer.feature.md | Next: contact-form.feature.md*
