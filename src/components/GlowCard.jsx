import { useState, useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";

export default function GlowCard({ children, className = "", glowColor = "rgba(4, 243, 251, 0.15)" }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const containerRef = useRef(null);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const background = useMotionTemplate`
    radial-gradient(
      600px circle at ${mouseX}px ${mouseY}px,
      ${glowColor},
      transparent 80%
    )
  `;

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`relative group overflow-hidden border border-light/10 bg-dark/50 backdrop-blur-sm ${className}`}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 transition duration-300 group-hover:opacity-100 opacity-0"
        style={{ background }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
}
