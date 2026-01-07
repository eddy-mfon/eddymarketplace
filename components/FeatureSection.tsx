
import React from 'react';

const FeatureSection: React.FC = () => {
  return (
    <section className="relative py-48 px-6 bg-white text-black overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        <div className="relative z-10">
          <h3 className="text-5xl md:text-8xl font-black font-heading leading-[0.9] tracking-tighter mb-12">
            WHEN THE COLD HITS, EVERYTHING ELSE GOES QUIET.
          </h3>
          <p className="text-xl font-medium tracking-tight opacity-70 mb-12 max-w-md">
            Engineered for performance, designed for the streets. Eddy Templar pieces are built to withstand the elements without sacrificing aesthetic.
          </p>
          
          <div className="flex items-center gap-12">
            <div className="w-20 h-20 rounded-full border border-black flex items-center justify-center hover:bg-black hover:text-white transition-all cursor-pointer group">
              <svg className="w-8 h-8 transform -rotate-45 group-hover:rotate-0 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </div>
            <div>
              <p className="text-[10px] font-bold tracking-widest opacity-50 mb-1 uppercase">Shop Collection</p>
              <p className="text-4xl font-black font-heading tracking-tighter">$1,299.00</p>
            </div>
          </div>
        </div>

        <div className="relative h-[600px] flex items-center justify-center">
          <div className="absolute w-[120%] h-full bg-neutral-100 -rotate-6 rounded-3xl" />
          <div className="relative z-10 w-4/5 h-[80%] overflow-hidden group">
            <img 
              src="https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?q=80&w=1000&auto=format&fit=crop" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 drop-shadow-2xl scale-110 group-hover:scale-125"
              alt="Floating Puffer"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement!.innerHTML = '<div class="et-logo-placeholder w-full h-full text-black"></div>';
              }}
            />
          </div>
          <div className="absolute top-1/4 right-0 z-20 bg-black text-white p-4 font-black tracking-tighter text-4xl rotate-12">
            TEMPLAR™
          </div>
          <div className="absolute bottom-1/4 left-0 z-20 text-6xl font-black text-outline rotate-12 -translate-x-12 opacity-30">
            FROST_SERIES
          </div>
        </div>
      </div>
      
      <div className="absolute top-12 left-12 text-[10px] font-bold tracking-[1em] opacity-30 whitespace-nowrap uppercase">
        TECHNICAL OUTERWEAR —— FOR THE FEW —— NOT THE CROWD
      </div>
    </section>
  );
};

export default FeatureSection;
