# Feature Spec — Portfolio Page

> **Prerequisite:** Read [ai-spec.md](../ai-spec.md) before implementing anything in this feature.
> This feature depends on the Layout established in the Header/Footer and the routing established in the Home Page feature.

---

## 1. Feature Goal & Scope

### Goal
Build the `/portfolio` page — a structured, professional showcase of Charles Winfield's education, work experience, and completed projects. The page functions as an interactive résumé, complemented by a downloadable PDF version of his CV and at least two AI-generated images.

### In scope
- Route `/portfolio` renders the Portfolio page component
- Education section: at least one institution, reverse chronological order
- Work experience section: at least one role, reverse chronological order
- Project/portfolio section: at least one project with name, tech, description, and image
- Downloadable PDF link (CV) surfaced on the page
- At least 2 AI-generated images integrated into the page with proper `alt` text
- All section content sourced from `src/lib/data.ts` (not hardcoded in components)
- Page renders inside the `Layout` component (header + footer inherited)

### Out of scope
- Contact form — covered in a separate Contact page feature
- Admin / back office — covered in separate feature specs
- Blog or editorial content
- Filtering or searching projects
- Animated page transitions between routes

---

## 2. Requirements Breakdown

### R1 — Portfolio route
- The route `/portfolio` maps to `src/pages/Portfolio.tsx`
- The page renders inside `<Layout>` so the header and footer appear automatically
- "Portfolio" nav link in the header is active/highlighted when on this route

### R2 — Education section
- Section ID: `#education`
- Visible heading (h2 level): e.g. "Education"
- At least one educational institution listed
- Each entry must include:
  - **Institution name** (e.g. CodeBoxx Technology)
  - **Degree / program** (e.g. Full-Stack Development Certificate)
  - **Dates** (start – end, or start – present)
- Entries displayed in **reverse chronological order** (most recent first)
- Content sourced from `src/lib/data.ts` as an `EDUCATION` array

### R3 — Work experience section
- Section ID: `#experience`
- Visible heading (h2 level): e.g. "Work Experience"
- At least one work experience entry listed
- Each entry must include:
  - **Title / role** (e.g. Junior Developer)
  - **Organization** (e.g. Freelance)
  - **Dates** (start – end, or start – present)
  - **Description**: one or more sentences mentioning responsibilities or achievements
- Entries displayed in **reverse chronological order** (most recent first)
- Content sourced from `src/lib/data.ts` as a `WORK_EXPERIENCE` array

### R4 — Project / portfolio section
- Section ID: `#projects`
- Visible heading (h2 level): e.g. "Projects"
- At least one project listed
- Each project entry must include:
  - **Project name**
  - **Tech stack**: array of technology labels (e.g. `['React', 'Node.js', 'MySQL']`)
  - **Description**: explains what the project is and its purpose (at least 2 sentences)
  - **Image**: a project screenshot or placeholder image with meaningful `alt` text
- Content sourced from `src/lib/data.ts` — reuse or extend the existing `PROJECTS` array
- Project images stored in `public/assets/images/`

### R5 — Downloadable CV / PDF
- A clearly labelled download link or button is present on the page
- Label: "Download CV" or "Download Résumé"
- Links to `public/assets/charles-winfield-cv.pdf` via an `<a href="..." download>` element
- Uses the global `.btn` style so it is visually consistent with the rest of the site
- If the PDF file is not yet present, the link renders but the file is noted as a placeholder

### R6 — Layout & visual separation
- The page has at least **3 distinct sections**: Education, Work Experience, Projects
- Sections are visually separated by one or more of: vertical spacing, alternating background colours, or a horizontal divider
- Each section has a visible heading at the h2 level
- No section bleeds visually into the next

### R7 — AI-generated images
- At least **2** images on the page are generated using an AI image tool
- Recommended tools: DALL·E 3 (ChatGPT), Adobe Firefly, Midjourney, Gemini
- Images are saved to `public/assets/images/`
- Each image has a meaningful, non-empty `alt` attribute
- The AI tool and prompt used to generate each image are documented in Section 4 of this spec
- Images are contextually relevant: section headers, project thumbnails, or decorative illustrations

