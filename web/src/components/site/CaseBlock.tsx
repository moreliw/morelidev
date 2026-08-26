"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Language } from "@/content/site";
import { COPY, t } from "@/content/site";
import type { ProjectData } from "@/data/projects";

export function CaseBlock({
  project,
  index,
  language,
  priority = false,
}: {
  project: ProjectData;
  index: number;
  language: Language;
  priority?: boolean;
}) {
  const l = (v: { pt: string; en: string }) => (language === "pt" ? v.pt : v.en);
  const reversed = index % 2 === 1;
  const num = String(index + 1).padStart(2, "0");

  return (
    <article
      data-reveal
      className={
        "grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-14 items-center py-14 lg:py-20 " +
        (index > 0 ? "border-t border-[color:var(--hairline)]" : "")
      }
    >
      <Link
        href={`/projetos/${project.slug}`}
        aria-label={`${project.title} — ${t(COPY.cases.viewCase, language)}`}
        className={
          "group relative block aspect-[16/11] overflow-hidden bg-[color:var(--bg-raised)] border border-[color:var(--hairline)] lg:col-span-7 " +
          (reversed ? "lg:order-2" : "lg:order-1")
        }
      >
        <Image
          src={project.poster}
          alt={`${project.title} — ${l(project.category)}`}
          fill
          sizes="(max-width: 1024px) 100vw, 58vw"
          priority={priority}
          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
        />
      </Link>

      <div className={"lg:col-span-5 " + (reversed ? "lg:order-1" : "lg:order-2")}>
        <div className="flex items-baseline gap-3">
          <span className="num text-[0.85rem] font-semibold text-[color:var(--accent)]">{num}</span>
          <span className="chip">{l(project.category)}</span>
        </div>

        <h3 className="section-title mt-4 text-[color:var(--ink)]">{project.title}</h3>

        <p className="mt-3 text-[1rem] leading-[1.65] text-[color:var(--ink-soft)]">
          {l(project.resultTitle)}
        </p>

        <p className="mt-3 text-[0.92rem] leading-relaxed text-[color:var(--muted)]">
          {l(project.shortDesc)}
        </p>

        <p className="mt-5 text-[0.78rem] tracking-wide text-[color:var(--muted-2)]">
          {project.stack.join(" / ")}
        </p>

        <Link
          href={`/projetos/${project.slug}`}
          className="link-underline mt-6 inline-flex items-center gap-1.5 text-[0.9rem] font-semibold text-[color:var(--ink)]"
        >
          {t(COPY.cases.viewCase, language)}
          <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
        </Link>
      </div>
    </article>
  );
}
