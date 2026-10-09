import { shardColors } from '../../config/palette';
export const rand = (a, b) => a + Math.random() * (b - a);
const pick = (list) => list[Math.floor(Math.random() * list.length)];

export function createStar() {
  return {
    x: rand(-2000, 2000), y: rand(-2000, 2000), z: rand(10, 2000), pz: 0,
    color: pick(shardColors)
  };
}

export function createSpark(x, y) {
  return {
    x, y, vx: rand(-4, 4), vy: rand(-4, 4), life: 1, 
    type: Math.random() > 0.5 ? 'triangle' : 'circle',
    color: pick(['#ff1fc3', '#19e3d3', '#39ff14']), size: rand(2, 6)
  };
}

export function drawSparks(ctx, sparks) {
  sparks.forEach(sp => {
    sp.x += sp.vx; sp.y += sp.vy; sp.life -= 0.03;
    ctx.globalAlpha = Math.max(0, sp.life);
    ctx.fillStyle = sp.color;
    if (sp.type === 'circle') {
      ctx.beginPath(); ctx.arc(sp.x, sp.y, sp.size, 0, 6.28); ctx.fill();
    } else {
      ctx.beginPath(); ctx.moveTo(sp.x, sp.y - sp.size); 
      ctx.lineTo(sp.x - sp.size, sp.y + sp.size); ctx.lineTo(sp.x + sp.size, sp.y + sp.size); ctx.fill();
    }
  });
  ctx.globalAlpha = 1;
}
