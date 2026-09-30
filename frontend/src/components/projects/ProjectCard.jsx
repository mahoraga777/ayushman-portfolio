// Slanted hero-style project card: grows on hover, plays its video and shows the summary.
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { palette } from '../../config/palette';
import { useLinkConfirm } from '../../context/LinkConfirm';
import ProjectMedia from './ProjectMedia';

export default function ProjectCard({ project }) {
  const requestLink = useLinkConfirm();
  const [hovered, setHovered] = useState(false); // drives video play / pause
  const color = palette[project.color] || palette.magenta;
  
  return (
    <motion.div
      style={{ zIndex: 1 }}
      whileHover={{ scale: 1.15, y: -24, rotate: -1.5, zIndex: 40 }}
      transition={{ type: 'spring', stiffness: 260, damping: 18 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={() => requestLink(project.url, project.title)}
      className={`group relative shrink-0 w-[200px] h-[300px] md:w-[320px] md:h-[460px] -ml-[50px] md:-ml-[80px] first:ml-0 spider-glitch ${project.url ? 'cursor-pointer' : ''}`}
    >
      {/* outer slanted shape = colored border, inner shape = black content area */}
      <div className="clip-hero-card absolute inset-0 bg-white/70 transition-colors group-hover:bg-[color:var(--accent)]" style={{ '--accent': color }}>
        <div className="clip-hero-card absolute inset-[2px] bg-black overflow-hidden">
          <ProjectMedia project={project} playing={hovered} />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black to-transparent" />

          {/* kind badge + title */}
          <div className="absolute top-6 right-4 md:right-9 text-right">
            <span className="bg-black text-white text-[10px] md:text-xs tracking-widest px-2 py-0.5 border border-zinc-800 uppercase">{project.kind}</span>
            <h3 className="mt-1 text-xl md:text-3xl font-bold text-white uppercase tracking-tighter" style={{ textShadow: '2px 2px 0 #000' }}>{project.title}</h3>
          </div>

          {/* summary appears on hover (blurred translucent box) */}
          <p className="absolute top-1/4 left-10 right-6 bg-black/70 backdrop-blur-sm text-white text-[10px] md:text-xs p-4 opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 border-l-2" style={{ borderColor: color }}>
            {project.summary}
          </p>

          {/* big project number */}
          <div className="absolute bottom-2 left-6 md:left-10">
            <span className="bg-black text-white text-[10px] md:text-xs tracking-widest px-2 py-0.5 border border-zinc-800">NO.</span>
            <div className="text-6xl md:text-9xl leading-none font-bold tracking-tighter" style={{ color, textShadow: '4px 4px 0 #000' }}>{project.id}</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
