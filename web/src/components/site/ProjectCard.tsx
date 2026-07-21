"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, TrendingUp } from "lucide-react";
import type { Language } from "@/content/site";
import { COPY, t } from "@/content/site";
import type { ProjectData } from "@/data/projects";

export function ProjectCard({
  project,
  language,
  priority = false,
}: {
  project: ProjectData;
  language: Language;
  priority?: boolean;
}) {
  const l = (v: { pt: string; en: string }) => (language === "pt" ? v.pt : v.en);

  return (
    <article data-reveal className="card group flex flex-col overflow-hidden">
      <Link
        href={`/projetos/${project.slug}`}
        className="relative block aspect-[16/10] overflow-hidden bg-[color:var(--bg-raised)]"
        aria-label={`${project.title} — ${t(COPY.projects.viewCase, language)}`}
      >
        <Image
          src={project.poster}
          alt={`${project.title} — ${l(project.category)}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          priority={priority}
          className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
      </Link>

      <div className="flex flex-col flex-1 p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-[1.05rem] font-semibold tracking-tight text-[color:var(--ink)]">
            <Link
              href={`/projetos/${project.slug}`}
              className="hover:text-[color:var(--accent-ink)] transition-colors"
            >
              {project.title}
            </Link>
          </h3>
          <span className="chip !text-[0.7rem] !py-1 shrink-0">{l(project.category)}</span>
        </div>

        <p className="mt-2.5 text-[0.88rem] leading-relaxed text-[color:var(--muted)]">
          {l(project.shortDesc)}
        </p>

        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label={t(COPY.projects.stack, language)}>
          {project.stack.map((tech) => (
            <li key={tech} className="chip !text-[0.7rem] !py-0.5 !px-2.5">
              {tech}
            </li>
          ))}
        </ul>

        <div className="mt-5 pt-4 border-t border-[color:var(--hairline)] flex items-center justify-between gap-3">
          <p className="flex items-center gap-2 text-[0.8rem] text-[color:var(--ink-soft)]">
            <TrendingUp className="size-3.5 text-[color:var(--accent-ink)]" aria-hidden />
            {l(project.result)}
          </p>
        </div>

        <Link
          href={`/projetos/${project.slug}`}
          className="mt-4 inline-flex items-center gap-1.5 text-[0.85rem] font-semibold text-[color:var(--accent-ink)] hover:text-[color:var(--accent-hover)] transition-colors"
        >
          {t(COPY.projects.viewCase, language)}
          <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
        </Link>
      </div>
    </article>
  );
}
