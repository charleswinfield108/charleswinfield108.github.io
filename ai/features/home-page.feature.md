# Feature Spec — Home Page

> **Prerequisite:** Read [ai-spec.md](../ai-spec.md) before implementing anything in this feature.
> This feature depends on the Layout established in [header-footer.feature.md](header-footer.feature.md).

---

## 1. Feature Goal & Scope

### Goal
Build the portfolio's main landing page, served at the root URL (`/`). The page introduces Charles Winfield — his name, role, and a brief bio — then presents his technical skills and soft skills/talents in visually distinct, well-organized sections. At least two AI-generated images support the visual identity of the page.

### In scope
- Root route `/` renders the Home page
- Introduction section: name, role/tagline, introductory paragraph
- Technical skills section: ≥ 3 skills, each with icon + supporting text, in a visual grid/card layout
- Soft skills / talents section: ≥ 3 items, each with icon + supporting text, visually organized
- At least 2 AI-generated images placed on the page with proper `alt` text
- All section content sourced from `src/lib/data.ts` (not hardcoded in components)
- Page renders inside the `Layout` component (header + footer inherited automatically)

### Out of scope
- Projects showcase section — covered in a later feature
- Experience / timeline section — covered in a later feature
- Contact form — covered in Feature 05
- Dark / light mode styling — covered in Feature 08
- Animation / scroll reveals — covered in Feature 08 (polish)
- Any backend or Supabase interaction

---

## 2. Requirements Breakdown

### R1 — Root path
- The route `/` maps to the Home page component (`src/pages/Home.tsx`)
- Visiting `https://charleswinfield.github.io` loads this page by default
- No redirect from another path — `/` is the canonical home URL
- The page renders inside `<Layout>` so the header and footer appear automatically

### R2 — Introduction section
- Section ID: `#introduction` (for nav scroll target)
- Must display:
  - **Full name** — prominently, as the largest text element on the page (h1 or styled heading)
  - **Role / tagline** — e.g. "Full-Stack Developer", displayed beneath the name in a secondary style
  - **Introductory paragraph** — 2–4 sentences describing who Charles is, his background, and what he builds
- At least one AI-generated image appears in or adjacent to this section (e.g. a professional-style portrait or hero illustration)

### R3 — Technical skills section
- Section ID: `#technical-skills`
- Displays ≥ 3 technical skills
- Each skill card / list item must contain:
  - An **icon** representing the skill (from `lucide-react` or an SVG logo — e.g. React, TypeScript, Supabase)
  - A **skill name** (e.g. "React")
  - **Supporting text** — at least one sentence describing the student's experience or use of the skill (not a single word or tag)
- Layout is visually organized: CSS grid of cards, a styled list, or equivalent — not a plain bullet list
- Content sourced from `src/lib/data.ts` as a `TECHNICAL_SKILLS` array

### R4 — Soft skills / talents section
- Section ID: `#soft-skills`
- Displays ≥ 3 soft skills or personal talents
- Each item must contain:
  - An **icon** (from `lucide-react`)
  - A **skill / talent name** (e.g. "Problem Solving")
  - **Supporting text** — at least one sentence expanding on the skill (not a single word)
- Layout is visually organized: same pattern as technical skills for visual consistency
- Content sourced from `src/lib/data.ts` as a `SOFT_SKILLS` array

### R5 — Visual section structure
- The page has **at least 3 distinct sections**: Introduction, Technical Skills, Soft Skills
- Sections are visually separated by one or more of: vertical spacing, alternating background colours, or a horizontal divider
- Each section has a visible heading (h2 level)
- No section bleeds visually into the next

### R6 — AI-generated images
- **At least 2** images on the page are generated using an AI image tool
- Recommended tools: DALL·E 3 (ChatGPT), Adobe Firefly, Midjourney, Stable Diffusion
- Images are saved to `public/assets/` (e.g. `public/assets/hero-portrait.png`, `public/assets/skills-illustration.png`)
- Each image has a meaningful, non-empty `alt` attribute
- The AI tool used to generate each image is documented in this spec (see Section 4)
- Images are relevant to the content: portrait / professional illustration for intro, abstract / tech theme for skills

---

## 3. Interfaces Involved

### Pages
| Route | Component | Notes |
|---|---|---|
| `/` | `src/pages/Home.tsx` | Assembles all three sections; renders inside `Layout` |

### Section components
| File | Section | ID |
|---|---|---|
| `src/components/sections/Introduction.tsx` | Name, role, bio, hero image | `#introduction` |
| `src/components/sections/TechnicalSkills.tsx` | Technical skill cards | `#technical-skills` |
| `src/components/sections/SoftSkills.tsx` | Soft skill / talent cards | `#soft-skills` |

### Shared / UI components
| File | Purpose |
|---|---|
| `src/components/ui/SkillCard.tsx` | Reusable card: icon + name + supporting text (used by both skills sections) |

### Data
| File | Exports |
|---|---|
| `src/lib/data.ts` | `TECHNICAL_SKILLS`, `SOFT_SKILLS`, `BIO` (name, tagline, intro paragraph) |

### Types
| File | Interfaces |
|---|---|
| `src/types/index.ts` | `Skill` (id, name, description, icon), `Bio` (name, tagline, intro) |

### Assets
| File | Purpose |
|---|---|
| `public/assets/hero-portrait.png` | AI-generated portrait / hero illustration (Introduction section) |
| `public/assets/skills-illustration.png` | AI-generated image for skills area |

---

## 4. Data, Validations & Expected Behaviour

### `Bio` object (in `src/lib/data.ts`)
```ts
export const BIO: Bio = {
  name: 'Charles Winfield',
  tagline: 'Full-Stack Developer',
  intro: 'A brief 2–4 sentence paragraph describing Charles, his background, and what he builds.',
};
```

