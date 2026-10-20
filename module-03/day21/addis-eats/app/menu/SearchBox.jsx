"use client";

import { useState } from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { useDebounce } from "@/lib/useDebounce";

export default function SearchBox() {
    const [term, setTerm] = useState("");
    const debouncedTerm = useDebounce(term, 300);

    const { data, isLoading } = useSWR(
        debouncedTerm ? `/api/dishes?q=${debouncedTerm}` : null,
        fetcher,
        { keepPreviousData: true }
    );

    return (
        <div style={{ marginBottom: "1rem" }}>
            <input
                type="text"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                placeholder="Search dishes..."
            />

            {isLoading && <p>Searching...</p>}

            {data && (
                <ul>
                    {data.map((dish) => (
                        <li key={dish.id}>{dish.name}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}