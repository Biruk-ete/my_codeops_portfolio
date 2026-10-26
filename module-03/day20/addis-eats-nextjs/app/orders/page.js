import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/session';
import { db } from '@/lib/db';
import './OrdersPage.css';

export default async function OrdersPage() {
    const user = await getSession();

    if (!user) {
        redirect('/login?next=/orders');
    }

    const allOrders = await db.order.findMany();

    const userOrders = allOrders.filter(order => order.userId === user.id);

    return (
        <div className="orders-page-wrapper">
            <h1 className="orders-title">Your Order History</h1>

            {userOrders.length === 0 ? (
                <div className="empty-orders-card">
                    <h2>No Orders Yet</h2>
                    <p>You haven't placed any orders with us yet. Let's fix that!</p>
                    <Link href="/menu" className="btn-primary">
                        Explore the Menu
                    </Link>
                </div>
            ) : (
                <div className="orders-list">
                    {userOrders.map(order => (
                        <div key={order.id} className="order-history-card">
                            <div className="order-history-header">
                                <span><strong>Order #{order.id}</strong></span>
                                <span className={`status-badge status-${order.status.toLowerCase()}`}>
                                    {order.status}
                                </span>
                            </div>
                            <p><strong>Total:</strong> ETB {order.total}</p>
                            <p><strong>Delivering to:</strong> {order.address}</p>
                            <p className="order-date">Placed: {new Date(order.createdAt).toLocaleDateString()}</p>

                            <Link href={`/orders/${order.id}`} className="btn-view-order">
                                View Details
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}