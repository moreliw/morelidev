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

  const stats: [string, string][] = [
    ["5+", c("anos construindo software em produção", "years building production software")],
    ["PT · EN", c("atendimento em português e inglês", "service in Portuguese and English")],
    ["100%", c("remoto, com comunicação direta", "remote, with direct communication")],
  ];

  return (
    <section ref={sectionRef} id="alcance" className="rc" data-theme="dark" data-scene={status} aria-labelledby="reach-title">
      <div className="container-site rc-grid">
        <div className="rc-copy">
          <p className="kicker rc-reveal">
            <span>06</span> {c("Alcance", "Reach")}
          </p>
          <h2 id="reach-title" className="h-big rc-reveal">
            {c("Conectar ideias.", "Connecting ideas.")} <em>{c("Entregar sistemas.", "Shipping systems.")}</em>
          </h2>
          <p className="sec-lead rc-reveal">
            {c(
              "Um estúdio remoto que trabalha lado a lado com empresas de diferentes setores — sem intermediários entre quem decide e quem constrói.",
              "A remote studio working side by side with companies across different sectors — no middlemen between who decides and who builds.",
            )}
          </p>
          <dl className="rc-stats rc-reveal">
            {stats.map(([value, label]) => (
              <div key={value}>
                <dt>{value}</dt>
                <dd>{label}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="rc-visual" aria-hidden>
          <canvas ref={canvasRef} className="rc-canvas" />
          <span className="rc-chip num">
            <i /> {c("Projetos conectados", "Connected projects")}
          </span>
        </div>
      </div>
    </section>
  );
}
