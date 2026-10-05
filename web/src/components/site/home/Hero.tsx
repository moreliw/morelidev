"use client";
import { useEffect, useRef } from "react";
import { ArrowDown, ArrowRight } from "lucide-react";
import type { Copy } from "./types";
import { ensureGsap, gsap, ScrollTrigger } from "@/lib/gsap";
import { useCanvasScene } from "./three/useCanvasScene";
import type { HeroSceneController } from "./three/heroScene";

export function Hero({ c }: { c: Copy }) {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { ctrl, status } = useCanvasScene<HeroSceneController>(
    canvasRef,
    async (canvas, reduced) => {
      const { createHeroScene } = await import("./three/heroScene");
      return createHeroScene(canvas, { reduced });
    },
    { eager: true, rootMargin: "0px" },
  );

  useEffect(() => {
    ensureGsap();
    const section = sectionRef.current;
    if (!section) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Ponteiro → rotação do símbolo 3D (só mouse/trackpad).
    const onMove = (e: PointerEvent) => {
      ctrl.current?.setPointer(
        (e.clientX / window.innerWidth) * 2 - 1,
        (e.clientY / window.innerHeight) * 2 - 1,
      );
    };
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (fine && !reduced) window.addEventListener("pointermove", onMove, { passive: true });

    // Saída do hero: o símbolo se decompõe e o texto sobe e esmaece.
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => ctrl.current?.setScroll(self.progress),
      });
      if (!reduced) {
        // fromTo explícito: no momento da criação, os elementos de entrada
        // ainda podem estar ocultos pelo preloader.
        gsap.fromTo(
          ".hx-content",
          { yPercent: 0, opacity: 1 },
          {
            yPercent: -18,
            opacity: 0.1,
            ease: "none",
            immediateRender: false,
            scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: true },
          },
        );
        gsap.fromTo(
          ".hx-bar",
          { opacity: 1 },
          {
            opacity: 0,
            ease: "none",
            immediateRender: false,
            scrollTrigger: { trigger: section, start: "top top", end: "20% top", scrub: true },
          },
        );
      }
    }, section);

    return () => {
      window.removeEventListener("pointermove", onMove);
      ctx.revert();
    };
  }, [ctrl]);

  return (
    <section
      ref={sectionRef}
      id="inicio"
      className="hx"
      data-theme="dark"
      data-scene={status}
      aria-labelledby="hero-title"
    >
      <div className="hx-glow" aria-hidden />
      <canvas ref={canvasRef} className="hx-canvas" aria-hidden />
      {/* Sem WebGL: o símbolo estático, com o mesmo brilho. */}
      {status === "fallback" && (
        // eslint-disable-next-line @next/next/no-img-element
        <img className="hx-fallback" src="/logo-icon.svg" alt="" aria-hidden />
      )}
      <div className="hx-grain" aria-hidden />

      <div className="container-site hx-content">
        <p className="hx-tags" data-intro>
          <span>{c("Sistemas sob medida", "Custom systems")}</span>
          <span>{c("Produtos digitais", "Digital products")}</span>
          <span>{c("Sites institucionais", "Business websites")}</span>
        </p>
        <h1 id="hero-title" className="hx-title">
          <span className="hx-line">{c("Software sob medida", "Custom software")}</span>
          <span className="hx-line">
            <em>{c("para a sua empresa.", "for your business.")}</em>
          </span>
        </h1>
        <div className="hx-foot">
          <p className="hx-sub" data-intro>
            {c(
              "Sistemas, produtos digitais e sites desenvolvidos do planejamento à publicação.",
              "Systems, digital products and websites, from planning to launch.",
            )}
          </p>
          <div className="hx-ctas" data-intro>
            <a href="#contato" className="pill pill-accent" data-cursor="go">
              {c("Solicitar orçamento", "Request a quote")}
              <ArrowRight size={16} aria-hidden />
            </a>
            <a href="#trabalhos" className="pill pill-ghost" data-cursor="link">
              {c("Ver projetos", "See our work")}
            </a>
          </div>
        </div>
      </div>

      <div className="container-site hx-bar" data-intro>
        <span className="hx-status num">
          <i aria-hidden />
          {c("Disponível para novos projetos", "Available for new projects")}
        </span>
        <a
          href="#estudio"
          className="hx-scroll"
          data-cursor="link"
          aria-label={c("Ir para o conteúdo", "Go to content")}
        >
          <ArrowDown size={16} aria-hidden />
        </a>
        <span className="hx-meta num">{c("Atendimento remoto · PT / EN", "Remote · PT / EN")}</span>
      </div>
    </section>
  );
}
