import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ShoppingBag } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6">
      <div className="w-24 h-24 rounded-full bg-pickle-cream text-pickle-red flex items-center justify-center mx-auto shadow-sm">
        <span className="font-serif font-black text-4xl">404</span>
      </div>

      <h1 className="font-serif font-black text-3xl sm:text-4xl text-pickle-burgundy">
        Page Not Found
      </h1>

      <p className="text-sm text-pickle-dark/70 max-w-md mx-auto leading-relaxed">
        The page you are looking for doesn't exist or may have been relocated. You can return home or explore our 43 traditional pickle recipes.
      </p>

      <div className="pt-4 flex items-center justify-center gap-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-pickle-red hover:bg-pickle-burgundy text-white font-bold text-xs sm:text-sm rounded-xl shadow-sm transition-all"
        >
          <Home className="w-4 h-4" />
          <span>Return Home</span>
        </Link>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-6 py-3 bg-pickle-cream hover:bg-pickle-cream-dark text-pickle-burgundy font-bold text-xs sm:text-sm rounded-xl border border-pickle-cream-dark transition-all"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Browse Pickles</span>
        </Link>
      </div>
    </div>
  );
};
