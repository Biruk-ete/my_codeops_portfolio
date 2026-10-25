import { Suspense } from 'react';
import DishList from './DishList';
import './Menu.css';

export const revalidate = 3600;

export default function MenuPage() {
    return (
        <>
            <h1 className="menu-title">Our Complete Culinary Heritage</h1>
            <p className="menu-desc">Every dish is prepared daily from scratch.</p>

            <Suspense fallback={<p className="menu-loading-fallback">Loading delicious dishes...</p>}>
                <DishList />
            </Suspense>
        </>
    );
}