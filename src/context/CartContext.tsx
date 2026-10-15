import React, { createContext, useContext, useState, useEffect, useCallback, useMemo, type ReactNode } from 'react';
import type { CartItem, Product } from '../types';
import { useToast } from './ToastContext';

const CART_STORAGE_KEY = 'pickle-mart-cart';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  deliveryCharge: number;
  discount: number;
  grandTotal: number;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (isOpen: boolean) => void;
  openCartDrawer: () => void;
  closeCartDrawer: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

function loadStoredCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      // Validate structure to prevent crash
      return parsed.filter(
        (item) =>
          item &&
          item.product &&
          typeof item.product.id === 'string' &&
          typeof item.product.price === 'number' &&
          typeof item.quantity === 'number' &&
          item.quantity > 0
      );
    }
  } catch (err) {
    console.warn('Failed to parse cart from localStorage, starting empty', err);
  }
  return [];
}

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(loadStoredCart);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState<boolean>(false);
  const { showToast } = useToast();

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (err) {
      console.error('Failed to save cart to localStorage', err);
    }
  }, [cart]);

  const addToCart = useCallback(
    (product: Product, quantity = 1) => {
      const validQty = Math.max(1, Math.floor(quantity));
      setCart((prevCart) => {
        const existingIndex = prevCart.findIndex((item) => item.product.id === product.id);
        if (existingIndex > -1) {
          const updated = [...prevCart];
          updated[existingIndex] = {
            ...updated[existingIndex],
            quantity: updated[existingIndex].quantity + validQty,
          };
          return updated;
        } else {
          return [...prevCart, { product, quantity: validQty }];
        }
      });
      showToast(`Added ${quantity > 1 ? `${validQty}x ` : ''}"${product.name}" to cart`, 'success');
    },
    [showToast]
  );

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    const safeQty = Math.max(1, Math.floor(quantity));
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId ? { ...item, quantity: safeQty } : item
      )
    );
  }, []);

  const removeFromCart = useCallback(
    (productId: string) => {
      let removedName = '';
      setCart((prevCart) => {
        const itemToRemove = prevCart.find((i) => i.product.id === productId);
        if (itemToRemove) {
          removedName = itemToRemove.product.name;
        }
        return prevCart.filter((item) => item.product.id !== productId);
      });
      if (removedName) {
        showToast(`Removed "${removedName}" from cart`, 'info');
      }
    },
    [showToast]
  );

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const itemCount = useMemo(() => {
    return cart.reduce((total, item) => total + (item.quantity || 0), 0);
  }, [cart]);

  const subtotal = useMemo(() => {
    return cart.reduce((sum, item) => {
      const price = item.product?.price || 0;
      const qty = item.quantity || 0;
      return sum + price * qty;
    }, 0);
  }, [cart]);

  const deliveryCharge = 0; // Default zero as specified
  const discount = 0; // Default zero as specified
  const grandTotal = Math.max(0, subtotal + deliveryCharge - discount);

  const openCartDrawer = useCallback(() => setIsCartDrawerOpen(true), []);
  const closeCartDrawer = useCallback(() => setIsCartDrawerOpen(false), []);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        itemCount,
        subtotal,
        deliveryCharge,
        discount,
        grandTotal,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        openCartDrawer,
        closeCartDrawer,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
