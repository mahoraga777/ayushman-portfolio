import React, {
  Suspense,
  useEffect,
  useRef,
  useState
} from 'react';

import { useGLTF } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

import {
  PLANET_MODELS,
  SPACESHIP_MODELS,
} from '../../config/assets';

// Global scale and rotation configurations for loaded assets
const MODEL_CONFIG = {
  spaceship: { rotation: [0, Math.PI, 0], targetSize: 5 },
  planet: { rotation: [0, 0, 0], targetSize: 25 },
};

// Scene boundaries and delta clamps for frame synchronization
const SCENE_CONFIG = {
  resetZ: 20, // Z-coordinate where objects recycle and respawn
  maxDelta: 0.05, // Cap frame delta to prevent teleportation after tab suspension
  shipSpawnZ: [-200, -150], 
  planetSpawnZ: [-900, -600], // Increased depth to prevent planet clustering on respawn
};

/**
 * Custom hook to monitor application environment state.
 * Tracks tab visibility and OS-level accessibility preferences.
 */
function useAppEnvironment() {
  const [env, setEnv] = useState({ isVisible: true, reducedMotion: false });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const updateEnv = () => {
      setEnv({
        isVisible: document.visibilityState === 'visible',
        reducedMotion: motionQuery.matches,
      });
    };

    updateEnv();

    document.addEventListener('visibilitychange', updateEnv);
    motionQuery.addEventListener('change', updateEnv);

    return () => {
      document.removeEventListener('visibilitychange', updateEnv);
      motionQuery.removeEventListener('change', updateEnv);
    };
  }, []);

  return env;
}

/**
 * React Error Boundary to catch WebGL or GLTF loading failures.
 * Prevents a single corrupted asset from crashing the entire canvas.
 */
class ModelErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    if (window.Sentry) {
      window.Sentry.captureException(error, { extra: info });
    } else {
      console.error('3D Asset rendering failed:', error, info);
    }
  }

  render() {
    if (this.state.hasError) {
      // Fallback wireframe box indicating a failed asset load
      return (
        <group position={this.props.position}>
          <mesh>
            <boxGeometry args={[5, 5, 5]} />
            <meshBasicMaterial color="#ff0044" wireframe />
          </mesh>
        </group>
      );
    }
    return this.props.children;
  }
}

/**
 * Lightweight geometric placeholder rendered by Suspense while heavy GLTF files download.
 */
function LoadingMesh({ position }) {
  return (
    <group position={position}>
      <mesh>
        <sphereGeometry args={[2, 8, 8]} />
        <meshBasicMaterial color="#888888" wireframe />
      </mesh>
    </group>
  );
}

// Utility to calculate random respawn depths
function randomSpawnZ([min, max]) {
  return min + Math.random() * (max - min);
}

/**
 * Clones the cached GLTF scene, normalizes its scale based on a target size,
 * centers its local origin, and duplicates its materials safely.
 */
function normalizeModel(scene, targetSize) {
  const clone = scene.clone();

  // Reset transforms to ensure Box3 calculates in purely local coordinate space
  clone.position.set(0, 0, 0);
  clone.rotation.set(0, 0, 0);
  clone.scale.setScalar(1);
  clone.updateMatrixWorld(true);

  const bounds = new THREE.Box3().setFromObject(clone);
  const size = new THREE.Vector3();
  const center = new THREE.Vector3();

  bounds.getSize(size);
  bounds.getCenter(center);

  const maxDimension = Math.max(size.x, size.y, size.z);

  // Apply uniform scaling and local offset
  if (maxDimension > 0 && Number.isFinite(maxDimension)) {
    const scaleFactor = targetSize / maxDimension;
    clone.scale.setScalar(scaleFactor);
    clone.position.sub(center.multiplyScalar(scaleFactor));
  }

  // Material registry to ensure shared materials within the same GLTF are cloned exactly once
  const originalToCloneMap = new Map();
  const clonedMaterialsList = new Set();

  const processMaterial = (originalMat) => {
    if (!originalToCloneMap.has(originalMat.uuid)) {
      const clonedMat = originalMat.clone();
      clonedMat.side = THREE.DoubleSide;

      originalToCloneMap.set(originalMat.uuid, clonedMat);
      clonedMaterialsList.add(clonedMat);
    }
    return originalToCloneMap.get(originalMat.uuid);
  };

  clone.traverse((child) => {
    if (!child.isMesh || !child.material) return;

    if (Array.isArray(child.material)) {
      child.material = child.material.map(processMaterial);
    } else {
      child.material = processMaterial(child.material);
    }
  });

  // Attach materials array to userData for O(1) garbage collection on unmount
  clone.userData.clonedMaterials = Array.from(clonedMaterialsList);

  return clone;
}

