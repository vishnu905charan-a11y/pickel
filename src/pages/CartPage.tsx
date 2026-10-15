import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CartItem } from '../components/cart/CartItem';
import { CartSummary } from '../components/cart/CartSummary';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { EmptyState } from '../components/common/EmptyState';
import { ArrowLeft } from 'lucide-react';

export const CartPage: React.FC = () => {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    deliveryCharge,
    discount,
    grandTotal,
    itemCount,
  } = useCart();

  const breadcrumbs = [{ label: 'Shopping Cart' }];

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <Breadcrumbs items={breadcrumbs} />
        <div className="py-12">
          <EmptyState
            title="Your Shopping Cart is Empty"
            description="Explore our 43 traditional Indian vegetarian and non-vegetarian pickles made with love and time-honored recipes."
            actionText="Explore All 43 Pickles"
            onAction={() => {
              window.location.href = '/products';
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Breadcrumbs */}
      <Breadcrumbs items={breadcrumbs} />

      {/* Page Title */}
      <div className="border-b border-pickle-cream-dark pb-4 flex items-baseline justify-between">
        <div>
          <h1 className="font-serif font-black text-3xl sm:text-4xl text-pickle-burgundy">
            Shopping Cart
          </h1>
          <p className="text-xs text-pickle-dark/60 mt-1 font-sans">
            You have {itemCount} {itemCount === 1 ? 'pack' : 'packs'} (250g each) in your cart.
          </p>
        </div>

        <Link
          to="/products"
          className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-pickle-burgundy hover:text-pickle-red underline"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Continue Shopping</span>
        </Link>
      </div>

      {/* Main Grid: Cart Items + Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Cart Items List */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-pickle-cream-dark p-6 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-pickle-cream-dark text-xs font-bold text-pickle-dark/60 uppercase tracking-wider">
            <span>Pickle Varieties ({cart.length})</span>
            <span className="hidden sm:inline">Price &amp; Quantity</span>
          </div>

          <div className="divide-y divide-pickle-cream-dark/60">
            {cart.map((item) => (
              <CartItem
                key={item.product.id}
                item={item}
                onUpdateQuantity={updateQuantity}
                onRemove={removeFromCart}
              />
            ))}
          </div>

          {/* Bottom Bar: Clear Cart */}
          <div className="pt-4 mt-2 border-t border-pickle-cream-dark flex items-center justify-between">
            <Link
              to="/products"
              className="text-xs font-semibold text-pickle-burgundy hover:text-pickle-red flex items-center gap-1 underline sm:hidden"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Continue Shopping</span>
            </Link>

            <button
              onClick={clearCart}
              className="text-xs text-red-600 hover:text-red-800 font-semibold underline ml-auto"
            >
              Clear Entire Cart
            </button>
          </div>
        </div>

        {/* Right: Cart Summary */}
        <div className="lg:col-span-4 sticky top-28">
          <CartSummary
            subtotal={subtotal}
            deliveryCharge={deliveryCharge}
            discount={discount}
            grandTotal={grandTotal}
            itemCount={itemCount}
            onClearCart={clearCart}
          />
        </div>

      </div>
    </div>
  );
};
