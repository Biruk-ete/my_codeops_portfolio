# Day 44 - Metadata & SEO

## Implementation Details

1. **Root Layout (`app/layout.js`)**: 
   - Set `metadataBase` to ensure social preview images resolve with absolute URLs.
   - Implemented a title template: `%s - Mesob House`.

2. **Static Routes**: 
   - Each route (Menu, Cart, Login) exports a static `metadata` object with unique titles and descriptions.

3. **Dynamic Routes (`app/menu/[id]/page.js`)**:
   - Implemented `generateMetadata` to dynamically fetch the dish name, price, and description.
   - Added JSON-LD structured data (`schema.org/MenuItem`) so search engines can display rich results (price and dish details).

4. **Discovery Files**:
   - `app/sitemap.js`: Dynamically generates a sitemap from the mock database, including all dish pages.
   - `app/robots.js`: Blocks search engine crawlers from accessing private routes (`/checkout`, `/orders`, `/kitchen`, `/api`).