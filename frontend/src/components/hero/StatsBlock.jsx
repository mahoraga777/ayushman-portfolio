import React from 'react';
import { stats } from '../../data/stats';
import { palette } from '../../config/palette';
import { useLinkConfirm } from '../../context/LinkConfirm';

const LOGOS = {
  LeetCode: <svg viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16 md:w-24 md:h-24"><path d="M16.1 22l-9.2-9.2c-.4-.4-.4-1 0-1.4l2.8-2.8c.4-.4 1-.4 1.4 0l6.4 6.4c.4.4.4 1 0 1.4l-2.8 2.8c-.4.4-1 .4-1.4 0zM7.9 11.2l-2.8-2.8c-.4-.4-.4-1 0-1.4L13.5.6c.4-.4 1-.4 1.4 0l2.8 2.8c.4.4.4 1 0 1.4L9.3 12.6c-.4.4-1 .4-1.4 0z"/></svg>,
  Codeforces: <svg viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16 md:w-24 md:h-24"><path d="M4.5 7.5C5.3 7.5 6 8.2 6 9v10.5c0 .8-.7 1.5-1.5 1.5h-3C.7 21 0 20.3 0 19.5V9C0 8.2.7 7.5 1.5 7.5h3zm9-4.5c.8 0 1.5.7 1.5 1.5v15c0 .8-.7 1.5-1.5 1.5h-3c-.8 0-1.5-.7-1.5-1.5v-15c0-.8.7-1.5 1.5-1.5h3zm9 7.5c.8 0 1.5.7 1.5 1.5v7.5c0 .8-.7 1.5-1.5 1.5h-3c-.8 0-1.5-.7-1.5-1.5V12c0-.8.7-1.5 1.5-1.5h3z"/></svg>,
  AtCoder: <svg viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16 md:w-24 md:h-24"><path d="M12 2L2 22h3.5l2.5-5h8l2.5 5H22L12 2zm0 4.5l3 6h-6l3-6z"/></svg>
};

export default function StatsBlock() {
  const requestLink = useLinkConfirm();
  return (
    <div className="mt-32 w-full max-w-7xl relative z-10 px-8 md:px-0">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 perspective-1000">
        {stats.map((s) => (
          <button key={s.platform} onClick={() => requestLink(s.url, s.platform)} 
            className="group relative w-full h-[320px] bg-transparent text-left cursor-pointer outline-none spider-glitch" style={{ '--accent': palette[s.color] }}>
            <div className="relative w-full h-full transition-transform duration-700 preserve-3d group-hover:rotate-y-180">
              
              {/* FRONT: Solid Dark/Glass, No White Wash */}
              <div className="absolute inset-0 backface-hidden flex flex-col justify-center items-center p-8 bg-black/60 backdrop-blur-xl border border-[color:var(--accent)] shadow-[0_8px_32px_rgba(0,0,0,0.8)] overflow-hidden rounded-[2rem]">
                <div className="absolute top-6 left-6 text-xl md:text-2xl uppercase font-bold tracking-widest text-[color:var(--accent)] drop-shadow-[0_0_8px_var(--accent)]">{s.platform}</div>
                <div className="absolute top-4 right-6 text-[color:var(--accent)] drop-shadow-[0_0_12px_var(--accent)] opacity-80">{LOGOS[s.platform]}</div>
                <div className="text-7xl md:text-8xl font-bold tracking-tighter text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.4)] mt-8 relative z-10">
                  {s.rating}
                </div>
                <div className="mt-2 text-sm md:text-lg font-bold tracking-[0.2em] text-[color:var(--accent)] uppercase">Combat Rating</div>
              </div>

              {/* BACK: Solid Dark/Glass */}
              <div className="absolute inset-0 backface-hidden rotate-y-180 flex flex-col items-center justify-center p-8 border border-[color:var(--accent)] bg-black/60 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.8)] rounded-[2rem]">
                <h3 className="text-3xl font-bold italic text-[color:var(--accent)] uppercase tracking-tighter mb-6 shadow-sm">{s.platform} DATA</h3>
                <div className="w-full flex flex-col gap-4 text-sm md:text-lg font-bold uppercase tracking-widest text-zinc-300">
                  <div className="flex justify-between border-b border-zinc-800 pb-2"><span className="text-zinc-500">Solved:</span> <span className="text-white">{s.solved}</span></div>
                  <div className="flex justify-between border-b border-zinc-800 pb-2"><span className="text-zinc-500">Contests:</span> <span className="text-white">{s.contests}</span></div>
                  <div className="flex justify-between"><span className="text-zinc-500">Best Rank:</span> <span style={{ color: palette[s.color] }}>{s.rank}</span></div>
                </div>
              </div>

            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
