import React from 'react';
import { profile } from '../../data/profile';
import { palette } from '../../config/palette';
import SectionTitle from '../layout/SectionTitle';
import Panel from '../layout/Panel';

export default function AboutSection() {
  const edu = profile.education;
  return (
    <section id="about" className="w-full relative z-20 border-y border-white/10 bg-black/40 backdrop-blur-xl px-6 py-20 mt-10">
      <div className="max-w-5xl mx-auto">
        <SectionTitle title="Introduction" shadow={palette.magenta} />
        <div className="mt-16 grid md:grid-cols-5 gap-8">
          <Panel title="Profile" accent="magenta" className="md:col-span-3 rounded-2xl p-6">
            <p className="text-lg md:text-xl leading-relaxed tracking-wide font-light">{profile.summary}</p>
          </Panel>
          <Panel title="Education" accent="cyan" className="md:col-span-2 flex flex-col justify-center rounded-2xl p-6">
            <h4 className="text-xl md:text-2xl font-bold uppercase tracking-tighter leading-tight">{edu.degree}</h4>
            <p className="mt-2 text-base text-zinc-300 font-light">{edu.school}</p>
            <p className="text-zinc-400 text-xs md:text-sm tracking-widest">{edu.university}</p>
            <p className="mt-3 font-bold tracking-widest text-hero-yellow text-sm">{edu.period}</p>
          </Panel>
        </div>
      </div>
    </section>
  );
}
