import { Suspense } from 'react';
import FilterShell from './FilterShell';
import { db } from '@/lib/db';

export default async function MenuPage() {
    const dishes = await db.dish.findMany();

    return (
        <div>
            <h1 style={{ fontFamily: 'Playfair Display, serif', color: '#7a1401', fontSize: '36px', marginBottom: '10px' }}>
                Our Complete Culinary Heritage
            </h1>
            <p style={{ color: '#58413d', marginBottom: '32px' }}>
                Every dish is prepared daily from scratch.
            </p>

            <Suspense fallback={<p>Loading menu...</p>}>
                <FilterShell initialDishes={dishes} />
            </Suspense>
        </div>
    );
}