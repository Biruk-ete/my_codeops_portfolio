import Link from 'next/link';
import './DishList.css';

async function getDishes() {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return [
        { id: 'kitfo', name: 'Prime Beef Kitfo', desc: 'Minced lean beef tossed in fiery mitmita...', price: 720 },
        { id: 'shiro', name: 'Clay-pot Shiro Bozena', desc: 'Silky spiced chickpea flour stew...', price: 450 }
    ];
}

export default async function DishList() {
    const dishes = await getDishes();

    return (
        <ul className="dish-list-container">
            {dishes.map(dish => (
                <li className="dish-item" key={dish.id}>
                    <Link href={`/menu/${dish.id}`} className="dish-link">
                        <h3>{dish.name}</h3>
                        <p>{dish.desc}</p>
                        <span>ETB {dish.price}</span>
                    </Link>
                </li>
            ))}
        </ul>
    );
}