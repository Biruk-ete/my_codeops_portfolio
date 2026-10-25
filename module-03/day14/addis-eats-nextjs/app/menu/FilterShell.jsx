'use client';

import { useState } from 'react';
import Link from 'next/link';
import './FilterShell.css';

export default function FilterShell({ initialDishes }) {
    const [filter, setFilter] = useState('All');

    const filteredDishes = filter === 'All'
        ? initialDishes
        : initialDishes.filter(d => d.category === filter);

    return (
        <div>
            <div className="filter-bar">
                <span className="filter-label">Filter:</span>
                <button
                    className={`filter-btn ${filter === 'All' ? 'active' : ''}`}
                    onClick={() => setFilter('All')}
                >
                    All
                </button>
                <button
                    className={`filter-btn ${filter === 'Stews' ? 'active' : ''}`}
                    onClick={() => setFilter('Stews')}
                >
                    Stews
                </button>
                <button
                    className={`filter-btn ${filter === 'Tibs' ? 'active' : ''}`}
                    onClick={() => setFilter('Tibs')}
                >
                    Tibs
                </button>
            </div>

            <ul className="menu-list">
                {filteredDishes.map(dish => (
                    <li key={dish.id} className="menu-item">
                        <Link href={`/menu/${dish.id}`} className="menu-link">
                            <h3>{dish.name}</h3>
                            <span>ETB {dish.price}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}