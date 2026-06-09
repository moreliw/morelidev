"use client";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { useLanguage } from "@/context/LanguageContext";
import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  X,
  Play,
  TrendingUp,
  Lightbulb,
  Wrench,
} from "lucide-react";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { PROJECTS, type ProjectData } from "@/data/projects";

/* ─── Card component ─── */
function ProjectCard({
  project,
  index,
  language,
  onOpen,
}: {
  project: ProjectData;
  index: number;
  language: "pt" | "en";
  onOpen: (p: ProjectData) => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const reduced = useReducedMotion();

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
    if (reduced) return;
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rx.set(px * 5);
    ry.set(-py * 5);
  };

  const category = language === "pt" ? project.category.pt : project.category.en;

  return (
    <motion.article
      layout
      initial={reduced ? false : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
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
        style={reduced ? undefined : { transform }}
        className="group relative will-change-transform cursor-pointer"
        onClick={() => onOpen(project)}
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
              alt={project.title}
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
                {project.title.slice(0, 2).toUpperCase()}
              </span>
            </div>
          )}

          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(180deg, transparent 50%, rgba(5,5,7,0.7) 100%)",
            }}
          />

          <div
            className={
              "absolute bottom-4 left-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full glass text-white text-[10px] tracking-[0.2em] uppercase transition-all duration-500 " +
              (hovered ? "opacity-0 -translate-y-1" : "opacity-100 translate-y-0")
            }
          >
            <Play className="size-3" />
            Preview
          </div>

          <div className="absolute top-4 right-4 inline-flex items-center justify-center size-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
            <ArrowUpRight className="size-4" />
          </div>

          {/* category badge */}
          <div className="absolute top-4 left-4 px-2.5 py-1 rounded-full glass text-[10px] tracking-[0.18em] uppercase text-[color:var(--accent)] border border-[color:var(--accent)]/20">
            {category}
          </div>
        </div>

        {/* card meta */}
        <div className="mt-5 flex items-baseline justify-between gap-4">
          <h3 className="font-serif text-2xl lg:text-[1.6rem] text-[color:var(--ink)] leading-tight">
            {project.title}
          </h3>
          <span className="font-mono text-[11px] tracking-widest text-[color:var(--muted-2)] shrink-0">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <p className="mt-2 text-[13.5px] leading-relaxed text-[color:var(--muted)] max-w-md">
          {language === "pt"
            ? project.shortDesc.pt
            : project.shortDesc.en}
        </p>

        {/* case study mini strip */}
        <div className="mt-5 grid grid-cols-3 gap-3 pt-5 border-t border-[color:var(--hairline)]">
          <CasePill
            icon={Lightbulb}
            label={language === "pt" ? "Problema" : "Problem"}
            text={language === "pt" ? project.problem.pt : project.problem.en}
          />
          <CasePill
            icon={Wrench}
            label={language === "pt" ? "Solução" : "Solution"}
            text={language === "pt" ? project.solution.pt : project.solution.en}
          />
          <CasePill
            icon={TrendingUp}
            label={language === "pt" ? "Resultado" : "Result"}
            text={language === "pt" ? project.result.pt : project.result.en}
            accent
          />
        </div>

        {/* stack tags */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {project.stack.map((t) => (
            <span
              key={t}
              className="text-[10px] tracking-[0.18em] uppercase px-2.5 py-1 rounded-full border border-[color:var(--hairline)] text-[color:var(--ink-soft)] bg-white/[0.02]"
            >
              {t}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.article>
  );
}

function CasePill({
  icon: Icon,
  label,
  text,
  accent = false,
}: {
  icon: React.ElementType;
  label: string;
  text: string;
  accent?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-1">
        <Icon
          className={
            "size-3 " +
            (accent
              ? "text-[color:var(--accent-2)]"
              : "text-[color:var(--muted)]")
          }
        />
        <span
          className={
            "text-[9px] font-medium tracking-[0.2em] uppercase " +
            (accent
              ? "text-[color:var(--accent-2)]"
              : "text-[color:var(--muted-2)]")
          }
        >
          {label}
        </span>
      </div>
      <p className="text-[11px] leading-snug text-[color:var(--muted)] line-clamp-3">
        {text}
      </p>
    </div>
  );
}

/* ─── Modal ─── */
function ProjectModal({
  project,
  language,
  onClose,
}: {
  project: ProjectData;
  language: "pt" | "en";
  onClose: () => void;
}) {
  const reduced = useReducedMotion();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const category = language === "pt" ? project.category.pt : project.category.en;

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4 sm:p-8"
      onClick={onClose}
    >
      {/* backdrop */}
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />

      <motion.div
        initial={reduced ? false : { opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.97 }}
        transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-[color:var(--hairline-strong)] bg-[color:var(--bg-card)] glass"
        onClick={(e) => e.stopPropagation()}
      >
        {/* media */}
        {project.videoUrl && (
          <div className="relative aspect-video bg-black overflow-hidden rounded-t-2xl">
            <video
              src={project.videoUrl}
              muted
              autoPlay
              loop
              playsInline
              className="w-full h-full object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(180deg, transparent 60%, rgba(15,15,23,0.8) 100%)",
              }}
            />
          </div>
        )}

        <div className="p-6 lg:p-8">
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <span className="text-[10px] tracking-[0.22em] uppercase text-[color:var(--accent)]">
                {category}
              </span>
              <h2 className="mt-1 font-serif text-[1.8rem] lg:text-[2rem] text-[color:var(--ink)]">
                {project.title}
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="shrink-0 inline-flex items-center justify-center size-9 rounded-full border border-[color:var(--hairline)] text-[color:var(--muted)] hover:text-[color:var(--ink)] hover:border-[color:var(--hairline-strong)] transition-colors"
            >
              <X className="size-4" />
            </button>
          </div>

          {/* case study */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {[
              {
                icon: Lightbulb,
                label: language === "pt" ? "Problema" : "Problem",
                text: language === "pt" ? project.problem.pt : project.problem.en,
                color: "var(--muted)",
              },
              {
                icon: Wrench,
                label: language === "pt" ? "Solução" : "Solution",
                text: language === "pt" ? project.solution.pt : project.solution.en,
                color: "var(--accent)",
              },
              {
                icon: TrendingUp,
                label: language === "pt" ? "Resultado" : "Result",
                text: language === "pt" ? project.result.pt : project.result.en,
                color: "var(--accent-2)",
              },
            ].map(({ icon: Icon, label, text, color }) => (
              <div
                key={label}
                className="rounded-xl border border-[color:var(--hairline)] bg-white/[0.02] p-4"
              >
                <div className="flex items-center gap-1.5 mb-2">
                  <Icon className="size-3.5" style={{ color }} />
                  <span
                    className="text-[10px] font-medium tracking-[0.2em] uppercase"
                    style={{ color }}
                  >
                    {label}
                  </span>
                </div>
                <p className="text-[13px] leading-relaxed text-[color:var(--ink-soft)]">
                  {text}
                </p>
              </div>
            ))}
          </div>

          {/* description */}
          <p className="text-[14px] leading-[1.8] text-[color:var(--muted)] mb-8">
            {language === "pt" ? project.shortDesc.pt : project.shortDesc.en}
          </p>

          {/* stack */}
          <div>
            <p className="text-[10px] tracking-[0.22em] uppercase text-[color:var(--muted-2)] mb-3">
              Stack
            </p>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((t) => (
                <span
                  key={t}
                  className="text-[11px] tracking-[0.16em] uppercase px-3 py-1.5 rounded-full border border-[color:var(--hairline)] text-[color:var(--ink-soft)] bg-white/[0.02]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {project.demoUrl && (
            <div className="mt-8">
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex"
              >
                {language === "pt" ? "Ver projeto ao vivo" : "See live project"}
                <ArrowUpRight className="size-4" />
              </a>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Main section ─── */
export function Portfolio() {
  const { language } = useLanguage();
  const [openProject, setOpenProject] = useState<ProjectData | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const allTags = Array.from(
    new Set(PROJECTS.flatMap((p) => p.stack))
  ).slice(0, 8);

  const filtered =
    activeFilter === "all"
      ? PROJECTS
      : PROJECTS.filter((p) => p.stack.includes(activeFilter));

  const labels =
    language === "pt"
      ? {
          eyebrow: "Projetos",
          headline: "Projetos que transformam processos em produtos digitais.",
          sub: "Interfaces, sistemas e plataformas criadas para performance, clareza e resultado.",
          all: "Todos",
          hint: "Clique em qualquer card para ver o case completo.",
        }
      : {
          eyebrow: "Selected work",
          headline: "Projects that turn processes into digital products.",
          sub: "Interfaces, systems and platforms built for performance, clarity and results.",
          all: "All",
          hint: "Click any card to see the full case study.",
        };

  return (
    <>
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
              <RevealOnScroll delay={0.1}>
                <p className="mt-4 text-[15px] leading-[1.8] text-[color:var(--muted)] max-w-2xl">
                  {labels.sub}
                </p>
              </RevealOnScroll>
              <RevealOnScroll delay={0.2}>
                <p className="mt-4 text-[13px] tracking-[0.2em] uppercase text-[color:var(--muted-2)]">
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
                  ({PROJECTS.length})
                </span>
              </button>
              {allTags.map((tag) => {
                const count = PROJECTS.filter((p) =>
                  p.stack.includes(tag)
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
              {filtered.map((project, i) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={i}
                  language={language}
                  onOpen={setOpenProject}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {openProject && (
          <ProjectModal
            project={openProject}
            language={language}
            onClose={() => setOpenProject(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
