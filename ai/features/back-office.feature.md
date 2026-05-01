# Feature Spec — Admin Back Office

> **Prerequisite:** Read [ai-spec.md](../ai-spec.md) before implementing anything in this feature.
> This feature depends on:
> - Supabase client: [contact-page.feature.md](contact-page.feature.md)
> - Auth session + `ProtectedRoute`: [login-page.feature.md](login-page.feature.md)

---

## 1. Feature Goal & Scope

### Goal
Build the Admin Back Office — a protected page at `/backoffice` that is only accessible to authenticated admins. It fetches all contact form submissions from the Supabase `messages` table, displays them in a sortable table (newest first), and allows the admin to view a full message in a modal and delete individual messages. A logout button ends the session and redirects away from the protected area.

### In scope
- Back Office page component (`src/pages/BackOffice.tsx`) at `/backoffice`
- `<ProtectedRoute>` guard — unauthenticated users are redirected to `/login`
- Fetch all rows from the `messages` table (authenticated SELECT)
- Table display: Name, Email, Date, Actions columns; newest first
- Empty state: "No messages yet" when the table is empty
- Error state: message displayed when the fetch fails
- Delete row: Supabase `DELETE` by `id`; row removed from UI instantly (optimistic update)
- View message modal: full name, email, date/time, message body; closeable via button, outside click, or Escape key
- Logout button: calls `supabase.auth.signOut()`, redirects to `/` (Home)
- Route absent from all public navigation

### Out of scope
- Pagination — all messages fetched in one query (acceptable for a personal portfolio volume)
- Search or filter on messages
- Replying to messages from the back office
- Editing messages
- Admin user management (adding / removing admin accounts)
- Dark / light mode — covered in Feature 08

---

## 2. Requirements Breakdown

### R1 — Protected route
- Route: `/backoffice`
- Wrapped in `<ProtectedRoute>` (built in the Login feature)
- On load: `ProtectedRoute` calls `supabase.auth.getSession()`
  - If no valid session → redirect to `/login` immediately
  - If valid session → render `<BackOffice />`
- The route is **not** linked from the Header, Footer, or mobile BottomNav
- Not reachable from any public page link — direct URL or programmatic redirect only

### R2 — Messages fetch
- On component mount, fetch all rows from `messages`:
  ```ts
  const { data, error } = await supabase
    .from('messages')
    .select('id, name, email, message, created_at')
    .order('created_at', { ascending: false });
  ```
- Three possible states after fetch:

| State | Condition | UI |
|---|---|---|
| Loading | Fetch in flight | Spinner or "Loading messages…" text |
| Empty | `data` is an empty array | "No messages yet." friendly message |
| Error | `error` is not null | "Failed to load messages. Please try again." (red/distinct) |
| Populated | `data.length > 0` | Render messages table |

### R3 — Messages table
- Rendered as an HTML `<table>` (or accessible equivalent)
- Four columns:

| Column | Source field | Notes |
|---|---|---|
| **Name** | `name` | Plain text |
| **Email** | `email` | Plain text (or `mailto:` link) |
| **Date** | `created_at` | Formatted as human-readable date (e.g. "Apr 26, 2026, 3:42 PM") |
| **Actions** | — | "View" button + "Delete" button (or icon) per row |

- Rows ordered by `created_at` descending — newest first
- Table is responsive: on narrow viewports it scrolls horizontally within its container, or columns collapse gracefully (no broken layout)

### R4 — View message modal
- Triggered by clicking the "View" button (or the row itself) for a given message
- Modal overlays the page with a semi-transparent backdrop
- Modal content:
  - Sender's **name** and **email**
  - **Date and time** of submission (formatted, same as table)
  - Full **message** body (preserves line breaks — `white-space: pre-wrap`)
- Close mechanisms (all three required):
  1. A close button (× icon or "Close" label) inside the modal
  2. Clicking the backdrop outside the modal
  3. Pressing the `Escape` key
- When open, background page scroll is locked (`overflow: hidden` on `body`)
- Focus is trapped inside the modal while open (accessibility)
- On close, focus returns to the "View" button that triggered the modal

