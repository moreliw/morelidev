"use client";
import { motion } from "framer-motion";

export function GradientMesh() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <motion.div
        initial={{ x: -200, y: -120, opacity: 0.6 }}
        animate={{ x: 0, y: 0, opacity: 0.9 }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        style={{
          background: "radial-gradient(600px 300px at 30% 10%, rgba(255,122,0,0.35), transparent 70%)",
        }}
        className="absolute inset-0"
      />
      <motion.div
        initial={{ x: 120, y: -160, opacity: 0.5 }}
        animate={{ x: 20, y: -40, opacity: 0.8 }}
        transition={{ duration: 12, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        style={{
          background: "radial-gradient(500px 280px at 70% 0%, rgba(255,184,77,0.25), transparent 70%)",
        }}
        className="absolute inset-0"
      />
      <motion.div
        initial={{ x: -60, y: 120, opacity: 0.5 }}
        animate={{ x: 40, y: 160, opacity: 0.7 }}
        transition={{ duration: 14, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        style={{
          background: "radial-gradient(600px 320px at 50% 90%, rgba(59,130,246,0.18), transparent 70%)",
        }}
        className="absolute inset-0"
      />
    </div>
  );
}
