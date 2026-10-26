'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import './RegisterPage.css';

export default function RegisterPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });

    const handleRegister = (e) => {
        e.preventDefault();
        alert("Registration successful! Please log in.");
        router.push('/login');
    };

    return (
        <div className="register-wrapper">
            <div className="register-card">
                <h1>Create Account</h1>
                <p className="register-subtitle">Join the Mesob House family</p>

                <form onSubmit={handleRegister} className="register-form">
                    <input
                        type="text"
                        className="form-input"
                        placeholder="Full Name"
                        required
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                    <input
                        type="email"
                        className="form-input"
                        placeholder="Email"
                        required
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    <input
                        type="password"
                        className="form-input"
                        placeholder="Password"
                        required
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                    <button type="submit" className="btn-submit">Create Account</button>
                </form>

                <p className="login-prompt">
                    Already have an account? <Link href="/login">Sign In</Link>
                </p>
            </div>
        </div>
    );
}