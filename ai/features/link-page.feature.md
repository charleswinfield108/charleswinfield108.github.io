# Feature Spec — Link Page

> **Prerequisite:** Read [ai-spec.md](../ai-spec.md) before implementing anything in this feature.
> This feature depends on the Layout established in [header-footer.feature.md](header-footer.feature.md).

---

## 1. Feature Goal & Scope

### Goal
Build a curated link directory page — a single, focused page that surfaces Charles's most important external presences and resources (GitHub profile, LinkedIn, live projects, social accounts, articles, etc.) in a consistent card-based layout. Each card gives the visitor enough context to decide whether to click through, then opens the destination in a new tab. At least one AI-generated image supports the visual identity of the page.

### In scope
- Link page component (`src/pages/Links.tsx`) rendered inside `Layout`
- ≥ 3 link cards, each with: image/thumbnail, title, short description, clickable external URL (opens in new tab)
- At least 1 AI-generated image on the page with proper `alt` text, tool documented in this spec
- All link data sourced from `src/lib/data.ts`
- Page accessible from the navigation

### Out of scope
- Contact form — covered in Feature 05
- Admin / Supabase interaction — covered in Features 05–07
- Dark / light mode — covered in Feature 08
- Animation / scroll reveals — covered in Feature 08
- Link tracking, click analytics, or shortened URLs
- User-submitted or dynamic links (all links are static, defined in `data.ts`)

---

## 2. Requirements Breakdown

### R1 — Link page route
- Accessible at `/links` (or a nav label such as "Links" or "Connect")
- Renders inside `<Layout>` — header and footer inherited automatically
- Navigation contains a link to this page
- The page is a single, fully visible list — no pagination, no filtering

### R2 — Link cards
- ≥ 3 link cards are displayed
- Each card must contain all four of the following:
  1. **Image / thumbnail** — a preview image, logo, or AI-generated illustration representing the destination; must have a non-empty `alt` attribute
  2. **Title / name** — the name of the link destination (e.g. "GitHub", "LinkedIn", "Live Portfolio")
  3. **Short description** — 1–3 sentences explaining what the link is and why it is worth visiting
  4. **Clickable URL** — opens in a **new tab** (`target="_blank"`) with `rel="noopener noreferrer"` for security
- Cards use a consistent visual template — same layout, spacing, and typography for every card
- Cards are arranged in a grid or stacked column layout, not a plain unordered list

### R3 — AI-generated image(s)
- **At least 1** image on the page is generated using an AI image tool
- Acceptable placements: page hero/header illustration, card thumbnail(s), decorative section element
- Saved to `public/assets/` (e.g. `public/assets/links-hero.png`)
- Has a non-empty, meaningful `alt` attribute
- The AI tool and prompt summary are documented in Section 4 of this spec

### R4 — External link security
- Every external `<a>` element must include `target="_blank"` and `rel="noopener noreferrer"`
- No link may open in the same tab — all destinations are external
- URLs are validated as non-empty strings in the data type (TypeScript enforces this)

### R5 — Visual structure
- The page has a clear heading (h1 or styled page title) identifying it as a links / connect page
- Cards are visually separated from one another (gap, border, or shadow)
- The overall layout is responsive: cards stack on mobile, form a grid on desktop

---

## 3. Interfaces Involved

### Pages
| Route | Component | Notes |
|---|---|---|
| `/links` | `src/pages/Links.tsx` | Renders link card grid inside `Layout` |

### Components
| File | Purpose |
|---|---|
| `src/components/ui/LinkCard.tsx` | Reusable card: image, title, description, external URL |

### Data
| File | Exports |
|---|---|
| `src/lib/data.ts` | `LINKS` array |

### Types
| File | Interfaces |
|---|---|
| `src/types/index.ts` | `ExternalLink` |

### Assets
| File | Purpose |
|---|---|
| `public/assets/links-hero.png` | AI-generated page hero or decorative illustration |
| `public/assets/link-*.png` | Optional per-card thumbnails (AI-generated or brand logos) |

---

## 4. Data, Validations & Expected Behaviour

### `ExternalLink` interface
```ts
export interface ExternalLink {
  id: string;
  title: string;        // required, non-empty
  description: string;  // 1–3 sentences — required, non-empty
  url: string;          // required, non-empty, must be a valid absolute URL
  image: string;        // path to image in public/assets/ — required
  imageAlt: string;     // non-empty alt text — required
}
```

