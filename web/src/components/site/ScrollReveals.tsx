"use client";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MOTION, usePrefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

/**
 * Orquestrador único de revelação por scroll (GSAP).
 * Elementos marcados com [data-reveal] começam ocultos apenas quando
 * há JS ativo (classe .js no <html>, ver globals.css) — o conteúdo
 * nunca depende de animação para existir.
 */
export function ScrollReveals() {
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const root = document.documentElement;
    if (reduced) {
      root.classList.add("reduced-motion");
      return () => root.classList.remove("reduced-motion");
    }
    root.classList.remove("reduced-motion");

    const ctx = gsap.context(() => {
      ScrollTrigger.batch("[data-reveal]", {
        start: "top 88%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: MOTION.enter,
            ease: MOTION.ease,
            stagger: MOTION.stagger,
            overwrite: true,
            clearProps: "transform",
          }),
      });
    });

    // Recalcula posições depois de fontes e imagens carregarem.
    const refresh = () => ScrollTrigger.refresh();
    if (document.readyState === "complete") refresh();
    else window.addEventListener("load", refresh, { once: true });
    document.fonts?.ready.then(refresh).catch(() => {});

    return () => {
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, [reduced]);

  return null;
}
