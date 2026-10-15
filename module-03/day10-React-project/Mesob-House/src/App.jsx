import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider, useAuth } from './context/AuthContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Loader from './components/Loader';
import ErrorBoundary from './components/ErrorBoundary';
import ScrollToTop from './components/ScrollToTop';

import Home from './pages/Home';
import FullMenu from './pages/FullMenu';
import Cart from './pages/Cart';
import RoyalDoroWat from './pages/RoyalDoroWat';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { NotFound } from './pages/NotFound';

import { RequireAuth } from './auth/RequireAuth';
import Account from './pages/Account';

const Checkout = lazy(() => import('./pages/Checkout'));

const FirstVisitRedirect = () => {
  const { user } = useAuth();
  const hasVisited = sessionStorage.getItem('hasVisited');

  if (!hasVisited && !user) {
    sessionStorage.setItem('hasVisited', 'true');
    return <Navigate to="/register" replace />;
  }

  return <Home />;
};

const LazyFallback = () => (
  <div style={{ padding: '80px 20px', minHeight: '60vh' }}>
    <Loader message="Preparing your checkout..." />
  </div>
);

function App() {
  return (
    <CartProvider>
      <AuthProvider>
        <Router>
          <ScrollToTop />
          <div className="flex flex-col" style={{ minHeight: '100vh' }}>
            <Navbar />
            <main style={{ flexGrow: 1 }}>
              <ErrorBoundary>
                <Suspense fallback={<LazyFallback />}>
                  <Routes>
                    {/* Public routes */}
                    <Route path="/" element={<FirstVisitRedirect />} />
                    <Route path="/menu" element={<FullMenu />} />
                    <Route path="/specials" element={<FullMenu />} />
                    <Route path="/menu/:id" element={<RoyalDoroWat />} />
                    <Route path="/cart" element={<Cart />} />

                    {/* Guarded routes — guests allowed */}
                    <Route path="/checkout" element={<RequireAuth allowGuests={true}> <Checkout /> </RequireAuth>} />

                    {/* Auth pages */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    <Route path="/account" element={<RequireAuth allowGuests={false}> <Account />\ </RequireAuth>} />

                    {/* 404 catch-all (MUST be last) */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </ErrorBoundary>
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </CartProvider>
  );
}

export default App;