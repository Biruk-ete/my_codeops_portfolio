# Addis Eats - Server & Client Boundaries

| Component                  | Side   | Why?                                                                               |
| :------------------------- | :----- | :--------------------------------------------------------------------------------- |
| `app/layout.js`            | Server | Contains no interactive state. It only wraps the app in `<html>` and `<body>`.     |
| `app/providers.jsx`        | Client | Context requires `useState` and event listeners, which must run in the browser.    |
| `app/menu/page.js`         | Server | It fetches the dishes directly from the "database". It has no interactive buttons. |
| `app/menu/FilterShell.jsx` | Client | It uses `useState` to handle the filtering logic when a user clicks a category.    |
| `app/menu/[id]/page.js`    | Server | It awaits the dish data and renders it. No interactivity needed.                   |
| `components/Navbar.jsx`    | Client | Contains the "usePathname" hook to highlight the active link.                      |

## Bundle Size Explanation

Before Day 38, the `page.js` was a client component. That meant the entire menu list and the data-fetching logic were shipped to the browser.
Now, `page.js` is a Server Component. The HTML is fully generated on the server. Only the `FilterShell` (which is a tiny component) is hydrated in the browser. This drastically reduces the "First Load JS" and makes the page load instantly.
