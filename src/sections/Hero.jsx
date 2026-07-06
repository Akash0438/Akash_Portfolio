import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-scroll";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { personalInfo } from "../data/portfolioData";
import HeroScene from "../components/HeroScene";

/* ── Typewriter component ── */
function Typewriter({ words, speed = 90, pause = 1800 }) {
  const [display, setDisplay] = useState("");
  const [wIdx, setWIdx]       = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wIdx];
    let timeout;
    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx((c) => c + 1), speed);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx((c) => c - 1), speed / 2);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setWIdx((i) => (i + 1) % words.length);
    }
    setDisplay(current.slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wIdx, words, speed, pause]);

  return (
    <span style={{ color: "#a78bfa" }}>
      {display}
      <span className="animate-pulse" style={{ borderRight: "2px solid #8b5cf6", marginLeft: "2px" }} />
    </span>
  );
}

/* ── Animated reveal variants ── */
const fadeUp = {
  hidden:  { opacity: 0, y: 50 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] } }),
};

const SOCIAL = [
  { icon: <FaGithub />,   href: personalInfo.github,               label: "GitHub"   },
  { icon: <FaLinkedin />, href: personalInfo.linkedin,             label: "LinkedIn" },
  { icon: <FaEnvelope />, href: `mailto:${personalInfo.email}`,    label: "Email"    },
];

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* 3-D scene fills the whole section */}
      <HeroScene />

      {/* Deep radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 60% at 60% 50%, rgba(124,58,237,0.18) 0%, transparent 70%)" }}
      />
      {/* Bottom fade to next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #030014)" }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-28 pb-20">
        <div className="max-w-2xl">

          {/* Eyebrow */}
          <motion.p
            className="section-tag"
            variants={fadeUp} custom={0}
            initial="hidden" animate="visible"
          >
            Software Engineer
          </motion.p>

          {/* Name */}
          <motion.h1
            className="text-6xl md:text-8xl font-black leading-none mb-6"
            variants={fadeUp} custom={1}
            initial="hidden" animate="visible"
          >
            <span style={{ color: "#f1f5f9" }}>Hi, I'm </span>
            <span className="grad-text">{personalInfo.name}</span>
          </motion.h1>

          {/* Typewriter */}
          <motion.h2
            className="text-xl md:text-2xl font-semibold mb-6"
            variants={fadeUp} custom={2}
            initial="hidden" animate="visible"
          >
            I build{" "}
            <Typewriter
              words={["full-stack web apps.", "automation frameworks.", "REST & SOAP APIs.", "CI/CD pipelines.", "clean, scalable code."]}
            />
          </motion.h2>

          {/* Tagline */}
          <motion.p
            className="text-base md:text-lg max-w-xl mb-10"
            style={{ color: "#64748b" }}
            variants={fadeUp} custom={3}
            initial="hidden" animate="visible"
          >
            {personalInfo.tagline}
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-wrap gap-4 mb-12"
            variants={fadeUp} custom={4}
            initial="hidden" animate="visible"
          >
            <Link
              to="projects"
              smooth duration={800} offset={-80}
              className="mag-btn cursor-none"
              style={{ background: "linear-gradient(135deg,#7c3aed,#8b5cf6)", color: "#fff" }}
            >
              See My Work →
            </Link>
            <a
              href={personalInfo.resumeUrl}
              download="Akash V Resume"
              className="mag-btn"
              style={{
                background: "transparent",
                border: "1px solid rgba(139,92,246,0.5)",
                color: "#a78bfa",
              }}
            >
              Download Resume
            </a>
          </motion.div>

          {/* Socials */}
          <motion.div
            className="flex items-center gap-6"
            variants={fadeUp} custom={5}
            initial="hidden" animate="visible"
          >
            {SOCIAL.map(({ icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="text-2xl transition-all duration-200 hover:scale-110"
                style={{ color: "#475569" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#8b5cf6")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#475569")}
              >
                {icon}
              </a>
            ))}

            {/* Divider + availability badge */}
            <span style={{ width: "1px", height: "24px", background: "rgba(139,92,246,0.3)" }} />
            <span
              className="flex items-center gap-2 text-xs font-medium"
              style={{ color: "#64748b" }}
            >
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ background: "#22c55e" }}
              />
              Open to opportunities
            </span>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
      >
        <span className="section-tag" style={{ marginBottom: 0 }}>scroll</span>
        <motion.div
          className="w-px h-12"
          style={{ background: "linear-gradient(to bottom, #8b5cf6, transparent)" }}
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
