import { getOrder } from "@/lib/orders";

export default async function OrderPage({ params }) {
    const { id } = await params;
    const initialOrder = getOrder(id);
    return <OrderStatus id={id} initial={initialOrder} />;
}