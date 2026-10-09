import React from 'react';
export default function SectionTitle({ title, shadow = '#e60012' }) {
  return (
    <h2 className="text-4xl md:text-6xl font-bold italic text-center uppercase tracking-tighter text-glitch" style={{ textShadow: `3px 3px 0 ${shadow}` }}>
      {title}
    </h2>
  );
}
