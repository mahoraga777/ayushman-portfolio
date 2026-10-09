import React from 'react';
import HeroTitle from './HeroTitle';
import StatsBlock from './StatsBlock';

export default function HeroSection() {
  return (
    <section id="top" className="min-h-screen w-full flex flex-col items-center justify-center px-4 md:px-8 relative z-20 pb-10">
      <HeroTitle />
      <StatsBlock />
    </section>
  );
}
