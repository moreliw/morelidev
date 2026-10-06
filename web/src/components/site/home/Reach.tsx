"use client";
import { useEffect, useRef } from "react";
import type { Copy } from "./types";
import { ensureGsap, gsap, ScrollTrigger } from "@/lib/gsap";
import { useCanvasScene } from "./three/useCanvasScene";
import type { GlobeController } from "./three/globeScene";

export function Reach({ c }: { c: Copy }) {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { ctrl, status } = useCanvasScene<GlobeController>(
    canvasRef,
    async (canvas, reduced) => {
      const { createGlobe } = await import("./three/globeScene");
      return createGlobe(canvas, { reduced });
    },
    { rootMargin: "600px 0px" },
  );

  useEffect(() => {
    ensureGsap();
    const section = sectionRef.current;
    if (!section) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top 75%",
        onEnter: () => ctrl.current?.setReveal(1),
      });
      if (!reduced) {
        gsap.from(".rc-reveal", {
          y: 40,
          opacity: 0,
          duration: 1,
          stagger: 0.1,
          ease: "expo.out",
          scrollTrigger: { trigger: section, start: "top 70%" },
        });
      }
    }, section);
    return () => ctx.revert();
  }, [ctrl]);

  // O globo pode terminar de carregar depois que a seção já entrou na tela.
  useEffect(() => {
    if (status !== "ready") return;
    const section = sectionRef.current;
    if (section && section.getBoundingClientRect().top < window.innerHeight * 0.75)
      ctrl.current?.setReveal(1);
  }, [status, ctrl]);

  const facts = [
    c("Contato direto com quem desenvolve", "Direct contact with the developers"),
    c("Atendimento em português e inglês", "Service in Portuguese and English"),
    c("Projetos locais e internacionais", "Local and international projects"),
  ];

  return (
    <section ref={sectionRef} id="alcance" className="rc" data-theme="dark" data-scene={status} aria-labelledby="reach-title">
      <div className="container-site rc-grid">
        <div className="rc-copy">
          <p className="kicker rc-reveal">
            {c("Atuação", "Where we work")}
          </p>
          <h2 id="reach-title" className="h-big rc-reveal">
            {c("Atendimento remoto,", "Remote service,")} <em>{c("onde você estiver.", "wherever you are.")}</em>
          </h2>
          <p className="sec-lead rc-reveal">
            {c(
              "Trabalhamos com empresas de diferentes setores, com reuniões online e acompanhamento direto.",
              "We work with companies across sectors through online meetings and direct follow-up.",
            )}
          </p>
          <ul className="rc-facts rc-reveal">
            {facts.map((fact) => (
              <li key={fact}>{fact}</li>
            ))}
          </ul>
        </div>
        <div className="rc-visual" aria-hidden>
          <canvas ref={canvasRef} className="rc-canvas" />
        </div>
      </div>
    </section>
  );
}
