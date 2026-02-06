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
    <section id={id} className={`mx-auto max-w-6xl px-6 py-20 ${className ?? ""}`}>
      {title ? (
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-8">
          {title}
        </h2>
      ) : null}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </section>
  );
}
