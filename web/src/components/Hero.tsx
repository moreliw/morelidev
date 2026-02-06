"use client";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 left-1/2 h-96 w-[120rem] -translate-x-1/2 rounded-full bg-gradient-to-tr from-indigo-500/20 via-sky-400/10 to-cyan-300/10 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mx-auto max-w-6xl px-6 pt-36 pb-24 text-center sm:text-left"
      >
        <p className="uppercase tracking-widest text-xs text-zinc-500">
          Engenharia + Design + Performance
        </p>
        <h1 className="mt-4 text-4xl sm:text-6xl font-semibold tracking-tight">
          Construo produtos digitais escaláveis, performáticos e prontos para o futuro.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
          Full Stack Developer com foco em arquitetura, frontend moderno e entrega profissional.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <a
            href="#contact"
            className="inline-flex h-12 items-center justify-center rounded-full bg-black text-white px-6 dark:bg-white dark:text-black hover:opacity-90 transition"
          >
            Solicitar proposta
          </a>
          <a
            href="#projects"
            className="inline-flex h-12 items-center justify-center rounded-full border px-6 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
          >
            Ver projetos
          </a>
        </div>
      </motion.div>
    </div>
  );
}

