// Single source of truth for colors. Used by Tailwind (hero-*) and by components (palette.cyan etc).
export const palette = {
  red: '#e60012', pink: '#ff1fc3', cyan: '#19e3d3',
  yellow: '#ffe600', orange: '#ff7a00', purple: '#8b5cff',
  neonGreen: '#39ff14', magenta: '#ff007f'
};
// Colors the background streaks and shards are randomly picked from
export const shardColors = [palette.pink, palette.cyan, palette.yellow, palette.neonGreen, palette.magenta, palette.purple, '#ffffff'];
