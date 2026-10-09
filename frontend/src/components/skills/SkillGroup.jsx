import React from 'react';
import { motion } from 'framer-motion';
import { palette } from '../../config/palette';

export default function SkillGroup({ group }) {
  const groupColor = palette[group.accent];
  return (
    <div className="relative p-8 md:p-12 rounded-[2rem] bg-black/40 backdrop-blur-3xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] overflow-hidden group spider-glitch">
      
      <div className="absolute inset-0 bg-gradient-to-br from-[color:var(--accent)] to-transparent opacity-0 group-hover:opacity-[0.08] transition-opacity pointer-events-none" style={{ '--accent': groupColor }} />
      
      <h3 className="text-2xl md:text-3xl font-bold tracking-widest uppercase mb-10 relative z-10 drop-shadow-md" style={{ color: groupColor }}>
        {group.title}
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
        {group.items.map((skill) => (
          <motion.div key={skill.name} 
            whileHover={{ scale: 1.03, y: -4 }} 
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className="p-6 rounded-[1.5rem] bg-white/5 border border-white/10 backdrop-blur-xl hover:bg-white/10 transition-all flex flex-col justify-center min-h-[120px] shadow-sm hover:shadow-[0_0_25px_var(--hover-shadow)]" 
            style={{ '--hover-shadow': groupColor + '50' }}>
             
             <div className="text-2xl font-bold text-white tracking-wide uppercase drop-shadow-sm">{skill.name}</div>
             {skill.info && (
                <div className="text-sm md:text-base text-zinc-300 font-light mt-3 leading-relaxed transition-colors">{skill.info}</div>
             )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
