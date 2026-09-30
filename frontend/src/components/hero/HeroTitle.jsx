// Big skewed name. A sits before AYUSHMAN and Y sits after PANDEY, both in the same style.
import React from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { profile } from '../../data/profile';
import { palette } from '../../config/palette';

// Reusable big black side letter with a magenta offset shadow
const SideLetter = ({ children, side }) => (
  <span
    className={`text-[20vw] md:text-[16vw] font-bold text-black leading-[0.5] text-glitch ${side === 'left' ? 'mr-2 md:mr-4' : 'ml-2 md:ml-4'}`}
    style={{ textShadow: `4px 4px 0 ${palette.magenta}` }}
  >
    {children}
  </span>
);

export default function HeroTitle() {
  // The title drifts while scrolling (scroll-linked parallax, smoothed with a spring)
  const { scrollY } = useScroll();
  const rawY = useTransform(scrollY, [0, 300, 800], [0, 150, -350]);
  const y = useSpring(rawY, { stiffness: 80, damping: 20 });

  const nameClass = 'text-[15vw] md:text-[13vw] font-bold text-white leading-[0.8] tracking-tighter uppercase text-glitch';
  const nameShadow = { textShadow: `6px 6px 0 ${palette.cyan}` };

  return (
    <motion.div style={{ y }} className="relative z-10 flex flex-col items-center justify-center w-full min-h-[50vh]">
      <div className="-skew-x-12 -rotate-2 text-center flex flex-col items-center">
        {/* Line 1: A + AYUSHMAN */}
        <div className="flex items-center justify-center">
          <SideLetter side="left">A</SideLetter>
          <h1 className={nameClass} style={nameShadow}>{profile.first}</h1>
        </div>
        {/* Line 2: PANDEY + Y */}
        <div className="flex items-center justify-center mt-1">
          <h1 className={nameClass} style={nameShadow}>{profile.last}</h1>
          <SideLetter side="right">Y</SideLetter>
        </div>
      </div>
      {/* Degree badge: translucent + blurred so it blends with the background */}
      <div className="mt-12 bg-black/50 backdrop-blur-md text-white px-8 py-3 font-bold tracking-[0.2em] uppercase text-sm md:text-xl border border-zinc-700 shadow-[6px_6px_0_rgba(25,227,211,0.5)] spider-glitch">
        {profile.education.degree} | {profile.education.cgpa} CGPA
      </div>
    </motion.div>
  );
}
