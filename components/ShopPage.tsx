
import React, { useState } from 'react';
import { Product, DiscountType } from '../types';
import ProductCard from './ProductCard';

interface ShopPageProps {
  title: string;
  products: Product[];
  onProductClick: (p: Product) => void;
}

const ShopPage: React.FC<ShopPageProps> = ({ title, products, onProductClick }) => {
  const [discountFilter, setDiscountFilter] = useState<DiscountType | 'ALL'>('ALL');
  const [brandFilter, setBrandFilter] = useState<string[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  const brands = Array.from(new Set(products.map(p => p.brand))) as string[];
  const categories = Array.from(new Set(products.map(p => p.category))) as string[];

  const filteredProducts = products.filter(p => {
    const matchesDiscount = discountFilter === 'ALL' || p.discountType === discountFilter;
    const matchesBrand = brandFilter.length === 0 || brandFilter.includes(p.brand);
    const matchesCategory = categoryFilter.length === 0 || categoryFilter.includes(p.category);
    const matchesPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDiscount && matchesBrand && matchesCategory && matchesPrice && matchesSearch;
  });

  const toggleBrand = (brand: string) => {
    setBrandFilter(prev => prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]);
  };

  const toggleCategory = (cat: string) => {
    setCategoryFilter(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]);
  };

  const SidebarContent = () => (
    <div className="space-y-12">
      <nav className="text-[10px] font-black tracking-widest uppercase opacity-20 mb-12 flex items-center gap-2">
        <span>Home</span>
        <span>/</span>
        <span className="opacity-100">{title}</span>
      </nav>

      <div className="space-y-12">
        {/* Brand Filter */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-[11px] font-black tracking-widest uppercase">Brand</h3>
            <button onClick={() => setBrandFilter([])} className="text-[9px] font-black opacity-20 hover:opacity-100 uppercase">Reset</button>
          </div>
          <div className="space-y-3">
            {brands.map(brand => (
              <label key={brand} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={brandFilter.includes(brand)}
                  onChange={() => toggleBrand(brand)}
                  className="hidden"
                />
                <div className={`w-4 h-4 border flex items-center justify-center transition-all ${brandFilter.includes(brand) ? 'bg-white border-white' : 'border-white/20 group-hover:border-white'}`}>
                  {brandFilter.includes(brand) && <svg className="w-3 h-3 text-black" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" /></svg>}
                </div>
                <span className={`text-[10px] font-black tracking-widest uppercase transition-opacity ${brandFilter.includes(brand) ? 'opacity-100' : 'opacity-40 group-hover:opacity-100'}`}>{brand}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-[11px] font-black tracking-widest uppercase">Category</h3>
            <button onClick={() => setCategoryFilter([])} className="text-[9px] font-black opacity-20 hover:opacity-100 uppercase">Reset</button>
          </div>
          <div className="space-y-3">
            {categories.map(cat => (
              <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={categoryFilter.includes(cat)}
                  onChange={() => toggleCategory(cat)}
                  className="hidden"
                />
                <div className={`w-4 h-4 border flex items-center justify-center transition-all ${categoryFilter.includes(cat) ? 'bg-white border-white' : 'border-white/20 group-hover:border-white'}`}>
                  {categoryFilter.includes(cat) && <svg className="w-3 h-3 text-black" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" /></svg>}
                </div>
                <span className={`text-[10px] font-black tracking-widest uppercase transition-opacity ${categoryFilter.includes(cat) ? 'opacity-100' : 'opacity-40 group-hover:opacity-100'}`}>{cat}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Filter */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-[11px] font-black tracking-widest uppercase">Price</h3>
            <button onClick={() => setPriceRange([0, 5000])} className="text-[9px] font-black opacity-20 hover:opacity-100 uppercase">Reset</button>
          </div>
          <input
            type="range"
            min="0"
            max="5000"
            step="50"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
            className="w-full accent-white mb-4 bg-white/10 h-1 rounded-none appearance-none"
          />
          <div className="flex justify-between text-[9px] font-black opacity-40 uppercase tracking-widest">
            <span>$0</span>
            <span>${priceRange[1].toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="pt-24 min-h-screen bg-black text-white overflow-x-hidden">
      {/* Sub-Header */}
      <div className="border-b border-white/5 bg-black/80 backdrop-blur-md sticky top-[72px] md:top-20 z-40 px-4 md:px-6 py-4">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 md:gap-6">
          <div className="flex items-center gap-4 overflow-x-auto pb-2 md:pb-0 scrollbar-hide shrink-0">
            <select className="bg-transparent border border-white/10 text-[9px] md:text-[10px] font-black tracking-widest px-3 md:px-4 py-2 uppercase outline-none focus:border-white shrink-0">
              <option>Clothing</option>
              <option>Accessories</option>
              <option>Equipment</option>
            </select>
            {['New Arrivals', 'Sale'].map(link => (
              <button
                key={link}
                onClick={() => link === 'Sale' ? setDiscountFilter('SALE') : setDiscountFilter('ALL')}
                className="text-[9px] md:text-[10px] font-black tracking-widest uppercase opacity-40 hover:opacity-100 transition-opacity whitespace-nowrap"
              >
                {link}
              </button>
            ))}
          </div>

          <div className="flex-1 max-w-md relative">
            <input
              type="text"
              placeholder="SEARCH ARCHIVE..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-neutral-900/50 border border-white/5 px-10 py-2.5 md:py-3 text-[10px] font-black tracking-widest outline-none focus:border-white/20 transition-all uppercase"
            />
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </div>

          <div className="flex items-center gap-4 md:gap-6 overflow-x-auto pb-2 md:pb-0 scrollbar-hide shrink-0">
            {['Men', 'Women', 'Children'].map(link => (
              <button key={link} className="text-[9px] md:text-[10px] font-black tracking-widest uppercase opacity-40 hover:opacity-100 transition-opacity whitespace-nowrap">{link}</button>
            ))}
            <button
              onClick={() => setIsFilterDrawerOpen(true)}
              className="lg:hidden text-[9px] md:text-[10px] font-black tracking-widest uppercase bg-white text-black px-4 py-2 rounded-sm"
            >
              Filter
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto p-4 md:p-6 lg:p-12">
        {/* Banner Section */}
        <section className="mb-12 rounded-sm overflow-hidden glass border-white/5 relative group cursor-pointer h-56 md:h-80">
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent z-10" />
          <img
            src="https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?q=80&w=1200&auto=format&fit=crop"
            className="absolute inset-0 w-full h-full object-cover grayscale opacity-40 group-hover:scale-105 transition-transform duration-1000"
            alt="Promo Banner"
          />
          <div className="absolute inset-y-0 left-0 z-20 p-6 md:p-12 flex flex-col justify-center max-w-2xl">
            <div className="text-[8px] md:text-[10px] font-black tracking-[0.5em] mb-3 md:mb-4 uppercase opacity-60">- Collections</div>
            <h2 className="text-3xl md:text-6xl font-black font-heading tracking-tighter uppercase mb-4 md:mb-6 leading-none">Explore The Various<br />Collection of Eddy Collection</h2>
            <p className="text-[9px] md:text-[11px] font-bold opacity-40 uppercase tracking-widest max-w-md leading-relaxed hidden sm:block">Don't miss out to shopping collection from us! you'll not be let down.</p>
          </div>
        </section>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar - Desktop */}
          <aside className="hidden lg:block lg:w-64 flex-shrink-0 sticky top-48 h-fit">
            <SidebarContent />
          </aside>

          {/* Product Grid */}
          <main className="flex-1 min-w-0">
            <div className="flex justify-between items-center mb-8 md:mb-12">
              <h2 className="text-3xl md:text-4xl font-black font-heading tracking-tighter uppercase">{title}</h2>
              <div className="text-[9px] md:text-[10px] font-black tracking-widest opacity-20 uppercase">{filteredProducts.length} Units Indexed</div>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="h-64 flex flex-col items-center justify-center glass rounded-sm border-white/5 border border-dashed">
                <p className="text-[10px] font-black tracking-[1em] opacity-30 uppercase mb-4">No Units Found</p>
                <button onClick={() => { setBrandFilter([]); setCategoryFilter([]); setPriceRange([0, 5000]); setDiscountFilter('ALL'); setSearchQuery(''); }} className="text-[9px] font-black border border-white/20 px-6 py-2 hover:bg-white hover:text-black transition-all uppercase">Reset Parameters</button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-12 md:gap-x-8 md:gap-y-16">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => onProductClick(product)}
                    className="relative"
                  >
                    <ProductCard product={product} onAddToCart={() => { }} />
                    {product.discountType !== 'NONE' && (
                      <div className="absolute top-4 left-4 z-10 glass px-2 md:px-3 py-1 text-[7px] md:text-[8px] font-black tracking-widest uppercase shadow-xl border-white/20">
                        {product.discountType.replace('_', ' ')}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Filter Drawer - Mobile */}
      <div className={`fixed inset-0 z-[100] lg:hidden transition-transform duration-500 ${isFilterDrawerOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setIsFilterDrawerOpen(false)} />
        <div className="absolute inset-y-0 left-0 w-[85%] max-w-sm bg-black border-r border-white/10 p-8 overflow-y-auto">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-xl font-black tracking-tighter uppercase">Parameters</h2>
            <button onClick={() => setIsFilterDrawerOpen(false)} className="text-2xl opacity-40 hover:opacity-100">✕</button>
          </div>
          <SidebarContent />
          <button
            onClick={() => setIsFilterDrawerOpen(false)}
            className="w-full bg-white text-black py-4 mt-12 font-black tracking-[0.5em] uppercase text-xs"
          >
            Apply Config
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
