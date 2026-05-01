# Feature Spec — Login Page

> **Prerequisite:** Read [ai-spec.md](../ai-spec.md) before implementing anything in this feature.
> This feature introduces admin authentication via Supabase Auth.
> The Login page is intentionally hidden from navigation and only accessible by direct URL or keyboard shortcut.

---

## 1. Feature Goal & Scope

### Goal
Build a hidden login page that allows the site admin (Charles) to authenticate via email and password using Supabase Auth. On successful login, the user is redirected to the Admin Back Office (`/admin`) where they can view submitted contact form messages. The login route is **not** advertised in the navigation — it's only accessible by typing the URL directly or via a keyboard shortcut.

### In scope
- Login page component (`src/pages/Login.tsx`) — **not** rendered inside `Layout`
- Email and password input fields
- Supabase Auth `signInWithPassword()` integration
- Session persistence — refreshing the page keeps the user logged in
- Redirect to Admin Back Office (`/admin`) on successful login
- Error handling and display (invalid credentials)
- Keyboard shortcut to navigate to the login page (e.g., `Ctrl + Shift + L`)
- Supabase client reuse from `src/lib/supabaseClient.ts`

### Out of scope
- User registration / sign-up — admin account is pre-created in Supabase dashboard
- Multi-factor authentication (MFA)
- "Forgot password" flow
- Social login (Google, GitHub, etc.)
- Session expiry warnings
- Account lockout after failed attempts
- Light/dark mode styling — covered in Feature 08
- Animation / transitions — covered in Feature 08

---

## 2. Requirements Breakdown

### R1 — Login page route
- Accessible at `/login` or `/admin/login`
- **Not** included in navigation links (header, footer, mobile nav)
- Page renders **outside** `Layout` — full-screen, no header/footer
- No navigation breadcrumbs or back button linking to public areas

### R2 — Form fields
- The form contains exactly two fields:
  1. **Email** — `<input type="email">`, label: "Email Address"
  2. **Password** — `<input type="password">`, label: "Password"
- Both fields have visible `<label>` elements (not placeholder-only)
- All fields have `name` / `id` attributes matching their labels' `htmlFor`

### R3 — Client-side validation
- Both fields are **required** — the form cannot be submitted with empty fields
- Email field must contain a valid email format (standard email regex or browser `type="email"` + custom check)
- Validation is triggered on submit attempt (not on blur)
- When validation fails:
  - Error message is displayed adjacent to or below the offending field
  - The submit button remains clickable but the form blocks submission and shows errors
  - Focus is moved to the first invalid field
- When the user corrects a field, its error clears immediately (on change)

### R4 — Supabase Auth integration
- File: `src/lib/supabaseClient.ts` (reused)
- On form submission with valid data:
  ```ts
  const { data, error } = await supabase.auth.signInWithPassword({
    email: form.email.trim().toLowerCase(),
    password: form.password,
  });
  ```
- If `error` is null and `data.session` exists, login succeeded
- If `error` exists, login failed — display error message

### R5 — Submit button states
| Status | Button label | Button disabled? |
|---|---|---|
| `idle` | "Sign In" | No |
| `loading` | "Signing In…" | Yes |
| `error` | "Try Again" | No |

### R6 — Success redirect
- On successful login:
  1. Session is established (stored in browser via Supabase)
  2. User is redirected to `/admin` (or `/admin/dashboard`)
  3. If user refreshes the page or closes/reopens the browser, they remain logged in (session persists)

### R7 — Failure feedback
- Display error message: "Invalid login credentials" or similar
- Visually distinct: red text / red border on error banner
- Form fields are **not** cleared after failure (user can retry)
- Error persists until user retries or modifies the form

### R8 — Session check on route access
- When the `/admin` route loads:
  - If a valid session exists → allow access to Admin page
  - If no session → redirect to `/login`
- Implemented via a protected route wrapper or useEffect in the Admin component

### R9 — Keyboard shortcut (optional but recommended)
- Pressing `Ctrl + Shift + L` (or `Cmd + Shift + L` on Mac) navigates to `/login`
- Implement in `App.tsx` or a global hook
- Only works when the user is on public pages (not already logged in)

