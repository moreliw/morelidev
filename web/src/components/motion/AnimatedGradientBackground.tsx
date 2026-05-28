"use client";
import { motion, useReducedMotion } from "motion/react";

/**
 * Layered animated gradient blobs + subtle tech grid.
 * Drop inside a `relative isolate` section, fixed positioned to fill.
 */
export function AnimatedGradientBackground({
  intensity = 1,
  grid = true,
}: {
  intensity?: number;
  grid?: boolean;
}) {
  const reduced = useReducedMotion();
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* deep base */}
      <div className="absolute inset-0 bg-[color:var(--bg)]" />

      {/* animated blobs */}
      <motion.div
        className="absolute -top-32 -left-32 h-[55vmax] w-[55vmax] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(124,147,255,0.28) 0%, transparent 60%)",
          opacity: 0.7 * intensity,
          filter: "blur(40px)",
        }}
        animate={reduced ? undefined : { x: [0, 40, -20, 0], y: [0, 30, -10, 0] }}
        transition={{ duration: 22, ease: "easeInOut", repeat: Infinity }}
      />
      <motion.div
        className="absolute -bottom-40 -right-20 h-[55vmax] w-[55vmax] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(94,234,212,0.18) 0%, transparent 60%)",
          opacity: 0.55 * intensity,
          filter: "blur(60px)",
        }}
        animate={reduced ? undefined : { x: [0, -30, 20, 0], y: [0, -20, 20, 0] }}
        transition={{ duration: 28, ease: "easeInOut", repeat: Infinity }}
      />
      <motion.div
        className="absolute top-1/3 left-1/2 h-[35vmax] w-[35vmax] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(240,182,127,0.10) 0%, transparent 60%)",
          opacity: 0.5 * intensity,
          filter: "blur(50px)",
          translate: "-50% -50%",
        }}
        animate={reduced ? undefined : { scale: [1, 1.12, 1] }}
        transition={{ duration: 18, ease: "easeInOut", repeat: Infinity }}
      />

      {/* grid */}
      {grid && (
        <div className="absolute inset-0 grid-bg grid-bg-fade opacity-70" />
      )}

      {/* noise */}
      <div className="noise" />

      {/* vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, transparent 40%, rgba(5,5,7,0.6) 100%)",
        }}
      />
    </div>
  );
}
