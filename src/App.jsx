import { useEffect, useState } from "react";
import Lenis         from "lenis";
import Navbar        from "./components/Navbar";
import Cursor        from "./components/Cursor";
import Footer        from "./components/Footer";
import WelcomeScreen from "./components/WelcomeScreen";
import Hero          from "./sections/Hero";
import About         from "./sections/About";
import Skills        from "./sections/Skills";
import Experience       from "./sections/Experience";
import Accolades        from "./sections/Accolades";
import Certifications   from "./sections/Certifications";
import Projects         from "./sections/Projects";
import Resume        from "./sections/Resume";
import Contact       from "./sections/Contact";

const WELCOME_DURATION = 4200; // ms — progress bar is 3.5 s + a little buffer

export default function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [mainVisible, setMainVisible] = useState(false);

  /* ── Auto-dismiss welcome after WELCOME_DURATION ── */
  useEffect(() => {
    const t = setTimeout(() => setShowWelcome(false), WELCOME_DURATION);
    return () => clearTimeout(t);
  }, []);

  /* ── Lenis smooth scroll (only after welcome exits) ── */
  useEffect(() => {
    if (!mainVisible) return;
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, [mainVisible]);

  return (
    <>
      {/* Welcome screen — sits above everything, exits with curtain wipe */}
      <WelcomeScreen
        visible={showWelcome}
        onDone={() => setMainVisible(true)}
      />

      {/* Main portfolio — fades in after welcome exits */}
      <div
        className="noise"
        style={{
          background: "#030014",
          minHeight: "100vh",
          opacity: mainVisible ? 1 : 0,
          transition: "opacity 0.6s ease",
        }}
      >
        <Cursor />
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Certifications />
          <Accolades />
          <Projects />
          <Resume />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
