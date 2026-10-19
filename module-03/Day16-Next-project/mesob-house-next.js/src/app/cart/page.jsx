'use client';

import React, { useState } from 'react';
import Link from 'next/link';

import { useCart } from '@/context/CartContext';
import './Cart.css';

import { FaTruck, FaArrowRight, FaRegHeart, FaCheckCircle, FaTrashAlt, FaInfoCircle, FaTicketAlt, FaLeaf } from 'react-icons/fa';
import { GiKnifeFork } from 'react-icons/gi';
import { MdSoupKitchen, MdEnhancedEncryption, MdCoffee } from 'react-icons/md';
import { FaMoneyBills } from "react-icons/fa6";

export default function Cart() {
    const { cart, getTotal, updateQty, removeFromCart, clearCart } = useCart();

    const [couponCode, setCouponCode] = useState('');
    const [includeHandwash, setIncludeHandwash] = useState(true);
    const [noCutlery, setNoCutlery] = useState(true);
    const [chefNote, setChefNote] = useState('');

    const subtotal = getTotal();
    const injeraUpgrade = cart.length > 0 ? 60 : 0;
    const clayPak = cart.length > 0 ? 40 : 0;
    const vat = Math.round(subtotal * 0.15);
    const gurshaDiscount = cart.length > 0 ? 200 : 0;
    const grandTotal = subtotal + injeraUpgrade + clayPak + vat - gurshaDiscount;

    const totalItems = cart.reduce((sum, item) => sum + (item.qty || 1), 0);

    return (
        <div className="cart-page">
            <div className="cart-top-section">
                <div className="container">

                    <div className="cart-banner">
                        <div className="cart-banner-content">
                            <span className="cart-banner-icon"><FaTruck /></span>
                            <span><strong>Free Highland Delivery:</strong> Complimentary delivery across Bole, Kazanchis, and Sarbet on orders over ETB 1,200!</span>
                        </div>
                        <div className="cart-banner-badge">
                            <FaCheckCircle /> THRESHOLD UNLOCKED
                        </div>
                    </div>

                    <div className="cart-header">
                        <div className="cart-header-left">
                            <span className="cart-label">COMMUNAL FEASTING</span>
                            <h1>Your Gursha Basket</h1>
                        </div>

                        <div className="cart-stepper">
                            <div className="step active">
                                <span className="step-num">1</span> Review Basket
                            </div>
                            <span className="step-divider">/</span>
                            <div className="step">
                                <span className="step-num">2</span> Delivery Details
                            </div>
                            <span className="step-divider">/</span>
                            <div className="step">
                                <span className="step-num">3</span> Confirmation
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/*main*/}
            <div className="container py-8">
                <div className="cart-layout">
                    <div className="cart-main-col">
                        <div className="cart-section-header">
                            <h2>Clay Pot Stews & Provisions <span>({totalItems} handcrafted selections)</span></h2>
                            {cart.length > 0 && (
                                <button
                                    className="clear-table-btn"
                                    onClick={clearCart}
                                >
                                    <FaTrashAlt /> Clear Table
                                </button>
                            )}
                        </div>

                        <div className="cart-items-list">
                            {cart.length === 0 ? (
                                <div className="empty-cart">
                                    <p>Your Gursha Basket is empty.</p>
                                    <Link href="/menu" className="btn-primary">Explore the Menu</Link>
                                </div>
                            ) : (
                                cart.map((item) => (
                                    <div className="cart-item" key={item.id}>
                                        <div className="cart-item-image">
                                            <img src={item.image} alt={item.name} />
                                        </div>

                                        <div className="cart-item-details">
                                            <div className="cart-item-tags">
                                                {item.tags?.map(tag => (
                                                    <span key={tag} className={`item-tag ${tag.includes('🔥') ? 'spicy' : ''}`}>{tag}</span>
                                                ))}
                                            </div>
                                            <h3 className="cart-item-title">
                                                {item.name} <span className="item-amharic">{item.amharic}</span>
                                            </h3>
                                            <p className="cart-item-desc">{item.desc || item.description}</p>
                                        </div>

                                        <div className="cart-item-actions">
                                            <span className="item-price-top">ETB {item.price}</span>
                                            <div className="quantity-control">
                                                <button
                                                    type="button"
                                                    onClick={() => updateQty(item.id, 'dec')}
                                                    aria-label="Decrease quantity"
                                                >
                                                    -
                                                </button>
                                                <span>{item.qty}</span>
                                                <button
                                                    type="button"
                                                    onClick={() => updateQty(item.id, 'inc')}
                                                    aria-label="Increase quantity"
                                                >
                                                    +
                                                </button>
                                            </div>
                                            <button
                                                className="btn-remove"
                                                onClick={() => removeFromCart(item.id)}
                                                aria-label="Remove item"
                                            >
                                                <FaTrashAlt />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        <div className="hospitality-section">
                            <div className="hospitality-header">
                                <FaLeaf /> <h3>Gursha Hospitality & Dining Etiquette</h3>
                            </div>

                            <div className="hospitality-options">
                                <label className="checkbox-card">
                                    <input
                                        type="checkbox"
                                        checked={includeHandwash}
                                        onChange={(e) => setIncludeHandwash(e.target.checked)}
                                    />
                                    <div className="checkbox-content">
                                        <div className="checkbox-title">
                                            <span className="square-marker red"></span> Include Traditional Handwash Basin
                                        </div>
                                        <p>Scented warm lemon towels and hand-rinsing urn presentation.</p>
                                    </div>
                                </label>

                                <label className="checkbox-card">
                                    <input
                                        type="checkbox"
                                        checked={noCutlery}
                                        onChange={(e) => setNoCutlery(e.target.checked)}
                                    />
                                    <div className="checkbox-content">
                                        <div className="checkbox-title">
                                            <span className="square-marker red"></span> No Cutlery Needed (True Gursha)
                                        </div>
                                        <p>We embrace the communal joy of eating with fresh injera rolls.</p>
                                    </div>
                                </label>
                            </div>

                            <div className="chef-note-section">
                                <div className="chef-note-header">
                                    <label>Kitchen Chef Note / Injera Separation Preference</label>
                                    <span>Optional</span>
                                </div>
                                <textarea
                                    placeholder="E.g., Please wrap extra Teff rolls in heat-retaining gold foil separately from the Doro Wat pot..."
                                    value={chefNote}
                                    onChange={(e) => setChefNote(e.target.value)}
                                    rows={3}
                                ></textarea>
                            </div>
                        </div>

                        <div className="gursha-meaning-card">
                            <div className="meaning-icon">
                                <FaRegHeart />
                            </div>
                            <div>
                                <h4>The Meaning of Gursha</h4>
                                <p>In Habesha dining culture, placing a savory morsel directly into a companion's mouth with love cements friendship, trust, and shared celebration. Every platter at Mesob House is prepared ready for Gursha.</p>
                            </div>
                        </div>

                    </div>

                    <div className="cart-side-col">

                        <div className="basket-ledger">
                            <div className="ledger-header">
                                <h3>Basket Ledger</h3>
                                <span className="currency-badge">Birr (ETB)</span>
                            </div>

                            <div className="ledger-rows">
                                <div className="ledger-row">
                                    <span>Items Subtotal ({totalItems} items)</span>
                                    <span className="ledger-val">ETB {subtotal.toLocaleString()}</span>
                                </div>
                                <div className="ledger-row">
                                    <span>100% Teff Injera Upgrade <FaInfoCircle className="info-icon" /></span>
                                    <span className="ledger-val">ETB {injeraUpgrade}</span>
                                </div>
                                <div className="ledger-row">
                                    <span>Insulated Traditional Clay-Pak</span>
                                    <span className="ledger-val">ETB {clayPak}</span>
                                </div>
                                <div className="ledger-row">
                                    <span className="free-green"><FaTruck /> Delivery Fee (Bole Zone)</span>
                                    <span className="ledger-val free">FREE</span>
                                </div>
                                <div className="ledger-row">
                                    <span>City VAT & Tourism Levy (15%)</span>
                                    <span className="ledger-val">ETB {vat}</span>
                                </div>
                            </div>

                            <div className="discount-applied">
                                <span className="ticket"><FaTicketAlt /> GURSHA 2025 APPLIED</span>
                                <span className="discount-val">- ETB {gurshaDiscount}</span>
                            </div>

                            <div className="coupon-input-wrapper">
                                <input
                                    type="text"
                                    placeholder="Have another coupon code?"
                                    value={couponCode}
                                    onChange={(e) => setCouponCode(e.target.value)}
                                />
                                <button type="button">Apply</button>
                            </div>

                            <div className="grand-total-block">
                                <div className="grand-total-label">
                                    <span>GRAND TOTAL</span>
                                    <span className="tax-label">Taxes included</span>
                                </div>
                                <div className="grand-total-value">ETB {grandTotal.toLocaleString()}</div>
                            </div>

                            {cart.length > 0 ? (
                                <Link href="/checkout" className="btn-checkout">
                                    Proceed to Delivery Checkout <FaArrowRight />
                                </Link>
                            ) : (
                                <Link href="/menu" className="btn-checkout-empty">
                                    Browse the Menu to Start an Order <FaArrowRight />
                                </Link>
                            )}
                            <Link href="/menu" className="link-explore">
                                <GiKnifeFork /> Explore more dishes from our Menu
                            </Link>
                        </div>

                        <div className="trust-badges">
                            <div className="trust-badge">
                                <span className="badge-icon1"><MdSoupKitchen /></span>
                                <div>
                                    <strong>Piping Warm Delivery</strong>
                                    <span>in woven Mesob packaging</span>
                                </div>
                            </div>
                            <div className="trust-badge">
                                <span className="badge-icon2"><FaMoneyBills /></span>
                                <div>
                                    <strong>Telebirr, CBE Birr, Cash & Card</strong>
                                    <span>on delivery</span>
                                </div>
                            </div>
                            <div className="trust-badge">
                                <span className="badge-icon3"><MdEnhancedEncryption /></span>
                                <div>
                                    <strong>Encrypted checkout</strong>
                                    <span>& real-time dispatcher SMS</span>
                                </div>
                            </div>
                        </div>

                        <div className="buna-upsell">
                            <div className="buna-icon">
                                <MdCoffee />
                            </div>
                            <div className="buna-content">
                                <h4>Adding Fresh Jebena Buna?</h4>
                                <p>Complement your feast with our 4:00 PM ritual roasted coffee beans with frankincense aroma.</p>
                                <button className="btn-add-buna" type="button">ADD TO ORDER <FaArrowRight /></button>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
}