// "Leaving Portfolio" confirmation popup (box is translucent + blurred).
import React from 'react';
import { motion } from 'framer-motion';
import { palette } from '../../config/palette';

export default function LinkConfirmModal({ link, onClose }) {
  // open in a new tab, then close the popup
  const confirm = () => { window.open(link.url, '_blank', 'noopener'); onClose(); };
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex justify-center items-center bg-black/80 backdrop-blur-md p-4">
      <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0 }}
        className="bg-black/70 backdrop-blur-xl border border-zinc-700 p-10 max-w-lg w-full spider-glitch" style={{ boxShadow: `6px 6px 0 ${palette.cyan}` }}>
        <h3 className="text-4xl font-bold italic uppercase tracking-tighter mb-4 text-hero-cyan text-glitch">Leaving Portfolio</h3>
        <p className="text-zinc-300 font-light mb-8 text-lg">
          You are about to open <span className="text-black bg-hero-cyan font-bold px-2 py-1 ml-1">{link.name}</span> in a new tab. Continue?
        </p>
        <div className="flex gap-4">
          <button onClick={confirm} className="flex-1 bg-hero-cyan text-black font-bold py-4 text-sm tracking-widest uppercase hover:bg-white transition-colors">Open</button>
          <button onClick={onClose} className="flex-1 bg-black text-white font-bold py-4 text-sm tracking-widest uppercase border border-zinc-700 hover:bg-zinc-800 transition-colors">Cancel</button>
        </div>
      </motion.div>
    </motion.div>
  );
}
