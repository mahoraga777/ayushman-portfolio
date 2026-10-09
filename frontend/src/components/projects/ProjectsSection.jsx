import React from 'react';
import { projects } from '../../data/projects';
import { palette } from '../../config/palette';
import SectionTitle from '../layout/SectionTitle';
import ProjectCard from './ProjectCard';

const chunk = (list, n) => list.reduce((rows, _, i) => (i % n ? rows : [...rows, list.slice(i, i + n)]), []);

export default function ProjectsSection() {
  return (
    <section id="projects" className="w-full max-w-[1400px] py-28 relative z-20">
      <SectionTitle title="Projects" shadow={palette.neonGreen} />
      <div className="mt-24 flex flex-col items-center pl-8 md:pl-0 relative z-10">
        {chunk(projects, 3).map((row, r) => (
          <div key={r} className={`flex justify-center w-full px-4 overflow-x-auto md:overflow-visible ${r ? '-mt-8 md:-mt-[60px] md:ml-[80px]' : ''}`}>
            {row.map((project) => <ProjectCard key={project.id} project={project} />)}
          </div>
        ))}
      </div>
    </section>
  );
}
