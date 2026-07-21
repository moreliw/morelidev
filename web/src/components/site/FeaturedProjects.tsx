"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { COPY, t } from "@/content/site";
import { FEATURED_PROJECTS } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";

export function FeaturedProjects() {
  const { language } = useLanguage();

  return (
    <section id="projetos" className="py-20 lg:py-28 scroll-mt-20">
      <div className="container-site">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
          <div className="max-w-xl">
            <p data-reveal className="eyebrow">
              {t(COPY.projects.eyebrow, language)}
            </p>
            <h2 data-reveal className="section-title mt-3 text-[color:var(--ink)]">
              {t(COPY.projects.title, language)}
            </h2>
          </div>
          <Link
            data-reveal
            href="/projetos"
            className="inline-flex items-center gap-1.5 text-[0.9rem] font-semibold text-[color:var(--accent-ink)] hover:text-[color:var(--accent-hover)] transition-colors"
          >
            {t(COPY.projects.viewAll, language)}
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {FEATURED_PROJECTS.map((project) => (
            <ProjectCard key={project.slug} project={project} language={language} />
          ))}
        </div>
      </div>
    </section>
  );
}
