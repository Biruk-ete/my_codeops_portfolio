"use client";

import dynamic from "next/dynamic";

const DeliveryMap = dynamic(() => import("./DeliveryMap"), {
    ssr: false, // Prevents server-rendering crash
    loading: () => (
        <div style={{ height: "320px", width: "100%", background: "#f1f5f9", borderRadius: "8px" }} />
    ),
});

export default function MapPanel() {
    return <DeliveryMap />;
}