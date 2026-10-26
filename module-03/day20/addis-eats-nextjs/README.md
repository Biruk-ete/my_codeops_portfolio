# Addis Eats - Next.js Foundations Project (Day 40)

A full-stack food ordering application rebuilt in Next.js, featuring file-based routing, server components, API routes, and server actions.

## 🚀 How to Run

1. `npm install`
2. `npm run build`
3. `npm run start`

## 📂 Architecture

- See [STRATEGY.md](./STRATEGY.md) for rendering strategies.
- See [BOUNDARY.md](./BOUNDARY.md) for Server/Client component boundaries.

## 🔌 API Endpoints

- `GET /api/dishes`: Returns all dishes.
- `GET /api/dishes/[id]`: Returns a single dish. Returns `404` if not found.
- `POST /api/orders`: Creates an order. Validates body against `lib/schema.js`. Returns `422` on validation failure.

## 📊 Build Output

(Paste the output of `npm run build` here)
