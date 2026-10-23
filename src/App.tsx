/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CartProvider } from './context/CartContext';
import { PreferencesProvider, usePreferences } from './context/PreferencesContext';
import { OrdersProvider } from './context/OrdersContext';
import { TopBar } from './components/TopBar';
import { HeroSection } from './components/HeroSection';
import { ProductGrid } from './components/ProductGrid';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { FitCalculatorModal } from './components/FitCalculatorModal';
import { OwnerPortalModal } from './components/OwnerPortalModal';
import { Footer } from './components/Footer';
import { PRODUCTS } from './data/products';

const MainContent: React.FC = () => {
  const { selectedProduct, setSelectedProduct } = usePreferences();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isFitGuideOpen, setIsFitGuideOpen] = useState(false);

  // Featured hero product is the Cashmere Overcoat
  const featuredHeroProduct = PRODUCTS[0];

  const handleCategoryNavigate = (cat: string) => {
    setSelectedCategory(cat);
    const catalogElem = document.getElementById('catalog');
    if (catalogElem) {
      catalogElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F5] text-[#191919]">
      {/* Strict 1-row 3-zone Top Bar */}
      <TopBar onNavigateToCategory={handleCategoryNavigate} />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Campaign Hero Showcase */}
        <HeroSection
          featuredProduct={featuredHeroProduct}
          onExploreClick={() => handleCategoryNavigate('all')}
        />

        {/* Curated Product Grid */}
        <ProductGrid
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </main>

      {/* Minimalist Footer */}
      <Footer onNavigateToCategory={handleCategoryNavigate} />

      {/* Modals & Overlays */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onOpenFitGuide={() => setIsFitGuideOpen(true)}
      />

      <CartDrawer />
      <SearchModal />
      <FitCalculatorModal
        isOpen={isFitGuideOpen}
        onClose={() => setIsFitGuideOpen(false)}
      />
      <OwnerPortalModal />
    </div>
  );
};

export default function App() {
  return (
    <OrdersProvider>
      <CartProvider>
        <PreferencesProvider>
          <MainContent />
        </PreferencesProvider>
      </CartProvider>
    </OrdersProvider>
  );
}
