import React from 'react';
import { motion } from 'framer-motion';
import { palette } from '../../config/palette';

export default function SkillGroup({ group }) {
  const groupColor = palette[group.accent];
  return (
    <div className="relative p-6 md:p-10 rounded-2xl bg-black/40 backdrop-blur-3xl border border-white/10 shadow-[0_6px_24px_rgba(0,0,0,0.4)] overflow-hidden group spider-glitch">
      
      <div className="absolute inset-0 bg-gradient-to-br from-[color:var(--accent)] to-transparent opacity-0 group-hover:opacity-[0.08] transition-opacity pointer-events-none" style={{ '--accent': groupColor }} />
      
      <h3 className="text-xl md:text-2xl font-bold tracking-widest uppercase mb-8 relative z-10 drop-shadow-md" style={{ color: groupColor }}>
        {group.title}
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 relative z-10">
        {group.items.map((skill) => (
          <motion.div key={skill.name} 
            whileHover={{ scale: 1.02, y: -2 }} 
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className="p-5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xl hover:bg-white/10 transition-all flex flex-col justify-center min-h-[100px] shadow-sm hover:shadow-[0_0_20px_var(--hover-shadow)]" 
            style={{ '--hover-shadow': groupColor + '40' }}>
             
             <div className="text-xl font-bold text-white tracking-wide uppercase drop-shadow-sm">{skill.name}</div>
             {skill.info && (
                <div className="text-xs md:text-sm text-zinc-300 font-light mt-2 leading-relaxed transition-colors">{skill.info}</div>
             )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
