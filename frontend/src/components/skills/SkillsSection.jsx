import React from 'react';
import { skillGroups } from '../../data/skills';
import { palette } from '../../config/palette';
import SectionTitle from '../layout/SectionTitle';
import SkillGroup from './SkillGroup';

export default function SkillsSection() {
  return (
    <section id="skills" className="w-full py-32 my-16 relative z-20">
      <SectionTitle title="Skills & Tech" shadow={palette.cyan} />
      <div className="max-w-6xl mx-auto mt-24 px-6 md:px-10 flex flex-col gap-16">
        {skillGroups.map((group) => <SkillGroup key={group.title} group={group} />)}
      </div>
    </section>
  );
}
