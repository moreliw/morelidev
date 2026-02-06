"use client";
import { Section } from "./Section";
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
  const title = language === "pt" ? "Experiência profissional" : "Experience";

  return (
    <Section id="experience" title={title}>
      <div className="grid gap-6">
        {experiences.map((exp) => (
          <article key={exp.company} className="card rounded-xl p-6">
            <div className="flex flex-wrap items-center gap-3 text-sm text-zinc-400">
              <span className="text-zinc-100 font-semibold">{exp.company}</span>
              <span>•</span>
              <span>{exp.role}</span>
              <span>•</span>
              <span>{language === "pt" ? exp.type.pt : exp.type.en}</span>
            </div>
            <ul className="mt-5 grid gap-2 text-sm text-zinc-400">
              {(language === "pt" ? exp.pt : exp.en).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  );
}