/**
 * Handles the lifecycle, animation, and rendering of a single GLTF asset (spaceship or planet).
 */
function SafeModel({ url, isShip, initialPos, speed, rotationSpeed, reducedMotion }) {
  const { scene } = useGLTF(url);
  const ref = useRef(null);
  const currentSpeed = useRef(speed);
  const [normalizedScene, setNormalizedScene] = useState(null);

  useEffect(() => {
    // Generate isolated instance and materials on mount
    const model = normalizeModel(
      scene,
      isShip ? MODEL_CONFIG.spaceship.targetSize : MODEL_CONFIG.planet.targetSize
    );
    
    setNormalizedScene(model);

    // Explicit garbage collection on unmount (Strict-Mode safe)
    return () => {
      if (model.userData.clonedMaterials) {
        model.userData.clonedMaterials.forEach((mat) => mat.dispose());
      }
    };
  }, [scene, isShip]);

  useEffect(() => {
    currentSpeed.current = speed;
  }, [speed]);

  // Frame execution loop for translation and rotation
  useFrame((_, rawDelta) => {
    if (!ref.current || reducedMotion) return;

    const delta = Math.min(rawDelta, SCENE_CONFIG.maxDelta);
    ref.current.position.z += currentSpeed.current * delta;

    if (rotationSpeed) {
      ref.current.rotation.y += (rotationSpeed.y ?? 0) * delta;
      ref.current.rotation.x += (rotationSpeed.x ?? 0) * delta;
    }

    // Respawn logic when object passes the camera
    if (ref.current.position.z > SCENE_CONFIG.resetZ) {
      if (isShip) {
        ref.current.position.set(
          (Math.random() - 0.5) * 40,
          (Math.random() - 0.5) * 20,
          randomSpawnZ(SCENE_CONFIG.shipSpawnZ)
        );
        currentSpeed.current = speed * (0.8 + Math.random() * 0.4);
      } else {
        ref.current.position.set(
          (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 80 + 40),
          (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 60 + 20),
          randomSpawnZ(SCENE_CONFIG.planetSpawnZ)
        );
      }
    }
  });

  if (!normalizedScene) return null;

  return (
    <group ref={ref} position={initialPos}>
      <primitive
        object={normalizedScene}
        rotation={isShip ? MODEL_CONFIG.spaceship.rotation : MODEL_CONFIG.planet.rotation}
      />
    </group>
  );
}

/**
 * Renders a programmatic wireframe sphere, used as fallback scenery if GLTF models are absent.
 */
function ProceduralPlanet({ initialPos, speed, rotationSpeed, reducedMotion }) {
  const ref = useRef(null);

  useFrame((_, rawDelta) => {
    if (!ref.current || reducedMotion) return;

    const delta = Math.min(rawDelta, SCENE_CONFIG.maxDelta);
    ref.current.position.z += speed * delta;

    if (rotationSpeed) {
      ref.current.rotation.y += (rotationSpeed.y ?? 0) * delta;
      ref.current.rotation.x += (rotationSpeed.x ?? 0) * delta;
    }

    if (ref.current.position.z > SCENE_CONFIG.resetZ) {
      ref.current.position.set(
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 60,
        randomSpawnZ(SCENE_CONFIG.planetSpawnZ)
      );
    }
  });

  return (
    <mesh ref={ref} position={initialPos}>
      <sphereGeometry args={[10, 16, 16]} />
      <meshStandardMaterial color="#19e3d3" wireframe={true} />
    </mesh>
  );
}

/**
 * Main Controller Component.
 * Initializes the canvas, configures lighting, and orchestrates the spatial array of models.
 */
