
import { GoogleGenAI } from '@google/genai';
import React, { useEffect, useRef, useState } from 'react';
import { PRODUCTS } from '../constants';

const Hero: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState(0);
  const [isGeneratingBg, setIsGeneratingBg] = useState(false);
  const [bgVideoUrl, setBgVideoUrl] = useState<string | null>(null);
  
  // 3D Inspector / Zoom State
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const currentProduct = PRODUCTS[currentIndex];
  const priceModifier = selectedSize === 'XL' ? 250 : selectedSize === 'L' ? 100 : 0;
  const currentPrice = currentProduct.price + priceModifier;

  // Sync background generation with product index
  useEffect(() => {
    generateBackgroundAtmosphere();
  }, [currentIndex]);

  const generateBackgroundAtmosphere = async () => {
    // Reset state
    setBgVideoUrl(null);
    setIsGeneratingBg(true);
    
    try {
      // Check for API key selection before calling Veo
      if (typeof window.aistudio !== 'undefined') {
        const hasKey = await window.aistudio.hasSelectedApiKey();
        if (!hasKey) {
          console.debug("API key not selected. Background generation skipped.");
          setIsGeneratingBg(false);
          return;
        }
      }

      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: `Cinematic brutalist monochromatic abstract patterns for ${currentProduct.name} ${currentProduct.type}. Tectonic shifting surfaces, deep shadows, atmospheric heavy smoke and light rays, technical gear aesthetic, ultra-slow motion.`,
        config: {
          numberOfVideos: 1,
          resolution: '1080p',
          aspectRatio: '16:9'
        }
      });

      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 8000));
        operation = await ai.operations.getVideosOperation({ operation: operation });
      }

      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      if (downloadLink) {
        const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
        const blob = await response.blob();
        setBgVideoUrl(URL.createObjectURL(blob));
      }
    } catch (err: any) {
      console.error('Background atmosphere generation failed:', err);
      // Handle the specific 404 error ("Requested entity was not found") by prompting user for key selection
      if (err.message?.includes('not found') || err.status === 404) {
        if (typeof window.aistudio !== 'undefined') {
          console.warn("Veo model/project error. Opening API key selection.");
          await window.aistudio.openSelectKey();
        }
      }
    } finally {
      setIsGeneratingBg(false);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });

    // Pseudo-3D Tilt calculation
    const tiltX = (y - 50) / 4; 
    const tiltY = -(x - 50) / 4; 
    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setIsZoomed(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section className="relative min-h-screen pt-24 md:pt-32 px-4 md:px-6 flex flex-col items-center overflow-hidden bg-black">
      {/* Background Atmosphere Graphic */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {bgVideoUrl ? (
          <video 
            src={bgVideoUrl} 
            autoPlay 
            loop 
            muted 
            className="w-full h-full object-cover opacity-20 grayscale contrast-150 animate-reveal" 
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] select-none">
            <h1 className="text-[35vw] font-black text-outline leading-none tracking-tighter uppercase">
              {currentProduct.name.split(' ')[0]}
            </h1>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
        
        {isGeneratingBg && (
          <div className="absolute bottom-10 left-10 flex items-center gap-3 glass px-4 py-2 rounded-full border-white/10">
            <div className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
            <span className="text-[8px] font-black tracking-[0.4em] uppercase opacity-60">Synthesizing Archive Atmosphere...</span>
          </div>
        )}
      </div>

      <div className="relative z-10 w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-end">
        
        {/* Info Column: Staggered Cinematic Entrance */}
        <div 
          key={`info-${currentIndex}`} 
          className="lg:col-span-4 order-2 lg:order-1 mb-12 lg:mb-24 opacity-0 translate-y-12 animate-[heroTextEntrance_1s_cubic-bezier(0.16,1,0.3,1)_forwards]"
        >
          <div className="text-[8px] md:text-[10px] tracking-widest opacity-40 mb-6 flex flex-wrap gap-4 uppercase font-black">
            <span className="bg-white/10 px-3 py-1 rounded-sm border border-white/5">[ UNIT: TEMPLAR_0{currentIndex + 1} ]</span>
            <span className="hidden sm:inline glass px-3 py-1 rounded-sm border border-white/5">[ ACTIVE PROTOCOL ]</span>
          </div>
          <h2 className="text-5xl md:text-7xl lg:text-[100px] font-black font-heading leading-[0.8] tracking-tighter mb-8 md:mb-10 uppercase group cursor-default">
            {currentProduct.name.split(' ')[0]}<br />
            <span className="text-white/30 group-hover:text-white transition-colors duration-1000">
              {currentProduct.name.split(' ')[1] || 'SERIES'}
            </span>
          </h2>
          
          <div className="flex flex-col gap-10 md:gap-14">
            <div className="flex flex-wrap gap-12 md:gap-16 text-[10px] tracking-[0.2em] font-black">
              <div>
                <p className="opacity-20 mb-5 uppercase">Scale Configuration</p>
                <div className="flex gap-8">
                  {['S', 'M', 'L', 'XL'].map(size => (
                    <button 
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`${selectedSize === size ? 'opacity-100 underline underline-offset-[12px] decoration-2' : 'opacity-20'} hover:opacity-100 transition-all uppercase`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="opacity-20 mb-5 uppercase">Unit Variant</p>
                <div className="flex gap-8">
                  {currentProduct.colors.map((color, i) => (
                    <button 
                      key={color}
                      onClick={() => setSelectedColor(i)}
                      className={`${selectedColor === i ? 'opacity-100 border-b-2 border-white' : 'opacity-20'} hover:opacity-100 transition-all uppercase pb-2`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-8 md:gap-12">
              <button className="w-16 h-16 md:w-24 md:h-24 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black hover:border-white transition-all duration-700 group overflow-hidden relative active:scale-90 shadow-2xl">
                <svg className="w-8 h-8 md:w-10 md:h-10 transform -rotate-45 group-hover:rotate-0 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
              <div>
                <p className="text-[9px] md:text-[11px] tracking-[0.5em] opacity-30 font-black mb-1 uppercase">Price Tier</p>
                <p className="text-4xl md:text-6xl font-black font-heading tracking-tighter">${currentPrice.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* 3D Model Inspector with Zoom/Pan */}
        <div 
          key={`media-${currentIndex}`} 
          className="lg:col-span-5 order-1 lg:order-2 relative opacity-0 scale-90 animate-[heroMediaEntrance_1.4s_cubic-bezier(0.16,1,0.3,1)_forwards] delay-300"
        >
          <div 
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={() => setIsZoomed(!isZoomed)}
            className="aspect-[3/4] md:aspect-[4/5] bg-neutral-900 rounded-t-[14rem] overflow-hidden glass group cursor-crosshair relative preserve-3d shadow-[0_0_100px_rgba(255,255,255,0.05)] border border-white/5"
            style={{ 
              perspective: '1500px',
              cursor: isZoomed ? 'zoom-out' : 'zoom-in'
            }}
          >
            <div 
              className="w-full h-full transition-all duration-300 ease-out flex items-center justify-center"
              style={{ 
                transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${isZoomed ? 2.5 : 1})`,
                transformOrigin: `${mousePos.x}% ${mousePos.y}%`
              }}
            >
              <img 
                src={currentProduct.image} 
                alt={currentProduct.name} 
                className="w-full h-full object-cover grayscale contrast-125 transition-transform"
              />
            </div>

            {/* Technical HUD */}
            <div className="absolute inset-10 flex flex-col justify-between pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
               <div className="flex justify-between items-start">
                 <div className="text-[9px] font-black tracking-widest uppercase bg-black/60 px-4 py-1 border border-white/10">
                    SCAN_ID: E.T-PRTO-V3.1
                 </div>
                 <div className="text-[9px] font-black tracking-widest uppercase bg-black/60 px-4 py-1 border border-white/10">
                    DEPTH_MAP: ACTIVE
                 </div>
               </div>
               
               <div className="flex justify-between items-end">
                 <div className="text-[8px] font-black tracking-widest opacity-50 uppercase">
                   {tilt.x.toFixed(1)}°X / {tilt.y.toFixed(1)}°Y
                 </div>
                 <div className="text-[9px] font-black tracking-widest uppercase bg-black/60 px-4 py-1">
                   {isZoomed ? '[ ZOOM: MAX_LOCK ]' : '[ MODE: 3D_INSPECT ]'}
                 </div>
               </div>
            </div>

            {/* Hint overlay */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 pointer-events-none">
              <span className="text-[11px] font-black tracking-[1em] uppercase opacity-0 group-hover:opacity-100 transition-all duration-1000 translate-y-6 group-hover:translate-y-0 text-white/50">
                [ Click to zoom ]
              </span>
            </div>
          </div>
        </div>

        {/* Thumbnails Column */}
        <div className="hidden lg:col-span-3 lg:flex flex-col gap-12 mb-24 opacity-0 translate-x-12 animate-[heroTextEntrance_1s_cubic-bezier(0.16,1,0.3,1)_forwards] delay-500">
          <div className="flex gap-4">
            {PRODUCTS.slice(1, 3).map((p, i) => (
              <div 
                key={p.id} 
                onClick={() => setCurrentIndex((i + 1) % PRODUCTS.length)}
                className="w-full aspect-[3/4] glass rounded-sm overflow-hidden opacity-20 hover:opacity-100 hover:scale-105 transition-all duration-700 cursor-pointer shadow-2xl border border-white/10"
              >
                <img src={p.image} className="w-full h-full object-cover grayscale brightness-50 hover:brightness-110" alt={p.name} />
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center text-[10px] font-black tracking-[0.5em] opacity-30">
            <span>0{currentIndex + 1} // 05</span>
            <div className="flex gap-3">
              {Array.from({length: 5}).map((_, i) => (
                <div key={i} className={`h-1.5 transition-all duration-1000 rounded-full ${currentIndex === i ? 'w-14 bg-white opacity-100 shadow-[0_0_15px_rgba(255,255,255,0.8)]' : 'w-3 bg-white/10'}`} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .preserve-3d { transform-style: preserve-3d; }
        
        @keyframes heroTextEntrance {
          from { opacity: 0; transform: translateY(50px); filter: blur(10px); }
          to { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        
        @keyframes heroMediaEntrance {
          from { opacity: 0; transform: scale(0.8) translateY(80px); filter: blur(30px); }
          to { opacity: 1; transform: scale(1) translateY(0); filter: blur(0); }
        }
      `}</style>
    </section>
  );
};

export default Hero;
