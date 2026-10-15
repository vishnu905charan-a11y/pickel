import React, { useState, useMemo, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import type { Product, ProductCategory, SortOption } from '../types';
import { ProductFilters } from '../components/products/ProductFilters';
import { ProductGrid } from '../components/products/ProductGrid';
import { ProductQuickViewModal } from '../components/products/ProductQuickViewModal';
import { Breadcrumbs } from '../components/common/Breadcrumbs';

interface ProductsPageProps {
  initialCategory?: ProductCategory | 'All';
}

export const ProductsPage: React.FC<ProductsPageProps> = ({ initialCategory }) => {
  const { products, vegProducts, nonVegProducts } = useProducts();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  // Determine active category based on URL or prop
  const currentCategoryFromPath = useMemo((): ProductCategory | 'All' => {
    if (initialCategory) return initialCategory;
    if (location.pathname.includes('/veg') && !location.pathname.includes('/non-veg')) {
      return 'Veg Pickles';
    }
    if (location.pathname.includes('/non-veg')) {
      return 'Non-Veg Pickles';
    }
    return 'All';
  }, [location.pathname, initialCategory]);

  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'All'>(currentCategoryFromPath);
  const [searchQuery, setSearchQuery] = useState<string>(searchParams.get('search') || '');
  const [sortOption, setSortOption] = useState<SortOption>('featured');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Sync category when path changes
  useEffect(() => {
    setSelectedCategory(currentCategoryFromPath);
  }, [currentCategoryFromPath]);

  // Sync search query from URL parameter if provided
  useEffect(() => {
    const q = searchParams.get('search');
    if (q !== null) {
      setSearchQuery(q);
    }
  }, [searchParams]);

  const handleSearchChange = (q: string) => {
    setSearchQuery(q);
    if (q) {
      setSearchParams({ search: q });
    } else {
      searchParams.delete('search');
      setSearchParams(searchParams);
    }
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSortOption('featured');
    setSearchParams({});
  };

  const hasActiveFilters = searchQuery !== '' || selectedCategory !== 'All' || sortOption !== 'featured';

  // Filter and Sort logic
  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (selectedCategory !== 'All') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Search query filter (matches name)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter((p) => p.name.toLowerCase().includes(q));
    }

    // Sorting
    switch (sortOption) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'featured':
      default:
        // Featured products first, then original menu order
        result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        break;
    }

    return result;
  }, [products, selectedCategory, searchQuery, sortOption]);

  const pageTitle = useMemo(() => {
    if (selectedCategory === 'Veg Pickles') return 'Vegetarian Pickles';
    if (selectedCategory === 'Non-Veg Pickles') return 'Non-Vegetarian Pickles';
    return 'All 43 Traditional Pickles';
  }, [selectedCategory]);

  const breadcrumbs = useMemo(() => {
    if (selectedCategory === 'Veg Pickles') {
      return [{ label: 'Pickles', href: '/products' }, { label: 'Veg Pickles' }];
    }
    if (selectedCategory === 'Non-Veg Pickles') {
      return [{ label: 'Pickles', href: '/products' }, { label: 'Non-Veg Pickles' }];
    }
    return [{ label: 'All 43 Pickles' }];
  }, [selectedCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Breadcrumbs */}
      <Breadcrumbs items={breadcrumbs} />

      {/* Page Title & Description */}
      <div className="border-b border-pickle-cream-dark pb-6">
        <h1 className="font-serif font-black text-3xl sm:text-4xl text-pickle-burgundy">
          {pageTitle}
        </h1>
        <p className="text-sm text-pickle-dark/70 mt-2 max-w-2xl font-sans">
          {selectedCategory === 'Veg Pickles'
            ? 'Explore our full menu of 22 traditional Indian vegetarian pickles. All made in 250 g standard jars.'
            : selectedCategory === 'Non-Veg Pickles'
            ? 'Discover 21 mouth-watering chicken, mutton, prawn, and coastal fish pickles prepared with robust spices.'
            : 'Browse the complete Pickle Mart collection: 22 vegetarian and 21 non-vegetarian homemade pickles.'}
        </p>
      </div>

      {/* Filter and Search Bar */}
      <ProductFilters
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        sortOption={sortOption}
        onSortChange={setSortOption}
        totalCount={filteredAndSortedProducts.length}
        vegCount={vegProducts.length}
        nonVegCount={nonVegProducts.length}
        onClearFilters={handleClearFilters}
        hasActiveFilters={hasActiveFilters}
      />

      {/* Product Grid */}
      <ProductGrid
        products={filteredAndSortedProducts}
        onQuickView={(p) => setQuickViewProduct(p)}
        onResetFilters={handleClearFilters}
      />

      {/* Quick View Modal */}
      <ProductQuickViewModal
        product={quickViewProduct}
        isOpen={Boolean(quickViewProduct)}
        onClose={() => setQuickViewProduct(null)}
      />

    </div>
  );
};
