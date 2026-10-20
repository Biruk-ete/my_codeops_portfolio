import Link from "next/link";
import { Suspense } from "react";

export const revalidate = 3600;

async function DishList() {
  await new Promise((r) => setTimeout(r, 2000));
  return (
    <ul>
      <li><Link href="/menu/kitfo">Kitfo</Link></li>
      <li><Link href="/menu/shiro">Shiro</Link></li>
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
      <Suspense fallback={<DishSkeleton />}>
        <DishList />
      </Suspense>
    </>
  );
}