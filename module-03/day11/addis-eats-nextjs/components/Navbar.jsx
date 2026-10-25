'use client';
import Link from 'next/link';
import './Navbar.css';

export default function Navbar() {
    return (
        <nav className="navbar-wrapper">
            <div className="navbar-container">
                <Link href="/" className="nav-brand">
                    <h1 className="brand-logo">Mesob <br /> House</h1>
                </Link>
                <ul className="nav-links">
                    <li><Link href="/menu">Menu</Link></li>
                    <li><Link href="/cart">Cart</Link></li>
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