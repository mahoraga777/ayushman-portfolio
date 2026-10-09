import React from 'react';
import { achievements, certifications } from '../../data/credentials';
import { palette } from '../../config/palette';
import SectionTitle from '../layout/SectionTitle';
import Panel from '../layout/Panel';

export default function CredentialsSection() {
  return (
    <section id="credentials" className="w-full relative z-20 bg-transparent py-20">
      <div className="max-w-5xl mx-auto px-6">
        <SectionTitle title="Credentials" shadow={palette.orange} />
        <div className="mt-16 grid md:grid-cols-2 gap-8">
          {certifications.map((c) => (
            <Panel key={c.title} title={c.issuer} accent={c.color} className="rounded-2xl">
              <h4 className="text-lg md:text-xl font-bold uppercase tracking-tighter leading-tight">{c.title}</h4>
              <p className="mt-2 text-xs md:text-sm text-zinc-300 tracking-wide font-light">{c.detail}</p>
            </Panel>
          ))}
          <Panel title="Achievements" accent="purple" className="md:col-span-2 rounded-2xl">
            {achievements.map((a) => <p key={a} className="text-base md:text-lg font-light tracking-wide py-1 text-zinc-200">{a}</p>)}
          </Panel>
        </div>
      </div>
    </section>
  );
}
