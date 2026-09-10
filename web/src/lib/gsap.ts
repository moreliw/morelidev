"use client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

/**
 * Registro único dos plugins GSAP usados no site.
 * Import este módulo (não "gsap" direto) em qualquer componente que
 * anime — garante que ScrollTrigger/SplitText estejam prontos antes
 * de qualquer .from()/.to()/scrollTrigger ser criado.
 */
let registered = false;
export function ensureGsap() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger, SplitText);
  gsap.defaults({ ease: "cubic-bezier(0.22, 1, 0.36, 1)" });
  registered = true;
}

export { gsap, ScrollTrigger, SplitText };
