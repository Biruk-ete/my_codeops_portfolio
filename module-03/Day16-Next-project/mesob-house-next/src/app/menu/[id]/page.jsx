'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

import Loader from '@/components/Loader';
import Toast from '@/components/Toast';
import MenuItem from '@/components/MenuItem';
import { useFetch } from '@/hooks/useFetch';
import { fetchDishById, fetchDishes } from '@/api/dishes';
import { useCart } from '@/context/CartContext';
import './RoyalDoroWat.css';

import {
    FaShoppingBag, FaHeart, FaRegHeart, FaCheck, FaChevronRight, FaRegClock, FaLeaf, FaFire, FaUsers, FaInfoCircle,
} from 'react-icons/fa';
import { GiChiliPepper, GiCookingPot } from 'react-icons/gi';
import { RiHandHeartLine } from 'react-icons/ri';

export default function RoyalDoroWat() {
    const { id } = useParams();

    const { addToCart } = useCart();
    const [toasts, setToasts] = useState([]);

    // Local UI state
    const [quantity, setQuantity] = useState(1);
    const [heatLevel, setHeatLevel] = useState('traditional');
    const [injeraBase, setInjeraBase] = useState('standard');
    const [sideAccents, setSideAccents] = useState(['fresh-ayib']);
    const [saved, setSaved] = useState(false);

    // Fetch the dish by ID
    const { data: dish, loading, error } = useFetch(
        () => fetchDishById(id),
        [id]
    );

    // Fetch all dishes (used for pairings)
    const { data: allDishes } = useFetch(fetchDishes, []);

    const showToast = (message, type = 'success') => {
        const toastId = Date.now();
        setToasts((prev) => [...prev, { id: toastId, message, type }]);
    };
    const removeToast = (toastId) => {
        setToasts((prev) => prev.filter((t) => t.id !== toastId));
    };

    const handleAddToCart = () => {
        for (let i = 0; i < quantity; i++) {
            addToCart(dish);
        }
        showToast(`${quantity} × ${dish.name} added to your basket`);
    };

    const toggleSideAccent = (accentId) => {
        setSideAccents((prev) =>
            prev.includes(accentId)
                ? prev.filter((a) => a !== accentId)
                : prev.length < 2
                    ? [...prev, accentId]
                    : prev
        );
    };

    if (loading) {
        return (
            <div className="product-page">
                <div className="container">
                    <Loader message="Fetching dish details..." />
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="product-page" style={{ textAlign: 'center', padding: '100px 20px' }}>
                <h2>Dish not found</h2>
                <p>We couldn't find that dish in our kitchen.</p>
                <Link href="/menu" style={{ color: '#7a1401', textDecoration: 'underline' }}>
                    Back to Menu
                </Link>
            </div>
        );
    }

    const galleryImages = [dish.image, dish.image, dish.image];

    const pairings =
        allDishes?.filter((d) => d.id !== dish.id).slice(0, 3) || [];

    return (
        <div className="product-page">
            <div className="container">
                <nav className="product-breadcrumb">
                    <Link href="/">Home</Link>
                    <FaChevronRight />
                    <Link href="/menu">Menu</Link>
                    <FaChevronRight />
                    <Link href={`/menu?category=${encodeURIComponent(dish.category || '')}`}>
                        {dish.category || 'Traditional Stews & Wat'}
                    </Link>
                    <FaChevronRight />
                    <span>{dish.name}</span>
                </nav>
            </div>

            <div className="container">
                <div className="product-layout">

                    <div className="product-left-col">

                        <div className="product-main-image">
                            <img src={dish.image} alt={dish.name} />
                            <div className="product-image-overlays">
                                {dish.tag && (
                                    <span className="overlay-tag">
                                        <GiCookingPot /> {dish.tag}
                                    </span>
                                )}
                                {dish.spiceLevel && (
                                    <span className="overlay-tag overlay-tag-green">
                                        <FaCheck /> {dish.spiceLevel}
                                    </span>
                                )}
                            </div>
                            <div className="product-image-footer">
                                <span><FaRegClock /> Simmered 14 Hours</span>
                                <span>Mesob Addis Recipe #01</span>
                            </div>
                        </div>

                        <div className="product-thumbnails">
                            {galleryImages.map((img, idx) => (
                                <div key={idx} className="thumb">
                                    <img src={img} alt={`${dish.name} view ${idx + 1}`} />
                                </div>
                            ))}
                        </div>


                        <div className="heritage-card">
                            <div className="heritage-header">
                                <span className="heritage-icon">📜</span>
                                <span className="heritage-label">HERITAGE & LINEAGE • The Crown Jewel</span>
                            </div>
                            <h3>Royal Feast of the Highlands</h3>
                            <p>
                                Traditionally reserved for festive holidays such as Fasika a Enkutatash, Doro Wat is the ultimate test of culinary mastery. Each
                                pot demands simmering over 3 kilograms of hand-chopped sweet red onions without a single drop of water, patiently reduced for
                                half a day with our hand-milled berbere spice blend and nit'ir qibe (aromatic clarified butter).
                            </p>
                        </div>

                        <div className="product-facts-row">
                            <div className="fact-box">
                                <span className="fact-label">PREPARATION</span>
                                <span className="fact-value">Slow Stewed</span>
                            </div>
                            <div className="fact-box">
                                <span className="fact-label">ORIGIN</span>
                                <span className="fact-value">Highland Shewa</span>
                            </div>
                            <div className="fact-box">
                                <span className="fact-label">ALLERGENS</span>
                                <span className="fact-value">Poultry, Dairy (Butter)</span>
                            </div>
                        </div>
                    </div>

                    <div className="product-right-col">
                        <div className="product-title-row">
                            <h1>{dish.name}</h1>
                            {dish.amharic && <span className="product-amharic">{dish.amharic}</span>}
                            <span className="product-price-tag">ETB {dish.price}</span>
                        </div>

                        <p className="product-description">{dish.description}</p>

                        <div className="product-quick-facts">
                            <div className="quick-fact">
                                <FaUsers />
                                <div>
                                    <strong>Serves 1-2</strong>
                                    <span>generously</span>
                                </div>
                            </div>
                            <div className="quick-fact">
                                <FaCheck />
                                <div>
                                    <strong>Unlimited table injera</strong>
                                    <span>refill included</span>
                                </div>
                            </div>
                            <div className="quick-fact">
                                <FaInfoCircle />
                                <div>
                                    <strong>Taxes</strong>
                                    <span>included</span>
                                </div>
                            </div>
                        </div>

                        <div className="option-section">
                            <div className="option-header">
                                <h4>1. Heat &amp; Spice Level <GiChiliPepper /></h4>
                                <span className="option-hint">Required</span>
                            </div>
                            <div className="heat-grid">
                                <button
                                    type="button"
                                    className={`heat-card ${heatLevel === 'mild' ? 'active' : ''}`}
                                    onClick={() => setHeatLevel('mild')}
                                >
                                    <div className="heat-top">
                                        <FaLeaf className="heat-icon" />
                                        <span className="heat-ratio">1/3</span>
                                    </div>
                                    <strong>Mild</strong>
                                    <span className="heat-sub">Alicha touch, fragrant cardamoms</span>
                                </button>

                                <button
                                    type="button"
                                    className={`heat-card ${heatLevel === 'traditional' ? 'active' : ''}`}
                                    onClick={() => setHeatLevel('traditional')}
                                >
                                    <div className="heat-top">
                                        <GiChiliPepper className="heat-icon" />
                                        <span className="heat-ratio">2/3</span>
                                    </div>
                                    <strong>Traditional</strong>
                                    <span className="heat-sub">Berbere warmth (Recommended)</span>
                                </button>

                                <button
                                    type="button"
                                    className={`heat-card ${heatLevel === 'fiery' ? 'active' : ''}`}
                                    onClick={() => setHeatLevel('fiery')}
                                >
                                    <div className="heat-top">
                                        <FaFire className="heat-icon" />
                                        <span className="heat-ratio">3/3</span>
                                    </div>
                                    <strong>Fiery Awaze</strong>
                                    <span className="heat-sub">Served with Awaze & Mitmita dip</span>
                                </button>
                            </div>
                        </div>

                        <div className="option-section">
                            <div className="option-header">
                                <h4>2. Traditional Injera Base <GiCookingPot /></h4>
                                <span className="option-hint">Choose 1</span>
                            </div>
                            <div className="injera-list">
                                <button
                                    type="button"
                                    className={`injera-card ${injeraBase === 'standard' ? 'active' : ''}`}
                                    onClick={() => setInjeraBase('standard')}
                                >
                                    <div className="injera-left">
                                        <strong>Standard Teff &amp; Barley Blend</strong>
                                        <span>Spongy, tart sourdough, naturally soft (Traditional)</span>
                                    </div>
                                    <div className="injera-right">
                                        <span className="badge-included">Included</span>
                                    </div>
                                </button>

                                <button
                                    type="button"
                                    className={`injera-card ${injeraBase === 'pure-teff' ? 'active' : ''}`}
                                    onClick={() => setInjeraBase('pure-teff')}
                                >
                                    <div className="injera-left">
                                        <strong>100% Pure Organic Brown Teff</strong>
                                        <span>Naturally 100% Gluten-Free, iron-rich nutty grain</span>
                                    </div>
                                    <div className="injera-right">
                                        <span className="badge-price">+ETB 60</span>
                                    </div>
                                </button>
                            </div>
                        </div>

                        <div className="option-section">
                            <div className="option-header">
                                <h4>3. Complimentary Side Accents</h4>
                                <span className="option-hint">
                                    {sideAccents.length}/2 selected
                                </span>
                            </div>
                            <p className="option-subtext">
                                Select up to 2 artisanal palate companions
                            </p>
                            <div className="accents-grid">

                                <button
                                    type="button"
                                    className={`accent-card ${sideAccents.includes('fresh-ayib') ? 'active' : ''}`}
                                    onClick={() => toggleSideAccent('fresh-ayib')}
                                >
                                    <div className="accent-check">
                                        {sideAccents.includes('fresh-ayib') && <FaCheck />}
                                    </div>
                                    <div className="accent-text">
                                        <strong>Fresh Ayib</strong>
                                        <span>Mild fresh cottage curd</span>
                                    </div>
                                    <span className="accent-price">Free</span>
                                </button>

                                <button
                                    type="button"
                                    className={`accent-card ${sideAccents.includes('stewed-gomen') ? 'active' : ''}`}
                                    onClick={() => toggleSideAccent('stewed-gomen')}
                                >
                                    <div className="accent-check">
                                        {sideAccents.includes('stewed-gomen') && <FaCheck />}
                                    </div>
                                    <div className="accent-text">
                                        <strong>Stewed Gomen</strong>
                                        <span>Garlic-infused collard greens</span>
                                    </div>
                                    <span className="accent-price">Free</span>
                                </button>

                                <button
                                    type="button"
                                    className={`accent-card ${sideAccents.includes('house-awaze') ? 'active' : ''}`}
                                    onClick={() => toggleSideAccent('house-awaze')}
                                >
                                    <div className="accent-check">
                                        {sideAccents.includes('house-awaze') && <FaCheck />}
                                    </div>
                                    <div className="accent-text">
                                        <strong>House Awaze Paste</strong>
                                        <span>Aged tej and berbere sauce</span>
                                    </div>
                                    <span className="accent-price">Free</span>
                                </button>

                                <button
                                    type="button"
                                    className={`accent-card ${sideAccents.includes('extra-braised-egg') ? 'active' : ''}`}
                                    onClick={() => toggleSideAccent('extra-braised-egg')}
                                >
                                    <div className="accent-check">
                                        {sideAccents.includes('extra-braised-egg') && <FaCheck />}
                                    </div>
                                    <div className="accent-text">
                                        <strong>Extra Braised Egg</strong>
                                        <span>Slow cooked in the wat broth</span>
                                    </div>
                                    <span className="accent-price">+ETB 40</span>
                                </button>

                            </div>
                        </div>

                        <div className="qty-cart-row">
                            <div className="qty-control">
                                <button
                                    type="button"
                                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                                    aria-label="Decrease quantity"
                                >
                                    −
                                </button>
                                <span>{quantity}</span>
                                <button
                                    type="button"
                                    onClick={() => setQuantity((q) => q + 1)}
                                    aria-label="Increase quantity"
                                >
                                    +
                                </button>
                            </div>

                            <button
                                className="btn-add-to-cart-main"
                                onClick={handleAddToCart}
                            >
                                <FaShoppingBag /> Add to Order • ETB {dish.price * quantity}
                            </button>
                        </div>

                        <div className="secondary-actions">
                            <button
                                type="button"
                                className="link-action"
                                onClick={() => setSaved((s) => !s)}
                            >
                                {saved ? <FaHeart style={{ color: '#7a1401' }} /> : <FaRegHeart />}
                                {saved ? 'Saved to Favorites' : 'Save to Favorites'}
                            </button>
                            <Link href="/menu" className="link-action">
                                <GiCookingPot /> Order as Group Mesob Feast
                            </Link>
                        </div>
                    </div>

                </div>
            </div>

            {pairings.length > 0 && (
                <section className="pairings-section">
                    <div className="container">
                        <div className="pairings-header">
                            <div>
                                <span className="pairings-label">GURSHA PAIRINGS</span>
                                <h2>Pairs Wonderfully With {dish.name}</h2>
                            </div>
                            <p className="pairings-desc">
                                Harmonize rich, spicy berbere with the cooling sweetness of
                                golden honey wine, refreshing salads, and ceremonial Jebena buna.
                            </p>
                        </div>

                        <div className="pairings-grid">
                            {pairings.map((item) => (
                                <MenuItem
                                    key={item.id}
                                    item={item}
                                    onAdd={() => {
                                        addToCart(item);
                                        showToast(`${item.name} added to your basket`);
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <section className="gursha-band">
                <div className="container">
                    <div className="gursha-band-inner">
                        <span className="gursha-band-icon"><RiHandHeartLine /></span>
                        <div>
                            <h3>The Spirit of Gursha</h3>
                            <p>
                                Sharing a bite directly into a companion's mouth is an act of deep hospitality and bond. Ask your server for communal Mesob presentation.
                            </p>
                        </div>
                        <Link href="/menu" className="gursha-band-btn">
                            Explore Full Feast Menu
                        </Link>
                    </div>
                </div>
            </section>

            <Toast toasts={toasts} onClose={removeToast} />
        </div>
    );
}