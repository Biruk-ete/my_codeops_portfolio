import { transactions } from "./transactions.js";
import { 
    totalByType, 
    getTransactionsByType, 
    formatReceipts,
    updateTransactionAmount 
} from "./report.js";

// Calculate totals by type
const totalDebits = totalByType(transactions, "debit");
const totalCredits = totalByType(transactions, "credit");

// Get separate lists
const debits = getTransactionsByType(transactions, "debit");
const credits = getTransactionsByType(transactions, "credit");

// Format receipts for all transactions
const receipts = formatReceipts(transactions);

// Demonstrate spread with a transaction update
const originalTransaction = transactions[0];
const updatedTransaction = updateTransactionAmount(originalTransaction, 300);

// Print report
console.log("TELEBIRR TRANSACTION REPORT");
console.log("\n All Transactions");
console.log(transactions);

console.log("\n Receipts");
receipts.forEach(receipt => console.log(receipt));

console.log("\n Summary");
console.log(`Total Debits: ${totalDebits} ETB`);
console.log(`Total Credits: ${totalCredits} ETB`);
console.log(`Net Balance: ${totalCredits - totalDebits} ETB`);

console.log("\n Debit Transactions");
console.log(debits);

console.log("\n Credit Transactions");
console.log(credits);

console.log("\n Spread Demonstration");
console.log("Original transaction:", originalTransaction);
console.log("Updated transaction (amount changed to 300):", updatedTransaction);
console.log("Original remains unchanged:", originalTransaction);