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
    accent: "#1a1a1a",
  },
  {
    icon: Rocket,
    title: { pt: "Landing pages", en: "Landing pages" },
    desc: {
      pt: "Páginas enxutas para campanhas, lançamentos e captação.",
      en: "Lean pages for campaigns, launches and lead capture.",
    },
    accent: "#1a1a1a",
  },
  {
    icon: Code2,
    title: { pt: "Implementação moderna", en: "Modern implementation" },
    desc: {
      pt: "Frontend performático com SEO técnico e automações.",
      en: "High-performance frontend with technical SEO and automation.",
    },
    accent: "#1a1a1a",
  },
  {
    icon: Settings2,
    title: { pt: "Manutenção contínua", en: "Ongoing maintenance" },
    desc: {
      pt: "Ajustes rápidos, melhorias constantes e monitoramento.",
      en: "Fast fixes, continuous improvements and monitoring.",
    },
    accent: "#1a1a1a",
  },
  {
    icon: PenTool,
    title: { pt: "UI/UX para conversão", en: "Conversion-focused UI/UX" },
    desc: {
      pt: "Interfaces elegantes com foco em resultado e clareza.",
      en: "Elegant interfaces with clarity and conversion in mind.",
    },
    accent: "#1a1a1a",
  },
  {
    icon: Brush,
    title: { pt: "Identidade visual", en: "Brand identity" },
    desc: {
      pt: "Guia visual consistente para fortalecer a marca.",
      en: "Consistent visual guide to strengthen the brand.",
    },
    accent: "#1a1a1a",
  },
];

export function Services() {
  const { language } = useLanguage();
  const title = language === "pt" ? "Serviços" : "Services";

  return (
    <section id="services" className="bg-[#f5f5f5]">
      <div className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
        <div className="text-center mb-14">
          <h2 className="section-header">{title.toUpperCase()}</h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <motion.article
              key={s.title.en}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              whileHover={{ y: -4 }}
              className="group relative p-6 bg-white border border-[#e5e5e5] hover:border-black hover:shadow-[4px_4px_0_0_#000] transition-all duration-200 cursor-default"
            >
              {/* Icon circle */}
              <div className="mb-5 inline-flex items-center justify-center w-11 h-11 rounded-full bg-[#f5f5f5] group-hover:bg-black transition-colors duration-200">
                <s.icon className="size-5 text-black group-hover:text-white transition-colors duration-200" strokeWidth={1.5} />
              </div>

              <h3 className="text-sm font-bold uppercase tracking-wider text-black mb-2">
                {language === "pt" ? s.title.pt : s.title.en}
              </h3>
              <p className="text-sm text-[#6b6b6b] leading-relaxed">
                {language === "pt" ? s.desc.pt : s.desc.en}
              </p>

              {/* Number accent */}
              <span className="absolute top-4 right-5 text-[#e5e5e5] text-xs font-mono">
                {String(i + 1).padStart(2, "0")}
              </span>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
