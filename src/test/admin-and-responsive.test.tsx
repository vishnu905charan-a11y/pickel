import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act, render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { ProductProvider, useProducts } from '../context/ProductContext';
import { CartProvider } from '../context/CartContext';
import { ToastProvider } from '../context/ToastContext';
import { OrderProvider } from '../context/OrderContext';
import { ProductCard } from '../components/products/ProductCard';
import { Navbar } from '../components/layout/Navbar';
import { INITIAL_PRODUCTS } from '../data/products';

const AllProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ToastProvider>
    <ProductProvider>
      <CartProvider>
        <OrderProvider>
          <MemoryRouter>{children}</MemoryRouter>
        </OrderProvider>
      </CartProvider>
    </ProductProvider>
  </ToastProvider>
);

describe('Admin Updates, Persistence, and Responsive Layouts', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('updates a product price and availability and reflects immediately in state', () => {
    const { result } = renderHook(() => useProducts(), {
      wrapper: ({ children }) => <ProductProvider>{children}</ProductProvider>,
    });

    const target = result.current.products[0];
    expect(target.price).toBe(150);

    act(() => {
      result.current.updateProduct(target.id, { price: 165, isAvailable: false });
    });

    const updated = result.current.getProductById(target.id);
    expect(updated?.price).toBe(165);
    expect(updated?.isAvailable).toBe(false);
  });

  it('adds a new custom pickle to the catalog with unique ID and slug', () => {
    const { result } = renderHook(() => useProducts(), {
      wrapper: ({ children }) => <ProductProvider>{children}</ProductProvider>,
    });

    const initialLength = result.current.products.length;

    let addedSlug = '';
    act(() => {
      const newProduct = result.current.addProduct({
        name: 'Special Spicy Garlic Gongura Pickle',
        category: 'Veg Pickles',
        price: 180,
        packageSize: '250 g',
        image: 'https://example.com/pickle.jpg',
        isAvailable: true,
      });
      addedSlug = newProduct.slug;
    });

    expect(result.current.products.length).toBe(initialLength + 1);
    expect(addedSlug).toBe('special-spicy-garlic-gongura-pickle');

    const retrieved = result.current.getProductBySlug(addedSlug);
    expect(retrieved).toBeDefined();
    expect(retrieved?.price).toBe(180);
  });

  it('deletes a product safely without crashing the catalog', () => {
    const { result } = renderHook(() => useProducts(), {
      wrapper: ({ children }) => <ProductProvider>{children}</ProductProvider>,
    });

    const firstProduct = result.current.products[0];

    act(() => {
      result.current.deleteProduct(firstProduct.id);
    });

    expect(result.current.getProductById(firstProduct.id)).toBeUndefined();
    expect(result.current.products.length).toBe(42);
  });

  it('resets catalog back to the seed 43 products', () => {
    const { result } = renderHook(() => useProducts(), {
      wrapper: ({ children }) => <ProductProvider>{children}</ProductProvider>,
    });

    act(() => {
      result.current.deleteProduct(result.current.products[0].id);
      result.current.resetToDefaultCatalog();
    });

    expect(result.current.products.length).toBe(43);
  });

  it('renders ProductCard accurately with Indian Veg / Non-Veg badge and price', () => {
    render(
      <AllProviders>
        <ProductCard product={INITIAL_PRODUCTS[0]} />
      </AllProviders>
    );

    expect(screen.getByText('Mango Avakaya Pickle')).toBeTruthy();
    expect(screen.getByText('₹150')).toBeTruthy();
    expect(screen.getByText('Veg')).toBeTruthy();
  });

  it('renders Navbar on both mobile and desktop viewports', () => {
    // Simulate desktop width (1200px)
    window.innerWidth = 1200;
    const { rerender } = render(
      <AllProviders>
        <Navbar />
      </AllProviders>
    );

    expect(screen.getByText('Pickle Mart')).toBeTruthy();
    expect(screen.getByText('All 43 Pickles')).toBeTruthy();

    // Simulate mobile width (375px)
    window.innerWidth = 375;
    rerender(
      <AllProviders>
        <Navbar />
      </AllProviders>
    );

    expect(screen.getByLabelText('Open mobile navigation menu')).toBeTruthy();
  });
});
