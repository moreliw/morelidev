"use client";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ArrowDown, Sparkles, Play, Pause } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { AnimatedGradientBackground } from "@/components/motion/AnimatedGradientBackground";
import { MagneticLink } from "@/components/motion/MagneticButton";

type Showcase = {
  id: string;
  video: string;
  title: string;
  type: { pt: string; en: string };
  stack: string[];
};

const SHOWCASES: Showcase[] = [
  {
    id: "cipritex",
    video: "/videos/cipritex.mp4",
    title: "Cipritex",
    type: { pt: "Sistema corporativo", en: "Corporate system" },
    stack: [".NET", "Angular", "SQL Server"],
  },
  {
    id: "takki",
    video: "/videos/takki.mp4",
    title: "Takki.ao",
    type: { pt: "Marketplace", en: "Marketplace" },
    stack: ["React", "Node", "UX"],
  },
  {
    id: "saldo-casa",
    video: "/videos/saldo-casa.mp4",
    title: "Saldo Casa",
    type: { pt: "Aplicativo financeiro", en: "Finance app" },
    stack: ["React Native", "API", "Charts"],
  },
  {
    id: "site-mameri",
    video: "/videos/site-mameri.mp4",
    title: "Mameri",
    type: { pt: "Site institucional", en: "Institutional site" },
    stack: ["Next.js", "Branding", "SEO"],
  },
  {
    id: "padel",
    video: "/videos/padel.mp4",
    title: "Padel App",
    type: { pt: "Aplicativo esportivo", en: "Sports app" },
    stack: ["React Native", "Booking", "Realtime"],
  },
  {
    id: "will-market",
    video: "/videos/will-market.mp4",
    title: "Will Market",
    type: { pt: "Loja online", en: "Online store" },
    stack: ["Next.js", "Stripe", "Prisma"],
  },
];

const SLIDE_MS = 6500;

