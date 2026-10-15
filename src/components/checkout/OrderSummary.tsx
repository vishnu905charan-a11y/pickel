import type { CartItem } from '../../types';
import { formatINR, calculateLineTotal } from '../../utils/currency';
import { VegNonVegBadge } from '../common/Badge';
import { ShieldCheck, Info } from 'lucide-react';

interface OrderSummaryProps {
  items: CartItem[];
  subtotal: number;
  deliveryCharge: number;
  grandTotal: number;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
  items,
  subtotal,
  deliveryCharge,
  grandTotal,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-pickle-cream-dark p-6 shadow-xs space-y-6">
      <h3 className="font-serif font-bold text-xl text-pickle-burgundy pb-3 border-b border-pickle-cream-dark">
        Review Your Order ({items.length} {items.length === 1 ? 'item' : 'items'})
      </h3>

      {/* Item List */}
      <div className="space-y-3 max-h-80 overflow-y-auto pr-1 divide-y divide-pickle-cream-dark/50">
        {items.map((item) => {
          const lineTotal = calculateLineTotal(item.product.price, item.quantity);
          return (
            <div key={item.product.id} className="pt-3 first:pt-0 flex items-center justify-between gap-3 text-sm">
              <div className="flex items-center gap-2.5 min-w-0">
                <VegNonVegBadge category={item.product.category} size="sm" showLabel={false} />
                <div className="min-w-0">
                  <p className="font-medium text-pickle-dark truncate">{item.product.name}</p>
                  <p className="text-xs text-pickle-dark/50">
                    {formatINR(item.product.price)} &times; {item.quantity} (250g)
                  </p>
                </div>
              </div>
              <span className="font-semibold text-pickle-burgundy shrink-0">
                {formatINR(lineTotal)}
              </span>
            </div>
          );
        })}
      </div>

      {/* Calculations */}
      <div className="pt-4 border-t border-pickle-cream-dark space-y-2 text-sm">
        <div className="flex justify-between text-pickle-dark/70">
          <span>Subtotal</span>
          <span className="font-medium text-pickle-dark">{formatINR(subtotal)}</span>
        </div>

        <div className="flex justify-between text-pickle-dark/70">
          <span>Standard Demo Delivery</span>
          <span className="text-pickle-green font-medium">
            {deliveryCharge === 0 ? '₹0' : formatINR(deliveryCharge)}
          </span>
        </div>

        <div className="pt-3 border-t border-pickle-cream-dark flex items-baseline justify-between">
          <span className="font-serif font-bold text-lg text-pickle-dark">Total Amount</span>
          <span className="font-serif font-black text-2xl text-pickle-burgundy">
            {formatINR(grandTotal)}
          </span>
        </div>
      </div>

      {/* Demo Notice Alert */}
      <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
        <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <p>
          <strong>Demonstration Order:</strong> Submitting this order will create a demo record in your browser’s localStorage. No real charge or kitchen order is made.
        </p>
      </div>

      {/* Safe Packaging Note */}
      <div className="flex items-center gap-2 text-xs text-pickle-dark/60">
        <ShieldCheck className="w-4 h-4 text-pickle-green shrink-0" />
        <span>Packed in food-grade, leak-proof 250 g jars</span>
      </div>
    </div>
  );
};
