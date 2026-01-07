
import React from 'react';
import { FOOTER_LINKS } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-24 mb-32">
          <div className="md:col-span-1">
             <div className="flex items-center gap-2 mb-8">
                <span className="font-black text-3xl tracking-tighter hover:text-white transition-colors cursor-default">EDDY TEMPLAR</span>
             </div>
             <p className="text-xs opacity-50 leading-relaxed font-bold tracking-widest">
                417 PIER AVE, BROOKLYN, NY<br />
                OPERATIONS@EDDYTEMPLAR.TECH<br />
                © 2025 EDDY TEMPLAR.
             </p>
          </div>

          <div className="grid grid-cols-2 gap-12 md:col-span-2">
            <div>
              <h5 className="text-[10px] font-bold tracking-widest opacity-30 mb-8 uppercase">Catalog</h5>
              <div className="flex flex-col gap-4 text-xs font-bold tracking-widest">
                {['TEMPLAR PUFFERS', 'FOOTWEAR', 'ACCESSORIES', 'THE ARCHIVE'].map(item => (
                  <a key={item} href="#" className="hover:text-white hover:opacity-100 opacity-50 transition-all flex items-center gap-2 group">
                    <span className="w-0 group-hover:w-4 h-px bg-white transition-all duration-300"></span>
                    {item}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h5 className="text-[10px] font-bold tracking-widest opacity-30 mb-8 uppercase">Company</h5>
              <div className="flex flex-col gap-4 text-xs font-bold tracking-widest">
                {['MANIFESTO', 'SUSTAINABILITY', 'LOGISTICS'].map(item => (
                  <a key={item} href="#" className="hover:text-white hover:opacity-100 opacity-50 transition-all flex items-center gap-2 group">
                    <span className="w-0 group-hover:w-4 h-px bg-white transition-all duration-300"></span>
                    {item}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div>
             <h5 className="text-[10px] font-bold tracking-widest opacity-30 mb-8 uppercase">Stay Updated</h5>
             <div className="relative group">
               <div className="flex items-center gap-2 border-b border-white/20 pb-4 group transition-all relative z-10">
                 <input 
                   type="email" 
                   placeholder="EMAIL ADDRESS" 
                   className="bg-transparent text-[10px] font-bold tracking-widest outline-none flex-1 placeholder:opacity-30 p-2 footer-input-focus transition-all duration-500 rounded-sm focus:border-white focus:bg-white/5"
                 />
                 <button className="opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                   </svg>
                 </button>
               </div>
               {/* Animated Glow on Input Focus (handled via CSS but added here for semantics) */}
               <div className="absolute inset-x-0 bottom-0 h-px bg-white scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500 origin-left" />
             </div>
             <p className="text-[8px] opacity-20 mt-4 tracking-widest font-bold">JOIN THE ELITE TEMPLAR PROTOCOL</p>
          </div>
        </div>

        <div className="relative">
          <h2 className="text-[18vw] font-black tracking-tighter leading-none text-center select-none opacity-5">
            EDDY TEMPLAR
          </h2>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
             <div className="flex gap-8 md:gap-12 text-[10px] font-bold tracking-[0.5em] opacity-30">
               {FOOTER_LINKS.map(link => (
                 <a 
                   key={link} 
                   href="#" 
                   className="hover:opacity-100 hover:text-white hover:scale-125 hover:-translate-y-1 transition-all duration-300 cursor-pointer pointer-events-auto flex items-center gap-2 uppercase"
                 >
                   {link}
                 </a>
               ))}
             </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
