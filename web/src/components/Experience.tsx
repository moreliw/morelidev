"use client";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import {
  Building2,
  Boxes,
  Plug,
  ServerCog,
  Gauge,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/motion/StaggerContainer";

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

function Metric({
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
  const reduced = useReducedMotion();
  const count = useCounter(value, 1500, inView && !reduced);
  return (
    <motion.div
      ref={ref}
      initial={reduced ? false : { opacity: 0, y: 14 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay }}
      className="flex flex-col gap-2"
    >
      <div className="flex items-baseline gap-0.5">
        <span className="font-serif text-4xl lg:text-5xl text-[color:var(--ink)] tabular-nums tracking-tight">
          {reduced ? value : count}
        </span>
        <span
          className="font-serif text-2xl lg:text-3xl"
          style={{
            background:
              "linear-gradient(120deg, var(--accent), var(--accent-2))",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {suffix}
        </span>
      </div>
      <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-[color:var(--muted)]">
        {label}
      </span>
    </motion.div>
  );
}

const timeline = [
  {
    icon: Building2,
    title: {
      pt: "Projetos corporativos",
      en: "Corporate projects",
    },
    desc: {
      pt: "Sistemas de grande porte para empresas no Brasil e em Angola — gestão, integrações e fluxos críticos.",
      en: "Large-scale systems for companies in Brazil and Angola — management, integrations and critical workflows.",
    },
  },
  {
    icon: Boxes,
    title: {
      pt: "Sistemas de gestão",
      en: "Management systems",
    },
    desc: {
      pt: "Plataformas internas com cadastros, vendas, financeiro, estoque e relatórios em tempo real.",
      en: "Internal platforms covering records, sales, finance, inventory and real-time reports.",
    },
  },
  {
    icon: Plug,
    title: { pt: "Integrações", en: "Integrations" },
    desc: {
      pt: "APIs, ERPs e webhooks conectados de forma estável e auditável.",
      en: "APIs, ERPs and webhooks connected in a stable, auditable way.",
    },
  },
  {
    icon: ServerCog,
    title: {
      pt: "Infraestrutura & automação",
      en: "Infrastructure & automation",
    },
    desc: {
      pt: "Docker, NGINX, CI/CD e VPS — entrega contínua e ambientes confiáveis.",
      en: "Docker, NGINX, CI/CD and VPS — continuous delivery and reliable environments.",
    },
  },
  {
    icon: Gauge,
    title: {
      pt: "Performance & manutenção",
      en: "Performance & maintenance",
    },
    desc: {
      pt: "Refatoração contínua, monitoramento e melhorias mensuráveis em produção.",
      en: "Continuous refactoring, monitoring and measurable improvements in production.",
    },
  },
];

export function Experience() {
  const { language } = useLanguage();
  const labels =
    language === "pt"
      ? {
          eyebrow: "Experiência",
          headline: "Cinco anos construindo software que ajuda empresas a crescer.",
          sub: "Da arquitetura à entrega final, com participação real em projetos de Brasil e Angola.",
          metrics: [
            { v: 5, s: "+", l: "Anos de experiência" },
            { v: 10, s: "+", l: "Projetos entregues" },
            { v: 2, s: "", l: "Países atendidos" },
            { v: 99, s: "%", l: "Uptime médio" },
          ],
        }
      : {
          eyebrow: "Experience",
          headline: "Five years building software that helps companies grow.",
          sub: "From architecture to final delivery, with real involvement in projects in Brazil and Angola.",
          metrics: [
            { v: 5, s: "+", l: "Years of experience" },
            { v: 10, s: "+", l: "Projects delivered" },
            { v: 2, s: "", l: "Countries served" },
            { v: 99, s: "%", l: "Average uptime" },
          ],
        };

  return (
    <section
      id="experience"
      className="relative py-28 lg:py-40 bg-[color:var(--bg-deep)] overflow-hidden"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(60% 50% at 80% 100%, rgba(124,147,255,0.10) 0%, transparent 70%)",
        }}
      />

      <div
        className="relative mx-auto px-6 lg:px-10"
        style={{ maxWidth: "var(--max)" }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 mb-16">
          <div className="lg:col-span-3">
            <RevealOnScroll>
              <span className="eyebrow">{labels.eyebrow}</span>
              <p className="mt-6 text-[10px] font-mono tracking-widest text-[color:var(--muted-2)]">
                04 / 06
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
              <p className="mt-6 max-w-2xl text-[15px] leading-[1.8] text-[color:var(--muted)]">
                {labels.sub}
              </p>
            </RevealOnScroll>
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 pb-14 mb-14 border-b border-[color:var(--hairline)]">
          {labels.metrics.map((m, i) => (
            <Metric
              key={m.l}
              value={m.v}
              suffix={m.s}
              label={m.l}
              delay={i * 0.1}
            />
          ))}
        </div>

        {/* Timeline */}
        <StaggerContainer className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
          {timeline.map((t, i) => {
            const Icon = t.icon;
            return (
              <StaggerItem key={t.title.en}>
                <div className="relative h-full rounded-2xl border border-[color:var(--hairline)] bg-[color:var(--bg-card)] p-6 lg:p-7 transition-all duration-500 hover:border-[color:var(--hairline-strong)] hover:-translate-y-1">
                  <div className="flex items-center justify-between mb-6">
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl border border-[color:var(--hairline-strong)] bg-white/[0.03] text-[color:var(--ink)]">
                      <Icon className="size-[17px]" strokeWidth={1.5} />
                    </div>
                    <span className="font-mono text-[10px] tracking-widest text-[color:var(--muted-2)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="font-serif text-[1.05rem] text-[color:var(--ink)] mb-2 leading-snug">
                    {language === "pt" ? t.title.pt : t.title.en}
                  </h3>
                  <p className="text-[12.5px] leading-relaxed text-[color:var(--muted)]">
                    {language === "pt" ? t.desc.pt : t.desc.en}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
