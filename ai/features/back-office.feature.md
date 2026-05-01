# Back Office Feature Specification

## 1. Feature Goal & Scope

### Goal
Create a secure, authenticated admin back office where authorized users can view, manage, and delete all messages submitted through the Contact Page form.

### In Scope
- Protected admin dashboard accessible only to authenticated users
- Display all messages in a searchable, sortable table
- View full message details in a modal dialog
- Delete messages with confirmation
- Session management and logout functionality
- Error handling and empty states

### Out of Scope
- User role-based permissions (single admin account)
- Message search/filtering (future feature)
- Bulk operations (edit, archive, export)
- Email notifications on new messages

---

## 2. Requirements Breakdown

### R1: Authentication Gate
**Requirement**: Back Office route must be protected by Supabase authentication.
- Route: `/#/backoffice`
- Redirect unauthenticated users to `/#/login`
- Verify session on page load
- Redirect already-logged-in users from login page to back office

**Acceptance Criteria**:
- [ ] Navigating to `/backoffice` while NOT authenticated redirects to `/login`
- [ ] Navigating to `/backoffice` while authenticated renders the page
- [ ] Session check completes before rendering any content
- [ ] Page does not flicker or show protected content briefly

---

### R2: Messages Table Display
**Requirement**: Display all contact messages in a paginated, ordered table.
- Fetch all messages from `messages` table
- Order by `created_at` DESC (newest first)
- Display columns: **Name**, **Email**, **Date**, **Actions**
- Show message count and loading state

**Acceptance Criteria**:
- [ ] Messages load on page mount
- [ ] Table displays all submitted messages
- [ ] Messages are ordered newest-first
- [ ] Each row displays: sender name, email, submission date
- [ ] Date format is readable (e.g., "Apr 29, 2026 at 5:32 PM")
- [ ] Loading spinner shows while fetching
- [ ] Error message displays if fetch fails
- [ ] "No messages yet" message displays if table is empty
- [ ] Table is responsive on mobile devices

---

### R3: View Message Modal
**Requirement**: Allow users to read full message text and sender details.
- Trigger: Click on a message row OR a "View" button in the Actions column
- Modal displays:
  - Sender name and email
  - Date and time sent
  - Full message body text
  - Close button (X icon)

**Acceptance Criteria**:
- [ ] Clicking a message row opens the modal
- [ ] Modal displays correct message content
- [ ] Close button (X) visible and functional
- [ ] Clicking outside modal closes it
- [ ] Pressing Escape key closes it
- [ ] Modal is centered and scrollable if content is long
- [ ] Modal overlays the page with a semi-transparent backdrop

---

### R4: Message Deletion
**Requirement**: Admin can delete messages from the table.
- Delete button (trash icon) in Actions column for each message
- Show confirmation before deletion
- Remove message from table instantly after confirmation
- Update message count

**Acceptance Criteria**:
- [ ] Delete button visible in Actions column
- [ ] Clicking delete shows a confirmation dialog
- [ ] Confirmation dialog has "Cancel" and "Delete" buttons
- [ ] Clicking "Cancel" closes dialog without deleting
- [ ] Clicking "Delete" removes message from database
- [ ] Message disappears from table immediately
- [ ] Error message displays if delete fails
- [ ] Message count updates after deletion

---

### R5: Logout Functionality
**Requirement**: Allow admin to end session and return to public site.
- Logout button visible on page
- Call `supabase.auth.signOut()`
- Clear all session data
- Redirect to Home page

**Acceptance Criteria**:
- [ ] Logout button is visible and accessible
- [ ] Clicking logout calls signOut() method
- [ ] Session is cleared (no residual auth data)
- [ ] User redirected to Home page after logout
- [ ] Back button cannot return to protected page
- [ ] Navigating to `/backoffice` after logout redirects to `/login`

---

### R6: Navigation & UI
**Requirement**: Back Office page follows portfolio design and provides clear navigation.
- Page header with title
- Consistent header component (does NOT show in login page, DOES show here)
- Logout button in header or page footer
- Back to home link (optional)
- Dark theme consistency with portfolio

