"use client";
import { motion } from "motion/react";
import { useLanguage } from "@/context/LanguageContext";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/motion/StaggerContainer";

type Group = {
  label: { pt: string; en: string };
  items: string[];
};

const groups: Group[] = [
  {
    label: { pt: "Frontend", en: "Frontend" },
    items: ["React", "Next.js", "Angular", "TypeScript", "Tailwind", "Motion"],
  },
  {
    label: { pt: "Backend", en: "Backend" },
    items: ["C# / .NET", "Node.js", "PHP / Laravel", "REST", "GraphQL"],
  },
  {
    label: { pt: "Banco de dados", en: "Database" },
    items: ["SQL Server", "MySQL", "PostgreSQL", "SQLite", "Redis"],
  },
  {
    label: { pt: "Infra & DevOps", en: "Infra & DevOps" },
    items: ["Docker", "NGINX", "VPS", "GitHub Actions", "Linux"],
  },
];

export function Stack() {
  const { language } = useLanguage();
  const labels =
    language === "pt"
      ? {
          eyebrow: "Stack",
          headline: "Tecnologias que uso para entregar resultado.",
          sub: "Ferramentas escolhidas pelo que cada projeto realmente precisa — sem modismo, sem complexidade desnecessária.",
        }
      : {
          eyebrow: "Stack",
          headline: "Technologies I use to ship outcomes.",
          sub: "Tools picked for what each project actually needs — no trends, no unnecessary complexity.",
        };

  const allItems = groups.flatMap((g) => g.items);
  const rowA = allItems;
  const rowB = [...allItems].reverse();

  return (
    <section
      id="stack"
      className="relative py-28 lg:py-40 bg-[color:var(--bg)] overflow-hidden"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(50% 50% at 80% 30%, rgba(94,234,212,0.10) 0%, transparent 70%)",
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
                03 / 06
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

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {groups.map((g) => (
            <StaggerItem key={g.label.en}>
              <div className="relative h-full rounded-2xl border border-[color:var(--hairline)] bg-[color:var(--bg-card)] p-6 transition-all duration-500 hover:border-[color:var(--hairline-strong)] hover:-translate-y-0.5">
                <p className="text-[10px] tracking-[0.24em] uppercase text-[color:var(--accent)] mb-5">
                  {language === "pt" ? g.label.pt : g.label.en}
                </p>
                <ul className="flex flex-col gap-2.5">
                  {g.items.map((it) => (
                    <li
                      key={it}
                      className="flex items-center gap-2.5 text-[14px] text-[color:var(--ink-soft)]"
                    >
                      <span className="inline-block size-1 rounded-full bg-[color:var(--accent)]/60" />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Marquee rows */}
        <div className="relative -mx-6 lg:-mx-10 space-y-3">
          {[rowA, rowB].map((row, ri) => (
            <div
              key={ri}
              className="relative overflow-hidden py-4 border-y border-[color:var(--hairline)]"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 z-10"
                style={{
                  background: "linear-gradient(90deg, var(--bg), transparent)",
                }}
              />
              <div
                aria-hidden
                className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-10"
                style={{
                  background: "linear-gradient(-90deg, var(--bg), transparent)",
                }}
              />
              <motion.div
                className="flex gap-3 px-6 w-max"
                animate={{
                  x: ri === 0 ? ["0%", "-50%"] : ["-50%", "0%"],
                }}
                transition={{
                  duration: 38,
                  ease: "linear",
                  repeat: Infinity,
                }}
              >
                {[...row, ...row].map((t, i) => (
                  <span
                    key={`${t}-${i}`}
                    className="inline-flex items-center gap-2 whitespace-nowrap px-4 py-2 rounded-full border border-[color:var(--hairline)] bg-[color:var(--bg-card)] text-[13px] text-[color:var(--ink-soft)]"
                  >
                    <span className="inline-block size-1.5 rounded-full bg-gradient-to-br from-[color:var(--accent)] to-[color:var(--accent-2)]" />
                    {t}
                  </span>
                ))}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