### `Skill` interface (in `src/types/index.ts`)
```ts
export interface Skill {
  id: string;
  name: string;
  description: string;   // ≥ 1 sentence — required, never empty
  icon: LucideIcon;      // or string path for custom SVG icons
}
```

### `TECHNICAL_SKILLS` array (minimum entries)
```ts
export const TECHNICAL_SKILLS: Skill[] = [
  {
    id: 'react',
    name: 'React',
    description: 'Built interactive UIs and single-page applications using React hooks, context, and component composition.',
    icon: CodeIcon,
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    description: 'Authored strictly typed codebases across 15 modules, reducing runtime errors and improving editor tooling.',
    icon: FileCodeIcon,
  },
  {
    id: 'supabase',
    name: 'Supabase',
    description: 'Used Supabase for database storage, authentication, and real-time subscriptions without a custom server.',
    icon: DatabaseIcon,
  },
  // add more as needed
];
```

### `SOFT_SKILLS` array (minimum entries)
```ts
export const SOFT_SKILLS: Skill[] = [
  {
    id: 'problem-solving',
    name: 'Problem Solving',
    description: 'Approaches technical challenges methodically — breaks down complex problems into testable, incremental steps.',
    icon: BrainIcon,
  },
  {
    id: 'communication',
    name: 'Communication',
    description: 'Explains technical concepts clearly to both technical teammates and non-technical stakeholders.',
    icon: MessageSquareIcon,
  },
  {
    id: 'adaptability',
    name: 'Adaptability',
    description: 'Thrives in rapidly changing environments — comfortable switching between languages, frameworks, and problem domains.',
    icon: RefreshCwIcon,
  },
  // add more as needed
];
```

### AI image documentation
| Image file | AI tool used | Prompt summary |
|---|---|---|
| `public/assets/hero-portrait.png` | *(to be filled in after generation)* | Professional developer portrait / abstract hero illustration |
| `public/assets/skills-illustration.png` | *(to be filled in after generation)* | Abstract tech / code theme representing skills |

> **Action required:** After generating images, update the table above with the tool name and a brief prompt description.

### Validation rules
- `description` field on every `Skill` must be a non-empty string of ≥ 1 full sentence — enforced by TypeScript type (not optional)
- `alt` text on every image must be a non-empty string — enforced by linting / code review
- `BIO.name` and `BIO.tagline` must be non-empty strings

### Expected behaviour
- Page loads at `/` with no redirect
- All three sections are visible on a single scroll without any navigation action required
- Nav links (`#introduction`, `#technical-skills`, `#soft-skills`) scroll smoothly to the correct section
- Images load without broken-image placeholders; if an image is slow, the layout does not shift significantly (use explicit `width`/`height` or `aspect-ratio`)

---

## 5. User Flow

```
User visits https://charleswinfield.github.io
        │
        ▼
Home page loads inside Layout (Header + Footer inherited)
        │
        ▼
Introduction section visible immediately above the fold
  → Name (h1), role/tagline, introductory paragraph, hero image
        │
        ▼
User scrolls down
        │
        ▼
Technical Skills section
  → Section heading (h2), grid of skill cards (icon + name + description)
        │
        ▼
User scrolls down
        │
        ▼
Soft Skills / Talents section
  → Section heading (h2), grid of talent cards (icon + name + description)
        │
        ▼
Footer (rendered by Layout)
```

---

## 6. Acceptance Criteria

All criteria must pass before merging `feature/home-page` → `dev`.

### Routing
- [ ] **AC1** — Visiting `/` loads the Home page without a redirect
- [ ] **AC2** — The page renders inside `Layout` — header and footer are present

### Introduction section
- [ ] **AC3** — Charles's full name is prominently displayed (largest text on page)
- [ ] **AC4** — A role or tagline is visible beneath the name
- [ ] **AC5** — An introductory paragraph (2–4 sentences) is present

### Technical skills
- [ ] **AC6** — At least 3 technical skills are displayed
- [ ] **AC7** — Each skill has an icon, a name, and ≥ 1 sentence of supporting text
- [ ] **AC8** — Skills are presented in a visual grid or card layout (not a plain bullet list)

### Soft skills
- [ ] **AC9** — At least 3 soft skills or talents are displayed
- [ ] **AC10** — Each item has an icon, a name, and ≥ 1 sentence of supporting text
- [ ] **AC11** — Soft skills use the same visual pattern as technical skills for consistency

### Visual structure
- [ ] **AC12** — The page has at least 3 visually distinct sections with clear headings
- [ ] **AC13** — Sections are separated by spacing, background colour, or dividers — no visual bleeding between sections

### AI-generated images
- [ ] **AC14** — At least 2 images on the page were generated by an AI tool
- [ ] **AC15** — Both images are stored in `public/assets/`
- [ ] **AC16** — Both images have non-empty, meaningful `alt` text
- [ ] **AC17** — The AI tool and prompt summary are documented in this spec (Section 4 table)

### Data & code quality
- [ ] **AC18** — All content (name, tagline, bio, skills) lives in `src/lib/data.ts`, not hardcoded in components
- [ ] **AC19** — `tsc --noEmit` passes with zero errors
- [ ] **AC20** — `npm run build` succeeds with zero errors

### Responsive
- [ ] **AC21** — Page layout is correct and readable at 375px, 768px, and 1280px viewports
- [ ] **AC22** — No horizontal scrolling appears on a 375px viewport

---

*Last updated: 2026-04-26 | Depends on: ai-spec.md, header-footer.feature.md | Next: feature spec for Projects or Experience*
