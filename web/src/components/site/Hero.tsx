"use client";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { COPY, t } from "@/content/site";
import { HeroScene } from "./HeroScene";

export function Hero() {
  const { language } = useLanguage();

  return (
    <section className="relative isolate overflow-hidden pt-32 pb-16 lg:pt-40 lg:pb-24 min-h-[82svh] flex items-center">
      <div className="absolute inset-y-0 right-0 w-full lg:w-[58%] opacity-40 lg:opacity-100">
        <HeroScene />
        {/* garante contraste do texto sobre a cena */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-[color:var(--bg)] via-[color:var(--bg)]/60 to-transparent lg:via-[color:var(--bg)]/30"
        />
      </div>

      <div className="container-site relative">
        <div className="max-w-2xl">
          {/* o h1 (elemento LCP) fica estático; a entrada anima só os elementos de apoio */}
          <h1 className="display text-[clamp(2rem,4.6vw,3.4rem)] text-[color:var(--ink)]">
            {t(COPY.hero.title, language)}
          </h1>

          <p className="anim-fade-1 mt-6 max-w-xl text-[1rem] lg:text-[1.06rem] leading-[1.75] text-[color:var(--muted)]">
            {t(COPY.hero.sub, language)}
          </p>

          <div className="anim-fade-2 mt-9 flex flex-wrap items-center gap-4">
            <a href="#projetos" className="btn btn-primary">
              {t(COPY.hero.ctaPrimary, language)}
              <ArrowRight className="size-4" aria-hidden />
            </a>
            <a href="#contato" className="btn btn-secondary">
              {t(COPY.hero.ctaSecondary, language)}
            </a>
          </div>

          <p className="anim-fade-3 mt-10 text-[0.85rem] tracking-wide text-[color:var(--muted)]">
            {t(COPY.hero.proofLine, language)}
          </p>
        </div>
      </div>
    </section>
  );
}
