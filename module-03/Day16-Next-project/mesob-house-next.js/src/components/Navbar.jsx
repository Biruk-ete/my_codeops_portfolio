'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FaUtensils } from 'react-icons/fa';

import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import './Navbar.css';

const Navbar = () => {
    const { cart, getTotal } = useCart();
    const { user } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    const totalItems = cart.reduce(
        (sum, item) => sum + item.qty, 0
    );

    const getNavLinkClass = (path) => {
        return pathname === path ? 'nav-link active' : 'nav-link';
    };

    return (
        <nav className="navbar-wrapper">
            <div className="navbar-container">

                <Link href="/" className="nav-brand">
                    <FaUtensils className="brand-icon" />
                    <h1 className="brand-logo"> Mesob <br /> House </h1>
                </Link>

                <ul className="nav-links">
                    <li>
                        <Link href="/menu" className={getNavLinkClass('/menu')}>
                            Menu
                        </Link>
                    </li>

                    <li>
                        <Link href="/specials" className={getNavLinkClass('/specials')}>
                            Featured Dish
                        </Link>
                    </li>

                    <li>
                        <Link href="/cart" className={getNavLinkClass('/cart')}>
                            Order & Cart
                        </Link>
                    </li>

                    <li>
                        <Link href="/checkout" className={getNavLinkClass('/checkout')}>
                            Delivery & Checkout
                        </Link>
                    </li>
                </ul>

                <div className="nav-actions">
                    {totalItems > 0 && (
                        <Link href="/cart" className="cart-widget">
                            <div className="cart-badge">
                                <span className="cart-count"> {totalItems} </span>

                                <span className="cart-text">
                                    {totalItems === 1 ? 'item' : 'items'}
                                </span>
                            </div>

                            <div className="cart-total">
                                <span className="currency">ETB</span>

                                <span className="amount">
                                    {getTotal().toLocaleString()}
                                </span>
                            </div>
                        </Link>
                    )}

                    {totalItems > 0 && (
                        <div className="nav-divider"></div>
                    )}

                    {user && !user.isGuest ? (
                        <Link href="/account" className="user-profile">
                            <div className="user-avatar">
                                {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                            </div>

                            <div className="user-info">
                                <div className="user-welcome">Welcome</div>
                                <div className="user-name">{user.name}</div>
                            </div>
                        </Link>
                    ) : user && user.isGuest ? (
                        <div className="user-profile guest-profile">
                            <div className="user-avatar guest-avatar">G</div>
                            <div className="user-info">
                                <div className="user-welcome">Guest Mode</div>
                                <Link href="/register" className="user-name guest-link">
                                    Sign Up →
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className="auth-links">
                            <button
                                type="button"
                                className={`sign-in-link ${pathname === '/login' ? 'active' : ''}`}
                                onClick={() => router.push('/login')}
                            >
                                Sign In
                            </button>

                            <button
                                type="button"
                                className={`register-btn ${pathname === '/register' ? 'active' : ''}`}
                                onClick={() => router.push('/register')}
                            >
                                Register
                            </button>
                        </div>
                    )}
                </div>

            </div>
        </nav>
    );
};

export default Navbar;