import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, Menu, Sparkles } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { MobileMenu } from './MobileMenu';
import { VegNonVegBadge } from '../common/Badge';

export const Navbar: React.FC = () => {
  const { itemCount, openCartDrawer } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-30 bg-pickle-white/95 backdrop-blur-md border-b border-pickle-cream-dark transition-shadow duration-300 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-4">
            
            {/* Left: Mobile Menu Toggle & Brand Logo */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 rounded-lg text-pickle-dark hover:bg-pickle-cream transition-colors"
                aria-label="Open mobile navigation menu"
              >
                <Menu className="w-6 h-6" />
              </button>

              <Link to="/" className="flex items-center gap-2.5 group">
                {/* Traditional Martaban Jar Logo Icon */}
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pickle-red to-pickle-burgundy p-2 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-200">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 text-pickle-mustard fill-current">
                    <path d="M7 3h10v2H7V3zm-2 4h14a1 1 0 0 1 1 1v11a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V8a1 1 0 0 1 1-1zm3 3v2h2v-2H8zm6 0v2h2v-2h-2z" />
                  </svg>
                </div>

                <div className="flex flex-col">
                  <span className="font-serif font-black text-2xl tracking-tight text-pickle-burgundy leading-none group-hover:text-pickle-red transition-colors">
                    Pickle Mart
                  </span>
                  <span className="text-[11px] font-medium text-pickle-dark/70 tracking-normal mt-0.5 hidden sm:inline">
                    "Feel the real taste, made by Grandma."
                  </span>
                </div>
              </Link>
            </div>

            {/* Center: Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1 font-medium text-sm text-pickle-dark">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg transition-colors ${
                    isActive ? 'text-pickle-red font-bold bg-pickle-cream' : 'hover:text-pickle-red hover:bg-pickle-cream/50'
                  }`
                }
              >
                Home
              </NavLink>

              <NavLink
                to="/products"
                end
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg transition-colors ${
                    isActive ? 'text-pickle-red font-bold bg-pickle-cream' : 'hover:text-pickle-red hover:bg-pickle-cream/50'
                  }`
                }
              >
                All 43 Pickles
              </NavLink>

              <NavLink
                to="/products/veg"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
                    isActive ? 'text-pickle-green font-bold bg-green-50' : 'hover:text-pickle-green hover:bg-pickle-cream/50'
                  }`
                }
              >
                <VegNonVegBadge category="Veg Pickles" size="sm" showLabel={false} />
                <span>Veg Pickles (22)</span>
              </NavLink>

              <NavLink
                to="/products/non-veg"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
                    isActive ? 'text-pickle-red font-bold bg-red-50' : 'hover:text-pickle-red hover:bg-pickle-cream/50'
                  }`
                }
              >
                <VegNonVegBadge category="Non-Veg Pickles" size="sm" showLabel={false} />
                <span>Non-Veg Pickles (21)</span>
              </NavLink>

              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg transition-colors ${
                    isActive ? 'text-pickle-red font-bold bg-pickle-cream' : 'hover:text-pickle-red hover:bg-pickle-cream/50'
                  }`
                }
              >
                About Us
              </NavLink>

              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg transition-colors ${
                    isActive ? 'text-pickle-red font-bold bg-pickle-cream' : 'hover:text-pickle-red hover:bg-pickle-cream/50'
                  }`
                }
              >
                Contact
              </NavLink>

              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors flex items-center gap-1 ${
                    isActive
                      ? 'bg-pickle-burgundy text-pickle-cream border-pickle-burgundy'
                      : 'border-pickle-mustard/60 text-pickle-burgundy bg-pickle-mustard/15 hover:bg-pickle-mustard/25'
                  }`
                }
              >
                <Sparkles className="w-3.5 h-3.5 text-pickle-mustard-dark" />
                <span>Demo Admin</span>
              </NavLink>
            </nav>

            {/* Right: Search, Cart Icon */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Desktop inline search bar */}
              <form
                onSubmit={handleSearchSubmit}
                className="relative hidden md:block w-48 lg:w-56"
              >
                <input
                  type="text"
                  placeholder="Search 43 pickles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs bg-pickle-cream/50 border border-pickle-cream-dark rounded-full focus:bg-white focus:outline-none focus:ring-2 focus:ring-pickle-red/30 transition-all text-pickle-dark placeholder-pickle-dark/50"
                />
                <Search className="w-4 h-4 text-pickle-dark/50 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </form>

              {/* Mobile search toggle */}
              <button
                type="button"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="md:hidden p-2 rounded-full text-pickle-dark hover:bg-pickle-cream transition-colors"
                aria-label="Toggle search input"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Shopping Cart Button */}
              <button
                type="button"
                onClick={openCartDrawer}
                className="relative p-2.5 rounded-full bg-pickle-cream hover:bg-pickle-cream-dark text-pickle-burgundy transition-transform active:scale-95"
                aria-label={`Shopping cart with ${itemCount} items`}
              >
                <ShoppingBag className="w-5 h-5 text-pickle-burgundy" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-pickle-red text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-pulse">
                    {itemCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Expandable Mobile Search Field */}
          {isSearchOpen && (
            <div className="md:hidden pb-3 pt-1 border-t border-pickle-cream-dark">
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  placeholder="Search among 43 pickles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full pl-10 pr-4 py-2 text-sm bg-pickle-cream/60 border border-pickle-cream-dark rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-pickle-red/30 text-pickle-dark"
                />
                <Search className="w-4 h-4 text-pickle-dark/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </form>
            </div>
          )}
        </div>
      </header>

      {/* Mobile Drawer */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        cartCount={itemCount}
        openCart={openCartDrawer}
      />
    </>
  );
};
