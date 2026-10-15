import React, { useState, useMemo } from 'react';
import { useProducts } from '../../context/ProductContext';
import { AdminHeader } from '../../components/admin/AdminHeader';
import { AdminProductModal } from '../../components/admin/AdminProductModal';
import type { Product, ProductCategory } from '../../types';
import { formatINR } from '../../utils/currency';
import { VegNonVegBadge } from '../../components/common/Badge';
import { Plus, Search, Edit2, Trash2, CheckCircle2, XCircle, RotateCcw } from 'lucide-react';

export const AdminProductsPage: React.FC = () => {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    toggleAvailability,
    resetToDefaultCatalog,
  } = useProducts();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'All'>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchCat = selectedCategory === 'All' || p.category === selectedCategory;
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase().trim());
      return matchCat && matchSearch;
    });
  }, [products, selectedCategory, search]);

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (p: Product) => {
    setEditingProduct(p);
    setIsModalOpen(true);
  };

  const handleSave = (data: {
    id?: string;
    name: string;
    category: ProductCategory;
    price: number;
    packageSize: string;
    image: string;
    isAvailable: boolean;
  }) => {
    if (data.id) {
      updateProduct(data.id, {
        name: data.name,
        category: data.category,
        price: data.price,
        packageSize: data.packageSize,
        image: data.image,
        isAvailable: data.isAvailable,
      });
    } else {
      addProduct({
        name: data.name,
        category: data.category,
        price: data.price,
        packageSize: data.packageSize,
        image: data.image,
        isAvailable: data.isAvailable,
      });
    }
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Are you sure you want to remove "${name}" from demo catalog?`)) {
      deleteProduct(id);
    }
  };

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Product Catalog Management"
        subtitle="Add, edit, or adjust prices and availability across all 43 varieties."
        action={
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleOpenAdd}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-pickle-red hover:bg-pickle-burgundy text-white text-xs font-semibold rounded-lg shadow-xs transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Pickle</span>
            </button>
          </div>
        }
      />

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-pickle-cream-dark p-4 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="relative grow max-w-sm">
          <input
            type="text"
            placeholder="Search by pickle name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-pickle-cream-dark bg-pickle-cream/30 focus:bg-white focus:outline-none focus:ring-2 focus:ring-pickle-red/30"
          />
          <Search className="w-4 h-4 text-pickle-dark/40 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as ProductCategory | 'All')}
            className="text-xs px-3 py-2 rounded-xl border border-pickle-cream-dark bg-pickle-cream/30 focus:outline-none font-medium"
          >
            <option value="All">All Categories ({products.length})</option>
            <option value="Veg Pickles">
              Veg Pickles ({products.filter((p) => p.category === 'Veg Pickles').length})
            </option>
            <option value="Non-Veg Pickles">
              Non-Veg Pickles ({products.filter((p) => p.category === 'Non-Veg Pickles').length})
            </option>
          </select>

          <button
            type="button"
            onClick={() => {
              if (confirm('Restore catalog to default 43 products? Any custom additions will be reset.')) {
                resetToDefaultCatalog();
              }
            }}
            className="text-xs text-pickle-dark/60 hover:text-pickle-red flex items-center gap-1 px-2.5 py-2 rounded-xl hover:bg-pickle-cream"
            title="Reset catalog to seed 43 products"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset 43</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-pickle-cream-dark overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-pickle-cream/40 border-b border-pickle-cream-dark text-pickle-dark/70 font-semibold uppercase tracking-wider">
              <tr>
                <th className="px-5 py-3">Product</th>
                <th className="px-5 py-3">Category</th>
                <th className="px-5 py-3">Price</th>
                <th className="px-5 py-3">Size</th>
                <th className="px-5 py-3 text-center">Status</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-pickle-cream-dark/60">
              {filteredProducts.map((p) => (
                <tr key={p.id} className="hover:bg-pickle-cream/20 transition-colors">
                  <td className="px-5 py-3 flex items-center gap-3">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-10 h-10 rounded-lg object-cover bg-pickle-cream shrink-0"
                    />
                    <div>
                      <span className="font-semibold text-pickle-dark text-sm block">
                        {p.name}
                      </span>
                      <span className="text-[10px] text-pickle-dark/40 font-mono">
                        slug: /{p.slug}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <VegNonVegBadge category={p.category} size="sm" showLabel={true} />
                  </td>
                  <td className="px-5 py-3 font-mono font-bold text-pickle-burgundy text-sm">
                    {formatINR(p.price)}
                  </td>
                  <td className="px-5 py-3 text-pickle-dark/70">
                    {p.packageSize}
                  </td>
                  <td className="px-5 py-3 text-center">
                    <button
                      type="button"
                      onClick={() => toggleAvailability(p.id)}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold border transition-colors cursor-pointer ${
                        p.isAvailable
                          ? 'bg-green-50 text-pickle-green border-pickle-green/30 hover:bg-green-100'
                          : 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100'
                      }`}
                      title="Click to toggle availability"
                    >
                      {p.isAvailable ? (
                        <>
                          <CheckCircle2 className="w-3 h-3" />
                          <span>In Stock</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3 h-3" />
                          <span>Out of Stock</span>
                        </>
                      )}
                    </button>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleOpenEdit(p)}
                        className="p-1.5 text-pickle-dark/70 hover:text-pickle-burgundy rounded-lg hover:bg-pickle-cream transition-colors"
                        title="Edit product"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(p.id, p.name)}
                        className="p-1.5 text-pickle-dark/40 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                        title="Delete product"
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
      </div>

      {/* Add / Edit Modal */}
      <AdminProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        productToEdit={editingProduct}
        onSave={handleSave}
      />
    </div>
  );
};
