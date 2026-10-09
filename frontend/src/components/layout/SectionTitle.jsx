import React from 'react';
export default function SectionTitle({ title, shadow = '#e60012' }) {
  return (
    <h2 className="text-6xl md:text-8xl font-bold italic text-center uppercase tracking-tighter text-glitch" style={{ textShadow: `4px 4px 0 ${shadow}` }}>
      {title}
    </h2>
  );
}
