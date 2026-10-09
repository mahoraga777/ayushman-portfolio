import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { palette } from '../../config/palette';
import { useLinkConfirm } from '../../context/LinkConfirm';
import ProjectMedia from './ProjectMedia';

export default function ProjectCard({ project }) {
  const requestLink = useLinkConfirm();
  const [hovered, setHovered] = useState(false);
  const color = palette[project.color] || palette.magenta;
  
  return (
    <motion.div style={{ zIndex: 1 }} whileHover={{ scale: 1.15, y: -24, rotate: -1.5, zIndex: 40 }} transition={{ type: 'spring', stiffness: 260, damping: 18 }}
      onHoverStart={() => setHovered(true)} onHoverEnd={() => setHovered(false)} onClick={() => requestLink(project.url, project.title)}
      className={`group relative shrink-0 w-[200px] h-[300px] md:w-[320px] md:h-[460px] -ml-[50px] md:-ml-[80px] first:ml-0 spider-glitch ${project.url ? 'cursor-pointer' : ''}`}>
      <div className="clip-hero-card absolute inset-0 bg-black/80 backdrop-blur-2xl transition-colors group-hover:bg-[color:var(--accent)]" style={{ '--accent': color }}>
        <div className="clip-hero-card absolute inset-[1px] bg-black/60 backdrop-blur-3xl overflow-hidden border border-white/10">
          <ProjectMedia project={project} playing={hovered} />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 to-transparent" />
          <div className="absolute top-6 right-4 md:right-9 text-right">
            <span className="bg-white/10 backdrop-blur-md text-white text-[10px] md:text-xs tracking-widest px-2 py-0.5 border border-white/20 uppercase rounded">{project.kind}</span>
            <h3 className="mt-1 text-xl md:text-3xl font-bold text-white uppercase tracking-tighter" style={{ textShadow: '2px 2px 0 #000' }}>{project.title}</h3>
          </div>
          <p className="absolute top-1/4 left-10 right-6 bg-black/80 text-white text-[10px] md:text-xs p-4 opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 border-l-2 backdrop-blur-2xl rounded-r" style={{ borderColor: color }}>
            {project.summary}
          </p>
          <div className="absolute bottom-2 left-6 md:left-10">
            <span className="bg-white/10 text-white text-[10px] md:text-xs tracking-widest px-2 py-0.5 border border-white/20 rounded">NO.</span>
            <div className="text-6xl md:text-9xl leading-none font-bold tracking-tighter" style={{ color, textShadow: '4px 4px 0 #000' }}>{project.id}</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
