import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Providers from './providers';
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="app-container">
            <Navbar />
            <main className="main-content">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}