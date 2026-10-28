"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const BOLE = [8.9950, 38.7896];
const COURIER = [8.9980, 38.7950];

function FitBounds() {
    const map = useMap();
    useEffect(() => {
        map.fitBounds([BOLE, COURIER], { padding: [50, 50] });
    }, [map]);
    return null;
}

export default function DeliveryMap() {
    return (
        <MapContainer
            center={BOLE}
            zoom={14}
            style={{ height: "320px", width: "100%", borderRadius: "8px" }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
            />
            <FitBounds />

            <Marker position={BOLE}>
                <Popup>Delivery Address (Bole)</Popup>
            </Marker>

            <Marker position={COURIER}>
                <Popup>Courier (Arriving soon)</Popup>
            </Marker>
        </MapContainer>
    );
}