**Acceptance Criteria**:
- [ ] Header component renders
- [ ] Logout button is accessible and labeled clearly
- [ ] Page uses consistent color scheme (navy, teal, yellow)
- [ ] All interactive elements have hover states
- [ ] Page is accessible (ARIA labels, semantic HTML)

---

### R7: Error Handling
**Requirement**: Gracefully handle network errors and edge cases.
- Handle failed message fetch
- Handle failed delete operation
- Handle auth session expiration
- Handle network timeouts

**Acceptance Criteria**:
- [ ] Fetch error shows user-friendly message with retry option
- [ ] Delete error shows message and button to retry
- [ ] Session expiration redirects to login with notification
- [ ] Network timeout doesn't crash the page
- [ ] All error messages are clear and actionable

---

## 3. Interfaces Involved

### Pages
- **Back Office Page** (`src/pages/Admin.tsx` or `src/pages/BackOffice.tsx`)
  - Responsible for session checking, layout, logout
  - Fetches messages on mount
  - Coordinates message display, modal, and delete operations

### Components
- **Messages Table** (`src/components/ui/MessagesTable.tsx`)
  - Displays table rows with name, email, date, actions
  - Emits events for row clicks and delete button clicks
  
- **View Message Modal** (`src/components/ui/ViewMessageModal.tsx`)
  - Displays full message details
  - Has close button and backdrop click handling
  - Handles Escape key press

- **Delete Confirmation Dialog** (`src/components/ui/DeleteConfirmDialog.tsx`)
  - Shows confirmation before deletion
  - Has Cancel and Delete buttons

### Services
- **Supabase Client** (`src/lib/supabaseClient.ts`)
  - `fetchMessages()` - GET all messages ordered DESC by created_at
  - `deleteMessage(id: uuid)` - DELETE a message by ID
  - `auth.signOut()` - Clear session

---

## 4. Data Schemas & Validations

### Messages Table
```sql
CREATE TABLE messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);
```

### Message Object
```typescript
interface Message {
  id: string
  name: string
  email: string
  message: string
  created_at: string
}
```

### Validation Rules
- **name**: Required, 2-100 characters, non-empty after trim
- **email**: Required, valid email format
- **message**: Required, 10-5000 characters, non-empty after trim
- **created_at**: ISO 8601 timestamp, auto-generated

---

## 5. User Flow

### Happy Path: Viewing Messages
1. User logs in with credentials
2. User navigates to `/backoffice`
3. Page verifies session → renders Back Office
4. Messages table loads and displays all submissions
5. User clicks on a message row
6. Modal opens showing full message details
7. User reads message and clicks "Close"
8. Modal closes, table remains visible

### Delete Flow
1. User sees messages in table
2. User clicks trash icon in Actions column
3. Confirmation dialog appears
4. User clicks "Delete" to confirm
5. Message is deleted from database
6. Message disappears from table instantly
7. Message count updates

### Logout Flow
1. User is on Back Office page
2. User clicks "Logout" button
3. Session is cleared
4. User redirected to Home page
5. If user navigates to `/backoffice`, they're redirected to `/login`

### Error Scenarios
1. **Session Expired**: User on Back Office → session expires → redirect to login
2. **Fetch Fails**: Messages fail to load → show error message with retry button
3. **Delete Fails**: Delete operation fails → show error with retry option
4. **Network Timeout**: Request hangs → show timeout message → user can retry

---

## 6. Acceptance Criteria Checklist

### Back Office Route Protection
- [ ] `/backoffice` requires authentication
- [ ] Unauthenticated requests redirect to `/login`
- [ ] Session is verified before rendering
- [ ] Page is NOT listed in public navigation

### Messages Display
- [ ] All messages from database appear in table
- [ ] Messages ordered newest-first (DESC by created_at)
- [ ] Table columns: Name, Email, Date, Actions
- [ ] Date displayed in readable format
- [ ] Loading spinner shows during fetch
- [ ] Error message if fetch fails
- [ ] "No messages" message if table empty
- [ ] Message count displayed (e.g., "4 messages")

