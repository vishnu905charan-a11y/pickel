import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useOrders } from '../context/OrderContext';
import { formatINR } from '../utils/currency';
import { CheckCircle2, PackageCheck, ShoppingBag, ShieldAlert, MapPin, Phone } from 'lucide-react';
import { VegNonVegBadge } from '../components/common/Badge';

export const OrderConfirmationPage: React.FC = () => {
  const { orderReference } = useParams<{ orderReference: string }>();
  const { getOrder } = useOrders();

  const order = orderReference ? getOrder(orderReference) : undefined;

  if (!order) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-4">
        <h1 className="font-serif font-black text-3xl text-pickle-burgundy">
          Demo Order Not Found
        </h1>
        <p className="text-sm text-pickle-dark/70 max-w-md mx-auto">
          We could not locate reference <code className="font-mono bg-pickle-cream px-2 py-0.5 rounded">{orderReference}</code> in your browser's demo storage.
        </p>
        <div className="pt-4 flex justify-center gap-3">
          <Link
            to="/products"
            className="px-5 py-2.5 bg-pickle-red text-white text-xs font-semibold rounded-xl hover:bg-pickle-burgundy"
          >
            Start Shopping
          </Link>
          <Link
            to="/track-order"
            className="px-5 py-2.5 bg-pickle-cream text-pickle-burgundy text-xs font-semibold rounded-xl hover:bg-pickle-cream-dark"
          >
            Track Order
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Success Card Header */}
      <div className="bg-white rounded-3xl border border-pickle-cream-dark p-8 sm:p-10 shadow-pickle text-center space-y-4 relative overflow-hidden">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full text-xs font-bold uppercase tracking-wider">
          Demo Order Placed Successfully
        </span>

        <h1 className="font-serif font-black text-3xl sm:text-4xl text-pickle-burgundy">
          Thank you, {order.customer.fullName}!
        </h1>

        <p className="text-sm text-pickle-dark/80 max-w-lg mx-auto leading-relaxed">
          Your demo order has been created successfully in this browser.
        </p>

        {/* Demo Order Reference Card */}
        <div className="p-4 rounded-2xl bg-pickle-cream/60 border border-pickle-cream-dark max-w-md mx-auto">
          <span className="text-xs text-pickle-dark/60 block uppercase font-bold tracking-wider mb-1">
            Demo Order Reference
          </span>
          <span className="font-mono font-black text-xl sm:text-2xl text-pickle-burgundy tracking-wider selection:bg-pickle-mustard">
            {order.orderReference}
          </span>
          <span className="text-[11px] text-pickle-dark/50 block mt-1">
            Status: <strong className="text-pickle-red">{order.status}</strong>
          </span>
        </div>

        {/* Explicit Honest Notice */}
        <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 max-w-lg mx-auto flex items-start gap-2.5 text-left">
          <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <p>
            <strong>Frontend Demonstration:</strong> No real order has been transmitted to Pickle Mart, and no real delivery will take place. This data is recorded in your browser’s local storage.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
          <Link
            to={`/track-order?ref=${encodeURIComponent(order.orderReference)}`}
            className="px-6 py-3 bg-pickle-red hover:bg-pickle-burgundy text-white font-bold text-xs sm:text-sm rounded-xl shadow-sm flex items-center gap-2 transition-all"
          >
            <PackageCheck className="w-4 h-4" />
            <span>Track Demo Order Status</span>
          </Link>

          <Link
            to="/products"
            className="px-6 py-3 bg-pickle-cream hover:bg-pickle-cream-dark text-pickle-burgundy font-bold text-xs sm:text-sm rounded-xl border border-pickle-cream-dark flex items-center gap-2 transition-all"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Continue Shopping</span>
          </Link>
        </div>
      </div>

      {/* Order Details Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Customer & Delivery Summary */}
        <div className="bg-white rounded-2xl border border-pickle-cream-dark p-6 shadow-xs space-y-4">
          <h3 className="font-serif font-bold text-lg text-pickle-burgundy pb-2 border-b border-pickle-cream-dark">
            Delivery &amp; Customer Details
          </h3>

          <div className="space-y-3 text-xs text-pickle-dark/80">
            <div>
              <span className="text-pickle-dark/50 block font-medium">Customer Name</span>
              <span className="font-semibold text-sm text-pickle-dark">{order.customer.fullName}</span>
            </div>

            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-pickle-red shrink-0" />
              <span>+91 {order.customer.mobileNumber}</span>
            </div>

            <div className="flex items-start gap-2">
              <MapPin className="w-3.5 h-3.5 text-pickle-red shrink-0 mt-0.5" />
              <span>
                {order.customer.deliveryAddress}, {order.customer.city} &ndash; {order.customer.postalCode}
              </span>
            </div>

            <div className="pt-2 border-t border-pickle-cream-dark">
              <span className="text-pickle-dark/50 block font-medium">Selected Demo Payment</span>
              <span className="font-bold text-pickle-burgundy">{order.paymentMethod}</span>
            </div>
          </div>
        </div>

        {/* Purchased Items List */}
        <div className="bg-white rounded-2xl border border-pickle-cream-dark p-6 shadow-xs space-y-4">
          <h3 className="font-serif font-bold text-lg text-pickle-burgundy pb-2 border-b border-pickle-cream-dark">
            Ordered Items ({order.items.length})
          </h3>

          <div className="divide-y divide-pickle-cream-dark/60 max-h-60 overflow-y-auto pr-1 text-xs">
            {order.items.map((item, idx) => (
              <div key={idx} className="py-2.5 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <VegNonVegBadge category={item.product.category} size="sm" showLabel={false} />
                  <span className="font-medium text-pickle-dark truncate">
                    {item.product.name}
                  </span>
                  <span className="text-pickle-dark/50 shrink-0">
                    &times; {item.quantity} (250g)
                  </span>
                </div>
                <span className="font-mono font-semibold text-pickle-burgundy shrink-0">
                  {formatINR(item.product.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-pickle-cream-dark flex items-baseline justify-between">
            <span className="font-bold text-sm text-pickle-dark">Grand Total</span>
            <span className="font-serif font-black text-xl text-pickle-burgundy">
              {formatINR(order.grandTotal)}
            </span>
          </div>
        </div>

      </div>

    </div>
  );
};
