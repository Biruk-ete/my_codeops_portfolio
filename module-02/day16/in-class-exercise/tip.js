let bill = "1200";
let partySize = "3";
let paymentMethod = "telebirr";

bill = Number(bill);
partySize = Number(partySize);

let tip;

if (bill > 300) {
    tip = bill * 0.10;
} else {
    tip = bill * 0.05;
}

let serviceFee;

switch (paymentMethod.toLowerCase()) {
    case "telebirr":
        serviceFee = 5;
        break;

    case "cbebirr":
        serviceFee = 10;
        break;

    default:
        serviceFee = 0;
}

let total = bill + tip + serviceFee;
let perPerson = total / partySize;

console.log(`Bill Amount: ${bill} ETB`);
console.log(`Tip: ${tip} ETB`);
console.log(`Service Fee: ${serviceFee} ETB`);
console.log(`Total: ${total} ETB`);
console.log(`Each Person Pays: ${perPerson} ETB`);