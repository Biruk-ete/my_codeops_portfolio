"use client";

import { useState } from "react";

const CATEGORIES = ["All", "Wot", "Kitfo", "Vegetarian", "Drinks"];

export default function CategoryBar() {
    const [selected, setSelected] = useState("All");

    return (
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
        {CATEGORIES.map((c) => (
            <button
            key={c}
            onClick={() => setSelected(c)}
            style={{ fontWeight: selected === c ? "bold" : "normal" }}
            >
            {c}
            </button>
        ))}
        </div>
    );
}