### `LINKS` array (minimum entries)
```ts
export const LINKS: ExternalLink[] = [
  {
    id: 'github',
    title: 'GitHub',
    description: 'Browse my public repositories, open-source contributions, and the source code behind every project in my portfolio. Most of my work is visible here.',
    url: 'https://github.com/charleswinfield108',
    image: '/assets/link-github.png',
    imageAlt: 'GitHub profile of Charles Winfield',
  },
  {
    id: 'linkedin',
    title: 'LinkedIn',
    description: 'Connect with me professionally. My profile includes my full work history, education, and recommendations from peers and instructors.',
    url: 'https://linkedin.com/in/charles-winfield',   // replace with real URL
    image: '/assets/link-linkedin.png',
    imageAlt: 'LinkedIn profile of Charles Winfield',
  },
  {
    id: 'portfolio-live',
    title: 'Live Portfolio',
    description: 'The live version of this portfolio, deployed to GitHub Pages. A good starting point for anyone wanting to see my work and contact me.',
    url: 'https://charleswinfield.github.io',
    image: '/assets/links-hero.png',
    imageAlt: 'Live portfolio website preview',
  },
  // add more links as needed (LeetCode, blog, Devpost, etc.)
];
```

### AI image documentation
| Image file | AI tool used | Prompt summary |
|---|---|---|
| `public/assets/links-hero.png` | *(fill in after generation)* | Abstract network / connection themed illustration for links page |

> **Action required:** After generating images, update the table above with the tool name and a brief prompt description.

### Validation rules
- `url` must be a non-empty absolute URL string (starts with `https://`) — enforced by TypeScript type and code review
- `description` must be a non-empty string — no `?` on the field in the interface
- `imageAlt` must be a non-empty string — no `?` on the field
- Every `<a>` rendered from this data must include `target="_blank"` and `rel="noopener noreferrer"` — enforced in `LinkCard.tsx`, never left to the caller

### Expected behaviour
- Clicking any card (or its title/button) opens the external URL in a **new browser tab**
- The current page remains open and unchanged after a card is clicked
- Images load without broken-image placeholders; use explicit `aspect-ratio` or `width`/`height` on `<img>` to prevent layout shift
- If a link's image fails to load, the card layout does not break — use an `object-fit: cover` approach with a fallback background colour

---

## 5. User Flow

```
User clicks "Links" (or "Connect") in the navigation
        │
        ▼
/links loads inside Layout (Header + Footer inherited)
        │
        ▼
Page title visible ("Links" or "Connect")
Optional: AI-generated hero image beneath / beside the title
        │
        ▼
Grid / column of link cards displayed
  Each card: thumbnail | title | 1–3 sentence description | clickable element
        │
        ▼
User reads a card and clicks it
        │
        ▼
External URL opens in a new tab
Current page remains open
        │
        ▼
Footer (rendered by Layout)
```

---

## 6. Acceptance Criteria

All criteria must pass before merging `feature/link-page` → `dev`.

### Routing
- [ ] **AC1** — `/links` loads the Link page without a redirect
- [ ] **AC2** — The page renders inside `Layout` — header and footer are present
- [ ] **AC3** — The navigation contains a link that takes the user to this page

### Link cards
- [ ] **AC4** — At least 3 link cards are displayed on the page
- [ ] **AC5** — Every card includes an image, a title, a short description (1–3 sentences), and a clickable URL
- [ ] **AC6** — Every card's URL opens in a new tab (`target="_blank"`)
- [ ] **AC7** — Every external `<a>` includes `rel="noopener noreferrer"`
- [ ] **AC8** — All cards use the same visual template — consistent layout, spacing, and typography
- [ ] **AC9** — Cards are arranged in a grid or column layout, not a plain bullet list

### AI-generated image(s)
- [ ] **AC10** — At least 1 image on the page was generated by an AI tool
- [ ] **AC11** — The AI-generated image is stored in `public/assets/`
- [ ] **AC12** — The AI-generated image has a non-empty, meaningful `alt` attribute
- [ ] **AC13** — The AI tool and prompt summary are documented in the Section 4 table of this spec

### Images (all cards)
- [ ] **AC14** — Every card image has a non-empty `alt` attribute
- [ ] **AC15** — No card image causes a broken-image placeholder to appear on page load

### Data & code quality
- [ ] **AC16** — All link data (title, description, URL, image path) lives in `src/lib/data.ts`, not hardcoded in components
- [ ] **AC17** — `tsc --noEmit` passes with zero errors
- [ ] **AC18** — `npm run build` succeeds with zero errors

### Responsive
- [ ] **AC19** — Page layout is correct and readable at 375px, 768px, and 1280px viewports
- [ ] **AC20** — No horizontal scrolling appears on a 375px viewport
- [ ] **AC21** — Card images scale correctly and do not overflow their containers on mobile

---

*Last updated: 2026-04-26 | Depends on: ai-spec.md, header-footer.feature.md | Next: contact-form.feature.md*
