// money.js - Export module
const VAT = 0.15;

function addVat(price) {
  return price * (1 + VAT);
}

function calculateVat(price) {
  return price * VAT;
}

// Export multiple items
export { VAT, addVat, calculateVat };