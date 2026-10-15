import React from 'react';
import { Search, X, ArrowUpDown, Filter } from 'lucide-react';
import type { ProductCategory, SortOption } from '../../types';
import { VegNonVegBadge } from '../common/Badge';

interface ProductFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: ProductCategory | 'All';
  onCategoryChange: (category: ProductCategory | 'All') => void;
  sortOption: SortOption;
  onSortChange: (sort: SortOption) => void;
  totalCount: number;
  vegCount: number;
  nonVegCount: number;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  sortOption,
  onSortChange,
  totalCount,
  vegCount,
  nonVegCount,
  onClearFilters,
  hasActiveFilters,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-pickle-cream-dark p-4 sm:p-6 shadow-xs space-y-4 mb-8">
      
      {/* Top Row: Search and Sort */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        
        {/* Search Field */}
        <div className="relative grow max-w-lg">
          <input
            type="text"
            placeholder="Search by pickle name (e.g., Avakaya, Chicken, Gongura)..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-9 py-2.5 text-sm bg-pickle-cream/40 border border-pickle-cream-dark rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-pickle-red/30 transition-all text-pickle-dark placeholder-pickle-dark/50"
            aria-label="Search products"
          />
          <Search className="w-4 h-4 text-pickle-dark/50 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-pickle-dark/40 hover:text-pickle-dark p-0.5"
              aria-label="Clear search query"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2 shrink-0">
          <label htmlFor="sort-select" className="text-xs font-semibold text-pickle-dark/70 flex items-center gap-1">
            <ArrowUpDown className="w-3.5 h-3.5 text-pickle-red" />
            <span>Sort by:</span>
          </label>
          <select
            id="sort-select"
            value={sortOption}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="bg-pickle-cream/40 border border-pickle-cream-dark text-pickle-dark text-xs sm:text-sm rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pickle-red/30 cursor-pointer font-medium"
          >
            <option value="featured">Featured / Default</option>
            <option value="price-asc">Price: Low to High (₹)</option>
            <option value="price-desc">Price: High to Low (₹)</option>
            <option value="name-asc">Alphabetical: A to Z</option>
            <option value="name-desc">Alphabetical: Z to A</option>
          </select>
        </div>
      </div>

      {/* Bottom Row: Category Buttons & Active Filters Reset */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-pickle-cream-dark/60">
        
        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => onCategoryChange('All')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              selectedCategory === 'All'
                ? 'bg-pickle-burgundy text-pickle-cream shadow-xs'
                : 'bg-pickle-cream/60 hover:bg-pickle-cream text-pickle-dark'
            }`}
          >
            All Pickles ({vegCount + nonVegCount})
          </button>

          <button
            type="button"
            onClick={() => onCategoryChange('Veg Pickles')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              selectedCategory === 'Veg Pickles'
                ? 'bg-pickle-green text-white shadow-xs'
                : 'bg-green-50/80 hover:bg-green-100 text-pickle-green border border-pickle-green/20'
            }`}
          >
            <VegNonVegBadge category="Veg Pickles" size="sm" showLabel={false} />
            <span>Veg Pickles ({vegCount})</span>
          </button>

          <button
            type="button"
            onClick={() => onCategoryChange('Non-Veg Pickles')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              selectedCategory === 'Non-Veg Pickles'
                ? 'bg-pickle-red text-white shadow-xs'
                : 'bg-red-50/80 hover:bg-red-100 text-pickle-red border border-pickle-red/20'
            }`}
          >
            <VegNonVegBadge category="Non-Veg Pickles" size="sm" showLabel={false} />
            <span>Non-Veg Pickles ({nonVegCount})</span>
          </button>
        </div>

        {/* Clear Active Filters */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-pickle-dark/60 font-medium">
            Showing <strong className="text-pickle-burgundy">{totalCount}</strong> products
          </span>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={onClearFilters}
              className="text-xs text-pickle-red hover:underline font-semibold flex items-center gap-1"
            >
              <Filter className="w-3 h-3" />
              <span>Reset filters</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
