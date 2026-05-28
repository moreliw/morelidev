"use client";
import { motion, useMotionValue, useSpring } from "motion/react";
import { ReactNode, useRef } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  /** background size of the spotlight cone in px */
  size?: number;
};

/**
 * Card with a cursor-following spotlight + reactive border glow.
 * Use as wrapper around any block of content.
 */
export function SpotlightCard({ children, className, size = 460 }: Props) {
  const mx = useMotionValue(-9999);
  const my = useMotionValue(-9999);
  const sx = useSpring(mx, { stiffness: 220, damping: 24, mass: 0.5 });
  const sy = useSpring(my, { stiffness: 220, damping: 24, mass: 0.5 });
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mx.set(e.clientX - rect.left);
    my.set(e.clientY - rect.top);
  };
  const onLeave = () => {
    mx.set(-9999);
    my.set(-9999);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={
        "group relative overflow-hidden rounded-2xl border border-[color:var(--hairline)] bg-[color:var(--bg-card)] transition-colors duration-500 hover:border-[color:var(--hairline-strong)] " +
        (className ?? "")
      }
    >
      {/* spotlight */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: useSpotlightBg(sx, sy, size),
        }}
      />
      {/* conic border glow */}
      <span className="glow-ring group-hover:opacity-100" aria-hidden />
      <div className="relative">{children}</div>
    </div>
  );
}

// helper so we don't recreate motion-value usage inline
import { useMotionTemplate, type MotionValue } from "motion/react";
function useSpotlightBg(
  sx: MotionValue<number>,
  sy: MotionValue<number>,
  size: number
) {
  return useMotionTemplate`radial-gradient(${size}px circle at ${sx}px ${sy}px, rgba(124,147,255,0.14), transparent 60%)`;
}
