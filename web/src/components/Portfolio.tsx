"use client";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { useLanguage } from "@/context/LanguageContext";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight, Github, Play } from "lucide-react";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";

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
    type: "Sistema corporativo",
    typeEn: "Corporate system",
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
      "App de finanças com dashboards interativos, metas e categorização inteligente.",
    descriptionEn:
      "Finance app with interactive dashboards, goals and smart categorization.",
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

function ProjectCard({
  project,
  index,
  language,
}: {
  project: Project;
  index: number;
  language: "pt" | "en";
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const sx = useSpring(rx, { stiffness: 180, damping: 18 });
  const sy = useSpring(ry, { stiffness: 180, damping: 18 });
  const transform = useTransform(
    [sx, sy] as never,
    ([x, y]: number[]) =>
      `perspective(900px) rotateX(${y}deg) rotateY(${x}deg)`
  );

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
    rx.set(0);
    ry.set(0);
  };
  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rx.set(px * 6);
    ry.set(-py * 6);
  };

  const tags = parseTags(project.tags);
  const type =
    language === "pt"
      ? project.type ?? ""
      : project.typeEn ?? project.type ?? "";
  const title =
    language === "pt" ? project.title : project.titleEn ?? project.title;
  const desc =
    language === "pt"
      ? project.description
      : project.descriptionEn ?? project.description;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        delay: (index % 4) * 0.08,
        duration: 0.8,
        ease: [0.2, 0.8, 0.2, 1],
      }}
    >
      <motion.div
        ref={cardRef}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        onMouseMove={handleMove}
        style={{ transform }}
        className="group relative will-change-transform"
      >
        {/* media frame */}
        <div className="relative overflow-hidden rounded-2xl aspect-[4/3] bg-[#08080c] border border-[color:var(--hairline)]">
          <span className="glow-ring group-hover:opacity-100" aria-hidden />

          {project.videoUrl && (
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
          )}

          {project.imageUrl ? (
            <Image
              src={project.imageUrl}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className={
                "object-cover transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] " +
                (hovered ? "opacity-0 scale-[1.05]" : "opacity-100 scale-100")
              }
            />
          ) : (
            <div
              className={
                "absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#0d0d12] to-[#050507] transition-opacity duration-700 " +
                (hovered ? "opacity-0" : "opacity-100")
              }
            >
              <span
                className="font-serif text-7xl tracking-tight"
                style={{
                  background:
                    "linear-gradient(120deg, var(--accent), var(--accent-2))",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  opacity: 0.4,
                }}
              >
                {title.slice(0, 2).toUpperCase()}
              </span>
            </div>
          )}

          {/* gradient overlay */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(180deg, transparent 50%, rgba(5,5,7,0.55) 100%)",
            }}
          />

          {/* preview pill */}
          <div
            className={
              "absolute bottom-4 left-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full glass text-white text-[10px] tracking-[0.2em] uppercase transition-all duration-500 " +
              (hovered
                ? "opacity-0 -translate-y-1"
                : "opacity-100 translate-y-0")
            }
          >
            <Play className="size-3" />
            Preview
          </div>

          <div className="absolute top-4 right-4 inline-flex items-center justify-center size-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
            <ArrowUpRight className="size-4" />
          </div>
        </div>

        <div className="mt-6 flex items-baseline justify-between gap-4">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[color:var(--accent)]">
              {type}
            </p>
            <h3 className="mt-2 font-serif text-2xl lg:text-[1.6rem] text-[color:var(--ink)] leading-tight">
              {title}
            </h3>
          </div>
          <span className="font-mono text-[11px] tracking-widest text-[color:var(--muted-2)]">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {desc && (
          <p className="mt-3 text-[13.5px] leading-relaxed text-[color:var(--muted)] max-w-md">
            {desc}
          </p>
        )}

        <div className="mt-5 flex flex-wrap items-center gap-2">
          {tags.map((t) => (
            <span
              key={t}
              className="text-[10px] tracking-[0.18em] uppercase px-2.5 py-1 rounded-full border border-[color:var(--hairline)] text-[color:var(--ink-soft)] bg-white/[0.02]"
            >
              {t}
            </span>
          ))}
        </div>

        {(project.demoUrl || project.repoUrl) && (
          <div className="mt-5 flex items-center gap-5 text-[12px] tracking-[0.14em] uppercase">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[color:var(--ink)] hover:text-[color:var(--accent)] transition-colors"
              >
                {language === "pt" ? "Ver" : "View"}
                <ArrowUpRight className="size-3.5" />
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[color:var(--muted)] hover:text-[color:var(--ink)] transition-colors"
              >
                <Github className="size-3.5" />{" "}
                {language === "pt" ? "Código" : "Code"}
              </a>
            )}
          </div>
        )}
      </motion.div>
    </motion.article>
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
          eyebrow: "Projetos",
          headline: "Trabalhos selecionados — feitos para durar.",
          all: "Todos",
          hint: "Passe o mouse sobre o card para ver o projeto em ação.",
        }
      : {
          eyebrow: "Selected work",
          headline: "Selected work — built to last.",
          all: "All",
          hint: "Hover any card to see the project in motion.",
        };

  return (
    <section
      id="projects"
      className="relative py-28 lg:py-40 bg-[color:var(--bg)] overflow-hidden"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, rgba(124,147,255,0.10) 0%, transparent 70%)",
        }}
      />

      <div
        className="relative mx-auto px-6 lg:px-10"
        style={{ maxWidth: "var(--max)" }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 mb-14">
          <div className="lg:col-span-3">
            <RevealOnScroll>
              <span className="eyebrow">{labels.eyebrow}</span>
              <p className="mt-6 text-[10px] font-mono tracking-widest text-[color:var(--muted-2)]">
                05 / 06
              </p>
            </RevealOnScroll>
          </div>
          <div className="lg:col-span-9">
            <RevealOnScroll>
              <h2 className="display text-[clamp(1.8rem,3.8vw,3rem)] max-w-3xl">
                {labels.headline}
              </h2>
            </RevealOnScroll>
            <RevealOnScroll delay={0.15}>
              <p className="mt-5 text-[13px] tracking-[0.2em] uppercase text-[color:var(--muted)]">
                {labels.hint}
              </p>
            </RevealOnScroll>
          </div>
        </div>

        {/* Filters */}
        <RevealOnScroll>
          <div className="flex flex-wrap items-center gap-2 mb-12 pb-6 border-b border-[color:var(--hairline)]">
            <button
              onClick={() => setActiveFilter("all")}
              className={
                "text-[11px] tracking-[0.18em] uppercase px-3.5 py-1.5 rounded-full border transition-all duration-300 " +
                (activeFilter === "all"
                  ? "text-[color:var(--ink)] border-[color:var(--accent)] bg-[color:var(--accent)]/10"
                  : "text-[color:var(--muted)] border-[color:var(--hairline)] hover:border-[color:var(--hairline-strong)] hover:text-[color:var(--ink)]")
              }
            >
              {labels.all}
              <span className="ml-2 text-[10px] text-[color:var(--muted-2)] font-mono">
                ({items.length})
              </span>
            </button>
            {allTags.map((tag) => {
              const count = items.filter((it) =>
                parseTags(it.tags).includes(tag)
              ).length;
              return (
                <button
                  key={tag}
                  onClick={() => setActiveFilter(tag)}
                  className={
                    "text-[11px] tracking-[0.18em] uppercase px-3.5 py-1.5 rounded-full border transition-all duration-300 " +
                    (activeFilter === tag
                      ? "text-[color:var(--ink)] border-[color:var(--accent)] bg-[color:var(--accent)]/10"
                      : "text-[color:var(--muted)] border-[color:var(--hairline)] hover:border-[color:var(--hairline-strong)] hover:text-[color:var(--ink)]")
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
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-20">
          <AnimatePresence mode="popLayout">
            {filtered.map((it, i) => (
              <ProjectCard
                key={it.id}
                project={it}
                index={i}
                language={language}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
