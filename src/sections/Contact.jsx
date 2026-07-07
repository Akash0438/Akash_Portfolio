import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";
import emailjs from "@emailjs/browser";
import { personalInfo } from "../data/portfolioData";

const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const SOCIALS = [
  { icon: <FaEnvelope />, label: "Gmail",    href: `mailto:${personalInfo.email}` },
  { icon: <FaGithub />,   label: "GitHub",   href: personalInfo.github             },
  { icon: <FaLinkedin />, label: "LinkedIn", href: personalInfo.linkedin            },
];

const fadeUp = (i = 0) => ({
  initial:     { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport:    { once: true },
  transition:  { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
});

export default function Contact() {
  const formRef = useRef(null);
  const [form, setForm]     = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [focus, setFocus]   = useState("");

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY);
      setStatus("sent");
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
    }
  };

  const inputStyle = (field) => ({
    width: "100%",
    padding: "14px 18px",
    borderRadius: "12px",
    fontSize: "0.875rem",
    outline: "none",
    background: "rgba(10,10,26,0.8)",
    border: `1px solid ${focus === field ? "rgba(139,92,246,0.7)" : "rgba(139,92,246,0.15)"}`,
    color: "#f1f5f9",
    transition: "border-color 0.25s, box-shadow 0.25s",
    boxShadow: focus === field ? "0 0 0 3px rgba(139,92,246,0.12)" : "none",
  });

  return (
    <section id="contact" className="py-32 relative overflow-hidden">
      {/* Glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-64 rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ background: "#8b5cf6" }}
      />

      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <motion.div className="text-center mb-20" {...fadeUp(0)}>
          <p className="section-tag">Say hello</p>
          <h2 className="text-5xl md:text-6xl font-black mb-4" style={{ color: "#f1f5f9" }}>
            Get in Touch
          </h2>
          <p className="text-lg max-w-lg mx-auto" style={{ color: "#64748b" }}>
            Have a project in mind, a question, or just want to say hi? I'd love to hear from you.
          </p>
        </motion.div>

        {/* Social links */}
        <motion.div className="flex flex-wrap justify-center gap-8 mb-14" {...fadeUp(1)}>
          {SOCIALS.map(({ icon, label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="flex flex-col items-center gap-2 text-sm transition-all duration-200 group"
              style={{ color: "#64748b" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "#a78bfa"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "#64748b"; }}
            >
              <span className="text-2xl transition-transform duration-200 group-hover:scale-110">{icon}</span>
              {label}
            </a>
          ))}
        </motion.div>

        {/* Form */}
        <motion.form
          ref={formRef}
          onSubmit={onSubmit}
          className="glass rounded-3xl p-8 md:p-10 space-y-6"
          style={{ borderColor: "rgba(139,92,246,0.1)" }}
          {...fadeUp(2)}
        >
          {status === "sent" ? (
            <div className="py-12 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 12 }}
                className="text-6xl mb-4"
              >
                🚀
              </motion.div>
              <h3 className="text-2xl font-bold mb-2" style={{ color: "#f1f5f9" }}>
                Message Sent!
              </h3>
              <p style={{ color: "#64748b" }}>
                Thanks for reaching out — I'll get back to you soon. A copy has been sent to your inbox too.
              </p>
            </div>
          ) : (
            <>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="section-tag block mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={onChange}
                    required
                    placeholder="Your name"
                    style={inputStyle("name")}
                    onFocus={() => setFocus("name")}
                    onBlur={() => setFocus("")}
                  />
                </div>
                <div>
                  <label className="section-tag block mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={onChange}
                    required
                    placeholder="you@example.com"
                    style={inputStyle("email")}
                    onFocus={() => setFocus("email")}
                    onBlur={() => setFocus("")}
                  />
                </div>
              </div>
              <div>
                <label className="section-tag block mb-2">Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={onChange}
                  required
                  rows={6}
                  placeholder="Tell me about your project..."
                  style={{ ...inputStyle("message"), resize: "none" }}
                  onFocus={() => setFocus("message")}
                  onBlur={() => setFocus("")}
                />
              </div>

              {status === "error" && (
                <p className="text-sm text-center" style={{ color: "#f87171" }}>
                  Something went wrong. Please try again or email me directly.
                </p>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="mag-btn w-full justify-center text-base"
                style={{
                  background: "linear-gradient(135deg,#7c3aed,#8b5cf6)",
                  color: "#fff",
                  opacity: status === "sending" ? 0.7 : 1,
                  cursor: status === "sending" ? "not-allowed" : "pointer",
                }}
              >
                {status === "sending" ? "Sending…" : "Send Message →"}
              </button>
            </>
          )}
        </motion.form>
      </div>
    </section>
  );
}
