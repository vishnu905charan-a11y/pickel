import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../../context/ProductContext';
import { useOrders } from '../../context/OrderContext';
import { AdminHeader } from '../../components/admin/AdminHeader';
import { AdminStatsCard } from '../../components/admin/AdminStatsCard';
import { AdminOrderModal } from '../../components/admin/AdminOrderModal';
import { AdminProductModal } from '../../components/admin/AdminProductModal';
import { formatINR } from '../../utils/currency';
import type { DemoOrder, DemoOrderStatus } from '../../types';
import { Package, ShoppingCart, Clock, CheckCircle2, TrendingUp, Plus, Eye, RotateCcw } from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const { products, resetToDefaultCatalog, addProduct } = useProducts();
  const { orders, updateOrderStatus } = useOrders();

  const [selectedOrder, setSelectedOrder] = useState<DemoOrder | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

  // Calculate live stats from local browser demo orders
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(
    (o) => o.status === 'Pending Confirmation' || o.status === 'Confirmed' || o.status === 'Preparing'
  ).length;
  const completedOrders = orders.filter((o) => o.status === 'Delivered').length;
  const mockSalesTotal = orders
    .filter((o) => o.status !== 'Cancelled')
    .reduce((sum, o) => sum + (o.grandTotal || 0), 0);

  const recentOrders = orders.slice(0, 5);

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

  return (
    <div className="space-y-8">
      {/* Admin Header */}
      <AdminHeader
        title="Dashboard Overview"
        subtitle="Frontend demonstration metrics calculated dynamically from browser storage."
        action={
          <button
            type="button"
            onClick={() => setIsProductModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-pickle-red hover:bg-pickle-burgundy text-white text-xs font-semibold rounded-lg shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Pickle</span>
          </button>
        }
      />

      {/* KPI Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <AdminStatsCard
          title="Total Catalog Products"
          value={totalProducts}
          subtitle={`${products.filter((p) => p.category === 'Veg Pickles').length} Veg, ${
            products.filter((p) => p.category === 'Non-Veg Pickles').length
          } Non-Veg`}
          icon={<Package className="w-6 h-6 text-pickle-burgundy" />}
          badgeColor="bg-pickle-cream"
        />

        <AdminStatsCard
          title="Total Demo Orders"
          value={totalOrders}
          subtitle="Saved in localStorage"
          icon={<ShoppingCart className="w-6 h-6 text-pickle-red" />}
          badgeColor="bg-red-50"
        />

        <AdminStatsCard
          title="Active / In-Kitchen"
          value={pendingOrders}
          subtitle="Simulated pipeline"
          icon={<Clock className="w-6 h-6 text-amber-600" />}
          badgeColor="bg-amber-50"
        />

        <AdminStatsCard
          title="Delivered Orders"
          value={completedOrders}
          subtitle="Completed demo flow"
          icon={<CheckCircle2 className="w-6 h-6 text-emerald-600" />}
          badgeColor="bg-emerald-50"
        />

        <AdminStatsCard
          title="Mock Sales Volume"
          value={formatINR(mockSalesTotal)}
          subtitle="Calculated from demo orders"
          icon={<TrendingUp className="w-6 h-6 text-pickle-green" />}
          badgeColor="bg-green-50"
        />
      </div>

      {/* Quick Navigation and Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-white rounded-2xl border border-pickle-cream-dark">
        <div className="flex items-center gap-2">
          <Link
            to="/admin/products"
            className="px-4 py-2 bg-pickle-cream hover:bg-pickle-cream-dark text-pickle-burgundy text-xs font-semibold rounded-xl border border-pickle-cream-dark transition-colors"
          >
            Manage All {totalProducts} Products &rarr;
          </Link>
          <Link
            to="/admin/orders"
            className="px-4 py-2 bg-pickle-cream hover:bg-pickle-cream-dark text-pickle-burgundy text-xs font-semibold rounded-xl border border-pickle-cream-dark transition-colors"
          >
            View All {totalOrders} Demo Orders &rarr;
          </Link>
        </div>

        <button
          type="button"
          onClick={() => {
            if (confirm('Reset product catalog back to the initial 43 traditional recipes?')) {
              resetToDefaultCatalog();
            }
          }}
          className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-pickle-dark/70 hover:text-pickle-red transition-colors"
          title="Reset to default 43 products"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Default Catalog</span>
        </button>
      </div>

      {/* Recent Demo Orders Table */}
      <div className="bg-white rounded-2xl border border-pickle-cream-dark overflow-hidden shadow-xs">
        <div className="p-5 border-b border-pickle-cream-dark flex items-center justify-between">
          <div>
            <h3 className="font-serif font-bold text-lg text-pickle-burgundy">
              Recent Demo Orders
            </h3>
            <p className="text-xs text-pickle-dark/60">
              Live records persisted in browser storage
            </p>
          </div>
          <Link
            to="/admin/orders"
            className="text-xs font-semibold text-pickle-red hover:underline"
          >
            See all orders &rarr;
          </Link>
        </div>

        {recentOrders.length === 0 ? (
          <div className="p-8 text-center text-xs text-pickle-dark/50">
            No orders created yet in this browser.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-pickle-cream/40 border-b border-pickle-cream-dark text-pickle-dark/70 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="px-5 py-3">Order Ref</th>
                  <th className="px-5 py-3">Customer</th>
                  <th className="px-5 py-3">Items</th>
                  <th className="px-5 py-3">Total Amount</th>
                  <th className="px-5 py-3">Payment</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-pickle-cream-dark/60 font-sans">
                {recentOrders.map((order) => (
                  <tr key={order.orderReference} className="hover:bg-pickle-cream/20 transition-colors">
                    <td className="px-5 py-3.5 font-mono font-bold text-pickle-burgundy">
                      {order.orderReference}
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="font-semibold text-pickle-dark block">{order.customer.fullName}</span>
                      <span className="text-[11px] text-pickle-dark/50">{order.customer.city}</span>
                    </td>
                    <td className="px-5 py-3.5 text-pickle-dark/70">
                      {order.items.reduce((sum, i) => sum + i.quantity, 0)} packs ({order.items.length} varieties)
                    </td>
                    <td className="px-5 py-3.5 font-mono font-bold text-pickle-dark">
                      {formatINR(order.grandTotal)}
                    </td>
                    <td className="px-5 py-3.5 text-pickle-dark/70">
                      {order.paymentMethod}
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${getStatusBadgeClass(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold bg-pickle-cream hover:bg-pickle-cream-dark text-pickle-burgundy rounded-lg transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Details</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modals */}
      <AdminOrderModal
        order={selectedOrder}
        isOpen={Boolean(selectedOrder)}
        onClose={() => setSelectedOrder(null)}
        onUpdateStatus={(ref, newStatus, note) => {
          updateOrderStatus(ref, newStatus, note);
          // Refresh local modal state
          const updated = orders.find((o) => o.orderReference === ref);
          if (updated) {
            setSelectedOrder({ ...updated, status: newStatus });
          }
        }}
      />

      <AdminProductModal
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        onSave={(data) => {
          addProduct({
            name: data.name,
            category: data.category,
            price: data.price,
            packageSize: data.packageSize,
            image: data.image,
            isAvailable: data.isAvailable,
          });
        }}
      />
    </div>
  );
};