---

## 3. Interfaces Involved

### Pages
| Route | Component | Notes |
|---|---|---|
| `/portfolio` | `src/pages/Portfolio.tsx` | Assembles all sections; renders inside `Layout` |

### Section components
| File | Section | ID |
|---|---|---|
| `src/components/sections/PortfolioEducation.tsx` | Education timeline | `#education` |
| `src/components/sections/PortfolioExperience.tsx` | Work experience timeline | `#experience` |
| `src/components/sections/PortfolioProjects.tsx` | Project cards | `#projects` |

### Shared / UI components
| File | Purpose |
|---|---|
| `src/components/ui/TimelineEntry.tsx` | Reusable entry: title, organisation, dates, description (used by Education + Experience) |
| `src/components/ui/ProjectCard.tsx` | Reusable card: image, name, tech tags, description |

### Data
| File | Exports |
|---|---|
| `src/lib/data.ts` | `EDUCATION`, `WORK_EXPERIENCE`, `PROJECTS` |

### Types
| File | Interfaces |
|---|---|
| `src/types/index.ts` | `EducationEntry`, `WorkEntry`, `Project` (extended with image field) |

### Assets
| File | Purpose |
|---|---|
| `public/assets/charles-winfield-cv.pdf` | Downloadable CV — linked via `<a download>` |
| `public/assets/images/portfolio-hero.png` | AI-generated image — portfolio page header area |
| `public/assets/images/portfolio-experience.png` | AI-generated image — work/experience section accent |

---

## 4. Data, Validations & Expected Behaviour

### `EducationEntry` interface (`src/types/index.ts`)
```ts
export interface EducationEntry {
  id: string;
  institution: string;
  program: string;
  startDate: string;   // e.g. 'Jan 2024'
  endDate: string;     // e.g. 'Apr 2025' or 'Present'
}
```

### `EDUCATION` array (`src/lib/data.ts`)
```ts
export const EDUCATION: EducationEntry[] = [
  {
    id: 'codeboxx',
    institution: 'CodeBoxx Technology',
    program: 'Full-Stack Development Certificate',
    startDate: 'Jan 2024',
    endDate: 'Apr 2025',
  },
  // most recent first
]
```

### `WorkEntry` interface (`src/types/index.ts`)
```ts
export interface WorkEntry {
  id: string;
  role: string;
  organization: string;
  startDate: string;
  endDate: string;     // 'Present' if current
  description: string; // ≥ 1 sentence mentioning responsibilities or achievements
}
```

### `WORK_EXPERIENCE` array (`src/lib/data.ts`)
```ts
export const WORK_EXPERIENCE: WorkEntry[] = [
  {
    id: 'freelance',
    role: 'Freelance Full-Stack Developer',
    organization: 'Self-Employed',
    startDate: 'Jan 2025',
    endDate: 'Present',
    description:
      'Designing and developing full-stack web applications for clients, from requirements gathering through to deployment. Responsibilities include front-end architecture with React, back-end API design with Node.js, and database modelling with PostgreSQL.',
  },
  // most recent first
]
```

### `Project` interface (extend existing in `src/types/index.ts`)
```ts
export interface Project {
  id: string;
  name: string;
  subtitle: string;
  year: string;
  category: string;
  tech: string[];
  description: string;  // ≥ 2 sentences explaining purpose
  image: string;        // path to image in public/assets/images/
  imageAlt: string;     // non-empty, meaningful alt text
  repoUrl: string;
  liveUrl?: string;
}
```

### AI image documentation
| Image file | AI tool used | Prompt summary |
|---|---|---|
| `public/assets/images/portfolio-hero.png` | *(fill in after generation)* | Professional developer workspace / portfolio header illustration |
| `public/assets/images/portfolio-experience.png` | *(fill in after generation)* | Abstract career/timeline theme for experience section |

> **Action required:** After generating images, update the table above with the tool name and a brief prompt description.

