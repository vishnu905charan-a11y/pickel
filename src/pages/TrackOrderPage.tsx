import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useOrders } from '../context/OrderContext';
import { OrderStatusTimeline } from '../components/orders/OrderStatusTimeline';
import { formatINR } from '../utils/currency';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { Search, PackageCheck, AlertCircle, ShieldAlert, ArrowRight } from 'lucide-react';
import { VegNonVegBadge } from '../components/common/Badge';

export const TrackOrderPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { getOrder, orders } = useOrders();

  const [inputRef, setInputRef] = useState(searchParams.get('ref') || '');
  const [searchedRef, setSearchedRef] = useState(searchParams.get('ref') || '');

  // Pre-load if ref is in URL
  useEffect(() => {
    const urlRef = searchParams.get('ref');
    if (urlRef) {
      setInputRef(urlRef);
      setSearchedRef(urlRef);
    }
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = inputRef.trim();
    setSearchedRef(clean);
    if (clean) {
      setSearchParams({ ref: clean });
    } else {
      setSearchParams({});
    }
  };

  const matchedOrder = searchedRef ? getOrder(searchedRef) : undefined;

  const breadcrumbs = [
    { label: 'Track Demo Order' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Breadcrumbs */}
      <Breadcrumbs items={breadcrumbs} />

      {/* Header */}
      <div className="border-b border-pickle-cream-dark pb-6 text-center max-w-xl mx-auto">
        <div className="w-12 h-12 rounded-2xl bg-pickle-cream text-pickle-red flex items-center justify-center mx-auto mb-3">
          <PackageCheck className="w-6 h-6" />
        </div>
        <h1 className="font-serif font-black text-3xl sm:text-4xl text-pickle-burgundy">
          Track Your Demo Order
        </h1>
        <p className="text-xs sm:text-sm text-pickle-dark/70 mt-2 font-sans">
          Enter your unique demo order reference (e.g. <code>PM-2026-DEMO1</code>) to review the simulated preparation and delivery status.
        </p>
      </div>

      {/* Search Input Card */}
      <div className="bg-white rounded-2xl border border-pickle-cream-dark p-6 shadow-xs max-w-xl mx-auto">
        <form onSubmit={handleSearch} className="space-y-3">
          <label htmlFor="ref-input" className="block text-xs font-bold text-pickle-dark uppercase tracking-wider">
            Demo Order Reference
          </label>
          <div className="flex gap-2">
            <div className="relative grow">
              <input
                id="ref-input"
                type="text"
                placeholder="e.g. PM-2026-DEMO1 or your created order"
                value={inputRef}
                onChange={(e) => setInputRef(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 text-sm rounded-xl border border-pickle-cream-dark bg-pickle-cream/30 focus:bg-white focus:outline-none focus:ring-2 focus:ring-pickle-red/30 font-mono uppercase"
              />
              <Search className="w-4 h-4 text-pickle-dark/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
            <button
              type="submit"
              className="px-6 py-2.5 bg-pickle-red hover:bg-pickle-burgundy text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-xs cursor-pointer shrink-0"
            >
              Track Order
            </button>
          </div>
        </form>

        {/* Quick sample chips */}
        {orders.length > 0 && (
          <div className="pt-3 border-t border-pickle-cream-dark/60 mt-4 text-xs text-pickle-dark/60 flex flex-wrap items-center gap-1.5">
            <span>Recent Demo Orders in Browser:</span>
            {orders.slice(0, 3).map((o) => (
              <button
                key={o.orderReference}
                type="button"
                onClick={() => {
                  setInputRef(o.orderReference);
                  setSearchedRef(o.orderReference);
                  setSearchParams({ ref: o.orderReference });
                }}
                className="font-mono text-pickle-burgundy bg-pickle-cream px-2 py-0.5 rounded text-[11px] font-semibold hover:bg-pickle-mustard/30 underline"
              >
                {o.orderReference}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Result Section */}
      {searchedRef && !matchedOrder && (
        <div className="p-6 rounded-2xl bg-red-50 border border-red-200 text-center space-y-3 max-w-xl mx-auto">
          <AlertCircle className="w-8 h-8 text-red-600 mx-auto" />
          <h3 className="font-serif font-bold text-lg text-red-900">
            No Demo Order Found
          </h3>
          <p className="text-xs text-red-700">
            We could not find any order with reference <strong className="font-mono">{searchedRef}</strong> in this browser's demo storage. Please verify the code or place a new test order through checkout.
          </p>
          <div className="pt-2">
            <Link
              to="/products"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-pickle-red hover:underline"
            >
              <span>Explore products and create an order</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}

      {matchedOrder && (
        <div className="space-y-6">
          
          {/* Order Header Summary */}
          <div className="bg-white rounded-2xl border border-pickle-cream-dark p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs text-pickle-dark/50 uppercase font-bold tracking-wider">
                Viewing Demo Order
              </span>
              <h2 className="font-mono font-black text-2xl text-pickle-burgundy">
                {matchedOrder.orderReference}
              </h2>
              <p className="text-xs text-pickle-dark/70 mt-1">
                Placed on {new Date(matchedOrder.createdAt).toLocaleDateString('en-IN', {
                  dateStyle: 'long',
                })} &bull; Customer: <strong>{matchedOrder.customer.fullName}</strong>
              </p>
            </div>

            <div className="text-right sm:border-l sm:border-pickle-cream-dark sm:pl-6">
              <span className="text-xs text-pickle-dark/50 block">Current Demo Status</span>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-pickle-cream text-pickle-burgundy border border-pickle-mustard/40 mt-1">
                {matchedOrder.status}
              </span>
            </div>
          </div>

          {/* Stepper Timeline Component */}
          <OrderStatusTimeline
            currentStatus={matchedOrder.status}
            history={matchedOrder.statusHistory}
          />

          {/* Items In This Order */}
          <div className="bg-white rounded-2xl border border-pickle-cream-dark p-6 shadow-xs space-y-4">
            <h3 className="font-serif font-bold text-lg text-pickle-burgundy pb-2 border-b border-pickle-cream-dark">
              Ordered Pickles ({matchedOrder.items.length})
            </h3>

            <div className="divide-y divide-pickle-cream-dark/60 text-xs">
              {matchedOrder.items.map((item, idx) => (
                <div key={idx} className="py-2.5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <VegNonVegBadge category={item.product.category} size="sm" showLabel={false} />
                    <span className="font-medium text-pickle-dark">
                      {item.product.name} ({item.product.packageSize})
                    </span>
                    <span className="text-pickle-dark/50">&times; {item.quantity}</span>
                  </div>
                  <span className="font-mono font-bold text-pickle-burgundy">
                    {formatINR(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-pickle-cream-dark flex items-baseline justify-between text-sm">
              <span className="font-bold text-pickle-dark">Grand Total</span>
              <span className="font-serif font-black text-xl text-pickle-burgundy">
                {formatINR(matchedOrder.grandTotal)}
              </span>
            </div>
          </div>

          {/* Demo Disclaimer */}
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
            <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <p>
              <strong>Demonstration Tracking:</strong> This timeline reflects simulated browser-saved order states. It is not connected to a live delivery courier or dispatch facility.
            </p>
          </div>

        </div>
      )}

    </div>
  );
};
