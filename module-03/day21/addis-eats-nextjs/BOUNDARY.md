# Day 40 Project - Server/Client Boundaries

This document outlines the Server and Client boundaries in the Addis Eats Next.js application. The goal was to keep the boundary as low in the component tree as possible to minimize the JavaScript bundle sent to the browser.

| Component                  | Side   | Why?                                                                                                      |
| :------------------------- | :----- | :-------------------------------------------------------------------------------------------------------- |
| `app/layout.js`            | Server | The root shell. It only wraps the app in `<html>` and `<body>` and imports global CSS.                    |
| `app/providers.jsx`        | Client | React Context (Cart, Auth) requires `useState` and event listeners.                                       |
| `app/menu/page.js`         | Server | Fetches dish data directly on the server. No interactivity needed at this level.                          |
| `app/menu/FilterShell.jsx` | Client | The only client component in the menu. It uses `useState` to filter dishes when a user clicks a category. |
| `app/menu/[id]/page.js`    | Server | Awaits the dynamic dish data. Pure markup, no interactivity.                                              |
| `components/Navbar.jsx`    | Client | Uses `usePathname` to highlight the active navigation link.                                               |
| `app/checkout/page.js`     | Client | Uses `useActionState` to handle the form pending state and display server-returned validation errors.     |
| `app/actions.js`           | Server | Marked with `"use server"`. Contains secure database mutations and checks sessions.                       |

## Bundle Size Note

Before implementing Server Components, the entire Menu page (and its data fetching logic) was shipped to the browser. By moving the data fetching to `app/menu/page.js` (Server) and isolating the filter to `FilterShell.jsx` (Client), the First Load JS for the menu route was significantly reduced.
