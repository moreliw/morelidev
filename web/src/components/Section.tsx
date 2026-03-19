"use client";
import { motion } from "framer-motion";
import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  id?: string;
  title?: string;
  className?: string;
}>;

export function Section({ id, title, className, children }: Props) {
  return (
    <section
      id={id}
      className={`mx-auto max-w-6xl px-6 py-24 lg:py-28 ${className ?? ""}`}
    >
      {title ? (
        <div className="mb-12 lg:mb-16">
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-zinc-100">
            {title}
          </h2>
          <div className="mt-3 h-0.5 w-12 rounded-full bg-gradient-to-r from-accent to-accent/60" />
        </div>
      ) : null}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </section>
  );
}
