"use client";
import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [hasMounted, setHasMounted] = useState(false);

  // 1. Load cart from local storage only after component mounts
  useEffect(() => {
    setHasMounted(true);
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error("Failed to parse cart:", error);
      }
    }
  }, []);

  // 2. Save cart to local storage whenever it changes (only after mounting)
  useEffect(() => {
    if (hasMounted) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart, hasMounted]);

  const addToCart = (product, selectedVariant) => {
    setCart((prev) => {
      const existingItem = prev.find(
        (item) => item._id === product._id && item.variant.size === selectedVariant.size
      );

      if (existingItem) {
        return prev.map((item) =>
          item === existingItem ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, variant: selectedVariant, quantity: 1 }];
    });
  };

  const updateQuantity = (id, size, delta) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item._id === id && item.variant.size === size) {
          const newQty = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  const removeFromCart = (id, size) => {
    setCart((prev) => prev.filter((item) => !(item._id === id && item.variant.size === size)));
  };

  const totalPrice = cart.reduce((acc, item) => acc + item.variant.price * item.quantity, 0);

  // Prevent UI flickering during hydration
  if (!hasMounted) return null;

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};