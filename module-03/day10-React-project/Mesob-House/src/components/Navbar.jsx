import React from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { FaUtensils } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
    const { cart, getTotal } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const totalItems = cart.reduce(
        (sum, item) => sum + item.qty, 0
    );

    const getNavLinkClass = ({ isActive }) => isActive ? 'nav-link active' : 'nav-link';

    return (
        <nav className="navbar-wrapper">
            <div className="navbar-container">

                <Link to="/" className="nav-brand">
                    <FaUtensils className="brand-icon" />
                    <h1 className="brand-logo"> Mesob <br /> House </h1>
                </Link>

                <ul className="nav-links">
                    <li>
                        <NavLink to="/menu" className={getNavLinkClass}>
                            Menu
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/specials" className={getNavLinkClass}>
                            Featured Dish
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/cart" className={getNavLinkClass}>
                            Order & Cart
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/checkout" className={getNavLinkClass}>
                            Delivery & Checkout
                        </NavLink>
                    </li>
                </ul>

                <div className="nav-actions">
                    {totalItems > 0 && (
                        <Link to="/cart" className="cart-widget">
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

                    {/* Authentication */}
                    {user && !user.isGuest ? (
                        /* Logged-in real user → link to account */
                        <Link to="/account" className="user-profile">
                            <div className="user-avatar">
                                {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                            </div>

                            <div className="user-info">
                                <div className="user-welcome">Welcome</div>
                                <div className="user-name">{user.name}</div>
                            </div>
                        </Link>
                    ) : user && user.isGuest ? (
                        /* Guest mode → prompt to sign up */
                        <div className="user-profile guest-profile">
                            <div className="user-avatar guest-avatar">G</div>
                            <div className="user-info">
                                <div className="user-welcome">Guest Mode</div>
                                <Link to="/register" className="user-name guest-link">
                                    Sign Up →
                                </Link>
                            </div>
                        </div>
                    ) : (
                        /* Not logged in → show Sign In / Register */
                        <div className="auth-links">
                            <button
                                type="button"
                                className={`sign-in-link ${location.pathname === '/login' ? 'active' : ''}`}
                                onClick={() => navigate('/login')}
                            >
                                Sign In
                            </button>

                            <button
                                type="button"
                                className={`register-btn ${location.pathname === '/register' ? 'active' : ''}`}
                                onClick={() => navigate('/register')}
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