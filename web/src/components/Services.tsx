"use client";
import { motion } from "framer-motion";
import {
  MonitorSmartphone,
  Rocket,
  Code2,
  Settings2,
  PenTool,
  Brush,
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
    <section id="services" className="bg-[#f5f5f5]">
      <div className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
        <div className="text-center mb-12">
          <h2 className="section-header">{title.toUpperCase()}</h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <motion.article
              key={s.title.en}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              className="p-6 border border-[#e5e5e5] bg-white hover:border-black/20 transition-colors"
            >
              <h3 className="text-sm font-bold uppercase tracking-wider text-black">
                {language === "pt" ? s.title.pt : s.title.en}
              </h3>
              <p className="mt-3 text-sm text-[#6b6b6b] leading-relaxed">
                {language === "pt" ? s.desc.pt : s.desc.en}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
