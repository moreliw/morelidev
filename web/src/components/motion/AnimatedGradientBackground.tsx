"use client";
import { motion, useReducedMotion } from "motion/react";

export function AnimatedGradientBackground({
  intensity = 1,
  grid = true,
}: {
  intensity?: number;
  grid?: boolean;
}) {
  const reduced = useReducedMotion();
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      {/* deep base */}
      <div className="absolute inset-0 bg-[color:var(--bg)]" />

      {/* aurora layer — conic gradient rotating slowly */}
      {!reduced && (
        <motion.div
          className="absolute inset-0"
          style={{
            background:
              "conic-gradient(from 230deg at 50% 50%, rgba(124,147,255,0.07) 0deg, rgba(94,234,212,0.06) 90deg, rgba(167,139,250,0.05) 160deg, transparent 220deg, rgba(124,147,255,0.07) 360deg)",
            filter: "blur(60px)",
            opacity: 0.85 * intensity,
          }}
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 40, ease: "linear", repeat: Infinity }}
        />
      )}

      {/* primary blob — blue/violet top-left */}
      <motion.div
        className="absolute -top-32 -left-32 h-[55vmax] w-[55vmax] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(124,147,255,0.30) 0%, transparent 60%)",
          opacity: 0.7 * intensity,
          filter: "blur(40px)",
        }}
        animate={
          reduced ? undefined : { x: [0, 40, -20, 0], y: [0, 30, -10, 0] }
        }
        transition={{ duration: 22, ease: "easeInOut", repeat: Infinity }}
      />

      {/* secondary blob — cyan bottom-right */}
      <motion.div
        className="absolute -bottom-40 -right-20 h-[55vmax] w-[55vmax] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(94,234,212,0.20) 0%, transparent 60%)",
          opacity: 0.55 * intensity,
          filter: "blur(60px)",
        }}
        animate={
          reduced ? undefined : { x: [0, -30, 20, 0], y: [0, -20, 20, 0] }
        }
        transition={{ duration: 28, ease: "easeInOut", repeat: Infinity }}
      />

      {/* tertiary blob — purple center pulse */}
      <motion.div
        className="absolute top-1/3 left-1/2 h-[35vmax] w-[35vmax] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(167,139,250,0.12) 0%, transparent 60%)",
          opacity: 0.5 * intensity,
          filter: "blur(50px)",
          translate: "-50% -50%",
        }}
        animate={reduced ? undefined : { scale: [1, 1.14, 1] }}
        transition={{ duration: 18, ease: "easeInOut", repeat: Infinity }}
      />

      {/* warm accent blob — subtle amber */}
      <motion.div
        className="absolute top-2/3 left-1/4 h-[25vmax] w-[25vmax] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(240,182,127,0.09) 0%, transparent 60%)",
          opacity: 0.4 * intensity,
          filter: "blur(45px)",
        }}
        animate={
          reduced ? undefined : { x: [0, 20, -10, 0], y: [0, -15, 10, 0] }
        }
        transition={{ duration: 32, ease: "easeInOut", repeat: Infinity }}
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
            "radial-gradient(ellipse 80% 60% at 50% 50%, transparent 40%, rgba(5,5,7,0.65) 100%)",
        }}
      />
    </div>
  );
}
