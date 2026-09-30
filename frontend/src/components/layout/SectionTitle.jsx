// Section heading styled like a manga panel: bold condensed text on a light slanted panel
// with a thin diagonal cut line and speed lines. No border box.
// Every section passes its own `font` (see config/fonts.js) and `color`, the style stays the same.
import React from 'react';
import { palette } from '../../config/palette';

export default function SectionTitle({ title, color = palette.red, font = "'Bebas Neue', Impact, sans-serif" }) {
  return (
    <div className="relative mx-auto w-full max-w-5xl px-6">
      <div className="manga-panel relative overflow-hidden px-6 py-6 md:py-10 text-center">
        {/* decorative panel cut + speed lines (styles in index.css) */}
        <span className="manga-slash" aria-hidden="true" />
        <span className="manga-lines" aria-hidden="true" />
        <h2
          className="relative text-7xl md:text-[9rem] leading-none uppercase tracking-tight text-glitch"
          style={{ fontFamily: font, color, textShadow: '2px 2px 0 rgba(0,0,0,0.9)' }}
        >
          {title}
        </h2>
      </div>
    </div>
  );
}
