"use client";
import {
  Globe,
  Rocket,
  Code2,
  Layers3,
  Plug,
  Wrench,
  ArrowUpRight,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/motion/StaggerContainer";
import { SpotlightCard } from "@/components/motion/SpotlightCard";

const services = [
  {
    icon: Globe,
    title: { pt: "Sites institucionais", en: "Institutional websites" },
    desc: {
      pt: "Presença digital com identidade forte, performance e SEO bem feito.",
      en: "Strong brand presence, performance and proper SEO out of the box.",
    },
  },
  {
    icon: Rocket,
    title: { pt: "Landing pages", en: "Landing pages" },
    desc: {
      pt: "Páginas de conversão para campanhas, lançamentos e captação de leads.",
      en: "High-converting pages for campaigns, launches and lead capture.",
    },
  },
  {
    icon: Code2,
    title: { pt: "Sistemas web", en: "Web systems" },
    desc: {
      pt: "Plataformas sob medida com regras de negócio reais, autenticação e relatórios.",
      en: "Tailor-made platforms with real business rules, auth and reports.",
    },
  },
  {
    icon: Layers3,
    title: { pt: "Dashboards & backoffices", en: "Dashboards & backoffices" },
    desc: {
      pt: "Painéis administrativos claros, com métricas em tempo real e gestão completa.",
      en: "Clear admin panels with real-time metrics and full management.",
    },
  },
  {
    icon: Plug,
    title: { pt: "Integrações & automações", en: "Integrations & automation" },
    desc: {
      pt: "Conectando sistemas, APIs e ferramentas — eliminando trabalho manual.",
      en: "Connecting systems, APIs and tools — removing manual work.",
    },
  },
  {
    icon: Wrench,
    title: { pt: "Manutenção contínua", en: "Continuous maintenance" },
    desc: {
      pt: "Evolução, suporte técnico, melhorias mensais e monitoramento.",
      en: "Evolution, technical support, monthly improvements and monitoring.",
    },
  },
];

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

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <StaggerItem key={s.title.en}>
                <SpotlightCard className="h-full">
                  <div className="relative p-8 lg:p-9 h-full flex flex-col">
                    <div className="flex items-start justify-between mb-9">
                      <div className="relative inline-flex items-center justify-center w-12 h-12 rounded-xl border border-[color:var(--hairline-strong)] bg-white/[0.03] text-[color:var(--ink)] transition-all duration-500 group-hover:text-[color:var(--accent)] group-hover:border-[color:var(--accent)]/40">
                        <Icon className="size-[19px]" strokeWidth={1.5} />
                        <span
                          aria-hidden
                          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                          style={{
                            background:
                              "radial-gradient(60% 60% at 50% 50%, rgba(124,147,255,0.25), transparent 70%)",
                          }}
                        />
                      </div>
                      <span className="font-mono text-[10px] tracking-widest text-[color:var(--muted-2)]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <h3 className="font-serif text-[1.35rem] text-[color:var(--ink)] mb-3">
                      {language === "pt" ? s.title.pt : s.title.en}
                    </h3>
                    <p className="text-[13.5px] leading-relaxed text-[color:var(--muted)] mb-8 flex-1">
                      {language === "pt" ? s.desc.pt : s.desc.en}
                    </p>

                    <div className="flex items-center gap-1.5 text-[10px] tracking-[0.2em] uppercase text-[color:var(--muted)] group-hover:text-[color:var(--accent)] transition-colors">
                      {language === "pt" ? "Saber mais" : "Learn more"}
                      <ArrowUpRight className="size-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </SpotlightCard>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
