import React from 'react';
import { achievements, certifications } from '../../data/credentials';
import { palette } from '../../config/palette';
import SectionTitle from '../layout/SectionTitle';
import Panel from '../layout/Panel';

export default function CredentialsSection() {
  return (
    <section id="credentials" className="w-full max-w-6xl px-6 py-24 relative z-20">
      <SectionTitle title="Credentials" shadow={palette.orange} />
      <div className="mt-20 grid md:grid-cols-2 gap-10">
        {certifications.map((c) => (
          <Panel key={c.title} title={c.issuer} accent={c.color} className="rounded-[2rem]">
            <h4 className="text-xl font-bold uppercase tracking-tighter leading-tight">{c.title}</h4>
            <p className="mt-3 text-sm text-zinc-300 tracking-wide font-light">{c.detail}</p>
          </Panel>
        ))}
        <Panel title="Achievements" accent="purple" className="md:col-span-2 rounded-[2rem]">
          {achievements.map((a) => <p key={a} className="text-lg font-light tracking-wide py-1 text-zinc-200">{a}</p>)}
        </Panel>
      </div>
    </section>
  );
}
