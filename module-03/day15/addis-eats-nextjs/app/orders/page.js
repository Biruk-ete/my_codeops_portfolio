import Link from 'next/link';
import './Orders.css';

export default function OrdersPage() {
    return (
        <div className="orders-wrapper">
            <h1>Your Order History</h1>
            <div className="order-card">
                <div className="order-header">
                    <span>Order #1024</span>
                    <span className="status">Delivered</span>
                </div>
                <p>Prime Beef Kitfo (x1), Shiro (x2)</p>
                <p className="total">Total: ETB 1,620</p>
                <Link href="/menu" className="btn-reorder">Reorder</Link>
            </div>
        </div>
    );
}