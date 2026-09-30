// Pure helper functions for the two particle types drawn on the background canvas.
import { shardColors } from '../../config/palette';

// Direction every streak travels in (unit vector pointing up-right)
export const DIR = { x: Math.cos(-0.52), y: Math.sin(-0.52) };
export const rand = (a, b) => a + Math.random() * (b - a);
const pick = (list) => list[Math.floor(Math.random() * list.length)];

// ---- Streaks: long diagonal speed lines ----
// `depth` (0.3 - 1) makes far streaks smaller, slower and less affected by the mouse (parallax)
export function makeStreak(w, h, scatter) {
  const depth = rand(0.3, 1);
  const s = { depth, len: rand(80, 360) * depth, speed: rand(140, 520) * depth, width: rand(1, 5) * depth, color: pick(shardColors), alpha: rand(0.15, 0.55) };
  if (scatter) { s.x = rand(-200, w); s.y = rand(0, h + 200); }        // initial fill of the screen
  else if (Math.random() < 0.5) { s.x = -s.len; s.y = rand(0, h + s.len); } // respawn at the left edge
  else { s.x = rand(-s.len, w); s.y = h + s.len; }                         // respawn at the bottom edge
  return s;
}

// Move a streak; if it left the screen, replace it with a new one
export function stepStreak(s, k, w, h) {
  s.x += DIR.x * s.speed * k;
  s.y += DIR.y * s.speed * k;
  const gone = s.x - DIR.x * s.len > w + 50 || s.y - DIR.y * s.len < -50;
  return gone ? makeStreak(w, h, false) : s;
}

export function drawStreak(ctx, s, mouseX, mouseY) {
  const px = s.x + mouseX * s.depth * 40;
  const py = s.y + mouseY * s.depth * 25;
  ctx.globalAlpha = s.alpha;
  ctx.strokeStyle = s.color;
  ctx.lineWidth = s.width;
  ctx.beginPath();
  ctx.moveTo(px, py);
  ctx.lineTo(px - DIR.x * s.len, py - DIR.y * s.len);
  ctx.stroke();
}

// ---- Shards: small spinning triangles floating upwards ----
export function makeShard(w, h, scatter) {
  const depth = rand(0.4, 1);
  return {
    x: rand(0, w), y: scatter ? rand(0, h) : h + 20, depth, size: rand(3, 12) * depth,
    vy: rand(20, 90) * depth, sway: rand(0.5, 2), phase: rand(0, 6.28), amp: rand(10, 40),
    rot: rand(0, 6.28), vr: rand(-2, 2), color: pick(shardColors), alpha: rand(0.3, 0.85),
  };
}

export function stepShard(e, k, w, h) {
  e.y -= e.vy * k;
  e.rot += e.vr * k;
  return e.y < -30 ? makeShard(w, h, false) : e;
}

export function drawShard(ctx, e, clock, mouseX, mouseY) {
  ctx.save();
  // horizontal sway (sine wave) + mouse parallax
  ctx.translate(e.x + Math.sin(clock * e.sway + e.phase) * e.amp - mouseX * e.depth * 30, e.y - mouseY * e.depth * 20);
  ctx.rotate(e.rot);
  ctx.globalAlpha = e.alpha;
  ctx.fillStyle = e.color;
  ctx.beginPath();
  ctx.moveTo(0, -e.size);
  ctx.lineTo(e.size * 0.6, e.size * 0.6);
  ctx.lineTo(-e.size * 0.6, e.size * 0.6);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}
