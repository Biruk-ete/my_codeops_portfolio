import Link from 'next/link';
import './NotFound.css';

export default function NotFound() {
    return (
        <div className="notfound-wrapper">
            <div className="notfound-card">
                <h1 className="notfound-title">404</h1>
                <h2 className="notfound-subtitle">TABLE NOT SET • ERROR</h2>
                <p className="notfound-desc">
                    Looks like this dish has already been enjoyed or never made it to the kitchen!
                </p>
                <Link href="/" className="notfound-btn">
                    Return to Home
                </Link>
            </div>
        </div>
    );
}