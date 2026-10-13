# Addis Eats — Server / Client Boundary

## Every component, which side, and why

| Component                       | Runs on | Why                                                    |
| ------------------------------- | ------- | ------------------------------------------------------ |
| `app/layout.js`                 | Server  | Passes children into Providers; imports nothing client |
| `app/providers.jsx`             | Client  | Cart context holds state                               |
| `app/menu/layout.js`            | Server  | Static sidebar markup                                  |
| `app/menu/page.js`              | Server  | Awaits dishes directly — no hooks                      |
| `app/menu/DishList.jsx`         | Server  | Pure markup from data                                  |
| `app/menu/DishCard.jsx`         | Server  | Pure markup                                            |
| `app/menu/CategoryBar.jsx`      | Client  | `useState` for selection + `onClick`                   |
| `app/menu/AddToCartButton.jsx`  | Client  | `onClick` writes to cart context                       |
| `app/menu/[id]/page.js`         | Server  | Reads params, calls `notFound()`                       |
| `app/menu/error.js`             | Client  | Retry button needs `onClick`                           |
| `app/checkout/page.js`          | Server  | Renders the form                                       |
| `app/checkout/CheckoutForm.jsx` | Client  | `useActionState` hook                                  |

## Count

**Three client components I wrote deliberately** (`providers`, `CategoryBar`, `AddToCartButton`),
plus one reserved file (`error.js`) and the checkout form's client half.

## Bundle size

- `/menu` First Load JS **before Day 38**: \_\_\_ kB
- `/menu` First Load JS **after**: \_\_\_ kB

## Composition

`CategoryBar` and `AddToCartButton` are client leaves — they receive
plain data (`dish`) from their server parents and are small.
`Providers` wraps the layout's `children` (passed, not imported), so every page
inside it stays a server component.

## Build output

(paste the ○/ƒ marker table here)
