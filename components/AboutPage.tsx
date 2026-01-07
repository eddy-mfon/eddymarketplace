
import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="pt-40 px-6 pb-32 min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background large text */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none overflow-hidden">
        <div className="text-[50vw] font-black text-outline whitespace-nowrap animate-marquee">
          <span>MFON ARCHITECT // EDDY TEMPLAR // </span>
          <span>MFON ARCHITECT // EDDY TEMPLAR // </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row gap-24 items-center mb-32">
          <div className="flex-1 animate-fade-in">
            <div className="text-[11px] tracking-[0.6em] font-black opacity-40 mb-10 uppercase">[ THE CHIEF ARCHITECT ]</div>
            <h1 className="text-6xl md:text-[140px] font-black font-heading tracking-tighter leading-[0.75] mb-12 uppercase">
              EDDY MFON<br />FOUNDER &<br /><span className="text-white/40">VISIONARY.</span>
            </h1>
            <div className="space-y-8 max-w-2xl">
              <p className="text-2xl md:text-3xl opacity-80 leading-relaxed font-medium uppercase tracking-tighter">
                As the primary architect of the Eddy Templar ethos, <strong>Eddy Mfon</strong> has pioneered a new language of technical expression.
              </p>
              <p className="text-lg opacity-50 leading-relaxed font-medium">
                Merging brutalist structural integrity with experimental fabric synthesis, he has defined an aesthetic that is both survivalist and high-fashion. Every unit released under the Templar protocol is personally inspected and verified by Eddy, ensuring the highest standards of technical excellence.
              </p>
            </div>
            
            <div className="mt-16 flex flex-col sm:flex-row gap-8">
              <a 
                href="https://mfone.netlify.app" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-16 py-8 bg-white text-black hover:bg-neutral-200 transition-all text-[11px] font-black tracking-[0.6em] uppercase flex items-center justify-center gap-4 group shadow-2xl"
              >
                Inspect Portfolio
                <svg className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
              </a>
              <button className="px-16 py-8 border border-white hover:bg-white hover:text-black transition-all text-[11px] font-black tracking-[0.6em] uppercase">
                Contact Protocol
              </button>
            </div>
          </div>

          <div className="flex-1 grid grid-cols-2 gap-8 animate-fade-in delay-200">
            <div className="aspect-[3/4] glass rounded-sm overflow-hidden border border-white/10 group">
              <img 
                src="https://images.unsplash.com/photo-1548883354-7622d03aca27?q=80&w=800&auto=format&fit=crop" 
                className="w-full h-full object-cover grayscale contrast-150 brightness-75 group-hover:brightness-110 group-hover:scale-110 transition-all duration-1000" 
                alt="Design Protocol" 
              />
            </div>
            <div className="aspect-[3/4] glass rounded-sm overflow-hidden border border-white/10 mt-12 md:mt-32 group">
              <img 
                src="https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?q=80&w=800&auto=format&fit=crop" 
                className="w-full h-full object-cover grayscale contrast-150 brightness-75 group-hover:brightness-110 group-hover:scale-110 transition-all duration-1000" 
                alt="Material Study" 
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 border-t border-white/10 pt-24">
          {[
            { label: 'MANIFESTO_01', title: 'STRUCTURAL INTEGRITY', desc: 'Design must prioritize survival. We build gear that protects, adapts, and endures.' },
            { label: 'MANIFESTO_02', title: 'MATERIAL SYNTHESIS', desc: 'Experimental technical fabrics engineered for extreme thermal and visual performance.' },
            { label: 'MANIFESTO_03', title: 'URBAN SUPPRESSION', desc: 'Aesthetics designed for complete visual integration in high-density metropolitan sectors.' }
          ].map((item, i) => (
            <div key={i} className="animate-fade-in" style={{ animationDelay: `${i * 150}ms` }}>
              <span className="text-[9px] font-black tracking-widest opacity-30 block mb-6 uppercase">[{item.label}]</span>
              <h3 className="text-3xl font-black font-heading tracking-tighter mb-4 uppercase">{item.title}</h3>
              <p className="text-sm opacity-50 leading-relaxed font-medium uppercase tracking-tight">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
