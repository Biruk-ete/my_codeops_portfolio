// VAT rate for Ethiopia (15%)
const VAT_RATE = 0.15;

export function withVat(price) {
    return price * (1 + VAT_RATE);
}

export function format(amount) {
    return `ETB ${amount.toFixed(2)}`;
}

export function total(item) {
    const { price, qty } = item;
    return price * qty;
}

export { VAT_RATE };