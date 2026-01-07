
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CollectionSection from './components/CollectionSection';
import FullWidthBanner from './components/FullWidthBanner';
import FeatureSection from './components/FeatureSection';
import Footer from './components/Footer';
import ShopPage from './components/ShopPage';
import CartOverlay from './components/CartOverlay';
import LimitedEdition from './components/LimitedEdition';
import WaitlistSection from './components/WaitlistSection';
import AboutPage from './components/AboutPage';
import { INVENTORY_IMAGES, PRODUCTS, PUFFERS, BOOTS } from './constants';
import { Product, CartItem } from './types';

function App() {
  const [currentView, setCurrentView] = useState<'HOME' | 'CATALOG' | 'PUFFERS' | 'BOOTS' | 'ABOUT'>('HOME');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const renderView = () => {
    switch (currentView) {
      case 'CATALOG':
        return <ShopPage title="Catalog" products={PRODUCTS} onProductClick={addToCart} />;
      case 'PUFFERS':
        return <ShopPage title="Puffers" products={PUFFERS} onProductClick={addToCart} />;
      case 'BOOTS':
        return <ShopPage title="Boots" products={BOOTS} onProductClick={addToCart} />;
      case 'ABOUT':
        return <AboutPage />;
      default:
        return (
          <>
            <Hero />
            
            <CollectionSection onViewCatalog={() => handleViewChange('CATALOG')} onAddToCart={addToCart} />

            {/* LIMITED EDITION DROP */}
            <LimitedEdition />

            <FullWidthBanner />

            {/* TESTIMONIAL SECTION */}
            <section className="py-48 px-6 bg-white text-black overflow-hidden relative">
              <div className="max-w-7xl mx-auto text-center">
                <div className="text-[10px] tracking-[0.5em] font-black opacity-30 mb-12 uppercase">[ FIELD REPORTS ]</div>
                <div className="relative">
                   <span className="text-[20vw] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-black opacity-[0.03] select-none pointer-events-none">VERIFIED</span>
                   <p className="text-4xl md:text-7xl font-black font-heading tracking-tighter leading-tight relative z-10 max-w-5xl mx-auto uppercase">
                     "The most robust gear I've ever worn. Survived the Arctic Ridge with just the Aurora™ shell. Pure technical mastery."
                   </p>
                </div>
                <div className="mt-12">
                   <p className="text-[12px] font-black tracking-[0.4em] uppercase">M. VASQUEZ // EXPEDITION LEAD</p>
                   <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest mt-2">SECTOR 7 NORTHERN FRONT</p>
                </div>
              </div>
            </section>

            {/* TECH SPECS SECTION */}
            <section className="py-48 px-6 bg-neutral-900 border-y border-white/5">
              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                  {[
                    { title: 'SYNTH-THERM™', desc: 'Proprietary insulation with 0.95 clo/oz rating for sub-zero endurance.' },
                    { title: 'SHIELD-WEAVE', desc: 'High-density cordura face fabric with DWR nanotech coating.' },
                    { title: 'FROST-SEAL', desc: 'Fully taped internal seams and aquaguard waterproof zippers.' }
                  ].map((tech, i) => (
                    <div key={tech.title} className="glass p-12 rounded-sm border-white/5 animate-fade-in" style={{ animationDelay: `${i * 150}ms` }}>
                      <div className="text-4xl font-black font-heading tracking-tighter mb-4">{tech.title}</div>
                      <p className="text-[10px] font-bold tracking-widest opacity-40 leading-relaxed uppercase">{tech.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
            
            <div className="py-32 px-6 max-w-[1600px] mx-auto overflow-hidden">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
                <div className="animate-fade-in">
                  <div className="text-[10px] tracking-widest opacity-50 mb-4 font-bold">
                    [ INVENTORY LIST ]
                  </div>
                  <h2 className="text-6xl md:text-8xl font-black font-heading leading-none tracking-tighter uppercase">
                    TEMPLAR OPS<br />RESERVE
                  </h2>
                </div>
                <button 
                  onClick={() => handleViewChange('CATALOG')}
                  className="group px-10 py-4 border border-white hover:bg-white hover:text-black transition-all uppercase text-[10px] font-black tracking-[0.4em] relative overflow-hidden"
                >
                  <span className="relative z-10">Expand Archive</span>
                  <div className="absolute inset-0 bg-white translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                {INVENTORY_IMAGES.map((img, i) => (
                  <div key={i} className="group cursor-pointer animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
                    <div className="aspect-[3/4] glass rounded-sm overflow-hidden mb-4 relative">
                        <img 
                          src={img} 
                          className="w-full h-full object-cover grayscale opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                          alt={`Inventory ${i}`}
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.parentElement!.innerHTML = '<div class="et-logo-placeholder w-full h-full opacity-10"></div>';
                          }}
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="text-[10px] font-bold tracking-widest flex justify-between items-center">
                        <div>
                          <p className="opacity-100 group-hover:translate-x-1 transition-transform">TEMPLAR_PRO_0{i + 1}</p>
                          <p className="opacity-50 text-[8px] uppercase">Archive Series</p>
                        </div>
                        <p className="opacity-50 group-hover:opacity-100">$1,249.00</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* PREMIUM CLUB SECTION */}
            <WaitlistSection />

            <FeatureSection />

            {/* FINAL CTA SECTION */}
            <section className="py-64 px-6 bg-black relative border-t border-white/10 overflow-hidden">
               <div className="absolute inset-0 opacity-10 pointer-events-none">
                  <div className="grid grid-cols-6 h-full border-r border-white/5">
                    {Array.from({length: 6}).map((_, i) => <div key={i} className="border-l border-white/5 h-full"></div>)}
                  </div>
               </div>
               <div className="max-w-4xl mx-auto text-center relative z-10">
                 <h2 className="text-7xl md:text-[160px] font-black font-heading leading-none tracking-tighter uppercase mb-12">
                   JOIN THE<br />PROTOCOL
                 </h2>
                 <p className="text-xl md:text-2xl font-bold opacity-40 tracking-tight mb-16 max-w-2xl mx-auto uppercase">
                   Gain access to early drops, technical field guides, and the Eddy Templar restricted archive.
                 </p>
                 <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                    <button className="w-full md:w-auto px-16 py-6 bg-white text-black font-black tracking-[0.5em] uppercase hover:bg-neutral-200 transition-all hover:scale-105 active:scale-95">
                      Enter Restricted Area
                    </button>
                    <button onClick={() => handleViewChange('CATALOG')} className="w-full md:w-auto px-16 py-6 border border-white text-white font-black tracking-[0.5em] uppercase hover:bg-white hover:text-black transition-all hover:scale-105 active:scale-95">
                      Explore Gear
                    </button>
                 </div>
                 <div className="mt-12 text-[10px] font-bold tracking-[1em] opacity-20 uppercase">No compromise. No limits. No noise.</div>
               </div>
            </section>
          </>
        );
    }
  };

  const handleViewChange = (view: typeof currentView) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentView(view);
  };

  return (
    <div className="bg-black min-h-screen selection:bg-white selection:text-black">
      <Navbar 
        currentView={currentView} 
        onViewChange={handleViewChange} 
        onCartOpen={() => setIsCartOpen(true)} 
        cartCount={cartCount} 
      />
      
      <main className="relative">
        <div key={currentView} className="view-transition-container">
          {renderView()}
        </div>
      </main>

      <Footer />
      
      <CartOverlay 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cart} 
        onRemove={removeFromCart} 
        onUpdateQuantity={updateQuantity} 
      />

      {/* Decorative floating elements */}
      <div className="fixed bottom-8 right-8 z-[100]">
        <div className="glass p-4 rounded-full flex flex-col items-center gap-4 border-white/20 group hover:border-white transition-colors cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-[2px] h-20 bg-gradient-to-b from-transparent via-white/50 to-transparent group-hover:via-white transition-all" />
          <span className="text-[8px] font-black [writing-mode:vertical-lr] tracking-[1em] opacity-30 group-hover:opacity-100 transition-opacity uppercase">Top</span>
        </div>
      </div>
    </div>
  );
}

export default App;
