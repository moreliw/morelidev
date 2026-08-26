"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { COPY, t } from "@/content/site";
import { PROJECTS } from "@/data/projects";

const project = PROJECTS.find((p) => p.slug === "will-market");

/** Pausa editorial entre Serviços e Processo — uma imagem, não mais um card. */
export function CaseInterlude() {
  const { language } = useLanguage();
  if (!project) return null;
  const l = (v: { pt: string; en: string }) => (language === "pt" ? v.pt : v.en);

  return (
    <section className="border-t border-[color:var(--hairline)]">
      <Link
        href={`/projetos/${project.slug}`}
        data-reveal
        className="group relative block aspect-[21/9] overflow-hidden bg-[color:var(--bg-raised)]"
      >
        <Image
          src={project.poster}
          alt={`${project.title} — ${l(project.category)}`}
          fill
          sizes="100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[color:var(--bg-ink)]/70 to-transparent pt-16 pb-6">
          <div className="container-site flex flex-wrap items-end justify-between gap-3">
            <p className="text-[0.95rem] font-semibold text-white">
              {project.title} <span className="font-normal text-white/70">— {l(project.category)}</span>
            </p>
            <span className="inline-flex items-center gap-1.5 text-[0.85rem] font-medium text-white/90">
              {t(COPY.cases.viewCase, language)}
              <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
            </span>
          </div>
        </div>
      </Link>
    </section>
  );
}
