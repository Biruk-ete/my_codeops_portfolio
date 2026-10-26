# Day 41 - Data Fetching Strategy

This document outlines every client-side query in the Addis Eats application, the cache key used, and the reasoning behind its refresh rule.

### 1. Live Order Polling

- **Key:** `/api/orders/${id}`
- **Refresh Rule:** `refreshInterval: 5000` (Every 5 seconds)
- **Why:** The user is actively waiting for their food. Polling every 5 seconds provides a live "Preparing", "On the Way", and "Delivered" status without the user needing to refresh the page. We use `fallbackData` so the initial render from the server is instant with no loading spinner.

### 2. Menu Search (Debounced)

- **Key:** `/api/dishes?q=${debouncedTerm}` OR `null` if empty
- **Refresh Rule:** Default (fetches on key change)
- **Why:** We use the `null` key pattern so the API is not called when the search box is empty. We use a 300ms `useDebounce` to prevent a network request on every single keystroke (race condition prevention). We use `keepPreviousData: true` so the list does not flash empty between search terms.

### 3. Menu Filtering (Client-side)

- **Key:** None (No SWR used)
- **Refresh Rule:** Immediate `useState`
- **Why:** The dish data is already loaded on the Server Component. Filtering by category (Tibs, Stews) happens instantly in the browser without needing a new network request or SWR query.
