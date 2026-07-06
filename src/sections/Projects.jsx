import { useRef } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { projects } from "../data/portfolioData";

/* ── 3-D tilt effect on mouse move ── */
function TiltCard({ children, style, className }) {
  const cardRef = useRef(null);

  const handleMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const { left, top, width, height } = card.getBoundingClientRect();
    const x = (e.clientX - left) / width  - 0.5;
    const y = (e.clientY - top)  / height - 0.5;
    card.style.transform = `perspective(800px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) scale(1.02)`;
  };

  const handleLeave = (e) => {
    const card = cardRef.current;
    if (card) card.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg) scale(1)";
  };

  return (
    <div
      ref={cardRef}
      className={`tilt-card ${className}`}
      style={{ transition: "transform 0.15s ease-out", ...style }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-32 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute left-1/3 top-0 w-96 h-96 rounded-full blur-3xl opacity-8 pointer-events-none"
        style={{ background: "rgba(139,92,246,0.12)" }} />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-tag">Portfolio</p>
          <h2 className="text-5xl md:text-6xl font-black" style={{ color: "#f1f5f9" }}>
            Projects
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <TiltCard
                className="glass rounded-3xl p-7 flex flex-col gap-5 relative overflow-hidden group h-full"
                style={{ borderColor: "rgba(139,92,246,0.1)" }}
              >
                {/* Top accent line */}
                <div
                  className="absolute top-0 left-0 right-0 h-0.5 rounded-t-3xl"
                  style={{ background: `linear-gradient(90deg, ${project.color}, transparent)` }}
                />

                {/* Project number watermark */}
                <span
                  className="absolute top-5 right-6 text-6xl font-black opacity-[0.06] select-none"
                  style={{ color: project.color }}
                >
                  {String(project.id).padStart(2, "0")}
                </span>

                {/* Corner glow */}
                <div
                  className="absolute -top-12 -right-12 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                  style={{ background: project.color }}
                />

                <h3 className="text-xl font-bold" style={{ color: "#f1f5f9" }}>
                  {project.title}
                </h3>
                <p className="text-sm leading-relaxed flex-1" style={{ color: "#64748b" }}>
                  {project.description}
                </p>

                {/* Tech chips */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-3 py-1 rounded-full"
                      style={{
                        background: `${project.color}18`,
                        color: "#c4b5fd",
                        border: `1px solid ${project.color}33`,
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center gap-6 pt-1">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-sm font-medium transition-colors duration-200 hover:text-purple-400"
                    style={{ color: "#475569" }}
                  >
                    <FaGithub /> Source
                  </a>
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-sm font-medium transition-colors duration-200 hover:text-cyan-400"
                    style={{ color: "#475569" }}
                  >
                    <FaExternalLinkAlt /> Live Demo
                  </a>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
