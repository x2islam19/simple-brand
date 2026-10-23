import React, { useState, useMemo } from 'react';
import { SlidersHorizontal, ArrowUpDown, Bookmark } from 'lucide-react';
import { Product, PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';
import { usePreferences } from '../context/PreferencesContext';

interface ProductGridProps {
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ selectedCategory, onSelectCategory }) => {
  const { wishlist } = usePreferences();
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'edition'>('featured');

  const categories = [
    { id: 'all', label: 'All Loungewear' },
    { id: 'hoodies', label: 'Hoodies' },
    { id: 'crewnecks', label: 'Crewnecks' },
    { id: 'sweatpants', label: 'Sweatpants' },
  ];

  const filteredProducts = useMemo(() => {
    let list = [...PRODUCTS];

    if (selectedCategory === 'wishlist') {
      list = list.filter(p => wishlist.includes(p.id));
    } else if (selectedCategory !== 'all') {
      list = list.filter(p => p.category === selectedCategory);
    }

    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.priceUSD - b.priceUSD);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.priceUSD - a.priceUSD);
    } else if (sortBy === 'edition') {
      list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    }

    return list;
  }, [selectedCategory, sortBy, wishlist]);

  return (
    <section id="catalog" className="w-full py-16 bg-[#FAF9F5] border-b border-[#E6E2D8]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#E6E2D8]">
          <div className="space-y-2">
            <div className="text-xs uppercase tracking-[0.2em] text-neutral-400 font-mono">
              The Winter Archive
            </div>
            <h2
              className="text-3xl lg:text-4xl font-light text-[#191919] tracking-tight"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {selectedCategory === 'wishlist' ? 'Saved Garments' : 'Winter Collection'}
            </h2>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-neutral-500">
            <span>
              Showing <strong className="text-neutral-900 font-medium tabular-nums">{filteredProducts.length}</strong> of{' '}
              <span className="tabular-nums">{PRODUCTS.length}</span> pieces
            </span>
          </div>
        </div>

        {/* Interactive Filter Bar & Controls */}
        <div className="py-6 flex flex-wrap items-center justify-between gap-4">
          
          {/* Category Tabs (Interactive Segmented Controls) */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-1 max-w-full scrollbar-none">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-4 py-2 text-xs uppercase tracking-wider font-medium whitespace-nowrap transition-colors cursor-pointer rounded-none border ${
                  selectedCategory === cat.id
                    ? 'bg-[#191919] text-[#FAF9F5] border-[#191919]'
                    : 'bg-transparent text-neutral-600 border-transparent hover:border-[#D5D0C5] hover:text-black'
                }`}
              >
                {cat.label}
              </button>
            ))}

            {wishlist.length > 0 && (
              <button
                onClick={() => onSelectCategory('wishlist')}
                className={`px-4 py-2 text-xs uppercase tracking-wider font-medium whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1.5 border ${
                  selectedCategory === 'wishlist'
                    ? 'bg-[#191919] text-[#FAF9F5] border-[#191919]'
                    : 'bg-transparent text-neutral-600 border-transparent hover:border-[#D5D0C5] hover:text-black'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5 fill-current" />
                <span>Saved ({wishlist.length})</span>
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="text-neutral-400 uppercase hidden sm:inline">Sort:</span>
            <div className="relative inline-flex items-center">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-neutral-800 border border-[#D5D0C5] px-3 py-1.5 text-xs font-mono focus:outline-none focus:border-black cursor-pointer uppercase tracking-wider"
              >
                <option value="featured">Curated Order</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="edition">Newest Edition</option>
              </select>
            </div>
          </div>

        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center space-y-4 bg-[#F5F2EB] border border-[#E8E4DA] p-12">
            <p className="text-sm text-neutral-500 font-mono uppercase tracking-wider">
              No garments found in this selection
            </p>
            <p className="text-sm text-neutral-600 max-w-md mx-auto font-light">
              {selectedCategory === 'wishlist'
                ? 'You have not bookmarked any pieces yet. Browse Edition 04 and tap the bookmark icon on any item.'
                : 'Try choosing another category above.'}
            </p>
            <button
              onClick={() => onSelectCategory('all')}
              className="mt-2 px-5 py-2.5 bg-[#191919] text-[#FAF9F5] text-xs uppercase tracking-widest hover:bg-neutral-800 transition-colors"
            >
              View Full Collection
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
