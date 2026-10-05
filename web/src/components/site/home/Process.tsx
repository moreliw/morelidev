"use client";
import { useEffect, useRef } from "react";
import type { Copy } from "./types";
import { ensureGsap, gsap } from "@/lib/gsap";

export function Process({ c }: { c: Copy }) {
  const ref = useRef<HTMLDivElement>(null);

  const steps: [string, string][] = [
    [c("Descoberta", "Discovery"), c("Levantamento do processo e dos objetivos.", "Mapping the process and goals.")],
    [c("Planejamento", "Planning"), c("Escopo, prioridades e arquitetura.", "Scope, priorities and architecture.")],
    [c("Design", "Design"), c("Fluxos e telas validados antes do desenvolvimento.", "Flows and screens validated before development.")],
    [c("Desenvolvimento", "Development"), c("Entregas incrementais e testadas.", "Incremental, tested releases.")],
    [c("Suporte", "Support"), c("Publicação, monitoramento e melhorias.", "Launch, monitoring and improvements.")],
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
              {c("Processo", "Process")}
            </p>
            <h2 id="process-title" className="h-big">
              {c("Como", "How we")} <em>{c("trabalhamos.", "work.")}</em>
            </h2>
          </div>
          <p className="sec-lead">
            {c(
              "Etapas claras e acompanhamento em todas as entregas.",
              "Clear stages and visibility on every release.",
            )}
          </p>
        </div>

        <div className="pr-line" ref={ref}>
          <span className="pr-track" aria-hidden>
            <span className="pr-fill" />
          </span>
          <ol>
            {steps.map(([title, text]) => (
              <li className="pr-step" key={title}>
                <span className="pr-dot" aria-hidden />
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
