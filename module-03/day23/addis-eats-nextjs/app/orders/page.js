import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/session';
import { db } from '@/lib/db';
import './OrdersPage.css';

export default async function OrdersPage({ searchParams }) {
    const user = await getSession();

    if (!user) {
        redirect('/login?next=/orders');
    }

    const resolvedParams = await searchParams;
    const page = Number(resolvedParams.page ?? 1);
    const sort = resolvedParams.sort ?? 'createdAt';
    const dir = resolvedParams.dir ?? 'desc';
    const take = 20;
    const skip = (page - 1) * take;

    const allOrders = await db.order.findMany();
    const userOrdersList = allOrders.filter(order => order.userId === user.id);

    userOrdersList.sort((a, b) => {
        if (a[sort] < b[sort]) return dir === 'asc' ? -1 : 1;
        if (a[sort] > b[sort]) return dir === 'asc' ? 1 : -1;
        return 0;
    });


    const totalOrders = userOrdersList.length;
    const totalPages = Math.ceil(totalOrders / take);
    const userOrders = userOrdersList.slice(skip, skip + take);

    const etb = (v) =>
        new Intl.NumberFormat('en-ET', {
            style: 'currency',
            currency: 'ETB',
            maximumFractionDigits: 0,
        }).format(v);

    const getSortLink = (column) => {
        const newDir = sort === column && dir === 'asc' ? 'desc' : 'asc';
        return `/orders?sort=${column}&dir=${newDir}&page=1`;
    };

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
                <>
                    <div className="table-container">
                        {/* Real table markup */}
                        <table className="orders-table">
                            <caption className="sr-only">Your orders, most recent first</caption>
                            <thead>
                                <tr>
                                    <th scope="col">Order</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Delivering To</th>
                                    <th
                                        scope="col"
                                        className="text-right"
                                        aria-sort={sort === 'total' ? (dir === 'asc' ? 'ascending' : 'descending') : 'none'}
                                    >
                                        <Link href={getSortLink('total')}>
                                            Total {sort === 'total' ? (dir === 'asc' ? '↑' : '↓') : ''}
                                        </Link>
                                    </th>
                                    <th scope="col"></th> {/* For the View button */}
                                </tr>
                            </thead>
                            <tbody>
                                {userOrders.map(order => (
                                    <tr key={order.id}>
                                        <td><strong>#{order.id}</strong></td>
                                        <td>
                                            <span className={`status-badge status-${order.status.toLowerCase()}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td>{order.address}</td>
                                        {/* Right-aligned numbers */}
                                        <td className="text-right font-mono">
                                            {etb(order.total)}
                                        </td>
                                        <td className="text-right">
                                            <Link href={`/orders/${order.id}`} className="btn-view-order">
                                                View
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Paging using links, not buttons */}
                    <nav className="pagination" aria-label="Pagination">
                        {page > 1 && (
                            <Link href={`/orders?page=${page - 1}&sort=${sort}&dir=${dir}`}>
                                Previous
                            </Link>
                        )}
                        <span>Page {page} of {totalPages}</span>
                        {page < totalPages && (
                            <Link href={`/orders?page=${page + 1}&sort=${sort}&dir=${dir}`}>
                                Next
                            </Link>
                        )}
                    </nav>
                </>
            )}
        </div>
    );
}