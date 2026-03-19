"use client";
import { motion } from "framer-motion";
import {
  Brush,
  Code2,
  MonitorSmartphone,
  PenTool,
  Rocket,
  Settings2,
} from "lucide-react";
import { Section } from "./Section";
import { useLanguage } from "@/context/LanguageContext";

const services = [
  {
    icon: MonitorSmartphone,
    title: { pt: "Sites institucionais", en: "Institutional websites" },
    desc: {
      pt: "Estrutura clara, conteúdo organizado e foco em credibilidade.",
      en: "Clear structure, organized content and strong credibility.",
    },
  },
  {
    icon: Rocket,
    title: { pt: "Landing pages", en: "Landing pages" },
    desc: {
      pt: "Páginas enxutas para campanhas, lançamentos e captação.",
      en: "Lean pages for campaigns, launches and lead capture.",
    },
  },
  {
    icon: Code2,
    title: { pt: "Implementação moderna", en: "Modern implementation" },
    desc: {
      pt: "Frontend performático com SEO técnico e automações.",
      en: "High-performance frontend with technical SEO and automation.",
    },
  },
  {
    icon: Settings2,
    title: { pt: "Manutenção contínua", en: "Ongoing maintenance" },
    desc: {
      pt: "Ajustes rápidos, melhorias constantes e monitoramento.",
      en: "Fast fixes, continuous improvements and monitoring.",
    },
  },
  {
    icon: PenTool,
    title: { pt: "UI/UX para conversão", en: "Conversion-focused UI/UX" },
    desc: {
      pt: "Interfaces elegantes com foco em resultado e clareza.",
      en: "Elegant interfaces with clarity and conversion in mind.",
    },
  },
  {
    icon: Brush,
    title: { pt: "Identidade visual", en: "Brand identity" },
    desc: {
      pt: "Guia visual consistente para fortalecer a marca.",
      en: "Consistent visual guide to strengthen the brand.",
    },
  },
];

export function Services() {
  const { language } = useLanguage();
  const title = language === "pt" ? "Serviços" : "Services";

  return (
    <Section id="services" title={title}>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <motion.article
            key={s.title.en}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              delay: i * 0.05,
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="group card rounded-2xl p-6 lg:p-7"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-accent/90 to-accent-dark text-zinc-950 shadow-[0_4px_14px_-2px_rgba(249,115,22,0.25)] transition-transform group-hover:scale-105">
              <s.icon className="size-6" strokeWidth={2} />
            </div>
            <h3 className="mt-5 font-display text-lg font-semibold text-zinc-100">
              {language === "pt" ? s.title.pt : s.title.en}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">
              {language === "pt" ? s.desc.pt : s.desc.en}
            </p>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}
