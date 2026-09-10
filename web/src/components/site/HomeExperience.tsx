"use client";
import { useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { ensureGsap, ScrollTrigger } from "@/lib/gsap";
import type { Copy } from "./home/types";
import { Hero } from "./home/Hero";
import { Manifesto } from "./home/Manifesto";
import { Capabilities } from "./home/Capabilities";
import { SelectedWork } from "./home/SelectedWork";
import { ProductsShowcase } from "./home/ProductsShowcase";
import { Transformation } from "./home/Transformation";
import { Process } from "./home/Process";
import { Studio } from "./home/Studio";
import { TechMarquee } from "./home/TechMarquee";
import { FinalCTA } from "./home/FinalCTA";

export function HomeExperience() {
  const { language } = useLanguage();
  const c: Copy = (pt, en) => (language === "pt" ? pt : en);

  // Várias seções mudam sua própria altura depois de montar (o track fixo
  // de Capabilities vira 400vh; fontes carregando reflow o texto). Cada
  // seção cria seus próprios ScrollTriggers no momento em que monta — antes
  // dessas mudanças acontecerem — então sem um refresh geral, os limites de
  // início/fim de tudo que vem depois de Capabilities ficam desalinhados.
  useEffect(() => {
    ensureGsap();
    const refresh = () => ScrollTrigger.refresh();
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(refresh);
    });
    document.fonts?.ready.then(refresh).catch(() => {});
    window.addEventListener("load", refresh);
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      window.removeEventListener("load", refresh);
    };
  }, []);

  return (
    <>
      <Hero c={c} />
      <Manifesto c={c} />
      <Capabilities c={c} />
      <SelectedWork c={c} />
      <ProductsShowcase c={c} />
      <Transformation c={c} />
      <Process c={c} />
      <Studio c={c} />
      <TechMarquee c={c} />
      <FinalCTA c={c} />
    </>
  );
}
