import React from 'react';
import { palette } from '../../config/palette';
export default function Panel({ title, accent = 'red', className = '', children }) {
  return (
    <div className={`relative bg-black/40 backdrop-blur-2xl text-white border border-white/10 p-6 md:p-8 pt-8 spider-glitch transition-all ${className}`} style={{ boxShadow: `0 8px 32px 0 rgba(0,0,0,0.3)` }}>
      {title && (
        <h3 className="absolute -top-4 left-6 bg-black text-white text-sm md:text-base font-bold italic uppercase tracking-widest px-4 py-1 -skew-x-12 border border-white/10">{title}</h3>
      )}
      {children}
    </div>
  );
}
