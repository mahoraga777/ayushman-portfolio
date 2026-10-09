import React from 'react';
import { motion } from 'framer-motion';
import { palette } from '../../config/palette';

export default function LinkConfirmModal({ link, onClose }) {
  const confirm = () => { window.open(link.url, '_blank', 'noopener'); onClose(); };
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] flex justify-center items-center bg-black/80 backdrop-blur-2xl p-4">
      <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-black/60 border border-white/20 backdrop-blur-3xl p-10 max-w-lg w-full spider-glitch rounded-[2rem]" style={{ boxShadow: `0 8px 32px rgba(25,227,211,0.2)` }}>
        <h3 className="text-4xl font-bold italic uppercase tracking-tighter mb-4 text-hero-cyan text-glitch">Leaving Portfolio</h3>
        <p className="text-zinc-200 font-light mb-8 text-lg">You are about to open <span className="text-black bg-hero-cyan font-bold px-2 py-1 ml-1 rounded">{link.name}</span> in a new tab. Continue?</p>
        <div className="flex gap-4">
          <button onClick={confirm} className="flex-1 bg-hero-cyan text-black font-bold py-4 text-sm tracking-widest uppercase hover:bg-white rounded transition-colors">Open</button>
          <button onClick={onClose} className="flex-1 bg-white/5 text-white font-bold py-4 text-sm tracking-widest uppercase border border-white/20 hover:bg-white/10 rounded transition-colors">Cancel</button>
        </div>
      </motion.div>
    </motion.div>
  );
}
