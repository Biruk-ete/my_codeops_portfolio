import Link from "next/link";

export const revalidate = 3600; // rebuild at most once per hour

export default async function MenuPage() {
    await new Promise((resolve) => setTimeout(resolve, 500)); // keep the delay for now

    return (
        <>
            <h1>Our menu</h1>
            <ul>
                <li><Link href="/menu/kitfo">Kitfo</Link></li>
                <li><Link href="/menu/shiro">Shiro</Link></li>
            </ul>
        </>
    );
}