import { motion } from "framer-motion";
import { experience } from "../data/portfolioData";

const fadeLeft = (i) => ({
  hidden:  { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] } },
});

export default function Experience() {
  return (
    <section id="experience" className="py-32 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-80 h-80 rounded-full blur-3xl opacity-8 pointer-events-none"
        style={{ background: "rgba(124,58,237,0.15)" }} />

      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-tag">Career</p>
          <h2 className="text-5xl md:text-6xl font-black" style={{ color: "#f1f5f9" }}>
            Experience
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative pl-8">
          {/* Vertical neon line */}
          <div
            className="absolute left-0 top-0 bottom-0 w-px"
            style={{ background: "linear-gradient(to bottom, #8b5cf6 0%, rgba(139,92,246,0.2) 100%)" }}
          />

          <div className="space-y-14">
            {experience.map((exp, i) => (
              <motion.div
                key={exp.id}
                className="relative"
                variants={fadeLeft(i)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                {/* Timeline dot */}
                <div
                  className="absolute -left-[2.6rem] top-5 w-5 h-5 rounded-full"
                  style={{
                    background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
                    boxShadow: "0 0 16px rgba(139,92,246,0.6)",
                  }}
                />

                {/* Card */}
                <div
                  className="glass neon-hover rounded-2xl p-7"
                  style={{ borderColor: "rgba(139,92,246,0.1)" }}
                >
                  {/* Header */}
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                    <div>
                      <h3 className="text-xl font-bold mb-0.5" style={{ color: "#f1f5f9" }}>
                        {exp.role}
                      </h3>
                      <p className="text-sm font-semibold grad-text">{exp.company}</p>
                    </div>
                    <span
                      className="text-xs font-semibold px-3 py-1.5 rounded-full"
                      style={{
                        background: "rgba(139,92,246,0.12)",
                        color: "#a78bfa",
                        border: "1px solid rgba(139,92,246,0.25)",
                      }}
                    >
                      {exp.period}
                    </span>
                  </div>

                  <p className="text-sm leading-relaxed mb-5" style={{ color: "#64748b" }}>
                    {exp.description}
                  </p>

                  {/* Tech chips */}
                  <div className="flex flex-wrap gap-2">
                    {exp.tech.map((t) => (
                      <span
                        key={t}
                        className="text-xs px-3 py-1 rounded-full"
                        style={{
                          background: "rgba(6,182,212,0.08)",
                          color: "#67e8f9",
                          border: "1px solid rgba(6,182,212,0.2)",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
