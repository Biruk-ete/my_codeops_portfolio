"use client";

import { useState } from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

export default function PagedDishes() {
    const [page, setPage] = useState(1);

    const { data, isLoading } = useSWR(
        `/api/dishes?page=${page}`,
        fetcher,
        { keepPreviousData: true }
    );

    return (
        <div>
            <h2>Page {page}</h2>

            {isLoading && <p>Loading...</p>}

            {/* Render data here */}
            <pre>{JSON.stringify(data, null, 2)}</pre>

            <button onClick={() => setPage((p) => p - 1)} disabled={page === 1}>
                Previous
            </button>
            <button onClick={() => setPage((p) => p + 1)}>
                Next
            </button>
        </div>
    );
}