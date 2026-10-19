'use client';

import React, { useState, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

import MenuItem from '@/components/MenuItem';
import Loader from '@/components/Loader';
import Toast from '@/components/Toast';
import { useCart } from '@/context/CartContext';
import { useFetch } from '@/hooks/useFetch';
import { useDebounce } from '@/hooks/useDebounce';
import { fetchDishes, fetchCategories } from '@/api/dishes';
import './FullMenu.css';

import { FaSearch, FaLeaf, FaArrowRight, FaPepperHot, FaUtensils } from 'react-icons/fa';
import { GoFlame } from "react-icons/go";
import { BsCartCheck } from 'react-icons/bs';

function MenuContent() {
    const { cart, getTotal, addToCart } = useCart();
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const activeCategory = searchParams.get('category') || 'All Dishes';

    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearch = useDebounce(searchTerm, 300);

    const [toasts, setToasts] = useState([]);
    const showToast = (message, type = 'success') => {
        const id = Date.now();
        setToasts((prev) => [...prev, { id, message, type }]);
    };
    const removeToast = (id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    };

    const { data: dishes, loading, error, refetch } = useFetch(fetchDishes, []);
    const { data: categories } = useFetch(fetchCategories, []);

    const filteredItems = useMemo(() => {
        if (!dishes) return [];
        return dishes.filter((item) => {
            const matchesSearch = item.name
                .toLowerCase()
                .includes(debouncedSearch.toLowerCase());

            let matchesCategory = true;
            if (activeCategory !== 'All Dishes') {
                if (activeCategory === 'Fasting & Vegan / Tsom') {
                    matchesCategory = item.category === 'Vegan & Vegetarian';
                } else {
                    matchesCategory = item.category === activeCategory;
                }
            }
            return matchesSearch && matchesCategory;
        });
    }, [dishes, debouncedSearch, activeCategory]);

    const handleCategoryChange = (cat) => {
        if (cat === 'All Dishes') {
            router.push(pathname);
        } else {
            router.push(`${pathname}?category=${encodeURIComponent(cat)}`);
        }
    };

    const handleAddToCart = (item) => {
        addToCart(item);
        showToast(`${item.name} added to your basket`);
    };

    return (
        <div className="menu-page">
            <div className="container">

                <div className="menu-header-section">
                    <span className="menu-header-tag">
                        <GoFlame /> HANDCRAFTED GONDAR & ADDIS SPICES
                    </span>
                    <h1>Our Complete Culinary Heritage</h1>
                    <p className="menu-header-desc">
                        Every dish is prepared daily from scratch using sun-dried spices, stone-ground legume flours, and clarified herbal butter sourced directly from highland farm cooperatives.
                    </p>
                </div>

                <div className="search-filter-bar">
                    <div className="search-input-wrapper">
                        <FaSearch className="search-icon" />
                        <input
                            type="text"
                            placeholder="Search dishes by name (e.g. Kitfo, Shiro, Tibs, Doro Wat)..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="feature-toggles">
                        <button className="feature-btn green"><FaLeaf /> 100% Pure Teff Injera</button>
                        <button className="feature-btn green"><FaLeaf /> Fasting / Tsom Friendly</button>
                        <button className="feature-btn red"><FaPepperHot /> Berbere Spiced</button>
                    </div>
                </div>

                <div className="category-pills">
                    {categories ? (
                        categories.map((cat) => (
                            <button
                                key={cat.name}
                                className={`category-pill ${activeCategory === cat.name ? 'active' : ''}`}
                                onClick={() => handleCategoryChange(cat.name)}
                            >
                                {cat.name} ({cat.count})
                            </button>
                        ))
                    ) : (
                        <span style={{ color: '#8c716b', fontSize: '13px' }}>Loading categories...</span>
                    )}
                </div>

                {loading && <Loader message="Simmering the menu..." />}

                {error && !loading && (
                    <div className="menu-error-state">
                        <h3>Couldn't load the menu</h3>
                        <p>{error}</p>
                        <button onClick={refetch} className="btn-retry">Try Again</button>
                    </div>
                )}

                {!loading && !error && filteredItems.length === 0 && (
                    <div className="menu-empty-state">
                        <h3>No dishes found</h3>
                        <p>
                            {debouncedSearch
                                ? `Nothing matched "${debouncedSearch}". Try a different search.`
                                : 'This category has no dishes yet.'}
                        </p>
                        {debouncedSearch && (
                            <button className="btn-retry" onClick={() => setSearchTerm('')}>
                                Clear Search
                            </button>
                        )}
                    </div>
                )}

                {!loading && !error && filteredItems.length > 0 && (
                    <div className="menu-grid">
                        {filteredItems.map((item) => (
                            <MenuItem key={item.id} item={item} onAdd={handleAddToCart} />
                        ))}
                    </div>
                )}

                <div className="community-cta">
                    <div className="community-cta-content">
                        <div className="cta-icon-wrapper">
                            <FaUtensils />
                        </div>
                        <div>
                            <h3>Experience Communal Dining Around the Mesob</h3>
                            <p>All platters are served with unlimited warm Teff Injera rolls and fresh house-made Ayib.</p>
                        </div>
                    </div>
                    <Link href="/checkout" className="btn-reserve-table">Reserve a Group Mesob Table</Link>
                </div>

            </div>

            {totalItems > 0 && (
                <div className="sticky-selection-bar">
                    <div className="selection-bar-inner">
                        <div className="selection-info">
                            <div className="selection-icon-wrapper">
                                <BsCartCheck />
                                <span className="selection-count">{totalItems}</span>
                            </div>
                            <div className="selection-text">
                                <span className="selection-title">
                                    Selected: {totalItems} Items • ETB {getTotal().toLocaleString()}
                                </span>
                                <span className="selection-subtitle">
                                    Communal Injera Included • Ready for banquet checkout
                                </span>
                            </div>
                        </div>
                        <Link href="/cart" className="btn-proceed-cart">
                            Proceed to Cart <FaArrowRight />
                        </Link>
                    </div>
                </div>
            )}

            <Toast toasts={toasts} onClose={removeToast} />

        </div>
    );
}

export default function FullMenu() {
    return (
        <Suspense fallback={<Loader message="Loading menu..." />}>
            <MenuContent />
        </Suspense>
    );
}