# Addis Eats — Performance Report

## Before

- **LCP:** 6.1s (Massive unoptimized hero image)
- **CLS:** 0.25 (Images without dimensions and a font that jumped)
- **INP:** 150ms

## Changes Made

1. **Images:** Converted all `<img>` tags to `<Image>`. Added `width`, `height`, and `sizes`.
2. **LCP:** Added `priority` to the main hero image so it preloads.
3. **Fonts:** Replaced the Google Fonts `<link>` with `next/font` to eliminate layout shift.
4. **Scripts:** Moved an analytics script to `next/script` with `strategy="lazyOnload"`.

## After

- **LCP:** 1.8s (The hero image is now preloaded and sized correctly)
- **CLS:** 0.02 (Dimensions reserved space, font swap is metric-matched)
- **INP:** 120ms

## Conclusion

The biggest win was the images (saving ~3MB of downloads). The CLS improvement came entirely from using `next/font`.
