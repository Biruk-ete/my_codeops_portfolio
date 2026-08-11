"use strict";

const subtotal = (...prices) => {
  return prices.reduce((sum, p) => sum + p, 0);
};

const discountBy = (rate) => {
  return (n) => n * (1 - rate);
};

const withVat = (n) => {
  return n * 1.15;
};

const toETB = (n) => {
  return `${n.toFixed(2)} ETB`;
};

function makeReceiptMaker() {
  let orderNo = 0;
  const memberOff = discountBy(0.1);

  return function (...items) {
    orderNo++;

    const gross = subtotal(...items);
    const discounted = memberOff(gross);
    const net = withVat(discounted);

    return `#${orderNo}: ${toETB(net)}`;
  };
}

const receipt = makeReceiptMaker();

console.log(receipt(220, 180, 120));
console.log(receipt(140, 60));