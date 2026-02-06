import { Section } from "./Section";

const items = [
  {
    role: "Tech Lead / Full Stack",
    company: "Empresa X",
    period: "2022 — Atual",
    stack: "Next.js, Node, Postgres, Docker, CI/CD",
    impact:
      "Liderança técnica em produtos SaaS; redução de TTFB em 40% e melhoria de DX com Design System.",
  },
  {
    role: "Senior Frontend Engineer",
    company: "Startup Y",
    period: "2020 — 2022",
    stack: "React, GraphQL, Vite, AWS",
    impact:
      "Implementação de arquitetura modular e testes; aumento de conversão em 25% com otimizações de UX.",
  },
];

export function Experience() {
  return (
    <Section id="experience" title="Experiência">
      <div className="relative">
        <div className="absolute left-3 top-0 bottom-0 w-px bg-zinc-200 dark:bg-zinc-800" />
        <ul className="space-y-8">
          {items.map((item, i) => (
            <li key={i} className="grid gap-2 sm:grid-cols-[24px_1fr]">
              <div className="h-2 w-2 rounded-full bg-zinc-400 mt-2" />
              <div>
                <p className="font-medium">
                  {item.role} • {item.company}
                </p>
                <p className="text-sm text-zinc-500">{item.period}</p>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                  {item.stack}
                </p>
                <p className="mt-2 text-zinc-700 dark:text-zinc-300">{item.impact}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

