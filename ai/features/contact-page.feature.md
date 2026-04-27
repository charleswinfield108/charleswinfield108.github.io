# Feature Spec — Contact Page

> **Prerequisite:** Read [ai-spec.md](../ai-spec.md) before implementing anything in this feature.
> This feature depends on the Layout established in [header-footer.feature.md](header-footer.feature.md).
> This feature introduces the first Supabase interaction in the project.

---

## 1. Feature Goal & Scope

### Goal
Build the Contact page — a publicly accessible form that allows visitors to send a message to Charles. On valid submission the form data (`name`, `email`, `message`) is inserted into a `messages` table in Supabase. The user receives clear visual feedback on success or failure, and the form resets after a successful send. All Supabase interaction happens client-side via the shared Supabase client.

### In scope
- Contact page component (`src/pages/Contact.tsx`) rendered inside `Layout`
- Contact form with three fields: name, email, message
- Client-side validation: required fields, email format
- Supabase `INSERT` to the `messages` table on valid submission
- Success and failure feedback UI (visually distinct, auto-dismissing success)
- Form reset after successful submission
- Supabase client initialised in `src/lib/supabaseClient.ts`

### Out of scope
- Email delivery / SMTP — Supabase stores the message; no email is sent to Charles automatically
- Admin view of submitted messages — covered in the Admin Back Office feature
- reCAPTCHA or bot protection — out of scope for this module
- File attachments
- Dark / light mode styling — covered in Feature 08
- Animation / transitions — covered in Feature 08

---

## 2. Requirements Breakdown

### R1 — Contact page route
- Accessible at `/contact`
- Navigation contains a link labelled "Contact"
- Renders inside `<Layout>` — header and footer inherited automatically

### R2 — Form fields
- The form contains exactly three fields, each with a visible `<label>` (not placeholder-only):
  1. **Name** — `<input type="text">`, label: "Name"
  2. **Email** — `<input type="email">`, label: "Email"
  3. **Message** — `<textarea>`, label: "Message"
- All fields have a `name` / `id` attribute matching their label's `htmlFor`
- Placeholders are optional but not a substitute for labels

### R3 — Client-side validation
- All three fields are **required** — the form cannot be submitted with any field empty
- The email field must contain a valid email format (standard email regex or browser `type="email"` + custom check)
- Validation is triggered on submit attempt (not on blur, to avoid jarring UX on first interaction)
- When validation fails:
  - An error message is displayed adjacent to or below the offending field (e.g. "Name is required", "Please enter a valid email")
  - The submit button remains clickable but the form blocks submission and shows errors
  - Focus is moved to the first invalid field
- When the user corrects a field, its error clears immediately (on change)

### R4 — Supabase client
- File: `src/lib/supabaseClient.ts`
- Initialises the Supabase client using `createClient` from `@supabase/supabase-js`
- Reads credentials from environment variables:
  ```ts
  const supabaseUrl  = import.meta.env.VITE_SUPABASE_URL;
  const supabaseKey  = import.meta.env.VITE_SUPABASE_ANON_KEY;
  export const supabase = createClient(supabaseUrl, supabaseKey);
  ```
- This file is imported wherever a Supabase query is needed — never re-initialise the client elsewhere

### R5 — Supabase `messages` table schema
The table must exist in the Supabase project before this feature can be tested end-to-end.

| Column | Type | Constraints |
|---|---|---|
| `id` | `uuid` | Primary key, default `gen_random_uuid()` |
| `name` | `text` | NOT NULL |
| `email` | `text` | NOT NULL |
| `message` | `text` | NOT NULL |
| `created_at` | `timestamptz` | Default `now()` |

Row-Level Security (RLS):
- **INSERT** — allowed for `anon` role (public can submit)
- **SELECT** — allowed for `authenticated` role only (admin reads — enforced in the Admin feature)
- **UPDATE / DELETE** — denied for all roles

### R6 — Form submission
- On submit with valid data, the form:
  1. Sets a loading state — submit button shows "Sending…" and is disabled to prevent double-submission
  2. Calls `supabase.from('messages').insert({ name, email, message })`
  3. Awaits the result
  4. On success → shows success feedback, resets form fields, clears loading state
  5. On error → shows failure feedback, does NOT reset form (user keeps their text), clears loading state

### R7 — Success feedback
- A success message is displayed after a successful INSERT (e.g. "Message sent! I'll get back to you soon.")
- Visually distinct: green colour scheme and a check icon (e.g. `lucide-react` `CheckCircle`)
- The form fields are cleared / reset to empty after success
- The success message **auto-dismisses** after 5 seconds, or clears when the user starts typing again

### R8 — Failure feedback
- A failure message is displayed when the Supabase call returns an error (e.g. "Something went wrong. Please try again.")
- Visually distinct: red colour scheme and an X / alert icon (e.g. `lucide-react` `XCircle`)
- The form fields are **not** reset — the user's input is preserved so they can retry
- The failure message persists until the user retries or dismisses it

---

## 3. Interfaces Involved

### Pages
| Route | Component | Notes |
|---|---|---|
| `/contact` | `src/pages/Contact.tsx` | Renders contact form inside `Layout` |

### Components
| File | Purpose |
|---|---|
| `src/components/ui/ContactForm.tsx` | Form with fields, validation logic, submit handler, and feedback UI |
| `src/components/ui/FormField.tsx` | Reusable labelled input / textarea with error message slot |
| `src/components/ui/FeedbackBanner.tsx` | Success / failure banner (icon + message + optional dismiss) |

### Supabase
| Resource | Details |
|---|---|
| Table | `messages` — columns: `id`, `name`, `email`, `message`, `created_at` |
| Operation | `INSERT` (anon role) |
| Client | `src/lib/supabaseClient.ts` |

