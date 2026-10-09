import React from 'react';
import { projects } from '../../data/projects';
import { palette } from '../../config/palette';
import SectionTitle from '../layout/SectionTitle';
import ProjectCard from './ProjectCard';

const chunk = (list, n) => list.reduce((rows, _, i) => (i % n ? rows : [...rows, list.slice(i, i + n)]), []);

export default function ProjectsSection() {
  return (
    <section id="projects" className="w-full relative z-20 border-y border-white/10 bg-black/40 backdrop-blur-xl py-20">
      <SectionTitle title="Projects" shadow={palette.neonGreen} />
      <div className="mt-16 flex flex-col items-center pl-4 md:pl-0 relative z-10">
        {chunk(projects, 3).map((row, r) => (
          <div key={r} className={`flex justify-center w-full px-2 overflow-x-auto md:overflow-visible ${r ? '-mt-6 md:-mt-10 md:ml-[60px]' : ''}`}>
            {row.map((project) => <ProjectCard key={project.id} project={project} />)}
          </div>
        ))}
      </div>
    </section>
  );
}
