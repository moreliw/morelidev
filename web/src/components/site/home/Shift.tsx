import { Check, Minus } from "lucide-react";
import type { Copy } from "./types";

/** Antes × depois — a mudança que um software sob medida provoca. */
export function Shift({ c }: { c: Copy }) {
  const before = [
    c("Planilhas isoladas", "Isolated spreadsheets"),
    c("Retrabalho constante", "Constant rework"),
    c("Tarefas repetitivas", "Repetitive tasks"),
    c("Pouca visibilidade", "Little visibility"),
    c("Dificuldade para escalar", "Hard to scale"),
  ];
  const after = [
    c("Informação centralizada", "Centralised information"),
    c("Automação de processos", "Automated processes"),
    c("Indicadores em tempo real", "Real-time indicators"),
    c("Times mais produtivos", "More productive teams"),
    c("Escala com segurança", "Scale with confidence"),
  ];
  return (
    <section className="shift section-space" aria-labelledby="shift-title">
      <div className="container-site">
        <div className="shift-head">
          <div>
            <p className="kicker" data-reveal>
              {c("TRANSFORMAÇÃO", "TRANSFORMATION")}
            </p>
            <h2 id="shift-title" data-reveal style={{ "--i": 1 } as React.CSSProperties}>
              {c("Menos processo manual.", "Less manual process.")}
              <br />
              {c("Mais operação inteligente.", "More intelligent operation.")}
            </h2>
          </div>
          <p data-reveal style={{ "--i": 2 } as React.CSSProperties}>
            {c(
              "Tecnologia para eliminar o que trava e potencializar o que move o seu negócio.",
              "Technology that removes what blocks you and amplifies what moves your business.",
            )}
          </p>
        </div>
        <div className="shift-grid">
          <div className="shift-col" data-reveal>
            <p className="shift-label">{c("HOJE", "TODAY")}</p>
            <h3>{c("Processos manuais e dispersos", "Manual, scattered processes")}</h3>
            <ul className="shift-list">
              {before.map((item, i) => (
                <li key={item} style={{ "--i": i } as React.CSSProperties}>
                  <Minus size={16} strokeWidth={2} aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
            <p className="shift-note">
              {c(
                "Tempo gasto em tarefas que não geram valor.",
                "Time spent on tasks that create no value.",
              )}
            </p>
          </div>
          <div
            className="shift-col shift-col--after"
            data-reveal
            style={{ "--i": 1 } as React.CSSProperties}
          >
            <p className="shift-label">{c("COM A MORELIDEV", "WITH MORELIDEV")}</p>
            <h3>{c("Operação integrada e inteligente", "An integrated, intelligent operation")}</h3>
            <ul className="shift-list">
              {after.map((item, i) => (
                <li key={item} style={{ "--i": i } as React.CSSProperties}>
                  <Check size={16} strokeWidth={2.2} aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
            <p className="shift-note">
              {c(
                "Mais tempo para o que realmente importa.",
                "More time for what really matters.",
              )}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
