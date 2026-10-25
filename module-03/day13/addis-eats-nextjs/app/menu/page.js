import { Suspense } from 'react';
import FilterShell from './FilterShell';
import './MenuPage.css';

async function getDishes() {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return [
        { id: 'kitfo', name: 'Prime Beef Kitfo', price: 720, category: 'Tibs' },
        { id: 'shiro', name: 'Clay-pot Shiro Bozena', price: 450, category: 'Stews' },
        { id: 'doro', name: 'Special Doro Wat', price: 650, category: 'Stews' }
    ];
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