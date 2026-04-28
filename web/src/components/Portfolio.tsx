"use client";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, Github } from "lucide-react";

interface Project {
  id: string;
  title: string;
  titleEn?: string | null;
  description?: string | null;
  descriptionEn?: string | null;
  type?: string | null;
  typeEn?: string | null;
  tags: string;
  imageUrl?: string | null;
  demoUrl?: string | null;
  repoUrl?: string | null;
}

const STATIC_ITEMS: Project[] = [
  {
    id: "1",
    title: "Empresa Capixaba",
    type: "Sistema de gestão",
    typeEn: "Management system",
    description: "Plataforma de gestão completa para uma rede capixaba.",
    descriptionEn: "Full management platform for a regional network.",
    tags: '["Laravel","Blade","MySQL"]',
    imageUrl: "/projetos/empresa-capixaba.png",
  },
  {
    id: "2",
    title: "Takki.ao",
    type: "Marketplace",
    typeEn: "Marketplace",
    description: "Marketplace responsivo focado em experiência e curadoria.",
    descriptionEn: "Responsive marketplace built around curation and UX.",
    tags: '["React","UX","Node"]',
    imageUrl: "/projetos/takki.png",
  },
  {
    id: "3",
    title: "Site Institucional",
    type: "Branding · Web",
    typeEn: "Branding · Web",
    description: "Identidade visual e site institucional para empresa B2B.",
    descriptionEn: "Brand identity and institutional site for a B2B company.",
    tags: '["UI/UX","Brand","Next.js"]',
  },
  {
    id: "4",
    title: "Dashboard Analytics",
    type: "Dashboard",
    typeEn: "Dashboard",
    description: "Dashboard interno com métricas em tempo real.",
    descriptionEn: "Internal dashboard with real-time metrics.",
    tags: '["React","Data","API"]',
  },
  {
    id: "5",
    title: "E-commerce B2B",
    type: "E-commerce",
    typeEn: "E-commerce",
    description: "Plataforma B2B com catálogo, pedidos e integrações.",
    descriptionEn: "B2B platform with catalog, orders and integrations.",
    tags: '["Angular","B2B",".NET"]',
  },
  {
    id: "6",
    title: "Sistema de Gestão",
    type: "Plataforma",
    typeEn: "Platform",
    description: "Sistema interno multi-tenant para operação logística.",
    descriptionEn: "Multi-tenant internal system for logistics operations.",
    tags: '["Laravel","PHP","MySQL"]',
  },
];

