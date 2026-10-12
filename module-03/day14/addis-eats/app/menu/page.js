import Link from "next/link";
import { Suspense } from "react";
import CategoryBar from "./CategoryBar";
import FilterShell from "./FilterShell";

export const revalidate = 3600;

async function getDishes() {
    await new Promise((r) => setTimeout(r, 800));
    return [
        { id: "kitfo", name: "Kitfo" },
        { id: "shiro", name: "Shiro" },
    ];
}

async function DishList() {
    const dishes = await getDishes();
    return (
        <ul>
            {dishes.map((d) => (
                <li key={d.id}>
                    <Link href={`/menu/${d.id}`}>{d.name}</Link>
                </li>
            ))}
        </ul>
    );
}

function DishSkeleton() {
    return <p>Loading dishes…</p>;
}

export default function MenuPage() {
    return (
        <>
            <h1>Our menu</h1>
            <CategoryBar />
            <FilterShell>
                <Suspense fallback={<DishSkeleton />}>
                    <DishList />
                </Suspense>
            </FilterShell>
        </>
    );
}