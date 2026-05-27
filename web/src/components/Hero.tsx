"use client";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ArrowDown, Play, Pause } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

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
    type: { pt: "Plataforma corporativa", en: "Corporate platform" },
    stack: [".NET", "Angular", "SQL Server"],
  },
  {
    id: "takki",
    video: "/videos/takki.mp4",
    title: "Takki.ao",
    type: { pt: "Marketplace responsivo", en: "Responsive marketplace" },
    stack: ["React", "Node", "UX"],
  },
  {
    id: "saldo-casa",
    video: "/videos/saldo-casa.mp4",
    title: "Saldo Casa",
    type: { pt: "Finanças pessoais", en: "Personal finance" },
    stack: ["React Native", "API", "Charts"],
  },
  {
    id: "site-mameri",
    video: "/videos/site-mameri.mp4",
    title: "Mameri",
    type: { pt: "Site institucional", en: "Institutional site" },
    stack: ["Next.js", "Brand", "CMS"],
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
    type: { pt: "E-commerce", en: "E-commerce" },
    stack: ["Next.js", "Stripe", "Prisma"],
  },
];

function useCounter(target: number, duration: number, active: boolean) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(target * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, target, duration]);
  return value;
}

function Stat({
  value,
  suffix,
  label,
  delay,
}: {
  value: number;
  suffix: string;
  label: string;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });
  const count = useCounter(value, 1400, inView);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay }}
      className="flex flex-col gap-1"
    >
      <div className="flex items-baseline gap-0.5">
        <span className="font-serif text-3xl lg:text-4xl text-[color:var(--ink)] tabular-nums tracking-tight">
          {count}
        </span>
        <span className="font-serif text-xl lg:text-2xl text-[color:var(--accent)]">
          {suffix}
        </span>
      </div>
      <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-[color:var(--muted)]">
        {label}
      </span>
    </motion.div>
  );
}

const SLIDE_MS = 6500;

