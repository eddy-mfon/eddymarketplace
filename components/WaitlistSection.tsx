
import React, { useState } from 'react';

const WaitlistSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <section className="py-48 px-6 bg-neutral-900 relative border-y border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-24">
        <div className="flex-1">
          <div className="text-[10px] tracking-[0.5em] font-black opacity-30 mb-8 uppercase">[ MEMBERSHIP_INVITE ]</div>
          <h2 className="text-5xl md:text-8xl font-black font-heading leading-none tracking-tighter mb-8 uppercase">
            THE BLACK<br />TIER CLUB.
          </h2>
          <ul className="space-y-6 mb-12">
            {[
              'Guaranteed Access to Limited Drops',
              'Direct Protocol Communication Channel',
              'Quarterly Technical Field Guides',
              'Exclusive Prototype Acquisition Rights'
            ].map((perk, i) => (
              <li key={i} className="flex items-center gap-4 group cursor-default">
                <div className="w-6 h-px bg-white/20 group-hover:w-12 group-hover:bg-white transition-all duration-500" />
                <span className="text-sm font-bold tracking-widest opacity-60 group-hover:opacity-100 transition-opacity uppercase">{perk}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex-1 w-full max-w-md">
          <div className="glass p-12 border-white/10 relative">
            <div className="absolute top-0 right-0 p-4">
              <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
            </div>
            
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <h4 className="text-lg font-black tracking-widest uppercase mb-4">Apply for Access</h4>
                  <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest leading-relaxed mb-8">
                    Selection is based on account activity and commitment to the Eddy Templar ethos. Membership is limited.
                  </p>
                </div>
                
                <div className="relative group">
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="IDENTIFICATION@EMAIL.COM" 
                    className="w-full bg-transparent border-b border-white/20 py-4 text-xs font-black tracking-[0.3em] outline-none focus:border-white transition-all uppercase placeholder:opacity-30"
                  />
                  <div className="absolute bottom-0 left-0 w-0 h-px bg-white group-focus-within:w-full transition-all duration-700" />
                </div>

                <button 
                  type="submit"
                  className="w-full py-6 bg-white text-black font-black tracking-[0.5em] uppercase hover:bg-neutral-200 transition-all hover:scale-[1.02] active:scale-95 shadow-xl"
                >
                  Join Waitlist
                </button>
              </form>
            ) : (
              <div className="text-center py-12 animate-fade-in">
                <div className="w-16 h-16 rounded-full border border-white mx-auto flex items-center justify-center mb-8">
                   <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h4 className="text-2xl font-black font-heading tracking-tighter uppercase mb-4">Application Logged</h4>
                <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest">Awaiting sector clearance. You will be notified.</p>
              </div>
            )}
          </div>
          <div className="mt-8 text-center">
            <p className="text-[8px] font-black opacity-20 tracking-[0.8em] uppercase">Status: Protocol Pending</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WaitlistSection;
