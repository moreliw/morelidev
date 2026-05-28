"use client";
import { motion, useReducedMotion } from "motion/react";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  as?: "div" | "section" | "article" | "li" | "span" | "p";
  y?: number;
  delay?: number;
  duration?: number;
  once?: boolean;
  className?: string;
};

export function RevealOnScroll({
  children,
  as = "div",
  y = 22,
  delay = 0,
  duration = 0.8,
  once = true,
  className,
}: Props) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;
  return (
    <MotionTag
      initial={reduced ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.25 }}
      transition={{
        duration,
        delay,
        ease: [0.2, 0.8, 0.2, 1],
      }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}
