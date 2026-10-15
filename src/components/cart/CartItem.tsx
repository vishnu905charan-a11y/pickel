import React from 'react';
import { Trash2 } from 'lucide-react';
import type { CartItem as CartItemType } from '../../types';
import { formatINR, calculateLineTotal } from '../../utils/currency';
import { VegNonVegBadge } from '../common/Badge';
import { QuantitySelector } from '../products/QuantitySelector';
import { Link } from 'react-router-dom';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
  compact?: boolean;
}

export const CartItem: React.FC<CartItemProps> = ({
  item,
  onUpdateQuantity,
  onRemove,
  compact = false,
}) => {
  const { product, quantity } = item;
  const lineTotal = calculateLineTotal(product.price, quantity);

  return (
    <div className={`flex items-center gap-4 py-4 border-b border-pickle-cream-dark/60 last:border-0 ${compact ? 'py-3' : 'py-4'}`}>
      {/* Product Thumbnail */}
      <Link
        to={`/products/${product.slug}`}
        className="shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-pickle-cream/40 border border-pickle-cream-dark"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </Link>

      {/* Details & Controls */}
      <div className="grow min-w-0 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-1.5 mb-1">
            <VegNonVegBadge category={product.category} size="sm" showLabel={false} />
            <span className="text-[11px] text-pickle-dark/50">{product.packageSize}</span>
          </div>

          <Link
            to={`/products/${product.slug}`}
            className="font-serif font-bold text-sm sm:text-base text-pickle-dark hover:text-pickle-red transition-colors block truncate"
          >
            {product.name}
          </Link>

          <p className="text-xs text-pickle-dark/60 mt-0.5">
            Unit Price: <span className="font-semibold text-pickle-burgundy">{formatINR(product.price)}</span>
          </p>
        </div>

        {/* Quantity Controls and Line Total */}
        <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
          <QuantitySelector
            quantity={quantity}
            onChange={(newQty) => onUpdateQuantity(product.id, newQty)}
            size={compact ? 'sm' : 'md'}
            ariaLabel={`Quantity of ${product.name}`}
          />

          <div className="text-right min-w-[70px]">
            <span className="text-xs text-pickle-dark/50 block sm:hidden">Total</span>
            <span className="font-serif font-bold text-sm sm:text-base text-pickle-burgundy">
              {formatINR(lineTotal)}
            </span>
          </div>

          <button
            type="button"
            onClick={() => onRemove(product.id)}
            className="text-pickle-dark/40 hover:text-pickle-red p-1.5 rounded-lg hover:bg-red-50 transition-colors"
            title={`Remove ${product.name} from cart`}
            aria-label={`Remove ${product.name} from cart`}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
