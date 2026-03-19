"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { Section } from "./Section";
import { useLanguage } from "@/context/LanguageContext";

const items = [
  {
    title: "Empresa Capixaba",
    image: "/projetos/empresa-capixaba.png",
    type: { pt: "Sistema de gestão", en: "Management system" },
    desc: {
      pt: "Plataforma de gestão com monitoramento operacional, relatórios e visão executiva.",
      en: "Management platform with operational monitoring, reports and executive visibility.",
    },
    tags: ["Laravel", "Blade", "MySQL"],
  },
  {
    title: "Takki.ao",
    image: "/projetos/takki.png",
    type: { pt: "Marketplace de serviços", en: "Services marketplace" },
    desc: {
      pt: "Plataforma de serviços de Angola focada em descoberta de ofertas locais e anúncios.",
      en: "Angolan services platform focused on local offer discovery and advertising.",
    },
    tags: ["React", "UX", "Marketplace"],
  },
  {
    title: "Site Institucional",
    image: null,
    type: { pt: "Credibilidade e marca", en: "Credibility & brand" },
    desc: {
      pt: "Experiência premium com identidade visual consistente.",
      en: "Premium experience with consistent visual identity.",
    },
    tags: ["Design", "UI/UX", "Brand"],
  },
  {
    title: "Dashboard Operacional",
    image: null,
    type: { pt: "Visão executiva", en: "Executive view" },
    desc: {
      pt: "KPIs em tempo real e hierarquia visual clara.",
      en: "Real-time KPIs with clear visual hierarchy.",
    },
    tags: ["Data", "UX", "Automação"],
  },
  {
    title: "E-commerce B2B",
    image: null,
    type: { pt: "Catálogo inteligente", en: "Smart catalog" },
    desc: {
      pt: "Fluxos de compra simplificados com foco em recorrência.",
      en: "Simplified buying flows focused on repeat purchases.",
    },
    tags: ["Checkout", "B2B", "Integrações"],
  },
  {
    title: "Sistema de Conteúdo",
    image: null,
    type: { pt: "CMS sob medida", en: "Custom CMS" },
    desc: {
      pt: "Publicação ágil com governança e permissões.",
      en: "Agile publishing with governance and permissions.",
    },
    tags: ["CMS", "Workflow", "DX"],
  },
  {
    title: "Sistema de Gestão – Empresa de Limpezas",
    image: null,
    type: { pt: "Gestão empresarial", en: "Business management" },
    desc: {
      pt: "Sistema completo com backend em PHP Laravel, frontend em Blade e banco em produção.",
      en: "Full system with PHP Laravel backend, Blade frontend and production database.",
    },
    tags: ["Laravel", "Blade", "PHP"],
  },
  {
    title: "Sistema de Entregas – Supermercado",
    image: null,
    type: { pt: "Pedidos e logística", en: "Orders & logistics" },
    desc: {
      pt: "Backoffice administrativo, gestão de separação e foco em UX operacional.",
      en: "Backoffice operations, picking management and operational UX focus.",
    },
    tags: ["Operações", "UX", "Logística"],
  },
];

export function Portfolio() {
  const { language } = useLanguage();
  const title =
    language === "pt" ? "Projetos em destaque" : "Featured projects";
  const subtitle =
    language === "pt"
      ? "Seleção de entregas recentes"
      : "A selection of recent deliveries";
  const badge = language === "pt" ? "Projetos" : "Projects";

  return (
    <Section id="portfolio" title={title}>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-zinc-400">{subtitle}</p>
        <span className="inline-flex w-fit items-center rounded-full border border-white/10 bg-white/[0.02] px-4 py-2 text-xs font-medium uppercase tracking-wider text-zinc-400">
          {badge}
        </span>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it, i) => (
          <motion.article
            key={it.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: i * 0.05, duration: 0.5 }}
            className="group card overflow-hidden rounded-2xl"
          >
            {it.image && (
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={it.image}
                  alt={it.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 via-transparent to-transparent" />
              </div>
            )}
            <div className="p-6">
              <div className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
                {language === "pt" ? it.type.pt : it.type.en}
              </div>
              <h3 className="mt-3 font-display text-lg font-semibold text-zinc-100">
                {it.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                {language === "pt" ? it.desc.pt : it.desc.en}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {it.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-1 text-xs font-medium text-zinc-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}
