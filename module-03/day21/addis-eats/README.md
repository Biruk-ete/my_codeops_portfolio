# Addis Eats

Next.js food-ordering app built over Days 36–40.

## Endpoints

### GET /api/dishes

Returns the dish list.

- **200** — success

### GET /api/dishes/[id]

Returns one dish.

- **200** — success
- **404** — no such dish: `{ "error": "No such dish" }`

### POST /api/orders

Places an order.

- **201** — created, returns `{ id, name, phone, dishId, quantity, total, currency }`
- **400** — malformed JSON: `{ "error": "Body must be valid JSON" }`
- **422** — validation failed: `{ "error": "Validation failed", "fieldErrors": { ... } }`

## Example curl

\`\`\`bash
curl -i -X POST http://localhost:3000/api/orders \
 -H "Content-Type: application/json" \
 -d '{"name":"Almaz","phone":"0912345678","dishId":"kitfo","quantity":2}'
\`\`\`

## Build output

(paste your `npm run build` table here)
