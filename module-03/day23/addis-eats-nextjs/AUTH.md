# Day 42 - Authentication & Authorization

## The Three Layers of Protection

1. **Middleware (`middleware.js`)**: Checks if a session cookie exists before the page renders. If missing, redirects to `/login?next=/checkout`. This is a UX feature to save server work, NOT the primary security.
2. **Page Level (`app/orders/page.js`)**: Calls `getSession()` inside the Server Component. If no user, redirects. It also scopes the data query to `user.id` so a user cannot see another person's orders.
3. **Action Level (`app/actions.js`)**: Inside `cancelOrder`, we re-check the session and verify `order.userId === user.id`. This is the ONLY real security layer because middleware can be bypassed.

## Protected Routes

- `/checkout`: Protected by Middleware + Page.
- `/orders`: Protected by Middleware + Page + Scoped Query.
- `/kitchen`: Protected by a Staff Role check in the Server Component.

## Cookie Security

The session cookie is set with `httpOnly: true` (prevents XSS), `secure: true` (HTTPS only), and `sameSite: 'lax'` (prevents CSRF).
