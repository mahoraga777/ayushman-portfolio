// One rating card. Front = platform name + rating on a colored, tinted background.
// Back (on hover) = solved / contests / best rank.
// Optional background picture: public/assets/images/stats/<slug>.jpg (hidden automatically if missing).
import React, { useState } from 'react';
import { palette } from '../../config/palette';
import { statImage } from '../../config/assets';

export default function StatCard({ stat, onOpen }) {
  const [imgOk, setImgOk] = useState(true);
  const accent = palette[stat.color];

  return (
    <button
      onClick={onOpen}
      // translucent + blur on the outer wrapper so the card blends with the background
      className="group relative w-full h-[300px] bg-black/30 backdrop-blur-md text-left cursor-pointer outline-none spider-glitch"
      style={{ '--accent': accent }}
    >
      <div className="relative w-full h-full transition-transform duration-700 preserve-3d group-hover:rotate-y-180">

        {/* FRONT: accent-colored gradient + optional image + platform name + rating */}
        <div
          className="absolute inset-0 backface-hidden overflow-hidden flex flex-col items-center justify-center p-8 border-2 shadow-[8px_8px_0_var(--accent)]"
          style={{ borderColor: accent, background: `linear-gradient(135deg, ${accent}66, rgba(0,0,0,0.65) 75%)` }}
        >
          {imgOk && (
            <img src={statImage(stat.slug)} alt="" onError={() => setImgOk(false)}
              className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-lighten" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />

          {/* Platform name, big and colored, so it is obvious which site this is */}
          <div className="relative text-4xl md:text-5xl font-bold italic uppercase tracking-tighter" style={{ color: accent, textShadow: '3px 3px 0 #000' }}>
            {stat.platform}
          </div>
          <div className="relative mt-2 text-6xl md:text-8xl font-bold tracking-tighter text-white" style={{ textShadow: `0 0 18px ${accent}` }}>
            {stat.rating}
          </div>
          <div className="relative mt-2 text-sm font-bold tracking-[0.2em] uppercase" style={{ color: accent }}>
            Combat Rating
          </div>
        </div>

        {/* BACK: detailed stats */}
        <div
          className="absolute inset-0 backface-hidden rotate-y-180 overflow-hidden flex flex-col items-center justify-center p-8 border-4 shadow-[12px_12px_0_var(--accent)]"
          style={{ borderColor: accent, background: `linear-gradient(135deg, ${accent}40, rgba(0,0,0,0.8) 70%)` }}
        >
          {imgOk && (
            <img src={statImage(stat.slug)} alt="" className="absolute inset-0 w-full h-full object-cover opacity-20" />
          )}
          <h3 className="relative text-3xl font-bold italic uppercase tracking-tighter mb-6" style={{ color: accent, textShadow: '2px 2px 0 #000' }}>
            {stat.platform} DATA
          </h3>
          <div className="relative w-full flex flex-col gap-3 text-sm md:text-base font-bold uppercase tracking-widest text-zinc-200">
            <div className="flex justify-between border-b border-zinc-700 pb-1">
              <span className="text-zinc-400">Solved:</span> <span className="text-white">{stat.solved}</span>
            </div>
            <div className="flex justify-between border-b border-zinc-700 pb-1">
              <span className="text-zinc-400">Contests:</span> <span className="text-white">{stat.contests}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Best Rank:</span> <span style={{ color: accent }}>{stat.rank}</span>
            </div>
          </div>
        </div>

      </div>
    </button>
  );
}