### Validation rules
- `description` on every `WorkEntry` must be a non-empty string — enforced by TypeScript (not optional)
- `imageAlt` on every `Project` must be a non-empty string
- `EDUCATION` and `WORK_EXPERIENCE` arrays must each have at least one entry
- `PROJECTS` array must have at least one entry with a non-empty `image` path
- Entries within each array must be in reverse chronological order (most recent `startDate` first)

### Expected behaviour
- Page loads at `/portfolio` without a redirect
- All three sections are visible on a single scroll
- Download CV link triggers a file download (or opens the PDF in a new tab if `download` attribute is unsupported)
- Project images load without broken-image placeholders; layout does not shift on image load

---

## 5. User Flow

```
User clicks "Portfolio" in the nav
        │
        ▼
/portfolio loads inside Layout (Header + Footer inherited)
        │
        ▼
Page header / hero area visible above the fold
  → Name or page title, Download CV button, AI-generated hero image
        │
        ▼
User scrolls down
        │
        ▼
Education section (#education)
  → Section heading, timeline of institution + program + dates (most recent first)
        │
        ▼
User scrolls down
        │
        ▼
Work Experience section (#experience)
  → Section heading, timeline of role + org + dates + description (most recent first)
        │
        ▼
User scrolls down
        │
        ▼
Projects section (#projects)
  → Section heading, project cards (image + name + tech + description)
        │
        ▼
Footer (rendered by Layout)
```

---

## 6. Acceptance Criteria

All criteria must pass before merging `feature/portfolio-page` → `dev`.

### Routing
- [ ] **AC1** — Visiting `/portfolio` loads the Portfolio page without a redirect
- [ ] **AC2** — The page renders inside `Layout` — header and footer are present
- [ ] **AC3** — The "Portfolio" nav link is active/highlighted when on this route

### Education section
- [ ] **AC4** — At least one educational institution is listed under a visible "Education" heading
- [ ] **AC5** — Each entry displays institution name, degree/program, and dates
- [ ] **AC6** — Entries are in reverse chronological order (most recent first)

### Work experience section
- [ ] **AC7** — At least one work experience entry is listed under a visible "Work Experience" heading
- [ ] **AC8** — Each entry displays title/role, organization, dates, and a description
- [ ] **AC9** — Descriptions mention responsibilities or achievements (not just a job title)
- [ ] **AC10** — Entries are in reverse chronological order (most recent first)

### Projects section
- [ ] **AC11** — At least one project is listed under a visible "Projects" heading
- [ ] **AC12** — Each project displays a name, tech stack, description, and image
- [ ] **AC13** — Descriptions explain what the project is and its purpose (≥ 2 sentences)
- [ ] **AC14** — All project images have non-empty, meaningful `alt` text

### Downloadable CV
- [ ] **AC15** — A "Download CV" or "Download Résumé" link is visible on the page
- [ ] **AC16** — The link uses `<a href="/assets/charles-winfield-cv.pdf" download>` or equivalent
- [ ] **AC17** — The link is styled consistently with the global `.btn` system

### Layout
- [ ] **AC18** — The page has at least 3 visually distinct sections with clear h2 headings
- [ ] **AC19** — Sections are separated by spacing, background colour, or dividers — no visual bleeding

### AI-generated images
- [ ] **AC20** — At least 2 images on the page were generated by an AI tool
- [ ] **AC21** — Both images are stored in `public/assets/images/`
- [ ] **AC22** — Both images have non-empty, meaningful `alt` text
- [ ] **AC23** — The AI tool and prompt summary are documented in Section 4 of this spec

### Data & code quality
- [ ] **AC24** — All content (education, work, projects) lives in `src/lib/data.ts`, not hardcoded in components
- [ ] **AC25** — `tsc --noEmit` passes with zero errors
- [ ] **AC26** — `npm run build` succeeds with zero errors
- [ ] **AC27** — No `any` types used — `unknown` + type narrowing where needed

### Responsive
- [ ] **AC28** — Page layout is correct and readable at 375px, 768px, and 1280px viewports
- [ ] **AC29** — No horizontal scrolling appears on a 375px viewport

---

*Last updated: 2026-04-28 | Depends on: ai-spec.md, home-page.feature.md | Next: Links page, Contact page*
