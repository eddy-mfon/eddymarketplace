
import React from 'react';
import { CartItem } from '../types';

interface CartOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, delta: number) => void;
}

const CartOverlay: React.FC<CartOverlayProps> = ({ isOpen, onClose, items, onRemove, onUpdateQuantity }) => {
  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      
      <div className="absolute top-0 right-0 h-full w-full max-w-lg glass-heavy border-l border-white/10 animate-fade-in p-6 md:p-12 flex flex-col shadow-[0_0_100px_rgba(0,0,0,1)]">
        <header className="flex justify-between items-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-black font-heading tracking-tighter uppercase">Cart Archive</h2>
          <button onClick={onClose} className="w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all">✕</button>
        </header>

        <div className="flex-1 overflow-y-auto space-y-6 md:space-y-8 pr-2">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center opacity-30">
              <p className="text-[10px] font-black tracking-[1em] uppercase mb-4 text-center">Archive Empty</p>
              <div className="et-logo-placeholder w-24 h-24 opacity-20"></div>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} className="flex gap-4 md:gap-6 animate-fade-in">
                <div className="w-20 h-20 md:w-24 md:h-24 glass rounded-sm overflow-hidden flex-shrink-0">
                  <img src={item.image} className="w-full h-full object-cover grayscale" alt={item.name} />
                </div>
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <div className="flex justify-between items-start">
                      <h4 className="text-[10px] md:text-xs font-black tracking-widest uppercase">{item.name}</h4>
                      <p className="text-[10px] md:text-xs font-bold">${item.price.toLocaleString()}</p>
                    </div>
                    <p className="text-[8px] md:text-[9px] opacity-40 uppercase mt-1">{item.type}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4 border border-white/20 px-2 py-0.5 md:py-1">
                      <button onClick={() => onUpdateQuantity(item.id, -1)} className="text-[10px] font-black">-</button>
                      <span className="text-[10px] font-black w-4 text-center">{item.quantity}</span>
                      <button onClick={() => onUpdateQuantity(item.id, 1)} className="text-[10px] font-black">+</button>
                    </div>
                    <button onClick={() => onRemove(item.id)} className="text-[8px] font-black opacity-30 hover:opacity-100 hover:text-red-400 uppercase underline">Remove</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <footer className="mt-8 md:mt-12 pt-8 md:pt-12 border-t border-white/10">
          <div className="flex justify-between items-end mb-6 md:mb-8">
            <span className="text-[8px] md:text-[10px] font-black tracking-widest opacity-40 uppercase">Total Protocol</span>
            <span className="text-2xl md:text-3xl font-black font-heading tracking-tighter">${total.toLocaleString()}</span>
          </div>
          <button 
            disabled={items.length === 0}
            className="w-full py-4 md:py-6 bg-white text-black font-black tracking-[0.4em] uppercase hover:bg-neutral-300 disabled:opacity-20 transition-all text-xs md:text-sm"
          >
            Initiate Checkout
          </button>
          <p className="text-[7px] md:text-[8px] opacity-30 text-center mt-4 tracking-[0.2em] font-bold uppercase">SECURE ENCRYPTED TRANSACTION</p>
        </footer>
      </div>
    </div>
  );
};

export default CartOverlay;
