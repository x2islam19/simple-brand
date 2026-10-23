import React, { useState } from 'react';
import { ShoppingBag, Search, Bookmark, Menu, X, Lock } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { usePreferences } from '../context/PreferencesContext';
import { useOrders } from '../context/OrdersContext';

export const TopBar: React.FC<{ onNavigateToCategory: (cat: string) => void }> = ({ onNavigateToCategory }) => {
  const { totalItemCount, openCart } = useCart();
  const { currency, wishlist, setIsSearchOpen, formatPrice } = usePreferences();
  const { setIsOwnerModalOpen } = useOrders();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId: string, category?: string) => {
    setMobileMenuOpen(false);
    if (category) {
      onNavigateToCategory(category);
    }
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Editorial Announcement Banner */}
      <aside aria-label="Announcement" className="w-full bg-[#191919] text-[#FAF9F5] text-[11px] tracking-widest uppercase font-medium py-2 px-4 border-b border-black/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
            <span>Winter Collection is now available</span>
            <span aria-hidden="true" className="opacity-40">/</span>
            <span className="hidden sm:inline">Complimentary dispatch on orders over {formatPrice(1500 / 49)}</span>
          </div>
          <div className="flex items-center gap-4 shrink-0 text-[10px] tracking-wider text-neutral-400">
            <span className="hidden md:inline">Quality Loungewear &amp; Streetwear</span>
          </div>
        </div>
      </aside>

      {/* Strict 1-Row, 3-Zone Top Bar Contract */}
      <header className="sticky top-0 z-40 bg-[#FAF9F5]/90 backdrop-blur-md border-b border-[#E6E2D8] transition-colors">
        <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between gap-8">
          
          {/* Zone 1: Official Brand Logo */}
          <a
            href="/"
            className="flex items-center gap-3 shrink-0 hover:opacity-80 transition-opacity"
            aria-label="SIMPLE Home"
          >
            <img
              src="/assets/aistudio/simple_logo_cropped.jpg"
              alt="SIMPLE"
              className="h-8 sm:h-9 w-auto object-contain"
            />
          </a>

          {/* Zone 2: 4-5 single-line clean text navigation links */}
          <nav className="hidden lg:flex items-center gap-8 text-[13px] tracking-widest uppercase font-medium text-neutral-600">
            <button
              onClick={() => handleNavClick('catalog', 'all')}
              className="hover:text-black transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Winter Collection
            </button>
            <button
              onClick={() => handleNavClick('catalog', 'hoodies')}
              className="hover:text-black transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Hoodies
            </button>
            <button
              onClick={() => handleNavClick('catalog', 'crewnecks')}
              className="hover:text-black transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Crewnecks
            </button>
            <button
              onClick={() => handleNavClick('catalog', 'sweatpants')}
              className="hover:text-black transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Sweatpants
            </button>
          </nav>

          {/* Zone 3: 1 primary action cluster */}
          <div className="flex items-center gap-5 shrink-0 text-sm">
            {/* Quick Search */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-1.5 text-neutral-600 hover:text-black transition-colors p-1.5 -m-1.5 cursor-pointer"
              aria-label="Search collection"
              title="Search (Cmd+K)"
            >
              <Search className="w-4 h-4" />
              <span className="hidden xl:inline text-xs tracking-wider uppercase text-neutral-500 font-mono">Search</span>
            </button>

            {/* Currency Indicator */}
            <div className="flex items-center text-xs tracking-wider font-mono text-neutral-600 uppercase" title="Prices in Egyptian Pound (EGP)">
              <span className="px-2 py-0.5 rounded-xs bg-[#EDE8DC] text-neutral-800 font-medium">EGP</span>
            </div>

            {/* Wishlist Indicator */}
            {wishlist.length > 0 && (
              <button
                onClick={() => handleNavClick('catalog', 'wishlist')}
                className="relative text-neutral-600 hover:text-black transition-colors cursor-pointer"
                aria-label={`Wishlist (${wishlist.length})`}
                title="View Saved Pieces"
              >
                <Bookmark className="w-4 h-4 fill-neutral-800 text-neutral-800" />
                <span className="absolute -top-1.5 -right-2 text-[10px] font-mono leading-none bg-neutral-900 text-white rounded-full w-3.5 h-3.5 flex items-center justify-center">
                  {wishlist.length}
                </span>
              </button>
            )}

            {/* Owner Portal (Owner Only) */}
            <button
              onClick={() => setIsOwnerModalOpen(true)}
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono uppercase tracking-wider text-neutral-600 hover:text-black border border-transparent hover:border-[#DDD8CD] transition-colors cursor-pointer"
              title="Owner Portal — Sales & Orders"
            >
              <Lock className="w-3.5 h-3.5 text-neutral-700" />
              <span className="hidden md:inline text-[11px]">Owner</span>
            </button>

            {/* Primary Action: Bag */}
            <button
              onClick={openCart}
              className="flex items-center gap-2 px-3.5 py-2 bg-[#191919] text-[#FAF9F5] text-xs uppercase tracking-widest hover:bg-neutral-800 transition-colors cursor-pointer whitespace-nowrap shrink-0"
              aria-label={`Shopping bag with ${totalItemCount} items`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Bag</span>
              <span className="font-mono tabular-nums text-[11px] text-neutral-300">
                ({totalItemCount})
              </span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 text-neutral-700 hover:text-black cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Nav */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#E6E2D8] bg-[#FAF9F5] px-6 py-6 space-y-4">
            <nav className="flex flex-col space-y-3 text-sm tracking-widest uppercase font-medium">
              <button
                onClick={() => handleNavClick('catalog', 'all')}
                className="text-left py-1 text-neutral-800 hover:text-black"
              >
                Winter Collection — View All
              </button>
              <button
                onClick={() => handleNavClick('catalog', 'hoodies')}
                className="text-left py-1 text-neutral-600 hover:text-black"
              >
                Heavyweight Hoodies
              </button>
              <button
                onClick={() => handleNavClick('catalog', 'crewnecks')}
                className="text-left py-1 text-neutral-600 hover:text-black"
              >
                Star Orbit Crewnecks
              </button>
              <button
                onClick={() => handleNavClick('catalog', 'sweatpants')}
                className="text-left py-1 text-neutral-600 hover:text-black"
              >
                Wide-Leg Sweatpants
              </button>
            </nav>

            <div className="pt-4 border-t border-[#E0DBD0] flex items-center justify-between text-xs text-neutral-500 font-mono">
              <span>Currency</span>
              <span className="px-2 py-0.5 rounded-xs bg-[#EDE8DC] text-neutral-800 font-medium">EGP (Egyptian Pound)</span>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsOwnerModalOpen(true);
                }}
                className="w-full py-2 px-3 border border-neutral-300 text-xs font-mono uppercase tracking-wider text-neutral-700 flex items-center justify-center gap-2 hover:bg-black hover:text-white transition-colors"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Owner Portal (Private)</span>
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
