# Feature Spec — Login Page

> **Prerequisite:** Read [ai-spec.md](../ai-spec.md) before implementing anything in this feature.
> This feature depends on the Supabase client established in [contact-page.feature.md](contact-page.feature.md).

---

## 1. Feature Goal & Scope

### Goal
Build a hidden admin login page accessible only by manually typing its URL (or via a secret keyboard shortcut). The page authenticates a pre-existing admin user against Supabase Auth using `signInWithPassword`. On success, the user is redirected to the Back Office (`/backoffice`) with a persistent session. On failure, a clear error message is shown. The page is intentionally invisible to the public — it appears nowhere in any navigation.

### In scope
- Login page component (`src/pages/Login.tsx`) at route `/login`
- Email + password form with submit button
- Supabase Auth `signInWithPassword` call using the shared client
- Redirect to `/backoffice` on success
- Persistent session — refresh does not log the user out
- Auto-redirect to `/backoffice` if a valid session already exists when `/login` is loaded
- Error feedback for failed login attempts (visually distinct, red)
- Route completely absent from header nav, footer, and mobile bottom nav
- Optional: secret keyboard shortcut to reach `/login` (e.g. `Shift + Ctrl + A`)

### Out of scope
- User registration — the admin account is pre-created in the Supabase dashboard, not via the app
- Password reset / forgot password flow
- Multi-user auth or role management
- "Remember me" checkbox — session persistence is handled by Supabase by default
- Social / OAuth login
- The Back Office page itself — covered in the Admin Back Office feature
- Dark / light mode — covered in Feature 08

---

## 2. Requirements Breakdown

### R1 — Hidden route
- Route: `/login`
- The route is **not** linked from any public-facing UI:
  - Not in the `<Header>` / `<Navbar>`
  - Not in the `<Footer>`
  - Not in the mobile `<BottomNav>`
  - Not in any sitemap, `robots.txt`, or link on any other page
- Access methods:
  1. **Direct URL** — user types `https://charleswinfield.github.io/login` manually
  2. **Secret keyboard shortcut** (optional extra mile) — e.g. pressing `Shift + Ctrl + A` anywhere on the public site triggers `navigate('/login')`
- The page renders **without** the standard `<Layout>` wrapper — no header or footer (this keeps the page visually distinct and removes any accidental navigation back to the public site)

### R2 — Login form fields
- The form contains exactly two fields:
  1. **Email** — `<input type="email">` with a visible label or placeholder "Email"
  2. **Password** — `<input type="password">` with a visible label or placeholder "Password"
- A **submit button** is present, labelled "Login" or "Sign In"
- Form has `autocomplete` attributes: `email` on the email field, `current-password` on the password field (browser password manager compatibility)
- No other fields — registration, username, or role fields must not appear

### R3 — Supabase Auth integration
- Uses the shared client from `src/lib/supabaseClient.ts` — never re-initialise
- On form submit:
  ```ts
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.trim().toLowerCase(),
    password: password,
  });
  ```
- Admin account is pre-created directly in the Supabase dashboard:
  - Email: `admin@codeboxx.com`
  - Password: `C0deB0xx4dm!n`
  - These credentials are documented here only — never hardcoded in source code

### R4 — Session persistence
- Supabase Auth uses `localStorage` by default to persist the session token
- After a successful login, refreshing the page at `/backoffice` must keep the user authenticated — no re-login required
- When `/login` is loaded and `supabase.auth.getSession()` returns an active session, the user is immediately redirected to `/backoffice` without seeing the form

### R5 — Redirect on success
- After `signInWithPassword` returns without error, the app navigates to `/backoffice` using React Router's `useNavigate`
- The redirect happens programmatically — not a full page reload
- The browser history entry for `/login` is replaced (not pushed) so the back button does not return to the login form after a successful auth

### R6 — Error feedback on failure
- When `signInWithPassword` returns an error (wrong credentials, network issue, etc.):
  - An error message is displayed on the page (e.g. "Invalid login credentials. Please try again.")
  - The message uses a visually distinct red style (red text or red-bordered banner)
  - The password field is cleared; the email field retains its value so the user does not have to retype it
  - The submit button is re-enabled and labelled "Login" again
- The error message clears when the user starts editing either field

### R7 — Loading state
- While `signInWithPassword` is in flight:
  - Submit button shows "Signing in…" and is disabled (prevents double-submission)
  - Both input fields are disabled

---

## 3. Interfaces Involved

### Pages
| Route | Component | Notes |
|---|---|---|
| `/login` | `src/pages/Login.tsx` | Standalone — does **not** use `<Layout>` |

### Components
| File | Purpose |
|---|---|
| `src/pages/Login.tsx` | Full login page: form, validation, Supabase call, redirect logic |

> No sub-components required — the login page is simple enough to keep self-contained.
> `FormField.tsx` from the Contact feature may be reused if it fits.

### Supabase Auth
| Method | Purpose |
|---|---|
| `supabase.auth.signInWithPassword({ email, password })` | Authenticate admin user |
| `supabase.auth.getSession()` | Check for existing session on page load |

### Routing
| Hook / Component | Usage |
|---|---|
| `useNavigate()` | Redirect to `/backoffice` after success |
| `useEffect` + `getSession()` | Auto-redirect if already authenticated |

### Protected route (companion, defined in this feature)
A `<ProtectedRoute>` wrapper component must be created in this feature so that `/backoffice` can use it:

