import type { Copy } from "./types";
import { ArrowRight, Check } from "lucide-react";

export function Process({ c }: { c: Copy }) {
  const steps = [
    [
      c("Entendimento", "Discovery"),
      c(
        "Ouvimos, perguntamos e mergulhamos no seu negócio, nos objetivos e nos desafios.",
        "We listen, ask questions and get to know your business, goals and challenges.",
      ),
    ],
    [
      c("Planejamento", "Planning"),
      c(
        "Definimos escopo, prioridades e um caminho claro. Você sabe o que esperar de cada etapa.",
        "We define scope, priorities and a clear path. You know what to expect at every stage.",
      ),
    ],
    [
      c("Desenvolvimento", "Development"),
      c(
        "Construímos com entregas incrementais, cuidado nos detalhes e você por perto.",
        "We build through incremental releases, attention to detail and close collaboration.",
      ),
    ],
    [
      c("Entrega e evolução", "Launch & evolution"),
      c(
        "Acompanhamos o lançamento e seguimos juntos no suporte e nas melhorias.",
        "We support the launch and stay alongside you for ongoing support and improvements.",
      ),
    ],
  ];
  return (
    <section
      id="processo"
      className="section-space process-section"
      aria-labelledby="process-title"
    >
      <div className="container-site">
        <div className="section-heading">
          <div>
            <p className="kicker">{c("COMO TRABALHAMOS", "HOW WE WORK")}</p>
            <h2 id="process-title" className="editorial-title">
              {c("Um processo claro,", "A clear process,")}
              <br />
              {c("do início ao resultado.", "from first step to results.")}
            </h2>
          </div>
          <p className="section-intro">
            {c(
              "Boa tecnologia começa com uma boa conversa. Transparência, proximidade e decisões bem fundamentadas em todas as etapas.",
              "Good technology starts with a good conversation. Transparency, close collaboration and thoughtful decisions at every step.",
            )}
          </p>
        </div>
        <ol className="process-grid">
          {steps.map(([title, text], i) => (
            <li key={title}>
              <span className="step-number">
                0{i + 1}
                <span aria-hidden>
                  {i === 3 ? <Check size={17} /> : <ArrowRight size={17} />}
                </span>
              </span>
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
