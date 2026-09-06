"use client";
import { useLanguage } from "@/context/LanguageContext";
import type { Copy } from "./home/types";
import { Hero } from "./home/Hero";
import { Products } from "./home/Products";
import { FeaturedWork } from "./home/FeaturedWork";
import { Solutions } from "./home/Solutions";
import { Process } from "./home/Process";
import { About } from "./home/About";
import { FAQ } from "./home/FAQ";
import { Contact } from "./home/Contact";

export function HomeExperience() {
  const { language } = useLanguage();
  const c: Copy = (pt, en) => (language === "pt" ? pt : en);
  return (
    <>
      <Hero c={c} />
      <Products c={c} />
      <FeaturedWork c={c} />
      <Solutions c={c} />
      <Process c={c} />
      <About c={c} />
      <FAQ c={c} />
      <Contact c={c} />
    </>
  );
}
