"use client";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

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
      {/* Soft accent glow — barely there */}
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

          {/* Portrait */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
              className="relative mx-auto max-w-[380px] lg:max-w-none"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2px] bg-[#1c1b18]">
                <Image
                  src="/picture.png"
                  alt="William Moreli"
                  fill
                  priority
                  sizes="(max-width: 1024px) 380px, 480px"
                  className="object-cover object-[60%_30%] grayscale-[15%] contrast-105"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 mix-blend-multiply"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(0,0,0,0) 55%, rgba(14,14,12,0.35) 100%)",
                  }}
                />
              </div>

              {/* Floating signature label */}
              <motion.div
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="absolute -left-4 lg:-left-8 bottom-10 hidden sm:flex flex-col gap-1 bg-[color:var(--bg)] border border-[color:var(--hairline)] px-4 py-3 rounded-[2px] shadow-[0_20px_50px_-30px_rgba(0,0,0,0.25)]"
              >
                <span className="text-[10px] uppercase tracking-[0.22em] text-[color:var(--muted)]">
                  Based in
                </span>
                <span className="text-sm font-medium text-[color:var(--ink)]">
                  Vitória — Brazil
                </span>
              </motion.div>
            </motion.div>
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
