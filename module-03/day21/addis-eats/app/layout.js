import { Providers } from "./providers";
import Link from "next/link";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata = {
  metadataBase: new URL("http://localhost:3000"), 
  title: {
    template: "%s | Addis Eats",
    default: "Addis Eats | Food Delivery in Addis Ababa",
  },
  description: "Order Doro Wat, Tibs, Kitfo and Shiro from kitchens in Bole and Kazanchi. Delivery across Addis Ababa.",
  openGraph: {
    type: "website",
    locale: "en_ET",
    siteName: "Addis Eats",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
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