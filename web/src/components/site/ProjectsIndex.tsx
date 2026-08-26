"use client";
import { useLanguage } from "@/context/LanguageContext";
import { COPY, t } from "@/content/site";
import { PROJECTS } from "@/data/projects";
import { CaseBlock } from "./CaseBlock";

export function ProjectsIndex() {
  const { language } = useLanguage();

  return (
    <section className="pt-28 lg:pt-36 pb-20">
      <div className="container-site">
        <header className="max-w-2xl">
          <h1 data-reveal className="display text-[clamp(2.1rem,4.6vw,3.2rem)] text-[color:var(--ink)]">
            {t(COPY.projects.allTitle, language)}
          </h1>
          <p data-reveal className="mt-4 text-[1rem] leading-[1.75] text-[color:var(--muted)]">
            {t(COPY.projects.allSub, language)}
          </p>
        </header>

        <div>
          {PROJECTS.map((project, i) => (
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
