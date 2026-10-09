import React, { Suspense, useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { SPACESHIP_MODELS, PLANET_MODELS } from '../../config/assets';

const MODEL_CONFIG = {
  spaceship: { scale: 1.0, rotation: [0, Math.PI, 0] },
  planet:    { scale: 1.0, rotation: [0, 0, 0] },
};

class ErrorBoundary extends React.Component {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) return null; 
    return this.props.children;
  }
}

function SafeModel({ url, isShip, initialPos, speed, rotationSpeed }) {
  const { scene } = useGLTF(url);
  const ref = useRef();
  const currentSpeed = useRef(speed);

  const normalizedScene = useMemo(() => {
    const clone = scene.clone();
    const box = new THREE.Box3().setFromObject(clone);
    const size = new THREE.Vector3();
    box.getSize(size);
    const center = new THREE.Vector3();
    box.getCenter(center);
    
    const maxDim = Math.max(size.x, size.y, size.z);
    if (maxDim > 0) {
      const targetSize = isShip ? 5 : 25; 
      const scaleFactor = targetSize / maxDim;
      clone.scale.set(scaleFactor, scaleFactor, scaleFactor);
      
      clone.position.x = -center.x * scaleFactor;
      clone.position.y = -center.y * scaleFactor;
      clone.position.z = -center.z * scaleFactor;
    }

    clone.traverse((child) => {
        if (child.isMesh && child.material) child.material.side = THREE.DoubleSide;
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
        rotation={isShip ? MODEL_CONFIG.spaceship.rotation : MODEL_CONFIG.planet.rotation} 
    />
  );
}

function ProceduralPlanet({ initialPos, speed, rotationSpeed }) {
  const ref = useRef();
  useFrame(() => {
     if(ref.current) {
        ref.current.position.z += speed;
        if (rotationSpeed) {
          ref.current.rotation.y += rotationSpeed.y;
          ref.current.rotation.x += rotationSpeed.x;
        }
        if (ref.current.position.z > 20) {
           ref.current.position.z = -300;
           ref.current.position.x = (Math.random() - 0.5) * 100;
           ref.current.position.y = (Math.random() - 0.5) * 60;
        }
     }
  });

  return (
    <mesh ref={ref} position={initialPos}>
      <sphereGeometry args={[10, 16, 16]} />
      <meshStandardMaterial color="#19e3d3" wireframe={true} />
    </mesh>
  );
}

export default function Spaceship3D() {
  const getRandModel = (arr) => arr.length > 0 ? arr[Math.floor(Math.random() * arr.length)] : null;
  
  const [activeShips, setActiveShips] = useState([]);
  const [activePlanets, setActivePlanets] = useState([]);

  useEffect(() => {
    if (SPACESHIP_MODELS.length > 0) {
      setActiveShips([
        { id: 's1', url: getRandModel(SPACESHIP_MODELS), pos: [-10, 5, -80], speed: 1.2 },
        { id: 's2', url: getRandModel(SPACESHIP_MODELS), pos: [15, -8, -130], speed: 1.4 }
      ]);
    }
    
    if (PLANET_MODELS.length > 0) {
      setActivePlanets([
        { id: 'p1', url: getRandModel(PLANET_MODELS), pos: [40, 20, -150], speed: 0.15, rot: {y: 0.005, x: 0.002} },
        { id: 'p2', url: getRandModel(PLANET_MODELS), pos: [-50, -25, -200], speed: 0.25, rot: {y: -0.003, x: 0.001} }
      ]);
    }
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-10">
      <ErrorBoundary>
        <Canvas camera={{ position: [0, 0, 0], fov: 50 }} dpr={[1, 1.5]}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={2.5} color="#ffffff" />
          <directionalLight position={[-10, -10, -5]} intensity={2} color="#ff1fc3" />
          <directionalLight position={[0, 10, -10]} intensity={1.5} color="#19e3d3" />
          
          <Suspense fallback={null}>
            {activeShips.map(s => s.url && <SafeModel key={s.id} url={s.url} isShip={true} initialPos={s.pos} speed={s.speed} />)}
            {activePlanets.map(p => p.url && <SafeModel key={p.id} url={p.url} isShip={false} initialPos={p.pos} speed={p.speed} rotationSpeed={p.rot} />)}
            
            <ProceduralPlanet initialPos={[20, 30, -100]} speed={0.2} rotationSpeed={{y: 0.005, x: 0.002}} />
            <ProceduralPlanet initialPos={[-30, -40, -180]} speed={0.15} rotationSpeed={{y: -0.003, x: 0.001}} />
          </Suspense>
        </Canvas>
      </ErrorBoundary>
    </div>
  );
}
