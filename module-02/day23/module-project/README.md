# Addis Eats — Ethiopian Food Ordering Module

**Addis Eats** is a lightweight front-end food ordering web application focused on Ethiopian cuisine. Users can browse dishes, search the menu, add items to a shopping cart, and place orders through a checkout modal.

The project is built with **HTML5, CSS3, and vanilla JavaScript**, making it a practical project for learning front-end development and demonstrating DOM manipulation, state management, responsive design, and browser storage.

---

## Features

- **Dynamic Menu** — Dishes are rendered dynamically from `menu.json`.
- **Search** — Filter dishes by name or category.
- **Shopping Cart** — Add, remove, and update item quantities.
- **Persistent Cart** — Cart data is stored in `localStorage`.
- **Responsive Design** — Optimized for mobile, tablet, and desktop screens.
- **Checkout Modal** — Collects customer information and order details.
- **Order History** — Completed orders are stored locally in the browser.
- **Fallback Menu Data** — Uses embedded menu data if `menu.json` cannot be loaded.
- **Font Awesome Icons** — Uses icons to improve the user interface.

---

## Getting Started

### Prerequisites

You only need:

- A modern web browser such as Chrome, Firefox, or Edge.
- A code editor such as VS Code if you want to modify the project.
- A local development server for loading `menu.json` reliably.

### Running the Project Locally

1. Clone or download the repository.
2. Open the project folder in VS Code.
3. Start a local development server, such as **VS Code Live Server**.
4. Open the local URL provided by the development server in your browser.

A local server is recommended because the application uses `fetch()` to load `menu.json`.

### Project Structure

/project-root/
│
├── index.html # Main HTML structure
├── styles.css # Application styling and responsive rules
├── menu.js # Application logic and event handling
├── menu.json # External menu data
└── README.md # Project documentation

---

## Technologies Used

### HTML5

- Semantic HTML
- Forms
- Accessible page structure

### CSS3

- Flexbox
- CSS Grid
- Media queries
- Responsive design
- Transitions and animations

### JavaScript (ES6+)

- DOM manipulation
- Event handling
- Event delegation
- `fetch()`
- Asynchronous data loading
- Application state management
- `localStorage`

### Other

- **Font Awesome** — UI icons
- **JSON** — Menu data storage
- **localStorage** — Client-side persistence

---

## Responsive Design

The interface adapts to different screen sizes.

| Screen Size | Layout                                        |
| ----------- | --------------------------------------------- |
| ≥ 800px     | Two-column layout with menu and cart          |
| ≤ 768px     | Stacked layout with centered search           |
| ≤ 480px     | Single-column menu and compact checkout modal |

---

## localStorage

The application uses the browser's `localStorage` API to persist data between page refreshes.

---

## Fallback Data

If `menu.json` cannot be loaded, Addis Eats automatically uses embedded `fallbackMenuData`.

This allows the application to continue displaying the menu even when the external JSON file is unavailable.
