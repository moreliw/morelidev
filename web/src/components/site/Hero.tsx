"use client";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { COPY, SIGNAL, t } from "@/content/site";
import { HeroShowcase } from "./HeroShowcase";

export function Hero() {
  const { language } = useLanguage();

  return (
    <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-20">
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-6 xl:col-span-7">
            {/* o h1 (elemento LCP) fica estático; a entrada anima só os elementos de apoio */}
            <h1 className="display text-[clamp(2.5rem,6vw,4.6rem)] text-[color:var(--ink)]">
              {t(COPY.hero.titleLine1, language)}
              <br />
              {t(COPY.hero.titleLine2, language)}
            </h1>

            <p className="anim-fade-1 mt-7 max-w-md text-[1.02rem] leading-[1.7] text-[color:var(--muted)]">
              {t(COPY.hero.sub, language)}
            </p>

            <div className="anim-fade-2 mt-9 flex flex-wrap items-center gap-4">
              <a href="#contato" className="btn btn-primary">
                {t(COPY.hero.ctaPrimary, language)}
                <ArrowRight className="size-4" aria-hidden />
              </a>
              <a href="#projetos" className="btn-tertiary">
                {t(COPY.hero.ctaSecondary, language)}
              </a>
            </div>
          </div>

          <div className="lg:col-span-6 xl:col-span-5">
            <HeroShowcase />
          </div>
        </div>

        <p className="anim-fade-3 mt-16 lg:mt-20 text-[0.8rem] tracking-wide text-[color:var(--muted-2)] border-t border-[color:var(--hairline)] pt-6">
          {t(SIGNAL, language)}
        </p>
      </div>
    </section>
  );
}
