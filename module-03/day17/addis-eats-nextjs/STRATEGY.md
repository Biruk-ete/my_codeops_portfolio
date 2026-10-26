# Day 40 Project - Rendering Strategies

This document explains the rendering strategy chosen for every route in the Addis Eats application, based on how fresh the data needs to be and who is requesting it.

| Route         | Strategy                            | Why?                                                                                                                                         |
| :------------ | :---------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------- |
| `/` (Home)    | Static                              | The landing page content does not change between builds. It is served instantly from the CDN.                                                |
| `/menu`       | ISR (1 Hour)                        | Dishes change occasionally, but speed matters most. Revalidating every 3600 seconds allows it to be static while updating in the background. |
| `/menu/[id]`  | Static (via `generateStaticParams`) | Every dish ID is known at build time. We pre-render the HTML for every known dish so users get an instant load.                              |
| `/cart`       | Client                              | The cart contents are private to the user and stored in local state/localStorage. It does not need a server render.                          |
| `/checkout`   | Dynamic (`force-dynamic`)           | Contains a Server Action and reads user session data. It cannot be cached.                                                                   |
| `/api/dishes` | Route Handler                       | Returns a JSON list of dishes to be consumed by the frontend or external clients.                                                            |
| `/api/orders` | Route Handler                       | Accepts POST requests. Validates the body and returns 422 on failure.                                                                        |

## Verification

The build output (`npm run build`) confirms these strategies:

- `○` indicates Static
- `●` indicates Static Site Generation (SSG)
- `ƒ` indicates Dynamic
