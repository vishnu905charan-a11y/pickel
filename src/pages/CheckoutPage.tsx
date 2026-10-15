import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useOrders } from '../context/OrderContext';
import { CheckoutForm } from '../components/checkout/CheckoutForm';
import { OrderSummary } from '../components/checkout/OrderSummary';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { EmptyState } from '../components/common/EmptyState';
import type { CustomerInfo, DemoPaymentMethod } from '../types';
import { ArrowLeft, ShieldAlert } from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const { cart, subtotal, deliveryCharge, grandTotal, itemCount, clearCart } = useCart();
  const { createOrder } = useOrders();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const breadcrumbs = [
    { label: 'Cart', href: '/cart' },
    { label: 'Checkout' },
  ];

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <Breadcrumbs items={breadcrumbs} />
        <div className="py-12">
          <EmptyState
            title="Your Cart is Empty"
            description="You cannot proceed to checkout with an empty shopping cart. Please add at least one pickle variety."
            actionText="Browse Pickles"
            onAction={() => navigate('/products')}
          />
        </div>
      </div>
    );
  }

  const handleOrderSubmit = async (customer: CustomerInfo, paymentMethod: DemoPaymentMethod) => {
    setIsSubmitting(true);

    // Simulate natural processing latency
    await new Promise((resolve) => setTimeout(resolve, 800));

    try {
      const newOrder = createOrder(customer, cart, paymentMethod);
      clearCart();
      setIsSubmitting(false);
      navigate(`/order-confirmation/${newOrder.orderReference}`);
    } catch (err) {
      console.error('Failed to create demo order', err);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Breadcrumbs */}
      <Breadcrumbs items={breadcrumbs} />

      {/* Header */}
      <div className="border-b border-pickle-cream-dark pb-4 flex items-baseline justify-between">
        <div>
          <h1 className="font-serif font-black text-3xl sm:text-4xl text-pickle-burgundy">
            Checkout Demonstration
          </h1>
          <p className="text-xs text-pickle-dark/60 mt-1 font-sans">
            Complete your demonstration delivery details and select a mock payment method.
          </p>
        </div>

        <Link
          to="/cart"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-pickle-burgundy hover:text-pickle-red underline"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Edit Cart</span>
        </Link>
      </div>

      {/* Demo Banner Notice */}
      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-sm block mb-0.5">Frontend Demonstration Environment</span>
          <p className="leading-relaxed text-amber-800">
            This checkout flow is strictly a frontend demonstration. No real bank or UPI transactions occur, and no delivery order is sent to Pickle Mart. The order will be saved to your browser’s localStorage for order tracking simulation.
          </p>
        </div>
      </div>

      {/* Grid: Form (left) + Order Summary (right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Form */}
        <div className="lg:col-span-7">
          <CheckoutForm
            cartItemCount={itemCount}
            onSubmit={handleOrderSubmit}
            isSubmitting={isSubmitting}
          />
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-5 sticky top-28">
          <OrderSummary
            items={cart}
            subtotal={subtotal}
            deliveryCharge={deliveryCharge}
            grandTotal={grandTotal}
          />
        </div>

      </div>

    </div>
  );
};
