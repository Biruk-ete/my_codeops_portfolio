import Link from "next/link";

export default function EmptyOrders() {
    return (
        <div style={{ textAlign: "center", padding: "3rem", border: "1px dashed #ccc" }}>
            <h2>No orders yet</h2>
            <p>You haven't placed any orders with Addis Eats.</p>
            <Link href="/menu" style={{ color: "blue", textDecoration: "underline" }}>
                Browse the menu
            </Link>
        </div>
    );
}