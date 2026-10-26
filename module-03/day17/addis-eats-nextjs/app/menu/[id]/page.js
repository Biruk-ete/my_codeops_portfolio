import { notFound } from 'next/navigation';
import Link from 'next/link';
import { db } from '@/lib/db';
import './DishPage.css'; 

export async function generateStaticParams() {
    const dishes = await db.dish.findMany();
    return dishes.map((dish) => ({ id: dish.id }));
}

export default async function DishPage({ params }) {
    const { id } = await params;
    const dish = await db.dish.findUnique({ where: { id } });

    if (!dish) notFound();

    return (
        <div className="dish-detail-container">
            <Link href="/menu" className="back-link">← Back to Menu</Link>

            <div className="dish-detail-card">
                <div className="dish-image-col">
                    <img src={dish.image} alt={dish.name} className="dish-main-image" />
                </div>

                <div className="dish-info-col">
                    {dish.tag && <span className="dish-tag">{dish.tag}</span>}
                    <h1>{dish.name}</h1>
                    <p className="dish-price">ETB {dish.price}</p>
                    <p className="dish-description">{dish.description}</p>
                    <button className="btn-add-large">+ Add to Order</button>
                </div>
            </div>
        </div>
    );
}