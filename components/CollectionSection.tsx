
import React, { useState, useMemo, useEffect } from 'react';
import { PRODUCTS } from '../constants';
import ProductCard from './ProductCard';
import { Product } from '../types';

interface CollectionSectionProps {
  onViewCatalog?: () => void;
  onAddToCart?: (p: Product) => void;
}

const CollectionSection: React.FC<CollectionSectionProps> = ({ onViewCatalog, onAddToCart }) => {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState('M');
  const [activeSwatch, setActiveSwatch] = useState<string | null>(null);
  
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeColor, setActiveColor] = useState<string | null>(null);
  const [activeSize, setActiveSize] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      if (activeCategory && !p.category.toLowerCase().includes(activeCategory.toLowerCase())) return false;
      if (activeColor && !p.colors.includes(activeColor)) return false;
      return true;
    });
  }, [activeCategory, activeColor, activeSize]);

  const displayedProducts = filteredProducts.slice(0, 12);

  const clearFilters = () => {
    setActiveCategory(null);
    setActiveColor(null);
    setActiveSize(null);
  };

  const openProduct = (p: Product) => {
    setSelectedProduct(p);
    setActiveSwatch(p.colors[0]);
    setSelectedSize('M');
  };

  const isAnyFilterActive = activeCategory || activeColor || activeSize;

  // Key to force grid items to re-animate when filters change
  const gridKey = `grid-${activeCategory || 'all'}-${activeColor || 'all'}-${activeSize || 'all'}`;

  return (
    <section className="py-16 md:py-32 px-4 md:px-6 max-w-[1600px] mx-auto relative">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 md:mb-16 gap-8">
        <div>
          <div className="text-[8px] md:text-[10px] tracking-widest opacity-50 mb-4 font-black uppercase">
            [ THE ARCHIVE ]
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-8xl font-black font-heading leading-none tracking-tighter uppercase">
            TEMPLAR<br />DROP 01
          </h2>
        </div>
        
        <div className="flex flex-col items-start lg:items-end gap-4 w-full lg:w-auto">
          <div className="flex flex-col sm:flex-row gap-6 lg:gap-12 text-[9px] md:text-[10px] font-black tracking-widest">
            <div className="hidden sm:flex flex-col gap-2">
              <button 
                onClick={() => setActiveCategory('PUFFER')}
                className={`text-left transition-all uppercase ${activeCategory === 'PUFFER' ? 'opacity-100 underline decoration-2' : 'opacity-30 hover:opacity-100'}`}
              >
                TEMPLAR PUFFERS
              </button>
              <button 
                onClick={() => setActiveCategory('APPAREL')}
                className={`text-left transition-all uppercase ${activeCategory === 'APPAREL' ? 'opacity-100 underline decoration-2' : 'opacity-30 hover:opacity-100'}`}
              >
                HEAVY SHELL UNITS
              </button>
            </div>
            
            <button 
              aria-expanded={isFiltersOpen}
              onClick={() => setIsFiltersOpen(!isFiltersOpen)}
              className={`px-6 md:px-8 py-3 border border-white transition-all uppercase flex items-center gap-4 hover:bg-white hover:text-black font-black ${isFiltersOpen ? 'bg-white text-black' : ''}`}
            >
              <span>Filters</span>
              <svg className={`w-3 h-3 transition-transform duration-500 ${isFiltersOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
            </button>
          </div>

          <div 
            className={`filter-accordion w-full md:max-w-[450px] glass p-6 md:p-10 rounded-sm transition-all duration-700 shadow-2xl ${isFiltersOpen ? 'max-h-[800px] opacity-100 mt-2 visible' : 'max-h-0 opacity-0 invisible overflow-hidden'}`}
          >
            <div className="flex justify-between items-center mb-6 md:mb-10 border-b border-white/10 pb-4">
              <span className="text-[8px] md:text-[10px] font-black tracking-[0.5em] uppercase opacity-40">Archive Filtration</span>
              {isAnyFilterActive && (
                <button 
                  onClick={clearFilters} 
                  className="text-[8px] md:text-[9px] font-black text-white hover:text-red-400 uppercase tracking-widest flex items-center gap-2"
                >
                  Clear Archive [X]
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-[8px] md:text-[9px] font-black tracking-widest uppercase">
              <div>
                <p className="opacity-30 mb-5 pb-2 border-b border-white/5">Sector</p>
                <ul className="flex flex-col gap-3">
                  {['APPAREL', 'PUFFER', 'BOOTS'].map(cat => (
                    <li key={cat} onClick={() => setActiveCategory(cat)} className={`cursor-pointer transition-all hover:translate-x-2 ${activeCategory === cat ? 'opacity-100 underline decoration-2' : 'opacity-40 hover:opacity-100'}`}>{cat}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="opacity-30 mb-5 pb-2 border-b border-white/5">Spectrum</p>
                <ul className="flex flex-col gap-3">
                  {['CHALK', 'ONYX', 'SILVER'].map(color => (
                    <li key={color} onClick={() => setActiveColor(color)} className={`cursor-pointer flex items-center gap-2 transition-all hover:translate-x-2 ${activeColor === color ? 'opacity-100' : 'opacity-40 hover:opacity-100'}`}>
                      <div className={`w-2.5 h-2.5 rounded-full border border-white/10 ${color === 'CHALK' ? 'bg-white' : color === 'ONYX' ? 'bg-neutral-800' : 'bg-zinc-400'}`}/> {color}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="opacity-30 mb-5 pb-2 border-b border-white/5">Scale</p>
                <ul className="flex flex-col gap-3">
                  {['S', 'M', 'L'].map(size => (
                    <li key={size} onClick={() => setActiveSize(size)} className={`cursor-pointer transition-all hover:translate-x-2 ${activeSize === size ? 'opacity-100 underline decoration-2' : 'opacity-40 hover:opacity-100'}`}>{size}-SCALE</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div key={gridKey} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 md:gap-x-10 gap-y-12 md:gap-y-20 min-h-[400px]">
        {displayedProducts.length > 0 ? (
          displayedProducts.map((product, i) => (
            <div 
              key={product.id} 
              onClick={() => openProduct(product)} 
              className="animate-fade-in opacity-0" 
              style={{ animationDelay: `${i * 80}ms`, animationFillMode: 'forwards' }}
            >
              <ProductCard product={product} onAddToCart={onAddToCart} />
            </div>
          ))
        ) : (
          <div className="col-span-full h-80 flex flex-col items-center justify-center glass rounded-sm opacity-20 animate-pulse border-white/5">
            <p className="text-[10px] font-black tracking-[1.5em] uppercase mb-4">No Units Detected</p>
            <button onClick={clearFilters} className="text-[8px] font-black border-b border-white pb-1 hover:opacity-100 transition-opacity">RESET PROTOCOL</button>
          </div>
        )}
      </div>

      <div className="mt-16 md:mt-32 flex justify-center">
        <button 
          onClick={onViewCatalog}
          className="group px-10 md:px-16 py-5 md:py-8 bg-white text-black font-black tracking-[0.4em] md:tracking-[0.6em] uppercase hover:bg-neutral-200 transition-all flex items-center gap-6 md:gap-10 shadow-2xl relative overflow-hidden"
        >
          <span className="text-[10px] md:text-sm relative z-10">ENTER FULL ARCHIVE PROTOCOL</span>
          <svg className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-4 transition-transform relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          <div className="absolute inset-0 bg-neutral-200 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
        </button>
      </div>

      {selectedProduct && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-12 overflow-hidden"
          role="dialog" 
          aria-modal="true" 
          aria-labelledby="modal-title"
        >
          <div className="absolute inset-0 bg-black/98 backdrop-blur-2xl" onClick={() => setSelectedProduct(null)} />
          <div className="relative glass w-full max-w-6xl h-full md:h-auto max-h-[95vh] overflow-y-auto rounded-sm grid grid-cols-1 md:grid-cols-12 animate-reveal shadow-2xl border border-white/10">
            <button 
              onClick={() => setSelectedProduct(null)} 
              className="absolute top-6 right-6 z-20 w-12 h-12 glass rounded-full flex items-center justify-center transition-all hover:scale-110 hover:bg-white hover:text-black active:scale-90"
              aria-label="Close modal view"
            >✕</button>
            
            <div className="md:col-span-7 bg-neutral-900 aspect-square md:aspect-auto overflow-hidden group/modal">
              <img 
                src={selectedProduct.image} 
                className="w-full h-full object-cover grayscale transition-transform duration-1000 group-hover/modal:scale-125" 
                alt={selectedProduct.name}
              />
            </div>
            
            <div className="md:col-span-5 p-10 md:p-20 flex flex-col justify-center bg-black/60 border-l border-white/5">
              <div className="mb-12">
                <span className="text-[10px] font-black tracking-[0.5em] opacity-30 mb-6 block uppercase">[ SERIAL_ID: {selectedProduct.id.toUpperCase()} ]</span>
                <h3 id="modal-title" className="text-4xl md:text-6xl font-black font-heading tracking-tighter mb-6 leading-[0.85] uppercase">
                  {selectedProduct.name}
                </h3>
                <p className="text-2xl md:text-3xl font-black tracking-tight opacity-90">${selectedProduct.price.toLocaleString()}</p>
              </div>

              <div className="space-y-10 md:space-y-16 mb-12 md:mb-20">
                <div className="border-b border-white/10 pb-8">
                  <p className="text-[10px] font-black tracking-widest opacity-30 mb-6 uppercase">Technical Profile</p>
                  <p className="text-sm opacity-60 leading-relaxed font-medium uppercase tracking-tight">{selectedProduct.description}</p>
                </div>

                {/* ARIA Accessible Interactive Selectors */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
                  <div role="radiogroup" aria-label="Select Size">
                    <p className="text-[9px] font-black tracking-[0.3em] opacity-30 mb-6 uppercase">Scalability / Size</p>
                    <div className="flex gap-6">
                      {['S', 'M', 'L', 'XL'].map(sz => (
                        <button 
                          key={sz}
                          onClick={() => setSelectedSize(sz)}
                          aria-checked={selectedSize === sz}
                          role="radio"
                          className={`text-xs font-black transition-all ${selectedSize === sz ? 'opacity-100 underline decoration-2 underline-offset-8' : 'opacity-20 hover:opacity-100'}`}
                        >
                          {sz}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div role="radiogroup" aria-label="Select Unit Variant">
                    <p className="text-[9px] font-black tracking-[0.3em] opacity-30 mb-6 uppercase">Unit / Spectrum</p>
                    <div className="flex gap-6">
                      {selectedProduct.colors.map(col => (
                        <button 
                          key={col}
                          onClick={() => setActiveSwatch(col)}
                          aria-checked={activeSwatch === col}
                          role="radio"
                          aria-label={`Color: ${col}`}
                          className={`w-5 h-5 rounded-full border-2 transition-all shadow-xl ${activeSwatch === col ? 'scale-150 border-white ring-4 ring-white/10' : 'border-white/20 hover:scale-110'} ${col === 'CHALK' ? 'bg-white' : col === 'ONYX' ? 'bg-neutral-800' : 'bg-zinc-400'}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => {
                  if (onAddToCart) onAddToCart(selectedProduct);
                  setSelectedProduct(null);
                }}
                className="w-full py-6 md:py-8 bg-white text-black font-black tracking-[0.6em] uppercase text-xs md:text-sm hover:bg-neutral-200 transition-all hover:scale-[1.02] active:scale-95 shadow-[0_20px_50px_rgba(255,255,255,0.1)]"
                aria-label={`Acquire ${selectedProduct.name} to your protocol`}
              >
                Acquire Unit [+]
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CollectionSection;
