import React, { useState, useMemo } from 'react';
import { useOrders } from '../../context/OrderContext';
import { AdminHeader } from '../../components/admin/AdminHeader';
import { AdminOrderModal } from '../../components/admin/AdminOrderModal';
import type { DemoOrder, DemoOrderStatus } from '../../types';
import { formatINR } from '../../utils/currency';
import { Search, Eye, Trash2 } from 'lucide-react';

export const AdminOrdersPage: React.FC = () => {
  const { orders, updateOrderStatus, deleteOrder } = useOrders();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<DemoOrderStatus | 'All'>('All');
  const [selectedOrder, setSelectedOrder] = useState<DemoOrder | null>(null);

  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const matchStatus = statusFilter === 'All' || o.status === statusFilter;
      const q = search.toLowerCase().trim();
      const matchSearch =
        o.orderReference.toLowerCase().includes(q) ||
        o.customer.fullName.toLowerCase().includes(q) ||
        o.customer.city.toLowerCase().includes(q);
      return matchStatus && matchSearch;
    });
  }, [orders, statusFilter, search]);

  const getStatusBadgeClass = (status: DemoOrderStatus) => {
    switch (status) {
      case 'Delivered':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Dispatched':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Preparing':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Confirmed':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'Cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Pending Confirmation':
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleDelete = (ref: string) => {
    if (confirm(`Delete demo order ${ref} from browser storage?`)) {
      deleteOrder(ref);
    }
  };

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Demo Orders Management"
        subtitle="Manage simulated orders, inspect customer shipping details, and test delivery tracking timelines."
      />

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-pickle-cream-dark p-4 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="relative grow max-w-sm">
          <input
            type="text"
            placeholder="Search by ref, customer name, or city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-pickle-cream-dark bg-pickle-cream/30 focus:bg-white focus:outline-none focus:ring-2 focus:ring-pickle-red/30"
          />
          <Search className="w-4 h-4 text-pickle-dark/40 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as DemoOrderStatus | 'All')}
            className="text-xs px-3 py-2 rounded-xl border border-pickle-cream-dark bg-pickle-cream/30 focus:outline-none font-medium"
          >
            <option value="All">All Statuses ({orders.length})</option>
            <option value="Pending Confirmation">Pending Confirmation</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Preparing">Preparing</option>
            <option value="Dispatched">Dispatched</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-pickle-cream-dark overflow-hidden shadow-xs">
        {filteredOrders.length === 0 ? (
          <div className="p-12 text-center text-xs text-pickle-dark/50">
            No demo orders found matching your criteria.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-pickle-cream/40 border-b border-pickle-cream-dark text-pickle-dark/70 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="px-5 py-3">Order Ref</th>
                  <th className="px-5 py-3">Date</th>
                  <th className="px-5 py-3">Customer</th>
                  <th className="px-5 py-3">Items</th>
                  <th className="px-5 py-3">Grand Total</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-pickle-cream-dark/60 font-sans">
                {filteredOrders.map((order) => (
                  <tr key={order.orderReference} className="hover:bg-pickle-cream/20 transition-colors">
                    <td className="px-5 py-3.5 font-mono font-bold text-pickle-burgundy">
                      {order.orderReference}
                    </td>
                    <td className="px-5 py-3.5 text-pickle-dark/60 whitespace-nowrap">
                      {new Date(order.createdAt).toLocaleDateString('en-IN', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="font-semibold text-pickle-dark block">{order.customer.fullName}</span>
                      <span className="text-[11px] text-pickle-dark/50">+91 {order.customer.mobileNumber}</span>
                    </td>
                    <td className="px-5 py-3.5 text-pickle-dark/70">
                      {order.items.reduce((sum, i) => sum + i.quantity, 0)} packs
                    </td>
                    <td className="px-5 py-3.5 font-mono font-bold text-pickle-dark">
                      {formatINR(order.grandTotal)}
                    </td>
                    <td className="px-5 py-3.5">
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.orderReference, e.target.value as DemoOrderStatus)}
                        className={`text-[11px] font-bold px-2 py-0.5 rounded-full border cursor-pointer ${getStatusBadgeClass(
                          order.status
                        )}`}
                      >
                        <option value="Pending Confirmation">Pending Confirmation</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Preparing">Preparing</option>
                        <option value="Dispatched">Dispatched</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => setSelectedOrder(order)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold bg-pickle-cream hover:bg-pickle-cream-dark text-pickle-burgundy rounded-lg transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(order.orderReference)}
                          className="p-1 text-pickle-dark/40 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                          title="Delete demo order"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Details Modal */}
      <AdminOrderModal
        order={selectedOrder}
        isOpen={Boolean(selectedOrder)}
        onClose={() => setSelectedOrder(null)}
        onUpdateStatus={(ref, newStatus, note) => {
          updateOrderStatus(ref, newStatus, note);
          const updated = orders.find((o) => o.orderReference === ref);
          if (updated) {
            setSelectedOrder({ ...updated, status: newStatus });
          }
        }}
      />
    </div>
  );
};
