"use client";
import { useEffect, useRef } from "react";
import { STACK } from "@/content/site";
import type { Copy } from "./types";
import { ensureGsap, gsap } from "@/lib/gsap";
import { getLenis } from "../motion/SmoothScroll";

/** Marquee infinito, com a velocidade sutilmente ligada à velocidade do scroll. */
export function TechMarquee({ c }: { c: Copy }) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ensureGsap();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const track = trackRef.current;
    if (!track || reduced) return;

    // Duplica o conteúdo uma única vez para o loop ficar contínuo — a
    // cópia é decorativa, por isso sai da árvore de acessibilidade.
    const clone = track.cloneNode(true) as HTMLElement;
    clone.setAttribute("aria-hidden", "true");
    track.parentElement?.appendChild(clone);

    const tween = gsap.to([track, clone], {
      xPercent: -100,
      duration: 32,
      ease: "none",
      repeat: -1,
    });

    const lenis = getLenis();
    const unsubscribe = lenis
      ? lenis.on("scroll", () => {
          const speed = Math.min(Math.abs(lenis.velocity) * 0.06, 1.6);
          tween.timeScale(1 + speed);
        })
      : null;

    return () => {
      tween.kill();
      unsubscribe?.();
      clone.remove();
    };
  }, []);

  return (
    <section className="marquee-band" data-theme="dark" aria-label={c("Tecnologias", "Technologies")}>
      <div className="marquee-viewport">
        <div className="marquee-track" ref={trackRef}>
          {STACK.map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
