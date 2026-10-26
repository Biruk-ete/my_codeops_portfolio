'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import './LoginPage.css';

export default function LoginPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const nextUrl = searchParams.get('next') || '/';

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        if (res.ok) {
            const safeNext = nextUrl.startsWith('/') ? nextUrl : '/';
            router.push(safeNext);
        } else {
            setError('Invalid email or password');
        }
    };

    return (
        <div className="login-wrapper">
            <div className="login-card">
                <h1>Welcome Back</h1>
                <p>Sign in to manage your feasts.</p>

                <form onSubmit={handleLogin} className="login-form">
                    {error && <p className="error-msg">{error}</p>}

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button type="submit" className="btn-submit">Sign In</button>
                </form>

                <p className="register-link">
                    New here? <Link href="/register">Create an account</Link>
                </p>
            </div>
        </div>
    );
}