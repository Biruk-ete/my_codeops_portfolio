# Addis Eats — Rendering Strategy

| Route        | Strategy                            | Why                                            |
| ------------ | ----------------------------------- | ---------------------------------------------- |
| `/`          | Static                              | Home content never changes between builds      |
| `/menu`      | ISR (revalidate = 3600)             | Dishes change occasionally; speed matters most |
| `/menu/[id]` | Static (via `generateStaticParams`) | Every dish known at build time                 |
| `/cart`      | Client                              | Personal state, not cacheable                  |
| `/checkout`  | Dynamic (`force-dynamic`)           | Reads session cookie and live pricing          |
| `/not-found` | Static                              | Fixed 404 screen                               |

## Notes

- The `/checkout` route reads `cookies()` — this alone forces it dynamic. I made it explicit with `force-dynamic` so the intent is visible in code review.
- The `/menu` route uses ISR because a one-hour stale menu is acceptable. A price during a promotion would not be.
- The menu route's dish list is wrapped in `<Suspense>` so the sidebar (from `app/menu/layout.js`) streams immediately.

## Build output (paste your `npm run build` table here)
