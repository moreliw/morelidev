"use client";
import { Section } from "./Section";
import { motion } from "framer-motion";

const stack = {
  frontend: ["Next.js", "React", "Tailwind", "Framer Motion"],
  backend: ["Node", "NestJS", "PostgreSQL", "Prisma"],
  devops: ["Docker", "GitHub Actions", "Traefik", "Portainer"],
  infra: ["AWS", "Vercel", "DigitalOcean"],
};

function Card({ title, items }: { title: string; items: string[] }) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="rounded-xl border p-6 bg-white/50 dark:bg-black/30"
    >
      <h3 className="font-medium mb-3">{title}</h3>
      <ul className="flex flex-wrap gap-2 text-sm text-zinc-600 dark:text-zinc-400">
        {items.map((x) => (
          <li key={x} className="rounded-full border px-3 py-1">
            {x}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export function Stack() {
  return (
    <Section id="stack" title="Stack Tecnológica">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="Frontend" items={stack.frontend} />
        <Card title="Backend" items={stack.backend} />
        <Card title="DevOps" items={stack.devops} />
        <Card title="Infra" items={stack.infra} />
      </div>
    </Section>
  );
}
