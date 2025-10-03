"use client";

import { Grid, OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

// Composant pour la grille animée
function AnimatedGrid() {
  const gridRef = useRef<THREE.Mesh>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame((state) => {
    if (gridRef.current) {
      // Animation de rotation basée sur le temps et la position de la souris
      gridRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1 + mousePosition.y * 0.1;
      gridRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.15) * 0.1 + mousePosition.x * 0.1;
      
      // Animation de position
      gridRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.5;
    }
  });

  return (
    <Grid
      ref={gridRef}
      args={[50, 50]}
      cellSize={1}
      cellThickness={0.5}
      cellColor="#16A34A"
      sectionSize={5}
      sectionThickness={1}
      sectionColor="#00FF88"
      fadeDistance={30}
      fadeStrength={1}
      followCamera={false}
      infiniteGrid
    />
  );
}

// Composant pour les particules flottantes
function FloatingParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  const [particles] = useState(() => {
    const count = 200;
    const positions = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 100;
    }
    
    return positions;
  });

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.001;
      
      // Animation des particules individuelles
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin(state.clock.elapsedTime + positions[i] * 0.01) * 0.01;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
          args={[particles, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#00FF88"
        size={0.5}
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Composant pour les lignes d'énergie
function EnergyLines() {
  const linesRef = useRef<THREE.LineSegments>(null);

  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.rotation.y += 0.002;
      if (Array.isArray(linesRef.current.material)) {
        linesRef.current.material.forEach(mat => {
          if ('opacity' in mat) mat.opacity = 0.3 + Math.sin(state.clock.elapsedTime * 2) * 0.2;
        });
      } else if ('opacity' in linesRef.current.material) {
        linesRef.current.material.opacity = 0.3 + Math.sin(state.clock.elapsedTime * 2) * 0.2;
      }
    }
  });

  return (
    <lineSegments ref={linesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={24}
          array={new Float32Array([
            // Lignes horizontales
            -25, 0, -25, 25, 0, -25,
            -25, 0, 0, 25, 0, 0,
            -25, 0, 25, 25, 0, 25,
            // Lignes verticales
            -25, 0, -25, -25, 0, 25,
            0, 0, -25, 0, 0, 25,
            25, 0, -25, 25, 0, 25,
            // Lignes diagonales
            -25, 0, -25, 25, 0, 25,
            -25, 0, 25, 25, 0, -25,
          ])}
          itemSize={3}
          args={[new Float32Array([
            // Lignes horizontales
            -25, 0, -25, 25, 0, -25,
            -25, 0, 0, 25, 0, 0,
            -25, 0, 25, 25, 0, 25,
            // Lignes verticales
            -25, 0, -25, -25, 0, 25,
            0, 0, -25, 0, 0, 25,
            25, 0, -25, 25, 0, 25,
            // Lignes diagonales
            -25, 0, -25, 25, 0, 25,
            -25, 0, 25, 25, 0, -25,
          ]), 3]}
        />
      </bufferGeometry>
      <lineBasicMaterial
        color="#16A34A"
        transparent
        opacity={0.4}
        blending={THREE.AdditiveBlending}
      />
    </lineSegments>
  );
}

// Composant principal Hero3D
export function Hero3D() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 5, 15], fov: 75 }}
        style={{ background: "transparent" }}
      >
        {/* Éclairage */}
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#00FF88" />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#16A34A" />
        
        {/* Composants 3D */}
        <AnimatedGrid />
        <FloatingParticles />
        <EnergyLines />
        
        {/* Contrôles (désactivés pour une expérience immersive) */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
          autoRotate={true}
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Canvas>
      
      {/* Overlay avec effet de dégradé */}
      <div className="absolute inset-0 bg-gradient-radial pointer-events-none" />
    </div>
  );
}
