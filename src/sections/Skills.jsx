import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  SiReact, SiNextdotjs, SiTypescript, SiJavascript, SiTailwindcss,
  SiVuedotjs, SiHtml5, SiFramer, SiSass,
  SiNodedotjs, SiPython, SiDjango, SiFastapi, SiGraphql,
  SiPostgresql, SiMongodb, SiRedis, SiMysql, SiFirebase,
  SiDocker, SiKubernetes, SiGit, SiGithub,
  SiLinux, SiVscodium, SiFigma,
} from "react-icons/si";
import { FaAws, FaJava, FaCss3Alt } from "react-icons/fa";

/* ─── All skills flat list (for marquee) ──────────────────── */
const ALL_SKILLS = [
  { name: "React",       icon: SiReact,        color: "#61DAFB", cat: "Frontend" },
  { name: "Next.js",     icon: SiNextdotjs,    color: "#ffffff", cat: "Frontend" },
  { name: "TypeScript",  icon: SiTypescript,   color: "#3178C6", cat: "Frontend" },
  { name: "JavaScript",  icon: SiJavascript,   color: "#F7DF1E", cat: "Frontend" },
  { name: "Tailwind",    icon: SiTailwindcss,  color: "#38BDF8", cat: "Frontend" },
  { name: "Vue.js",      icon: SiVuedotjs,     color: "#42B883", cat: "Frontend" },
  { name: "HTML5",       icon: SiHtml5,        color: "#E34F26", cat: "Frontend" },
  { name: "CSS3",        icon: FaCss3Alt,      color: "#1572B6", cat: "Frontend" },
  { name: "SASS",        icon: SiSass,         color: "#CC6699", cat: "Frontend" },
  { name: "Framer",      icon: SiFramer,       color: "#ffffff", cat: "Frontend" },
  { name: "Node.js",     icon: SiNodedotjs,    color: "#6CC24A", cat: "Backend"  },
  { name: "Python",      icon: SiPython,       color: "#3776AB", cat: "Backend"  },
  { name: "Java",        icon: FaJava,         color: "#f89820", cat: "Backend"  },
  { name: "Django",      icon: SiDjango,       color: "#44B78B", cat: "Backend"  },
  { name: "FastAPI",     icon: SiFastapi,      color: "#009688", cat: "Backend"  },
  { name: "GraphQL",     icon: SiGraphql,      color: "#E10098", cat: "Backend"  },
  { name: "PostgreSQL",  icon: SiPostgresql,   color: "#336791", cat: "Backend"  },
  { name: "MongoDB",     icon: SiMongodb,      color: "#47A248", cat: "Backend"  },
  { name: "Redis",       icon: SiRedis,        color: "#DC382D", cat: "Backend"  },
  { name: "MySQL",       icon: SiMysql,        color: "#4479A1", cat: "Backend"  },
  { name: "Firebase",    icon: SiFirebase,     color: "#FFCA28", cat: "Backend"  },
  { name: "Docker",      icon: SiDocker,       color: "#2496ED", cat: "Tools"    },
  { name: "Kubernetes",  icon: SiKubernetes,   color: "#326CE5", cat: "Tools"    },
  { name: "AWS",         icon: FaAws,          color: "#FF9900", cat: "Tools"    },
  { name: "Git",         icon: SiGit,          color: "#F05032", cat: "Tools"    },
  { name: "GitHub",      icon: SiGithub,       color: "#ffffff", cat: "Tools"    },
  { name: "Linux",       icon: SiLinux,        color: "#FCC624", cat: "Tools"    },
  { name: "VS Code",     icon: SiVscodium,     color: "#007ACC", cat: "Tools"    },
  { name: "Figma",       icon: SiFigma,        color: "#F24E1E", cat: "Tools"    },
];

