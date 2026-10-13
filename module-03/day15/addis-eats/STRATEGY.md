# Addis Eats — Rendering Strategy

| Route              | Strategy                          | Why                                                         |
| ------------------ | --------------------------------- | ----------------------------------------------------------- |
| `/`                | Static                            | Specials and address don't change between builds            |
| `/menu`            | ISR (`revalidate = 3600`)         | Dishes change occasionally; one hour stale is acceptable    |
| `/menu/[id]`       | Static via `generateStaticParams` | Every dish id is known at build time                        |
| `/cart`            | Client                            | Person's own state, never leaves the browser until checkout |
| `/checkout`        | Dynamic (`force-dynamic`)         | Reads session cookie, live pricing                          |
| `/api/dishes`      | Static (cached)                   | Data doesn't depend on the request                          |
| `/api/dishes/[id]` | Dynamic                           | Reads the path param                                        |
| `/api/orders`      | POST — never cached               | Writes data                                                 |

## One route that changed

Initially I marked `/menu` as Static. Once I wrote the justification down
("dishes change occasionally"), ISR was the honest answer — I want the speed
of static, but I'm willing to be one hour stale. `revalidate = 3600` matches
that reasoning.

## Build output

(paste your `npm run build` table here)
