import type { ProductCategory } from '../../types';

interface VegNonVegBadgeProps {
  category: ProductCategory;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export const VegNonVegBadge: React.FC<VegNonVegBadgeProps> = ({
  category,
  size = 'md',
  showLabel = true,
}) => {
  const isVeg = category === 'Veg Pickles';

  const boxSizes = {
    sm: 'w-4 h-4 p-[2px]',
    md: 'w-5 h-5 p-[3px]',
    lg: 'w-6 h-6 p-[4px]',
  };

  const dotSizes = {
    sm: 'w-1.5 h-1.5',
    md: 'w-2 h-2',
    lg: 'w-2.5 h-2.5',
  };

  const textSizes = {
    sm: 'text-xs',
    md: 'text-xs font-medium',
    lg: 'text-sm font-semibold',
  };

  return (
    <div className="inline-flex items-center gap-1.5" title={isVeg ? 'Vegetarian' : 'Non-Vegetarian'}>
      {/* Standard Indian Veg / Non-Veg food symbol */}
      <div
        className={`border-2 rounded-[3px] flex items-center justify-center shrink-0 ${
          boxSizes[size]
        } ${isVeg ? 'border-pickle-green' : 'border-pickle-red'}`}
      >
        <div
          className={`rounded-full ${dotSizes[size]} ${
            isVeg ? 'bg-pickle-green' : 'bg-pickle-red'
          }`}
        />
      </div>
      {showLabel && (
        <span
          className={`${textSizes[size]} ${
            isVeg ? 'text-pickle-green' : 'text-pickle-red'
          }`}
        >
          {isVeg ? 'Veg' : 'Non-Veg'}
        </span>
      )}
    </div>
  );
};
