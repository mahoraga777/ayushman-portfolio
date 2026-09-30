// Projects section: cards laid out in overlapping rows of 3.
import React from 'react';
import { projects } from '../../data/projects';
import { palette } from '../../config/palette';
import { titleFonts } from '../../config/fonts';
import SectionTitle from '../layout/SectionTitle';
import ProjectCard from './ProjectCard';

const ROW_SIZE = 3;
// split a list into rows of n items
const chunk = (list, n) => list.reduce((rows, _, i) => (i % n ? rows : [...rows, list.slice(i, i + n)]), []);

export default function ProjectsSection() {
  return (
    <section id="projects" className="w-full max-w-[1400px] py-28">
      <SectionTitle title="Projects" color={palette.neonGreen} font={titleFonts.projects} />
      <div className="mt-24 flex flex-col items-center pl-8 md:pl-0">
        {chunk(projects, ROW_SIZE).map((row, r) => (
          // rows after the first overlap the previous one and are shifted right
          <div key={r} className={`flex justify-center w-full px-4 overflow-x-auto md:overflow-visible ${r ? '-mt-8 md:-mt-[60px] md:ml-[80px]' : ''}`}>
            {row.map((project) => <ProjectCard key={project.id} project={project} />)}
          </div>
        ))}
      </div>
    </section>
  );
}
