// Skills section: four skill groups + colored specialization pills.
import React from 'react';
import { skillGroups, specializations } from '../../data/skills';
import { palette } from '../../config/palette';
import { titleFonts } from '../../config/fonts';
import SectionTitle from '../layout/SectionTitle';
import SkillGroup from './SkillGroup';

export default function SkillsSection() {
  return (
    <section id="skills" className="w-full border-y border-zinc-800 py-32 my-16 relative">
      {/* light veil behind the section (was a heavy black layer, now the video shows through) */}
      <div className="absolute inset-0 skills-veil -z-10" />
      <SectionTitle title="Skills & Tech" color={palette.cyan} font={titleFonts.skills} />
      <div className="max-w-7xl mx-auto mt-24 px-6 md:px-10 grid md:grid-cols-2 gap-x-20 gap-y-16">
        {skillGroups.map((group) => <SkillGroup key={group.title} group={group} />)}
      </div>
      <div className="max-w-7xl mx-auto mt-20 px-6 md:px-10 flex flex-wrap gap-4 justify-center">
        {specializations.map((name, i) => (
          <span key={name} className="px-6 py-2 text-black font-bold uppercase tracking-widest text-sm spider-glitch"
            style={{ background: Object.values(palette)[i % 6] }}>
            {name}
          </span>
        ))}
      </div>
    </section>
  );
}
