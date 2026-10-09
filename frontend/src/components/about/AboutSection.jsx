import React from 'react';
import { profile } from '../../data/profile';
import { palette } from '../../config/palette';
import SectionTitle from '../layout/SectionTitle';
import Panel from '../layout/Panel';

export default function AboutSection() {
  const edu = profile.education;
  return (
    <section id="about" className="w-full max-w-6xl px-6 py-24 mt-20 relative z-20">
      <SectionTitle title="Introduction" shadow={palette.magenta} />
      <div className="mt-20 grid md:grid-cols-5 gap-10">
        <Panel title="Profile" accent="magenta" className="md:col-span-3 rounded-[2rem]">
          <p className="text-xl leading-relaxed tracking-wide font-light">{profile.summary}</p>
        </Panel>
        <Panel title="Education" accent="cyan" className="md:col-span-2 flex flex-col justify-center rounded-[2rem]">
          <h4 className="text-2xl font-bold uppercase tracking-tighter leading-tight">{edu.degree}</h4>
          <p className="mt-3 text-lg text-zinc-300 font-light">{edu.school}</p>
          <p className="text-zinc-400 text-sm tracking-widest">{edu.university}</p>
          <p className="mt-3 font-bold tracking-widest text-hero-yellow">{edu.period}</p>
        </Panel>
      </div>
    </section>
  );
}
