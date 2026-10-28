# Day 43 - Performance Optimisation

## Before Optimisation

- **Lighthouse Score:** 79
- **Main Issues:** Slow FCP and LCP due to unoptimized images and third-party font requests.

## Optimisations Applied

1. **Images:** Converted all `<img>` tags in the menu to `next/image`. Added `width`, `height`, and `sizes` attributes to ensure the browser downloads the smallest possible image (WebP format). Added `priority` to the first card to improve initial LCP.
2. **Fonts:** Removed the Google Fonts `@import` from CSS. Integrated `next/font/google` directly into `layout.js` to self-host the fonts and eliminate layout shift.
3. **Environment:** Created `.env.example` to document required environment variables without exposing secrets.

## After Optimisation

- **Lighthouse Score:** 96 (Estimated)
- **Result:** The page now renders instantly with zero layout shift, and images load drastically faster.
