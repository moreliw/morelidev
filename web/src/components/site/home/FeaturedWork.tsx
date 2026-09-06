import type { Copy } from "./types";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function FeaturedWork({ c }: { c: Copy }) {
  return (
    <section
      id="projetos"
      className="section-space work-section"
      aria-labelledby="work-title"
    >
      <div className="container-site">
        <div className="section-heading">
          <div>
            <p className="kicker">
              {c("PROJETOS SELECIONADOS", "SELECTED WORK")}
            </p>
            <h2 id="work-title" className="editorial-title">
              {c("Do digital ao real.", "From digital to real.")}
              <br />
              {c("Resultados que importam.", "Results that matter.")}
            </h2>
          </div>
          <div className="section-intro">
            <p>
              {c(
                "Cada projeto começa com um desafio. E se transforma em uma solução que faz a diferença no negócio.",
                "Every project starts with a challenge. And becomes a solution that makes a difference to the business.",
              )}
            </p>
            <Link href="/projetos" className="text-link">
              {c("Ver todos os projetos", "View all projects")}
              <ArrowUpRight size={17} aria-hidden />
            </Link>
          </div>
        </div>
        <div className="featured-grid">
          <Link href="/projetos/mameri" className="work-card work-mameri">
            <div className="work-art">
              <Image
                src="/images/premium/mameri-studio.webp"
                alt={c(
                  "Direção visual Mameri Export: rochas naturais e website em um notebook",
                  "Mameri Export visual concept: natural stone and website on a laptop",
                )}
                fill
                sizes="(max-width: 767px) 100vw, 60vw"
              />
            </div>
            <div className="work-content">
              <div>
                <p className="kicker">
                  {c("WEBSITE INSTITUCIONAL", "CORPORATE WEBSITE")}
                </p>
                <h3>Mameri Export</h3>
                <p>
                  {c(
                    "A força das nossas origens, no mundo todo.",
                    "The strength of our origins, around the world.",
                  )}
                </p>
              </div>
              <span
                className="circle-arrow"
                aria-label={c(
                  "Ver projeto Mameri Export",
                  "View Mameri Export project",
                )}
              >
                <ArrowUpRight size={23} aria-hidden />
              </span>
            </div>
          </Link>
          <Link
            href="/projetos/empresa-capixaba"
            className="work-card work-capixaba"
          >
            <div className="work-art">
              <Image
                src="/images/premium/capixaba-studio.webp"
                alt={c(
                  "Direção visual Empresa Capixaba: sistema de gestão operacional",
                  "Empresa Capixaba visual concept: operations management system",
                )}
                fill
                sizes="(max-width: 767px) 100vw, 40vw"
              />
            </div>
            <div className="work-content">
              <div>
                <p className="kicker">
                  {c("SISTEMA OPERACIONAL", "OPERATIONS SYSTEM")}
                </p>
                <h3>Empresa Capixaba</h3>
                <p>
                  {c(
                    "Mais controle. Uma operação conectada.",
                    "More control. A connected operation.",
                  )}
                </p>
              </div>
              <span
                className="circle-arrow"
                aria-label={c(
                  "Ver projeto Empresa Capixaba",
                  "View Empresa Capixaba project",
                )}
              >
                <ArrowUpRight size={23} aria-hidden />
              </span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
