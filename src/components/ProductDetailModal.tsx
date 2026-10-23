import React, { useState } from 'react';
import { X, Check, ShieldCheck, RefreshCw, Ruler, Bookmark, Sparkles, ChevronRight } from 'lucide-react';
import { Product } from '../data/products';
import { usePreferences } from '../context/PreferencesContext';
import { useCart } from '../context/CartContext';

export const ProductDetailModal: React.FC<{
  product: Product | null;
  onClose: () => void;
  onOpenFitGuide: () => void;
}> = ({ product, onClose, onOpenFitGuide }) => {
  const { formatPrice, isInWishlist, toggleWishlist } = usePreferences();
  const { addToCart } = useCart();

  if (!product) return null;

  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState<string>(product.colorways[0].name);
  const [selectedImage, setSelectedImage] = useState<string>(product.image);
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'details' | 'fabric' | 'care'>('details');
  const [addedAlert, setAddedAlert] = useState(false);

  React.useEffect(() => {
    setSelectedImage(product.image);
    if (product.colorways && product.colorways.length > 0) {
      setSelectedColor(product.colorways[0].name);
    }
    if (product.sizes && product.sizes.length > 0) {
      setSelectedSize(product.sizes[0]);
    }
  }, [product.id, product.image, product.colorways, product.sizes]);

  const isSaved = isInWishlist(product.id);

  const handleAdd = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    setAddedAlert(true);
    setTimeout(() => {
      setAddedAlert(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div
        className="relative w-full max-w-5xl bg-[#FAF9F5] border border-[#DDD8CD] shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-neutral-500 hover:text-black hover:bg-neutral-200/50 rounded-full transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 max-h-[90vh] overflow-y-auto">
          
          {/* Left Column: Contiguous Image Presentation */}
          <div className="lg:col-span-7 bg-[#F7F6F2] relative flex flex-col items-center justify-center p-6 lg:p-10 border-b lg:border-b-0 lg:border-r border-[#EAE6DC]">
            <div className={`relative w-full aspect-[4/3] overflow-hidden ${product.id === 'simple-star-orbit-hoodie-black' ? 'bg-[#080808]' : 'bg-white'} border border-[#EAE6DC] shadow-xs flex items-center justify-center`}>
              <img
                src={selectedImage}
                alt={product.name}
                referrerPolicy="no-referrer"
                className={`w-full h-full object-contain p-2 transition-all duration-300 ${product.id === 'simple-star-orbit-hoodie-black' ? 'bg-[#080808]' : ''}`}
              />
              {/* Official Signature Insignia Crest */}
              <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1.5 border border-black/10 flex items-center gap-2 shadow-xs pointer-events-none">
                <img
                  src="/assets/aistudio/simple_logo_cropped.jpg"
                  alt="SIMPLE Logo"
                  className="h-4 w-auto object-contain"
                />
                <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-800 font-medium">Signature Insignia</span>
              </div>
            </div>

            {/* Gallery Thumbnails */}
            {product.gallery && product.gallery.length > 1 && (
              <div className="mt-4 flex items-center gap-3 w-full justify-center">
                {product.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImage(img)}
                    className={`relative w-16 h-16 rounded border bg-white overflow-hidden transition-all cursor-pointer p-1 ${
                      selectedImage === img
                        ? 'border-neutral-900 ring-2 ring-neutral-900/20'
                        : 'border-[#E2DED5] opacity-60 hover:opacity-100'
                    }`}
                    title={`Studio View ${idx + 1}`}
                  >
                    <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            )}

            {/* Quiet caption underneath gallery */}
            <div className="mt-4 w-full flex items-center justify-between text-xs text-neutral-500 font-mono">
              <span>{product.fabricOrigin}</span>
              <span>{product.fabricWeight}</span>
            </div>
          </div>

          {/* Right Column: Contiguous Purchase Module */}
          <div className="lg:col-span-5 p-6 lg:p-8 flex flex-col justify-between space-y-6 bg-[#FAF9F5]">
            
            <div className="space-y-4">
              {/* Unboxed Header Metadata */}
              <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest text-neutral-500">
                <span>{product.edition}</span>
                <span className="text-emerald-700 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                  In Stock · Dispatch in 24h
                </span>
              </div>

              {/* Title & Price */}
              <div>
                <h1
                  className="text-2xl font-light text-neutral-900 tracking-tight"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {product.name}
                </h1>
                <p className="text-xl font-mono tabular-nums text-neutral-900 mt-1 font-medium">
                  {formatPrice(product.priceUSD)}
                </p>
              </div>

              <p className="text-xs text-neutral-600 font-light leading-relaxed">
                {product.description}
              </p>

              {/* Color Selection */}
              <div className="space-y-2 pt-2 border-t border-[#EAE6DC]">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-neutral-500 font-mono uppercase tracking-wider">Color:</span>
                  <span className="font-medium text-neutral-800">{selectedColor}</span>
                </div>
                <div className="flex items-center gap-2">
                  {product.colorways.map((cw) => (
                    <button
                      key={cw.name}
                      onClick={() => setSelectedColor(cw.name)}
                      className={`relative flex items-center gap-2 px-3 py-1.5 border text-xs cursor-pointer transition-colors ${
                        selectedColor === cw.name
                          ? 'border-neutral-900 bg-neutral-100 font-medium'
                          : 'border-[#DDD8CD] bg-transparent text-neutral-600 hover:border-neutral-500'
                      }`}
                    >
                      <span
                        className="w-3 h-3 rounded-full border border-black/20"
                        style={{ backgroundColor: cw.hex }}
                      />
                      <span>{cw.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection & Size Guide */}
              <div className="space-y-2 pt-2 border-t border-[#EAE6DC]">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-neutral-500 font-mono uppercase tracking-wider">Select Size:</span>
                  <button
                    onClick={onOpenFitGuide}
                    className="flex items-center gap-1 text-neutral-600 hover:text-black underline underline-offset-2 cursor-pointer font-mono"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>Fit Advisor</span>
                  </button>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`py-2 text-xs font-mono tracking-wider text-center border cursor-pointer transition-colors ${
                        selectedSize === s
                          ? 'bg-[#191919] text-[#FAF9F5] border-[#191919]'
                          : 'bg-white text-neutral-700 border-[#DDD8CD] hover:border-black'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Stepper & Add to Bag Action */}
              <div className="pt-2 flex items-center gap-3">
                <div className="flex items-center border border-[#DDD8CD] bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-xs font-mono hover:bg-neutral-100 cursor-pointer text-neutral-600"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="px-3 py-2 text-xs font-mono tabular-nums text-neutral-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-xs font-mono hover:bg-neutral-100 cursor-pointer text-neutral-600"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAdd}
                  className="flex-1 py-3 px-6 bg-[#191919] text-[#FAF9F5] text-xs uppercase tracking-widest font-medium hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  {addedAlert ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>Added to Bag</span>
                    </>
                  ) : (
                    <span>Add to Bag — {formatPrice(product.priceUSD * quantity)}</span>
                  )}
                </button>

                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-3 border border-[#DDD8CD] hover:border-black transition-colors ${
                    isSaved ? 'bg-neutral-100 text-neutral-900' : 'text-neutral-500'
                  }`}
                  title={isSaved ? "Saved" : "Save to wishlist"}
                  aria-label="Save to wishlist"
                >
                  <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                </button>
              </div>

            </div>

            {/* Secondary Accordion Tabs: Details / Fabric / Care */}
            <div className="pt-4 border-t border-[#EAE6DC] text-xs">
              <div className="flex items-center gap-4 border-b border-[#EAE6DC] pb-2 font-mono uppercase tracking-wider text-[11px]">
                <button
                  onClick={() => setActiveTab('details')}
                  className={`pb-1 cursor-pointer ${
                    activeTab === 'details'
                      ? 'border-b-2 border-black text-black font-medium'
                      : 'text-neutral-400 hover:text-neutral-700'
                  }`}
                >
                  Garment Details
                </button>
                <button
                  onClick={() => setActiveTab('fabric')}
                  className={`pb-1 cursor-pointer ${
                    activeTab === 'fabric'
                      ? 'border-b-2 border-black text-black font-medium'
                      : 'text-neutral-400 hover:text-neutral-700'
                  }`}
                >
                  Fiber &amp; Mill
                </button>
                <button
                  onClick={() => setActiveTab('care')}
                  className={`pb-1 cursor-pointer ${
                    activeTab === 'care'
                      ? 'border-b-2 border-black text-black font-medium'
                      : 'text-neutral-400 hover:text-neutral-700'
                  }`}
                >
                  Garment Care
                </button>
              </div>

              <div className="pt-3 min-h-[90px] text-neutral-600 font-light">
                {activeTab === 'details' && (
                  <ul className="space-y-1.5 list-disc pl-4 text-[12px] leading-relaxed">
                    {product.details.map((d, i) => (
                      <li key={i}>{d}</li>
                    ))}
                  </ul>
                )}

                {activeTab === 'fabric' && (
                  <div className="space-y-2 text-[12px]">
                    <p><strong className="font-medium text-neutral-900">Composition:</strong> {product.material}</p>
                    <p><strong className="font-medium text-neutral-900">Provenance:</strong> {product.fabricOrigin}</p>
                    <p><strong className="font-medium text-neutral-900">Weight &amp; Gauge:</strong> {product.fabricWeight}</p>
                  </div>
                )}

                {activeTab === 'care' && (
                  <p className="text-[12px] leading-relaxed">{product.careInstructions}</p>
                )}
              </div>

              {/* Service guarantee badges */}
              <div className="pt-4 mt-2 border-t border-[#EAE6DC] flex items-center justify-between text-[11px] text-neutral-500 font-mono">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-neutral-700" />
                  Lifetime repair warranty
                </span>
                <span className="flex items-center gap-1">
                  <RefreshCw className="w-3.5 h-3.5 text-neutral-700" />
                  14-day care &amp; exchange guarantee
                </span>
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
