"use client";
import { Section } from "./Section";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

const experiences = [
  {
    company: "Stefanini Group",
    role: "Software Engineer",
    type: { pt: "Enterprise / Consultoria", en: "Enterprise / Consulting" },
    pt: [
      "Desenvolvimento de sistemas corporativos",
      "Frontend com Angular",
      "Backend com .NET",
      "Manutenção e evolução de aplicações em produção",
      "Integração com bancos de dados e APIs",
    ],
    en: [
      "Enterprise systems development",
      "Frontend with Angular",
      "Backend with .NET",
      "Maintenance and evolution of production applications",
      "Database and API integrations",
    ],
  },
  {
    company: "Anhanguera Educacional",
    role: "Software Engineer / Developer",
    type: { pt: "Educação", en: "Education" },
    pt: [
      "Desenvolvimento de sistemas educacionais",
      "Criação e manutenção de interfaces web",
      "Integração frontend e backend",
      "Suporte e evolução de sistemas internos",
    ],
    en: [
      "Educational systems development",
      "Creation and maintenance of web interfaces",
      "Frontend and backend integration",
      "Support and evolution of internal systems",
    ],
  },
];

export function Experience() {
  const { language } = useLanguage();
  const title =
    language === "pt" ? "Experiência profissional" : "Experience";

  return (
    <Section id="experience" title={title}>
      <div className="grid gap-6">
        {experiences.map((exp, i) => (
          <motion.article
            key={exp.company}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="card rounded-2xl p-6 lg:p-8"
          >
            <div className="flex flex-wrap items-center gap-2 text-sm text-zinc-400">
              <span className="font-display font-semibold text-zinc-100">
                {exp.company}
              </span>
              <span className="text-zinc-600">•</span>
              <span>{exp.role}</span>
              <span className="text-zinc-600">•</span>
              <span>{language === "pt" ? exp.type.pt : exp.type.en}</span>
            </div>
            <ul className="mt-5 grid gap-2.5 text-sm leading-relaxed text-zinc-400">
              {(language === "pt" ? exp.pt : exp.en).map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/80" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}
