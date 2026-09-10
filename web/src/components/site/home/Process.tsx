"use client";
import { useEffect, useRef } from "react";
import type { Copy } from "./types";
import { ensureGsap, gsap } from "@/lib/gsap";

export function Process({ c }: { c: Copy }) {
  const lineRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLOListElement>(null);

  const steps: [string, string, string][] = [
    ["01", c("Descobrir", "Discover"), c(
      "Entendemos o negócio antes de propor qualquer solução.",
      "We understand the business before proposing any solution.",
    )],
    ["02", c("Definir", "Define"), c(
      "Escopo, arquitetura e prioridades claras.",
      "Clear scope, architecture and priorities.",
    )],
    ["03", c("Desenhar", "Design"), c(
      "Interfaces e fluxos validados antes do código.",
      "Interfaces and flows validated before code.",
    )],
    ["04", c("Construir", "Build"), c(
      "Entregas incrementais, testadas, acompanhadas.",
      "Incremental, tested, closely tracked delivery.",
    )],
    ["05", c("Evoluir", "Evolve"), c(
      "Suporte e evolução contínua em produção.",
      "Ongoing support and evolution in production.",
    )],
  ];

  useEffect(() => {
    ensureGsap();
    const line = lineRef.current;
    const list = listRef.current;
    if (!line || !list) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      // A linha de progresso segue 1:1 a posição do scroll — não é uma
      // animação autônoma, então continua ativa mesmo com motion reduzido.
      gsap.set(line, { scaleX: 0, transformOrigin: "left center" });
      gsap.to(line, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { trigger: list, start: "top 75%", end: "bottom 65%", scrub: true },
      });
      if (!reduced) {
        gsap.from(list.querySelectorAll(".step"), {
          opacity: 0,
          y: 20,
          duration: 0.7,
          stagger: 0.1,
          scrollTrigger: { trigger: list, start: "top 82%" },
        });
      }
    }, list);
    return () => ctx.revert();
  }, []);

  return (
    <section className="process section-space" data-theme="light" aria-labelledby="process-title">
      <div className="container-site">
        <div className="process-head">
          <p className="eyebrow">{c("COMO TRABALHAMOS", "HOW WE WORK")}</p>
          <h2 id="process-title" className="h-section">
            {c("Da ideia à produção.", "From idea to production.")}
          </h2>
        </div>

        <div className="timeline">
          <span className="timeline-track" aria-hidden />
          <span className="timeline-fill" ref={lineRef} aria-hidden />
          <ol className="timeline-list" ref={listRef}>
            {steps.map(([n, title, desc]) => (
              <li className="step" key={n}>
                <span className="step-dot" aria-hidden />
                <span className="step-num num">{n}</span>
                <h3>{title}</h3>
                <p>{desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