### Environment variables
| Variable | Purpose |
|---|---|
| `VITE_SUPABASE_URL` | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous public key |

Both must be present in `.env` locally and in GitHub Actions secrets for the build to work.

---

## 4. Data, Validations & Expected Behaviour

### Form state shape (local React state)
```ts
interface FormState {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';
```

### Validation rules
| Field | Rule | Error message |
|---|---|---|
| `name` | Non-empty after trim | "Name is required" |
| `email` | Non-empty + valid email format | "Email is required" / "Please enter a valid email address" |
| `message` | Non-empty after trim | "Message is required" |

Email format check (acceptable approaches, pick one):
```ts
// Option A — simple regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Option B — rely on browser validation via type="email" + reportValidity()
```

### Submission payload
```ts
const payload = {
  name:    formState.name.trim(),
  email:   formState.email.trim().toLowerCase(),
  message: formState.message.trim(),
};
await supabase.from('messages').insert(payload);
```

### Submit button states
| `SubmitStatus` | Button label | Button disabled? |
|---|---|---|
| `idle` | "Send Message" | No |
| `loading` | "Sending…" | Yes |
| `success` | "Send Message" | No (form reset) |
| `error` | "Try Again" | No |

### Success auto-dismiss
```ts
// After successful insert:
setStatus('success');
setTimeout(() => setStatus('idle'), 5000);
```

### Expected behaviour — edge cases
- **Double submit** — disabled button during `loading` state prevents this
- **Network offline** — Supabase call rejects; failure feedback shown, form not reset
- **Supabase RLS violation** — treated as a generic error; failure feedback shown
- **Very long message** — no client-side character limit enforced (Supabase `text` type is unbounded); if a max length is desired, add it to the `messages` table column constraint and surface the error via failure feedback

---

## 5. User Flow

```
User clicks "Contact" in the navigation
        │
        ▼
/contact loads inside Layout (Header + Footer inherited)
        │
        ▼
Contact form visible: Name | Email | Message fields + "Send Message" button
        │
        ├─── User submits with empty / invalid fields
        │           │
        │           ▼
        │    Validation errors shown inline
        │    Focus moved to first invalid field
        │    Form not submitted
        │
        └─── User fills all fields correctly and clicks "Send Message"
                    │
                    ▼
             Button → "Sending…" (disabled)
                    │
                    ├─── Supabase INSERT succeeds
                    │           │
                    │           ▼
                    │    ✅ Success banner: "Message sent! I'll get back to you soon."
                    │    Form fields cleared
                    │    Button → "Send Message" (enabled)
                    │    Banner auto-dismisses after 5 seconds
                    │
                    └─── Supabase INSERT fails
                                │
                                ▼
                         ❌ Failure banner: "Something went wrong. Please try again."
                         Form fields preserved
                         Button → "Try Again" (enabled)
```

---

## 6. Acceptance Criteria

All criteria must pass before merging `feature/contact-page` → `dev`.

### Routing
- [ ] **AC1** — `/contact` loads the Contact page without a redirect
- [ ] **AC2** — The page renders inside `Layout` — header and footer are present
- [ ] **AC3** — The navigation contains a "Contact" link

### Form fields
- [ ] **AC4** — A text input for name is present with a visible label
- [ ] **AC5** — An email input for email is present with a visible label
- [ ] **AC6** — A textarea for message is present with a visible label
- [ ] **AC7** — All labels are properly associated with their inputs via `htmlFor` / `id`

### Client-side validation
- [ ] **AC8** — Submitting with all fields empty shows three validation errors
- [ ] **AC9** — Submitting with only name filled shows errors for email and message
- [ ] **AC10** — Submitting with an invalid email format (e.g. "notanemail") shows an email format error
- [ ] **AC11** — A validation error on a field clears when the user corrects that field
- [ ] **AC12** — The form does not reach Supabase when validation fails

### Supabase submission
- [ ] **AC13** — `src/lib/supabaseClient.ts` exists and exports a single `supabase` client instance
- [ ] **AC14** — On valid submission, a row is inserted into the `messages` table in Supabase
- [ ] **AC15** — The inserted row contains the correct `name`, `email`, and `message` values
- [ ] **AC16** — The submit button shows "Sending…" and is disabled during the Supabase call

### Success feedback
- [ ] **AC17** — A success message is displayed after a successful INSERT
- [ ] **AC18** — The success message uses a green colour scheme and a check icon
- [ ] **AC19** — The form fields are cleared after a successful submission
- [ ] **AC20** — The success message disappears after 5 seconds (or on next user interaction)

### Failure feedback
- [ ] **AC21** — A failure message is displayed when the Supabase call returns an error
- [ ] **AC22** — The failure message uses a red colour scheme and an X / alert icon
- [ ] **AC23** — The form fields are NOT cleared after a failed submission (user's input preserved)
- [ ] **AC24** — The failure message persists until the user retries or takes action

### Security & environment
- [ ] **AC25** — `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are read from environment variables — never hardcoded in source
- [ ] **AC26** — The Supabase `messages` table has RLS enabled: `anon` can INSERT, `authenticated` can SELECT, no UPDATE/DELETE for any role
- [ ] **AC27** — `.env` is not committed to the repository

### Build & code quality
- [ ] **AC28** — `tsc --noEmit` passes with zero errors
- [ ] **AC29** — `npm run build` succeeds with zero errors
- [ ] **AC30** — No `console.log` or debug code left in the submission handler

### Responsive
- [ ] **AC31** — Form is usable and readable at 375px, 768px, and 1280px viewports
- [ ] **AC32** — No horizontal scrolling appears on a 375px viewport

---

*Last updated: 2026-04-26 | Depends on: ai-spec.md, header-footer.feature.md | Next: admin-login.feature.md*
