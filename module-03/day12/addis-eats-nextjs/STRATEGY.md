## Addis Eats — Rendering Strategies

| Route        | Rendering Strategy        | Reason                                                                                                                              |
| :----------- | :------------------------ | :---------------------------------------------------------------------------------------------------------------------------------- |
| `/`          | Static (SSG)              | The homepage content, including the story and hero section, remains unchanged between builds.                                       |
| `/menu`      | ISR (1 hour)              | Dishes change occasionally, so revalidating every 3,600 seconds keeps the page fast while allowing periodic updates.                |
| `/menu/[id]` | Static (SSG)              | Uses `generateStaticParams()` to pre-render the three known dish pages at build time instead of generating them on each request.    |
| `/cart`      | Client-side               | Cart data is specific to each user and is managed in the browser.                                                                   |
| `/checkout`  | Dynamic (`force-dynamic`) | Reads the session cookie and uses current pricing, so the page must be rendered dynamically rather than served from a shared cache. |
