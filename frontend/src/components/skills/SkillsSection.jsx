import React from 'react';
import { skillGroups } from '../../data/skills';
import { palette } from '../../config/palette';
import SectionTitle from '../layout/SectionTitle';
import SkillGroup from './SkillGroup';

export default function SkillsSection() {
  return (
    <section id="skills" className="w-full relative z-20 bg-transparent py-20">
      <SectionTitle title="Skills & Tech" shadow={palette.cyan} />
      <div className="max-w-5xl mx-auto mt-16 px-6 flex flex-col gap-12">
        {skillGroups.map((group) => <SkillGroup key={group.title} group={group} />)}
      </div>
    </section>
  );
}
