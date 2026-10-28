"use client";
import { toCsv } from "@/lib/csv";

export default function ExportButton({ orders }) {
    const handleDownload = () => {
        const csvData = toCsv(orders);
        const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "order-history.csv";
        a.click();

        URL.revokeObjectURL(url);
    };

    return (
        <button onClick={handleDownload} style={{ padding: "10px 16px", background: "#1B4D8E", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}>
            Download Order CSV
        </button>
    );
}