export default function Spaceship3D() {
  const [activeShips, setActiveShips] = useState([]);
  const [activePlanets, setActivePlanets] = useState([]);
  const { isVisible, reducedMotion } = useAppEnvironment();

  // Validate asset arrays
  const hasShips = Array.isArray(SPACESHIP_MODELS) && SPACESHIP_MODELS.length > 0;
  const hasPlanets = Array.isArray(PLANET_MODELS) && PLANET_MODELS.length > 0;
  const useFallback = !hasShips && !hasPlanets;

  // Initialize scene objects
  useEffect(() => {
    if (hasShips) {
      setActiveShips([
        {
          id: 's1',
          url: SPACESHIP_MODELS[Math.floor(Math.random() * SPACESHIP_MODELS.length)],
          pos: [-10, 5, -80],
          speed: 75, 
        },
        {
          id: 's2',
          url: SPACESHIP_MODELS[Math.floor(Math.random() * SPACESHIP_MODELS.length)],
          pos: [15, -8, -130],
          speed: 85, 
        },
      ]);
    }

    if (hasPlanets) {
      const count = Math.floor(Math.random() * 2) + 2; // Generate 2 to 3 planets
      
      const planets = Array.from({ length: count }, (_, i) => ({
        id: `p${i}`,
        url: PLANET_MODELS[Math.floor(Math.random() * PLANET_MODELS.length)],
        pos: [
          (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 80 + 40), // Wider X spread
          (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 60 + 20), // Wider Y spread
          -300 - (i * 200), // CLUSTER FIX: Forcibly stagger initial Z positions using index
        ],
        speed: Math.random() * 12 + 6, 
        rot: { y: (Math.random() - 0.5) * 0.6, x: (Math.random() - 0.5) * 0.6 },
      }));
      setActivePlanets(planets);
    }
  }, [hasShips, hasPlanets]);

  // Frameloop suspends continuous rendering, dropping GPU usage to zero when hidden/static.
  const canvasFrameloop = isVisible && !reducedMotion ? 'always' : 'demand';

  return (
    <div className="absolute inset-0 z-10 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 0], fov: 50 }}
        dpr={[1, 1.5]} // Hardware resolution constraint for performance
        frameloop={canvasFrameloop}
        gl={{ antialias: false, powerPreference: 'low-power' }}
      >
        {/* Environmental Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={2.5} color="#ffffff" />
        <directionalLight position={[-10, -10, -5]} intensity={2} color="#ff1fc3" />
        <directionalLight position={[0, 10, -10]} intensity={1.5} color="#19e3d3" />

        {useFallback ? (
          <>
            {/* Fallback scene rendered if asset imports fail or are empty */}
            <ProceduralPlanet reducedMotion={reducedMotion} initialPos={[20, 30, -100]} speed={12} rotationSpeed={{ y: 0.3, x: 0.1 }} />
            <ProceduralPlanet reducedMotion={reducedMotion} initialPos={[-40, -10, -150]} speed={18} rotationSpeed={{ y: -0.3, x: -0.1 }} />
            <ProceduralPlanet reducedMotion={reducedMotion} initialPos={[10, -40, -200]} speed={9} rotationSpeed={{ y: 0.5, x: 0.05 }} />
          </>
        ) : (
          <>
            {/* Map and render GLTF Spaceships */}
            {activeShips.map((ship) =>
              ship.url && (
                <ModelErrorBoundary key={ship.id} position={ship.pos}>
                  <Suspense fallback={<LoadingMesh position={ship.pos} />}>
                    <SafeModel reducedMotion={reducedMotion} url={ship.url} isShip initialPos={ship.pos} speed={ship.speed} />
                  </Suspense>
                </ModelErrorBoundary>
              )
            )}

            {/* Map and render GLTF Planets */}
            {activePlanets.map((planet) =>
              planet.url && (
                <ModelErrorBoundary key={planet.id} position={planet.pos}>
                  <Suspense fallback={<LoadingMesh position={planet.pos} />}>
                    <SafeModel reducedMotion={reducedMotion} url={planet.url} isShip={false} initialPos={planet.pos} speed={planet.speed} rotationSpeed={planet.rot} />
                  </Suspense>
                </ModelErrorBoundary>
              )
            )}
            
            {/* Distant background procedural elements */}
            <ProceduralPlanet reducedMotion={reducedMotion} initialPos={[20, 30, -500]} speed={12} rotationSpeed={{ y: 0.3, x: 0.1 }} />
            <ProceduralPlanet reducedMotion={reducedMotion} initialPos={[-30, -40, -700]} speed={9} rotationSpeed={{ y: -0.2, x: 0.05 }} />
          </>
        )}
      </Canvas>
    </div>
  );
}