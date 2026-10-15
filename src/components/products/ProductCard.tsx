import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Eye, Check } from 'lucide-react';
import type { Product } from '../../types';
import { formatINR } from '../../utils/currency';
import { VegNonVegBadge } from '../common/Badge';
import { useCart } from '../../context/CartContext';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const { addToCart } = useCart();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!product.isAvailable) return;

    setIsAdding(true);
    addToCart(product, 1);
    setTimeout(() => {
      setIsAdding(false);
    }, 800);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onQuickView) {
      onQuickView(product);
    }
  };

  const isVeg = product.category === 'Veg Pickles';

  return (
    <div className="group relative flex flex-col bg-white rounded-2xl border border-pickle-cream-dark/80 overflow-hidden shadow-xs hover:shadow-pickle hover:border-pickle-mustard/50 transition-all duration-300">
      {/* Product Image Container */}
      <div className="relative aspect-square w-full bg-pickle-cream/40 overflow-hidden">
        <Link to={`/products/${product.slug}`} className="block w-full h-full">
          {/* Fallback pattern if image is loading or error */}
          {(!imageLoaded || imageError) && (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-gradient-to-b from-pickle-cream/50 to-pickle-cream-dark/40 text-pickle-burgundy/40">
              <svg viewBox="0 0 64 64" className="w-16 h-16 fill-current text-pickle-red/20 mb-2">
                <path d="M22 14h20v4H22zm-3 4h26v4H19zm-3 8h32v24a10 10 0 0 1-10 10H26a10 10 0 0 1-10-10V26z" />
              </svg>
              <span className="text-[11px] font-medium text-pickle-dark/50">Pickle Mart Standard Jar</span>
            </div>
          )}

          {!imageError && (
            <img
              src={product.image}
              alt={`${product.name} (250g)`}
              loading="lazy"
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
              className={`w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            />
          )}
        </Link>

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
          {/* Veg / Non-Veg Indicator Badge */}
          <div className="bg-white/95 backdrop-blur-xs px-2 py-1 rounded-md shadow-xs pointer-events-auto">
            <VegNonVegBadge category={product.category} size="sm" showLabel={true} />
          </div>

          {/* Availability / Package Size Badge */}
          {!product.isAvailable ? (
            <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-xs uppercase tracking-wider">
              Out of Stock
            </span>
          ) : (
            <span className="bg-pickle-burgundy/90 text-pickle-cream text-[10px] font-semibold px-2 py-0.5 rounded shadow-xs">
              {product.packageSize}
            </span>
          )}
        </div>

        {/* Quick View Button Hover Overlay */}
        {onQuickView && (
          <button
            type="button"
            onClick={handleQuickView}
            className="absolute bottom-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 px-3.5 py-1.5 bg-white/95 hover:bg-white text-pickle-burgundy rounded-full text-xs font-semibold shadow-md flex items-center gap-1.5 whitespace-nowrap cursor-pointer z-10"
            aria-label={`Quick view ${product.name}`}
          >
            <Eye className="w-3.5 h-3.5 text-pickle-red" />
            <span>Quick View</span>
          </button>
        )}
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-5 flex flex-col grow justify-between">
        <div>
          {/* Category subtitle */}
          <div className="flex items-center justify-between text-xs text-pickle-dark/60 mb-1.5">
            <span className="font-medium text-pickle-mustard-dark">
              {isVeg ? 'Traditional Veg Pickle' : 'Spiced Non-Veg Pickle'}
            </span>
            <span className="text-[11px] bg-pickle-cream/60 px-1.5 py-0.5 rounded text-pickle-dark/70 font-medium">
              Net Wt: 250g
            </span>
          </div>

          {/* Product Title */}
          <h3 className="font-serif font-bold text-base sm:text-lg text-pickle-dark line-clamp-1 group-hover:text-pickle-red transition-colors">
            <Link to={`/products/${product.slug}`} title={product.name}>
              {product.name}
            </Link>
          </h3>
        </div>

        {/* Price & Add to Cart Action */}
        <div className="mt-4 pt-3 border-t border-pickle-cream-dark/60 flex items-center justify-between gap-2">
          <div>
            <span className="text-xs text-pickle-dark/50 block">Price</span>
            <span className="text-lg sm:text-xl font-bold font-serif text-pickle-burgundy">
              {formatINR(product.price)}
            </span>
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            disabled={!product.isAvailable || isAdding}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer ${
              !product.isAvailable
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : isAdding
                ? 'bg-emerald-600 text-white scale-95'
                : 'bg-pickle-red hover:bg-pickle-burgundy text-white active:scale-95'
            }`}
            aria-label={`Add ${product.name} to cart`}
          >
            {isAdding ? (
              <>
                <Check className="w-4 h-4" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
