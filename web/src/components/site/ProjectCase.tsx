"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { COPY, t } from "@/content/site";
import type { ProjectData } from "@/data/projects";

export function ProjectCase({ project }: { project: ProjectData }) {
  const { language } = useLanguage();
  const l = (v: { pt: string; en: string }) =>
    language === "pt" ? v.pt : v.en;

  const blocks = [
    { label: t(COPY.projects.context, language), text: l(project.context) },
    { label: t(COPY.projects.problem, language), text: l(project.problem) },
    { label: t(COPY.projects.solution, language), text: l(project.solution) },
    { label: t(COPY.projects.result, language), text: l(project.result) },
  ];

  return (
    <article className="case-article pb-20">
      <div className="container-site">
        <nav aria-label="Breadcrumb" data-reveal>
          <ol className="flex items-center gap-2 text-[0.82rem] text-[color:var(--muted)]">
            <li>
              <Link
                href="/"
                className="hover:text-[color:var(--ink)] transition-colors"
              >
                {t(COPY.projects.breadcrumbHome, language)}
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link
                href="/projetos"
                className="hover:text-[color:var(--ink)] transition-colors"
              >
                {t(COPY.projects.breadcrumbProjects, language)}
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li aria-current="page" className="text-[color:var(--ink-soft)]">
              {project.title}
            </li>
          </ol>
        </nav>

        <header className="case-heading">
          <span data-reveal className="chip">
            {l(project.category)}
          </span>
          <h1 className="case-title mt-4">{project.title}</h1>
          <p
            data-reveal
            className="mt-4 text-[1.05rem] leading-[1.7] text-[color:var(--ink-soft)]"
          >
            {l(project.resultTitle)}
          </p>
          <p
            data-reveal
            className="mt-5 text-[0.85rem] text-[color:var(--muted)]"
          >
            <span className="font-semibold text-[color:var(--ink-soft)]">
              {t(COPY.projects.companyRole, language)}:
            </span>{" "}
            {t(COPY.projects.companyRoleValue, language)}
          </p>
        </header>

        <div className="case-media border border-[color:var(--hairline)] overflow-hidden">
          {project.videoUrl ? (
            <video
              src={project.videoUrl}
              poster={project.poster}
              controls
              muted
              playsInline
              preload="none"
              className="w-full aspect-video object-cover object-top bg-[color:var(--bg-raised)]"
            >
              {language === "pt"
                ? "Seu navegador não suporta vídeo."
                : "Your browser does not support video."}
            </video>
          ) : (
            <Image
              src={project.imageUrl ?? project.poster}
              alt={`${project.title} — ${l(project.category)}`}
              width={1280}
              height={800}
              sizes="(max-width: 1180px) 100vw, 1100px"
              className="w-full object-cover object-top"
            />
          )}
        </div>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7 space-y-10">
            {blocks.map((block) => (
              <section key={block.label} data-reveal>
                <h2 className="eyebrow">{block.label}</h2>
                <p className="mt-3 text-[0.95rem] leading-[1.8] text-[color:var(--ink-soft)]">
                  {block.text}
                </p>
              </section>
            ))}
          </div>

          <aside className="lg:col-span-5 space-y-8">
            <div
              data-reveal
              className="border-t border-[color:var(--hairline)] pt-6"
            >
              <h2 className="text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-[color:var(--ink-soft)]">
                {t(COPY.projects.decisions, language)}
              </h2>
              <ul className="mt-4 space-y-3">
                {(language === "pt"
                  ? project.decisions.pt
                  : project.decisions.en
                ).map((decision) => (
                  <li
                    key={decision.slice(0, 24)}
                    className="flex items-start gap-2.5 text-[0.88rem] leading-relaxed text-[color:var(--muted)]"
                  >
                    <span
                      aria-hidden
                      className="mt-[0.6em] w-1.5 h-px bg-[color:var(--accent)] shrink-0"
                    />
                    {decision}
                  </li>
                ))}
              </ul>
            </div>

            <div
              data-reveal
              className="border-t border-[color:var(--hairline)] pt-6"
            >
              <h2 className="text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-[color:var(--ink-soft)]">
                {t(COPY.projects.stack, language)}
              </h2>
              <p className="mt-3 text-[0.88rem] leading-relaxed text-[color:var(--muted)]">
                {project.stack.join(" / ")}
              </p>
            </div>

            {(project.confidential || project.demoUrl) && (
              <div
                data-reveal
                className="border-t border-[color:var(--hairline)] pt-6"
              >
                {project.confidential && (
                  <p className="flex items-start gap-2.5 text-[0.83rem] leading-relaxed text-[color:var(--muted)]">
                    <ShieldCheck
                      className="size-4 mt-0.5 shrink-0"
                      aria-hidden
                    />
                    {t(COPY.projects.confidential, language)}
                  </p>
                )}
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary mt-4 !min-h-10 !py-2 text-[0.85rem]"
                  >
                    {t(COPY.projects.liveDemo, language)}
                  </a>
                )}
              </div>
            )}
          </aside>
        </div>

        <div className="mt-16 pt-8 border-t border-[color:var(--hairline)] flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/projetos"
            className="inline-flex items-center gap-2 text-[0.9rem] font-medium text-[color:var(--muted)] hover:text-[color:var(--ink)] transition-colors"
          >
            <ArrowLeft className="size-4" aria-hidden />
            {t(COPY.projects.backToProjects, language)}
          </Link>
          <Link href="/#contato" className="btn btn-primary">
            {t(COPY.nav.cta, language)}
          </Link>
        </div>
      </div>
    </article>
  );
}
