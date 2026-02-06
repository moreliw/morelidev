"use client";
import { Section } from "./Section";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

const stack = {
  frontend: [
    "Angular (v19)",
    "React",
    "TypeScript",
    "RxJS",
    "HTML5 / CSS3",
    "Webpack",
    "Responsive Design",
  ],
  backend: [
    ".NET Core",
    ".NET Framework",
    "ASP.NET Core",
    "Node.js",
    "PHP",
    "Laravel (Blade)",
  ],
  database: ["SQL Server", "MySQL", "Oracle"],
  other: [
    "REST APIs",
    "Git / GitHub",
    "Arquitetura em camadas",
    "Clean Code",
    "Integração com APIs externas",
  ],
};

function Card({ title, items }: { title: string; items: string[] }) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="card rounded-xl p-6 hover:-translate-y-0.5 transition"
    >
      <div className="text-xs uppercase tracking-[0.2em] text-zinc-500">{title}</div>
      <h3 className="mt-2 text-lg font-semibold text-zinc-100">{title}</h3>
      <div className="mt-4 h-px bg-white/5" />
      <ul className="mt-4 flex flex-wrap gap-2 text-xs text-zinc-300">
        {items.map((x) => (
          <li key={x} className="rounded-full border border-white/10 px-3 py-1">
            {x}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export function Stack() {
  const { language } = useLanguage();
  const labels =
    language === "pt"
      ? {
          title: "Stack tecnológica",
          database: "Banco de dados",
          other: "Outras tecnologias",
        }
      : {
          title: "Tech stack",
          database: "Databases",
          other: "Other tools",
        };

  return (
    <Section id="stack" title={labels.title}>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="Frontend" items={stack.frontend} />
        <Card title="Backend" items={stack.backend} />
        <Card title={labels.database} items={stack.database} />
        <Card title={labels.other} items={stack.other} />
      </div>
    </Section>
  );
}