function parseTags(raw: string): string[] {
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function Portfolio() {
  const { language } = useLanguage();
  const [items, setItems] = useState<Project[]>(STATIC_ITEMS);
  const [activeFilter, setActiveFilter] = useState<string>("all");

  useEffect(() => {
    fetch("/api/projects")
      .then((r) => r.json())
      .then((data: Project[]) => {
        if (Array.isArray(data) && data.length) setItems(data);
      })
      .catch(() => {});
  }, []);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    for (const item of items) parseTags(item.tags).forEach((t) => tags.add(t));
    return Array.from(tags).slice(0, 8);
  }, [items]);

  const filtered = useMemo(
    () =>
      activeFilter === "all"
        ? items
        : items.filter((it) => parseTags(it.tags).includes(activeFilter)),
    [items, activeFilter]
  );

  const labels =
    language === "pt"
      ? {
          eyebrow: "Projetos",
          headline: "Trabalhos selecionados — feitos para durar.",
          all: "Todos",
          live: "Ver",
          code: "Código",
          empty: "Em breve",
        }
      : {
          eyebrow: "Selected work",
          headline: "Selected work — built to last.",
          all: "All",
          live: "View",
          code: "Code",
          empty: "Coming soon",
        };

  return (
    <section id="projects" className="relative py-24 lg:py-36 bg-[color:var(--bg-elevated)]">
      <div
        className="relative mx-auto px-6 lg:px-10"
        style={{ maxWidth: "var(--max)" }}
      >
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 mb-14">
          <div className="lg:col-span-3">
            <span className="eyebrow">{labels.eyebrow}</span>
            <p className="mt-6 text-xs font-mono tracking-widest text-[color:var(--muted-2)]">
              04 / 06
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

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-10 pb-6 border-b border-[color:var(--hairline)]">
          <button
            onClick={() => setActiveFilter("all")}
            className={
              "text-[12px] tracking-[0.18em] uppercase transition-colors " +
              (activeFilter === "all"
                ? "text-[color:var(--ink)] font-semibold"
                : "text-[color:var(--muted)] hover:text-[color:var(--ink)]")
            }
          >
            {labels.all}
            <span className="ml-2 text-[10px] text-[color:var(--muted-2)] font-mono">
              ({items.length})
            </span>
          </button>
          {allTags.map((tag) => {
            const count = items.filter((it) => parseTags(it.tags).includes(tag)).length;
            return (
              <button
                key={tag}
                onClick={() => setActiveFilter(tag)}
                className={
                  "text-[12px] tracking-[0.18em] uppercase transition-colors " +
                  (activeFilter === tag
                    ? "text-[color:var(--ink)] font-semibold"
                    : "text-[color:var(--muted)] hover:text-[color:var(--ink)]")
                }
              >
                {tag}
                <span className="ml-2 text-[10px] text-[color:var(--muted-2)] font-mono">
                  ({count})
                </span>
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16 lg:gap-y-20">
          <AnimatePresence mode="popLayout">
            {filtered.map((it, i) => {
              const tags = parseTags(it.tags);
              const type =
                language === "pt" ? it.type ?? "" : it.typeEn ?? it.type ?? "";
              const title =
                language === "pt" ? it.title : it.titleEn ?? it.title;
              const desc =
                language === "pt"
                  ? it.description
                  : it.descriptionEn ?? it.description;
              const isOdd = i % 2 === 1;

              return (
                <motion.article
                  key={it.id}
                  layout
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: (i % 4) * 0.08, duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
                  className={"group " + (isOdd ? "md:mt-16" : "")}
                >
                  {/* Image */}
                  <a
                    href={it.demoUrl ?? "#"}
                    target={it.demoUrl ? "_blank" : undefined}
                    rel={it.demoUrl ? "noopener noreferrer" : undefined}
                    className="relative block overflow-hidden rounded-[2px] aspect-[4/3] bg-[#1c1b18]"
                  >
                    {it.imageUrl ? (
                      <Image
                        src={it.imageUrl}
                        alt={title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover transition-transform duration-[800ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-[1.05]"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#1c1b18] to-[#0e0e0c]">
                        <span className="font-serif text-7xl text-white/15 tracking-tight">
                          {title.slice(0, 2).toUpperCase()}
                        </span>
                      </div>
                    )}
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-[color:var(--ink)]/0 group-hover:bg-[color:var(--ink)]/10 transition-colors duration-500"
                    />
                    <div className="absolute top-5 right-5 inline-flex items-center justify-center size-10 rounded-full bg-[color:var(--bg)] text-[color:var(--ink)] opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                      <ArrowUpRight className="size-4" />
                    </div>
                  </a>

                  {/* Meta */}
                  <div className="mt-6 flex items-baseline justify-between gap-4">
                    <div>
                      <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[color:var(--muted)]">
                        {type}
                      </p>
                      <h3 className="mt-2 font-serif text-2xl lg:text-[1.6rem] text-[color:var(--ink)] leading-tight">
                        {title}
                      </h3>
                    </div>
                    <span className="font-mono text-[11px] tracking-widest text-[color:var(--muted-2)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {desc && (
                    <p className="mt-3 text-[14px] leading-relaxed text-[color:var(--muted)] max-w-md">
                      {desc}
                    </p>
                  )}

                  <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
                    {tags.map((t) => (
                      <span
                        key={t}
                        className="text-[11px] tracking-[0.16em] uppercase text-[color:var(--ink-soft)]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {(it.demoUrl || it.repoUrl) && (
                    <div className="mt-5 flex items-center gap-5 text-[12px] tracking-[0.16em] uppercase">
                      {it.demoUrl && (
                        <a
                          href={it.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-[color:var(--ink)] border-b border-[color:var(--ink)] hover:text-[color:var(--accent)] hover:border-[color:var(--accent)] transition-colors"
                        >
                          {labels.live}
                          <ArrowUpRight className="size-3.5" />
                        </a>
                      )}
                      {it.repoUrl && (
                        <a
                          href={it.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-[color:var(--muted)] hover:text-[color:var(--ink)] transition-colors"
                        >
                          <Github className="size-3.5" /> {labels.code}
                        </a>
                      )}
                    </div>
                  )}
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
