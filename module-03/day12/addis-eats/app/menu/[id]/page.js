import { notFound } from "next/navigation";

const DISHES = [
    { id: "kitfo", name: "Kitfo" },
    { id: "shiro", name: "Shiro" },
    // add more if you like
];

export async function generateStaticParams() {
    return DISHES.map((d) => ({ id: d.id }));
}

export default async function DishPage({ params }) {
    const { id } = await params;
    const dish = DISHES.find((d) => d.id === id);
    if (!dish) notFound();
    return <h1>Dish: {dish.name}</h1>;
}