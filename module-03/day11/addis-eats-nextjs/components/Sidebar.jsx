'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import './Sidebar.css';

export default function Sidebar() {
    const pathname = usePathname();
    const links = [
        { name: 'Menu', path: '/menu' },
        { name: 'Orders', path: '/orders' },
        { name: 'Profile', path: '/profile' },
    ];

    return (
        <aside className="sidebar">
            <h3 className="sidebar-title">MESOB FEAST CIRCLE</h3>
            <ul className="sidebar-list">
                {links.map((link) => (
                    <li key={link.path}>
                        <Link
                            href={link.path}
                            className={`sidebar-link ${pathname === link.path ? 'active' : ''}`}
                        >
                            {link.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </aside>
    );
}