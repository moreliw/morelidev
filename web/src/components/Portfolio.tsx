"use client";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight, Github, Play } from "lucide-react";

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
  videoUrl?: string | null;
  demoUrl?: string | null;
  repoUrl?: string | null;
}

const STATIC_ITEMS: Project[] = [
  {
    id: "cipritex",
    title: "Cipritex",
    type: "Plataforma corporativa",
    typeEn: "Corporate platform",
    description:
      "Sistema corporativo com gestão integrada, fluxos personalizados e relatórios em tempo real.",
    descriptionEn:
      "Corporate system with integrated management, custom workflows and real-time reports.",
    tags: '[".NET","Angular","SQL Server"]',
    videoUrl: "/videos/cipritex.mp4",
  },
  {
    id: "takki",
    title: "Takki.ao",
    type: "Marketplace",
    typeEn: "Marketplace",
    description:
      "Marketplace responsivo focado em curadoria, performance e experiência do usuário.",
    descriptionEn:
      "Responsive marketplace built around curation, performance and UX.",
    tags: '["React","Node","UX"]',
    videoUrl: "/videos/takki.mp4",
    imageUrl: "/projetos/takki.png",
  },
  {
    id: "saldo-casa",
    title: "Saldo Casa",
    type: "Finanças pessoais",
    typeEn: "Personal finance",
    description:
      "App de finanças pessoais com dashboards interativos, metas e categorização inteligente.",
    descriptionEn:
      "Personal finance app with interactive dashboards, goals and smart categorization.",
    tags: '["React Native","API","Charts"]',
    videoUrl: "/videos/saldo-casa.mp4",
  },
  {
    id: "site-mameri",
    title: "Mameri",
    type: "Site institucional",
    typeEn: "Institutional site",
    description:
      "Site institucional minimalista com identidade visual cuidadosa e CMS leve.",
    descriptionEn:
      "Minimalist institutional site with careful brand identity and a lightweight CMS.",
    tags: '["Next.js","Brand","CMS"]',
    videoUrl: "/videos/site-mameri.mp4",
  },
  {
    id: "padel",
    title: "Padel App",
    type: "Aplicativo esportivo",
    typeEn: "Sports app",
    description:
      "Aplicativo para reservas de quadras, gestão de partidas e estatísticas dos jogadores.",
    descriptionEn:
      "Court booking, match management and player statistics in one app.",
    tags: '["React Native","Booking","Realtime"]',
    videoUrl: "/videos/padel.mp4",
  },
  {
    id: "will-market",
    title: "Will Market",
    type: "E-commerce",
    typeEn: "E-commerce",
    description:
      "E-commerce completo com catálogo, checkout, pagamentos e painel administrativo.",
    descriptionEn:
      "Full e-commerce with catalog, checkout, payments and an admin dashboard.",
    tags: '["Next.js","Stripe","Prisma"]',
    videoUrl: "/videos/will-market.mp4",
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

function ProjectMedia({
  project,
  title,
}: {
  project: Project;
  title: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hovered, setHovered] = useState(false);

  const handleEnter = () => {
    setHovered(true);
    const v = videoRef.current;
    if (v) {
      v.currentTime = 0;
      v.play().catch(() => {});
    }
  };
  const handleLeave = () => {
    setHovered(false);
    videoRef.current?.pause();
  };

  return (
    <div
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="relative block overflow-hidden rounded-[2px] aspect-[4/3] bg-[#1c1b18]"
    >
      {project.videoUrl ? (
        <>
          <video
            ref={videoRef}
            src={project.videoUrl}
            muted
            loop
            playsInline
            preload="metadata"
            className={
              "absolute inset-0 h-full w-full object-cover transition-opacity duration-700 " +
              (hovered ? "opacity-100" : "opacity-0")
            }
          />
          {project.imageUrl ? (
            <Image
              src={project.imageUrl}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className={
                "object-cover transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] " +
                (hovered ? "opacity-0 scale-[1.04]" : "opacity-100 scale-100")
              }
            />
          ) : (
            <div
              className={
                "absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#1c1b18] to-[#0e0e0c] transition-opacity duration-700 " +
                (hovered ? "opacity-0" : "opacity-100")
              }
            >
              <span className="font-serif text-7xl text-white/15 tracking-tight">
                {title.slice(0, 2).toUpperCase()}
              </span>
            </div>
          )}
          {/* Play hint */}
          <div
            className={
              "absolute bottom-4 left-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/55 backdrop-blur-sm text-white text-[10px] tracking-[0.2em] uppercase transition-all duration-500 " +
              (hovered
                ? "opacity-0 -translate-y-1"
                : "opacity-100 translate-y-0")
            }
          >
            <Play className="size-3" />
            Preview
          </div>
        </>
      ) : project.imageUrl ? (
        <Image
          src={project.imageUrl}
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
        className="absolute inset-0 bg-[color:var(--ink)]/0 group-hover:bg-[color:var(--ink)]/10 transition-colors duration-500 pointer-events-none"
      />
      <div className="absolute top-5 right-5 inline-flex items-center justify-center size-10 rounded-full bg-[color:var(--bg)] text-[color:var(--ink)] opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 pointer-events-none">
        <ArrowUpRight className="size-4" />
      </div>
    </div>
  );
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
          eyebrow: "Nossos projetos",
          headline: "Alguns clientes que confiaram na Will Tech.",
          all: "Todos",
          live: "Ver projeto",
          code: "Código",
          empty: "Em breve",
          hint: "Passe o mouse sobre o card para ver o projeto em ação",
        }
      : {
          eyebrow: "Our work",
          headline: "Some clients who trusted Will Tech.",
          all: "All",
          live: "View project",
          code: "Code",
          empty: "Coming soon",
          hint: "Hover any card to see the project in motion",
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
          <div className="lg:col-span-9">
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7 }}
              className="display text-[clamp(1.7rem,3.5vw,2.8rem)] max-w-3xl"
            >
              {labels.headline}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="mt-4 text-[12px] tracking-[0.2em] uppercase text-[color:var(--muted)]"
            >
              {labels.hint}
            </motion.p>
          </div>
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
                  {it.demoUrl ? (
                    <a
                      href={it.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <ProjectMedia project={it} title={title} />
                    </a>
                  ) : (
                    <ProjectMedia project={it} title={title} />
                  )}

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
