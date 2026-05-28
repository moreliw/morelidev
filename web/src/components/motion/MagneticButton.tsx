"use client";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
  type HTMLMotionProps,
} from "motion/react";
import { ReactNode, useRef } from "react";

type CommonProps = {
  children: ReactNode;
  className?: string;
  strength?: number;
};

function useMagnetic(strength: number) {
  const ref = useRef<HTMLElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 200, damping: 18, mass: 0.6 });
  const reduced = useReducedMotion();

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    x.set((dx / (rect.width / 2)) * strength);
    y.set((dy / (rect.height / 2)) * strength);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return { ref, sx, sy, onMove, onLeave };
}

export function MagneticButton({
  children,
  className,
  strength = 14,
  ...rest
}: CommonProps & HTMLMotionProps<"button">) {
  const { ref, sx, sy, onMove, onLeave } = useMagnetic(strength);
  return (
    <motion.button
      ref={ref as React.Ref<HTMLButtonElement>}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      className={className}
      {...rest}
    >
      {children}
    </motion.button>
  );
}

export function MagneticLink({
  children,
  className,
  strength = 14,
  ...rest
}: CommonProps & HTMLMotionProps<"a">) {
  const { ref, sx, sy, onMove, onLeave } = useMagnetic(strength);
  return (
    <motion.a
      ref={ref as React.Ref<HTMLAnchorElement>}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      className={className}
      {...rest}
    >
      {children}
    </motion.a>
  );
}
