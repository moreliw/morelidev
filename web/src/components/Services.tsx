"use client";
import {
  Globe,
  Rocket,
  Code2,
  Layers3,
  Plug,
  Wrench,
  Brain,
  RefreshCw,
  ArrowUpRight,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useLanguage } from "@/context/LanguageContext";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { SpotlightCard } from "@/components/motion/SpotlightCard";

const services = [
  {
    id: "systems",
    icon: Code2,
    size: "featured",
    title: { pt: "Sistemas web sob medida", en: "Custom web systems" },
    desc: {
      pt: "Plataformas internas, portais e aplicações com regras de negócio reais, autenticação robusta e relatórios em tempo real.",
      en: "Internal platforms, portals and apps with real business rules, robust auth and real-time reports.",
    },
    accent: "var(--accent)",
  },
  {
    id: "dashboards",
    icon: Layers3,
    size: "normal",
    title: { pt: "Dashboards & backoffices", en: "Dashboards & backoffices" },
    desc: {
      pt: "Painéis com métricas em tempo real, filtros avançados e gestão completa.",
      en: "Panels with real-time metrics, advanced filters and full management.",
    },
    accent: "var(--accent-2)",
  },
  {
    id: "sites",
    icon: Globe,
    size: "normal",
    title: { pt: "Sites institucionais", en: "Institutional websites" },
    desc: {
      pt: "Presença digital com identidade forte, performance e SEO técnico.",
      en: "Strong brand presence, performance and technical SEO out of the box.",
    },
    accent: "var(--accent)",
  },
  {
    id: "automations",
    icon: Plug,
    size: "normal",
    title: { pt: "Integrações & automações", en: "Integrations & automation" },
    desc: {
      pt: "Conectando sistemas, APIs e ferramentas — eliminando trabalho manual.",
      en: "Connecting systems, APIs and tools — removing manual work.",
    },
    accent: "var(--accent-2)",
  },
  {
    id: "saas",
    icon: Rocket,
    size: "normal",
    title: { pt: "Plataformas SaaS", en: "SaaS platforms" },
    desc: {
      pt: "Produtos digitais multiusuário, com planos, billing e onboarding escalável.",
      en: "Multi-user digital products with plans, billing and scalable onboarding.",
    },
    accent: "#a78bfa",
  },
  {
    id: "ai",
    icon: Brain,
    size: "wide",
    title: { pt: "IA aplicada a processos", en: "AI applied to processes" },
    desc: {
      pt: "Leitura de documentos, extração de dados, análise automatizada e chatbots contextuais integrados ao seu sistema.",
      en: "Document reading, data extraction, automated analysis and contextual chatbots integrated into your system.",
    },
    accent: "#a78bfa",
  },
  {
    id: "landing",
    icon: Globe,
    size: "normal",
    title: { pt: "Landing pages", en: "Landing pages" },
    desc: {
      pt: "Páginas de conversão para campanhas, lançamentos e captação de leads.",
      en: "High-converting pages for campaigns, launches and lead capture.",
    },
    accent: "var(--accent)",
  },
  {
    id: "maintenance",
    icon: RefreshCw,
    size: "normal",
    title: { pt: "Modernização de sistemas", en: "System modernization" },
    desc: {
      pt: "Refatoração de sistemas legados, migração de stack e melhoria de performance.",
      en: "Legacy system refactoring, stack migration and performance improvement.",
    },
    accent: "var(--accent-2)",
  },
];

