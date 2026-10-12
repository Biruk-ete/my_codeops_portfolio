import { notFound } from "next/navigation";
import AddToCartButton from "../AddToCartButton";

const DISHES = [
    { id: "kitfo", name: "Kitfo" },
    { id: "shiro", name: "Shiro" },
];

export async function generateStaticParams() {
    return DISHES.map((d) => ({ id: d.id }));
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