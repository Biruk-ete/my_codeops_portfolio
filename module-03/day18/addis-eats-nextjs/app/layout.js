import { Inter, Playfair_Display } from 'next/font/google';
import { getSession } from '@/lib/session';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Providers from './providers';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-serif' });

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