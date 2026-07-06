import { motion } from "framer-motion";
import { certifications } from "../data/portfolioData";

export default function Certifications() {
  return (
    <section id="certifications" className="py-32 relative overflow-hidden">
      {/* Glow */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(56,189,248,0.08) 0%, transparent 70%)" }}
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-tag">Credentials</p>
          <h2 className="text-5xl md:text-6xl font-black" style={{ color: "#f1f5f9" }}>
            Certifications
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
              className="glass neon-hover rounded-3xl p-7 flex flex-col gap-5 relative overflow-hidden group"
              style={{ borderColor: `${cert.color}22` }}
            >
              {/* Coloured top bar */}
              <div
                className="absolute top-0 left-0 right-0 h-0.5 rounded-t-3xl"
                style={{ background: `linear-gradient(90deg, ${cert.color}, transparent)` }}
              />

              {/* Corner glow on hover */}
              <div
                className="absolute -top-10 -right-10 w-36 h-36 rounded-full blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                style={{ background: cert.color }}
              />

              {/* Badge row */}
              <div className="flex items-center justify-between">
                {/* Icon circle */}
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
                  style={{
                    background: `${cert.color}18`,
                    border: `1px solid ${cert.color}44`,
                  }}
                >
                  {cert.icon}
                </div>

                {/* Short code pill */}
                <span
                  className="text-xs font-black tracking-widest px-3 py-1.5 rounded-full"
                  style={{
                    background: `${cert.color}18`,
                    color: cert.color,
                    border: `1px solid ${cert.color}44`,
                  }}
                >
                  {cert.shortCode}
                </span>
              </div>

              {/* Text */}
              <div className="flex flex-col gap-1">
                <h3 className="text-base font-bold leading-snug" style={{ color: "#f1f5f9" }}>
                  {cert.title}
                </h3>
                <p
                  className="text-xs font-semibold uppercase tracking-widest"
                  style={{ color: cert.color }}
                >
                  {cert.issuer}
                </p>
              </div>

              <p className="text-sm leading-relaxed" style={{ color: "#64748b" }}>
                {cert.description}
              </p>

              {/* Verified badge */}
              <div className="flex items-center gap-2 mt-auto">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ background: "#22c55e", boxShadow: "0 0 6px #22c55e" }}
                />
                <span className="text-xs font-medium" style={{ color: "#22c55e" }}>
                  Verified Certification
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
