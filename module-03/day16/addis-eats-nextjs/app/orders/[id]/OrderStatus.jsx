'use client';

import './OrderStatus.css';

export default function OrderStatus({ id, initialOrder }) {
    const order = initialOrder || {
        id: id,
        status: 'Order Received',
        total: 650,
        address: 'Bole, Addis Ababa',
        createdAt: new Date().toISOString()
    };

    return (
        <div className="order-status-card">
            <p><strong>Order ID:</strong> {order.id}</p>
            <p><strong>Status:</strong> <span className="status-badge">{order.status}</span></p>
            <p><strong>Total:</strong> ETB {order.total}</p>
            <p><strong>Delivery To:</strong> {order.address}</p>
            <p className="last-updated">Created: {new Date(order.createdAt).toLocaleTimeString()}</p>

            <div style={{ marginTop: '20px', borderTop: '1px solid #dfbfb9', paddingTop: '20px' }}>
                <p style={{ fontSize: '14px', color: '#8c716b' }}>
                    Your order is being prepared. You will receive an SMS shortly.
                </p>
            </div>
        </div>
    );
}