import { motion } from "framer-motion";
import { FaDownload, FaEye } from "react-icons/fa";
import { personalInfo } from "../data/portfolioData";

export default function Resume() {
  return (
    <section id="resume" className="py-20">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          className="relative overflow-hidden rounded-3xl p-12 text-center"
          style={{
            background: "linear-gradient(135deg, rgba(124,58,237,0.12) 0%, rgba(6,182,212,0.06) 100%)",
            border: "1px solid rgba(139,92,246,0.2)",
          }}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Radial glow */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(139,92,246,0.1) 0%, transparent 70%)" }} />

          <div className="relative z-10">
            <p className="section-tag">Resume</p>
            <h2 className="text-4xl md:text-5xl font-black mb-4" style={{ color: "#f1f5f9" }}>
              Interested in Working Together?
            </h2>
            <p className="text-base mb-10 max-w-lg mx-auto" style={{ color: "#64748b" }}>
              Download my resume for a full overview of my experience, skills, and achievements.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={personalInfo.resumeUrl}
                download="Akash V Resume"
                className="mag-btn"
                style={{ background: "linear-gradient(135deg,#7c3aed,#8b5cf6)", color: "#fff" }}
              >
                <FaDownload /> Download PDF
              </a>
              <a
                href={personalInfo.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="mag-btn"
                style={{ border: "1px solid rgba(139,92,246,0.4)", color: "#a78bfa", background: "transparent" }}
              >
                <FaEye /> View Online
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
