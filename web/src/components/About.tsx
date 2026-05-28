"use client";
import { motion } from "motion/react";
import {
  Layers,
  Gauge,
  Palette,
  ServerCog,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/motion/StaggerContainer";
import { SpotlightCard } from "@/components/motion/SpotlightCard";

const pillars = [
  {
    icon: Layers,
    title: { pt: "Arquitetura sólida", en: "Solid architecture" },
    desc: {
      pt: "Bases bem desenhadas, código limpo e escolhas técnicas que envelhecem bem.",
      en: "Well-designed foundations, clean code and technical choices that age well.",
    },
  },
  {
    icon: Gauge,
    title: { pt: "Performance real", en: "Real performance" },
    desc: {
      pt: "Tempo de resposta, Core Web Vitals e fluidez perceptível pelo usuário.",
      en: "Response time, Core Web Vitals and fluidity the user can actually feel.",
    },
  },
  {
    icon: Palette,
    title: { pt: "UI/UX moderno", en: "Modern UI/UX" },
    desc: {
      pt: "Interfaces elegantes, microinterações e atenção ao detalhe visual.",
      en: "Elegant interfaces, micro-interactions and an obsession with visual detail.",
    },
  },
  {
    icon: ServerCog,
    title: { pt: "Deploy & infraestrutura", en: "Deploy & infrastructure" },
    desc: {
      pt: "Docker, CI/CD, VPS, NGINX — entrega contínua e ambientes confiáveis.",
      en: "Docker, CI/CD, VPS, NGINX — continuous delivery and reliable environments.",
    },
  },
];

export function About() {
  const { language } = useLanguage();
  const copy =
    language === "pt"
      ? {
          eyebrow: "Sobre",
          headline:
            "Software de qualidade nasce do equilíbrio entre arquitetura, performance e cuidado com cada detalhe.",
          paragraphs: [
            "Sou um Software Engineer Full Stack com mais de 5 anos de experiência projetando, construindo e mantendo aplicações web escaláveis para empresas no Brasil e em Angola.",
            "Trabalho do back-end ao front-end, da arquitetura à interface — sempre com foco em entregar produtos digitais que funcionam, performam e ajudam o negócio a crescer.",
          ],
          accentWord: "detalhe",
        }
      : {
          eyebrow: "About",
          headline:
            "Great software is born from the balance between architecture, performance and care for every detail.",
          paragraphs: [
            "I'm a Full Stack Software Engineer with 5+ years of experience designing, building and maintaining scalable web applications for companies in Brazil and Angola.",
            "I work across back-end and front-end, architecture and interface — always focused on shipping products that work, perform and help the business grow.",
          ],
          accentWord: "detail",
        };

  return (
    <section
      id="about"
      className="relative py-28 lg:py-40 bg-[color:var(--bg)] overflow-hidden"
    >
      {/* Subtle background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(60% 50% at 20% 0%, rgba(124,147,255,0.10) 0%, transparent 60%)",
        }}
      />

      <div
        className="relative mx-auto px-6 lg:px-10"
        style={{ maxWidth: "var(--max)" }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-3">
            <RevealOnScroll className="lg:sticky lg:top-32">
              <span className="eyebrow">{copy.eyebrow}</span>
              <p className="mt-6 text-[10px] font-mono tracking-widest text-[color:var(--muted-2)]">
                01 / 06
              </p>
            </RevealOnScroll>
          </div>

          <div className="lg:col-span-9">
            <h2 className="display text-[clamp(1.8rem,3.8vw,3rem)] max-w-3xl text-[color:var(--ink)]">
              {copy.headline.split(" ").map((word, i) => {
                const w = word.toLowerCase();
                const isAccent = w.includes(copy.accentWord);
                return (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0.2, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.5, delay: i * 0.025 }}
                    className={
                      "inline-block mr-[0.22em] " +
                      (isAccent
                        ? "italic text-[color:var(--accent)]"
                        : "")
                    }
                  >
                    {word}
                  </motion.span>
                );
              })}
            </h2>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
              {copy.paragraphs.map((p, i) => (
                <RevealOnScroll
                  key={i}
                  as="p"
                  delay={0.1 + i * 0.1}
                  className="text-[15px] leading-[1.8] text-[color:var(--muted)]"
                >
                  {p}
                </RevealOnScroll>
              ))}
            </div>

            {/* Pillars */}
            <StaggerContainer className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {pillars.map((p) => {
                const Icon = p.icon;
                return (
                  <StaggerItem key={p.title.en}>
                    <SpotlightCard className="h-full">
                      <div className="p-7 lg:p-8">
                        <div className="flex items-center justify-between mb-7">
                          <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl border border-[color:var(--hairline-strong)] bg-white/[0.03] text-[color:var(--ink)]">
                            <Icon className="size-[18px]" strokeWidth={1.5} />
                          </div>
                          <span className="font-mono text-[10px] tracking-widest text-[color:var(--muted-2)]">
                            {String(pillars.indexOf(p) + 1).padStart(2, "0")}
                          </span>
                        </div>
                        <h3 className="font-serif text-[1.3rem] text-[color:var(--ink)] mb-2">
                          {language === "pt" ? p.title.pt : p.title.en}
                        </h3>
                        <p className="text-[13.5px] leading-relaxed text-[color:var(--muted)]">
                          {language === "pt" ? p.desc.pt : p.desc.en}
                        </p>
                      </div>
                    </SpotlightCard>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </div>
        </div>
      </div>
    </section>
  );
}
