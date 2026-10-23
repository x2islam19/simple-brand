import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../data/products';

export type Currency = 'EGP';

interface PreferencesContextType {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (priceUSD: number) => string;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => void | boolean;
  selectedProduct: Product | null;
  setSelectedProduct: (p: Product | null) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  activeLookbookId: string | null;
  setActiveLookbookId: (id: string | null) => void;
}

const RATES: Record<Currency, { rate: number; symbol: string; decimals: number }> = {
  EGP: { rate: 49.0, symbol: 'EGP', decimals: 0 },
};

const PreferencesContext = createContext<PreferencesContextType | undefined>(undefined);

export const PreferencesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = useState<Currency>('EGP');

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('simple_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeLookbookId, setActiveLookbookId] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('simple_currency', currency);
    } catch {
      // storage unavailable
    }
  }, [currency]);

  useEffect(() => {
    try {
      localStorage.setItem('simple_wishlist', JSON.stringify(wishlist));
    } catch {
      // storage unavailable
    }
  }, [wishlist]);

  const toggleWishlist = (productId: string) => {
    setWishlist(prev =>
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const formatPrice = (priceUSD: number) => {
    const config = RATES[currency];
    const converted = Math.round(priceUSD * config.rate);
    return `EGP ${converted.toLocaleString()}`;
  };

  return (
    <PreferencesContext.Provider
      value={{
        currency,
        setCurrency,
        formatPrice,
        wishlist,
        toggleWishlist,
        isInWishlist,
        selectedProduct,
        setSelectedProduct,
        isSearchOpen,
        setIsSearchOpen,
        activeLookbookId,
        setActiveLookbookId,
      }}
    >
      {children}
    </PreferencesContext.Provider>
  );
};

export const usePreferences = () => {
  const ctx = useContext(PreferencesContext);
  if (!ctx) throw new Error('usePreferences must be used within PreferencesProvider');
  return ctx;
};
