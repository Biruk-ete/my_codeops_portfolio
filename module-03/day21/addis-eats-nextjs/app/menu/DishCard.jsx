'use client';

import Image from 'next/image';
import Link from 'next/link';
import './DishCard.css';

export default function DishCard({ dish, onAdd, priority }) {
    return (
        <div className="menu-card">
            <div className="menu-card-image-wrapper">
                <Link href={`/menu/${dish.id}`}>
                    <Image
                        src={dish.image}
                        alt={dish.name}
                        width={400}
                        height={300}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        className="menu-card-image"
                        priority={priority}
                    />
                </Link>
                {dish.tag && <span className="menu-card-tag">{dish.tag}</span>}
            </div>

            <div className="menu-card-content">
                <Link href={`/menu/${dish.id}`} className="menu-card-title-link">
                    <h3 className="menu-card-title">{dish.name}</h3>
                </Link>

                <div className="menu-card-spice">
                    <span>{dish.spiceLevel}</span>
                </div>

                <div className="menu-card-footer">
                    <span className="menu-card-price">ETB {dish.price}</span>
                    <button className="menu-card-add-btn" onClick={() => onAdd(dish)}>
                        + Add
                    </button>
                </div>
            </div>
        </div>
    );
}