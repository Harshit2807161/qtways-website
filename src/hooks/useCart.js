import { useState, useCallback, useMemo, useEffect } from 'react';

const CART_STORAGE_KEY = 'qtways_cart';

/**
 * Hook to manage shopping cart state
 * @returns {Object} Cart state and handlers
 */
export const useCart = () => {
  const [items, setItems] = useState(() => {
    // Load cart from localStorage on init
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  });

  // Persist cart to localStorage
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  // Add item to cart
  const addItem = useCallback((product, quantity = 1) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === product.id);

      if (existingIndex >= 0) {
        // Update quantity if item exists
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      }

      // Add new item
      return [...prev, { ...product, quantity }];
    });
  }, []);

  // Remove item from cart
  const removeItem = useCallback((productId) => {
    setItems((prev) => prev.filter((item) => item.id !== productId));
  }, []);

  // Update item quantity
  const updateQuantity = useCallback((productId, quantity) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }

    setItems((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  }, [removeItem]);

  // Clear cart
  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  // Get item by ID
  const getItem = useCallback(
    (productId) => items.find((item) => item.id === productId),
    [items]
  );

  // Check if item is in cart
  const isInCart = useCallback(
    (productId) => items.some((item) => item.id === productId),
    [items]
  );

  // Computed values
  const itemCount = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items]
  );

  const subtotal = useMemo(
    () => items.reduce((total, item) => total + item.price * item.quantity, 0),
    [items]
  );

  // Calculate total savings from discounts
  const totalSavings = useMemo(
    () => items.reduce((total, item) => {
      const originalPrice = item.originalPrice || item.price;
      return total + (originalPrice - item.price) * item.quantity;
    }, 0),
    [items]
  );

  // Shipping calculation (free over ₹999)
  const FREE_SHIPPING_THRESHOLD = 999;
  const SHIPPING_COST = 49;

  const shippingCost = useMemo(
    () => subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST,
    [subtotal]
  );

  const total = useMemo(
    () => subtotal + shippingCost,
    [subtotal, shippingCost]
  );

  const isEmpty = items.length === 0;

  return {
    items,
    itemCount,
    subtotal,
    total,
    totalSavings,
    shippingCost,
    freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
    isEmpty,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getItem,
    isInCart,
  };
};

export default useCart;
