import { Providers } from "./providers";
import Link from "next/link";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>

        <header style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
          <nav style={{ display: "flex", gap: "1rem" }}>
            <Link href="/">Addis Eats</Link>
            <Link href="/menu">Menu</Link>
            <Link href="/cart">Cart</Link>
            <Link href="/checkout">Checkout</Link>
          </nav>
        </header>
        <Providers>

          <main style={{ padding: "1rem" }}>{children}</main>

        </Providers>

        <footer style={{ padding: "1rem", borderTop: "1px solid #ccc" }}>
          © Addis Eats
        </footer>
      </body>
    </html>
  );
}