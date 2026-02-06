"use client";
import { Section } from "./Section";
import { motion } from "framer-motion";

const projects = [
  {
    name: "Plataforma SaaS",
    problem: "Escalabilidade e performance insuficientes",
    solution:
      "Arquitetura com Next.js App Router, edge caching e otimização de bundle",
    tech: ["Next.js", "Edge", "Postgres", "Tailwind"],
    impact: "TTI -35% e conversão +22%",
  },
  {
    name: "Design System",
    problem: "Inconsistência visual e baixa velocidade de entrega",
    solution: "Sistema de componentes com tokens e documentação viva",
    tech: ["React", "Storybook", "TypeScript"],
    impact: "Reutilização +60% e redução de bugs visuais",
  },
];

export function Projects() {
  return (
    <Section id="projects" title="Projetos (Case Studies)">
      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map((p, i) => (
          <motion.article
            key={i}
            whileHover={{ scale: 1.01 }}
            className="rounded-xl border overflow-hidden bg-white/50 dark:bg-black/30"
          >
            <div className="p-6">
              <h3 className="text-lg font-semibold">{p.name}</h3>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Problema: {p.problem}
              </p>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Solução: {p.solution}
              </p>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Tecnologias: {p.tech.join(", ")}
              </p>
              <p className="mt-3 font-medium">Impacto: {p.impact}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}
