import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart, ArrowLeft, ShieldAlert } from 'lucide-react';

export const AdminSidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-pickle-burgundy text-pickle-cream flex flex-col shrink-0 min-h-screen border-r border-pickle-mustard/20">
      {/* Brand Header */}
      <div className="p-5 border-b border-pickle-cream/10 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-pickle-mustard p-1 flex items-center justify-center text-pickle-burgundy font-serif font-black text-sm">
            PM
          </div>
          <div>
            <span className="font-serif font-black text-lg text-pickle-cream block leading-tight">
              Pickle Mart
            </span>
            <span className="text-[10px] text-pickle-mustard uppercase font-bold tracking-wider">
              Demo Admin Panel
            </span>
          </div>
        </div>
      </div>

      {/* Demo Advisory Badge */}
      <div className="p-3 mx-4 my-3 bg-pickle-red/40 rounded-xl border border-pickle-mustard/30 text-[11px] text-pickle-cream/90 flex items-start gap-2">
        <ShieldAlert className="w-4 h-4 text-pickle-mustard shrink-0 mt-0.5" />
        <p>
          <strong>Demo Notice:</strong> No real backend. Changes persist only in this browser's localStorage.
        </p>
      </div>

      {/* Nav Links */}
      <nav className="p-4 space-y-1.5 grow">
        <NavLink
          to="/admin"
          end
          className={({ isActive }) =>
            `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
              isActive
                ? 'bg-pickle-mustard text-pickle-burgundy font-bold shadow-xs'
                : 'text-pickle-cream/80 hover:bg-pickle-cream/10 hover:text-white'
            }`
          }
        >
          <LayoutDashboard className="w-4 h-4" />
          <span>Dashboard Overview</span>
        </NavLink>

        <NavLink
          to="/admin/products"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
              isActive
                ? 'bg-pickle-mustard text-pickle-burgundy font-bold shadow-xs'
                : 'text-pickle-cream/80 hover:bg-pickle-cream/10 hover:text-white'
            }`
          }
        >
          <Package className="w-4 h-4" />
          <span>Product Catalog</span>
        </NavLink>

        <NavLink
          to="/admin/orders"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
              isActive
                ? 'bg-pickle-mustard text-pickle-burgundy font-bold shadow-xs'
                : 'text-pickle-cream/80 hover:bg-pickle-cream/10 hover:text-white'
            }`
          }
        >
          <ShoppingCart className="w-4 h-4" />
          <span>Demo Orders</span>
        </NavLink>
      </nav>

      {/* Back to Public Storefront */}
      <div className="p-4 border-t border-pickle-cream/10">
        <Link
          to="/"
          className="flex items-center justify-center gap-2 w-full py-2.5 px-3 rounded-xl bg-pickle-cream/10 hover:bg-pickle-cream/20 text-pickle-cream text-xs font-semibold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Storefront</span>
        </Link>
      </div>
    </aside>
  );
};
