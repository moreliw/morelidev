"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { PROJECTS } from "@/data/projects";

const GROUPS = [
  { id: "all", pt: "Todos", en: "All", slugs: [] },
  {
    id: "systems",
    pt: "Sistemas",
    en: "Systems",
    slugs: ["empresa-capixaba", "cipritex"],
  },
  {
    id: "web",
    pt: "Websites e e-commerce",
    en: "Websites & e-commerce",
    slugs: ["mameri", "will-market", "takki"],
  },
  { id: "apps", pt: "Aplicativos", en: "Apps", slugs: ["saldo-casa", "padel"] },
];
const ORDER = [
  "mameri",
  "empresa-capixaba",
  "saldo-casa",
  "takki",
  "cipritex",
  "padel",
  "will-market",
];
const ordered = [...PROJECTS].sort(
  (a, b) => ORDER.indexOf(a.slug) - ORDER.indexOf(b.slug),
);

export function ProjectsIndex() {
  const { language } = useLanguage();
  const [group, setGroup] = useState("all");
  const c = (pt: string, en: string) => (language === "pt" ? pt : en);
  const active = GROUPS.find((item) => item.id === group)!;
  const visible = ordered.filter(
    (project) => group === "all" || active.slugs.includes(project.slug),
  );
  return (
    <section className="projects-index section-space">
      <div className="container-site">
        <header className="projects-heading">
          <p className="eyebrow">
            {c("IDEIAS QUE GANHARAM VIDA", "IDEAS BROUGHT TO LIFE")}
          </p>
          <h1 className="h-section">
            {c("Cada desafio,", "Every challenge,")}
            <br />
            <em>{c("uma nova possibilidade.", "a new possibility.")}</em>
          </h1>
          <p>
            {c(
              "Sistemas, produtos digitais e experiências web. Conheça o que construímos para empresas de diferentes setores.",
              "Systems, digital products and web experiences. Explore what we build for companies across different sectors.",
            )}
          </p>
        </header>
        <div
          className="project-filters"
          role="group"
          aria-label={c(
            "Filtrar projetos por categoria",
            "Filter projects by category",
          )}
        >
          {GROUPS.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={group === item.id}
              onClick={() => setGroup(item.id)}
            >
              {item[language]}
              <span>
                {item.id === "all" ? PROJECTS.length : item.slugs.length}
              </span>
            </button>
          ))}
        </div>
        <p className="sr-only" role="status">
          {visible.length} {c("projetos encontrados", "projects found")}
        </p>
        <div className="portfolio-grid">
          {visible.map((project, index) => (
            <Link
              href={`/projetos/${project.slug}`}
              className={`portfolio-card portfolio-${project.slug}`}
              key={project.slug}
            >
              <div className="portfolio-image">
                <Image
                  src={project.cover ?? project.poster}
                  alt={`${project.title} — ${project.category[language]}`}
                  fill
                  sizes="(max-width: 767px) 100vw, 50vw"
                  preload={index === 0}
                />
              </div>
              <div className="portfolio-caption">
                <div>
                  <p className="eyebrow">{project.category[language]}</p>
                  <h2>{project.title}</h2>
                  <p>{project.shortDesc[language]}</p>
                </div>
                <ArrowUpRight size={24} aria-hidden />
              </div>
            </Link>
          ))}
        </div>
        <div className="portfolio-cta">
          <h2 className="h-section">
            {c("O próximo pode ser o seu.", "Yours could be next.")}
          </h2>
          <Link className="btn btn-primary" href="/#contato">
            {c("Falar sobre um projeto", "Let’s talk about your project")}
            <ArrowUpRight size={17} aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
