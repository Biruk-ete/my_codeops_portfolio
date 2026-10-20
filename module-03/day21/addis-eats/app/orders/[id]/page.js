import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import OrderStatus from "./OrderStatus";

export default async function OrderPage({ params }) {
    const { id } = await params;

    const user = await getSession();
    if (!user) redirect("/signin?next=/orders/" + id);

    const res = await fetch(`http://localhost:3000/api/orders/${id}`, { cache: "no-store" });
    const initialOrder = await res.json();

    return (
        <main>
            <h1>Tracking Order (User: {user.name})</h1>
            <OrderStatus id={id} initial={initialOrder} />
        </main>
    );
}