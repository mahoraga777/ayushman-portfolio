import React from 'react';
import HeroTitle from './HeroTitle';
import StatsBlock from './StatsBlock';

export default function HeroSection() {
  return (
    <section id="top" className="min-h-screen w-full flex flex-col items-center px-6 md:px-8 pt-32 pb-16 relative z-20">
      <HeroTitle />
      <StatsBlock />
    </section>
  );
}
