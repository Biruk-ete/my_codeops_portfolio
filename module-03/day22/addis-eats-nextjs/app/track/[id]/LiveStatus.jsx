"use client";

import { useState, useEffect } from "react";
import { when, formatRelative } from "@/lib/format";
import "./LiveStatus.css";

export default function LiveStatus({ initialStatus, orderId }) {
    const [status, setStatus] = useState(initialStatus);
    const [connection, setConnection] = useState("connecting");
    const [updatedAt, setUpdatedAt] = useState(new Date());

    useEffect(() => {
        const es = new EventSource(`/api/orders/${orderId}/stream`);

        es.onopen = () => setConnection("live");

        es.onmessage = (e) => {
            const data = JSON.parse(e.data);
            setStatus(data.status);
            setUpdatedAt(new Date(data.timestamp));

            if (data.status === "Delivered") {
                setConnection("closed");
                es.close();
            }
        };

        es.onerror = () => {
            setConnection("reconnecting");
        };

        return () => es.close();
    }, [orderId]);

    return (
        <div className="live-status-card">
            <div className="status-header">
                <h2>Live Status: {status}</h2>
                <div className={`connection-badge ${connection}`}>
                    {connection === "live" && "🟢 Live"}
                    {connection === "connecting" && "🟡 Connecting..."}
                    {connection === "reconnecting" && "🟠 Reconnecting..."}
                    {connection === "closed" && "⚪ Delivered"}
                </div>
            </div>
            <p className="status-time">
                Updated: {when.format(updatedAt)} ({formatRelative(updatedAt)})
            </p>
        </div>
    );
}