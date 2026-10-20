import Link from "next/link";
import { getSession } from "@/lib/session";

// Simulated orders
const ORDERS = [
    { id: "ord_1", total: 320, date: "2026-06-01" },
    { id: "ord_2", total: 150, date: "2026-06-03" },
];

export default async function OrdersPage({ searchParams }) {
    const params = await searchParams;
    const sort = params.sort ?? "date";
    const dir = params.dir ?? "desc";

    // Sort the data based on the URL
    const sorted = [...ORDERS].sort((a, b) => {
        const val = sort === "total" ? a.total - b.total : a.date.localeCompare(b.date);
        return dir === "asc" ? val : -val;
    });

    if (ORDERS.length === 0) {
        return <EmptyOrders />;
    }

    return (
        <main style={{ padding: "2rem" }}>
            <h1>Your Orders</h1>

            <table style={{ width: "100%", textAlign: "left", borderCollapse: "collapse" }}>
                <caption style={{ textAlign: "left", marginBottom: "1rem" }}>
                    A list of your recent orders.
                </caption>
                <thead>
                    <tr style={{ borderBottom: "2px solid #ccc" }}>
                        <th scope="col">Order ID</th>
                        {/* Wrap headers in Links to change the URL sort */}
                        <th scope="col">
                            <Link href={`/orders?sort=date&dir=${dir === "asc" ? "desc" : "asc"}`}>Date</Link>
                        </th>
                        <th scope="col" style={{ textAlign: "right" }}>
                            <Link href={`/orders?sort=total&dir=${dir === "asc" ? "desc" : "asc"}`}>Total</Link>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {sorted.map((o) => (
                        <tr key={o.id} style={{ borderBottom: "1px solid #eee" }}>
                            <td>{o.id}</td>
                            <td>{o.date}</td>
                            {/* Numbers must be right-aligned! */}
                            <td style={{ textAlign: "right" }}>{o.total} ETB</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </main>
    );
}