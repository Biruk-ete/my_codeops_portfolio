# Addis Eats — Authentication & Security

## Protected Routes

- `/checkout`
- `/orders/[id]`
- `/kitchen` (Staff only)

## Three Layers

| Route          | Middleware             | Page check              | Action check                      |
| -------------- | ---------------------- | ----------------------- | --------------------------------- |
| `/orders/[id]` | Redirects if no cookie | Redirects if no session | Checks `order.userId === user.id` |
| `/checkout`    | Redirects if no cookie | Redirects if no session | Checks session                    |

## Security Choices

- **Cookies:** `httpOnly` (blocks XSS), `secure` (HTTPS only), `sameSite: "lax"` (blocks CSRF).
- **Open Redirects:** The `/signin` page rejects any `next` parameter that doesn't start with a `/`.
- **Authorization:** Every action scopes the database query to the session's `user.id`. The client cannot pass a fake ID to read another user's data.
