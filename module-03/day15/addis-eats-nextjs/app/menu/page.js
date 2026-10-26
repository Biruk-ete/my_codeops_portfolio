import { Suspense } from 'react';
import FilterShell from './FilterShell';
import './MenuPage.css';

async function getDishes() {
    const res = await fetch('http://localhost:3000/api/dishes', {
        next: { revalidate: 3600 }
    });

    if (!res.ok) {
        throw new Error('Failed to fetch dishes');
    }

    return res.json();
}

export const revalidate = 3600;

export default async function MenuPage() {
    const dishes = await getDishes();

    return (
        <div className="menu-page-container">
            <h1 className="menu-title">Our Complete Culinary Heritage</h1>
            <p className="menu-desc">Every dish is prepared daily from scratch.</p>

            <Suspense fallback={<p className="menu-loading">Loading menu...</p>}>
                <FilterShell initialDishes={dishes} />
            </Suspense>
        </div>
    );
}