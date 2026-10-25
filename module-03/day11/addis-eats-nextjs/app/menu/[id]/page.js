import { notFound } from 'next/navigation';

export default function DishPage({ params }) {
    const { id } = params;

    const validDishes = ['kitfo', 'shiro'];

    if (!validDishes.includes(id)) {
        notFound();
    }

    return (
        <div style={{ padding: '60px' }}>
            <h1 style={{ textTransform: 'capitalize' }}>{id}</h1>
            <p>This is the dynamic page for the dish: <strong>{id}</strong></p>
        </div>
    );
}