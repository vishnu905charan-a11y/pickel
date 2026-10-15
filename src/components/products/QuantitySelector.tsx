import React from 'react';
import { Minus, Plus } from 'lucide-react';

interface QuantitySelectorProps {
  quantity: number;
  onChange: (newQuantity: number) => void;
  min?: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  ariaLabel?: string;
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  onChange,
  min = 1,
  max = 99,
  size = 'md',
  ariaLabel = 'Product quantity',
}) => {
  const handleDecrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (quantity > min) {
      onChange(quantity - 1);
    }
  };

  const handleIncrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (quantity < max) {
      onChange(quantity + 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val)) {
      if (val >= min && val <= max) {
        onChange(val);
      }
    } else if (e.target.value === '') {
      onChange(min);
    }
  };

  const sizeClasses = {
    sm: 'h-8 text-xs',
    md: 'h-9 text-sm',
    lg: 'h-11 text-base',
  };

  const btnWidth = {
    sm: 'w-7',
    md: 'w-8',
    lg: 'w-10',
  };

  const inputWidth = {
    sm: 'w-9',
    md: 'w-11',
    lg: 'w-14',
  };

  return (
    <div
      className={`inline-flex items-center rounded-lg border border-pickle-cream-dark bg-white overflow-hidden shadow-xs ${sizeClasses[size]}`}
      onClick={(e) => e.stopPropagation()}
    >
      <button
        type="button"
        onClick={handleDecrement}
        disabled={quantity <= min}
        className={`${btnWidth[size]} h-full flex items-center justify-center text-pickle-dark/70 hover:bg-pickle-cream hover:text-pickle-red disabled:opacity-30 disabled:pointer-events-none transition-colors`}
        aria-label={`Decrease ${ariaLabel}`}
      >
        <Minus className="w-3.5 h-3.5" />
      </button>

      <input
        type="number"
        min={min}
        max={max}
        value={quantity}
        onChange={handleInputChange}
        className={`${inputWidth[size]} h-full text-center font-bold text-pickle-dark bg-transparent focus:outline-none focus:bg-pickle-cream/30`}
        aria-label={ariaLabel}
      />

      <button
        type="button"
        onClick={handleIncrement}
        disabled={quantity >= max}
        className={`${btnWidth[size]} h-full flex items-center justify-center text-pickle-dark/70 hover:bg-pickle-cream hover:text-pickle-red disabled:opacity-30 disabled:pointer-events-none transition-colors`}
        aria-label={`Increase ${ariaLabel}`}
      >
        <Plus className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
