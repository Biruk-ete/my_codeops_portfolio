import Link from 'next/link';
import './DishList.css';

export default function DishList() {
    return (
        <ul className="dish-list-container">
            <li className="dish-item">
                <Link href="/menu/kitfo" className="dish-link">
                    <h3>Prime Beef Kitfo</h3>
                    <p>Minced lean beef tossed in fiery mitmita...</p>
                    <span>ETB 720</span>
                </Link>
            </li>
            <li className="dish-item">
                <Link href="/menu/shiro" className="dish-link">
                    <h3>Clay-pot Shiro Bozena</h3>
                    <p>Silky spiced chickpea flour stew simmered slowly...</p>
                    <span>ETB 450</span>
                </Link>
            </li>
        </ul>
    );
}