"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

// Formatter for Ethiopian Birr
const etb = (v) =>
    new Intl.NumberFormat("en-ET", {
        style: "currency",
        currency: "ETB",
        maximumFractionDigits: 0,
    }).format(v);

export default function RevenueChart({ data }) {
    return (
        <div style={{ marginBottom: "2rem" }}>
            <h2>Revenue by Neighbourhood (ETB)</h2>
            {/* Must have a fixed height, or the chart will be invisible! */}
            <div style={{ width: "100%", height: 300 }}>
                <ResponsiveContainer>
                    <BarChart data={data}>
                        <XAxis dataKey="area" />
                        {/* Format the Y Axis and give it width so numbers don't clip */}
                        <YAxis tickFormatter={etb} width={80} />
                        <Tooltip formatter={(v) => [etb(v), "Revenue"]} />
                        <Bar dataKey="revenue" fill="#1B4D8E" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}