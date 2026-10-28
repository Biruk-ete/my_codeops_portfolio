import MapPanel from "./MapPanel";
import LiveStatus from "./LiveStatus";
import ExportButton from "./ExportButton";
import { etb } from "@/lib/format";
import "./TrackPage.css";

export default async function TrackPage({ params }) {
    const { id: orderId } = await params;

    const order = {
        id: orderId,
        status: "Preparing",
        total: 1250,
        address: "Bole, Addis Ababa",
        placedAt: new Date().toISOString(),
    };

    const csvOrders = [
        { id: orderId, dish: 'Doro Wat', total: 1250, status: "Preparing" },
        { id: "ORD-813", dish: 'Tibs "Special"', total: 850, status: "Delivered" },
    ];

    return (
        <div className="track-container">
            <h1>Track Order #{orderId}</h1>

            <LiveStatus initialStatus={order.status} orderId={orderId} />

            <div className="map-section">
                {/* The Map */}
                <div className="map-wrapper">
                    <MapPanel />
                </div>

                <div className="map-text-fallback">
                    <h3>Delivery Details</h3>
                    <p><strong>Address:</strong> {order.address}</p>
                    <p><strong>Area:</strong> Bole</p>
                    <p><strong>Total:</strong> {etb.format(order.total)}</p>
                    <p>A courier is on the way to your location.</p>
                </div>
            </div>

            <div style={{ marginTop: "32px" }}>
                <h2>Order History</h2>
                <ExportButton orders={csvOrders} />
            </div>
        </div>
    );
}