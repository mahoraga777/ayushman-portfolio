import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { profile } from '../../data/profile';
import { useLinkConfirm } from '../../context/LinkConfirm';

export default function FixedSocials({ onHireClick }) {
  const requestLink = useLinkConfirm();
  const { scrollYProgress } = useScroll();
  const hireX = useTransform(scrollYProgress, [0.9, 0.98], ['0vw', '45vw']);
  const hireScale = useTransform(scrollYProgress, [0.9, 0.98], [1, 1.3]);

  return (
    <div className="fixed bottom-0 left-0 z-40 flex flex-col items-start pb-6 pl-4 md:pb-8 md:pl-6 pointer-events-none">
      <div className="flex flex-col gap-3 pointer-events-auto">
        <div className="-rotate-90 origin-left text-[8px] md:text-[10px] uppercase tracking-[0.3em] font-bold text-zinc-500 mb-10 ml-2">Officially</div>
        {profile.links.map(l => (
          <button key={l.short} onClick={() => requestLink(l.url, l.label)}
            className="w-8 h-8 md:w-10 md:h-10 bg-black/80 backdrop-blur-md border border-white/10 text-white font-bold text-xs md:text-sm flex justify-center items-center hover:bg-zinc-800 transition-colors">
            {l.short}
          </button>
        ))}
      </div>
      <motion.button onClick={onHireClick} style={{ x: hireX, scale: hireScale }}
        className="mt-6 pointer-events-auto bg-hero-yellow/90 backdrop-blur-md text-black px-4 py-2 md:px-6 md:py-3 font-bold italic text-sm md:text-base tracking-widest border border-white/20 hover:bg-white spider-glitch transition-colors shadow-[0_0_15px_rgba(255,230,0,0.5)]">
        HIRE ME
      </motion.button>
    </div>
  );
}