function VideoStack({ language }: { language: "pt" | "en" }) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const reduced = useReducedMotion();

  // 3D parallax tilt
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 100, damping: 16 });
  const sry = useSpring(ry, { stiffness: 100, damping: 16 });

  const handleTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduced) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rx.set(py * -4);
    ry.set(px * 6);
  };
  const resetTilt = () => {
    rx.set(0);
    ry.set(0);
  };

  // slide advance — single timeout, zero per-frame state
  useEffect(() => {
    if (!playing || reduced) return;
    const t = window.setTimeout(
      () => setIndex((i) => (i + 1) % SHOWCASES.length),
      SLIDE_MS
    );
    return () => window.clearTimeout(t);
  }, [index, playing, reduced]);

  // only the active video plays; every other stays paused
  useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      if (i === index && playing) v.play().catch(() => {});
      else v.pause();
    });
  }, [playing, index]);

  // browsers pause offscreen media — resume the active video when
  // the user returns to the tab
  useEffect(() => {
    const onVis = () => {
      if (document.visibilityState !== "visible") return;
      const v = videoRefs.current[index];
      if (v && playing) v.play().catch(() => {});
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, [index, playing]);

  const current = SHOWCASES[index];

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 30, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1.1, delay: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
      className="relative w-full"
      style={{ perspective: 1200 }}
      onMouseMove={handleTilt}
      onMouseLeave={resetTilt}
    >
      {/* Floating stack card */}
      <motion.div
        aria-hidden
        initial={reduced ? false : { opacity: 0, x: -20, rotate: -8 }}
        animate={{ opacity: 1, x: 0, rotate: -6 }}
        transition={{ duration: 1.2, delay: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
        className="hidden lg:block absolute -left-14 top-10 w-44 p-3.5 rounded-xl glass float-slow z-20"
      >
        <p className="text-[9px] tracking-[0.22em] uppercase text-white/50 mb-2.5">
          Core stack
        </p>
        <div className="flex flex-wrap gap-1.5">
          {["Angular", ".NET", "React", "Laravel", "SQL"].map((t) => (
            <span
              key={t}
              className="text-[9.5px] px-2 py-0.5 rounded-full border border-white/10 bg-white/[0.04] text-white/75"
            >
              {t}
            </span>
          ))}
        </div>
        <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-emerald-400 pulse-glow" />
          <span className="text-[9px] tracking-[0.18em] uppercase text-white/55">
            {language === "pt" ? "5+ anos" : "5+ years"}
          </span>
        </div>
      </motion.div>

      {/* Floating uptime card */}
      <motion.div
        aria-hidden
        initial={reduced ? false : { opacity: 0, x: 20, rotate: 8 }}
        animate={{ opacity: 1, x: 0, rotate: 6 }}
        transition={{ duration: 1.2, delay: 0.85, ease: [0.2, 0.8, 0.2, 1] }}
        className="hidden lg:flex absolute -right-10 bottom-20 w-44 p-3 rounded-xl glass float-med z-20 flex-col gap-2"
      >
        <div className="flex items-center justify-between">
          <span className="text-[9px] tracking-[0.22em] uppercase text-white/55">
            Uptime
          </span>
          <span className="size-1.5 rounded-full bg-emerald-400 pulse-glow" />
        </div>
        <div className="font-serif text-xl text-white/90 leading-none">
          99.98<span className="text-white/40 text-sm">%</span>
        </div>
        <div className="h-8 flex items-end gap-0.5">
          {[40, 60, 45, 70, 55, 80, 65, 90, 75, 95, 70, 85].map((h, i) => (
            <span
              key={i}
              className="flex-1 rounded-sm bg-gradient-to-t from-[color:var(--accent)]/60 to-[color:var(--accent-2)]/40"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </motion.div>

      {/* Main frame with parallax tilt */}
      <motion.div
        style={reduced ? undefined : { rotateX: srx, rotateY: sry }}
        className="relative z-10 aspect-[4/5] overflow-hidden rounded-2xl border border-[color:var(--hairline-strong)] bg-[#070708] shadow-[0_50px_100px_-30px_rgba(124,147,255,0.35)] will-change-transform"
      >
        <span className="glow-ring opacity-100" aria-hidden />

        {/* crossfade via animate prop — no AnimatePresence (exits don't
            unmount reliably with React Compiler, leaking playing videos) */}
        {SHOWCASES.map((s, i) => (
          <motion.video
            key={s.id}
            ref={(el) => {
              videoRefs.current[i] = el;
            }}
            src={s.video}
            muted
            playsInline
            loop
            autoPlay={i === 0}
            preload={i === 0 ? "auto" : "metadata"}
            initial={false}
            animate={{
              opacity: i === index ? 1 : 0,
              scale: i === index ? 1 : 1.05,
            }}
            transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ filter: "contrast(1.06) saturate(1.06)" }}
          />
        ))}

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.05) 40%, rgba(5,5,7,0.9) 100%)",
          }}
        />

        <div className="absolute top-5 left-5 right-5 flex items-center justify-between text-white">
          <div className="flex items-center gap-2 text-[10px] tracking-[0.24em] uppercase opacity-80">
            <span className="relative inline-flex h-1.5 w-1.5">
              <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-70" />
              <span className="relative inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            Live · selected work
          </div>
          <span className="font-mono text-[10px] tracking-widest opacity-70">
            {String(index + 1).padStart(2, "0")} /{" "}
            {String(SHOWCASES.length).padStart(2, "0")}
          </span>
        </div>

        <div className="absolute inset-x-5 bottom-5 text-white">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
            >
              <p className="text-[10px] tracking-[0.24em] uppercase opacity-75">
                {language === "pt" ? current.type.pt : current.type.en}
              </p>
              <h3 className="mt-1.5 font-serif text-2xl lg:text-[1.7rem] tracking-tight">
                {current.title}
              </h3>
              <div className="mt-2.5 flex flex-wrap gap-x-3 gap-y-1">
                {current.stack.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] tracking-[0.18em] uppercase opacity-65"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          type="button"
          onClick={() => setPlaying((p) => !p)}
          aria-label={playing ? "Pause" : "Play"}
          className="absolute bottom-5 right-5 inline-flex items-center justify-center size-9 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-colors"
        >
          {playing ? (
            <Pause className="size-3.5" />
          ) : (
            <Play className="size-3.5 translate-x-[1px]" />
          )}
        </button>
      </motion.div>

      {/* progress segments — CSS animation, no JS per frame */}
      <div className="relative z-10 mt-4 grid grid-cols-6 gap-1.5">
        {SHOWCASES.map((s, i) => (
          <button
            key={s.id}
            type="button"
            aria-label={s.title}
            onClick={() => setIndex(i)}
            className="relative h-[3px] overflow-hidden rounded-full bg-white/10"
          >
            {i < index && (
              <span className="absolute inset-0 bg-gradient-to-r from-[color:var(--accent)] to-[color:var(--accent-2)]" />
            )}
            {i === index && (
              <span
                className="absolute inset-0 origin-left bg-gradient-to-r from-[color:var(--accent)] to-[color:var(--accent-2)]"
                style={{
                  animation: `fillBar ${SLIDE_MS}ms linear forwards`,
                  animationPlayState: playing ? "running" : "paused",
                }}
              />
            )}
          </button>
        ))}
      </div>
    </motion.div>
  );
}

