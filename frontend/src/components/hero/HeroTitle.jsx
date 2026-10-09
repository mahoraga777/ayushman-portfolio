import React from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { profile } from '../../data/profile';
import { palette } from '../../config/palette';

export default function HeroTitle() {
  const { scrollY } = useScroll();
  const rawY = useTransform(scrollY, [0, 300, 800], [0, 150, -350]);
  const y = useSpring(rawY, { stiffness: 80, damping: 20 });

  // Completely fixed visibility: Solid white text, massive glowing colored shadow
  const PopLetter = ({ char, shadow }) => (
    <span className="text-[15vw] md:text-[13vw] font-bold text-white leading-[0.8] tracking-tighter uppercase text-glitch" 
      style={{ textShadow: `8px 8px 0 ${shadow}` }}>
      {char}
    </span>
  );

  return (
    <motion.div style={{ y }} className="relative z-10 flex flex-col items-center justify-center w-full min-h-[50vh]">
      <div className="-skew-x-12 -rotate-2 text-center flex flex-col items-center">
        <div className="flex items-center justify-center">
          <PopLetter char="A" shadow={palette.magenta} />
          <span className="text-[15vw] md:text-[13vw] font-bold text-white leading-[0.8] tracking-tighter uppercase text-glitch" style={{ textShadow: `6px 6px 0 ${palette.cyan}` }}>YUSHMAN</span>
        </div>
        <div className="flex items-center justify-center mt-1">
          <span className="text-[15vw] md:text-[13vw] font-bold text-white leading-[0.8] tracking-tighter uppercase text-glitch" style={{ textShadow: `6px 6px 0 ${palette.cyan}` }}>PANDE</span>
          <PopLetter char="Y" shadow={palette.magenta} />
        </div>
      </div>
      <div className="mt-12 bg-black/40 backdrop-blur-2xl text-white px-8 py-3 font-bold tracking-[0.2em] uppercase text-sm md:text-xl border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.3)] spider-glitch">
        {profile.education.degree} | {profile.education.cgpa} CGPA
      </div>
    </motion.div>
  );
}
