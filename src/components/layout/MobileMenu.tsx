import React, { useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { X, ShoppingBag, ShieldCheck, PhoneCall, Compass, ShieldAlert } from 'lucide-react';
import { VegNonVegBadge } from '../common/Badge';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  cartCount: number;
  openCart: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  cartCount,
  openCart,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="relative w-4/5 max-w-xs bg-pickle-white h-full shadow-2xl flex flex-col z-10 overflow-y-auto">
        {/* Drawer Header */}
        <div className="p-4 border-b border-pickle-cream-dark flex items-center justify-between bg-pickle-cream/60">
          <div>
            <span className="font-serif font-black text-xl text-pickle-burgundy tracking-tight">
              Pickle Mart
            </span>
            <p className="text-[10px] text-pickle-dark/70 italic">
              "Feel the real taste, made by Grandma."
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-pickle-dark/70 hover:text-pickle-burgundy rounded-full hover:bg-pickle-cream"
            aria-label="Close navigation menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Cart Action */}
        <div className="p-4 bg-pickle-cream/30 border-b border-pickle-cream-dark">
          <button
            onClick={() => {
              onClose();
              openCart();
            }}
            className="w-full flex items-center justify-between px-4 py-2.5 bg-pickle-red text-white rounded-xl shadow-sm text-sm font-semibold"
          >
            <span className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4" />
              <span>Shopping Cart</span>
            </span>
            <span className="bg-pickle-mustard text-pickle-burgundy text-xs font-bold px-2 py-0.5 rounded-full">
              {cartCount} {cartCount === 1 ? 'item' : 'items'}
            </span>
          </button>
        </div>

        {/* Nav Links */}
        <div className="p-4 space-y-1 grow">
          <NavLink
            to="/"
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-pickle-cream text-pickle-burgundy font-bold'
                  : 'text-pickle-dark hover:bg-pickle-cream/50'
              }`
            }
          >
            <Compass className="w-4 h-4 text-pickle-red" />
            <span>Home</span>
          </NavLink>

          <NavLink
            to="/products"
            onClick={onClose}
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-pickle-cream text-pickle-burgundy font-bold'
                  : 'text-pickle-dark hover:bg-pickle-cream/50'
              }`
            }
          >
            <ShoppingBag className="w-4 h-4 text-pickle-red" />
            <span>All 43 Pickles</span>
          </NavLink>

          <div className="pt-2 pb-1 px-3 text-xs font-semibold text-pickle-dark/50 uppercase tracking-wider">
            Categories
          </div>

          <NavLink
            to="/products/veg"
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-green-50 text-pickle-green font-bold border border-pickle-green/30'
                  : 'text-pickle-dark hover:bg-pickle-cream/50'
              }`
            }
          >
            <div className="flex items-center gap-2">
              <VegNonVegBadge category="Veg Pickles" size="sm" showLabel={false} />
              <span>Veg Pickles</span>
            </div>
            <span className="text-xs bg-pickle-cream px-2 py-0.5 rounded-full font-semibold text-pickle-green">
              22
            </span>
          </NavLink>

          <NavLink
            to="/products/non-veg"
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-red-50 text-pickle-red font-bold border border-pickle-red/30'
                  : 'text-pickle-dark hover:bg-pickle-cream/50'
              }`
            }
          >
            <div className="flex items-center gap-2">
              <VegNonVegBadge category="Non-Veg Pickles" size="sm" showLabel={false} />
              <span>Non-Veg Pickles</span>
            </div>
            <span className="text-xs bg-pickle-cream px-2 py-0.5 rounded-full font-semibold text-pickle-red">
              21
            </span>
          </NavLink>

          <div className="pt-3 pb-1 px-3 text-xs font-semibold text-pickle-dark/50 uppercase tracking-wider">
            Information
          </div>

          <NavLink
            to="/about"
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-pickle-cream text-pickle-burgundy font-bold'
                  : 'text-pickle-dark hover:bg-pickle-cream/50'
              }`
            }
          >
            <ShieldCheck className="w-4 h-4 text-pickle-red" />
            <span>About Us</span>
          </NavLink>

          <NavLink
            to="/contact"
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-pickle-cream text-pickle-burgundy font-bold'
                  : 'text-pickle-dark hover:bg-pickle-cream/50'
              }`
            }
          >
            <PhoneCall className="w-4 h-4 text-pickle-red" />
            <span>Contact Us</span>
          </NavLink>

          <NavLink
            to="/track-order"
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-pickle-cream text-pickle-burgundy font-bold'
                  : 'text-pickle-dark hover:bg-pickle-cream/50'
              }`
            }
          >
            <span className="text-base">📦</span>
            <span>Track Demo Order</span>
          </NavLink>
        </div>

        {/* Demo Admin Link at Bottom */}
        <div className="p-4 border-t border-pickle-cream-dark bg-pickle-cream/40 space-y-2">
          <Link
            to="/admin"
            onClick={onClose}
            className="flex items-center justify-center gap-2 w-full py-2 px-3 border border-pickle-burgundy/20 rounded-lg text-xs font-semibold text-pickle-burgundy hover:bg-pickle-cream transition-colors"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-pickle-red" />
            <span>Frontend Demo Admin</span>
          </Link>
          <p className="text-[10px] text-pickle-dark/60 text-center">
            Frontend-only demonstration storefront.
          </p>
        </div>
      </div>
    </div>
  );
};
