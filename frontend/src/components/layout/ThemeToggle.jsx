// Vertical button on the right edge that switches between the dark and the bright background.
// It only adds / removes the `light` class on <html>; all the colors live in index.css.
import React, { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [light, setLight] = useState(false);

  // keep the <html> class in sync with the state
  useEffect(() => {
    document.documentElement.classList.toggle('light', light);
  }, [light]);

  return (
    <button
      onClick={() => setLight((v) => !v)}
      aria-label="Toggle light mode"
      className="fixed right-0 top-1/2 -translate-y-1/2 z-50 w-12 py-5 bg-hero-yellow text-black font-bold uppercase tracking-[0.3em] text-xs border-2 border-black shadow-[-5px_5px_0_#000] hover:bg-white transition-colors [writing-mode:vertical-rl]"
    >
      {light ? '☾ Dark mode' : '☀ Light mode'}
    </button>
  );
}