### R10 — Secret URL accessibility
- The `/login` route is **not** linked from any public page
- The only way to access it is:
  1. Manually type the URL in the browser: `https://charleswinfield.github.io/#/login`
  2. Use the keyboard shortcut (if implemented)
  3. Be redirected from `/admin` if no session exists

---

## 3. Interfaces Involved

### Pages
| Route | Component | Notes |
|---|---|---|
| `/login` | `src/pages/Login.tsx` | Full-screen login, outside Layout |
| `/admin` | `src/pages/Admin.tsx` | Protected — redirects to `/login` if not authenticated |

### Components
| File | Purpose |
|---|---|
| `src/components/ui/LoginForm.tsx` | Login form with email, password, validation, submit handler |
| `src/components/ui/FormField.tsx` | Reusable labelled input (shared with Contact form) |
| `src/components/ui/FeedbackBanner.tsx` | Error banner (shared with Contact form) |

### Supabase
| Resource | Details |
|---|---|
| Client | `src/lib/supabaseClient.ts` (reused) |
| Auth | `supabase.auth.signInWithPassword()` |
| Admin account | Pre-created in Supabase dashboard (email + strong password) |

### Environment variables
| Variable | Purpose | Note |
|---|---|---|
| `VITE_SUPABASE_URL` | Supabase project URL | Same as Contact form |
| `VITE_SUPABASE_ANON_KEY` | Supabase anon public key | Same as Contact form |

---

## 4. Data, Validations & Expected Behaviour

### Form state shape (local React state)
```ts
interface LoginFormState {
  email: string;
  password: string;
}

interface LoginFormErrors {
  email?: string;
  password?: string;
}

type SubmitStatus = 'idle' | 'loading' | 'error';
```

### Validation rules
| Field | Rule | Error message |
|---|---|---|
| `email` | Non-empty + valid email format | "Email is required" / "Please enter a valid email address" |
| `password` | Non-empty | "Password is required" |

Email format check (acceptable approaches):
```ts
// Option A — simple regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Option B — rely on browser validation via type="email"
```

### Submission payload
```ts
const { data, error } = await supabase.auth.signInWithPassword({
  email: form.email.trim().toLowerCase(),
  password: form.password, // no trim — passwords are case/whitespace-sensitive
});
```

### Expected behaviour — edge cases
- **Wrong email** — Supabase returns error: "Invalid login credentials"
- **Wrong password** — Supabase returns error: "Invalid login credentials"
- **Non-existent account** — Supabase returns error: "Invalid login credentials"
- **Network offline** — Supabase call rejects; show generic error
- **Double submit** — Disabled button during `loading` state prevents this
- **Session already exists** — User should not see the login page; redirect to `/admin` automatically

---

## 5. User Flow

```
User manually types /login in the browser
  OR presses Ctrl + Shift + L keyboard shortcut
        │
        ▼
/login loads full-screen Login page (no header/footer)
        │
        ▼
User enters email and password
        │
        ├─── User clicks "Sign In" with empty / invalid fields
        │           │
        │           ▼
        │    Validation errors shown inline
        │    Focus moved to first invalid field
        │    Form not submitted
        │
        └─── User fills both fields correctly and clicks "Sign In"
                    │
                    ▼
             Button → "Signing In…" (disabled)
                    │
                    ├─── Supabase auth succeeds
                    │           │
                    │           ▼
                    │    Session established
                    │    Redirect to /admin
                    │    Admin page loads (user can see contact messages)
                    │
                    └─── Supabase auth fails
                                │
                                ▼
                         ❌ Error banner: "Invalid login credentials"
                         Form fields preserved
                         Button → "Try Again" (enabled)
                         User can retry with different credentials
```

---

## 6. Acceptance Criteria

All criteria must pass before merging `feature/login-page` → `dev`.

### Routing
- [ ] **AC1** — `/login` loads the Login page without a redirect
- [ ] **AC2** — The page renders **outside** `Layout` — no header or footer
- [ ] **AC3** — The login route is **not** linked from any navigation menu

### Form fields
- [ ] **AC4** — An email input for email is present with a visible label
- [ ] **AC5** — A password input for password is present with a visible label
- [ ] **AC6** — All labels are properly associated with their inputs via `htmlFor` / `id`

