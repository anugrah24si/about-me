import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

const TechGlobe = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += delta * 0.25;
  });

  return (
    <mesh ref={meshRef} scale={1.4}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial color="#64ffda" wireframe transparent opacity={0.5} />
      <mesh>
        <sphereGeometry args={[0.98, 64, 64]} />
        <meshPhysicalMaterial color="#0d3b66" transmission={0.9} roughness={0} />
      </mesh>
    </mesh>
  );
};

const ParticleField = () => {
  const count = 600;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      const radius = 2.8 + Math.random() * 1.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i] = radius * Math.sin(phi) * Math.cos(theta);
      arr[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      arr[i + 2] = radius * Math.cos(phi);
    }
    return arr;
  }, []);

  const colors = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      arr[i] = 0.39; // teal tint
      arr[i + 1] = 0.95;
      arr[i + 2] = 0.86;
    }
    return arr;
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
        <pointsMaterial size={0.03} vertexColors transparent opacity={0.8} />
    </points>
  );
};

const CircuitRings = () => {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y -= delta * 0.1;
  });

  return (
    <group ref={ref}>
      {[1.2, 1.5, 1.8].map((radius, index) => (
        <mesh key={radius} rotation={[Math.PI / 2, 0, (index / 3) * Math.PI]}>
          <torusGeometry args={[radius, 0.008, 32, 200]} />
          <meshStandardMaterial color="#14b8a6" emissive="#14b8a6" emissiveIntensity={0.6} />
        </mesh>
      ))}
    </group>
  );
};

const HeroCanvas = () => (
  <Canvas camera={{ position: [0, 0, 5], fov: 35 }}>
    <color attach="background" args={['#030712']} />
    <ambientLight intensity={0.6} />
    <directionalLight position={[3, 3, 5]} intensity={1.2} />
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <TechGlobe />
      <CircuitRings />
    </Float>
    <Float speed={1} rotationIntensity={0.05}>
      <ParticleField />
    </Float>
    <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.8} />
  </Canvas>
);

export default HeroCanvas;

