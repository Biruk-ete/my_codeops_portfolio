"use client";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import "./OrdersLineChart.css";

export default function OrdersLineChart({ data }) {
    return (
        <div className="orders-line-chart-wrapper">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    <XAxis dataKey="date" />
                    <YAxis width={50} />
                    <Tooltip />
                    <Line type="monotone" dataKey="orders" stroke="#7A1401" strokeWidth={2} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}