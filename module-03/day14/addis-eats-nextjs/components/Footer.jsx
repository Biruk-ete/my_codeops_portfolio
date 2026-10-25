import './Footer.css';

export default function Footer() {
    return (
        <footer className="footer">
            <p>© {new Date().getFullYear()} Addis Eats. Bringing Ethiopian Delights to Your Table.</p>
        </footer>
    );
}