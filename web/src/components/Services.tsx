"use client";
import { motion } from "framer-motion";
import {
  Globe,
  Rocket,
  Code2,
  Layers3,
  Sparkles,
  Wrench,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const services = [
  {
    icon: Globe,
    title: { pt: "Sites institucionais", en: "Institutional websites" },
    desc: {
      pt: "Presenças digitais sólidas, com narrativa clara e identidade consistente.",
      en: "Solid digital presence, clear narrative and consistent identity.",
    },
    bullets: ["Brand-led design", "SEO técnico", "CMS sob medida"],
    bulletsEn: ["Brand-led design", "Technical SEO", "Custom CMS"],
  },
  {
    icon: Rocket,
    title: { pt: "Landing pages", en: "Landing pages" },
    desc: {
      pt: "Páginas enxutas e de alta performance para campanhas e captação.",
      en: "Lean, high-performance pages for campaigns and lead capture.",
    },
    bullets: ["Conversão", "A/B ready", "Carregamento sub-1s"],
    bulletsEn: ["Conversion", "A/B ready", "Sub-1s loading"],
  },
  {
    icon: Code2,
    title: { pt: "Aplicações sob medida", en: "Custom applications" },
    desc: {
      pt: "Sistemas web e dashboards construídos com .NET, Angular e React.",
      en: "Web systems and dashboards crafted with .NET, Angular and React.",
    },
    bullets: ["Arquitetura modular", "Escalabilidade", "Segurança"],
    bulletsEn: ["Modular architecture", "Scalability", "Security"],
  },
  {
    icon: Layers3,
    title: { pt: "Integrações & APIs", en: "APIs & integrations" },
    desc: {
      pt: "Conectando sistemas, ERPs e ferramentas de forma estável e auditável.",
      en: "Connecting systems, ERPs and tools in a stable, auditable way.",
    },
    bullets: ["REST / GraphQL", "Webhooks", "Observabilidade"],
    bulletsEn: ["REST / GraphQL", "Webhooks", "Observability"],
  },
  {
    icon: Sparkles,
    title: { pt: "UI/UX para conversão", en: "Conversion UI/UX" },
    desc: {
      pt: "Interfaces elegantes, focadas em clareza e resultados mensuráveis.",
      en: "Elegant interfaces, focused on clarity and measurable outcomes.",
    },
    bullets: ["Design system", "Acessibilidade", "Micro-interações"],
    bulletsEn: ["Design system", "Accessibility", "Micro-interactions"],
  },
  {
    icon: Wrench,
    title: { pt: "Manutenção & evolução", en: "Maintenance & evolution" },
    desc: {
      pt: "Acompanhamento contínuo, melhorias e suporte técnico de longo prazo.",
      en: "Continuous oversight, improvements and long-term technical support.",
    },
    bullets: ["SLA dedicado", "Refactor incremental", "Roadmap conjunto"],
    bulletsEn: ["Dedicated SLA", "Incremental refactor", "Joint roadmap"],
  },
];

const stack = [
  { name: "TypeScript", group: "Linguagens" },
  { name: "C# / .NET", group: "Linguagens" },
  { name: "PHP", group: "Linguagens" },
  { name: "SQL", group: "Linguagens" },
  { name: "React", group: "Front-end" },
  { name: "Angular", group: "Front-end" },
  { name: "Next.js", group: "Front-end" },
  { name: "Tailwind", group: "Front-end" },
  { name: ".NET Core", group: "Back-end" },
  { name: "Node.js", group: "Back-end" },
  { name: "Laravel", group: "Back-end" },
  { name: "PostgreSQL", group: "Back-end" },
  { name: "Docker", group: "Infra" },
  { name: "AWS", group: "Infra" },
  { name: "Git", group: "Infra" },
  { name: "Linux", group: "Infra" },
];

export function Services() {
  const { language } = useLanguage();
  const labels =
    language === "pt"
      ? {
          eyebrow: "Serviços",
          headline: "O que entrego — com método e profundidade.",
          techEyebrow: "Stack",
          techHeadline: "Tecnologias que uso no dia a dia.",
        }
      : {
          eyebrow: "Services",
          headline: "What I deliver — with depth and method.",
          techEyebrow: "Stack",
          techHeadline: "Technologies I use day to day.",
        };

  return (
    <section id="services" className="relative py-24 lg:py-36 bg-[color:var(--bg)]">
      <div
        className="relative mx-auto px-6 lg:px-10"
        style={{ maxWidth: "var(--max)" }}
      >
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 mb-16 lg:mb-20">
          <div className="lg:col-span-3">
            <span className="eyebrow">{labels.eyebrow}</span>
            <p className="mt-6 text-xs font-mono tracking-widest text-[color:var(--muted-2)]">
              02 / 06
            </p>
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-9 display text-[clamp(1.7rem,3.5vw,2.8rem)] max-w-3xl"
          >
            {labels.headline}
          </motion.h2>
        </div>

        {/* Services */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[color:var(--hairline)] border border-[color:var(--hairline)] rounded-[2px] overflow-hidden">
          {services.map((s, i) => (
            <motion.article
              key={s.title.en}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ delay: i * 0.06, duration: 0.6 }}
              className="group relative bg-[color:var(--bg-elevated)] p-8 lg:p-10 transition-colors duration-300 hover:bg-[color:var(--bg)]"
            >
              <div className="flex items-start justify-between mb-7">
                <div className="inline-flex items-center justify-center w-11 h-11 rounded-full border border-[color:var(--hairline)] text-[color:var(--ink)] group-hover:border-[color:var(--ink)] group-hover:text-[color:var(--accent)] transition-colors duration-300">
                  <s.icon className="size-[18px]" strokeWidth={1.5} />
                </div>
                <span className="font-mono text-[11px] tracking-widest text-[color:var(--muted-2)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              <h3 className="font-serif text-[1.35rem] leading-tight text-[color:var(--ink)] mb-3">
                {language === "pt" ? s.title.pt : s.title.en}
              </h3>
              <p className="text-sm leading-relaxed text-[color:var(--muted)] mb-6">
                {language === "pt" ? s.desc.pt : s.desc.en}
              </p>

              <ul className="space-y-1.5 text-[12px] tracking-wide text-[color:var(--ink-soft)]">
                {(language === "pt" ? s.bullets : s.bulletsEn).map((b) => (
                  <li key={b} className="flex items-center gap-2">
                    <span className="inline-block w-3 h-px bg-[color:var(--accent)]" />
                    {b}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>

        {/* Stack */}
        <div className="mt-24 lg:mt-32 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-3">
            <span className="eyebrow">{labels.techEyebrow}</span>
            <p className="mt-6 text-xs font-mono tracking-widest text-[color:var(--muted-2)]">
              03 / 06
            </p>
          </div>
          <div className="lg:col-span-9">
            <motion.h3
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7 }}
              className="display text-[clamp(1.5rem,3vw,2.2rem)] max-w-2xl mb-10"
            >
              {labels.techHeadline}
            </motion.h3>

            <div className="flex flex-wrap gap-2.5">
              {stack.map((t, i) => (
                <motion.span
                  key={t.name}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.4, delay: i * 0.025 }}
                  className="group inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[color:var(--hairline)] bg-[color:var(--bg-elevated)] text-[13px] text-[color:var(--ink-soft)] hover:border-[color:var(--ink)] hover:text-[color:var(--ink)] hover:-translate-y-0.5 transition-all duration-300"
                >
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[color:var(--accent-soft)] group-hover:bg-[color:var(--accent)] transition-colors" />
                  {t.name}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
