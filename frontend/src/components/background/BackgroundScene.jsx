// Fixed full-screen background. Layers (bottom -> top):
// gradient -> video -> halftone dots -> particle canvas -> vignette.
// Colors for dark / light mode come from index.css (scene-* classes).
import React, { useRef, useState } from 'react';
import { motion, useSpring } from 'framer-motion';
import { BG_VIDEO } from '../../config/assets';
import useBackgroundCanvas from './useBackgroundCanvas';

export default function BackgroundScene() {
  const canvasRef = useRef(null);
  const [videoOk, setVideoOk] = useState(true); // hide the <video> if the file is missing
  const mouse = useBackgroundCanvas(canvasRef);
  
  // Spring-smoothed parallax offset for the gradient / video / dots layer
  const x = useSpring(mouse.x * 30, { stiffness: 50, damping: 20 });
  const y = useSpring(mouse.y * 30, { stiffness: 50, damping: 20 });

  return (
    <div className="scene-base fixed inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <motion.div style={{ x, y }} className="absolute -inset-10">
        <div className="absolute inset-0 bg-animated" />
        {videoOk && (
          <video src={BG_VIDEO} autoPlay loop muted playsInline onError={() => setVideoOk(false)}
            className="scene-video absolute inset-0 w-full h-full object-cover" />
        )}
        <div className="absolute inset-0 halftone" />
      </motion.div>
      <canvas ref={canvasRef} className="scene-canvas absolute inset-0 w-full h-full" />
      <div className="absolute inset-0 vignette" />
    </div>
  );
}
