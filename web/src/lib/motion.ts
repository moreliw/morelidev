"use client";
import { useSyncExternalStore } from "react";

/** Tokens de movimento — mesma escala do CSS (globals.css). */
export const MOTION = {
  micro: 0.2,
  enter: 0.6,
  section: 0.9,
  stagger: 0.06,
  ease: "power3.out",
  distance: 18,
} as const;

const query = "(prefers-reduced-motion: reduce)";

function subscribe(cb: () => void) {
  const mq = window.matchMedia(query);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

/** true quando o usuário prefere movimento reduzido (SSR: false). */
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false
  );
}
