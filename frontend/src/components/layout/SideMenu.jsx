import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { navSections } from '../../config/sections';

export default function SideMenu() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="fixed top-0 left-0 z-[60]">
        {!open ? (
          <button onClick={() => setOpen(true)} className="bg-black/80 backdrop-blur-md text-white border-b border-r border-white/10 w-16 h-16 md:w-20 md:h-20 flex flex-col items-center justify-center gap-1.5 hover:bg-zinc-900 transition-colors">
            <span className="block w-6 md:w-8 h-0.5 md:h-1 bg-white" />
            <span className="block w-6 md:w-8 h-0.5 md:h-1 bg-white" />
            <span className="mt-1 text-[10px] md:text-xs font-bold tracking-widest uppercase">MENU</span>
          </button>
        ) : (
          <button onClick={() => setOpen(false)} className="bg-hero-red/90 backdrop-blur-md text-white w-16 h-16 md:w-20 md:h-20 flex flex-col items-center justify-center hover:bg-white hover:text-hero-red transition-colors">
            <span className="text-2xl md:text-3xl font-light leading-none relative -top-1">×</span>
            <span className="text-[8px] md:text-[10px] font-bold tracking-widest uppercase">CLOSE</span>
          </button>
        )}
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[55] bg-black/80 backdrop-blur-3xl flex items-center justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-10 text-center md:text-left z-10">
              {navSections.map((s, idx) => (
                <motion.a key={s.id} href={`#${s.id}`} onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}
                  className="text-4xl md:text-6xl font-bold tracking-tighter uppercase text-white hover:text-hero-cyan transition-colors text-glitch">
                  {s.label}
                </motion.a>
              ))}
            </div>
            <div className="absolute bottom-10 right-10 text-7xl md:text-9xl font-bold italic text-white/5 pointer-events-none -skew-x-12 tracking-tighter">AYUSHMAN_P</div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
