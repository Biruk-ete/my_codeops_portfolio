import { redirect } from 'next/navigation';
import { getSession } from '@/lib/session';
import { db } from '@/lib/db';
import './KitchenPage.css';

export default async function KitchenPage() {
    // 1. Security Check (Layer 2)
    const user = await getSession();
    if (!user || user.role !== 'staff') {
        redirect('/');
    }

    const allOrders = await db.order.findMany();
    const activeOrders = allOrders.filter(o => o.status !== 'CANCELLED' && o.status !== 'DELIVERED');

    return (
        <div className="kitchen-wrapper">
            <div className="kitchen-header">
                <div>
                    <span className="kitchen-label">STAFF PORTAL</span>
                    <h1>Kitchen Order Queue</h1>
                    <p>Logged in as: <strong>{user.name}</strong></p>
                </div>
                <div className="kitchen-stats">
                    <div className="stat-box">
                        <span className="stat-number">{activeOrders.length}</span>
                        <span className="stat-label">Active Orders</span>
                    </div>
                </div>
            </div>

            {activeOrders.length === 0 ? (
                <div className="empty-kitchen">
                    <h2>All caught up!</h2>
                    <p>There are no incoming orders right now.</p>
                </div>
            ) : (
                <div className="kitchen-grid">
                    {activeOrders.map(order => (
                        <div key={order.id} className="order-ticket">
                            <div className="ticket-header">
                                <span className="ticket-id">#{order.id}</span>
                                <span className="ticket-time">
                                    {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>

                            <div className="ticket-body">
                                <p><strong>Customer:</strong> {order.name}</p>
                                <p><strong>Phone:</strong> {order.phone}</p>
                                <p><strong>Address:</strong> {order.address}</p>
                            </div>

                            <div className="ticket-footer">
                                <span className={`status-badge status-${order.status.toLowerCase()}`}>
                                    {order.status}
                                </span>
                                <button className="btn-complete">
                                    Mark as Ready
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}