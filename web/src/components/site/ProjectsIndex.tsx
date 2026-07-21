"use client";
import { useLanguage } from "@/context/LanguageContext";
import { COPY, t } from "@/content/site";
import { PROJECTS } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";

export function ProjectsIndex() {
  const { language } = useLanguage();

  return (
    <section className="pt-28 lg:pt-36 pb-20">
      <div className="container-site">
        <header className="max-w-2xl mb-12">
          <h1 data-reveal className="display text-[clamp(1.9rem,4vw,2.9rem)] text-[color:var(--ink)]">
            {t(COPY.projects.allTitle, language)}
          </h1>
          <p data-reveal className="mt-4 text-[1rem] leading-[1.75] text-[color:var(--muted)]">
            {t(COPY.projects.allSub, language)}
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {PROJECTS.map((project, i) => (
            <ProjectCard
              key={project.slug}
              project={project}
              language={language}
              priority={i < 3}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
