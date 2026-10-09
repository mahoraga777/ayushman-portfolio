import React from 'react';
import { useLinkConfirm } from '../../context/LinkConfirm';
import { profile } from '../../data/profile';

export default function Footer() {
  const requestLink = useLinkConfirm();
  return (
    <footer id="contact" className="relative z-20 w-full border-t border-white/10 pt-16 pb-6 flex flex-col items-center justify-center backdrop-blur-xl bg-black/60">
      <div className="text-white text-4xl md:text-6xl font-bold tracking-tighter uppercase mb-8 text-glitch flex gap-4 items-center">
        <span>AYUSHMAN</span><span className="text-zinc-600 font-light">X</span><span className="font-outline-2 text-transparent" style={{ WebkitTextStroke: '2px white' }}>PORTFOLIO</span>
      </div>
      <div className="flex gap-8 mb-12 font-bold text-xs md:text-sm tracking-widest text-zinc-400">
        {profile.links.map(l => (
          <button key={l.label} onClick={() => requestLink(l.url, l.label)} className="hover:text-white flex items-center gap-2 transition-colors">
            <span className="w-5 h-5 border border-white/20 flex items-center justify-center text-[10px]">{l.short}</span>
            {l.label}
          </button>
        ))}
      </div>
      <div className="text-[10px] tracking-widest text-zinc-600 uppercase mb-16">©{new Date().getFullYear()} Ayushman Pandey</div>
    </footer>
  );
}
