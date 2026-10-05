"use client";
import { useEffect, useRef } from "react";
import type { Copy } from "./types";
import { ensureGsap, gsap } from "@/lib/gsap";

export function Process({ c }: { c: Copy }) {
  const ref = useRef<HTMLDivElement>(null);

  const steps: [string, string][] = [
    [c("Descoberta", "Discovery"), c("Entendemos o negócio, o processo e o objetivo.", "We map the business, the process and the goal.")],
    [c("Arquitetura", "Architecture"), c("Escopo, prioridades e a base técnica certa.", "Scope, priorities and the right technical base.")],
    [c("Design", "Design"), c("Fluxos e telas validados antes do código.", "Flows and screens validated before code.")],
    [c("Construção", "Build"), c("Entregas incrementais, testadas e acompanhadas.", "Incremental, tested, closely tracked deliveries.")],
    [c("Evolução", "Evolution"), c("Publicação, monitoramento e melhoria contínua.", "Launch, monitoring and continuous improvement.")],
  ];

  useEffect(() => {
    ensureGsap();
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      // A linha acompanha o scroll 1:1; os pontos acendem quando ela passa.
      const dots = gsap.utils.toArray<HTMLElement>(".pr-step");
      // --p alimenta scaleX (desktop) ou scaleY (mobile, linha vertical).
      gsap.fromTo(
        el,
        { "--p": 0 },
        {
          "--p": 1,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 75%",
            end: "bottom 55%",
            scrub: true,
            onUpdate: (self) => {
              dots.forEach((d, i) => {
                d.toggleAttribute("data-on", self.progress >= i / (dots.length - 1) - 0.02);
              });
            },
          },
        },
      );
      if (!reduced) {
        gsap.from(dots, {
          y: 30,
          opacity: 0,
          duration: 0.9,
          stagger: 0.08,
          ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      }
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section id="processo" className="pr panel-light" data-theme="light" aria-labelledby="process-title">
      <div className="container-site">
        <div className="sec-head">
          <div>
            <p className="kicker">
              <span>05</span> {c("Como trabalhamos", "How we work")}
            </p>
            <h2 id="process-title" className="h-big">
              {c("Da ideia", "From idea")} <em>{c("à produção.", "to production.")}</em>
            </h2>
          </div>
          <p className="sec-lead">
            {c(
              "Um processo curto e transparente: você acompanha cada etapa e vê o produto ganhando forma a cada entrega.",
              "A short, transparent process: you follow every stage and see the product take shape with every delivery.",
            )}
          </p>
        </div>

        <div className="pr-line" ref={ref}>
          <span className="pr-track" aria-hidden>
            <span className="pr-fill" />
          </span>
          <ol>
            {steps.map(([title, text], i) => (
              <li className="pr-step" key={title}>
                <span className="pr-dot" aria-hidden />
                <span className="pr-n">0{i + 1}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
