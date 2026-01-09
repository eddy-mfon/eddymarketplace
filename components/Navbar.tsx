
import React, { useState, useMemo } from 'react';
import { NAV_LINKS, PRODUCTS } from '../constants';
import { Product } from '../types';

interface NavbarProps {
  currentView: 'HOME' | 'CATALOG' | 'PUFFERS' | 'BOOTS';
  onViewChange: (view: 'HOME' | 'CATALOG' | 'PUFFERS' | 'BOOTS') => void;
  onCartOpen: () => void;
  cartCount: number;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, onViewChange, onCartOpen, cartCount }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isExitingSearch, setIsExitingSearch] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const suggestions = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    return PRODUCTS.filter(p =>
      p.name.toLowerCase().includes(query) ||
      p.type.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query)
    ).slice(0, 5);
  }, [searchQuery]);

  const closeSearch = () => {
    setIsExitingSearch(true);
    setTimeout(() => {
      setIsSearchOpen(false);
      setIsExitingSearch(false);
      setSearchQuery('');
    }, 400);
  };

  const handleNavClick = (view: any) => {
    onViewChange(view);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-[60] px-4 md:px-6 py-6 md:py-8 flex justify-between items-center mix-blend-difference">
        <div className="flex items-center gap-2 cursor-pointer group" onClick={() => handleNavClick('HOME')}>
          <span className="font-black text-xl md:text-2xl tracking-tighter group-hover:brightness-125 group-hover:scale-105 transition-all duration-300">EDDY TEMPLAR</span>
        </div>

        <div className="hidden md:flex items-center gap-12 text-[10px] tracking-[0.3em] font-bold">
          <div className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              <button
                key={link.label}
                onClick={() => onViewChange(link.view)}
                className={`text-[9.5px] font-black tracking-[0.4em] transition-all hover:tracking-[0.6em] uppercase relative group ${currentView === link.view ? 'text-white' : 'text-white/40'
                  }`}
              >
                {link.label}
                <span className={`absolute -bottom-1 left-0 h-[1px] bg-white transition-all duration-500 ${currentView === link.view ? 'w-full' : 'w-0 group-hover:w-full'}`} />
              </button>
            ))}
            <button className="text-[9.5px] font-black tracking-[0.4em] text-white/40 hover:text-white transition-all uppercase">Blogs</button>
            <button className="text-[9.5px] font-black tracking-[0.4em] text-white/40 hover:text-white transition-all uppercase">FAQs</button>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <button
            aria-label="Open search overlay"
            onClick={() => setIsSearchOpen(true)}
            className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center glass border-white/20 hover:border-white/50 transition-all group"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <button
            aria-label="View shopping cart"
            onClick={onCartOpen}
            className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center glass border-white/20 hover:border-white/50 transition-all group relative"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 md:w-5 md:h-5 bg-white text-black text-[8px] font-black flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </button>
          <button
            aria-label="Toggle mobile menu"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-8 h-8 flex items-center justify-center glass border-white/20"
          >
            <div className="w-4 flex flex-col gap-1">
              <div className={`h-0.5 bg-white transition-all ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
              <div className={`h-0.5 bg-white transition-all ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
              <div className={`h-0.5 bg-white transition-all ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-[55] bg-black transition-all duration-500 md:hidden ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="flex flex-col items-center justify-center h-full gap-12 text-2xl font-black tracking-tighter uppercase">
          {NAV_LINKS.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.view)}
              className={`${currentView === link.view ? 'text-white' : 'text-white/40'}`}
            >
              {link.label}
            </button>
          ))}
          <button onClick={() => setIsMobileMenuOpen(false)} className="mt-8 text-[10px] tracking-[1em] opacity-30">CLOSE</button>
        </div>
      </div>

      {/* Full-screen Search Overlay */}
      {isSearchOpen && (
        <div className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 backdrop-blur-3xl p-6 transition-all duration-400 ease-in-out ${isExitingSearch ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100 animate-fade-in'}`}>
          <button
            aria-label="Close search overlay"
            onClick={closeSearch}
            className="absolute top-6 right-6 md:top-10 md:right-10 w-10 h-10 md:w-12 md:h-12 glass rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all"
          >
            ✕
          </button>

          <div className="w-full max-w-3xl">
            <div className="text-[10px] tracking-[1em] font-black opacity-30 mb-8 text-center uppercase">Search Archive</div>
            <input
              autoFocus
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search items in the archive"
              placeholder="SEARCH..."
              className="w-full bg-transparent border-b-2 border-white/20 py-4 md:py-6 text-3xl md:text-6xl font-black font-heading tracking-tighter outline-none focus:border-white transition-colors uppercase"
            />

            {suggestions.length > 0 && (
              <div className="mt-8 space-y-4 animate-fade-in">
                {suggestions.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => { handleNavClick('CATALOG'); closeSearch(); }}
                    className="flex items-center justify-between group cursor-pointer border-b border-white/5 pb-4 hover:border-white/20 transition-all"
                  >
                    <div className="flex items-center gap-4 md:gap-6">
                      <div className="w-10 h-10 md:w-12 md:h-12 glass overflow-hidden">
                        <img src={product.image} className="w-full h-full object-cover grayscale" alt="" />
                      </div>
                      <div>
                        <h4 className="text-sm md:text-lg font-black font-heading tracking-tight uppercase">{product.name}</h4>
                        <p className="text-[8px] md:text-[9px] font-bold opacity-30 tracking-widest uppercase">{product.type}</p>
                      </div>
                    </div>
                    <span className="text-xs md:text-sm font-bold opacity-50">${product.price}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
