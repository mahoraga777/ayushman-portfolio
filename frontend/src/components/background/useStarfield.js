import { useEffect, useRef } from 'react';
import { createStar, createSpark, drawSparks, rand } from './engine';

const STAR_COUNT = 150; // Optimized count so scrolling doesn't lag
const FOV = 400;

export default function useStarfield(canvasRef) {
  const mouseRef = useRef({ x: 0, y: 0 }); 

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    let w = 0, h = 0, cx = 0, cy = 0, raf = 0;
    let stars = [], sparks = [];
    let scrollY = window.scrollY;
    let velocityZ = 0; 
    let baseSpeed = 2.5;
    
    let localMouse = { tx: 0, ty: 0, x: 0, y: 0 };

    const resize = () => {
      w = window.innerWidth; h = window.innerHeight;
      cx = w / 2; cy = h / 2;
      canvas.width = w; canvas.height = h;
      if (stars.length === 0) {
        stars = Array.from({ length: STAR_COUNT }, createStar);
      }
    };
    
    const onMove = (e) => { 
      localMouse.tx = (e.clientX - cx) * 0.05; 
      localMouse.ty = (e.clientY - cy) * 0.05;
      mouseRef.current = { x: e.clientX/w - 0.5, y: e.clientY/h - 0.5 };
      
      if (!reduce && (Math.abs(e.movementX) > 1 || Math.abs(e.movementY) > 1)) {
        for(let i=0; i<2; i++) sparks.push(createSpark(e.clientX, e.clientY));
      }
    };

    const onScroll = () => {
      const newY = window.scrollY;
      const dy = newY - scrollY;
      velocityZ = dy * 0.8; 
      scrollY = newY;
    };

    const frame = () => {
      velocityZ += (baseSpeed - velocityZ) * 0.05; 
      localMouse.x += (localMouse.tx - localMouse.x) * 0.1;
      localMouse.y += (localMouse.ty - localMouse.y) * 0.1;

      ctx.clearRect(0, 0, w, h);
      
      stars.forEach(s => {
        s.pz = s.z;
        s.z -= velocityZ; 
        
        if (s.z < 1) { s.z = 2000; s.pz = 2000; s.x = rand(-2000, 2000); s.y = rand(-2000, 2000); }
        if (s.z > 2000) { s.z = 1; s.pz = 1; s.x = rand(-2000, 2000); s.y = rand(-2000, 2000); }
        
        const projX = (s.x / s.z) * FOV + cx - localMouse.x * (2000/s.z);
        const projY = (s.y / s.z) * FOV + cy - localMouse.y * (2000/s.z);
        
        const projPX = (s.x / s.pz) * FOV + cx - localMouse.x * (2000/s.pz);
        const projPY = (s.y / s.pz) * FOV + cy - localMouse.y * (2000/s.pz);
        
        ctx.beginPath();
        ctx.lineWidth = Math.max(0.5, (1 - s.z/2000) * 3);
        ctx.strokeStyle = s.color;
        
        if (Math.abs(velocityZ) > 10) {
          ctx.moveTo(projPX, projPY); ctx.lineTo(projX, projY);
        } else {
          ctx.moveTo(projX, projY); ctx.lineTo(projX+1, projY+1);
        }
        ctx.stroke();
      });
      
      drawSparks(ctx, sparks);
      sparks = sparks.filter(sp => sp.life > 0);

      if (!reduce) raf = requestAnimationFrame(frame);
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('scroll', onScroll, { passive: true });
    if (!reduce) {
      window.addEventListener('pointermove', onMove, { passive: true });
      raf = requestAnimationFrame(frame);
    }
    
    return () => {
      cancelAnimationFrame(raf); window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', onScroll); window.removeEventListener('pointermove', onMove);
    };
  }, [canvasRef]);
}
