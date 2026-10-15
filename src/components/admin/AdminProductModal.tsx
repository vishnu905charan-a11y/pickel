import React, { useState, useEffect } from 'react';
import type { Product, ProductCategory } from '../../types';
import { Modal } from '../common/Modal';
import { Upload, AlertCircle, Image as ImageIcon } from 'lucide-react';

interface AdminProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  productToEdit?: Product | null;
  onSave: (productData: {
    id?: string;
    name: string;
    category: ProductCategory;
    price: number;
    packageSize: string;
    image: string;
    isAvailable: boolean;
  }) => void;
}

export const AdminProductModal: React.FC<AdminProductModalProps> = ({
  isOpen,
  onClose,
  productToEdit,
  onSave,
}) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<ProductCategory>('Veg Pickles');
  const [price, setPrice] = useState<number | ''>(150);
  const [packageSize, setPackageSize] = useState('250 g');
  const [image, setImage] = useState('');
  const [isAvailable, setIsAvailable] = useState(true);
  const [errors, setErrors] = useState<{ name?: string; price?: string }>({});

  useEffect(() => {
    if (productToEdit) {
      setName(productToEdit.name);
      setCategory(productToEdit.category);
      setPrice(productToEdit.price);
      setPackageSize(productToEdit.packageSize || '250 g');
      setImage(productToEdit.image);
      setIsAvailable(productToEdit.isAvailable);
    } else {
      setName('');
      setCategory('Veg Pickles');
      setPrice(140);
      setPackageSize('250 g');
      setImage('https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80');
      setIsAvailable(true);
    }
    setErrors({});
  }, [productToEdit, isOpen]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { name?: string; price?: string } = {};

    if (!name.trim() || name.trim().length < 3) {
      newErrors.name = 'Product name must be at least 3 characters.';
    }

    if (price === '' || isNaN(Number(price)) || Number(price) <= 0) {
      newErrors.price = 'Please enter a valid price in INR greater than 0.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave({
      id: productToEdit?.id,
      name: name.trim(),
      category,
      price: Number(price),
      packageSize: packageSize.trim() || '250 g',
      image: image.trim() || 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80',
      isAvailable,
    });

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={productToEdit ? `Edit Product: ${productToEdit.name}` : 'Add New Demo Pickle'}
      maxWidth="xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div className="space-y-1">
          <label className="block text-xs font-semibold text-pickle-dark">
            Product Name *
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Gongura Chicken Pickle"
            className="w-full px-3.5 py-2 text-sm rounded-xl border border-pickle-cream-dark bg-white focus:outline-none focus:ring-2 focus:ring-pickle-red/30"
          />
          {errors.name && (
            <p className="text-xs text-red-600 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errors.name}</span>
            </p>
          )}
        </div>

        {/* Category & Price */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-pickle-dark">
              Category *
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as ProductCategory)}
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-pickle-cream-dark bg-white focus:outline-none focus:ring-2 focus:ring-pickle-red/30"
            >
              <option value="Veg Pickles">Veg Pickles</option>
              <option value="Non-Veg Pickles">Non-Veg Pickles</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-semibold text-pickle-dark">
              Price (INR ₹) *
            </label>
            <input
              type="number"
              min={1}
              value={price}
              onChange={(e) => setPrice(e.target.value === '' ? '' : Number(e.target.value))}
              placeholder="e.g. 150"
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-pickle-cream-dark bg-white focus:outline-none focus:ring-2 focus:ring-pickle-red/30"
            />
            {errors.price && (
              <p className="text-xs text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.price}</span>
              </p>
            )}
          </div>
        </div>

        {/* Package Size & Availability */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-pickle-dark">
              Package Size
            </label>
            <input
              type="text"
              value={packageSize}
              onChange={(e) => setPackageSize(e.target.value)}
              placeholder="250 g"
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-pickle-cream-dark bg-white focus:outline-none focus:ring-2 focus:ring-pickle-red/30"
            />
          </div>

          <div className="pt-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isAvailable}
                onChange={(e) => setIsAvailable(e.target.checked)}
                className="w-4 h-4 text-pickle-red rounded focus:ring-pickle-red"
              />
              <span className="text-xs font-semibold text-pickle-dark">
                Mark as In Stock / Available
              </span>
            </label>
          </div>
        </div>

        {/* Image Preview & URL or File Upload */}
        <div className="space-y-2 pt-2 border-t border-pickle-cream-dark">
          <label className="block text-xs font-semibold text-pickle-dark">
            Product Image (URL or Local Upload Preview)
          </label>
          
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 rounded-xl overflow-hidden bg-pickle-cream border border-pickle-cream-dark shrink-0 flex items-center justify-center">
              {image ? (
                <img src={image} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <ImageIcon className="w-6 h-6 text-pickle-dark/40" />
              )}
            </div>

            <div className="grow space-y-2">
              <input
                type="url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="https://..."
                className="w-full px-3 py-1.5 text-xs rounded-lg border border-pickle-cream-dark bg-white focus:outline-none focus:ring-2 focus:ring-pickle-red/30"
              />

              <label className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-lg bg-pickle-cream hover:bg-pickle-cream-dark text-pickle-burgundy cursor-pointer">
                <Upload className="w-3.5 h-3.5" />
                <span>Upload Local Image Preview</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-pickle-cream-dark">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-pickle-dark/70 hover:bg-pickle-cream rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 text-xs font-semibold bg-pickle-red hover:bg-pickle-burgundy text-white rounded-xl shadow-xs transition-colors"
          >
            {productToEdit ? 'Save Changes' : 'Create Product'}
          </button>
        </div>
      </form>
    </Modal>
  );
};
