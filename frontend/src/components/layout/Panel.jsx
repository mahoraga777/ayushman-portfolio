// Boxed content card with a colored offset shadow and a floating title tab.
// bg-black/50 + backdrop-blur-md lets the animated background blend through the box.
import React from 'react';
import { palette } from '../../config/palette';

export default function Panel({ title, accent = 'red', className = '', children }) {
  return (
    <div
      className={`relative bg-black/50 backdrop-blur-md text-white border-2 border-zinc-800 p-8 pt-10 spider-glitch transition-all ${className}`}
      style={{ boxShadow: `6px 6px 0 ${palette[accent]}` }}
    >
      {title && (
        <h3 className="absolute -top-5 left-6 bg-black text-white font-bold italic uppercase tracking-widest px-4 py-1 -skew-x-12 border border-zinc-700">
          {title}
        </h3>
      )}
      {children}
    </div>
  );
}
