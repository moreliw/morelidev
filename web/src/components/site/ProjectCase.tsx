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
      pt: "A força da origem. Uma presença à altura.",
      en: "The strength of origin. A presence to match.",
    },
    subtitle: {
      pt: "Natural Stones. Global Business.",
      en: "Natural Stones. Global Business.",
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
      pt: "Pessoas, serviços e rotinas. Tudo conectado.",
      en: "People, services and routines. All connected.",
    },
    subtitle: {
      pt: "Gestão operacional. Visão de ponta a ponta.",
      en: "Operational management. End-to-end visibility.",
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
  const pillars = direction?.pillars[language] ?? project.stack.slice(0, 3);
  const sections = [
    ["historia", pt ? "O desafio" : "The challenge"],
    ["experiencia", pt ? "A experiência" : "The experience"],
    ["resultado", pt ? "O resultado" : "The outcome"],
  ];

  return (
    <article className={`${styles.case} ${dark ? styles.dark : ""}`}>
      <header
        className={`${styles.hero} ${project.cover ? styles.cinematic : styles.standard}`}
      >
        <div className={styles.heroVisual}>
          <Image
            src={project.cover ?? project.poster}
            alt={
              project.cover
                ? pt
                  ? `Apresentação visual do projeto ${project.title} em um notebook`
                  : `Visual presentation of ${project.title} on a laptop`
                : `${project.title} — ${l(project.category)}`
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
            <p className={styles.eyebrow}>{l(project.category)}</p>
            <h1>
              {project.cover
                ? project.title
                    .split(" ")
                    .map((word, index) => <span key={index}>{word} </span>)
                : project.title}
            </h1>
            <p className={styles.subtitle}>
              {direction ? l(direction.subtitle) : l(project.resultTitle)}
            </p>
            <p className={styles.heroDescription}>{l(project.shortDesc)}</p>
            <a href="#historia" className={styles.heroButton}>
              {pt ? "Explore o projeto" : "Explore the project"}
              <ArrowDown size={18} aria-hidden />
            </a>
          </div>
          <div className={styles.heroFoot}>
            <span>MORELI/DEV — {pt ? "ESTUDO DE CASO" : "CASE STUDY"}</span>
            <span>
              {pt
                ? "ESTRATÉGIA / DESIGN / TECNOLOGIA"
                : "STRATEGY / DESIGN / TECHNOLOGY"}
            </span>
          </div>
        </div>
      </header>

      <div className={styles.pillarBand}>
        <div className={`container-site ${styles.pillars}`}>
          <p className={styles.eyebrow}>
            {pt
              ? "Tecnologia aplicada.\nValor no dia a dia."
              : "Applied technology.\nEveryday value."}
          </p>
          {pillars.map((pillar, index) => (
            <div key={pillar}>
              <span className={styles.pillarNumber}>0{index + 1}</span>
              <p>{pillar}</p>
            </div>
          ))}
        </div>
      </div>

      <nav
        className={styles.chapterNav}
        aria-label={pt ? "Neste case" : "In this case"}
      >
        <div className={`container-site ${styles.chapterInner}`}>
          <span className={styles.chapterBrand}>{project.title}</span>
          <div>
            {sections.map(([id, label], index) => (
              <a href={`#${id}`} key={id}>
                <span>0{index + 1}</span>
                {label}
              </a>
            ))}
          </div>
          <Link href="/#contato" className={styles.chapterContact}>
            {pt ? "Vamos conversar" : "Let’s talk"}
            <ArrowUpRight size={16} aria-hidden />
          </Link>
        </div>
      </nav>

      <div className="container-site">
        <section
          id="historia"
          className={styles.story}
          aria-labelledby="story-title"
        >
          <div data-reveal>
            <p className={styles.eyebrow}>
              01 / {pt ? "O ponto de partida" : "The starting point"}
            </p>
            <h2 id="story-title">
              {direction ? l(direction.headline) : l(project.resultTitle)}
            </h2>
          </div>
          <div className={styles.storyBody} data-reveal>
            <p className={styles.lead}>{l(project.context)}</p>
            <h3>{pt ? "O desafio" : "The challenge"}</h3>
            <p>{l(project.problem)}</p>
            <div className={styles.scope}>
              <span className={styles.eyebrow}>
                {pt ? "NOSSA ENTREGA" : "OUR CONTRIBUTION"}
              </span>
              <p>{t(COPY.projects.companyRoleValue, language)}</p>
            </div>
          </div>
        </section>

        <section
          id="experiencia"
          className={styles.experience}
          aria-labelledby="experience-title"
        >
          <div className={styles.sectionHeading} data-reveal>
            <div>
              <p className={styles.eyebrow}>
                02 / {pt ? "Design que funciona" : "Design that works"}
              </p>
              <h2 id="experience-title">
                {pt
                  ? "Da estratégia à experiência."
                  : "From strategy to experience."}
              </h2>
            </div>
            <p>{l(project.solution)}</p>
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
              <span>
                {pt ? "O projeto em detalhes" : "The project in detail"}
              </span>
              <span>
                {project.videoUrl
                  ? pt
                    ? "Dê o play para conhecer a experiência"
                    : "Press play to explore the experience"
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

      <section
        id="resultado"
        className={styles.outcome}
        aria-labelledby="outcome-title"
      >
        <div className={`container-site ${styles.outcomeInner}`}>
          <div data-reveal>
            <p className={styles.eyebrow}>
              03 / {pt ? "Do digital ao real" : "From digital to real"}
            </p>
            <h2 id="outcome-title">
              {pt ? "O que muda\nna prática." : "What changes\nin practice."}
            </h2>
          </div>
          <div data-reveal>
            <span className={styles.resultMark} aria-hidden>
              <Check size={24} />
            </span>
            <p className={styles.resultText}>{l(project.result)}</p>
            <span className={styles.outcomeSignature}>
              {project.title} <span aria-hidden>—</span> {l(project.category)}
            </span>
          </div>
        </div>
      </section>

      <div className="container-site">
        <section
          className={styles.engineering}
          aria-labelledby="engineering-title"
        >
          <div data-reveal>
            <p className={styles.eyebrow}>
              {pt ? "Por trás da experiência" : "Behind the experience"}
            </p>
            <h2 id="engineering-title">
              {pt ? "Qualidade em cada decisão." : "Quality in every decision."}
            </h2>
            <div className={styles.stack}>
              {project.stack.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
          <div className={styles.decisions}>
            {project.decisions[language].map((decision, index) => {
              const label =
                direction?.decisionLabels[language][index] ??
                project.stack.find((technology) =>
                  decision.includes(technology),
                ) ??
                (pt ? "Decisão de projeto" : "Project decision");
              return (
                <details key={`${project.slug}-${index}`} open={index === 0}>
                  <summary>
                    <span className={styles.decisionNumber}>0{index + 1}</span>
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
        </section>

        <section
          className={styles.contact}
          aria-labelledby="case-contact-title"
          data-reveal
        >
          <p className={styles.eyebrow}>
            {pt
              ? "O próximo capítulo pode ser seu"
              : "The next chapter could be yours"}
          </p>
          <h2 id="case-contact-title">
            {pt
              ? "Seu negócio.\nNovas possibilidades."
              : "Your business.\nNew possibilities."}
          </h2>
          <p>
            {pt
              ? "Conte o que você quer transformar. A gente ajuda a encontrar o caminho."
              : "Tell us what you want to transform. We’ll help you find the way."}
          </p>
          <Link href="/#contato" className="btn btn-primary">
            {pt ? "Falar sobre meu projeto" : "Let’s talk about my project"}
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
            <span className={styles.eyebrow}>
              {pt ? "Continue explorando" : "Keep exploring"}
            </span>
            <h2>{nextProject.title}</h2>
            <p>{l(nextProject.category)}</p>
          </div>
          <ArrowRight aria-hidden className={styles.nextArrow} />
        </Link>
      </div>
    </article>
  );
}
