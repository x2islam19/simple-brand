import React, { useState } from 'react';
import { Bookmark, Eye, Plus, Check } from 'lucide-react';
import { Product } from '../data/products';
import { usePreferences } from '../context/PreferencesContext';
import { useCart } from '../context/CartContext';

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { formatPrice, isInWishlist, toggleWishlist, setSelectedProduct } = usePreferences();
  const { addToCart } = useCart();
  const [selectedColor, setSelectedColor] = useState(product.colorways[0].name);
  const [justAdded, setJustAdded] = useState(false);

  const isSaved = isInWishlist(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Default to middle size
    const defaultSize = product.sizes.includes('M') ? 'M' : product.sizes[0];
    addToCart(product, defaultSize, selectedColor, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  };

  return (
    <article
      onClick={() => setSelectedProduct(product)}
      className="group flex flex-col bg-[#FAF9F5] border border-[#ECE8DE] hover:border-[#D5CFBF] transition-all duration-300 cursor-pointer overflow-hidden relative"
    >
      {/* Top Wishlist Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleWishlist(product.id);
        }}
        className="absolute top-3.5 right-3.5 z-10 p-2 bg-[#FAF9F5]/80 backdrop-blur-sm rounded-full text-neutral-600 hover:text-black transition-colors"
        aria-label={isSaved ? "Remove from saved items" : "Save item"}
        title={isSaved ? "Saved" : "Save to wishlist"}
      >
        <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-neutral-900 text-neutral-900' : ''}`} />
      </button>

      {/* Product Image Frame */}
      <div className={`relative aspect-[4/3] w-full overflow-hidden ${product.id === 'simple-star-orbit-hoodie-black' ? 'bg-[#080808]' : 'bg-white'}`}>
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className={`w-full h-full transition-all duration-500 ease-out ${
            product.backImage ? 'group-hover:opacity-0' : 'group-hover:scale-105'
          } ${
            product.id === 'simple-star-orbit-hoodie-black'
              ? 'object-contain p-1.5'
              : product.id === 'simple-star-orbit-hoodie-navy' || product.category === 'crewnecks' || product.id.startsWith('simple-star-orbit-sweatpants')
              ? 'object-contain p-2 bg-white'
              : 'object-cover object-center'
          }`}
        />
        {product.backImage && (
          <img
            src={product.backImage}
            alt={`${product.name} back view`}
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-contain p-2 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          />
        )}

        {/* Official Insignia Crest Overlay */}
        <div className="absolute top-3 left-3 z-10 px-2 py-1 bg-white/90 backdrop-blur-xs border border-black/10 flex items-center gap-1.5 shadow-xs pointer-events-none">
          <img
            src="/assets/aistudio/simple_logo_cropped.jpg"
            alt="SIMPLE Logo"
            className="h-3.5 w-auto object-contain"
          />
          <span className="text-[9px] font-mono tracking-wider uppercase text-neutral-800 font-medium">Signature Crest</span>
        </div>

        {/* Hover Quick Action Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-between gap-2">
          <button
            onClick={handleQuickAdd}
            className="flex-1 py-2 px-3 bg-white text-neutral-900 text-xs font-medium uppercase tracking-wider hover:bg-neutral-100 transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Added to Bag</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Quick Add ({product.sizes[0]})</span>
              </>
            )}
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedProduct(product);
            }}
            className="p-2 bg-white/90 text-neutral-900 hover:bg-white transition-colors"
            title="Inspect garment"
            aria-label="Inspect garment"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Card Content & Metadata */}
      <div className="p-5 flex flex-col flex-1 justify-between space-y-3">
        <div>
          {/* Unboxed Metadata Line */}
          <div className="flex items-center justify-between text-xs text-neutral-500 font-mono tracking-wider mb-1">
            <span className="uppercase">{product.edition}</span>
            <span>{product.fabricWeight}</span>
          </div>

          {/* Product Name */}
          <h2 className="text-base font-medium text-neutral-900 tracking-tight leading-snug group-hover:text-black">
            {product.name}
          </h2>

          <p className="text-xs text-neutral-500 line-clamp-1 mt-0.5">
            {product.subtitle}
          </p>
        </div>

        {/* Bottom Baseline: Color Swatches & Tabular Price */}
        <div className="pt-2 border-t border-[#EFECE4] flex items-center justify-between">
          
          {/* Subtle Color Swatches */}
          <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
            {product.colorways.map((cw) => (
              <button
                key={cw.name}
                onClick={() => setSelectedColor(cw.name)}
                style={{ backgroundColor: cw.hex }}
                className={`w-3.5 h-3.5 rounded-full border transition-all ${
                  selectedColor === cw.name
                    ? 'ring-1 ring-neutral-900 ring-offset-1 border-neutral-400 scale-110'
                    : 'border-black/20 hover:scale-105'
                }`}
                title={cw.name}
                aria-label={`Select color ${cw.name}`}
              />
            ))}
            <span className="text-[11px] text-neutral-400 font-mono ml-1 hidden sm:inline">
              {selectedColor}
            </span>
          </div>

          {/* Tabular Price */}
          <div className="font-mono text-sm tabular-nums font-medium text-neutral-900">
            {formatPrice(product.priceUSD)}
          </div>
        </div>

      </div>
    </article>
  );
};