```tsx
// src/components/ProtectedRoute.tsx
// Checks for an active Supabase session.
// Renders children if authenticated; redirects to /login otherwise.
```

This component is consumed by the Back Office feature but must be built here because it depends on the auth session established by the login flow.

---

## 4. Data, Validations & Expected Behaviour

### Form state shape
```ts
interface LoginState {
  email: string;
  password: string;
}

type LoginStatus = 'idle' | 'loading' | 'error';
```

### Client-side validation (lightweight — Supabase is the authority)
| Field | Rule | Behaviour |
|---|---|---|
| `email` | Non-empty | Block submit, no inline error — the empty state is visually obvious |
| `password` | Non-empty | Block submit |
| Both empty | — | Submit button is disabled (no inline error messages needed on a hidden admin page) |

> Full error messaging is handled server-side by Supabase — the only inline error shown is the Supabase Auth error response.

### Submit button states
| `LoginStatus` | Button label | Disabled? | Inputs disabled? |
|---|---|---|---|
| `idle` | "Login" | No (unless fields empty) | No |
| `loading` | "Signing in…" | Yes | Yes |
| `error` | "Login" | No | No |

### Session check on mount
```ts
useEffect(() => {
  supabase.auth.getSession().then(({ data: { session } }) => {
    if (session) navigate('/backoffice', { replace: true });
  });
}, []);
```

### Error handling
| Supabase error | Displayed message |
|---|---|
| `Invalid login credentials` | "Invalid login credentials. Please try again." |
| Network / unknown error | "Something went wrong. Please try again later." |

### Security notes
- Admin credentials (`admin@codeboxx.com` / `C0deB0xx4dm!n`) are documented here and in the Supabase dashboard — they must **never** appear in source code
- The `anon` key is public by design — Supabase RLS policies are the actual security layer
- The session token is stored in `localStorage` by Supabase — no additional storage needed

---

## 5. User Flow

### First-time login
```
Admin types https://charleswinfield.github.io/login in browser
        │
        ▼
Login page loads (no Layout — no header/footer)
getSession() → no active session → show login form
        │
        ▼
Admin enters email + password → clicks "Login"
        │
        ▼
Button → "Signing in…" (disabled), fields disabled
        │
        ├─── signInWithPassword succeeds
        │           │
        │           ▼
        │    Session stored in localStorage
        │    navigate('/backoffice', { replace: true })
        │    Login page removed from history
        │
        └─── signInWithPassword fails
                    │
                    ▼
             ❌ Red error message displayed
             Password field cleared, email retained
             Button → "Login" (re-enabled)
```

### Returning authenticated admin
```
Admin visits /login (or is redirected there)
        │
        ▼
getSession() → active session found
        │
        ▼
navigate('/backoffice', { replace: true })  ← instant, form never shown
```

### Secret keyboard shortcut (optional)
```
User presses Shift + Ctrl + A on any public page
        │
        ▼
navigate('/login')
```

---

## 6. Acceptance Criteria

All criteria must pass before merging `feature/login-page` → `dev`.

### Hidden route
- [ ] **AC1** — `/login` is not linked from the Header, Footer, or mobile BottomNav
- [ ] **AC2** — `/login` does not appear in any other page's markup or navigation list
- [ ] **AC3** — Navigating directly to `https://charleswinfield.github.io/login` loads the login page

### Layout
- [ ] **AC4** — The Login page does **not** render the standard `<Layout>` — no public header or footer visible

### Form fields
- [ ] **AC5** — An email input (`type="email"`) is present
- [ ] **AC6** — A password input (`type="password"`) is present
- [ ] **AC7** — A submit button labelled "Login" or "Sign In" is present
- [ ] **AC8** — Both inputs have `autocomplete` attributes (`email`, `current-password`)

### Supabase Auth
- [ ] **AC9** — `supabase.auth.signInWithPassword()` is called on form submission
- [ ] **AC10** — The shared client from `src/lib/supabaseClient.ts` is used — no second client initialisation
- [ ] **AC11** — The admin credentials (`admin@codeboxx.com` / `C0deB0xx4dm!n`) do not appear anywhere in source code

### Success behaviour
- [ ] **AC12** — Successful login redirects the user to `/backoffice`
- [ ] **AC13** — The redirect uses `{ replace: true }` — the back button does not return to `/login`
- [ ] **AC14** — Refreshing `/backoffice` after login keeps the user authenticated (session persists)
- [ ] **AC15** — Loading `/login` with an active session immediately redirects to `/backoffice`

### Failure behaviour
- [ ] **AC16** — Wrong credentials display a red error message
- [ ] **AC17** — The password field is cleared after a failed attempt; the email field retains its value
- [ ] **AC18** — The error message clears when the user edits either field

### Loading state
- [ ] **AC19** — The submit button shows "Signing in…" and is disabled while the auth request is in flight
- [ ] **AC20** — Both inputs are disabled during the auth request

### Protected route
- [ ] **AC21** — `src/components/ProtectedRoute.tsx` exists and redirects unauthenticated users to `/login`
- [ ] **AC22** — `/backoffice` is wrapped in `<ProtectedRoute>` in `App.tsx`

### Build & code quality
- [ ] **AC23** — `tsc --noEmit` passes with zero errors
- [ ] **AC24** — `npm run build` succeeds with zero errors
- [ ] **AC25** — No `console.log` or debug code left in the auth handler

---

*Last updated: 2026-04-26 | Depends on: ai-spec.md, contact-page.feature.md (supabaseClient) | Next: admin-backoffice.feature.md*
