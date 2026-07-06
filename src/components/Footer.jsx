import { personalInfo } from "../data/portfolioData";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer
      className="py-10 text-center"
      style={{ borderTop: "1px solid rgba(139,92,246,0.12)" }}
    >
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <span
          className="text-xl font-black"
          style={{
            background: "linear-gradient(90deg,#a78bfa,#38bdf8)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          AV.
        </span>

        <p className="text-sm" style={{ color: "#475569" }}>
          Designed &amp; Built by{" "}
          <span style={{ color: "#a78bfa" }}>{personalInfo.name}</span>
          {" · "}© {new Date().getFullYear()}
        </p>

        <div className="flex items-center gap-5">
          {[
            { icon: <FaGithub />,   href: personalInfo.github },
            { icon: <FaLinkedin />, href: personalInfo.linkedin },
            { icon: <FaEnvelope />, href: `mailto:${personalInfo.email}` },
          ].map(({ icon, href }, i) => (
            <a
              key={i}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="text-lg transition-colors duration-200 hover:text-purple-400"
              style={{ color: "#475569" }}
            >
              {icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
