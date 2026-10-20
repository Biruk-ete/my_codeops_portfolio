import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import CategoryBar from "./CategoryBar";
import FilterShell from "./FilterShell";

export const revalidate = 3600;

async function getDishes() {
    await new Promise((r) => setTimeout(r, 800));
    return [
        {
            id: "kitfo",
            name: "Kitfo",
            image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80"
        },
        {
            id: "shiro",
            name: "Shiro",
            image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80"
        },
    ];
}

export const metadata = {
    title: "Our Menu",
    description: "Browse our full menu of Ethiopian dishes, including Kitfo, Shiro, and Doro Wat.",
    alternates: {
        canonical: "/menu",
    },
};

async function DishList() {
    const dishes = await getDishes();
    return (
        <ul style={{ listStyle: "none", padding: 0, display: "flex", gap: "2rem" }}>
            {dishes.map((d) => (
                <li key={d.id}>
                    <Link href={`/menu/${d.id}`} style={{ textDecoration: "none", color: "black" }}>
                        {/* 👈 2. Replace <img> with <Image> and add width/height */}
                        <Image
                            src={d.image}
                            alt={d.name}
                            width={300}
                            height={200}
                            sizes="(max-width: 768px) 100vw, 300px"
                            style={{ objectFit: "cover", borderRadius: "8px" }}
                        />
                        <h3>{d.name}</h3>
                    </Link>
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