export function Hero() {
  const { language } = useLanguage();
  const reduced = useReducedMotion();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const yMove = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3]);

  // cursor spotlight — transform-only, composited
  const mx = useMotionValue(-600);
  const my = useMotionValue(-600);
  const smx = useSpring(mx, { stiffness: 50, damping: 20 });
  const smy = useSpring(my, { stiffness: 50, damping: 20 });

  const handleSpotlight = (e: React.MouseEvent<HTMLElement>) => {
    if (reduced) return;
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set(e.clientX - rect.left);
    my.set(e.clientY - rect.top);
  };

  const copy =
    language === "pt"
      ? {
          eyebrow: "Software Engineer · Full Stack Developer",
          title: [
            "Transformo ideias em",
            "sistemas modernos,",
            "rápidos e escaláveis.",
          ],
          desc:
            "Desenvolvimento de sites, sistemas web, dashboards, automações e plataformas sob medida com foco em performance, design e resultado.",
          ctaPrimary: "Fale comigo",
          ctaSecondary: "Ver projetos",
          available: "Disponível para novos projetos",
          scroll: "Role para descobrir",
        }
      : {
          eyebrow: "Software Engineer · Full Stack Developer",
          title: [
            "Turning ideas into",
            "modern, fast and",
            "scalable systems.",
          ],
          desc:
            "Websites, web systems, dashboards, automations and bespoke platforms — built for performance, design and real outcomes.",
          ctaPrimary: "Get in touch",
          ctaSecondary: "See projects",
          available: "Available for new projects",
          scroll: "Scroll to explore",
        };

  return (
    <section
      id="top"
      ref={heroRef}
      onMouseMove={handleSpotlight}
      className="relative isolate overflow-hidden pt-36 pb-24 lg:pt-44 lg:pb-32"
    >
      <AnimatedGradientBackground />

      {/* cursor spotlight */}
      {!reduced && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -z-[5] size-[640px] rounded-full hidden lg:block"
          style={{
            x: smx,
            y: smy,
            translateX: "-50%",
            translateY: "-50%",
            background:
              "radial-gradient(circle, rgba(124,147,255,0.07) 0%, transparent 60%)",
          }}
        />
      )}

      <motion.div
        style={{ y: reduced ? 0 : yMove, opacity }}
        className="relative mx-auto px-6 lg:px-10"
      >
        <div className="mx-auto" style={{ maxWidth: "var(--max)" }}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            <div className="lg:col-span-7 order-2 lg:order-1">
              <motion.div
                initial={reduced ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-[10.5px] tracking-[0.22em] uppercase text-[color:var(--ink-soft)]"
              >
                <Sparkles className="size-3 text-[color:var(--accent)]" />
                {copy.eyebrow}
              </motion.div>

              <h1 className="mt-8 display text-[clamp(2.5rem,6.2vw,5.2rem)] text-[color:var(--ink)]">
                {copy.title.map((line, lineIdx) => (
                  <span key={lineIdx} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
                    <motion.span
                      initial={reduced ? false : { y: "110%" }}
                      animate={{ y: "0%" }}
                      transition={{
                        duration: 0.9,
                        delay: 0.2 + lineIdx * 0.12,
                        ease: [0.2, 0.8, 0.2, 1],
                      }}
                      className="block"
                    >
                      {lineIdx === copy.title.length - 1 ? (
                        <>
                          {line.split(" ").slice(0, -1).join(" ")}{" "}
                          <span className="italic gradient-text-animated">
                            {line.split(" ").slice(-1).join(" ")}
                          </span>
                        </>
                      ) : (
                        line
                      )}
                    </motion.span>
                  </span>
                ))}
              </h1>

              <motion.p
                initial={reduced ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.65 }}
                className="mt-8 max-w-xl text-[15px] lg:text-[16px] leading-[1.75] text-[color:var(--muted)]"
              >
                {copy.desc}
              </motion.p>

              <motion.div
                initial={reduced ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.8 }}
                className="mt-10 flex flex-wrap items-center gap-4"
              >
                <MagneticLink href="#contact" className="btn-primary">
                  {copy.ctaPrimary}
                  <ArrowUpRight className="size-4" />
                </MagneticLink>
                <MagneticLink href="#projects" className="btn-ghost">
                  {copy.ctaSecondary}
                  <ArrowDown className="size-3.5" />
                </MagneticLink>
              </motion.div>

              <motion.div
                initial={reduced ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.95 }}
                className="mt-12 flex items-center gap-3 text-[11px] tracking-[0.22em] uppercase text-[color:var(--muted)]"
              >
                <span className="relative inline-flex h-2 w-2">
                  <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-60" />
                  <span className="relative inline-block h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                {copy.available}
              </motion.div>

              {/* Inline mini stats */}
              <motion.div
                initial={reduced ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.05 }}
                className="mt-12 grid grid-cols-3 max-w-md gap-4 pt-6 border-t border-[color:var(--hairline)]"
              >
                {[
                  { v: "5+", l: language === "pt" ? "Anos" : "Years" },
                  { v: "10+", l: language === "pt" ? "Projetos" : "Projects" },
                  { v: "2", l: language === "pt" ? "Países" : "Countries" },
                ].map((s) => (
                  <div key={s.l}>
                    <div className="font-serif text-2xl lg:text-3xl text-[color:var(--ink)] tabular-nums">
                      {s.v}
                    </div>
                    <div className="mt-1 text-[10px] uppercase tracking-[0.2em] text-[color:var(--muted-2)]">
                      {s.l}
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            <div className="lg:col-span-5 order-1 lg:order-2">
              <div className="relative mx-auto max-w-[400px] lg:max-w-none">
                <VideoStack language={language} />
              </div>
            </div>
          </div>

          <motion.a
            href="#about"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.3 }}
            className="mt-20 hidden lg:inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--muted)] hover:text-[color:var(--ink)] transition-colors"
          >
            <ArrowDown className="size-3.5 animate-bounce" />
            {copy.scroll}
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}