function BentoCard({
  service,
  language,
  index,
}: {
  service: (typeof services)[0];
  language: "pt" | "en";
  index: number;
}) {
  const reduced = useReducedMotion();
  const Icon = service.icon;

  const colClass =
    service.size === "featured"
      ? "col-span-1 md:col-span-2 row-span-2"
      : service.size === "wide"
      ? "col-span-1 md:col-span-2"
      : "col-span-1";

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.7,
        delay: index * 0.07,
        ease: [0.2, 0.8, 0.2, 1],
      }}
      className={colClass}
    >
      <SpotlightCard className="h-full">
        <div
          className={
            "relative p-7 lg:p-8 h-full flex flex-col " +
            (service.size === "featured" ? "min-h-[260px]" : "")
          }
        >
          {/* accent glow behind icon */}
          <div
            aria-hidden
            className="absolute top-0 right-0 w-48 h-48 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            style={{
              background: `radial-gradient(circle at 100% 0%, ${service.accent}22 0%, transparent 70%)`,
            }}
          />

          <div className="flex items-start justify-between mb-6">
            <div
              className="relative inline-flex items-center justify-center w-12 h-12 rounded-xl border border-[color:var(--hairline-strong)] bg-white/[0.03] transition-all duration-500 group-hover:scale-110"
              style={{ color: "var(--ink)" }}
            >
              <Icon
                className="size-[19px] transition-colors duration-500 group-hover:text-current"
                strokeWidth={1.5}
                style={{
                  color: "inherit",
                }}
              />
              <span
                aria-hidden
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(60% 60% at 50% 50%, ${service.accent}44, transparent 70%)`,
                }}
              />
            </div>
            <ArrowUpRight
              className="size-4 text-[color:var(--muted-2)] opacity-0 group-hover:opacity-100 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-500"
            />
          </div>

          <div className="flex-1">
            <h3
              className={
                "font-serif text-[color:var(--ink)] mb-3 leading-snug " +
                (service.size === "featured"
                  ? "text-[1.6rem] lg:text-[1.8rem]"
                  : "text-[1.2rem]")
              }
            >
              {language === "pt" ? service.title.pt : service.title.en}
            </h3>
            <p
              className={
                "leading-relaxed text-[color:var(--muted)] " +
                (service.size === "featured" ? "text-[14px]" : "text-[13px]")
              }
            >
              {language === "pt" ? service.desc.pt : service.desc.en}
            </p>
          </div>

          {service.size === "featured" && (
            <div className="mt-8 pt-6 border-t border-[color:var(--hairline)]">
              <div className="flex flex-wrap gap-2">
                {["Angular", ".NET", "React", "Next.js", "Laravel"].map((t) => (
                  <span
                    key={t}
                    className="text-[10px] tracking-[0.16em] uppercase px-2.5 py-1 rounded-full border border-[color:var(--hairline)] text-[color:var(--muted)] bg-white/[0.02]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* bottom shimmer line on hover */}
          <span
            aria-hidden
            className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full rounded-b-2xl transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
            style={{
              background: `linear-gradient(90deg, ${service.accent}, transparent)`,
            }}
          />
        </div>
      </SpotlightCard>
    </motion.div>
  );
}

export function Services() {
  const { language } = useLanguage();
  const labels =
    language === "pt"
      ? {
          eyebrow: "Serviços",
          headline: "O que eu construo — com método e profundidade.",
          subline:
            "Cada projeto começa entendendo o seu problema e termina com um produto que funciona, performa e cresce com você.",
        }
      : {
          eyebrow: "Services",
          headline: "What I build — with depth and method.",
          subline:
            "Every project starts by understanding your problem and ends with a product that works, performs and grows with you.",
        };

  return (
    <section
      id="services"
      className="relative py-28 lg:py-40 bg-[color:var(--bg-deep)] overflow-hidden"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 grid-bg grid-bg-fade opacity-30"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[40vmax] w-[80vmax] rounded-full"
        style={{
          background:
            "radial-gradient(ellipse, rgba(124,147,255,0.12), transparent 60%)",
          filter: "blur(60px)",
        }}
      />

      <div
        className="relative mx-auto px-6 lg:px-10"
        style={{ maxWidth: "var(--max)" }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 mb-16 lg:mb-20">
          <div className="lg:col-span-3">
            <RevealOnScroll>
              <span className="eyebrow">{labels.eyebrow}</span>
              <p className="mt-6 text-[10px] font-mono tracking-widest text-[color:var(--muted-2)]">
                02 / 06
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
              <p className="mt-6 text-[15px] leading-[1.8] text-[color:var(--muted)] max-w-2xl">
                {labels.subline}
              </p>
            </RevealOnScroll>
          </div>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-auto">
          {/* Row 1: featured (2 cols, 2 rows) + 2 normal cards stacked */}
          <div className="lg:col-span-2 lg:row-span-2 h-full">
            <BentoCard service={services[0]} language={language} index={0} />
          </div>
          <BentoCard service={services[1]} language={language} index={1} />
          <BentoCard service={services[2]} language={language} index={2} />

          {/* Row 2 continuation (2 normal cards alongside featured) */}
          <BentoCard service={services[3]} language={language} index={3} />
          <BentoCard service={services[4]} language={language} index={4} />

          {/* Row 3: wide card (2 cols) + 2 normal cards */}
          <div className="lg:col-span-2">
            <BentoCard service={services[5]} language={language} index={5} />
          </div>
          <BentoCard service={services[6]} language={language} index={6} />
          <BentoCard service={services[7]} language={language} index={7} />
        </div>
      </div>
    </section>
  );
}
