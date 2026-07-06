import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Torus, Octahedron } from "@react-three/drei";
import * as THREE from "three";

/* ── Floating particles ── */
function Particles({ count = 160 }) {
  const ref = useRef();
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 14;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return arr;
  }, [count]);

  useFrame(({ clock }) => {
    ref.current.rotation.y = clock.getElapsedTime() * 0.04;
    ref.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.02) * 0.15;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.055} color="#8b5cf6" transparent opacity={0.7} sizeAttenuation />
    </points>
  );
}

/* ── Central distorted sphere ── */
function CenterSphere() {
  const ref = useRef();
  useFrame(({ clock }) => {
    ref.current.rotation.y = clock.getElapsedTime() * 0.18;
    ref.current.rotation.z = clock.getElapsedTime() * 0.08;
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[1.3, 64, 64]} />
      <MeshDistortMaterial
        color="#7c3aed"
        distort={0.4}
        speed={2.5}
        roughness={0.05}
        metalness={0.9}
        emissive="#4c1d95"
        emissiveIntensity={0.5}
      />
    </mesh>
  );
}

/* ── Orbiting torus rings ── */
function Ring({ radius, speed, color, tilt }) {
  const ref = useRef();
  useFrame(({ clock }) => {
    ref.current.rotation.z = clock.getElapsedTime() * speed;
    ref.current.rotation.x = tilt;
  });
  return (
    <mesh ref={ref}>
      <torusGeometry args={[radius, 0.018, 16, 100]} />
      <meshBasicMaterial color={color} transparent opacity={0.55} />
    </mesh>
  );
}

/* ── Floating octahedra ── */
function FloatingOcta({ position, color, scale = 0.22, speed = 0.6 }) {
  const ref = useRef();
  useFrame(({ clock }) => {
    ref.current.rotation.x = clock.getElapsedTime() * speed;
    ref.current.rotation.y = clock.getElapsedTime() * speed * 0.7;
  });
  return (
    <Float speed={1.4} rotationIntensity={0.3} floatIntensity={1.2}>
      <mesh ref={ref} position={position} scale={scale}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.4} roughness={0.1} metalness={0.8} wireframe />
      </mesh>
    </Float>
  );
}

/* ── Small icosahedra scattered around ── */
function FloatingIco({ position, color, scale = 0.15 }) {
  const ref = useRef();
  useFrame(({ clock }) => {
    ref.current.rotation.x = clock.getElapsedTime() * 0.4;
    ref.current.rotation.z = clock.getElapsedTime() * 0.5;
  });
  return (
    <Float speed={1.8} floatIntensity={1.5}>
      <mesh ref={ref} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} wireframe />
      </mesh>
    </Float>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 5.5], fov: 55 }} dpr={[1, 2]}>
        <ambientLight intensity={0.2} />
        <pointLight position={[4, 4, 4]}   intensity={3} color="#8b5cf6" />
        <pointLight position={[-4, -4, 2]} intensity={2} color="#06b6d4" />
        <pointLight position={[0, -4, -2]} intensity={1} color="#ec4899" />

        <Particles count={180} />

        <CenterSphere />

        <Ring radius={2.0} speed={0.25}  color="#8b5cf6" tilt={Math.PI / 5}  />
        <Ring radius={2.5} speed={-0.18} color="#06b6d4" tilt={Math.PI / 3}  />
        <Ring radius={3.1} speed={0.12}  color="#ec4899" tilt={Math.PI / 7}  />

        <FloatingOcta position={[ 3.2,  1.2, -1]} color="#8b5cf6" scale={0.28} speed={0.5} />
        <FloatingOcta position={[-3.0,  1.5, -0.5]} color="#06b6d4" scale={0.22} speed={0.7} />
        <FloatingOcta position={[ 2.0, -2.0, 0.5]} color="#ec4899" scale={0.18} speed={0.9} />

        <FloatingIco position={[-2.0, -1.5, 1]}  color="#a78bfa" />
        <FloatingIco position={[ 1.2,  2.4, -1]} color="#38bdf8" scale={0.12} />
        <FloatingIco position={[-1.5,  0.5, 2]}  color="#f472b6" scale={0.1} />
        <FloatingIco position={[ 3.5, -0.5, -2]} color="#8b5cf6" scale={0.13} />
      </Canvas>
    </div>
  );
}
