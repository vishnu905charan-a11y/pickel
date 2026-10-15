import React from 'react';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { DemoBanner } from '../components/layout/DemoBanner';
import { CartDrawer } from '../components/cart/CartDrawer';
import { ToastContainer } from '../components/common/ToastContainer';

export const RootLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-pickle-white text-pickle-dark">
      <DemoBanner />
      <Navbar />
      <main className="grow">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
      <ToastContainer />
      <ScrollRestoration />
    </div>
  );
};
