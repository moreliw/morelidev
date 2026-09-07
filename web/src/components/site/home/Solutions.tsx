"use client";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import type { Copy } from "./types";

/**
 * Acordeão horizontal no desktop, empilhado no mobile.
 * Abre no hover e no foco — sem depender de clique.
 */
export function Solutions({ c }: { c: Copy }) {
  const [open, setOpen] = useState(0);
  const items = [
    {
      title: c("Produtos digitais & SaaS", "Digital products & SaaS"),
      text: c(
        "Da ideia ao mercado. Produtos digitais pensados para gerar valor e escalar.",
        "From idea to market. Digital products designed to create value and scale.",
      ),
      points: [
        c("Descoberta e definição de MVP", "Discovery and MVP definition"),
        c("Arquitetura preparada para escala", "Architecture ready to scale"),
        c("Evolução contínua do produto", "Continuous product evolution"),
      ],
      bar: "78%",
    },
    {
      title: c("Sistemas sob medida", "Custom systems"),
      text: c(
        "Soluções desenhadas para processos e operações que não cabem em software de prateleira.",
        "Solutions designed for processes and operations that off-the-shelf software cannot handle.",
      ),
      points: [
        c("Processos mapeados com o time", "Processes mapped with your team"),
        c("Integração com o que já existe", "Integration with what already exists"),
        c("Controle e visibilidade da operação", "Control and visibility of operations"),
      ],
      bar: "64%",
    },
    {
      title: c("Websites premium", "Premium websites"),
      text: c(
        "Sites institucionais e experiências digitais que posicionam a marca com clareza.",
        "Corporate websites and digital experiences that position your brand with clarity.",
      ),
      points: [
        c("Narrativa e direção visual", "Narrative and visual direction"),
        c("Performance e SEO técnico", "Performance and technical SEO"),
        c("Conteúdo fácil de manter", "Content that is easy to maintain"),
      ],
      bar: "92%",
    },
    {
      title: c("Automações & integrações", "Automation & integrations"),
      text: c(
        "Conectamos sistemas, pessoas e dados para eliminar o trabalho repetitivo.",
        "We connect systems, people and data to eliminate repetitive work.",
      ),
      points: [
        c("APIs, ERPs e pagamentos", "APIs, ERPs and payments"),
        c("Fluxos automatizados ponta a ponta", "End-to-end automated workflows"),
        c("Dados consolidados em um lugar", "Data consolidated in one place"),
      ],
      bar: "71%",
    },
  ];
  return (
    <section
      id="solucoes"
      className="solutions section-space"
      aria-labelledby="solutions-title"
    >
      <div className="container-site">
        <div className="solutions-head">
          <div>
            <p className="kicker" data-reveal>
              {c("SOLUÇÕES", "SOLUTIONS")}
            </p>
            <h2
              id="solutions-title"
              data-reveal
              style={{ "--i": 1 } as React.CSSProperties}
            >
              {c("Tecnologia para desafios reais.", "Technology for real challenges.")}
            </h2>
          </div>
          <p data-reveal style={{ "--i": 2 } as React.CSSProperties}>
            {c(
              "Quatro frentes de trabalho, um mesmo compromisso: menos ruído entre a necessidade do negócio e o que chega à produção.",
              "Four areas of work, one commitment: less noise between the business need and what actually reaches production.",
            )}
          </p>
        </div>
      </div>
      <div className="container-site">
        <div className="sol-list" data-reveal>
          {items.map((item, i) => (
            <button
              type="button"
              className="sol-item"
              key={item.title}
              data-open={open === i}
              aria-expanded={open === i}
              onMouseEnter={() => setOpen(i)}
              onFocus={() => setOpen(i)}
              onClick={() => setOpen(i)}
            >
              <span className="sol-num">0{i + 1}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <span className="sol-reveal">
                <span>
                  <span className="sol-mini">
                    {item.points.map((point) => (
                      <span key={point}>{point}</span>
                    ))}
                    <span
                      className="sol-bar"
                      style={{ "--w": item.bar } as React.CSSProperties}
                      aria-hidden
                    >
                      <i />
                    </span>
                  </span>
                </span>
              </span>
              <span className="sol-more">
                {c("Saiba mais", "Learn more")}
                <ArrowRight size={15} aria-hidden />
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
