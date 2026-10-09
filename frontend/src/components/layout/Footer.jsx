import React from 'react';
import { useLinkConfirm } from '../../context/LinkConfirm';
import { profile } from '../../data/profile';

export default function Footer() {
  const requestLink = useLinkConfirm();
  return (
    <footer id="contact" className="relative z-10 w-full border-t border-white/5 pt-20 pb-6 flex flex-col items-center justify-center backdrop-blur-xl bg-black/40">
      <div className="text-white text-5xl md:text-7xl font-bold tracking-tighter uppercase mb-10 text-glitch flex gap-4 items-center">
        <span>AYUSHMAN</span><span className="text-zinc-600 font-light">X</span><span className="font-outline-2 text-transparent" style={{ WebkitTextStroke: '2px white' }}>PORTFOLIO</span>
      </div>
      <div className="flex gap-10 mb-16 font-bold text-sm tracking-widest text-zinc-400">
        {profile.links.map(l => (
          <button key={l.label} onClick={() => requestLink(l.url, l.label)} className="hover:text-white flex items-center gap-2 transition-colors">
            <span className="w-5 h-5 border border-white/20 flex items-center justify-center text-[10px]">{l.short}</span>
            {l.label}
          </button>
        ))}
      </div>
      <div className="text-[10px] tracking-widest text-zinc-600 uppercase mb-20">©{new Date().getFullYear()} Ayushman Pandey</div>
    </footer>
  );
}
