import React, { useRef } from 'react';
import useStarfield from './useStarfield';
import Spaceship3D from './Spaceship3D';

export default function BackgroundScene() {
  const canvasRef = useRef(null);
  useStarfield(canvasRef); 

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-animated" aria-hidden="true">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full mix-blend-screen" />
      <div className="absolute inset-0 halftone-overlay opacity-30 mix-blend-screen" />
      <Spaceship3D />
    </div>
  );
}
