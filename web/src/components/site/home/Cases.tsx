import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { Copy } from "./types";

export function Cases({ c }: { c: Copy }) {
  const cases = [
    {
      slug: "mameri",
      name: "Mameri Export",
      kicker: c("WEBSITE INSTITUCIONAL", "CORPORATE WEBSITE"),
      text: c(
        "Um site institucional robusto e elegante para conectar uma operação de exportação de rochas naturais ao mercado internacional.",
        "A robust, elegant corporate website connecting a natural stone export operation to the international market.",
      ),
      meta: [
        [c("Escopo", "Scope"), c("Design + desenvolvimento", "Design + development")],
        [c("Setor", "Sector"), c("Exportação", "Export")],
      ],
      image: "/images/premium/mameri-studio.webp",
      alt: c(
        "Website da Mameri Export apresentado sobre uma superfície de pedra natural",
        "Mameri Export website shown on a natural stone surface",
      ),
    },
    {
      slug: "empresa-capixaba",
      name: "Empresa Capixaba",
      kicker: c("SISTEMA DE GESTÃO", "MANAGEMENT SYSTEM"),
      text: c(
        "Solução completa para gestão de equipes, operações e processos, aumentando a produtividade e o controle do dia a dia.",
        "A complete solution for managing teams, operations and processes, increasing day-to-day productivity and control.",
      ),
      meta: [
        [c("Escopo", "Scope"), c("Produto + engenharia", "Product + engineering")],
        [c("Setor", "Sector"), c("Operações", "Operations")],
      ],
      image: "/images/premium/capixaba-studio.webp",
      alt: c(
        "Sistema de gestão operacional desenvolvido para a Empresa Capixaba",
        "Operations management system built for Empresa Capixaba",
      ),
    },
  ];
  return (
    <section id="cases" className="cases section-space" aria-labelledby="cases-title">
      <div className="container-site">
        <div className="cases-head">
          <div>
            <p className="kicker" data-reveal>
              {c("CASES EM DESTAQUE", "SELECTED WORK")}
            </p>
            <h2 id="cases-title" data-reveal style={{ "--i": 1 } as React.CSSProperties}>
              {c(
                "Projetos que saíram da tela e entraram na operação.",
                "Projects that left the screen and entered the operation.",
              )}
            </h2>
          </div>
          <div data-reveal style={{ "--i": 2 } as React.CSSProperties}>
            <p>
              {c(
                "Cada projeto começa com um desafio de negócio e termina em software rodando com pessoas de verdade.",
                "Every project starts with a business challenge and ends in software running with real people.",
              )}
            </p>
            <Link href="/projetos" className="text-link">
              {c("Ver todos os cases", "View all work")}
              <ArrowRight size={16} aria-hidden />
            </Link>
          </div>
        </div>

        {cases.map((item, i) => (
          <article
            className={`case-row${i % 2 ? " case-row--flip" : ""}`}
            key={item.slug}
            data-reveal
          >
            <Link
              href={`/projetos/${item.slug}`}
              className="case-art"
              tabIndex={-1}
              aria-hidden
            >
              <span className="case-index">0{i + 1}</span>
              <Image
                src={item.image}
                alt=""
                width={1280}
                height={800}
                sizes="(max-width: 1023px) 100vw, 60vw"
                loading="lazy"
              />
            </Link>
            <div className="case-copy">
              <p className="kicker">{item.kicker}</p>
              <h3>{item.name}</h3>
              <p>{item.text}</p>
              <div className="case-meta">
                {item.meta.map(([label, value]) => (
                  <span key={label}>
                    {label}
                    <b>{value}</b>
                  </span>
                ))}
              </div>
              <Link href={`/projetos/${item.slug}`} className="text-link">
                {c("Ver case completo", "View full case")}
                <ArrowUpRight size={16} aria-hidden />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
