"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Plus,
  ShieldCheck,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { COPY, t } from "@/content/site";
import type { ProjectData } from "@/data/projects";
import { CaseVideo } from "./CaseVideo";
import styles from "./ProjectCase.module.css";

const artDirection = {
  mameri: {
    decisionLabels: {
      pt: ["Carregamento", "Presença nas buscas", "Autonomia de conteúdo"],
      en: ["Loading performance", "Search visibility", "Content autonomy"],
    },
    headline: {
      pt: "Site institucional para uma exportadora de pedras naturais.",
      en: "Business website for a natural stone exporter.",
    },
    pillars: {
      pt: [
        "Identidade que se destaca",
        "Conteúdo encontrável",
        "Conexão com novos negócios",
      ],
      en: [
        "A distinctive identity",
        "Discoverable content",
        "Connection to new business",
      ],
    },
  },
  "empresa-capixaba": {
    decisionLabels: {
      pt: ["Regras de negócio", "Interfaces do sistema", "Dados operacionais"],
      en: ["Business logic", "System interfaces", "Operational data"],
    },
    headline: {
      pt: "Equipes, serviços e rotinas em um único sistema.",
      en: "Teams, services and routines in a single system.",
    },
    pillars: {
      pt: [
        "Informações centralizadas",
        "Rotinas mais organizadas",
        "Visibilidade da operação",
      ],
      en: [
        "Centralized information",
        "Organized routines",
        "Operational visibility",
      ],
    },
  },
};

type Props = {
  project: ProjectData;
  nextProject: Pick<
    ProjectData,
    "slug" | "title" | "category" | "cover" | "poster"
  >;
};