function VideoCarousel({ language }: { language: "pt" | "en" }) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const startRef = useRef<number>(performance.now());

  // Advance slide on a timer; pause when not playing
  useEffect(() => {
    if (!playing) return;
    startRef.current = performance.now();
    setProgress(0);
    let raf = 0;
    const tick = (now: number) => {
      const elapsed = now - startRef.current;
      const p = Math.min(1, elapsed / SLIDE_MS);
      setProgress(p);
      if (p >= 1) {
        setIndex((i) => (i + 1) % SHOWCASES.length);
      } else {
        raf = requestAnimationFrame(tick);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [index, playing]);

  // Play/pause active video
  useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      if (i === index && playing) {
        v.currentTime = 0;
        v.play().catch(() => {});
      } else {
        v.pause();
      }
    });
  }, [index, playing]);

  const current = SHOWCASES[index];

  return (
    <div className="relative w-full">
      {/* Frame */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
        className="relative aspect-[4/5] overflow-hidden rounded-[3px] bg-[#0e0e0c] shadow-[0_40px_80px_-40px_rgba(17,17,16,0.45)]"
      >
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
            preload={i === 0 ? "auto" : "metadata"}
            initial={false}
            animate={{
              opacity: i === index ? 1 : 0,
              scale: i === index ? 1 : 1.04,
            }}
            transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ filter: "contrast(1.05) saturate(1.02)" }}
          />
        ))}

        {/* Gradient overlay for legibility */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0) 35%, rgba(14,14,12,0.85) 100%)",
          }}
        />

        {/* Top meta */}
        <div className="absolute top-5 left-5 right-5 flex items-center justify-between text-white">
          <div className="flex items-center gap-2 text-[10px] tracking-[0.24em] uppercase opacity-80">
            <span className="relative inline-flex h-1.5 w-1.5">
              <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-70" />
              <span className="relative inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            {language === "pt" ? "Trabalhos recentes" : "Recent work"}
          </div>
          <span className="font-mono text-[10px] tracking-widest opacity-70">
            {String(index + 1).padStart(2, "0")} / {String(SHOWCASES.length).padStart(2, "0")}
          </span>
        </div>

        {/* Bottom caption */}
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

        {/* Play/pause */}
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

      {/* Progress bars / indicators */}
      <div className="mt-4 grid grid-cols-6 gap-1.5">
        {SHOWCASES.map((s, i) => (
          <button
            key={s.id}
            type="button"
            aria-label={s.title}
            onClick={() => setIndex(i)}
            className="group relative h-[3px] overflow-hidden rounded-full bg-[color:var(--hairline)]"
          >
            <span
              className="absolute inset-y-0 left-0 bg-[color:var(--ink)] transition-[width] duration-100"
              style={{
                width:
                  i < index
                    ? "100%"
                    : i === index
                    ? `${progress * 100}%`
                    : "0%",
              }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

export function Hero() {
  const { language } = useLanguage();
  const copy =
    language === "pt"
      ? {
          eyebrow: "Software Engineer · Full Stack",
          title: ["Engenharia de software", "feita com método", "e cuidado."],
          desc:
            "William Moreli desenvolve aplicações web escaláveis e produtos digitais elegantes — combinando .NET, Angular, React e arquiteturas modernas com atenção ao detalhe.",
          ctaPrimary: "Iniciar um projeto",
          ctaSecondary: "Ver portfólio",
          scroll: "Role para descobrir",
          available: "Disponível para novos projetos",
          stats: [
            { value: 5, suffix: "+", label: "Anos de experiência" },
            { value: 40, suffix: "+", label: "Projetos entregues" },
            { value: 98, suffix: "%", label: "Clientes satisfeitos" },
          ],
        }
      : {
          eyebrow: "Software Engineer · Full Stack",
          title: ["Software engineering", "crafted with method", "and care."],
          desc:
            "William Moreli builds scalable web applications and refined digital products — combining .NET, Angular, React and modern architectures with attention to detail.",
          ctaPrimary: "Start a project",
          ctaSecondary: "See selected work",
          scroll: "Scroll to explore",
          available: "Available for new projects",
          stats: [
            { value: 5, suffix: "+", label: "Years of experience" },
            { value: 40, suffix: "+", label: "Projects delivered" },
            { value: 98, suffix: "%", label: "Client satisfaction" },
          ],
        };

  return (
    <section
      id="top"
      className="relative isolate overflow-hidden pt-32 pb-24 lg:pt-40 lg:pb-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-40 h-[520px] w-[520px] rounded-full opacity-[0.18] blur-[120px]"
        style={{ background: "radial-gradient(circle, #c8a274 0%, transparent 70%)" }}
      />

      <div
        className="relative mx-auto px-6 lg:px-10"
        style={{ maxWidth: "var(--max)" }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Text */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="eyebrow"
            >
              {copy.eyebrow}
            </motion.div>

            <h1 className="mt-7 display text-[clamp(2.4rem,6vw,4.6rem)]">
              {copy.title.map((line, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.15 + i * 0.12, ease: [0.2, 0.8, 0.2, 1] }}
                  className="block"
                >
                  {i === copy.title.length - 1 ? (
                    <>
                      {line.replace(/\.$/, "")}
                      <span className="text-[color:var(--accent)] italic">.</span>
                    </>
                  ) : (
                    line
                  )}
                </motion.span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55 }}
              className="mt-7 max-w-xl text-[15px] lg:text-base leading-[1.75] text-[color:var(--ink-soft)]"
            >
              {copy.desc}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4"
            >
              <a href="#contact" className="btn-primary">
                {copy.ctaPrimary}
                <ArrowUpRight className="size-4" />
              </a>
              <a href="#projects" className="btn-ghost">
                {copy.ctaSecondary}
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.85 }}
              className="mt-14 flex items-center gap-2.5 text-[12px] tracking-[0.2em] uppercase text-[color:var(--muted)]"
            >
              <span className="relative inline-flex h-2 w-2">
                <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-60" />
                <span className="relative inline-block h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              {copy.available}
            </motion.div>
          </div>

          {/* Video carousel */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <div className="relative mx-auto max-w-[380px] lg:max-w-none">
              <VideoCarousel language={language} />
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="mt-20 lg:mt-28 pt-10 border-t border-[color:var(--hairline)]">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-8 gap-x-10">
            {copy.stats.map((s, i) => (
              <Stat
                key={s.label}
                value={s.value}
                suffix={s.suffix}
                label={s.label}
                delay={0.9 + i * 0.1}
              />
            ))}
          </div>
        </div>

        {/* Scroll cue */}
        <motion.a
          href="#about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="mt-16 hidden lg:inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[color:var(--muted)] hover:text-[color:var(--ink)] transition-colors"
        >
          <ArrowDown className="size-3.5 animate-bounce" />
          {copy.scroll}
        </motion.a>
      </div>
    </section>
  );
}
