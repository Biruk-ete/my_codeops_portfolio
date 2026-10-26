'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import SearchBox from './SearchBox';
import { useCart } from '@/context/CartContext';
import './FilterShell.css';

export default function FilterShell({ initialDishes }) {
    const [filter, setFilter] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');

    const { addToCart } = useCart();

    const filteredDishes = initialDishes.filter(dish => {
        const matchesCategory = filter === 'All' ? true : dish.category === filter;
        const matchesSearch = dish.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const handleSearch = useCallback((term) => {
        setSearchTerm(term);
    }, []);

    return (
        <div>
            <SearchBox onSearch={handleSearch} />

            <div className="filter-bar">
                <span className="filter-label">Filter:</span>
                <button className={`filter-btn ${filter === 'All' ? 'active' : ''}`} onClick={() => setFilter('All')}>All</button>
                <button className={`filter-btn ${filter === 'Traditional Stews & Wat' ? 'active' : ''}`} onClick={() => setFilter('Traditional Stews & Wat')}>Stews</button>
                <button className={`filter-btn ${filter === 'Tibs & Grills' ? 'active' : ''}`} onClick={() => setFilter('Tibs & Grills')}>Tibs</button>
                <button className={`filter-btn ${filter === 'Vegan & Vegetarian' ? 'active' : ''}`} onClick={() => setFilter('Vegan & Vegetarian')}>Vegan</button>
            </div>

            <div className="menu-grid">
                {filteredDishes.length > 0 ? (
                    filteredDishes.map(dish => (
                        <div key={dish.id} className="menu-card">
                            <div className="menu-card-image-wrapper">
                                <Link href={`/menu/${dish.id}`}>
                                    <img src={dish.image} alt={dish.name} className="menu-card-image" />
                                </Link>
                                {dish.tag && <span className="menu-card-tag">{dish.tag}</span>}
                            </div>

                            <div className="menu-card-content">
                                <Link href={`/menu/${dish.id}`} className="menu-card-title-link">
                                    <h3 className="menu-card-title">{dish.name}</h3>
                                </Link>

                                <div className="menu-card-spice">
                                    <span>{dish.spiceLevel}</span>
                                </div>

                                <div className="menu-card-footer">
                                    <span className="menu-card-price">ETB {dish.price}</span>
                                    <button className="menu-card-add-btn" onClick={() => addToCart(dish)}>
                                        + Add
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="no-results">No dishes found matching "{searchTerm}"</p>
                )}
            </div>
        </div>
    );
}