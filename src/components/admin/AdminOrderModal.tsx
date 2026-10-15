import React, { useState } from 'react';
import type { DemoOrder, DemoOrderStatus } from '../../types';
import { Modal } from '../common/Modal';
import { formatINR } from '../../utils/currency';
import { OrderStatusTimeline } from '../orders/OrderStatusTimeline';
import { VegNonVegBadge } from '../common/Badge';
import { Phone, MapPin, CreditCard, Save } from 'lucide-react';

interface AdminOrderModalProps {
  order: DemoOrder | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateStatus: (reference: string, newStatus: DemoOrderStatus, note?: string) => void;
}

const ALL_STATUSES: DemoOrderStatus[] = [
  'Pending Confirmation',
  'Confirmed',
  'Preparing',
  'Dispatched',
  'Delivered',
  'Cancelled',
];

export const AdminOrderModal: React.FC<AdminOrderModalProps> = ({
  order,
  isOpen,
  onClose,
  onUpdateStatus,
}) => {
  if (!order) return null;

  const [status, setStatus] = useState<DemoOrderStatus>(order.status);
  const [note, setNote] = useState('');

  const handleStatusSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateStatus(order.orderReference, status, note.trim() || undefined);
    setNote('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Demo Order: ${order.orderReference}`}
      maxWidth="2xl"
    >
      <div className="space-y-6">
        {/* Customer & Status Header */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-pickle-cream/40 border border-pickle-cream-dark text-xs">
          <div className="space-y-1.5">
            <span className="font-bold text-pickle-burgundy text-sm block">
              {order.customer.fullName}
            </span>
            <div className="flex items-center gap-1.5 text-pickle-dark/70">
              <Phone className="w-3.5 h-3.5 text-pickle-red" />
              <span>+91 {order.customer.mobileNumber}</span>
            </div>
            <div className="flex items-start gap-1.5 text-pickle-dark/70">
              <MapPin className="w-3.5 h-3.5 text-pickle-red shrink-0 mt-0.5" />
              <span>
                {order.customer.deliveryAddress}, {order.customer.city} &ndash; {order.customer.postalCode}
              </span>
            </div>
            {order.customer.orderNotes && (
              <p className="italic text-pickle-dark/60 pt-1">
                Note: "{order.customer.orderNotes}"
              </p>
            )}
          </div>

          <div className="space-y-2 sm:text-right flex flex-col sm:items-end justify-between">
            <div>
              <span className="text-[11px] text-pickle-dark/50 block">Demo Order Date</span>
              <span className="font-mono text-pickle-dark font-medium">
                {new Date(order.createdAt).toLocaleString('en-IN', {
                  dateStyle: 'medium',
                  timeStyle: 'short',
                })}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <CreditCard className="w-3.5 h-3.5 text-pickle-burgundy" />
              <span className="font-semibold text-pickle-burgundy">{order.paymentMethod}</span>
            </div>
          </div>
        </div>

        {/* Status Update Form */}
        <form onSubmit={handleStatusSave} className="p-4 rounded-xl bg-white border border-pickle-cream-dark shadow-xs space-y-3">
          <h4 className="text-xs font-bold text-pickle-burgundy uppercase tracking-wider">
            Update Demo Order Status
          </h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-pickle-dark mb-1">
                Current Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as DemoOrderStatus)}
                className="w-full text-xs px-3 py-2 rounded-lg border border-pickle-cream-dark bg-pickle-cream/20 font-semibold focus:ring-2 focus:ring-pickle-red/30"
              >
                {ALL_STATUSES.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-pickle-dark mb-1">
                Status Activity Note (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Dispatched with delivery associate"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-lg border border-pickle-cream-dark bg-pickle-cream/20 focus:ring-2 focus:ring-pickle-red/30"
              />
            </div>
          </div>

          <div className="flex justify-end pt-1">
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-pickle-burgundy hover:bg-pickle-red text-white text-xs font-semibold rounded-lg transition-colors shadow-xs"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Update Status</span>
            </button>
          </div>
        </form>

        {/* Ordered Items Table */}
        <div>
          <h4 className="text-xs font-bold text-pickle-burgundy uppercase tracking-wider mb-2">
            Order Items ({order.items.length})
          </h4>
          <div className="border border-pickle-cream-dark rounded-xl overflow-hidden divide-y divide-pickle-cream-dark/60 text-xs">
            {order.items.map((item, idx) => (
              <div key={idx} className="p-3 flex items-center justify-between gap-3 bg-white">
                <div className="flex items-center gap-2 min-w-0">
                  <VegNonVegBadge category={item.product.category} size="sm" showLabel={false} />
                  <span className="font-semibold text-pickle-dark truncate">
                    {item.product.name}
                  </span>
                  <span className="text-pickle-dark/50 shrink-0">
                    ({item.product.packageSize}) &times; {item.quantity}
                  </span>
                </div>
                <span className="font-mono font-bold text-pickle-burgundy shrink-0">
                  {formatINR(item.product.price * item.quantity)}
                </span>
              </div>
            ))}
            <div className="p-3 bg-pickle-cream/30 flex justify-between font-bold text-sm text-pickle-burgundy">
              <span>Grand Total</span>
              <span className="font-serif text-base">{formatINR(order.grandTotal)}</span>
            </div>
          </div>
        </div>

        {/* Timeline visualization */}
        <OrderStatusTimeline currentStatus={order.status} history={order.statusHistory} />
      </div>
    </Modal>
  );
};
