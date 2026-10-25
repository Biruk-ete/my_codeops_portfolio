import Link from 'next/link';
import './Login.css';

export default function LoginPage() {
    return (
        <div className="login-wrapper">
            <div className="login-card">
                <h1>Welcome to the Mesob Table</h1>
                <p>Sign in to manage your feasts and rewards.</p>

                <form className="login-form">
                    <input type="text" placeholder="Mobile or Email" className="form-input" />
                    <input type="password" placeholder="Password" className="form-input" />

                    <button type="button" className="btn-submit">Sign In</button>
                </form>

                <p className="register-prompt">
                    New to our dining family? <Link href="/register">Join the Mesob Table</Link>
                </p>
            </div>
        </div>
    );
}