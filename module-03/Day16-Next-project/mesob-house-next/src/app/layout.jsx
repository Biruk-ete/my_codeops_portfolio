// ✅ No 'use client' here. The root layout runs on the server by default.

import { CartProvider } from '@/context/CartContext';
import { AuthProvider } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';

export const metadata = {
    title: 'Mesob House — Ethiopian Restaurant',
    description: 'Order authentic Ethiopian dishes delivered warm across Addis Ababa.',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" data-scroll-behavior="smooth">
            <body>
                <CartProvider>
                    <AuthProvider>
                        <ScrollToTop />
                        <Navbar />
                        <main>{children}</main>
                        <Footer />
                    </AuthProvider>
                </CartProvider>
            </body>
        </html>
    );
}