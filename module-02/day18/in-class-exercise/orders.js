// orders.js - Sample order data

const orders = [
    {
        id: 'ORD-001',
        customer: 'Abebe Kebede',
        items: [
        { name: 'Injera (large)', price: 15.00, qty: 3 },
        { name: 'Doro Wat', price: 85.00, qty: 2 },
        { name: 'Tibs', price: 95.00, qty: 1 },
        { name: 'Ayib (cheese)', price: 12.00, qty: 2 }
        ]
    },
    {
        id: 'ORD-002',
        customer: 'Selam Tesema',
        items: [
        { name: 'Coffee beans (500g)', price: 45.00, qty: 1 },
        { name: 'Shiro powder', price: 30.00, qty: 2 },
        { name: 'Berbere spice', price: 25.00, qty: 1 },
        { name: 'Teff flour', price: 40.00, qty: 1 }
        ]
    },
    {
        id: 'ORD-003',
        customer: 'Yohannes Mekonnen',
        items: [
        { name: 'Samsung Galaxy S23', price: 899.00, qty: 1 },
        { name: 'Screen protector', price: 25.00, qty: 2 },
        { name: 'Phone case', price: 35.00, qty: 1 }
        ]
    },
    {
        id: 'ORD-004',
        customer: 'Hana Wondimu',
        items: [
        { name: 'Fresh vegetables pack', price: 50.00, qty: 1 },
        { name: 'Fruit basket', price: 65.00, qty: 1 },
        { name: 'Yogurt (1L)', price: 20.00, qty: 2 }
        ]
    },
    {
        id: 'ORD-005',
        customer: 'Dawit Assefa',
        items: [
        { name: 'Laptop bag', price: 120.00, qty: 1 },
        { name: 'Wireless mouse', price: 45.00, qty: 1 },
        { name: 'USB-C cable', price: 15.00, qty: 3 },
        { name: 'Power adapter', price: 35.00, qty: 1 }
        ]
    },
    {
        id: 'ORD-006',
        customer: 'Meron Gizaw',
        items: [
        { name: 'Traditional dress', price: 250.00, qty: 1 },
        { name: 'Shawl', price: 80.00, qty: 2 }
        ]
    }
];

export default orders;