export function ProjectCase({ project, nextProject }: Props) {
  const { language } = useLanguage();
  const pt = language === "pt";
  const l = (value: { pt: string; en: string }) => value[language];
  const direction = artDirection[project.slug as keyof typeof artDirection];
  const dark = project.slug === "empresa-capixaba";
  const pillars = direction?.pillars[language] ?? project.stack?.slice(0, 3) ?? [];
  // Projetos sem estudo de caso completo mostram só a apresentação e a
  // imagem do projeto; nada de texto inventado para preencher seções.
  const story = project.context && project.problem ? { context: project.context, problem: project.problem } : null;
  const decisions = project.decisions?.[language] ?? [];
  const stack = project.stack ?? [];
  const sections = [
    ...(story ? [["historia", pt ? "O desafio" : "The challenge"]] : []),
    ["experiencia", pt ? "A experiência" : "The experience"],
    ...(project.result ? [["resultado", pt ? "O resultado" : "The outcome"]] : []),
  ];

  return (
    <article className={`${styles.case} ${dark ? styles.dark : ""}`}>
      <header
        className={`${styles.hero} ${project.cover ? styles.cinematic : styles.standard}`}
        data-header-theme={dark ? "dark" : "light"}
      >
        <div className={styles.heroVisual}>
          <Image
            src={project.cover ?? project.poster}
            alt={
              project.cover
                ? pt
                  ? `Apresentação visual do projeto ${project.title} em um notebook`
                  : `Visual presentation of ${project.title} on a laptop`
                : `${project.title}, ${l(project.category)}`
            }
            fill
            loading="eager"
            fetchPriority="high"
            sizes="(max-width: 767px) 100vw, 75vw"
            className={styles.heroImage}
          />
        </div>
        <div className={`container-site ${styles.heroInner}`}>
          <nav
            aria-label={pt ? "Caminho de navegação" : "Breadcrumb"}
            className={styles.breadcrumb}
          >
            <Link href="/projetos">
              <ArrowLeft size={14} aria-hidden />
              {pt ? "Projetos selecionados" : "Selected projects"}
            </Link>
            <span aria-hidden>/</span>
            <span aria-current="page">{project.title}</span>
          </nav>
          <div className={styles.heroCopy}>
            <h1>
              {project.cover
                ? project.title
                    .split(" ")
                    .map((word, index) => <span key={index}>{word} </span>)
                : project.title}
            </h1>
            <p className={styles.subtitle}>
              {l(project.resultTitle)}
            </p>
            <p className={styles.heroDescription}>{l(project.shortDesc)}</p>
            <a href={story ? "#historia" : "#experiencia"} className={styles.heroButton}>
              {pt ? "Ver detalhes" : "See details"}
              <ArrowDown size={18} aria-hidden />
            </a>
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.liveLink}
              >
                {t(COPY.projects.liveDemo, language)}
                <ArrowUpRight size={18} aria-hidden />
              </a>
            )}
          </div>
        </div>
      </header>

      {pillars.length > 0 && (
        <div className={styles.pillarBand} data-header-theme={dark ? "dark" : "light"}>
          <div className={`container-site ${styles.pillars}`}>
            {pillars.map((pillar) => (
              <div key={pillar}>
                <p>{pillar}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {sections.length > 1 && (
      <nav
        className={styles.chapterNav}
        aria-label={pt ? "Neste case" : "In this case"}
      >
        <div className={`container-site ${styles.chapterInner}`}>
          <span className={styles.chapterBrand}>{project.title}</span>
          <div>
            {sections.map(([id, label]) => (
              <a href={`#${id}`} key={id}>
                {label}
              </a>
            ))}
          </div>
          <Link href="/#contato" className={styles.chapterContact}>
            {pt ? "Solicitar orçamento" : "Request a quote"}
            <ArrowUpRight size={16} aria-hidden />
          </Link>
        </div>
      </nav>
      )}

      <div className="container-site" data-header-theme="light">
        {story && (
        <section
          id="historia"
          className={styles.story}
          aria-labelledby="story-title"
        >
          <div data-reveal>
            <h2 id="story-title">
              {direction ? l(direction.headline) : l(project.resultTitle)}
            </h2>
          </div>
          <div className={styles.storyBody} data-reveal>
            <p className={styles.lead}>{l(story.context)}</p>
            <h3>{pt ? "O desafio" : "The challenge"}</h3>
            <p>{l(story.problem)}</p>
            <div className={styles.scope}>
              <h3>{pt ? "Nossa entrega" : "Our contribution"}</h3>
              <p>{t(COPY.projects.companyRoleValue, language)}</p>
            </div>
          </div>
        </section>
        )}

        <section
          id="experiencia"
          className={styles.experience}
          aria-labelledby="experience-title"
        >
          <div className={styles.sectionHeading} data-reveal>
            <div>
              <h2 id="experience-title">
                {pt ? "O que foi desenvolvido." : "What we built."}
              </h2>
            </div>
            <p>{l(project.solution ?? project.shortDesc)}</p>
          </div>
          <figure className={styles.showcase}>
            <div className={styles.windowBar} aria-hidden="true">
              <span>
                <i />
                <i />
                <i />
              </span>
              <span>{project.title}</span>
              <span>MORELI/DEV</span>
            </div>
            {project.videoUrl ? (
              <CaseVideo
                key={project.slug}
                src={project.videoUrl}
                poster={project.poster}
                title={project.title}
                pt={pt}
              />
            ) : (
              <Image
                src={project.imageUrl ?? project.poster}
                alt={
                  pt
                    ? `Interface do projeto ${project.title}`
                    : `${project.title} project interface`
                }
                width={1440}
                height={900}
                sizes="(max-width: 767px) 100vw, 90vw"
              />
            )}
            <figcaption>
              <span>{project.title}</span>
              <span>
                {project.videoUrl
                  ? pt
                    ? "Vídeo do projeto"
                    : "Project video"
                  : l(project.category)}
              </span>
            </figcaption>
          </figure>
          {project.cover && (
            <p className={styles.visualNote}>
              {pt
                ? "A imagem de abertura é uma apresentação ilustrativa. A demonstração acima mostra o projeto."
                : "The opening image is an illustrative presentation. The demonstration above shows the project."}
            </p>
          )}
        </section>
      </div>

      {project.result && (
      <section
        id="resultado"
        className={styles.outcome}
        data-header-theme="dark"
        aria-labelledby="outcome-title"
      >
        <div className={`container-site ${styles.outcomeInner}`}>
          <div data-reveal>
            <h2 id="outcome-title">
              {pt ? "O que mudou." : "What changed."}
            </h2>
          </div>
          <div data-reveal>
            <span className={styles.resultMark} aria-hidden>
              <Check size={24} />
            </span>
            <p className={styles.resultText}>{l(project.result)}</p>
            <span className={styles.outcomeSignature}>
              {project.title} <span aria-hidden>·</span> {l(project.category)}
            </span>
          </div>
        </div>
      </section>
      )}

      <div className="container-site" data-header-theme="light">
        {(decisions.length > 0 || stack.length > 0) && (
        <section
          className={styles.engineering}
          aria-labelledby="engineering-title"
        >
          <div data-reveal>
            <h2 id="engineering-title">
              {pt ? "Decisões técnicas." : "Technical decisions."}
            </h2>
            <div className={styles.stack}>
              {stack.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
          <div className={styles.decisions}>
            {decisions.map((decision, index) => {
              const label =
                direction?.decisionLabels[language][index] ??
                stack.find((technology) =>
                  decision.includes(technology),
                ) ??
                (pt ? "Decisão de projeto" : "Project decision");
              return (
                <details key={`${project.slug}-${index}`} open={index === 0}>
                  <summary>
                    <span>{label}</span>
                    <Plus size={18} aria-hidden />
                  </summary>
                  <p>{decision}</p>
                </details>
              );
            })}
            {project.confidential && (
              <p className={styles.confidential}>
                <ShieldCheck size={18} aria-hidden />
                {t(COPY.projects.confidential, language)}
              </p>
            )}
          </div>
        </section>
        )}

        <section
          className={styles.contact}
          aria-labelledby="case-contact-title"
          data-reveal
        >
          <h2 id="case-contact-title">
            {pt ? "Tem um projeto parecido?" : "Have a similar project?"}
          </h2>
          <p>
            {pt
              ? "Conte o que você precisa. Respondemos em até um dia útil."
              : "Tell us what you need. We reply within one business day."}
          </p>
          <Link href="/#contato" className="btn btn-primary">
            {pt ? "Solicitar orçamento" : "Request a quote"}
            <ArrowUpRight size={18} aria-hidden />
          </Link>
        </section>

        <Link
          href={`/projetos/${nextProject.slug}`}
          className={styles.nextCase}
        >
          <div className={styles.nextImage}>
            <Image
              src={nextProject.cover ?? nextProject.poster}
              alt=""
              fill
              sizes="(max-width: 767px) 100px, 220px"
            />
          </div>
          <div>
            <h2>{nextProject.title}</h2>
            <p>{l(nextProject.category)}</p>
          </div>
          <ArrowRight aria-hidden className={styles.nextArrow} />
        </Link>
      </div>
    </article>
  );
}
