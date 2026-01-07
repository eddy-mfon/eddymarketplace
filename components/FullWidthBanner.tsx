
import React from 'react';

const FullWidthBanner: React.FC = () => {
  return (
    <section className="relative h-screen flex flex-col justify-end overflow-hidden">
      <img 
        src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2000&auto=format&fit=crop" 
        className="absolute inset-0 w-full h-full object-cover grayscale contrast-125 opacity-40"
        alt="Mountains"
      />
      
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />

      <div className="relative z-10 px-6 pb-24 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row items-end justify-between gap-12">
          <div>
            <div className="text-[10px] tracking-[0.5em] font-bold mb-8 opacity-50">
              [ PROTOCOL : ALTITUDE EDDY_03 ]
            </div>
            <h2 className="text-6xl md:text-[120px] font-black font-heading leading-none tracking-tighter uppercase">
              BUILT FOR COLD<br />
              MADE FOR HEIGHT<br />
              FORGED TO LAST
            </h2>
          </div>
          
          <div className="hidden md:block text-[10px] tracking-widest font-bold opacity-50 mb-4 max-w-[200px]">
            FOR THOSE WHO CLIMB, NOT FOR THE CROWD.
          </div>
        </div>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full pointer-events-none opacity-10">
         <div className="animate-marquee whitespace-nowrap">
            <span className="text-[30vw] font-black tracking-tighter mx-12">EDDY</span>
            <span className="text-[30vw] font-black tracking-tighter mx-12">EDDY</span>
         </div>
      </div>
    </section>
  );
};

export default FullWidthBanner;
