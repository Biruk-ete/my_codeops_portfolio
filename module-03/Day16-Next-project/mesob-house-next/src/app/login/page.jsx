'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

import login_page from '@/Assets/Login_page.png';
import { useAuth } from '@/context/AuthContext';
import './Login.css';

import { FaCoins, FaBolt, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaUser, FaShieldAlt, FaCheckCircle, FaClock, FaPhoneAlt, FaGoogle } from 'react-icons/fa';
import { LuSmartphone } from 'react-icons/lu';

function LoginContent() {
    const { login, continueAsGuest } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();

    const passedName = searchParams.get('name');
    const passedEmail = searchParams.get('email');
    const passedPhone = searchParams.get('phone');
    const redirectTo = searchParams.get('from') || '/';

    const [loginMethod, setLoginMethod] = useState('mobile');

    const [formData, setFormData] = useState({
        phone: passedPhone || '',
        email: passedEmail || '',
        password: '',
        keepSignedIn: false,
        rememberAddress: false,
    });
    const [showPassword, setShowPassword] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    // Automatically switch to email mode if an email was passed
    useEffect(() => {
        if (passedEmail) {
            setLoginMethod('email');
        }
    }, [passedEmail]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        await new Promise((resolve) => setTimeout(resolve, 900));

        const userIdentifier = loginMethod === 'email' ? formData.email : formData.phone;

        login({
            name: passedName || 'Biruk Abera',
            email: userIdentifier,
        });

        setSubmitting(false);

        router.push(redirectTo);
    };

    const handleGuest = () => {
        continueAsGuest();
        const guestRedirect = searchParams.get('from') || '/menu';
        router.push(guestRedirect);
    };

    return (
        <div className="login-page">
            <header className="login-top-nav">
                <div className="login-breadcrumb">
                    <Link href="/">HOME</Link> / <Link href="/account">ACCOUNT</Link> /{' '}
                    <span>SIGN IN</span>
                </div>

                <div className="login-nav-status">
                    <span>Welcome Back to Our Table</span>
                </div>
            </header>

            <div className="login-container">
                <aside className="login-sidebar">
                    <div className="login-sidebar-header">
                        <div className="login-member-badge">
                            <span>MESOB FEAST CIRCLE & PERKS</span>
                        </div>

                        <h1 className="login-sidebar-title">
                            A table shared is a bond celebrated.
                        </h1>

                        <p className="login-sidebar-desc">
                            Sign into your culinary sanctuary. Track your seasonal fasting
                            platters, express your Jebena preferences, and summon traditional
                            Addis feasts straight to your door.
                        </p>
                    </div>

                    <div className="login-featured-card">
                        <div className="login-featured-image">
                            {/* ✅ Added .src for Next.js */}
                            <img
                                src={login_page.src}
                                alt="Featured Mesob Table"
                            />
                        </div>
                    </div>

                    <div className="login-perks-list">
                        <div className="login-perk-card">
                            <div className="login-perk-icon">
                                <FaCoins aria-hidden="true" />
                            </div>

                            <div className="login-perk-content">
                                <h4>10 Gursha Points / ETB 100</h4>
                                <p>
                                    Redeem against rare honey Tej batches or special communal
                                    platters.
                                </p>
                            </div>
                        </div>

                        <div className="login-perk-card">
                            <div className="login-perk-icon">
                                <FaBolt aria-hidden="true" />
                            </div>

                            <div className="login-perk-content">
                                <h4>Free Bole & Kazanchis Delivery</h4>
                                <p>
                                    Priority courier dispatch with heat-insulated clay-stone
                                    trays.
                                </p>
                            </div>
                        </div>

                        <div className="login-perk-card">
                            <div className="login-perk-icon">
                                <LuSmartphone aria-hidden="true" />
                            </div>

                            <div className="login-perk-content">
                                <h4>Instant Telebirr & CBE Birr</h4>
                                <p>
                                    Zero-fee instant table settlement and 1-tap reordering.
                                </p>
                            </div>
                        </div>

                        <div className="sidebar-quote-block">
                            <p className="sidebar-quote-text">
                                "The table ordering is as seamless as eating from our grandmother's mesob."
                            </p>
                            <span className="sidebar-quote-author">
                                DR. SELAMAWIT H. — BOLE MEMBER
                            </span>
                        </div>
                    </div>
                </aside>

                <main className="login-form-section">
                    <div className="login-form-header">
                        <span className="login-form-label">MEMBER PORTAL</span>
                        <h2>Welcome to the Mesob Table</h2>
                        <p>
                            Sign in to manage your feasts, Telebirr rewards, and reserved
                            dining mesobs.
                        </p>
                    </div>

                    <div className="login-social-login">
                        <button
                            type="button"
                            className="login-social-btn login-telebirr"
                        >
                            <span className="login-social-icon">
                                <LuSmartphone aria-hidden="true" />
                            </span>

                            <div className="login-social-text">
                                <span className="login-social-title">
                                    Telebirr SuperApp
                                </span>
                                <span className="login-social-sub">
                                    Scan or Tap to Login
                                </span>
                            </div>

                            <span className="login-arrow" aria-hidden="true">
                                {'>'}
                            </span>
                        </button>

                        <button
                            type="button"
                            className="login-social-btn login-google"
                        >
                            <span className="login-social-icon">
                                <FaGoogle aria-hidden="true" />
                            </span>

                            <div className="login-social-text">
                                <span className="login-social-title">Google Sign-In</span>
                                <span className="login-social-sub">
                                    Continue with Google
                                </span>
                            </div>

                            <span className="login-arrow" aria-hidden="true">
                                {'>'}
                            </span>
                        </button>
                    </div>

                    <div className="login-divider-text">
                        <span>OR WITH PHONE / EMAIL</span>
                    </div>

                    <div className="login-method-toggle">
                        <button
                            type="button"
                            className={loginMethod === 'mobile' ? 'active' : ''}
                            onClick={() => setLoginMethod('mobile')}
                        >
                            Ethiopian Mobile (+251)
                        </button>

                        <button
                            type="button"
                            className={loginMethod === 'email' ? 'active' : ''}
                            onClick={() => setLoginMethod('email')}
                        >
                            Email Address
                        </button>
                    </div>

                    <form onSubmit={handleLogin} className="login-form">
                        {loginMethod === 'mobile' ? (
                            <div className="login-form-group">
                                <div className="login-label-row">
                                    <label htmlFor="login-phone">
                                        Ethiopian Mobile Number
                                    </label>
                                    <span className="login-label-hint">
                                        SMS OTP Supported
                                    </span>
                                </div>

                                <div className="login-input-wrapper login-phone-input">
                                    <span className="login-input-icon">
                                        <FaPhoneAlt aria-hidden="true" />
                                    </span>

                                    <span className="login-country-code">+251</span>

                                    <input
                                        id="login-phone"
                                        type="tel"
                                        name="phone"
                                        placeholder="091 123 4567"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className="login-form-group">
                                <div className="login-label-row">
                                    <label htmlFor="login-email">Email Address</label>
                                </div>

                                <div className="login-input-wrapper">
                                    <span className="login-input-icon">
                                        <FaEnvelope aria-hidden="true" />
                                    </span>

                                    <input
                                        id="login-email"
                                        type="email"
                                        name="email"
                                        placeholder="guest@mesobhouse.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                        )}

                        <div className="login-form-group">
                            <div className="login-label-row">
                                <label htmlFor="login-password">Password</label>
                                <a href="#" className="login-forgot-link">
                                    Forgot Password?
                                </a>
                            </div>

                            <div className="login-input-wrapper">
                                <span className="login-input-icon">
                                    <FaLock aria-hidden="true" />
                                </span>

                                <input
                                    id="login-password"
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    placeholder="Enter your confidential password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />

                                <button
                                    type="button"
                                    className="login-toggle-password"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                >
                                    {showPassword ? (
                                        <FaEyeSlash aria-hidden="true" />
                                    ) : (
                                        <FaEye aria-hidden="true" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="login-checkbox-row">
                            <label className="login-checkbox-label">
                                <input
                                    type="checkbox"
                                    name="keepSignedIn"
                                    checked={formData.keepSignedIn}
                                    onChange={handleChange}
                                />
                                Keep me signed in on this device
                            </label>

                            <label className="login-checkbox-label">
                                <input
                                    type="checkbox"
                                    name="rememberAddress"
                                    checked={formData.rememberAddress}
                                    onChange={handleChange}
                                />
                                Remember Addis address
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="login-submit-btn"
                            disabled={submitting}
                        >
                            {submitting ? 'Signing you in...' : 'Sign in to Mesob House'}
                        </button>
                    </form>

                    <div className="login-register-prompt">
                        <div className="login-prompt-content">
                            <span className="login-prompt-text">
                                New to our dining family?
                            </span>

                            <Link href="/register" className="login-prompt-link">
                                Join the Mesob Table & Register {'>'}
                            </Link>
                        </div>

                        <button onClick={handleGuest} className="login-guest-btn">
                            <span className="login-guest-icon">
                                <FaUser aria-hidden="true" />
                            </span>
                            Continue as Guest
                        </button>
                    </div>
                </main>
            </div>

            <footer className="login-trust-bar">
                <div className="login-trust-item">
                    <span className="login-trust-icon1">
                        <FaShieldAlt aria-hidden="true" />
                    </span>

                    <div>
                        <strong>ENCRYPTED SECURITY</strong>
                        <span>Telebirr PIN & CBE Birr verified</span>
                    </div>
                </div>

                <div className="login-trust-item">
                    <span className="login-trust-icon2">
                        <FaCheckCircle aria-hidden="true" />
                    </span>

                    <div>
                        <strong>FASTING FEASTS</strong>
                        <span>Tsom Beyaynetu on Wed & Fri</span>
                    </div>
                </div>

                <div className="login-trust-item">
                    <span className="login-trust-icon3">
                        <FaClock aria-hidden="true" />
                    </span>

                    <div>
                        <strong>FRESH INJERA STEAM</strong>
                        <span>Baked three times each day</span>
                    </div>
                </div>

                <div className="login-trust-item">
                    <span className="login-trust-icon4">
                        <FaPhoneAlt aria-hidden="true" />
                    </span>

                    <div>
                        <strong>BOLE CONCIERGE</strong>
                        <span>+251911 234 567</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default function Login() {
    return (
        <Suspense fallback={<div style={{ padding: '100px', textAlign: 'center' }}>Loading...</div>}>
            <LoginContent />
        </Suspense>
    );
}