"use client";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  AnimatePresence,
} from "motion/react";
import { useRef, useState, useEffect } from "react";
import {
  Search,
  Pencil,
  Monitor,
  Server,
  Rocket,
  HeartHandshake,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";

const steps = [
  {
    id: 1,
    icon: Search,
    title: { pt: "Diagnóstico do problema", en: "Problem diagnosis" },
    desc: {
      pt: "Antes de qualquer linha de código, eu entendo o seu negócio, os seus processos e o que realmente precisa ser resolvido. Sem suposições.",
      en: "Before any line of code, I understand your business, your processes and what really needs to be solved. No assumptions.",
    },
    detail: {
      pt: "Reunião de alinhamento, levantamento de requisitos, mapeamento de processos e definição do escopo com você.",
      en: "Alignment meeting, requirements gathering, process mapping and scope definition with you.",
    },
    color: "var(--accent)",
  },
  {
    id: 2,
    icon: Pencil,
    title: { pt: "Prototipação da solução", en: "Solution prototyping" },
    desc: {
      pt: "Estruturo a arquitetura da solução e apresento protótipos navegáveis antes de começar a desenvolver. Você aprova, ajusta e só então avançamos.",
      en: "I structure the solution architecture and present navigable prototypes before development starts. You approve, adjust, and then we move forward.",
    },
    detail: {
      pt: "Wireframes, arquitetura de banco, fluxos de tela e definição da stack mais adequada ao projeto.",
      en: "Wireframes, database architecture, screen flows and definition of the most suitable stack for the project.",
    },
    color: "#a78bfa",
  },
  {
    id: 3,
    icon: Monitor,
    title: { pt: "Desenvolvimento da interface", en: "Interface development" },
    desc: {
      pt: "Começo pelo front-end: componentes reutilizáveis, responsividade, animações fluidas e fidelidade absoluta ao que foi prototipado.",
      en: "I start with the front-end: reusable components, responsiveness, fluid animations and absolute fidelity to the prototype.",
    },
    detail: {
      pt: "React, Next.js, Angular, Tailwind — UI/UX de alto nível com foco em performance e acessibilidade.",
      en: "React, Next.js, Angular, Tailwind — high-level UI/UX focused on performance and accessibility.",
    },
    color: "var(--accent-2)",
  },
  {
    id: 4,
    icon: Server,
    title: { pt: "Backend, banco & integrações", en: "Backend, DB & integrations" },
    desc: {
      pt: "Construo a API, estruturo o banco de dados e conecto todas as integrações necessárias: pagamentos, notificações, ERPs, automações.",
      en: "I build the API, structure the database and connect all necessary integrations: payments, notifications, ERPs, automations.",
    },
    detail: {
      pt: ".NET, Laravel, Node.js, SQL Server, PostgreSQL, MySQL — APIs REST documentadas e testadas.",
      en: ".NET, Laravel, Node.js, SQL Server, PostgreSQL, MySQL — documented and tested REST APIs.",
    },
    color: "var(--accent)",
  },
  {
    id: 5,
    icon: Rocket,
    title: { pt: "Deploy, testes & performance", en: "Deploy, testing & performance" },
    desc: {
      pt: "Antes de ir ao ar, o sistema passa por testes funcionais, de performance e segurança. O deploy é feito em ambiente controlado com rollback garantido.",
      en: "Before going live, the system goes through functional, performance and security tests. Deployment is done in a controlled environment with guaranteed rollback.",
    },
    detail: {
      pt: "Docker, NGINX, CI/CD, VPS — deploy automatizado, HTTPS, backups e monitoramento desde o primeiro dia.",
      en: "Docker, NGINX, CI/CD, VPS — automated deploy, HTTPS, backups and monitoring from day one.",
    },
    color: "#a78bfa",
  },
  {
    id: 6,
    icon: HeartHandshake,
    title: { pt: "Suporte & evolução contínua", en: "Support & continuous evolution" },
    desc: {
      pt: "Entrega não é o fim. Fico disponível para suporte, manutenção, novas funcionalidades e evolução do sistema conforme o seu negócio cresce.",
      en: "Delivery is not the end. I stay available for support, maintenance, new features and system evolution as your business grows.",
    },
    detail: {
      pt: "Planos mensais, atendimento por WhatsApp/e-mail, relatórios de uso e roadmap de melhorias contínuas.",
      en: "Monthly plans, support via WhatsApp/email, usage reports and continuous improvement roadmap.",
    },
    color: "var(--accent-2)",
  },
];

function StepCard({
  step,
  language,
  isActive,
}: {
  step: (typeof steps)[0];
  language: "pt" | "en";
  isActive: boolean;
}) {
  const Icon = step.icon;
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, x: 30 }}
      animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0.3, x: 0 }}
      transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
      className={
        "rounded-2xl border p-6 lg:p-8 transition-colors duration-500 " +
        (isActive
          ? "border-[color:var(--hairline-strong)] bg-[color:var(--bg-card)]"
          : "border-[color:var(--hairline)] bg-transparent")
      }
    >
      <div className="flex items-center gap-3 mb-5">
        <div
          className="inline-flex items-center justify-center w-10 h-10 rounded-xl border border-[color:var(--hairline-strong)] bg-white/[0.03] transition-all duration-500"
          style={isActive ? { color: step.color, borderColor: `${step.color}40` } : { color: "var(--muted)" }}
        >
          <Icon className="size-[17px]" strokeWidth={1.5} />
        </div>
        <span
          className="text-[10px] font-medium tracking-[0.24em] uppercase transition-colors duration-500"
          style={isActive ? { color: step.color } : { color: "var(--muted-2)" }}
        >
          {language === "pt" ? "Etapa" : "Step"} {String(step.id).padStart(2, "0")}
        </span>
      </div>

      <h3 className="font-serif text-[1.3rem] text-[color:var(--ink)] mb-3 leading-snug">
        {language === "pt" ? step.title.pt : step.title.en}
      </h3>
      <p className="text-[14px] leading-[1.8] text-[color:var(--muted)] mb-5">
        {language === "pt" ? step.desc.pt : step.desc.en}
      </p>

      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={reduced ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
            className="overflow-hidden"
          >
            <div className="pt-4 border-t border-[color:var(--hairline)]">
              <p className="text-[12px] leading-relaxed text-[color:var(--muted-2)] font-mono">
                {language === "pt" ? step.detail.pt : step.detail.en}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function StickyProcess() {
  const { language } = useLanguage();
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.1", "end 0.9"],
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      const idx = Math.min(
        steps.length - 1,
        Math.floor(v * steps.length)
      );
      setActiveStep(idx);
    });
    return unsubscribe;
  }, [scrollYProgress]);

  const progressHeight = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", "100%"]
  );

  const labels =
    language === "pt"
      ? {
          eyebrow: "Processo",
          headline: "Como eu trabalho — do problema ao produto.",
          sub: "Cada projeto segue um processo claro, com etapas definidas, comunicação constante e entregas que fazem sentido para o seu negócio.",
        }
      : {
          eyebrow: "Process",
          headline: "How I work — from problem to product.",
          sub: "Each project follows a clear process with defined stages, constant communication and deliveries that make sense for your business.",
        };

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative py-28 lg:py-40 bg-[color:var(--bg)] overflow-hidden"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(50% 60% at 20% 50%, rgba(167,139,250,0.08) 0%, transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 grid-bg grid-bg-fade opacity-20"
      />

      <div
        className="relative mx-auto px-6 lg:px-10"
        style={{ maxWidth: "var(--max)" }}
      >
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 mb-16 lg:mb-24">
          <div className="lg:col-span-3">
            <RevealOnScroll>
              <span className="eyebrow">{labels.eyebrow}</span>
              <p className="mt-6 text-[10px] font-mono tracking-widest text-[color:var(--muted-2)]">
                03.5 / 06
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
                {labels.sub}
              </p>
            </RevealOnScroll>
          </div>
        </div>

        {/* Main layout: left sticky + right steps */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left sticky panel */}
          <div className="hidden lg:block lg:col-span-4">
            <div className="sticky top-32">
              {/* Step number + title */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={reduced ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
                >
                  <div
                    className="font-serif text-[6rem] lg:text-[7rem] leading-none tracking-tight select-none"
                    style={{
                      background: `linear-gradient(160deg, ${steps[activeStep].color}, transparent 80%)`,
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      opacity: 0.6,
                    }}
                  >
                    {String(steps[activeStep].id).padStart(2, "0")}
                  </div>
                  <h3 className="mt-3 font-serif text-[1.4rem] text-[color:var(--ink)] leading-snug">
                    {language === "pt"
                      ? steps[activeStep].title.pt
                      : steps[activeStep].title.en}
                  </h3>
                </motion.div>
              </AnimatePresence>

              {/* Progress bar */}
              <div className="mt-10 relative h-[160px] flex items-stretch gap-4">
                {/* vertical track */}
                <div className="relative w-[1px] bg-[color:var(--hairline)]">
                  <motion.div
                    className="absolute top-0 left-0 w-full rounded-full"
                    style={{
                      height: progressHeight,
                      background:
                        "linear-gradient(180deg, var(--accent), var(--accent-2))",
                    }}
                  />
                </div>

                {/* step dots */}
                <div className="flex flex-col justify-between py-0.5">
                  {steps.map((s, i) => (
                    <div
                      key={s.id}
                      className="flex items-center gap-2.5"
                    >
                      <motion.div
                        className="w-1.5 h-1.5 rounded-full transition-all duration-500"
                        style={{
                          backgroundColor:
                            i <= activeStep ? steps[i].color : "var(--muted-3)",
                          scale: i === activeStep ? 1.5 : 1,
                        }}
                      />
                      <span
                        className="text-[11px] tracking-[0.14em] transition-colors duration-300"
                        style={{
                          color:
                            i === activeStep
                              ? "var(--ink-soft)"
                              : i < activeStep
                              ? "var(--muted)"
                              : "var(--muted-3)",
                        }}
                      >
                        {language === "pt" ? s.title.pt : s.title.en}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right scrollable steps */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            {steps.map((step, i) => (
              <StepCard
                key={step.id}
                step={step}
                language={language}
                isActive={i === activeStep}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
