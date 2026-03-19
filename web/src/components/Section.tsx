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
      className={`mx-auto max-w-6xl px-6 py-20 lg:py-28 ${className ?? ""}`}
    >
      {title ? (
        <div className="text-center mb-12">
          <h2 className="section-header">{title}</h2>
        </div>
      ) : null}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
    </section>
  );
}
