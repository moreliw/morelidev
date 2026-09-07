import { ArrowRight } from "lucide-react";
import type { Copy } from "./types";

export function Manifesto({ c }: { c: Copy }) {
  const steps = [
    c("Contexto", "Context"),
    c("Processos", "Processes"),
    c("Pessoas", "People"),
    c("Resultado", "Outcome"),
  ];
  return (
    <section className="manifesto section-space" aria-labelledby="manifesto-title">
      <div className="container-site manifesto-grid">
        <div>
          <p className="kicker" data-reveal>
            {c("O QUE FAZEMOS", "WHAT WE DO")}
          </p>
          <h2 id="manifesto-title" data-reveal style={{ "--i": 1 } as React.CSSProperties}>
            {c("Da ideia à operação.", "From idea to operation.")}
            <br />
            {c(
              "Construímos tecnologia que funciona no mundo real.",
              "We build technology that works in the real world.",
            )}
          </h2>
          <p
            className="manifesto-lead"
            data-reveal
            style={{ "--i": 2 } as React.CSSProperties}
          >
            {c(
              "Unimos estratégia, design e engenharia para transformar desafios de negócio em soluções digitais escaláveis, seguras e eficientes.",
              "We bring strategy, design and engineering together to turn business challenges into digital solutions that are scalable, secure and efficient.",
            )}
          </p>
        </div>
        <div className="manifesto-side">
          <p data-reveal style={{ "--i": 1 } as React.CSSProperties}>
            {c(
              "Mais do que desenvolver sistemas, ajudamos empresas a evoluir: automatizamos processos, damos visibilidade à operação e criamos novas oportunidades através da tecnologia.",
              "More than building systems, we help companies evolve: automating processes, bringing visibility to operations and creating new opportunities through technology.",
            )}
          </p>
          <a
            href="#solucoes"
            className="text-link"
            data-reveal
            style={{ "--i": 2 } as React.CSSProperties}
          >
            {c("Conheça nossas soluções", "Explore our solutions")}
            <ArrowRight size={16} aria-hidden />
          </a>
          <div
            className="manifesto-mark"
            data-reveal
            style={{ "--i": 3 } as React.CSSProperties}
            aria-hidden
          >
            {steps.map((step, i) => (
              <span className="manifesto-step" key={step}>
                <b>0{i + 1}</b>
                {step}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
