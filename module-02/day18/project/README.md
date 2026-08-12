# TeleBirr Transaction Report

A mini-project that processes an array of TeleBirr transactions using modern JavaScript array methods and module architecture.

## Modules

### transactions.js

Exports an array of transaction objects. Each transaction has:

- `id`: unique identifier
- `customer`: customer name
- `amount`: transaction amount in ETB
- `type`: either "credit" or "debit"

### report.js

Exports utility functions for transaction processing:

- `totalByType`: Calculates total amount for a given transaction type using filter and reduce
- `getTransactionsByType`: Returns all transactions of a specific type using filter
- `formatReceipts`: Creates formatted receipt strings using map with destructuring
- `updateTransactionAmount`: Creates a new transaction object with updated amount using spread operator

### app.js

Imports functions from the modules and generates a complete transaction report:

- Calculates totals by transaction type
- Formats receipts for all transactions
- Displays transaction summaries
- Demonstrates non-mutating updates using spread

## Key Features

- Uses `filter`, `map`, and `reduce` with no manual counter loops
- Uses destructuring in callback parameters
- Uses spread operator to create updated copies without mutation
- Code is split across clear modules with proper export/import statements
- Receipt strings use template literals showing customer and ETB amount

## How to Run

1. Save all three JavaScript files in the same directory
2. Use a module-aware environment (Node.js with ES modules, or a browser with type="module")
3. Run `app.js` to see the report
