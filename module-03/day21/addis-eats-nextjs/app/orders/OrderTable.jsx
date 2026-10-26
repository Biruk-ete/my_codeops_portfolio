import Link from "next/link";

export default function OrderTable({ orders, currentSort, currentDir }) {
    // If empty state is needed
    if (!orders || orders.length === 0) {
        return (
            <div className="text-center p-12 border rounded-lg bg-gray-50">
                <h3 className="text-lg font-semibold">No orders found</h3>
                <p className="text-gray-500 mt-2">When you make your first order, it will appear here.</p>
            </div>
        );
    }

    const getSortLink = (column) => {
        const isCurrent = currentSort === column;
        const newDir = isCurrent && currentDir === "asc" ? "desc" : "asc";
        return `/orders?sort=${column}&dir=${newDir}`;
    };

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
                <caption className="sr-only">Your orders, sorted by {currentSort}</caption>
                <thead className="bg-gray-100 border-b">
                    <tr>
                        <th scope="col" className="p-3">
                            <Link href={getSortLink("id")}>Order ID</Link>
                        </th>
                        <th scope="col" className="p-3">Area</th>
                        <th
                            scope="col"
                            className="p-3 text-right"
                            aria-sort={currentSort === "total" ? (currentDir === "asc" ? "ascending" : "descending") : "none"}
                        >
                            <Link href={getSortLink("total")}>Total</Link>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order.id} className="border-b">
                            <td className="p-3">{order.id}</td>
                            <td className="p-3">{order.area}</td>
                            {/* Numbers right-aligned, tabular figures for money */}
                            <td className="p-3 text-right font-mono">
                                {new Intl.NumberFormat("en-ET", { style: "currency", currency: "ETB" }).format(order.total)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}