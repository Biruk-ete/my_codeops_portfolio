# Ethiopian Restaurant Order Management

A TypeScript exercise focused on type safety, union types, exhaustive
switch statements, and currency formatting.

## Project Structure

- `order.ts` - Order types and delivery functions.
- `sample-orders.json` - Four sample restaurant orders.
- `tsconfig.json` - TypeScript compiler configuration.

## Requirements

- Node.js
- TypeScript

## Installation

Install TypeScript:

```bash
npm install -g typescript
```

## Run the TypeScript Compiler

```bash
tsc --watch order.ts
```

## Acceptance Criteria

1. Zero TypeScript compiler errors under strict mode.
2. No use of `any`.
3. All ETB amounts formatted using one Intl.NumberFormat helper.
4. Exhaustive status checking using `never`.
5. Project pushed to GitHub.
