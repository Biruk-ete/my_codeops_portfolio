import { withVat, format, total } from './pricing.js';
import orders from './orders.js';

export function processOrders(orders) {
    const ordersWithTotals = orders.map(order => {
        const subtotal = order.items.reduce((sum, item) => {
        const { price, qty } = item;
    
        return sum + total({ price, qty });
        }, 0);
        
        const totalWithVat = withVat(subtotal);
        
        return {
        ...order,
        total: totalWithVat
        };
    });
    
    const expensiveOrders = ordersWithTotals.filter(order => order.total > 500);
    const grandTotal = expensiveOrders.reduce((sum, order) => sum + order.total, 0);
    
    return {
        orders: expensiveOrders,
        grandTotal
    };
}

export function printSummary(orders, grandTotal) {
    console.log('  ADDIS MARKET - ORDER SUMMARY (Over 500 ETB)');
    console.log();
    
    orders.forEach((order, index) => {
        console.log(`Order #${index + 1}: ${order.customer}`);
        console.log(`  ID: ${order.id}`);
        console.log('  Items:');
        
        order.items.forEach(item => {
        const { name, price, qty } = item;
        const itemTotal = total({ price, qty });
        console.log(`    - ${name}: ${qty} × ${format(price)} = ${format(itemTotal)}`);
        });
        
        console.log(`  Subtotal: ${format(order.total / (1 + 0.15))}`);
        console.log(`  VAT (15%): ${format(order.total - (order.total / (1 + 0.15)))}`);
        console.log(`  TOTAL: ${format(order.total)}`);
        console.log();
    });
    
    console.log(`GRAND TOTAL: ${format(grandTotal)}`);
    console.log(`Number of orders: ${orders.length}`);
}

export function main() {
    console.log('\n ADDIS MARKET ORDER PROCESSING');
    
    const result = processOrders(orders);
    
    printSummary(result.orders, result.grandTotal);
    
    return result;
    }

main();