"use client";
import { motion } from "framer-motion";

export function GradientMesh() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* Primary accent glow — top left */}
      <motion.div
        initial={{ opacity: 0.4, scale: 0.95 }}
        animate={{ opacity: 0.9, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute -top-1/2 -left-1/4 h-[100vh] w-[80vw]"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(249, 115, 22, 0.25) 0%, rgba(249, 115, 22, 0.08) 40%, transparent 70%)",
        }}
      />
      {/* Secondary — top right */}
      <motion.div
        initial={{ opacity: 0.3, x: 40 }}
        animate={{ opacity: 0.7, x: 0 }}
        transition={{ duration: 3, ease: "easeOut" }}
        className="absolute -top-1/3 right-0 h-[60vh] w-[50vw]"
        style={{
          background:
            "radial-gradient(ellipse 60% 80% at 30% 50%, rgba(251, 146, 60, 0.15) 0%, transparent 60%)",
        }}
      />
      {/* Tertiary — bottom center */}
      <motion.div
        initial={{ opacity: 0.2, y: 30 }}
        animate={{ opacity: 0.5, y: 0 }}
        transition={{ duration: 4, ease: "easeOut" }}
        className="absolute -bottom-1/4 left-1/2 h-[50vh] w-[70vw] -translate-x-1/2"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 100%, rgba(59, 130, 246, 0.08) 0%, transparent 60%)",
        }}
      />
      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
        }}
      />
    </div>
  );
}
