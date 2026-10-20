# Addis Eats — Client Data Fetching

## 1. Order Status (`/orders/[id]`)

- **Key:** `/api/orders/${id}`
- **Rule:** `refreshInterval: 5000` (Poll every 5 seconds)
- **Fallback:** `fallbackData` passed from the server component.
- **Why:** The status changes on the server (e.g., from "Cooking" to "Delivering"). The user needs to see this update without refreshing the page. The server pre-renders the first paint, so there is no spinner on arrival.

## 2. Menu Search (`/menu`)

- **Key:** `/api/dishes?q=${debouncedTerm}` or `null`
- **Rule:** `keepPreviousData: true`
- **Why:** Users type fast. Debouncing (300ms) prevents a request per keystroke. The null key prevents a request for an empty search. `keepPreviousData` prevents the list from flashing empty while the next result loads.

## 3. Paged List

- **Key:** `/api/dishes?page=${page}`
- **Rule:** `keepPreviousData: true`
- **Why:** The page number is part of the key, so changing pages triggers a fetch. Holding the previous data makes the transition smooth.
