'use client';

import { useState, useCallback } from 'react';
import SearchBox from './SearchBox';
import DishCard from './DishCard';
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
                    filteredDishes.map((dish, index) => (
                        <DishCard
                            key={dish.id}
                            dish={dish}
                            onAdd={addToCart}
                            priority={index === 0}
                        />
                    ))
                ) : (
                    <p className="no-results">No dishes found matching "{searchTerm}"</p>
                )}
            </div>
        </div>
    );
}