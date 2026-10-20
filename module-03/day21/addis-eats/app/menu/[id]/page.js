import { notFound } from "next/navigation";
import AddToCartButton from "../AddToCartButton";

const DISHES = [
    { id: "kitfo", name: "Kitfo", price: 320, summary: "Minced beef with mitmita." },
    { id: "shiro", name: "Shiro", price: 180, summary: "Chickpea stew." },
];

// 👇 ADD THIS
export async function generateMetadata({ params }) {
    const { id } = await params;
    const dish = DISHES.find((d) => d.id === id);

    if (!dish) {
        return { title: "Dish Not Found" };
    }

    return {
        title: dish.name,
        description: `${dish.name} - ${dish.price} ETB. ${dish.summary}`,
        openGraph: {
            title: `${dish.name} - Addis Eats`,
            description: `${dish.summary} Order now for ${dish.price} ETB.`,
        },
    };
}

export default async function DishPage({ params }) {
    const { id } = await params;
    const dish = DISHES.find((d) => d.id === id);
    if (!dish) notFound();

    return (
        <>
            <h1>Dish: {dish.name}</h1>
            <AddToCartButton dish={dish} />
        </>
    );
}