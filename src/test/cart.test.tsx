import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import React from 'react';
import { CartProvider, useCart } from '../context/CartContext';
import { ToastProvider } from '../context/ToastContext';
import { INITIAL_PRODUCTS } from '../data/products';
import { calculateLineTotal, formatINR } from '../utils/currency';

const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ToastProvider>
    <CartProvider>{children}</CartProvider>
  </ToastProvider>
);

describe('Shopping Cart Operations & Price Calculations', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const mangoAvakaya = INITIAL_PRODUCTS[0]; // ₹150
  const chickenPickle = INITIAL_PRODUCTS[22]; // ₹250

  it('calculates line total for 2 packs of Mango Avakaya Pickle as ₹300', () => {
    const lineTotal = calculateLineTotal(mangoAvakaya.price, 2);
    expect(lineTotal).toBe(300);
    expect(formatINR(lineTotal)).toBe('₹300');
  });

  it('adds product to cart and updates subtotal correctly', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mangoAvakaya, 2);
    });

    expect(result.current.itemCount).toBe(2);
    expect(result.current.subtotal).toBe(300);
    expect(result.current.grandTotal).toBe(300);
  });

  it('calculates subtotal correctly when multiple products are added', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mangoAvakaya, 2); // 2 * 150 = 300
      result.current.addToCart(chickenPickle, 1); // 1 * 250 = 250
    });

    expect(result.current.itemCount).toBe(3);
    expect(result.current.subtotal).toBe(550);
    expect(result.current.grandTotal).toBe(550);
  });

  it('decreasing quantity updates the total and never drops below 1', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mangoAvakaya, 3); // 3 * 150 = 450
    });
    expect(result.current.subtotal).toBe(450);

    act(() => {
      result.current.updateQuantity(mangoAvakaya.id, 2); // 2 * 150 = 300
    });
    expect(result.current.itemCount).toBe(2);
    expect(result.current.subtotal).toBe(300);

    // Attempting to set quantity <= 0 clamps to 1
    act(() => {
      result.current.updateQuantity(mangoAvakaya.id, 0);
    });
    expect(result.current.itemCount).toBe(1);
    expect(result.current.subtotal).toBe(150);
  });

  it('removing an item updates the cart item count and total', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mangoAvakaya, 2);
      result.current.addToCart(chickenPickle, 1);
    });
    expect(result.current.itemCount).toBe(3);
    expect(result.current.subtotal).toBe(550);

    act(() => {
      result.current.removeFromCart(mangoAvakaya.id);
    });

    expect(result.current.itemCount).toBe(1);
    expect(result.current.subtotal).toBe(250);
    expect(result.current.cart.some((i) => i.product.id === mangoAvakaya.id)).toBe(false);
  });

  it('clearing the cart empties all items', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mangoAvakaya, 2);
      result.current.clearCart();
    });

    expect(result.current.cart).toHaveLength(0);
    expect(result.current.itemCount).toBe(0);
    expect(result.current.subtotal).toBe(0);
  });

  it('handles invalid or corrupted localStorage data gracefully without crashing', () => {
    localStorage.setItem('pickle-mart-cart', 'invalid-non-json-content{');

    const { result } = renderHook(() => useCart(), { wrapper });
    expect(result.current.cart).toEqual([]);
    expect(result.current.itemCount).toBe(0);
  });
});
