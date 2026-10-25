import { notFound } from 'next/navigation';
import './DishPage.css';

export async function generateStaticParams() {
    const dishes = ['kitfo', 'shiro', 'doro-wat'];
    return dishes.map((id) => ({ id }));
}

export default async function DishPage({ params }) {
    const { id } = await params;

    const validDishes = ['kitfo', 'shiro', 'doro-wat'];

    if (!validDishes.includes(id)) {
        notFound();
    }

    return (
        <div>
            <h1 className="dish-page-title">{id.replace('-', ' ')}</h1>
            <p className="dish-page-desc">This page was pre-built at build time!</p>
        </div>
    );
}