import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight, Check } from 'lucide-react';
import type { Product } from '../../types';
import { formatINR } from '../../utils/currency';
import { Modal } from '../common/Modal';
import { VegNonVegBadge } from '../common/Badge';
import { QuantitySelector } from './QuantitySelector';
import { useCart } from '../../context/CartContext';

interface ProductQuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProductQuickViewModal: React.FC<ProductQuickViewModalProps> = ({
  product,
  isOpen,
  onClose,
}) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  if (!product) return null;

  const handleAddToCart = () => {
    if (!product.isAvailable) return;
    addToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 900);
  };

  const isVeg = product.category === 'Veg Pickles';

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Quick Look" maxWidth="2xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
        {/* Product Image */}
        <div className="relative aspect-square rounded-xl overflow-hidden bg-pickle-cream/40 border border-pickle-cream-dark">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 left-3 bg-white/95 px-2.5 py-1 rounded-md shadow-xs">
            <VegNonVegBadge category={product.category} size="md" />
          </div>
        </div>

        {/* Product Details */}
        <div className="flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between text-xs text-pickle-dark/60 mb-1">
              <span className="font-semibold text-pickle-mustard-dark">
                {isVeg ? 'Traditional Veg Pickle' : 'Spiced Non-Veg Pickle'}
              </span>
              <span className="bg-pickle-cream px-2 py-0.5 rounded text-pickle-dark font-medium">
                Standard Net Wt: {product.packageSize}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-serif font-bold text-pickle-dark">
              {product.name}
            </h2>

            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl font-serif font-bold text-pickle-burgundy">
                {formatINR(product.price)}
              </span>
              <span className="text-xs text-pickle-dark/50">per 250 g jar</span>
            </div>

            <p className="text-xs text-pickle-dark/70 mt-3 leading-relaxed">
              Authentic traditional Indian pickle prepared using grandma's time-honored recipe, premium oil, and freshly roasted whole spices.
            </p>
          </div>

          {/* Availability Status */}
          <div className="pt-2">
            {!product.isAvailable ? (
              <span className="text-xs font-bold text-red-600 bg-red-50 border border-red-200 px-3 py-1 rounded-md inline-block">
                Currently Out of Stock
              </span>
            ) : (
              <span className="text-xs font-semibold text-pickle-green bg-green-50 border border-pickle-green/20 px-2.5 py-1 rounded-md inline-flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-pickle-green animate-pulse" />
                In Stock & Ready for Dispatch
              </span>
            )}
          </div>

          {/* Quantity and Add to Cart */}
          <div className="space-y-3 pt-3 border-t border-pickle-cream-dark">
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-pickle-dark/70">Quantity:</span>
              <QuantitySelector
                quantity={quantity}
                onChange={setQuantity}
                ariaLabel={`Quantity of ${product.name}`}
              />
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={!product.isAvailable || isAdded}
                className={`grow py-3 px-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-sm ${
                  !product.isAvailable
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : isAdded
                    ? 'bg-emerald-600 text-white'
                    : 'bg-pickle-red hover:bg-pickle-burgundy text-white cursor-pointer'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart ({formatINR(product.price * quantity)})</span>
                  </>
                )}
              </button>
            </div>

            {/* View Full Product Details Link */}
            <div className="text-center pt-2">
              <Link
                to={`/products/${product.slug}`}
                onClick={onClose}
                className="inline-flex items-center gap-1 text-xs font-semibold text-pickle-burgundy hover:text-pickle-red underline"
              >
                <span>View Full Product Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
