// Tailwind config: the shared palette is exposed as `hero-*` colors (e.g. bg-hero-red).
import { palette } from './src/config/palette.js';

export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: { display: ['Oswald', 'Impact', 'sans-serif'] },
      animation: { 'spin-slow': 'spin 8s linear infinite' },
      colors: { hero: palette },
    },
  },
  plugins: [],
};
