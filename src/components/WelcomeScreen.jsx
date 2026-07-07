import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Float } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import avatarUrl from "/avatar.jpg?url";

/* ── Spinning 3D logo sphere ── */
function LogoSphere() {
  const ref = useRef();
  useFrame(({ clock }) => {
    ref.current.rotation.y = clock.getElapsedTime() * 0.6;
    ref.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.4) * 0.3;
  });
  return (
    <Float speed={1.5} floatIntensity={0.6}>
      <mesh ref={ref}>
        <icosahedronGeometry args={[1, 2]} />
        <MeshDistortMaterial
          color="#7c3aed"
          distort={0.35}
          speed={3}
          roughness={0.05}
          metalness={0.9}
          emissive="#4c1d95"
          emissiveIntensity={0.6}
          wireframe={false}
        />
      </mesh>
    </Float>
  );
}

/* ── Orbiting ring ── */
function Ring({ radius, speed, tilt, color }) {
  const ref = useRef();
  useFrame(({ clock }) => {
    ref.current.rotation.z = clock.getElapsedTime() * speed;
    ref.current.rotation.x = tilt;
  });
  return (
    <mesh ref={ref}>
      <torusGeometry args={[radius, 0.015, 16, 120]} />
      <meshBasicMaterial color={color} transparent opacity={0.6} />
    </mesh>
  );
}

/* ── Particle cloud ── */
function Particles() {
  const ref = useRef();
  const positions = (() => {
    const arr = new Float32Array(300 * 3);
    for (let i = 0; i < 300; i++) {
      const r     = 1.8 + Math.random() * 2.5;
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      arr[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  })();

  useFrame(({ clock }) => {
    ref.current.rotation.y = clock.getElapsedTime() * 0.08;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#a78bfa" transparent opacity={0.8} sizeAttenuation />
    </points>
  );
}

/* ── Avatar — shows photo, falls back to initials ── */
function AvatarImage() {
  const [err, setErr] = useState(false);

  if (err) {
    return (
      <div
        className="w-full h-full flex items-center justify-center text-3xl font-black"
        style={{
          background: "linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%)",
          color: "#fff",
        }}
      >
        AV
      </div>
    );
  }

  return (
    <img
      src={avatarUrl}
      alt="Akash V"
      className="w-full h-full object-cover"
      onError={() => setErr(true)}
    />
  );
}

/* ════════════════════════════════════════
   WelcomeScreen
   Props:
     visible  — boolean, whether to show
     onDone   — called when exit animation completes
════════════════════════════════════════ */
export default function WelcomeScreen({ visible, onDone }) {
  return (
    <AnimatePresence onExitComplete={onDone}>
      {visible && (
        <motion.div
          key="welcome"
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: "#030014" }}
          exit={{
            // Curtain wipe upward
            clipPath: ["inset(0% 0% 0% 0%)", "inset(100% 0% 0% 0%)"],
            transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          {/* ── 3D canvas ── */}
          <div className="absolute inset-0 z-0">
            <Canvas camera={{ position: [0, 0, 4], fov: 50 }} dpr={[1, 2]}>
              <ambientLight intensity={0.2} />
              <pointLight position={[3, 3, 3]}  intensity={4} color="#8b5cf6" />
              <pointLight position={[-3, -2, 2]} intensity={2} color="#06b6d4" />
              <Particles />
              <LogoSphere />
              <Ring radius={1.7} speed={0.4}  tilt={Math.PI / 5} color="#8b5cf6" />
              <Ring radius={2.1} speed={-0.3} tilt={Math.PI / 3} color="#06b6d4" />
            </Canvas>
          </div>

          {/* ── Radial glow ── */}
          <div
            className="absolute inset-0 pointer-events-none z-0"
            style={{
              background:
                "radial-gradient(ellipse 55% 55% at 50% 50%, rgba(124,58,237,0.22) 0%, transparent 70%)",
            }}
          />

          {/* ── Text content ── */}
          <div className="relative z-10 flex flex-col items-center gap-5 select-none">
            {/* Photo avatar */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="relative mb-2"
            >
              {/* Spinning gradient border ring */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: "conic-gradient(from 0deg, #7c3aed, #06b6d4, #ec4899, #7c3aed)",
                  padding: "3px",
                  borderRadius: "50%",
                }}
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
              />
              {/* Outer glow */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  boxShadow: "0 0 40px rgba(124,58,237,0.55), 0 0 80px rgba(124,58,237,0.2)",
                  borderRadius: "50%",
                }}
              />
              {/* Photo frame */}
              <div
                className="relative w-44 h-44 rounded-full overflow-hidden"
                style={{ border: "4px solid transparent", background: "#030014" }}
              >
                <AvatarImage />
              </div>
            </motion.div>

            {/* Name */}
            <motion.h1
              className="text-5xl md:text-7xl font-black tracking-tight text-center"
              style={{
                background: "linear-gradient(135deg, #a78bfa 0%, #38bdf8 60%, #f472b6 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              Akash Vuppala
            </motion.h1>

            {/* Role */}
            <motion.p
              className="text-base md:text-lg font-medium tracking-[0.25em] uppercase"
              style={{ color: "#64748b" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              Software Engineer
            </motion.p>

            {/* Divider */}
            <motion.div
              className="h-px w-32"
              style={{ background: "linear-gradient(90deg, transparent, #8b5cf6, transparent)" }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.85 }}
            />

            {/* Progress bar */}
            <ProgressBar />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── Animated progress bar ── */
function ProgressBar() {
  return (
    <div className="flex flex-col items-center gap-2 mt-2">
      <div
        className="w-48 h-0.5 rounded-full overflow-hidden"
        style={{ background: "rgba(139,92,246,0.2)" }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{ background: "linear-gradient(90deg, #7c3aed, #06b6d4)" }}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 3.5, delay: 0.6, ease: "linear" }}
        />
      </div>
      <motion.span
        className="text-xs tracking-widest uppercase"
        style={{ color: "#475569" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
      >
        Loading experience...
      </motion.span>
    </div>
  );
}
