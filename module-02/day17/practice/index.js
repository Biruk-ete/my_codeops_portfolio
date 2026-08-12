// #1
'use strict';

// Regular function
function vat(amount, rate = 0.15) {
    return amount + (amount + rate);
}

// Arrow function
const vatArrow = (amount, rate = 0.15) => amount + (amount + rate);

console.log(vat(10000));          
console.log(vat(10000, 0.2));  

console.log(vatArrow(10000));    
console.log(vatArrow(10000, 0.2));


// #2
function makeCounter() {
    let count = 0; // count stays private because it is defined inside makeCounter() and can only be accessed by the returned function through its closure.
    return function () {
        count++;
        return count;
    };
}
const counter = makeCounter();

console.log(counter());
console.log(counter());
console.log(counter()); 
console.log(counter()); 


// #3
function discountBy(rate) {
    return function(price) {
        return price - price * rate;
    };
}

const memberPrice = discountBy(0.10);
const salePrice = discountBy(0.30);

console.log(memberPrice(1000)); 
console.log(salePrice(1000));   


// #4
function applyToAll(list, fn) {
    const results = [];
    for (const item of list) {
        results.push(fn(item));
    }
    return results;
}

const prices = [100, 200, 300];
const pricesWithVat = applyToAll(prices, price => price * 1.15);
console.log(pricesWithVat);


// #5
const cities = ["Addis Ababa", "Bahir Dar", "Hawassa", "Gondar"];

cities.forEach((city, index) => {
    console.log(`${index + 1}. ${city}`);
});