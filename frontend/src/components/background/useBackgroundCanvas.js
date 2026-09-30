// Hook that runs the canvas animation loop and returns the (normalized) mouse position.
import { useEffect, useState } from 'react';
import { makeStreak, stepStreak, drawStreak, makeShard, stepShard, drawShard, rand } from './particles';

const STREAKS = 46; // number of speed lines
const SHARDS = 60;  // number of floating triangles

export default function useBackgroundCanvas(canvasRef) {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // x/y = smoothed mouse, tx/ty = target mouse
    let localMouse = { x: 0, y: 0, tx: 0, ty: 0 };
    let w = 0, h = 0, raf = 0, clock = 0;
    let last = performance.now();
    let streaks = [];
    let shards = [];

    // Match the canvas to the window size (capped device pixel ratio for performance)
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      streaks = Array.from({ length: STREAKS }, () => makeStreak(w, h, true));
      shards = Array.from({ length: SHARDS }, () => makeShard(w, h, true));
    };
    
    const onMove = (e) => { 
      const tx = (e.clientX / w - 0.5) * 2; 
      const ty = (e.clientY / h - 0.5) * 2;
      localMouse.tx = tx; 
      localMouse.ty = ty;
      setMouse({ x: tx, y: ty }); // expose to react for other layers
    };

    // One animation frame: ease the mouse, move + draw every particle
    const frame = (now) => {
      const dt = Math.min(now - last, 50);
      last = now;
      clock += dt / 1000;
      localMouse.x += (localMouse.tx - localMouse.x) * 0.06;
      localMouse.y += (localMouse.ty - localMouse.y) * 0.06;
      const k = dt / 1000;

      ctx.clearRect(0, 0, w, h);
      streaks = streaks.map((s) => { const n = stepStreak(s, k, w, h); drawStreak(ctx, n, localMouse.x, localMouse.y); return n; });
      shards = shards.map((e) => { const n = stepShard(e, k, w, h); drawShard(ctx, n, clock, localMouse.x, localMouse.y); return n; });

      if (!reduce) raf = requestAnimationFrame(frame);
    };

    resize();
    window.addEventListener('resize', resize);
    if (!reduce) {
      window.addEventListener('pointermove', onMove);
      raf = requestAnimationFrame(frame);
    } else {
      frame(last + 16); // reduced motion: draw a single still frame
    }
    
    // cleanup on unmount
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
    };
  }, [canvasRef]);

  return mouse;
}
