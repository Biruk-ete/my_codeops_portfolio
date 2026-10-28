'use client';

import { useState, useEffect } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import './SearchBox.css';

export default function SearchBox({ onSearch }) {
    const [term, setTerm] = useState('');
    const debouncedTerm = useDebounce(term, 300);

    useEffect(() => {
        onSearch(debouncedTerm);
    }, [debouncedTerm, onSearch]);

    return (
        <div className="search-box-wrapper">
            <input
                type="text"
                placeholder="Search dishes by name (e.g. Kitfo, Shiro)..."
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                className="search-input"
            />
        </div>
    );
}