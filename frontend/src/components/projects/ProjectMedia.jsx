// Card media with a fallback chain: video -> image -> "OFFLINE" placeholder.
import React, { useEffect, useRef, useState } from 'react';
import { projectImage, projectVideo } from '../../config/assets';

export default function ProjectMedia({ project, playing }) {
  const [media, setMedia] = useState('video');
  const videoRef = useRef(null);

  // play the video only while the card is hovered
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (playing) v.play().catch(() => {});
    else v.pause();
  }, [playing, media]);

  // gray + dim normally, full color on hover
  const fit = 'absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 opacity-60 group-hover:opacity-100';
  if (media === 'video') {
    return <video ref={videoRef} src={projectVideo(project.slug)} poster={projectImage(project.slug)} loop muted playsInline preload="metadata" onError={() => setMedia('image')} className={fit} />;
  }
  if (media === 'image') {
    return <img src={projectImage(project.slug)} alt={project.title} onError={() => setMedia('none')} className={fit} />;
  }
  // neither file exists
  return (
    <div className="absolute inset-0 bg-black flex flex-col justify-center items-center pl-12 pr-4">
      <div className="w-16 h-16 border-2 border-dashed border-zinc-700 rounded-full flex justify-center items-center animate-spin-slow">
        <span className="text-zinc-500 text-[10px] font-bold tracking-widest">OFFLINE</span>
      </div>
      <span className="mt-2 text-[10px] text-center text-zinc-500 font-bold uppercase tracking-widest">{project.stack}</span>
    </div>
  );
}
