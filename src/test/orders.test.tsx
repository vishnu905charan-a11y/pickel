import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import React from 'react';
import { OrderProvider, useOrders } from '../context/OrderContext';
import { INITIAL_PRODUCTS } from '../data/products';
import type { CustomerInfo } from '../types';

const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <OrderProvider>{children}</OrderProvider>
);

describe('Demo Order Lifecycle & Tracking', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const sampleCustomer: CustomerInfo = {
    fullName: 'Ananya Sharma',
    mobileNumber: '9876543210',
    deliveryAddress: 'Plot 45, Jubilee Hills',
    city: 'Hyderabad',
    postalCode: '500033',
  };

  it('creates a demo order and assigns unique reference and pending status', () => {
    const { result } = renderHook(() => useOrders(), { wrapper });

    let createdRef = '';
    act(() => {
      const order = result.current.createOrder(
        sampleCustomer,
        [{ product: INITIAL_PRODUCTS[0], quantity: 2 }],
        'Cash on Delivery — Demo'
      );
      createdRef = order.orderReference;
    });

    expect(createdRef).toBeDefined();
    expect(createdRef.startsWith('PM-')).toBe(true);

    const found = result.current.getOrder(createdRef);
    expect(found).toBeDefined();
    expect(found?.customer.fullName).toBe('Ananya Sharma');
    expect(found?.status).toBe('Pending Confirmation');
    expect(found?.grandTotal).toBe(300);
  });

  it('updates demo order status and appends to activity history', () => {
    const { result } = renderHook(() => useOrders(), { wrapper });

    let ref = '';
    act(() => {
      const order = result.current.createOrder(
        sampleCustomer,
        [{ product: INITIAL_PRODUCTS[0], quantity: 1 }],
        'Pay at Store — Demo'
      );
      ref = order.orderReference;
    });

    act(() => {
      result.current.updateOrderStatus(ref, 'Confirmed', 'Store confirmed order');
    });

    const updated = result.current.getOrder(ref);
    expect(updated?.status).toBe('Confirmed');
    expect(updated?.statusHistory.some((h) => h.status === 'Confirmed')).toBe(true);

    act(() => {
      result.current.updateOrderStatus(ref, 'Delivered', 'Order handed to customer');
    });

    const finalOrder = result.current.getOrder(ref);
    expect(finalOrder?.status).toBe('Delivered');
  });

  it('returns undefined for unknown demo order references without crashing', () => {
    const { result } = renderHook(() => useOrders(), { wrapper });
    const order = result.current.getOrder('NON-EXISTENT-REF-999');
    expect(order).toBeUndefined();
  });

  it('handles case-insensitive lookups for order references', () => {
    const { result } = renderHook(() => useOrders(), { wrapper });

    let ref = '';
    act(() => {
      const order = result.current.createOrder(
        sampleCustomer,
        [{ product: INITIAL_PRODUCTS[0], quantity: 1 }],
        'Cash on Delivery — Demo'
      );
      ref = order.orderReference;
    });

    const foundLower = result.current.getOrder(ref.toLowerCase());
    expect(foundLower).toBeDefined();
    expect(foundLower?.orderReference).toBe(ref);
  });
});
