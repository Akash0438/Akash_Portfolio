import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

/**
 * Two-layer custom cursor:
 *   1. A small sharp dot that snaps to the pointer exactly.
 *   2. A larger glowing ring that lags behind for the "aura" effect.
 */
export default function Cursor() {
  const dotRef   = useRef(null);
  const ringRef  = useRef(null);

  useEffect(() => {
    let rx = window.innerWidth  / 2;
    let ry = window.innerHeight / 2;
    let dx = rx, dy = ry;

    const onMove = (e) => {
      rx = e.clientX;
      ry = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${rx}px, ${ry}px)`;
      }
    };

    // Ring follows with lerp on every animation frame
    let rafId;
    const loop = () => {
      dx += (rx - dx) * 0.1;
      dy += (ry - dy) * 0.1;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${dx}px, ${dy}px)`;
      }
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    window.addEventListener("mousemove", onMove);

    // Scale up ring when hovering interactive elements
    const addHover = () => ringRef.current?.style.setProperty("width", "60px")  || ringRef.current?.style.setProperty("height", "60px");
    const rmHover  = () => { if (ringRef.current) { ringRef.current.style.width = "36px"; ringRef.current.style.height = "36px"; } };

    const interactives = document.querySelectorAll("a, button, [data-cursor]");
    interactives.forEach((el) => { el.addEventListener("mouseenter", addHover); el.addEventListener("mouseleave", rmHover); });

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
      interactives.forEach((el) => { el.removeEventListener("mouseenter", addHover); el.removeEventListener("mouseleave", rmHover); });
    };
  }, []);

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          background: "#8b5cf6",
          marginLeft: "-3px",
          marginTop: "-3px",
          willChange: "transform",
        }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          width: "36px",
          height: "36px",
          borderRadius: "50%",
          border: "1.5px solid rgba(139,92,246,0.7)",
          boxShadow: "0 0 10px rgba(139,92,246,0.4)",
          marginLeft: "-18px",
          marginTop: "-18px",
          transition: "width 0.2s, height 0.2s, margin 0.2s",
          willChange: "transform",
        }}
      />
    </>
  );
}
