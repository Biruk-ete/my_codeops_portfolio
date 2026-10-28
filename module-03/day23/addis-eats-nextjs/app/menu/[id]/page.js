import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { db } from '@/lib/db';
import AddToCartButton from './AddToCartButton';
import './DishPage.css';

export async function generateMetadata({ params }) {
    const { id } = await params;
    const dish = await db.dish.findUnique({ where: { id } });

    if (!dish) {
        return { title: 'Dish Not Found' };
    }

    return {
        title: dish.name,
        description: `Order ${dish.name} for ${dish.price} ETB. ${dish.description}`,
    };
}

export async function generateStaticParams() {
    const dishes = await db.dish.findMany();
    return dishes.map((dish) => ({ id: dish.id }));
}

export default async function DishPage({ params }) {
    const { id } = await params;
    const dish = await db.dish.findUnique({ where: { id } });

    if (!dish) notFound();

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'MenuItem',
        name: dish.name,
        description: dish.description,
        offers: {
            '@type': 'Offer',
            price: dish.price,
            priceCurrency: 'ETB',
        },
        image: dish.image,
    };

    return (
        <div className="dish-detail-container">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <Link href="/menu" className="back-link">Back to Menu</Link>

            <div className="dish-detail-card">
                <div className="dish-image-col">
                    {/* Day 48 optimization: Swapped <img> for <Image /> */}
                    <Image
                        src={dish.image}
                        alt={dish.name}
                        width={600}
                        height={400}
                        className="dish-main-image"
                        priority
                    />
                </div>

                <div className="dish-info-col">
                    {dish.tag && <span className="dish-tag">{dish.tag}</span>}
                    <h1>{dish.name}</h1>
                    <p className="dish-price">ETB {dish.price}</p>
                    <p className="dish-description">{dish.description}</p>

                    {/* Replaced the static button with the functional Client Component */}
                    <AddToCartButton dish={dish} />
                </div>
            </div>
        </div>
    );
}