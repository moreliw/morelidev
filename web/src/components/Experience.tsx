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
      "Integração com bancos de dados e APIs",
    ],
    en: [
      "Enterprise systems development",
      "Frontend with Angular",
      "Backend with .NET",
      "Database and API integrations",
    ],
  },
  {
    company: "Anhanguera Educacional",
    role: "Software Engineer",
    type: { pt: "Educação", en: "Education" },
    pt: [
      "Desenvolvimento de sistemas educacionais",
      "Interfaces web e integração frontend/backend",
      "Suporte e evolução de sistemas internos",
    ],
    en: [
      "Educational systems development",
      "Web interfaces and frontend/backend integration",
      "Support and evolution of internal systems",
    ],
  },
];

export function Experience() {
  const { language } = useLanguage();
  const title =
    language === "pt" ? "Experiência profissional" : "Experience";

  return (
    <Section id="experience" title={title.toUpperCase()}>
      <div className="space-y-6 max-w-3xl mx-auto">
        {experiences.map((exp) => (
          <div
            key={exp.company}
            className="p-6 border border-[#e5e5e5] bg-white"
          >
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span className="font-bold text-black">{exp.company}</span>
              <span className="text-[#6b6b6b]">•</span>
              <span className="text-[#6b6b6b]">{exp.role}</span>
              <span className="text-[#6b6b6b]">•</span>
              <span className="text-[#6b6b6b]">
                {language === "pt" ? exp.type.pt : exp.type.en}
              </span>
            </div>
            <ul className="mt-4 space-y-2 text-sm text-[#6b6b6b] leading-relaxed">
              {(language === "pt" ? exp.pt : exp.en).map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
