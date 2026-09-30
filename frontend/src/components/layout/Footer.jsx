// Footer with the contact links (id="contact" is the menu target).
import React from 'react';
import { useLinkConfirm } from '../../context/LinkConfirm';
import { profile } from '../../data/profile';

export default function Footer() {
  const requestLink = useLinkConfirm();
  
  return (
    <footer id="contact" className="relative z-10 w-full bg-black/70 backdrop-blur-md border-t border-zinc-900 pt-20 pb-6 flex flex-col items-center justify-center">
      
      {/* Big outlined name */}
      <div className="text-white text-5xl md:text-7xl font-bold tracking-tighter uppercase mb-10 text-glitch flex gap-4 items-center">
        <span>AYUSHMAN</span>
        <span className="text-zinc-600 font-light">X</span>
        <span className="font-outline-2 text-transparent" style={{ WebkitTextStroke: '2px white' }}>PORTFOLIO</span>
      </div>

      <div className="bg-hero-red text-white text-sm font-bold tracking-[0.2em] uppercase px-12 py-2 mb-10 clip-slant-left">
        Official Links
      </div>

      <div className="flex gap-10 mb-16 font-bold text-sm tracking-widest text-zinc-400">
        {profile.links.map(l => (
          <button key={l.label} onClick={() => requestLink(l.url, l.label)} className="hover:text-white flex items-center gap-2 transition-colors">
            <span className="w-5 h-5 border border-zinc-600 flex items-center justify-center text-[10px]">{l.short}</span>
            {l.label}
          </button>
        ))}
      </div>

      <div className="text-[10px] tracking-widest text-zinc-600 uppercase mb-20">
        ©{new Date().getFullYear()} Ayushman Pandey
      </div>

      <div className="w-full px-8 flex flex-col md:flex-row justify-between items-center text-zinc-600 text-[10px] tracking-widest uppercase border-t border-zinc-900 pt-6">
        <div className="flex gap-4 mb-4 md:mb-0">
          <a href="#" className="hover:text-zinc-400">Support</a>
          <span>|</span>
          <a href="#" className="hover:text-zinc-400">The Privacy Policy</a>
        </div>
        <div className="text-right">
          Unauthorized copying or reuse of any documents, code, etc., posted on this website, by any means or in any form, is prohibited.
        </div>
      </div>
    </footer>
  );
}
