// Fixed bottom-left social buttons + the HIRE ME button.
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { profile } from '../../data/profile';
import { useLinkConfirm } from '../../context/LinkConfirm';

export default function FixedSocials({ onHireClick }) {
  const requestLink = useLinkConfirm();
  const { scrollYProgress } = useScroll();
  
  // When at the bottom (progress > 0.95), move Hire Me to the center.
  const hireX = useTransform(scrollYProgress, [0.9, 0.98], ['0vw', '45vw']);
  const hireScale = useTransform(scrollYProgress, [0.9, 0.98], [1, 1.5]);

  return (
    <div className="fixed bottom-0 left-0 z-40 flex flex-col items-start pb-8 pl-6 pointer-events-none">
      <div className="flex flex-col gap-3 pointer-events-auto">
        <div className="-rotate-90 origin-left text-[10px] uppercase tracking-[0.3em] font-bold text-zinc-500 mb-12 ml-2">
          Officially
        </div>
        {profile.links.map(l => (
          <button 
            key={l.short} onClick={() => requestLink(l.url, l.label)}
            className="w-10 h-10 bg-black border-2 border-zinc-800 text-white font-bold text-sm flex justify-center items-center hover:bg-white hover:text-black transition-colors"
          >
            {l.short}
          </button>
        ))}
      </div>
      
      <motion.button
        onClick={onHireClick}
        style={{ x: hireX, scale: hireScale }}
        className="mt-6 pointer-events-auto bg-hero-yellow text-black px-6 py-3 font-bold italic text-lg tracking-widest border-2 border-black hover:bg-white spider-glitch transition-colors shadow-[6px_6px_0_#000]"
      >
        HIRE ME
      </motion.button>
    </div>
  );
}
