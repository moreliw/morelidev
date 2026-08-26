"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { COPY, t } from "@/content/site";
import { FEATURED_PROJECTS } from "@/data/projects";
import { CaseBlock } from "./CaseBlock";

export function Cases() {
  const { language } = useLanguage();

  return (
    <section id="projetos" className="py-4 lg:py-6 scroll-mt-20 border-t border-[color:var(--hairline)]">
      <div className="container-site">
        <div className="flex flex-wrap items-end justify-between gap-4 pt-14 lg:pt-20">
          <div className="max-w-xl">
            <p data-reveal className="eyebrow">
              {t(COPY.cases.eyebrow, language)}
            </p>
            <h2 data-reveal className="section-title mt-3 text-[color:var(--ink)]">
              {t(COPY.cases.title, language)}
            </h2>
          </div>
          <Link
            data-reveal
            href="/projetos"
            className="link-underline inline-flex items-center gap-1.5 text-[0.9rem] font-semibold text-[color:var(--ink)]"
          >
            {t(COPY.cases.viewAll, language)}
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>

        <div>
          {FEATURED_PROJECTS.map((project, i) => (
            <CaseBlock
              key={project.slug}
              project={project}
              index={i}
              language={language}
              priority={i === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
