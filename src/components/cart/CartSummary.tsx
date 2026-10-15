import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Trash2, ShieldCheck, ShoppingBag } from 'lucide-react';
import { formatINR } from '../../utils/currency';

interface CartSummaryProps {
  subtotal: number;
  deliveryCharge: number;
  discount: number;
  grandTotal: number;
  itemCount: number;
  onClearCart?: () => void;
  showCheckoutButton?: boolean;
}

export const CartSummary: React.FC<CartSummaryProps> = ({
  subtotal,
  deliveryCharge,
  discount,
  grandTotal,
  itemCount,
  onClearCart,
  showCheckoutButton = true,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-pickle-cream-dark p-6 shadow-xs space-y-6">
      <h3 className="font-serif font-bold text-xl text-pickle-burgundy pb-3 border-b border-pickle-cream-dark">
        Order Summary
      </h3>

      {/* Calculations Breakdown */}
      <div className="space-y-3 text-sm text-pickle-dark">
        <div className="flex items-center justify-between">
          <span className="text-pickle-dark/70">Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'})</span>
          <span className="font-semibold">{formatINR(subtotal)}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-pickle-dark/70">Delivery Charges</span>
          <span className="font-medium text-pickle-green">
            {deliveryCharge === 0 ? '₹0 (Standard Demo Delivery)' : formatINR(deliveryCharge)}
          </span>
        </div>

        {discount > 0 && (
          <div className="flex items-center justify-between text-emerald-600">
            <span>Special Discount</span>
            <span className="font-semibold">- {formatINR(discount)}</span>
          </div>
        )}

        <div className="pt-3 border-t border-pickle-cream-dark flex items-baseline justify-between">
          <div>
            <span className="font-serif font-bold text-lg text-pickle-dark">Grand Total</span>
            <span className="block text-[11px] text-pickle-dark/50">Includes all local taxes</span>
          </div>
          <span className="font-serif font-black text-2xl text-pickle-burgundy">
            {formatINR(grandTotal)}
          </span>
        </div>
      </div>

      {/* Trust feature badge */}
      <div className="bg-pickle-cream/40 rounded-xl p-3 border border-pickle-cream-dark flex items-center gap-2.5 text-xs text-pickle-dark/80">
        <ShieldCheck className="w-4 h-4 text-pickle-green shrink-0" />
        <span>Authentic Grandma recipe in vacuum-sealed 250g packaging</span>
      </div>

      {/* Actions */}
      <div className="space-y-3">
        {showCheckoutButton && (
          <Link
            to="/checkout"
            className="w-full py-3.5 px-4 bg-pickle-red hover:bg-pickle-burgundy text-white font-semibold rounded-xl text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-98"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        )}

        <div className="flex items-center justify-between gap-3 pt-2">
          <Link
            to="/products"
            className="text-xs font-semibold text-pickle-burgundy hover:text-pickle-red flex items-center gap-1 underline"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Continue Shopping</span>
          </Link>

          {onClearCart && (
            <button
              type="button"
              onClick={onClearCart}
              className="text-xs text-red-600 hover:text-red-700 flex items-center gap-1 font-medium hover:underline p-1"
              aria-label="Clear all items from shopping cart"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Cart</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
