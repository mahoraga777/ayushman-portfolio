// One skill group: colored heading + its rows. Wrapped in a translucent blurred box.
import React from 'react';
import { palette } from '../../config/palette';
import SkillRow from './SkillRow';

export default function SkillGroup({ group }) {
  return (
    <div className="spider-glitch bg-black/40 backdrop-blur-md p-6">
      <h3 className="text-3xl font-bold italic tracking-tighter uppercase pb-2 border-b-2 mb-6" style={{ color: palette[group.accent], borderColor: palette[group.accent] }}>
        {group.title}
      </h3>
      {group.items.map((skill) => <SkillRow key={skill.name} skill={skill} accent={group.accent} />)}
    </div>
  );
}
