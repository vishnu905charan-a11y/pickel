import React, { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { DemoOrder, CustomerInfo, CartItem, DemoPaymentMethod, DemoOrderStatus } from '../types';
import { generateOrderReference } from '../utils/reference';

const ORDERS_STORAGE_KEY = 'pickle-mart-demo-orders';

const SAMPLE_DEMO_ORDERS: DemoOrder[] = [
  {
    orderReference: 'PM-2026-DEMO1',
    customer: {
      fullName: 'Srinivasa Rao',
      mobileNumber: '9848022338',
      deliveryAddress: 'Flat 402, Sai Residency, Road No. 12, Banjara Hills',
      city: 'Hyderabad',
      postalCode: '500034',
      orderNotes: 'Please ensure extra airtight packaging for travel.',
    },
    items: [
      {
        product: {
          id: 'veg-01',
          name: 'Mango Avakaya Pickle',
          slug: 'mango-avakaya-pickle',
          category: 'Veg Pickles',
          price: 150,
          packageSize: '250 g',
          image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80',
          isAvailable: true,
        },
        quantity: 2,
      },
      {
        product: {
          id: 'non-veg-01',
          name: 'Chicken Pickle',
          slug: 'chicken-pickle',
          category: 'Non-Veg Pickles',
          price: 250,
          packageSize: '250 g',
          image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80',
          isAvailable: true,
        },
        quantity: 1,
      },
    ],
    subtotal: 550,
    deliveryCharge: 0,
    discount: 0,
    grandTotal: 550,
    paymentMethod: 'Cash on Delivery — Demo',
    status: 'Delivered',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    statusHistory: [
      {
        status: 'Pending Confirmation',
        timestamp: new Date(Date.now() - 86400000 * 2).toISOString(),
        note: 'Demo order received and placed in processing queue.',
      },
      {
        status: 'Confirmed',
        timestamp: new Date(Date.now() - 86400000 * 2 + 1800000).toISOString(),
        note: 'Order details verified by kitchen supervisor.',
      },
      {
        status: 'Preparing',
        timestamp: new Date(Date.now() - 86400000 * 1.5).toISOString(),
        note: 'Jars packed and vacuum sealed.',
      },
      {
        status: 'Dispatched',
        timestamp: new Date(Date.now() - 86400000 * 1).toISOString(),
        note: 'Handed over to delivery associate.',
      },
      {
        status: 'Delivered',
        timestamp: new Date(Date.now() - 86400000 * 0.5).toISOString(),
        note: 'Delivered safely to customer.',
      },
    ],
  },
  {
    orderReference: 'PM-2026-DEMO2',
    customer: {
      fullName: 'Lakshmi Devi',
      mobileNumber: '9949112244',
      deliveryAddress: 'House No 3-4-56, Ramakrishna Nagar',
      city: 'Vijayawada',
      postalCode: '520002',
      orderNotes: '',
    },
    items: [
      {
        product: {
          id: 'veg-15',
          name: 'Gongura Pickle',
          slug: 'gongura-pickle',
          category: 'Veg Pickles',
          price: 140,
          packageSize: '250 g',
          image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80',
          isAvailable: true,
        },
        quantity: 1,
      },
      {
        product: {
          id: 'non-veg-04',
          name: 'Korameenu Fish Pickle',
          slug: 'korameenu-fish-pickle',
          category: 'Non-Veg Pickles',
          price: 325,
          packageSize: '250 g',
          image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80',
          isAvailable: true,
        },
        quantity: 1,
      },
    ],
    subtotal: 465,
    deliveryCharge: 0,
    discount: 0,
    grandTotal: 465,
    paymentMethod: 'Pay at Store — Demo',
    status: 'Preparing',
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    statusHistory: [
      {
        status: 'Pending Confirmation',
        timestamp: new Date(Date.now() - 3600000 * 5).toISOString(),
        note: 'Demo order received and placed in processing queue.',
      },
      {
        status: 'Confirmed',
        timestamp: new Date(Date.now() - 3600000 * 4).toISOString(),
        note: 'Store counter notified for pickup order.',
      },
      {
        status: 'Preparing',
        timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
        note: 'Fresh jars retrieved and packaged for collection.',
      },
    ],
  },
];

interface OrderContextType {
  orders: DemoOrder[];
  createOrder: (
    customer: CustomerInfo,
    items: CartItem[],
    paymentMethod: DemoPaymentMethod
  ) => DemoOrder;
  getOrder: (reference: string) => DemoOrder | undefined;
  updateOrderStatus: (
    reference: string,
    newStatus: DemoOrderStatus,
    note?: string
  ) => boolean;
  deleteOrder: (reference: string) => boolean;
  clearAllOrders: () => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

function loadStoredOrders(): DemoOrder[] {
  try {
    const raw = localStorage.getItem(ORDERS_STORAGE_KEY);
    if (!raw) return SAMPLE_DEMO_ORDERS;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  } catch (err) {
    console.warn('Failed to parse demo orders from localStorage, using samples', err);
  }
  return SAMPLE_DEMO_ORDERS;
}

export const OrderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<DemoOrder[]>(loadStoredOrders);

  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch (err) {
      console.error('Failed to save demo orders to localStorage', err);
    }
  }, [orders]);

  const createOrder = useCallback(
    (
      customer: CustomerInfo,
      items: CartItem[],
      paymentMethod: DemoPaymentMethod
    ): DemoOrder => {
      const orderReference = generateOrderReference();
      const subtotal = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
      const deliveryCharge = 0;
      const discount = 0;
      const grandTotal = subtotal + deliveryCharge - discount;
      const now = new Date().toISOString();

      const newOrder: DemoOrder = {
        orderReference,
        customer,
        items: [...items],
        subtotal,
        deliveryCharge,
        discount,
        grandTotal,
        paymentMethod,
        status: 'Pending Confirmation',
        createdAt: now,
        statusHistory: [
          {
            status: 'Pending Confirmation',
            timestamp: now,
            note: 'Demo order created successfully in browser storage.',
          },
        ],
      };

      setOrders((prev) => [newOrder, ...prev]);
      return newOrder;
    },
    []
  );

  const getOrder = useCallback(
    (reference: string): DemoOrder | undefined => {
      if (!reference) return undefined;
      const cleanRef = reference.trim().toUpperCase();
      return orders.find((o) => o.orderReference.toUpperCase() === cleanRef);
    },
    [orders]
  );

  const updateOrderStatus = useCallback(
    (reference: string, newStatus: DemoOrderStatus, note?: string): boolean => {
      let updated = false;
      const cleanRef = reference.trim().toUpperCase();
      const now = new Date().toISOString();

      setOrders((prev) =>
        prev.map((order) => {
          if (order.orderReference.toUpperCase() === cleanRef) {
            updated = true;
            const statusEntry = {
              status: newStatus,
              timestamp: now,
              note: note || `Status updated to ${newStatus} in demo admin.`,
            };
            return {
              ...order,
              status: newStatus,
              statusHistory: [...order.statusHistory, statusEntry],
            };
          }
          return order;
        })
      );

      return updated;
    },
    []
  );

  const deleteOrder = useCallback((reference: string): boolean => {
    let deleted = false;
    const cleanRef = reference.trim().toUpperCase();
    setOrders((prev) => {
      const filtered = prev.filter((o) => {
        if (o.orderReference.toUpperCase() === cleanRef) {
          deleted = true;
          return false;
        }
        return true;
      });
      return filtered;
    });
    return deleted;
  }, []);

  const clearAllOrders = useCallback(() => {
    setOrders([]);
  }, []);

  return (
    <OrderContext.Provider
      value={{
        orders,
        createOrder,
        getOrder,
        updateOrderStatus,
        deleteOrder,
        clearAllOrders,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = (): OrderContextType => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};
