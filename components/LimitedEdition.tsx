
import React from 'react';

const LimitedEdition: React.FC = () => {
  return (
    <section className="py-48 px-6 bg-white text-black relative overflow-hidden border-y border-black/10">
      <div className="absolute top-0 left-0 w-full h-1 bg-black animate-pulse" />
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        <div className="order-2 lg:order-1 relative">
          <div className="absolute -top-12 -left-12 text-[15vw] font-black opacity-[0.03] select-none pointer-events-none">PHANTOM</div>
          <div className="text-[10px] tracking-[0.5em] font-black opacity-30 mb-8 uppercase">[ RESTRICTED DROP_01 // 100 UNITS ONLY ]</div>
          <h2 className="text-6xl md:text-[100px] font-black font-heading leading-none tracking-tighter mb-12 uppercase">
            TEMPLAR<br />PHANTOM™
          </h2>
          <p className="text-xl font-medium tracking-tight opacity-70 mb-12 max-w-md uppercase">
            Constructed from experimental ultra-dense carbon-weave. Light-absorbent matte finish. Designed for complete visual suppression in urban environments.
          </p>
          
          <div className="space-y-6 mb-12">
            <div className="flex items-center gap-4 border-b border-black/10 pb-4">
              <span className="text-[10px] font-black w-32 uppercase opacity-40">Unit No.</span>
              <span className="text-lg font-black tracking-widest">042 / 100</span>
            </div>
            <div className="flex items-center gap-4 border-b border-black/10 pb-4">
              <span className="text-[10px] font-black w-32 uppercase opacity-40">Composition</span>
              <span className="text-lg font-black tracking-widest">CARBON-X FIBER</span>
            </div>
            <div className="flex items-center gap-4 border-b border-black/10 pb-4">
              <span className="text-[10px] font-black w-32 uppercase opacity-40">Auth Code</span>
              <span className="text-lg font-black tracking-widest underline decoration-2 decoration-black/20">ET-PHM-X9</span>
            </div>
          </div>

          <button className="px-12 py-6 bg-black text-white font-black tracking-[0.4em] uppercase hover:bg-neutral-800 transition-all hover:scale-105 active:scale-95 shadow-2xl">
            Request Acquisition
          </button>
        </div>

        <div className="order-1 lg:order-2 relative group">
          <div className="aspect-[4/5] bg-neutral-100 rounded-sm overflow-hidden shadow-[30px_30px_0px_0px_rgba(0,0,0,0.05)]">
            <img 
              src="https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=1200&auto=format&fit=crop" 
              className="w-full h-full object-cover grayscale contrast-150 transition-transform duration-1000 group-hover:scale-110" 
              alt="Phantom Jacket"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white/40 to-transparent" />
          </div>
          <div className="absolute -bottom-6 -right-6 glass-heavy p-8 border border-black/5">
             <div className="text-[10px] font-black tracking-widest opacity-40 mb-2 uppercase">Current Value</div>
             <div className="text-5xl font-black font-heading tracking-tighter">$3,499.00</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LimitedEdition;
