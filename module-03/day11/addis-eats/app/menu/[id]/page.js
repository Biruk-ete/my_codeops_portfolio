import { notFound } from "next/navigation";

const VALID = ["kitfo", "shiro"];

export default async function DishPage({ params }) {
    const { id } = await params;
    if (!VALID.includes(id)) notFound();
    return <h1>Dish: {id}</h1>;
}

