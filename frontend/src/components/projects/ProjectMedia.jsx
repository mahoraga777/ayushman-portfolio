import React, { useEffect, useRef, useState } from 'react';
import { projectImage, projectVideo } from '../../config/assets';

export default function ProjectMedia({ project, playing }) {
  const [media, setMedia] = useState('video');
  const videoRef = useRef(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (playing) v.play().catch(() => {});
    else v.pause();
  }, [playing, media]);

  const fit = 'absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 opacity-50 group-hover:opacity-90';
  if (media === 'video') return <video ref={videoRef} src={projectVideo(project.slug)} poster={projectImage(project.slug)} loop muted playsInline preload="metadata" onError={() => setMedia('image')} className={fit} />;
  if (media === 'image') return <img src={projectImage(project.slug)} alt={project.title} onError={() => setMedia('none')} className={fit} />;
  return (
    <div className="absolute inset-0 bg-transparent flex flex-col justify-center items-center pl-12 pr-4">
      <div className="w-12 h-12 border-2 border-dashed border-white/20 rounded-full flex justify-center items-center animate-spin-slow">
        <span className="text-white/50 text-[8px] font-bold tracking-widest">OFFLINE</span>
      </div>
      <span className="mt-2 text-[8px] text-center text-white/50 font-bold uppercase tracking-widest">{project.stack}</span>
    </div>
  );
}
