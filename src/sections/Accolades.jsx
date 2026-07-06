import { motion } from "framer-motion";
import { accolades } from "../data/portfolioData";

export default function Accolades() {
  return (
    <section id="accolades" className="py-32 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute right-0 bottom-1/4 w-96 h-96 rounded-full blur-3xl opacity-8 pointer-events-none"
        style={{ background: "rgba(236,72,153,0.12)" }} />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-tag">Education & Highlights</p>
          <h2 className="text-5xl md:text-6xl font-black" style={{ color: "#f1f5f9" }}>
            Accolades
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {accolades.map((item, i) => (
            <motion.div
              key={item.id}
              className="glass neon-hover rounded-3xl p-7 flex flex-col gap-5 relative overflow-hidden group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
            >
              {/* Corner glow that appears on hover */}
              <div
                className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                style={{ background: "#8b5cf6" }}
              />

              <span className="text-4xl">{item.icon}</span>

              <div className="flex flex-col gap-1.5">
                <h3 className="font-bold text-base" style={{ color: "#f1f5f9" }}>
                  {item.title}
                </h3>
                <div className="flex items-center justify-between flex-wrap gap-1">
                  <p className="section-tag" style={{ marginBottom: 0 }}>{item.issuer}</p>
                  {item.period && (
                    <span
                      className="text-xs font-semibold px-2 py-0.5 rounded-full"
                      style={{
                        background: "rgba(139,92,246,0.12)",
                        color: "#a78bfa",
                        border: "1px solid rgba(139,92,246,0.25)",
                      }}
                    >
                      {item.period}
                    </span>
                  )}
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "#64748b" }}>
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
