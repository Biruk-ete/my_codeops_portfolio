import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUtensils, FaUtensils as FaFork, FaMugHot, FaShareAlt } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import './Footer.css';

const Footer = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const year = new Date().getFullYear();

    return (
        <footer className="footer-wrapper">
            <div className="footer-container">
                <div className="footer-col footer-brand">
                    <h2 className="footer-title">Mesob House</h2>
                    <p>
                        Sharing traditions from the Ethiopian
                        highlands — one Gursha at a time.
                    </p>

                    <div className="coffee-note">
                        <FaMugHot className="coffee-icon" />
                        <span>
                            Traditional Coffee Ceremony daily
                            <br />
                            at 4:00 PM
                        </span>
                    </div>
                </div>

                <div className="footer-col">
                    <h3 className="footer-heading">HOSPITALITY HOURS</h3>
                    <p>Tuesday - Sunday: 11:30 AM - 11:00 PM</p>
                    <p>Monday: Reserved for Private Banquets</p>
                    <p className="highlight">Jebena Buna &amp; Fresh Roasting All Evening</p>
                </div>

                {/* 3. conditional */}
                {user ? (
                    // Logged in → DIETARY TRADITIONS
                    <div className="footer-col">
                        <h3 className="footer-heading">DIETARY TRADITIONS</h3>
                        <p>Vegan Fasting (Beyaynetu / Tsom)</p>
                        <p>Traditional Prime Meat Feasts</p>
                        <p>House Tej (Pure Honey Wine)</p>
                        <p>Jebena Buna Roasting Ceremony</p>
                    </div>
                ) : (
                    // Logged out → GUEST ACCOUNT & TRADITIONS
                    <div className="footer-col">
                        <h3 className="footer-heading">GUEST ACCOUNT &amp; TRADITIONS</h3>
                        <button
                            type="button"
                            className="footer-link"
                            onClick={() => navigate('/login')}
                        >
                            Sign In to Mesob Rewards
                        </button>
                        <button
                            type="button"
                            className="footer-link"
                            onClick={() => navigate('/register')}
                        >
                            Create Member Profile
                        </button>
                        <p>Vegan Fasting (Beyaynetu / Tsom)</p>
                        <p>House Tej (Pure Honey Wine)</p>
                    </div>
                )}

                <div className="footer-col">
                    <h3 className="footer-heading">ADDIS LOCATION</h3>
                    <p>
                        Bole Medhanialem, Addis Ababa &amp;
                        express delivery across town.
                    </p>
                    <p className="phone">+251 911 234 567</p>

                    <div className="footer-icons">
                        <FaFork />
                        <FaMugHot />
                        <FaShareAlt />
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>© {year} Mesob House Habesha Dining. Authentic Ethiopian &amp; Eritrean Heritage.</p>
                <div className="footer-bottom-links">
                    <span>Gursha Hospitality</span>
                    <span>Privacy Policy</span>
                    <span>Terms of Table</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;