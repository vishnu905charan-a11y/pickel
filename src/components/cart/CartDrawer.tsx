import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { CartItem } from './CartItem';
import { formatINR } from '../../utils/currency';
import { EmptyState } from '../common/EmptyState';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartDrawerOpen,
    closeCartDrawer,
    updateQuantity,
    removeFromCart,
    subtotal,
    itemCount,
  } = useCart();

  useEffect(() => {
    if (isCartDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isCartDrawerOpen]);

  if (!isCartDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true" aria-label="Shopping Cart Drawer">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={closeCartDrawer}
        aria-hidden="true"
      />

      {/* Drawer Container */}
      <div className="relative w-full max-w-md bg-pickle-white h-full shadow-2xl flex flex-col z-10 overflow-hidden">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-pickle-cream-dark flex items-center justify-between bg-pickle-cream/60 shrink-0">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-pickle-red" />
            <h3 className="font-serif font-bold text-lg text-pickle-burgundy">
              Your Cart ({itemCount})
            </h3>
          </div>
          <button
            onClick={closeCartDrawer}
            className="p-1.5 text-pickle-dark/70 hover:text-pickle-burgundy rounded-full hover:bg-pickle-cream transition-colors"
            aria-label="Close cart drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Item List */}
        <div className="p-4 sm:p-5 overflow-y-auto grow">
          {cart.length === 0 ? (
            <div className="py-8">
              <EmptyState
                title="Your cart is empty"
                description="Explore our 43 varieties of traditional homemade vegetarian and non-vegetarian pickles."
                actionText="Start Shopping"
                onAction={closeCartDrawer}
              />
            </div>
          ) : (
            <div className="divide-y divide-pickle-cream-dark/60">
              {cart.map((item) => (
                <CartItem
                  key={item.product.id}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeFromCart}
                  compact={true}
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer / Summary Action */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-pickle-cream-dark bg-pickle-cream/30 space-y-3 shrink-0">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-xs text-pickle-dark/70">Subtotal:</span>
                <p className="text-[11px] text-pickle-dark/50">Delivery calculated at checkout</p>
              </div>
              <span className="font-serif font-black text-xl text-pickle-burgundy">
                {formatINR(subtotal)}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <Link
                to="/cart"
                onClick={closeCartDrawer}
                className="py-2.5 px-3 rounded-xl border border-pickle-burgundy/30 text-pickle-burgundy hover:bg-pickle-cream text-center text-xs font-semibold transition-colors"
              >
                View Full Cart
              </Link>
              <Link
                to="/checkout"
                onClick={closeCartDrawer}
                className="py-2.5 px-3 rounded-xl bg-pickle-red hover:bg-pickle-burgundy text-white text-center text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
              >
                <span>Checkout</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