### R5 — Delete message
- Each table row has a delete button (trash icon from `lucide-react` or "Delete" text)
- On click: show a brief inline confirmation or rely on the delete being reversible via the Supabase dashboard — decision: **no confirmation dialog** (keeps the UI simple; messages can be recovered from Supabase directly if needed)
- Delete call:
  ```ts
  const { error } = await supabase
    .from('messages')
    .delete()
    .eq('id', message.id);
  ```
- On success: remove the row from local state immediately (optimistic — no re-fetch)
- On error: display a brief error toast or inline message; the row remains in the table

### R6 — Logout
- A "Logout" button is visible on the Back Office page (top-right or prominent placement)
- On click:
  ```ts
  await supabase.auth.signOut();
  navigate('/', { replace: true });
  ```
- Session is fully cleared from `localStorage`
- User is redirected to Home (`/`) — not to `/login` (reduces confusion for casual URL-guessers)
- After logout, navigating back to `/backoffice` redirects to `/login` (ProtectedRoute re-validates)

---

## 3. Interfaces Involved

### Pages
| Route | Component | Guard | Notes |
|---|---|---|---|
| `/backoffice` | `src/pages/BackOffice.tsx` | `<ProtectedRoute>` | Admin only |

### Components
| File | Purpose |
|---|---|
| `src/components/ProtectedRoute.tsx` | Auth guard — built in Login feature, consumed here |
| `src/components/ui/MessageModal.tsx` | Modal overlay — full message detail + close controls |
| `src/components/ui/MessageTable.tsx` | Table of messages with View + Delete per row |

### Supabase
| Operation | Query | Role required |
|---|---|---|
| Fetch messages | `SELECT` from `messages` ordered by `created_at DESC` | `authenticated` |
| Delete message | `DELETE` from `messages` where `id = ?` | `authenticated` |

RLS policies (set in Supabase dashboard):
- `authenticated` role: SELECT + DELETE on `messages`
- `anon` role: INSERT only (set in Contact Page feature)
- No UPDATE for any role

### Routing
| Hook | Usage |
|---|---|
| `useNavigate()` | Redirect to `/` after logout |

---

## 4. Data, Validations & Expected Behaviour

### `Message` type
```ts
export interface Message {
  id: string;          // uuid
  name: string;
  email: string;
  message: string;
  created_at: string;  // ISO 8601 timestamp
}
```

### Component state shape
```ts
// BackOffice.tsx local state
interface BackOfficeState {
  messages: Message[];
  fetchStatus: 'loading' | 'error' | 'success';
  selectedMessage: Message | null;   // null = modal closed
  deletingIds: Set<string>;          // tracks in-flight deletes
}
```

### Date formatting
```ts
const formatDate = (iso: string): string =>
  new Date(iso).toLocaleString('en-CA', {
    year: 'numeric', month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
// e.g. "Apr 26, 2026, 03:42 PM"
```

### Delete — optimistic update
```ts
// Remove from local state immediately on button click
setMessages(prev => prev.filter(m => m.id !== id));
// Call Supabase in background
const { error } = await supabase.from('messages').delete().eq('id', id);
// On error: re-add the message to state + show error
if (error) setMessages(prev => [...prev, deletedMessage]);
```

### Modal — keyboard trap
- On open: focus the close button or modal container
- `keydown` listener on `document` for `Escape` → close modal
- Tab cycling stays within modal elements while open

### Expected behaviour — edge cases
| Scenario | Expected result |
|---|---|
| Session expires while on `/backoffice` | Next Supabase call returns auth error → redirect to `/login` |
| Delete of the last message | Table transitions to empty state: "No messages yet." |
| Modal open → message deleted by another tab | Modal stays open with the last fetched data; stale state acceptable |
| Very long message body | Modal scrolls internally; page does not scroll |
| Network offline during delete | Row re-appears in table; error message shown |

---

## 5. User Flow

### Unauthenticated access attempt
```
User navigates to /backoffice
        │
        ▼
ProtectedRoute checks session → none found
        │
        ▼
Redirect to /login
```

