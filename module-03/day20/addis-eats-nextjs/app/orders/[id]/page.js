import OrderStatus from './OrderStatus';
import './OrderPage.css';

export default async function OrderPage({ params, searchParams }) {
    const { id } = await params;
    const { data } = await searchParams;

    let orderData = null;
    if (data) {
        try {
            orderData = JSON.parse(decodeURIComponent(data));
        } catch (e) {
            console.error("Failed to parse order data");
        }
    }

    return (
        <div className="order-page-wrapper">
            <h1 className="order-title">Order Status</h1>
            <OrderStatus id={id} initialOrder={orderData} />
        </div>
    );
}