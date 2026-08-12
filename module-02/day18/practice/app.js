// app.js - Import and use money module
import { VAT, addVat, calculateVat } from './money.js';

const prices = [850, 1200, 450, 980, 730];

console.log("VAT Rate:", (VAT * 100) + "%");

console.log("\nPrice Processing:");
prices.forEach(price => {
    const withVat = addVat(price);
    const vatAmount = calculateVat(price);
    console.log(`Price: ${price} ETB  VAT: ${vatAmount.toFixed(2)}  Total: ${withVat.toFixed(2)} ETB`);
});