### Client-side validation
- [ ] **AC7** — Submitting with empty email shows an error
- [ ] **AC8** — Submitting with invalid email format (e.g. "notanemail") shows an error
- [ ] **AC9** — Submitting with empty password shows an error
- [ ] **AC10** — A validation error on a field clears when the user corrects that field
- [ ] **AC11** — The form does not reach Supabase when validation fails

### Supabase authentication
- [ ] **AC12** — Using correct admin credentials succeeds and establishes a session
- [ ] **AC13** — Using incorrect credentials shows "Invalid login credentials" error
- [ ] **AC14** — The submit button shows "Signing In…" and is disabled during the auth call
- [ ] **AC15** — After successful login, the user is redirected to `/admin`

### Session persistence
- [ ] **AC16** — After successful login, refreshing `/admin` keeps the user logged in
- [ ] **AC17** — Closing and reopening the browser (or new tab) preserves the session
- [ ] **AC18** — If no session exists and user navigates to `/admin`, they are redirected to `/login`

### Failure feedback
- [ ] **AC19** — An error message is displayed when Supabase auth fails
- [ ] **AC20** — The error message uses red colour scheme and is visually distinct
- [ ] **AC21** — Form fields are **not** cleared after a failed login (user can retry)

### Keyboard shortcut (if implemented)
- [ ] **AC22** — Pressing `Ctrl + Shift + L` navigates to `/login`
- [ ] **AC23** — The shortcut does not trigger when user is already logged in

### Security & environment
- [ ] **AC24** — `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are read from environment — never hardcoded
- [ ] **AC25** — The admin account is pre-created in Supabase (not creatable via this form)
- [ ] **AC26** — `.env` is not committed to the repository

### Build & code quality
- [ ] **AC27** — `tsc --noEmit` passes with zero errors
- [ ] **AC28** — `npm run build` succeeds with zero errors
- [ ] **AC29** — No `console.log` or debug code left in the submission handler

### Responsive
- [ ] **AC30** — Login form is usable and readable at 375px, 768px, and 1280px viewports
- [ ] **AC31** — No horizontal scrolling on a 375px viewport

---

## 7. Implementation Notes

### Database / Supabase setup
1. **Pre-create admin account in Supabase dashboard:**
   - Go to `Authentication` → `Users` → `Create user`
   - Email: (use a test email, e.g., `admin@charleswinfield.io`)
   - Password: (strong, e.g., 32+ characters, random)
   - Save credentials securely (password manager)

2. **Row-Level Security (RLS):**
   - The `messages` table should have RLS:
     - `anon` can INSERT (public form submission)
     - `authenticated` can SELECT (admin reads their own submissions)
     - No UPDATE / DELETE for any role

3. **Session storage:**
   - Supabase automatically stores the session in `localStorage` (browser default)
   - On page load, check `supabase.auth.getSession()` to restore session

### Component structure
```
src/
├── pages/
│   ├── Login.tsx          ← Full-screen login form
│   └── Admin.tsx          ← Protected admin page (next feature)
├── components/
│   └── ui/
│       ├── LoginForm.tsx  ← Form component with auth logic
│       ├── FormField.tsx  ← (reused from Contact form)
│       └── FeedbackBanner.tsx ← (reused from Contact form)
└── lib/
    └── supabaseClient.ts  ← (reused)
```

### Keyboard shortcut implementation (optional)
```tsx
// In App.tsx useEffect or a custom hook:
useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'L') {
      navigate('/login');
    }
  };
  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}, [navigate]);
```

### Protected route pattern
```tsx
// In App.tsx or a ProtectedRoute component:
const [session, setSession] = useState(null);

useEffect(() => {
  supabase.auth.getSession().then(({ data }) => {
    setSession(data.session);
  });

  const { data } = supabase.auth.onAuthStateChange((event, session) => {
    setSession(session);
  });
  
  return () => data.subscription.unsubscribe();
}, []);

// Then wrap /admin route:
<Route path="/admin" element={session ? <Admin /> : <Navigate to="/login" />} />
```

---
