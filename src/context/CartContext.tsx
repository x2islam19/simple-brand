import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../data/products';

export interface CartItem {
  id: string; // unique item id based on product.id + size + color
  product: Product;
  size: string;
  color: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (product: Product, size: string, color: string, quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  subtotalUSD: number;
  discountUSD: number;
  shippingUSD: number;
  totalUSD: number;
  promoCode: string;
  applyPromoCode: (code: string) => boolean;
  removePromoCode: () => void;
  promoError: string | null;
  totalItemCount: number;
  freeShippingThreshold: number;
  amountUntilFreeShipping: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const FREE_SHIPPING_THRESHOLD = 1500 / 49; // Exactly 1,500 EGP
const STANDARD_SHIPPING_FEE = 60 / 49; // Exactly 60 EGP

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('simple_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isOpen, setIsOpen] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoError, setPromoError] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('simple_cart', JSON.stringify(items));
    } catch {
      // storage unavailable
    }
  }, [items]);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const addToCart = (product: Product, size: string, color: string, quantity = 1) => {
    setItems(prev => {
      const existingKey = `${product.id}-${size}-${color}`;
      const index = prev.findIndex(item => item.id === existingKey);
      if (index >= 0) {
        const updated = [...prev];
        updated[index].quantity += quantity;
        return updated;
      } else {
        return [
          ...prev,
          {
            id: existingKey,
            product,
            size,
            color,
            quantity
          }
        ];
      }
    });
    setIsOpen(true);
  };

  const removeFromCart = (itemId: string) => {
    setItems(prev => prev.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setItems(prev =>
      prev.map(item => (item.id === itemId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const applyPromoCode = (code: string): boolean => {
    const clean = code.trim().toUpperCase();
    if (clean === 'WELCOME10' || clean === 'SIMPLE10') {
      setPromoCode(clean);
      setDiscountPercent(10);
      setPromoError(null);
      return true;
    } else if (clean === 'STUDIO') {
      setPromoCode(clean);
      setDiscountPercent(15);
      setPromoError(null);
      return true;
    } else {
      setPromoError('Invalid promotion code. Try SIMPLE10 for 10% off.');
      return false;
    }
  };

  const removePromoCode = () => {
    setPromoCode('');
    setDiscountPercent(0);
    setPromoError(null);
  };

  const totalItemCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const subtotalUSD = items.reduce((acc, item) => acc + item.product.priceUSD * item.quantity, 0);
  const discountUSD = Math.round((subtotalUSD * discountPercent) / 100);
  const shippingUSD = subtotalUSD >= FREE_SHIPPING_THRESHOLD || subtotalUSD === 0 ? 0 : STANDARD_SHIPPING_FEE;
  const totalUSD = Math.max(0, subtotalUSD - discountUSD + shippingUSD);

  const amountUntilFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotalUSD);

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        openCart,
        closeCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotalUSD,
        discountUSD,
        shippingUSD,
        totalUSD,
        promoCode,
        applyPromoCode,
        removePromoCode,
        promoError,
        totalItemCount,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        amountUntilFreeShipping
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
