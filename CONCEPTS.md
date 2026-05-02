# CONCEPTS.md

Three challenging concepts used in this portfolio project, with explanations of their purpose, difficulty, and location in the codebase.

---

## Concept 1 — Scroll-Driven UI Synchronization

**Purpose in the project:**
The Selected Works section is a "pinned" scroll experience where the user scrolls down the page and each project becomes the active one in sequence. Instead of a typical click-based carousel, the active project is driven by how far the user has scrolled through a tall section. Clicking a project number also reverse-calculates the correct scroll position and jumps there smoothly.

**Why it was challenging:**
Translating raw scroll position (pixels) into a 0–1 progress value, then mapping that onto a discrete array index, required understanding how `getBoundingClientRect()` reports position relative to the viewport in real time. Getting the math right so the first project activates at the top and the last one activates at the bottom — without going out of range — took careful thinking about edge cases. The reverse direction (click → scroll target) required inverting that same formula.

**Usage location:**
`src/components/sections/SelectedWorks.tsx`, lines 15–37

```ts
const scrollable = el.offsetHeight - window.innerHeight
const scrolled = -el.getBoundingClientRect().top
const progress = Math.max(0, Math.min(1, scrolled / scrollable))
setActive(Math.min(PROJECTS.length - 1, Math.floor(progress * PROJECTS.length)))
```

---

## Concept 2 — Custom Hook with Intersection Observer

**Purpose in the project:**
The `useReveal` hook watches for an element to enter the viewport and sets a `visible` flag when it does. Components across the site (Skills cards, About section, Contact form) attach this hook to trigger a CSS `fadeUp` animation the first time each element scrolls into view — making the page feel alive without animating everything at page load.

**Why it was challenging:**
The browser's `IntersectionObserver` API is not the same as a regular event listener — it works asynchronously and fires a callback with an array of entries. Wrapping it cleanly into a reusable React hook meant understanding `useRef` to attach the observer to the DOM element, `useEffect` cleanup to avoid memory leaks, and why the observer should disconnect after the first intersection (so the animation only fires once). Getting the threshold value right also required experimenting — too low and elements flash in before they're visible; too high and they never trigger on short viewports.

**Usage location:**
`src/hooks/useReveal.ts`, lines 3–24

```ts
export function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold }
    )
    observer.observe(ref.current!)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, visible }
}
```

---

## Concept 3 — Theme System with CSS Custom Properties and localStorage

**Purpose in the project:**
The site supports a dark mode and a light mode that the user can toggle at any time. The chosen theme is remembered between visits. Rather than duplicating every color value in every component, the entire color palette is defined as CSS custom properties (variables) on the root element, and a single `data-theme="light"` attribute on `<html>` overrides the full palette at once. React manages the state and syncs it to the DOM attribute and localStorage.

**Why it was challenging:**
There are three moving parts that must stay in sync: React state, the `localStorage` value, and the DOM attribute. Setting any one of them without the others causes the theme to be wrong on the next page load or after a re-render. Initializing from the user's OS preference (`prefers-color-scheme`) as a fallback — before any React renders — also had to happen in a plain function (`getInitialTheme`) rather than inside a `useEffect`, otherwise there would be a visible flash of the wrong theme on first load. Understanding the difference between when to use `useState` initializer functions versus `useEffect` was the core challenge here.

**Usage location:**
`src/hooks/useTheme.ts`, lines 5–17; theme tokens defined in `src/index.css`

```ts
function getInitialTheme(): Theme {
  const saved = localStorage.getItem('theme') as Theme | null
  if (saved === 'dark' || saved === 'light') return saved
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('theme', theme)
  }, [theme])
  ...
}
```
