'use client';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import './Navbar.css';

export default function Navbar() {
    const { getTotalItems } = useCart();
    const cartCount = getTotalItems();

    return (
        <nav className="navbar-wrapper">
            <div className="navbar-container">
                <Link href="/" className="nav-brand">Mesob House</Link>

                <ul className="nav-links">
                    <li><Link href="/menu">Menu</Link></li>
                    <li>
                        <Link href="/cart">
                            Cart {cartCount > 0 && `(${cartCount})`}
                        </Link>
                    </li>
                    <li><Link href="/checkout">Checkout</Link></li>
                    <li><Link href="/orders">Orders</Link></li>
                </ul>

                <div className="nav-actions">
                    <Link href="/login" className="sign-in-link">Login</Link>
                    <Link href="/register" className="register-btn">Register</Link>
                </div>
            </div>
        </nav>
    );
}