import { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { motion, AnimatePresence } from "framer-motion";
import { personalInfo } from "../data/portfolioData";

const NAV = [
  { label: "About",          to: "about"          },
  { label: "Skills",         to: "skills"         },
  { label: "Experience",     to: "experience"     },
  { label: "Certifications", to: "certifications" },
  { label: "Accolades",      to: "accolades"      },
  { label: "Projects",       to: "projects"       },
  { label: "Contact",        to: "contact"        },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{
        background: scrolled ? "rgba(3,0,20,0.75)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(139,92,246,0.12)" : "none",
        transition: "background 0.4s, border-color 0.4s",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Wordmark */}
        <Link to="hero" smooth duration={800} className="cursor-none">
          <span
            className="text-xl font-black tracking-tight"
            style={{
              background: "linear-gradient(90deg,#a78bfa,#38bdf8)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            AV
          </span>
          <span style={{ color: "#f1f5f9" }}>.</span>
        </Link>

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-2">
          {NAV.map((n) => (
            <li key={n.to}>
              <Link
                to={n.to}
                smooth
                duration={800}
                offset={-80}
                spy
                activeClass="text-purple-400"
                className="cursor-none relative px-4 py-2 text-sm font-medium transition-colors duration-200 group"
                style={{ color: "#64748b" }}
              >
                {n.label}
                <span
                  className="absolute bottom-1 left-4 right-4 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                  style={{ background: "linear-gradient(90deg,#8b5cf6,#06b6d4)" }}
                />
              </Link>
            </li>
          ))}
          <li>
            <a
              href={personalInfo.resumeUrl}
              download="Akash V Resume.pdf"
              className="mag-btn ml-4"
              style={{ background: "linear-gradient(135deg,#7c3aed,#8b5cf6)", color: "#fff" }}
            >
              Resume ↗
            </a>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-xl w-10 h-10 flex items-center justify-center rounded-full"
          style={{ border: "1px solid rgba(139,92,246,0.3)", color: "#8b5cf6" }}
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="drawer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden"
            style={{ background: "rgba(3,0,20,0.95)", borderTop: "1px solid rgba(139,92,246,0.12)" }}
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              {NAV.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  smooth
                  duration={800}
                  offset={-80}
                  className="text-sm font-medium"
                  style={{ color: "#64748b" }}
                  onClick={() => setOpen(false)}
                >
                  {n.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
