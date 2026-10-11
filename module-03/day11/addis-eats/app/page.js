import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <h1>Addis Eats</h1>
      <nav>
        <Link href="/menu">Menu</Link>
      </nav>
    </main>
  );
}