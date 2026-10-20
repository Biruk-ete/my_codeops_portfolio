"use client";

import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

export default function OrderStatus({ id, initial }) {
    const { data, error } = useSWR(`/api/orders/${id}`, fetcher, {
        fallbackData: initial,
        refreshInterval: 5000,
    });

    if (error) return <p>Failed to load order.</p>;

    return (
        <div>
            <h2>Order #{id}</h2>
            <p>Status: <strong>{data.status}</strong></p>
            <p>Last updated: {new Date(data.updatedAt).toLocaleTimeString()}</p>
        </div>
    );
}