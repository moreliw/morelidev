import { Activity } from "lucide-react";
import type { Copy } from "./types";
import { PROJECTS } from "@/data/projects";

/** Faixa de autoridade — números que animam ao entrar na viewport. */
export function Authority({ c }: { c: Copy }) {
  const metrics: [string, string, string][] = [
    ["5", "+", c("anos de mercado", "years in the market")],
    ["2", "", c("produtos próprios em operação", "own products in operation")],
    [
      String(PROJECTS.length),
      "",
      c("projetos publicados", "published projects"),
    ],
    ["100", "%", c("software sob medida", "custom-built software")],
  ];
  return (
    <section className="authority" aria-label={c("Indicadores", "Key figures")}>
      <div className="container-site authority-grid">
        <p className="authority-lead" data-reveal>
          <Activity size={20} strokeWidth={1.6} aria-hidden />
          {c(
            "Tecnologia em produção, no dia a dia de quem usa.",
            "Technology in production, in the daily work of real teams.",
          )}
        </p>
        {metrics.map(([value, suffix, label], i) => (
          <div
            className="metric"
            key={label}
            data-reveal
            style={{ "--i": i } as React.CSSProperties}
          >
            <strong data-count={value} data-suffix={suffix}>
              {value}
              {suffix}
            </strong>
            <span>{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
