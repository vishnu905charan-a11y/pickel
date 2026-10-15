import React, { createContext, useContext, useState, useEffect, useCallback, useMemo, type ReactNode } from 'react';
import type { Product } from '../types';
import { INITIAL_PRODUCTS } from '../data/products';
import { generateSlug } from '../utils/slug';

const STORAGE_KEY = 'pickle-mart-demo-products';

interface ProductContextType {
  products: Product[];
  vegProducts: Product[];
  nonVegProducts: Product[];
  getProductBySlug: (slug: string) => Product | undefined;
  getProductById: (id: string) => Product | undefined;
  addProduct: (product: Omit<Product, 'id' | 'slug'> & { name: string }) => Product;
  updateProduct: (id: string, updates: Partial<Product>) => boolean;
  deleteProduct: (id: string) => boolean;
  toggleAvailability: (id: string) => boolean;
  resetToDefaultCatalog: () => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

function loadInitialProducts(): Product[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('Failed to parse stored products, falling back to default catalog', err);
  }
  return INITIAL_PRODUCTS;
}

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(loadInitialProducts);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    } catch (err) {
      console.error('Failed to save products to localStorage', err);
    }
  }, [products]);

  const vegProducts = useMemo(() => {
    return products.filter((p) => p.category === 'Veg Pickles');
  }, [products]);

  const nonVegProducts = useMemo(() => {
    return products.filter((p) => p.category === 'Non-Veg Pickles');
  }, [products]);

  const getProductBySlug = useCallback((slug: string): Product | undefined => {
    return products.find((p) => p.slug.toLowerCase() === slug.toLowerCase());
  }, [products]);

  const getProductById = useCallback((id: string): Product | undefined => {
    return products.find((p) => p.id === id);
  }, [products]);

  const addProduct = useCallback((productData: Omit<Product, 'id' | 'slug'> & { name: string }): Product => {
    const id = `custom-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    const slug = generateSlug(productData.name);
    
    // Ensure slug uniqueness
    let finalSlug = slug;
    let counter = 1;
    while (products.some((p) => p.slug === finalSlug)) {
      finalSlug = `${slug}-${counter++}`;
    }

    const newProduct: Product = {
      ...productData,
      id,
      slug: finalSlug,
      packageSize: productData.packageSize || '250 g',
      isAvailable: productData.isAvailable ?? true,
      createdAt: new Date().toISOString(),
    };

    setProducts((prev) => [newProduct, ...prev]);
    return newProduct;
  }, [products]);

  const updateProduct = useCallback((id: string, updates: Partial<Product>): boolean => {
    let updated = false;
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          updated = true;
          const newSlug = updates.name && updates.name !== p.name 
            ? generateSlug(updates.name) 
            : (updates.slug || p.slug);
          return {
            ...p,
            ...updates,
            slug: newSlug,
          };
        }
        return p;
      })
    );
    return updated;
  }, []);

  const deleteProduct = useCallback((id: string): boolean => {
    let deleted = false;
    setProducts((prev) => {
      const filtered = prev.filter((p) => {
        if (p.id === id) {
          deleted = true;
          return false;
        }
        return true;
      });
      return filtered;
    });
    return deleted;
  }, []);

  const toggleAvailability = useCallback((id: string): boolean => {
    let found = false;
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          found = true;
          return { ...p, isAvailable: !p.isAvailable };
        }
        return p;
      })
    );
    return found;
  }, []);

  const resetToDefaultCatalog = useCallback(() => {
    setProducts(INITIAL_PRODUCTS);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        vegProducts,
        nonVegProducts,
        getProductBySlug,
        getProductById,
        addProduct,
        updateProduct,
        deleteProduct,
        toggleAvailability,
        resetToDefaultCatalog,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = (): ProductContextType => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
