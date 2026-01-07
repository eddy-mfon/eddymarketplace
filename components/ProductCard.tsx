
import React, { useEffect, useRef, useState } from 'react';
import { Product } from '../types';
import { GoogleGenAI } from '@google/genai';
import { PRODUCTS } from '../constants';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (p: Product) => void;
}

const ETLogoFallback = () => (
  <div className="w-full h-full flex items-center justify-center bg-neutral-900 overflow-hidden relative">
    <svg className="w-24 h-24 opacity-15 animate-pulse" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 20H90M10 50H70M10 80H90" stroke="white" strokeWidth="8" strokeLinecap="square" className="animate-[dash_2s_ease-in-out_infinite]"/>
      <circle cx="85" cy="50" r="6" fill="white" className="animate-bounce" style={{ animationDuration: '3s' }}/>
      <rect x="0" y="0" width="100" height="100" stroke="white" strokeWidth="1" strokeDasharray="4 4" opacity="0.2"/>
    </svg>
    <span className="absolute inset-0 flex items-center justify-center font-black text-6xl opacity-10 tracking-tighter mix-blend-overlay">e.T</span>
    <style>{`
      @keyframes dash {
        0% { stroke-dasharray: 0, 100; stroke-dashoffset: 0; }
        50% { stroke-dasharray: 100, 0; stroke-dashoffset: -50; }
        100% { stroke-dasharray: 0, 100; stroke-dashoffset: -100; }
      }
    `}</style>
  </div>
);

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const generationTriggered = useRef(false);

  // Get related suggestions (random items from same category)
  const relatedSuggestions = PRODUCTS
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 2);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleMouseEnter = async () => {
    setIsHovered(true);
    if (!videoUrl && !isGenerating && !generationTriggered.current) {
      generationTriggered.current = true;
      setIsGenerating(true);
      
      try {
        if (typeof window.aistudio !== 'undefined') {
          const hasKey = await window.aistudio.hasSelectedApiKey();
          if (!hasKey) {
            setIsGenerating(false);
            return;
          }
        }

        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        let operation = await ai.models.generateVideos({
          model: 'veo-3.1-fast-generate-preview',
          prompt: `Technical close-up video of ${product.name}, monochromatic technical gear, brutalist aesthetic, movement on fabric details.`,
          image: {
            imageBytes: await fetchImageAsBase64(product.image),
            mimeType: 'image/jpeg'
          },
          config: {
            numberOfVideos: 1,
            resolution: '720p',
            aspectRatio: '16:9'
          }
        });

        while (!operation.done) {
          await new Promise(resolve => setTimeout(resolve, 5000));
          operation = await ai.operations.getVideosOperation({ operation: operation });
        }

        const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
        if (downloadLink) {
          const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
          const blob = await response.blob();
          setVideoUrl(URL.createObjectURL(blob));
        }
      } catch (err) {
        console.error('Hover video generation failed:', err);
      } finally {
        setIsGenerating(false);
      }
    }
  };

  const fetchImageAsBase64 = async (url: string): Promise<string> => {
    const res = await fetch(url);
    const blob = await res.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = (reader.result as string).split(',')[1];
        resolve(base64);
      };
      reader.readAsDataURL(blob);
    });
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onAddToCart) onAddToCart(product);
  };

  return (
    <div 
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsHovered(false)}
      className={`group cursor-pointer transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`} 
    >
      <div className="relative aspect-[4/5] bg-neutral-900 overflow-hidden mb-6 rounded-sm glass shadow-lg group-hover:shadow-[0_0_50px_rgba(255,255,255,0.05)] transition-all">
        {!imgError ? (
          <div className="w-full h-full relative overflow-hidden">
            {videoUrl && isHovered ? (
              <video 
                src={videoUrl} 
                autoPlay 
                loop 
                muted 
                className="w-full h-full object-cover grayscale animate-fade-in" 
              />
            ) : (
              <img 
                src={product.image} 
                alt={product.name} 
                className={`w-full h-full object-cover grayscale-img duration-1000 group-hover:scale-110 transition-transform cubic-bezier(0.16, 1, 0.3, 1) ${isHovered ? 'brightness-110' : ''}`}
                onError={() => setImgError(true)}
              />
            )}

            {isHovered && !videoUrl && isGenerating && (
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[2px]">
                 <div className="w-full h-1 bg-white/30 absolute top-0 left-0 animate-[scan_2s_linear_infinite]" />
                 <span className="text-[8px] font-black tracking-[0.5em] text-white animate-pulse uppercase">[ Synthesizing Feed... ]</span>
              </div>
            )}
          </div>
        ) : (
          <ETLogoFallback />
        )}
        
        {/* Interactive Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center gap-3 backdrop-blur-[2px] z-10">
          <button className="text-[9px] font-black tracking-[0.4em] bg-white text-black px-8 py-3 rounded-sm shadow-2xl translate-y-4 group-hover:translate-y-0 transition-all duration-500 hover:bg-neutral-200 uppercase">
            Quick View
          </button>
          <button 
            onClick={handleQuickAdd}
            className="text-[9px] font-black tracking-[0.4em] border border-white text-white px-8 py-3 rounded-sm translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-75 hover:bg-white hover:text-black uppercase"
          >
            Quick Add [+]
          </button>

          {/* Related Suggestions Tooltip */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[90%] glass border-white/20 p-3 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 delay-150 pointer-events-none">
             <p className="text-[7px] font-black tracking-widest opacity-40 mb-2 uppercase">Similar Units</p>
             <div className="flex gap-2">
                {relatedSuggestions.map(s => (
                  <div key={s.id} className="flex items-center gap-2 flex-1">
                    <div className="w-6 h-6 bg-neutral-800 rounded-sm overflow-hidden flex-shrink-0">
                      <img src={s.image} className="w-full h-full object-cover grayscale" alt="" />
                    </div>
                    <span className="text-[7px] font-bold tracking-tighter truncate uppercase opacity-80">{s.name}</span>
                  </div>
                ))}
             </div>
          </div>
        </div>

        {/* Brand Tag */}
        <div className="absolute top-4 right-4 text-[8px] font-black tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500 glass-heavy px-2 py-1 z-20">
          E.T // 0{product.id.split('-')[1]}
        </div>
      </div>
      
      <div className="text-[10px] font-bold tracking-widest">
        <div className="flex justify-between items-start mb-3">
          <h4 className="opacity-100 uppercase group-hover:tracking-[0.15em] transition-all duration-500 group-hover:text-white">{product.name}</h4>
          <span className="opacity-40 group-hover:opacity-100 transition-opacity duration-500 text-white/80">${product.price.toLocaleString()}</span>
        </div>
        
        <div className="flex items-center justify-between">
           <p className="opacity-30 text-[9px] uppercase tracking-tighter group-hover:opacity-60 transition-opacity">{product.type}</p>
           <div className="flex items-center gap-2">
            {product.colors.map(color => (
              <div 
                key={color} 
                className={`w-2.5 h-2.5 rounded-full border border-white/10 ${color === 'WHITE' || color === 'CHALK' ? 'bg-white' : color === 'SILVER' ? 'bg-zinc-400' : 'bg-neutral-800'}`} 
                title={color}
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scan {
          0% { transform: translateY(-100%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(1000%); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default ProductCard;
