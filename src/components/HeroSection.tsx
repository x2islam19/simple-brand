import React, { useState, useEffect, useCallback } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { usePreferences } from '../context/PreferencesContext';
import { Product, PRODUCTS } from '../data/products';

export const HeroSection: React.FC<{
  featuredProduct?: Product;
  onExploreClick: () => void;
}> = ({ onExploreClick }) => {
  const { setSelectedProduct, formatPrice } = usePreferences();
  
  // All clothes from collection
  const clothesSlides = PRODUCTS;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const currentProduct = clothesSlides[currentIndex] || clothesSlides[0];

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % clothesSlides.length);
  }, [clothesSlides.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + clothesSlides.length) % clothesSlides.length);
  }, [clothesSlides.length]);

  // Automatic slideshow timer
  useEffect(() => {
    if (!isPlaying || isHovered) return;

    const timer = setInterval(() => {
      handleNext();
    }, 3800);

    return () => clearInterval(timer);
  }, [isPlaying, isHovered, handleNext]);

  return (
    <section className="relative w-full border-b border-[#E6E2D8] bg-[#FAF9F5] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-20">
        
        {/* Split Campaign Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Brand Thesis & Campaign Typography */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-8">
            
            {/* Quiet Unboxed Metadata kicker */}
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-neutral-500 font-mono">
              <span>Edition 04</span>
              <span aria-hidden="true" className="text-neutral-300">/</span>
              <span>Heavyweight Fleece</span>
              <span aria-hidden="true" className="text-neutral-300">/</span>
              <span>Lounge Archetypes</span>
            </div>

            {/* Display Headline with balanced wrap */}
            <div className="space-y-4">
              <h1
                className="text-4xl sm:text-5xl lg:text-[3.5rem] leading-[1.08] font-light text-[#191919] tracking-tight"
                style={{ fontFamily: 'var(--font-display)', textWrap: 'balance' }}
              >
                Considered hoodies, crewnecks, and sweatpants.
              </h1>
              
              <p className="text-base lg:text-lg text-neutral-600 font-light leading-relaxed max-w-lg">
                Crafted in limited runs with dense loopback organic cotton, double-layer crossover hoods, and wide pooling sweatpants. Zero polyester blends.
              </p>
            </div>

            {/* Action Group */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onExploreClick}
                className="px-6 py-3.5 bg-[#191919] text-[#FAF9F5] text-xs uppercase tracking-widest font-medium hover:bg-neutral-800 transition-colors flex items-center gap-2.5 cursor-pointer whitespace-nowrap shrink-0 group"
              >
                <span>Explore Loungewear</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            {/* Adjacent Trust & Fiber Standards */}
            <div className="pt-8 border-t border-[#E8E4DA] grid grid-cols-3 gap-6 text-neutral-600">
              <div>
                <p className="text-xs uppercase tracking-wider text-neutral-400 font-mono">Weight</p>
                <p className="text-sm font-medium text-neutral-900 mt-1">Heavy Fleece</p>
                <p className="text-[11px] text-neutral-500">Substantial handle</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-neutral-400 font-mono">Composition</p>
                <p className="text-sm font-medium text-neutral-900 mt-1">100% Cotton</p>
                <p className="text-[11px] text-neutral-500">Zero poly fleece</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-neutral-400 font-mono">Guarantee</p>
                <p className="text-sm font-medium text-neutral-900 mt-1">14-Day Care</p>
                <p className="text-[11px] text-neutral-500">Exchange &amp; care guarantee</p>
              </div>
            </div>

          </div>

          {/* Right Column: Automatic Editorial Clothes Slideshow */}
          <div className="lg:col-span-7">
            <div
              className="relative group cursor-pointer overflow-hidden bg-[#ECE8DF] border border-[#DDD8CD] select-none"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={() => setSelectedProduct(currentProduct)}
              role="region"
              aria-roledescription="carousel"
              aria-label="Automatic clothing collection slideshow"
            >
              
              {/* Clothes Slides Aspect Container */}
              <div className="aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] w-full overflow-hidden relative">
                {clothesSlides.map((product, idx) => {
                  const isActive = idx === currentIndex;
                  return (
                    <div
                      key={product.id}
                      className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                        isActive ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
                      }`}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        referrerPolicy="no-referrer"
                        className={`w-full h-full group-hover:scale-[1.02] transition-transform duration-700 ease-out ${
                          product.category === 'crewnecks' ? 'object-contain bg-white p-4' : 'object-cover object-center'
                        }`}
                      />
                    </div>
                  );
                })}
              </div>

              {/* Top Floating Controls & Badges */}
              <div className="absolute top-4 inset-x-4 z-20 flex items-center justify-between pointer-events-none">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 bg-black/80 backdrop-blur-md text-white text-[10px] uppercase font-mono tracking-widest">
                    {String(currentIndex + 1).padStart(2, '0')} / {String(clothesSlides.length).padStart(2, '0')}
                  </span>
                  <span className="px-2.5 py-1 bg-white/95 backdrop-blur-md text-black text-[10px] uppercase font-mono tracking-wider flex items-center gap-1.5 border border-black/10">
                    <img src="/assets/aistudio/simple_logo_cropped.jpg" alt="SIMPLE" className="h-3 w-auto object-contain" />
                    <span>{currentProduct.category}</span>
                  </span>
                </div>

                <div className="pointer-events-auto flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                  <button
                    type="button"
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-1.5 rounded-full bg-black/60 hover:bg-black text-white backdrop-blur-md transition-colors cursor-pointer"
                    title={isPlaying ? 'Pause auto slideshow' : 'Play auto slideshow'}
                    aria-label={isPlaying ? 'Pause auto slideshow' : 'Play auto slideshow'}
                  >
                    {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Side Navigation Arrow Buttons */}
              <div
                className="absolute inset-y-0 left-0 right-0 z-20 flex items-center justify-between px-3 pointer-events-none"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrev();
                  }}
                  className="pointer-events-auto p-2.5 rounded-full bg-black/60 hover:bg-black text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-2 group-hover:translate-x-0 cursor-pointer shadow-lg"
                  aria-label="Previous clothing item"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  className="pointer-events-auto p-2.5 rounded-full bg-black/60 hover:bg-black text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 cursor-pointer shadow-lg"
                  aria-label="Next clothing item"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Bottom Overlaid Metadata Card & Progress Timeline */}
              <div
                className="absolute bottom-0 inset-x-0 z-20 bg-gradient-to-t from-black/90 via-black/55 to-transparent pt-12 pb-5 px-6 text-white"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-end justify-between gap-4">
                  <div
                    className="cursor-pointer"
                    onClick={() => setSelectedProduct(currentProduct)}
                  >
                    <div className="text-[11px] uppercase tracking-widest text-neutral-300 font-mono truncate max-w-sm">
                      {currentProduct.subtitle}
                    </div>
                    <div className="text-lg sm:text-xl font-medium tracking-tight mt-0.5">
                      {currentProduct.name}
                    </div>
                  </div>

                  <div
                    className="flex flex-col items-end shrink-0 cursor-pointer"
                    onClick={() => setSelectedProduct(currentProduct)}
                  >
                    <div className="text-base sm:text-lg font-mono font-medium text-white">
                      {formatPrice(currentProduct.priceUSD)}
                    </div>
                    <span className="hidden sm:inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-neutral-300 group-hover:text-white transition-colors underline underline-offset-4 mt-0.5">
                      Inspect Silhouette
                    </span>
                  </div>
                </div>

                {/* Progress Indicators for every garment in the collection */}
                <div className="grid grid-flow-col auto-cols-fr gap-1.5 pt-4">
                  {clothesSlides.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setCurrentIndex(idx)}
                      className="h-1 rounded-full overflow-hidden bg-white/25 hover:bg-white/50 transition-colors cursor-pointer"
                      aria-label={`Jump to clothing item ${idx + 1}`}
                    >
                      <div
                        className={`h-full bg-white transition-all duration-300 ${
                          idx === currentIndex
                            ? 'w-full opacity-100'
                            : idx < currentIndex
                            ? 'w-full opacity-60'
                            : 'w-0 opacity-0'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
