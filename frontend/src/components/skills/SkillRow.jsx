// One skill: name, small tag and description. Lights up in the group's accent color on hover.
import React from 'react';
import { palette } from '../../config/palette';

export default function SkillRow({ skill, accent }) {
  const color = palette[accent];
  return (
    <div className="border-l-2 border-zinc-800 pl-4 pb-4 mb-4 group hover:border-[color:var(--accent)] transition-colors" style={{ '--accent': color }}>
      <div className="flex items-center justify-between gap-4">
        <span className="text-xl md:text-2xl font-bold tracking-tighter uppercase text-white group-hover:text-[color:var(--accent)] transition-colors">
          {skill.name}
        </span>
        <span className="text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 border border-zinc-700 text-zinc-400 group-hover:text-white group-hover:border-[color:var(--accent)]">
          {skill.tag}
        </span>
      </div>
      <p className="mt-2 text-sm md:text-base text-zinc-400 font-light group-hover:text-zinc-200 transition-colors">
        {skill.info}
      </p>
    </div>
  );
}
