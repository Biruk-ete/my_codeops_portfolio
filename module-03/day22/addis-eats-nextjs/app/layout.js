import { Inter, Playfair_Display } from 'next/font/google';
import { getSession } from '@/lib/session';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Providers from './providers';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-serif' });

export const metadata = {
  metadataBase: new URL('https://mesobhouse.vercel.app'),
  title: {
    template: '%s | Mesob House',
    default: 'Mesob House - Authentic Ethiopian Culinary Experience',
  },
  description: 'Order authentic Ethiopian dishes like Doro Wat, Tibs, and Kitfo delivered fresh across Addis Ababa.',
  openGraph: {
    title: 'Mesob House',
    description: 'Authentic Ethiopian food delivered fresh.',
    url: 'https://mesobhouse.vercel.app',
    siteName: 'Mesob House',
    locale: 'en_ET',
    type: 'website',
  },
};


export default async function RootLayout({ children }) {
  const user = await getSession();

  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="app-container">
            <Navbar user={user} />
            <main className="main-content">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}