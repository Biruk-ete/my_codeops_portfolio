import Link from "next/link";

export default async function MenuPage() {
    //fake 2-second delay so we can SEE loading.js
    await new Promise((resolve) => setTimeout(resolve, 2000));

    return (
        <main>
            <h1>Our menu</h1>
            <ul>
                <li><Link href="/menu/kitfo">Kitfo</Link></li>
                <li><Link href="/menu/shiro">Shiro</Link></li>
            </ul>
        </main>
    );
}