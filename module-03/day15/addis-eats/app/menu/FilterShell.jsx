"use client";

import { useState } from "react";

export default function FilterShell({ children }) {
    const [sort, setSort] = useState("name");

    return (
        <div>
        <div style={{ marginBottom: "1rem" }}>
            Sort by:{" "}
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="name">Name</option>
            <option value="price">Price</option>
            </select>
        </div>
        {children}
        </div>
    );
}