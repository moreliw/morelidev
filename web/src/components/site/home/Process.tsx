import type { Copy } from "./types";

export function Process({ c }: { c: Copy }) {
  const steps = [
    [
      c("Descoberta", "Discovery"),
      c(
        "Entendemos o contexto, os processos e os objetivos.",
        "We map the context, processes and goals.",
      ),
    ],
    [
      c("Estratégia", "Strategy"),
      c(
        "Definimos escopo, arquitetura e o caminho até o valor.",
        "We define scope, architecture and the path to value.",
      ),
    ],
    [
      c("Design", "Design"),
      c(
        "Transformamos decisões em interfaces claras.",
        "We turn decisions into clear interfaces.",
      ),
    ],
    [
      c("Desenvolvimento", "Development"),
      c(
        "Construímos com entregas incrementais e transparência.",
        "We build with incremental delivery and transparency.",
      ),
    ],
    [
      c("Evolução", "Evolution"),
      c(
        "Acompanhamos, otimizamos e escalamos com você.",
        "We monitor, optimise and scale alongside you.",
      ),
    ],
  ];
  return (
    <section
      id="processo"
      className="process section-space"
      aria-labelledby="process-title"
    >
      <div className="container-site">
        <div className="process-head">
          <div>
            <p className="kicker" data-reveal>
              {c("COMO TRABALHAMOS", "HOW WE WORK")}
            </p>
            <h2
              id="process-title"
              data-reveal
              style={{ "--i": 1 } as React.CSSProperties}
            >
              {c(
                "Do primeiro problema à solução em produção.",
                "From the first problem to software in production.",
              )}
            </h2>
          </div>
          <p data-reveal style={{ "--i": 2 } as React.CSSProperties}>
            {c(
              "Um processo claro, colaborativo e focado em resultados reais.",
              "A clear, collaborative process focused on real results.",
            )}
          </p>
        </div>
        <ol className="timeline" data-progress>
          {steps.map(([title, text], i) => (
            <li className="step" key={title} style={{ "--i": i } as React.CSSProperties}>
              <small>0{i + 1}</small>
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
