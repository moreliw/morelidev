"use client";
import { useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { ensureGsap, ScrollTrigger } from "@/lib/gsap";
import type { Copy } from "./home/types";
import { Preloader } from "./home/Preloader";
import { Hero } from "./home/Hero";
import { WordMarquee } from "./home/WordMarquee";
import { Studio } from "./home/Studio";
import { Services } from "./home/Services";
import { WorkReel } from "./home/WorkReel";
import { Products } from "./home/Products";
import { Process } from "./home/Process";
import { Reach } from "./home/Reach";
import { Contact } from "./home/Contact";
import { SectionNav } from "./home/SectionNav";

export function HomeExperience() {
  const { language } = useLanguage();
  const c: Copy = (pt, en) => (language === "pt" ? pt : en);

  // As seções fixas (serviços, projetos) mudam a altura da página depois de
  // montar e as fontes reflow o texto — sem um refresh geral, os limites
  // dos ScrollTriggers seguintes ficam desalinhados.
  useEffect(() => {
    ensureGsap();
    const refresh = () => ScrollTrigger.refresh();
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(refresh);
    });
    document.fonts?.ready.then(refresh).catch(() => {});
    window.addEventListener("load", refresh);
    window.addEventListener("md:loaded", refresh);
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      window.removeEventListener("load", refresh);
      window.removeEventListener("md:loaded", refresh);
    };
  }, []);

  return (
    <>
      <Preloader />
      <Hero c={c} />
      <WordMarquee c={c} />
      <Studio c={c} />
      <Services c={c} />
      <WorkReel c={c} />
      <Products c={c} />
      <Process c={c} />
      <Reach c={c} />
      <Contact c={c} />
      <SectionNav c={c} />
    </>
  );
}
