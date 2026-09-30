// First screen: big name + competitive programming ratings.
import React from 'react';
import { profile } from '../../data/profile';
import HeroTitle from './HeroTitle';
import StatsBlock from './StatsBlock';

export default function HeroSection() {
  return (
    <section id="top" className="min-h-screen w-full flex flex-col items-center px-6 md:px-8 pt-32 pb-16">
      <HeroTitle />
      <StatsBlock />
    </section>
  );
}
