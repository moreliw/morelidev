"use client";
import { useLanguage } from "@/context/LanguageContext";
import type { Copy } from "./home/types";
import { Hero } from "./home/Hero";
import { Authority } from "./home/Authority";
import { Manifesto } from "./home/Manifesto";
import { Solutions } from "./home/Solutions";
import { Products } from "./home/Products";
import { Cases } from "./home/Cases";
import { Shift } from "./home/Shift";
import { Process } from "./home/Process";
import { Company } from "./home/Company";
import { CTA } from "./home/CTA";

export function HomeExperience() {
  const { language } = useLanguage();
  const c: Copy = (pt, en) => (language === "pt" ? pt : en);
  return (
    <>
      <Hero c={c} />
      <Authority c={c} />
      <Manifesto c={c} />
      <Solutions c={c} />
      <Products c={c} />
      <Cases c={c} />
      <Shift c={c} />
      <Process c={c} />
      <Company c={c} />
      <CTA c={c} />
    </>
  );
}
