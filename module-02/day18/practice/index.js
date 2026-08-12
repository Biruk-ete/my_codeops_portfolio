// #1
const etbPrices = [850, 1200, 450, 980, 1500, 730, 2100];

const grandTotal = etbPrices
    .map(price => price * 1.15)
    .filter(price => price < 1000)
    .reduce((total, price) => total + price, 0);

console.log("Grand Total:", grandTotal.toFixed(2), "ETB");

// #2
const customer = {
    name: "Abebe Kebede",
    city: "Addis Ababa",
    balance: 4500.75
};

console.log("\nCustomer Details:");
for (const [key, value] of Object.entries(customer)) {
    console.log(`${key}: ${value}`);
}

// #3
const customer3 = {
    name: "Ephrem Hailu",
    city: "Addis Ababa",
    balance: 3200.50
};

const { name, city } = customer3;
console.log(`\nName: ${name}, City: ${city}`);

function greet({ name }) {
    return `Hello, ${name}! Welcome to our store.`;
}

console.log(greet(customer3));

// #4
// 4. Create updated copy with spread (no mutation)
const originalCustomer = {
    name: "Samuel Tesfaye",
    city: "Adama",
    balance: 2800.00,
    email: "samuel@email.com"
};

const updatedCustomer = {
    ...originalCustomer,
    city: "Sheger", 
    phone: "+251-914-4523" 
};

console.log("\nOriginal Customer:", originalCustomer);
console.log("Updated Customer:", updatedCustomer);
console.log("Are they the same object?", originalCustomer === updatedCustomer);

