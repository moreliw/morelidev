"use client";
import { useEffect, useRef } from "react";
import type { Copy } from "./types";
import { ensureGsap, gsap } from "@/lib/gsap";
import { getLenis } from "../motion/SmoothScroll";

/**
 * Faixa de palavras em loop — grotesk e itálico alternados. Acelera com a
 * velocidade do scroll e inverte o sentido quando o usuário sobe a página.
 */
export function WordMarquee({ c }: { c: Copy }) {
  const trackRef = useRef<HTMLDivElement>(null);

  const words = [
    c("Sistemas", "Systems"),
    c("Produtos digitais", "Digital products"),
    "SaaS",
    c("Sites", "Websites"),
    c("Automações", "Automation"),
    c("Integrações", "Integrations"),
    "Dashboards",
    c("Aplicativos", "Apps"),
  ];

  // Reinicia só quando o idioma muda (a cópia do loop precisa das novas palavras).
  const key = words.join("|");
  useEffect(() => {
    ensureGsap();
    const track = trackRef.current;
    if (!track || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Uma cópia decorativa garante o loop contínuo.
    const clone = track.cloneNode(true) as HTMLElement;
    clone.setAttribute("aria-hidden", "true");
    track.parentElement?.appendChild(clone);

    const tween = gsap.to([track, clone], {
      xPercent: -100,
      duration: 38,
      ease: "none",
      repeat: -1,
    });

    let dir = 1;
    const lenis = getLenis();
    const off = lenis?.on("scroll", () => {
      const v = lenis.velocity;
      if (Math.abs(v) > 0.4) dir = v > 0 ? 1 : -1;
      gsap.to(tween, {
        timeScale: dir * (1 + Math.min(Math.abs(v) * 0.08, 3)),
        duration: 0.4,
        overwrite: true,
      });
    });

    return () => {
      tween.kill();
      off?.();
      clone.remove();
    };
  }, [key]);

  return (
    <section className="wm" data-theme="dark" aria-label={c("O que fazemos", "What we do")}>
      <div className="wm-viewport">
        <div className="wm-track" ref={trackRef}>
          {words.map((w, i) => (
            <span key={w} className="wm-item">
              <span className={i % 2 ? "wm-word wm-word--strong" : "wm-word"}>{w}</span>
              <span className="wm-dot" aria-hidden />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
