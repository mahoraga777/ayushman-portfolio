import React, { Suspense, useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { SPACESHIP_MODELS, PLANET_MODELS } from '../../config/assets';

class ErrorBoundary extends React.Component {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) return null; 
    return this.props.children;
  }
}

// ---------------------------------------------------------
// AUTO-SCALING GEOMETRY NORMALIZER 
// Fixes "cooked" scaling by measuring the 3D bounds and mathematically resizing it.
// ---------------------------------------------------------
function SafeModel({ url, isShip, initialPos, speed, rotationSpeed }) {
  const { scene } = useGLTF(url);
  const ref = useRef();
  const currentSpeed = useRef(speed);

  // useMemo completely isolates each model instance and normalizes its scale based on bounding boxes
  const normalizedScene = useMemo(() => {
    const clone = scene.clone();
    
    // Measure actual 3D boundaries
    const box = new THREE.Box3().setFromObject(clone);
    const size = new THREE.Vector3();
    box.getSize(size);
    const center = new THREE.Vector3();
    box.getCenter(center);
    
    const maxDim = Math.max(size.x, size.y, size.z);
    if (maxDim > 0) {
      // Spaceships become exactly 5 units wide, Planets become exactly 25 units wide
      const targetSize = isShip ? 5 : 25; 
      const scaleFactor = targetSize / maxDim;
      clone.scale.set(scaleFactor, scaleFactor, scaleFactor);
      
      // Center the origin point so rotations aren't weird
      clone.position.x = -center.x * scaleFactor;
      clone.position.y = -center.y * scaleFactor;
      clone.position.z = -center.z * scaleFactor;
    }

    // Force materials to be DoubleSide so hollow models don't look broken
    clone.traverse((child) => {
        if (child.isMesh && child.material) {
            child.material.side = THREE.DoubleSide;
        }
    });

    const group = new THREE.Group();
    group.add(clone);
    return group;
  }, [scene, isShip]);

  useFrame(() => {
     if(ref.current) {
        ref.current.position.z += currentSpeed.current;
        
        if (rotationSpeed) {
          ref.current.rotation.y += rotationSpeed.y || 0;
          ref.current.rotation.x += rotationSpeed.x || 0;
        }
        
        // Reset Logic - Distinct Lanes for Ships vs Planets
        if (ref.current.position.z > 20) {
           if (isShip) {
             ref.current.position.z = -150; 
             ref.current.position.x = (Math.random() - 0.5) * 40; 
             ref.current.position.y = (Math.random() - 0.5) * 20;
             currentSpeed.current = speed * (Math.random() * 0.5 + 0.8);
           } else {
             ref.current.position.z = -300; 
             const signX = Math.random() > 0.5 ? 1 : -1;
             const signY = Math.random() > 0.5 ? 1 : -1;
             ref.current.position.x = signX * (Math.random() * 40 + 30); 
             ref.current.position.y = signY * (Math.random() * 30 + 15);
           }
        }
     }
  });

  return (
    <primitive 
        ref={ref} 
        object={normalizedScene} 
        position={initialPos} 
        rotation={isShip ? [0, Math.PI, 0] : [0,0,0]} 
    />
  );
}

// ---------------------------------------------------------
// FALLBACK GEOMETRY
// Rendered if folders are empty so the app never crashes
// ---------------------------------------------------------
function FallbackShape({ isShip, initialPos, speed, rotationSpeed }) {
  const ref = useRef();
  useFrame(() => {
     if(ref.current) {
        ref.current.position.z += speed;
        if (rotationSpeed) {
          ref.current.rotation.y += rotationSpeed.y;
          ref.current.rotation.x += rotationSpeed.x;
        }
        if (ref.current.position.z > 20) {
           ref.current.position.z = isShip ? -150 : -300;
           ref.current.position.x = (Math.random() - 0.5) * (isShip ? 40 : 100);
           ref.current.position.y = (Math.random() - 0.5) * (isShip ? 20 : 60);
        }
     }
  });

  return (
    <mesh ref={ref} position={initialPos}>
      {isShip ? <coneGeometry args={[2, 6, 4]} /> : <sphereGeometry args={[10, 16, 16]} />}
      <meshStandardMaterial color={isShip ? "#ff1fc3" : "#19e3d3"} wireframe={!isShip} />
    </mesh>
  );
}

export default function Spaceship3D() {
  // Select random models from the auto-detected arrays
  const getRandModel = (arr) => arr.length > 0 ? arr[Math.floor(Math.random() * arr.length)] : null;
  
  const [activeShips, setActiveShips] = useState([]);
  const [activePlanets, setActivePlanets] = useState([]);

  useEffect(() => {
    // Generate exactly 2 ships
    setActiveShips([
      { id: 's1', url: getRandModel(SPACESHIP_MODELS), pos: [-10, 5, -80], speed: 1.2 },
      { id: 's2', url: getRandModel(SPACESHIP_MODELS), pos: [15, -8, -130], speed: 1.4 }
    ]);
    // Generate exactly 3 planets
    setActivePlanets([
      { id: 'p1', url: getRandModel(PLANET_MODELS), pos: [40, 20, -150], speed: 0.15, rot: {y: 0.005, x: 0.002} },
      { id: 'p2', url: getRandModel(PLANET_MODELS), pos: [-50, -25, -200], speed: 0.25, rot: {y: -0.003, x: 0.001} },
      { id: 'p3', url: getRandModel(PLANET_MODELS), pos: [35, -30, -250], speed: 0.10, rot: {y: 0.002, x: -0.001} }
    ]);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-10">
      <ErrorBoundary>
        {/* dpr restriction stops lag on high-res monitors! */}
        <Canvas camera={{ position: [0, 0, 0], fov: 50 }} dpr={[1, 1.5]}>
          <ambientLight intensity={0.5} />
          {/* Cyberpunk / Spiderverse 3D Lighting */}
          <directionalLight position={[10, 10, 5]} intensity={2.5} color="#ffffff" />
          <directionalLight position={[-10, -10, -5]} intensity={2} color="#ff1fc3" />
          <directionalLight position={[0, 10, -10]} intensity={1.5} color="#19e3d3" />
          
          <Suspense fallback={null}>
            {activeShips.map(s => s.url 
              ? <SafeModel key={s.id} url={s.url} isShip={true} initialPos={s.pos} speed={s.speed} /> 
              : <FallbackShape key={s.id} isShip={true} initialPos={s.pos} speed={s.speed} />
            )}
            
            {activePlanets.map(p => p.url 
              ? <SafeModel key={p.id} url={p.url} isShip={false} initialPos={p.pos} speed={p.speed} rotationSpeed={p.rot} /> 
              : <FallbackShape key={p.id} isShip={false} initialPos={p.pos} speed={p.speed} rotationSpeed={p.rot} />
            )}
          </Suspense>
        </Canvas>
      </ErrorBoundary>
    </div>
  );
}