/* ─── Proficiency data (for category cards) ──────────────── */
const PROFICIENCY = {
  Frontend: [
    { name: "HTML5",      icon: SiHtml5,       color: "#E34F26", pct: 95 },
    { name: "CSS3",       icon: FaCss3Alt,     color: "#1572B6", pct: 90 },
    { name: "SASS",       icon: SiSass,        color: "#CC6699", pct: 85 },
    { name: "JavaScript", icon: SiJavascript,  color: "#F7DF1E", pct: 90 },
    { name: "TypeScript", icon: SiTypescript,  color: "#3178C6", pct: 75 },
    { name: "React",      icon: SiReact,       color: "#61DAFB", pct: 90 },
    { name: "Next.js",    icon: SiNextdotjs,   color: "#ffffff", pct: 75 },
    { name: "Tailwind",   icon: SiTailwindcss, color: "#38BDF8", pct: 88 },
    { name: "Vue.js",     icon: SiVuedotjs,    color: "#42B883", pct: 70 },
  ],
  Backend: [
    { name: "Node.js",    icon: SiNodedotjs,   color: "#6CC24A", pct: 88 },
    { name: "Python",     icon: SiPython,      color: "#3776AB", pct: 85 },
    { name: "Java",       icon: FaJava,        color: "#f89820", pct: 75 },
    { name: "FastAPI",    icon: SiFastapi,     color: "#009688", pct: 80 },
    { name: "GraphQL",    icon: SiGraphql,     color: "#E10098", pct: 72 },
    { name: "PostgreSQL", icon: SiPostgresql,  color: "#336791", pct: 82 },
    { name: "MongoDB",    icon: SiMongodb,     color: "#47A248", pct: 85 },
    { name: "Redis",      icon: SiRedis,       color: "#DC382D", pct: 70 },
    { name: "Firebase",   icon: SiFirebase,    color: "#FFCA28", pct: 78 },
  ],
  Tools: [
    { name: "Git",        icon: SiGit,         color: "#F05032", pct: 92 },
    { name: "Docker",     icon: SiDocker,      color: "#2496ED", pct: 80 },
    { name: "AWS",        icon: FaAws,         color: "#FF9900", pct: 72 },
    { name: "Kubernetes", icon: SiKubernetes,  color: "#326CE5", pct: 65 },
    { name: "GitHub",     icon: SiGithub,      color: "#ffffff", pct: 90 },
    { name: "Figma",      icon: SiFigma,       color: "#F24E1E", pct: 78 },
    { name: "Linux",      icon: SiLinux,       color: "#FCC624", pct: 80 },
    { name: "VS Code",    icon: SiVscodium,    color: "#007ACC", pct: 95 },
  ],
};

const TABS = ["All Skills", "Frontend", "Backend", "Tools"];

/* ─── Progress bar colour by percentage ─────────────────── */
function barColor(pct) {
  if (pct >= 85) return "#22c55e";   // green  — Expert
  if (pct >= 65) return "#f59e0b";   // amber  — Advanced
  return "#ef4444";                  // red    — Basic
}

