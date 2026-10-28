'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { logout } from '@/app/actions';
import './Navbar.css';

export default function Navbar({ user }) {
    const { getTotalItems } = useCart();
    const cartCount = getTotalItems();
    const pathname = usePathname();

    const isActive = (path) => pathname === path;

    return (
        <nav className="navbar-wrapper">
            <div className="navbar-container">
                <Link
                    href="/"
                    className={`nav-brand ${isActive('/') ? 'active' : ''}`}
                >
                    Mesob House
                </Link>

                <ul className="nav-links">
                    <li>
                        <Link
                            href="/menu"
                            className={isActive('/menu') ? 'active' : ''}
                        >
                            Menu
                        </Link>
                    </li>

                    <li>
                        <Link
                            href="/cart"
                            className={isActive('/cart') ? 'active' : ''}
                        >
                            Cart {cartCount > 0 && `(${cartCount})`}
                        </Link>
                    </li>

                    <li>
                        <Link
                            href="/checkout"
                            className={isActive('/checkout') ? 'active' : ''}
                        >
                            Checkout
                        </Link>
                    </li>

                    {user && (
                        <li>
                            <Link
                                href="/orders"
                                className={isActive('/orders') ? 'active' : ''}
                            >
                                Orders
                            </Link>
                        </li>
                    )}

                    {user && user.role === 'staff' && (
                        <li>
                            <Link
                                href="/kitchen"
                                className={isActive('/kitchen') ? 'active' : ''}
                                style={{ color: 'var(--accent-gold)' }}
                            >
                                Kitchen
                            </Link>
                        </li>
                    )}
                </ul>

                <div className="nav-actions">
                    {user ? (
                        <>
                            <Link
                                href="/profile"
                                className={`sign-in-link ${isActive('/profile') ? 'active' : ''}`}
                            >
                                {user.name}
                            </Link>

                            <form action={logout}>
                                <button type="submit" className="logout-btn">
                                    Logout
                                </button>
                            </form>
                        </>
                    ) : (
                        <>
                            <Link
                                href="/login"
                                className={`sign-in-link ${isActive('/login') ? 'active' : ''}`}
                            >
                                Login
                            </Link>

                            <Link
                                href="/register"
                                className={`register-btn ${isActive('/register') ? 'active' : ''}`}
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}