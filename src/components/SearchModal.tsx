import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { usePreferences } from '../context/PreferencesContext';
import { PRODUCTS, Product } from '../data/products';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, setSelectedProduct, formatPrice } = usePreferences();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const filtered = query.trim()
    ? PRODUCTS.filter(
        p =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.material.toLowerCase().includes(query.toLowerCase()) ||
          p.fabricOrigin.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.subtitle.toLowerCase().includes(query.toLowerCase())
      )
    : PRODUCTS.slice(0, 4);

  const handleSelect = (product: Product) => {
    setIsSearchOpen(false);
    setSelectedProduct(product);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/60 backdrop-blur-xs">
      <div
        className="relative w-full max-w-2xl bg-[#FAF9F5] border border-[#DDD8CD] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-[#E6E2D8] flex items-center gap-3 bg-white">
          <Search className="w-5 h-5 text-neutral-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search hoodies, crewnecks, sweatpants, loopback fleece..."
            className="flex-1 bg-transparent text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none font-mono"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-neutral-400 hover:text-black p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="px-2 py-1 text-xs font-mono uppercase tracking-wider text-neutral-500 hover:text-black border border-[#E0DBD0]"
          >
            ESC
          </button>
        </div>

        {/* Quick Suggestion Pills / Filters */}
        <div className="px-4 py-2.5 bg-[#F5F2EB] border-b border-[#E6E2D8] flex items-center gap-2 text-xs font-mono text-neutral-600 overflow-x-auto">
          <span className="text-neutral-400 uppercase text-[10px]">Popular:</span>
          {['Boxy Hoodie', 'Star Orbit Crewneck', 'Wide-Leg Sweatpants', 'Dual-Zip Hoodie', 'Raw-Hem Pants'].map(term => (
            <button
              key={term}
              onClick={() => setQuery(term)}
              className="text-neutral-700 hover:text-black underline underline-offset-2 whitespace-nowrap cursor-pointer"
            >
              {term}
            </button>
          ))}
        </div>

        {/* Results */}
        <div className="max-h-96 overflow-y-auto p-4 space-y-2">
          <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-2">
            {query.trim() ? `Found ${filtered.length} matching pieces` : 'Featured Archetypes'}
          </div>

          {filtered.length > 0 ? (
            filtered.map(product => (
              <div
                key={product.id}
                onClick={() => handleSelect(product)}
                className="p-3 bg-white hover:bg-neutral-100 border border-[#E8E4DA] flex items-center justify-between cursor-pointer transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 object-cover bg-neutral-100 shrink-0"
                  />
                  <div>
                    <h4 className="text-xs font-medium text-neutral-900 group-hover:text-black">
                      {product.name}
                    </h4>
                    <p className="text-[11px] text-neutral-500 font-mono">
                      {product.material.split(',')[0]} · {product.fabricOrigin.split(',')[0]}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono tabular-nums text-neutral-900 font-medium">
                    {formatPrice(product.priceUSD)}
                  </span>
                  <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-black group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))
          ) : (
            <div className="py-8 text-center text-xs font-mono text-neutral-500">
              No garments found matching "{query}".
            </div>
          )}
        </div>

        <div className="p-3 bg-[#FAF9F5] border-t border-[#E6E2D8] flex items-center justify-between text-[11px] font-mono text-neutral-400">
          <span>Navigate with mouse or tap</span>
          <span>SIMPLE Atelier Search Index</span>
        </div>
      </div>
    </div>
  );
};