### Authenticated admin session
```
Admin navigates to /backoffice (authenticated)
        │
        ▼
ProtectedRoute checks session → valid → render BackOffice
        │
        ▼
Messages fetch in flight → "Loading messages…"
        │
        ├─── Fetch fails → "Failed to load messages. Please try again."
        │
        ├─── Fetch returns empty → "No messages yet."
        │
        └─── Fetch returns rows → Messages table rendered (newest first)
                    │
                    ├─── Admin clicks "View"
                    │           │
                    │           ▼
                    │    Modal opens: name, email, date/time, full message
                    │    Close via ×, backdrop click, or Escape
                    │
                    ├─── Admin clicks "Delete" (trash icon)
                    │           │
                    │           ▼
                    │    Row removed from table instantly
                    │    Supabase DELETE called in background
                    │    On error: row re-appears + error shown
                    │
                    └─── Admin clicks "Logout"
                                │
                                ▼
                         supabase.auth.signOut()
                         Session cleared from localStorage
                         navigate('/', { replace: true })
```

---

## 6. Acceptance Criteria

All criteria must pass before merging `feature/back-office` → `dev`.

### Protected route
- [ ] **AC1** — Navigating to `/backoffice` without a session redirects to `/login`
- [ ] **AC2** — Navigating to `/backoffice` with a valid session renders the Back Office page
- [ ] **AC3** — `/backoffice` is not linked from the Header, Footer, or mobile BottomNav

### Messages fetch
- [ ] **AC4** — On mount, all rows from the `messages` table are fetched for the authenticated user
- [ ] **AC5** — A loading indicator is shown while the fetch is in flight
- [ ] **AC6** — When the table is empty, "No messages yet." (or equivalent) is displayed
- [ ] **AC7** — When the fetch fails, a distinct error message is displayed

### Messages table
- [ ] **AC8** — The table renders Name, Email, Date, and Actions columns
- [ ] **AC9** — Each row corresponds to one message from the database
- [ ] **AC10** — Messages are ordered newest first (by `created_at` descending)
- [ ] **AC11** — Each row has a "View" button and a "Delete" button

### View modal
- [ ] **AC12** — Clicking "View" opens a modal with the sender's name, email, date/time, and full message
- [ ] **AC13** — The modal close button (×) dismisses the modal
- [ ] **AC14** — Clicking the backdrop outside the modal dismisses it
- [ ] **AC15** — Pressing `Escape` dismisses the modal
- [ ] **AC16** — Background page scroll is locked while the modal is open
- [ ] **AC17** — Long message bodies scroll inside the modal; the page does not scroll

### Delete
- [ ] **AC18** — Clicking "Delete" removes the row from the table immediately
- [ ] **AC19** — A Supabase DELETE is called with the correct message `id`
- [ ] **AC20** — On a failed delete, the row reappears and an error is shown
- [ ] **AC21** — After deleting the last message, the empty state is displayed

### Logout
- [ ] **AC22** — A "Logout" button is visible on the Back Office page
- [ ] **AC23** — Clicking "Logout" calls `supabase.auth.signOut()`
- [ ] **AC24** — After logout, the user is redirected to `/` (Home)
- [ ] **AC25** — After logout, navigating to `/backoffice` redirects to `/login`

### RLS (verified in Supabase dashboard)
- [ ] **AC26** — `authenticated` role can SELECT from `messages`
- [ ] **AC27** — `authenticated` role can DELETE from `messages`
- [ ] **AC28** — `anon` role cannot SELECT or DELETE from `messages`

### Build & code quality
- [ ] **AC29** — `tsc --noEmit` passes with zero errors
- [ ] **AC30** — `npm run build` succeeds with zero errors
- [ ] **AC31** — No `console.log` or debug code left in fetch / delete / auth handlers

### Responsive
- [ ] **AC32** — Back Office table is usable at 768px and 1280px viewports
- [ ] **AC33** — Table scrolls horizontally on narrow viewports without breaking the layout
- [ ] **AC34** — Modal is readable and closeable at 375px viewport width

---

*Last updated: 2026-04-26 | Depends on: ai-spec.md, contact-page.feature.md, login-page.feature.md | This is the final protected feature.*