### View Message Modal
- [ ] Modal opens when clicking message row
- [ ] Modal displays: name, email, date, full message text
- [ ] Close button visible and functional
- [ ] Clicking outside modal closes it
- [ ] Pressing Escape closes it
- [ ] Modal is accessible (focus management, ARIA roles)

### Delete Functionality
- [ ] Delete button in Actions column
- [ ] Confirmation dialog before delete
- [ ] Message deleted from database on confirm
- [ ] Message disappears from table instantly
- [ ] Message count updates
- [ ] Error message if delete fails
- [ ] Retry option on error

### Logout
- [ ] Logout button visible
- [ ] Clicking logout calls `signOut()`
- [ ] User redirected to Home page
- [ ] Session fully cleared
- [ ] Cannot return to `/backoffice` without re-login

### UI/UX
- [ ] Header component renders
- [ ] Consistent portfolio design
- [ ] Responsive on mobile
- [ ] All interactive elements have hover states
- [ ] Page is accessible (semantic HTML, ARIA labels)
- [ ] Loading and error states are clear

### Performance
- [ ] Messages load within 2 seconds
- [ ] Delete operation completes within 1 second
- [ ] Modal open/close is smooth
- [ ] No unnecessary re-renders

---

## 7. Implementation Notes

### Technology Stack
- **Frontend**: React + TypeScript
- **Database**: Supabase PostgreSQL
- **Auth**: Supabase Auth (JWT session)
- **UI**: Custom CSS with portfolio design system
- **State Management**: React hooks (useState, useEffect)

### RLS (Row-Level Security) Policies
```sql
-- Allow authenticated users to SELECT all messages
CREATE POLICY "Authenticated view messages" ON messages
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- Allow only authenticated users to DELETE their own messages (future)
CREATE POLICY "Authenticated delete messages" ON messages
  FOR DELETE
  USING (auth.role() = 'authenticated');
```

### Key Design Decisions
1. **Single Admin Account**: No user roles/permissions needed initially
2. **Soft Delete vs Hard Delete**: Implement hard delete for simplicity
3. **Message Limit**: No pagination initially; load all messages (can optimize later)
4. **Modal Library**: Use custom React modal (no external library)
5. **Error Handling**: User-friendly messages + retry capability

---

## 8. Testing Strategy

### Manual Testing
1. [ ] Test login → back office flow
2. [ ] Test unauthenticated access redirect
3. [ ] Test message fetching and display
4. [ ] Test view message modal
5. [ ] Test delete with confirmation
6. [ ] Test logout functionality
7. [ ] Test session expiration
8. [ ] Test mobile responsiveness
9. [ ] Test keyboard navigation (Tab, Escape)
10. [ ] Test error scenarios (network down, API errors)

### Acceptance Test Scenarios
```gherkin
Scenario: Admin views all contact messages
  Given I am logged in as admin
  When I navigate to /backoffice
  Then I see a table with all messages
  And messages are ordered newest-first
  And each row shows Name, Email, Date

Scenario: Admin views full message
  Given I am on Back Office page
  When I click on a message row
  Then a modal opens showing full message details
  And I can close it with the X button or Escape key

Scenario: Admin deletes a message
  Given I am on Back Office page
  When I click the delete button for a message
  Then a confirmation dialog appears
  And after confirming, the message is deleted
  And the table updates immediately

Scenario: Admin logs out
  Given I am on Back Office page
  When I click Logout
  Then I am redirected to Home page
  And the session is cleared
  And navigating to /backoffice redirects to /login
```

---

## 9. Success Criteria

The Back Office feature is complete when:
1. ✅ Authenticated users can access `/backoffice` securely
2. ✅ All messages display in a well-formatted table
3. ✅ Users can view full message details in a modal
4. ✅ Users can delete messages with confirmation
5. ✅ Users can logout and session is cleared
6. ✅ Error states are handled gracefully
7. ✅ Page is responsive and accessible
8. ✅ All acceptance criteria are met
9. ✅ Code follows portfolio conventions and style
10. ✅ Feature is documented and tested manually
