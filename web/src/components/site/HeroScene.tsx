"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/motion";

// Three.js só entra depois do conteúdo essencial, via dynamic import.
const HeroSceneCanvas = dynamic(() => import("./HeroSceneCanvas"), {
  ssr: false,
});

function webglAvailable(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

/**
 * Visual do hero: fallback estático em CSS sempre presente (também é o
 * estado sem JS/sem WebGL); a cena 3D é carregada em idle por cima.
 */
export function HeroScene() {
  const reduced = usePrefersReducedMotion();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Em telas pequenas fica apenas o fallback estático — a cena mal
    // aparece atrás do texto e o custo de JS não se justifica no mobile.
    if (window.innerWidth < 768) return;
    if (!webglAvailable()) return;
    const hasIdle = typeof window.requestIdleCallback === "function";
    const idle = hasIdle
      ? window.requestIdleCallback(() => setReady(true), { timeout: 2000 })
      : window.setTimeout(() => setReady(true), 350);
    return () => {
      if (hasIdle) window.cancelIdleCallback(idle);
      else window.clearTimeout(idle);
    };
  }, []);

  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      <div className="hero-fallback absolute inset-0" />
      {ready && <HeroSceneCanvas reducedMotion={reduced} />}
    </div>
  );
}
