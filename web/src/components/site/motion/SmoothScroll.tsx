"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import { ensureGsap, gsap, ScrollTrigger } from "@/lib/gsap";

let lenisInstance: Lenis | null = null;

/** Lido pelo marquee de tecnologias para acelerar levemente com a velocidade do scroll. */
export function getLenis() {
  return lenisInstance;
}

/**
 * Rolagem suave (Lenis) sincronizada ao ticker do GSAP — é o que faz o
 * ScrollTrigger e o Lenis concordarem sobre a posição de scroll a cada
 * frame. Não renderiza nada; desligado inteiramente se o usuário pede
 * movimento reduzido, ou em touch (a rolagem nativa já é ótima ali).
 */
export function SmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const touch = window.matchMedia("(pointer: coarse)").matches;
    if (reduced || touch) return;

    ensureGsap();
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      syncTouch: false,
      autoRaf: false,
    });
    lenisInstance = lenis;
    document.documentElement.dataset.lenis = "on";

    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisInstance = null;
      delete document.documentElement.dataset.lenis;
    };
  }, []);

  return null;
}
