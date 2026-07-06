import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import { motion } from "framer-motion";
import { aboutText, skills } from "../data/portfolioData";

/* ── 3-D side piece: rotating torus knot ── */
function TorusKnot() {
  const ref = useRef();
  useFrame(({ clock }) => {
    ref.current.rotation.x = clock.getElapsedTime() * 0.2;
    ref.current.rotation.y = clock.getElapsedTime() * 0.3;
  });
  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.8}>
      <mesh ref={ref}>
        <torusKnotGeometry args={[0.8, 0.25, 128, 32]} />
        <MeshDistortMaterial
          color="#7c3aed"
          distort={0.25}
          speed={2}
          roughness={0.05}
          metalness={0.9}
          emissive="#4c1d95"
          emissiveIntensity={0.5}
        />
      </mesh>
    </Float>
  );
}

const fadeUp = {
  hidden:  { opacity: 0, y: 50 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] } }),
};

export default function About() {
  return (
    <section id="about" className="py-32 relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute right-0 top-1/3 w-96 h-96 rounded-full blur-3xl opacity-8 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%)" }} />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          className="mb-20"
          variants={fadeUp} custom={0}
          initial="hidden" whileInView="visible"
          viewport={{ once: true }}
        >
          <p className="section-tag">About me</p>
          <h2 className="text-5xl md:text-6xl font-black" style={{ color: "#f1f5f9" }}>
            Who I Am
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Bio + skills */}
          <div className="space-y-8">
            {aboutText.map((para, i) => (
              <motion.p
                key={i}
                className="text-lg leading-relaxed"
                style={{ color: "#64748b" }}
                variants={fadeUp} custom={i + 1}
                initial="hidden" whileInView="visible"
                viewport={{ once: true }}
              >
                {para}
              </motion.p>
            ))}

            {/* Stats */}
            <motion.div
              className="grid grid-cols-3 gap-4 pt-4"
              variants={fadeUp} custom={4}
              initial="hidden" whileInView="visible"
              viewport={{ once: true }}
            >
              {[{ value: "2+", label: "Years" }, { value: "4+", label: "Projects" }, { value: "3", label: "Certs" }].map((s) => (
                <div
                  key={s.label}
                  className="glass neon-hover rounded-2xl p-5 text-center"
                >
                  <div className="text-3xl font-black grad-text">{s.value}</div>
                  <div className="text-xs mt-1" style={{ color: "#64748b" }}>{s.label}</div>
                </div>
              ))}
            </motion.div>

            {/* Skills */}
            <motion.div
              className="space-y-5 pt-4"
              variants={fadeUp} custom={5}
              initial="hidden" whileInView="visible"
              viewport={{ once: true }}
            >
              {skills.map((group) => (
                <div key={group.category}>
                  <p className="section-tag" style={{ marginBottom: "0.5rem" }}>{group.category}</p>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((skill) => (
                      <span
                        key={skill}
                        className="glass neon-hover rounded-full px-4 py-1.5 text-sm font-medium"
                        style={{ color: "#a78bfa" }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* 3-D Torus Knot */}
          <motion.div
            className="w-full rounded-3xl overflow-hidden"
            style={{ height: "480px", background: "rgba(10,10,26,0.4)", border: "1px solid rgba(139,92,246,0.12)" }}
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <Canvas camera={{ position: [0, 0, 3], fov: 55 }} dpr={[1, 2]}>
              <ambientLight intensity={0.25} />
              <pointLight position={[4, 4, 4]} intensity={3} color="#8b5cf6" />
              <pointLight position={[-4, -2, 2]} intensity={2} color="#06b6d4" />
              <TorusKnot />
            </Canvas>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