/* ─── Marquee row ────────────────────────────────────────── */
function MarqueeRow({ skills, direction = "left", speed = 38 }) {
  const items   = [...skills, ...skills, ...skills];
  const perItem = 100; // px per badge slot
  const single  = skills.length * perItem;

  const anim =
    direction === "left"
      ? { x: ["0px", `-${single}px`] }
      : { x: [`-${single}px`, "0px"] };

  return (
    <div
      className="w-full overflow-hidden py-3"
      style={{
        maskImage:
          "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
      }}
    >
      <motion.div
        className="flex items-end"
        animate={anim}
        transition={{ repeat: Infinity, repeatType: "loop", duration: speed, ease: "linear" }}
        style={{ width: `${single * 3}px` }}
      >
        {items.map((s, i) => {
          const Icon = s.icon;
          return (
            <div
              key={`${s.name}-${i}`}
              className="flex flex-col items-center gap-3 group mx-3"
              style={{ minWidth: `${perItem - 24}px` }}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{
                  background: "rgba(10,10,26,0.8)",
                  border: "1px solid rgba(139,92,246,0.25)",
                  transition: "box-shadow 0.3s, border-color 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `0 0 18px 4px ${s.color}55`;
                  e.currentTarget.style.borderColor = `${s.color}88`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.borderColor = "rgba(139,92,246,0.25)";
                }}
              >
                <Icon style={{ fontSize: "26px", color: s.color }} />
              </div>
              <span className="text-xs font-medium whitespace-nowrap" style={{ color: "#64748b" }}>
                {s.name}
              </span>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}

/* ─── Skill proficiency card ─────────────────────────────── */
function SkillCard({ skill, index }) {
  const Icon  = skill.icon;
  const color = barColor(skill.pct);

  return (
    <motion.div
      className="glass neon-hover rounded-2xl p-5 flex flex-col gap-3"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      style={{ borderColor: "rgba(139,92,246,0.12)" }}
    >
      {/* Header row */}
      <div className="flex items-center gap-3">
        {/* Icon badge */}
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{
            background: `${skill.color}18`,
            border: `1px solid ${skill.color}44`,
          }}
        >
          <Icon style={{ fontSize: "22px", color: skill.color }} />
        </div>

        {/* Name + percentage */}
        <div className="flex items-center justify-between flex-1 min-w-0">
          <span className="font-bold text-base" style={{ color: "#f1f5f9" }}>
            {skill.name}
          </span>
          <span
            className="text-sm font-bold ml-2 flex-shrink-0"
            style={{ color }}
          >
            {skill.pct}%
          </span>
        </div>
      </div>

      {/* Animated progress bar */}
      <div
        className="w-full h-2 rounded-full overflow-hidden"
        style={{ background: "rgba(255,255,255,0.06)" }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{ background: color }}
          initial={{ width: 0 }}
          animate={{ width: `${skill.pct}%` }}
          transition={{ duration: 1, delay: index * 0.06 + 0.2, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      {/* Milestone labels */}
      <div className="flex justify-between">
        {["Basic", "Advanced", "Expert"].map((label) => (
          <span key={label} className="text-xs" style={{ color: "#475569" }}>
            {label}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

/* ─── Skills Section ─────────────────────────────────────── */
export default function Skills() {
  const [activeTab, setActiveTab] = useState("All Skills");

  const row1 = ALL_SKILLS.slice(0, Math.ceil(ALL_SKILLS.length / 2));
  const row2 = ALL_SKILLS.slice(Math.ceil(ALL_SKILLS.length / 2));

  return (
    <section id="skills" className="py-32 relative overflow-hidden">
      {/* Glow */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(124,58,237,0.07) 0%, transparent 70%)" }}
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-tag">What I work with</p>
          <h2
            className="text-5xl md:text-6xl font-black"
            style={{
              background: "linear-gradient(135deg, #a78bfa 0%, #38bdf8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            My Skills
          </h2>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          {TABS.map((tab) => {
            const active = tab === activeTab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300"
                style={
                  active
                    ? {
                        background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
                        color: "#fff",
                        boxShadow: "0 0 20px rgba(139,92,246,0.4)",
                      }
                    : {
                        background: "rgba(139,92,246,0.08)",
                        color: "#64748b",
                        border: "1px solid rgba(139,92,246,0.2)",
                      }
                }
              >
                {tab}
              </button>
            );
          })}
        </motion.div>
      </div>

      {/* ══ ALL SKILLS — dual marquee (full bleed) ══ */}
      <AnimatePresence mode="wait">
        {activeTab === "All Skills" && (
          <motion.div
            key="marquee"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="space-y-2"
          >
            <MarqueeRow skills={row1} direction="left"  speed={35} />
            <MarqueeRow skills={row2} direction="right" speed={40} />
          </motion.div>
        )}

        {/* ══ CATEGORY — proficiency card grid ══ */}
        {activeTab !== "All Skills" && (
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="max-w-7xl mx-auto px-6"
          >
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {(PROFICIENCY[activeTab] || []).map((skill, i) => (
                <SkillCard key={skill.name} skill={skill} index={i} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
