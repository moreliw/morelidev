"use client";
import { gsap, ScrollTrigger } from "./gsap";

/** Verdadeiro apenas quando motion está ativo (sem reduced-motion) e há JS. */
export function motionEnabled() {
  return (
    typeof window !== "undefined" &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * Reveal padrão do site: fade + leve translateY, disparado ao entrar na
 * viewport. `stagger` distribui o atraso entre múltiplos elementos.
 */
export function revealOnScroll(
  targets: gsap.TweenTarget,
  opts: { stagger?: number; y?: number; delay?: number; start?: string } = {},
) {
  return gsap.from(targets, {
    opacity: 0,
    y: opts.y ?? 28,
    duration: 0.9,
    delay: opts.delay ?? 0,
    stagger: opts.stagger ?? 0,
    scrollTrigger: {
      trigger: Array.isArray(targets) ? targets[0] : (targets as Element),
      start: opts.start ?? "top 88%",
    },
  });
}

/**
 * Hover magnético discreto — desloca o elemento em direção ao ponteiro
 * dentro de um raio pequeno. Só ativa em ponteiro fino (mouse/trackpad).
 */
export function magnetic(el: HTMLElement, strength = 0.35) {
  if (!window.matchMedia("(pointer: fine)").matches) return () => {};
  const moveX = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3" });
  const moveY = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3" });
  const onMove = (e: PointerEvent) => {
    const rect = el.getBoundingClientRect();
    moveX((e.clientX - rect.left - rect.width / 2) * strength);
    moveY((e.clientY - rect.top - rect.height / 2) * strength);
  };
  const onLeave = () => {
    moveX(0);
    moveY(0);
  };
  el.addEventListener("pointermove", onMove);
  el.addEventListener("pointerleave", onLeave);
  return () => {
    el.removeEventListener("pointermove", onMove);
    el.removeEventListener("pointerleave", onLeave);
  };
}

export { gsap, ScrollTrigger };
