"use client";
import { motion, useReducedMotion } from "motion/react";
import { ReactNode } from "react";

type Props = {
  eyebrow?: string;
  index?: string;
  children: ReactNode;
  align?: "left" | "center";
  accent?: string;
  className?: string;
};

export function AnimatedSectionTitle({
  eyebrow,
  index,
  children,
  align = "left",
  accent,
  className,
}: Props) {
  const reduced = useReducedMotion();
  const text = typeof children === "string" ? children : null;
  const words = text ? text.split(" ") : null;

  return (
    <div
      className={
        (align === "center" ? "text-center mx-auto " : "") + (className ?? "")
      }
    >
      {(eyebrow || index) && (
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className={
            "flex items-center gap-4 mb-6 " +
            (align === "center" ? "justify-center" : "")
          }
        >
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
          {index && (
            <span className="font-mono text-[10px] tracking-[0.25em] text-[color:var(--muted-2)]">
              {index}
            </span>
          )}
        </motion.div>
      )}

      {words ? (
        <h2 className="display text-[clamp(2rem,5vw,3.8rem)] text-[color:var(--ink)]">
          {words.map((w, i) => (
            <motion.span
              key={i}
              initial={reduced ? false : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.7,
                delay: i * 0.05,
                ease: [0.2, 0.8, 0.2, 1],
              }}
              className={
                "inline-block mr-[0.25em] " +
                (accent && w.toLowerCase().includes(accent.toLowerCase())
                  ? "italic text-[color:var(--accent)]"
                  : "")
              }
            >
              {w}
            </motion.span>
          ))}
        </h2>
      ) : (
        <h2 className="display text-[clamp(2rem,5vw,3.8rem)] text-[color:var(--ink)]">
          {children}
        </h2>
      )}
    </div>
  );
}
