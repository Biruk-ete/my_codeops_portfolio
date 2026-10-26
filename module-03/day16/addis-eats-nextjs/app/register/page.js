import Link from 'next/link';
import './Register.css';

export default function RegisterPage() {
    return (
        <div className="register-wrapper">
            <div className="register-card">
                <h1>Create Your Mesob House Account</h1>
                <p>Join our culinary heritage circle in less than a minute.</p>

                <form className="register-form">
                    <input type="text" placeholder="Full Name" className="form-input" />
                    <input type="tel" placeholder="Ethiopian Mobile Number" className="form-input" />
                    <input type="email" placeholder="Email Address" className="form-input" />
                    <input type="password" placeholder="Password" className="form-input" />

                    <button type="button" className="btn-submit">Create Account</button>
                </form>

                <p className="login-prompt">
                    Already part of our dining family? <Link href="/login">Sign in here</Link>
                </p>
            </div>
        </div>
    );
}