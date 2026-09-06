import type { Copy } from "./types";
import { ArrowDown, ArrowUpRight, Globe2 } from "lucide-react";
import Image from "next/image";

export function Hero({ c }: { c: Copy }) {
  return (
    <section className="hero-section" aria-labelledby="hero-title">
      <div className="container-site">
        <div className="hero-layout">
          <div className="hero-copy">
            <p className="kicker">
              <span className="status-dot" />
              {c(
                "TECNOLOGIA REAL. RESULTADOS REAIS.",
                "REAL TECHNOLOGY. REAL RESULTS.",
              )}
            </p>
            <h1 id="hero-title" className="hero-title">
              {c("Software que", "Software that")}
              <br />
              {c("move negócios.", "moves business.")}
            </h1>
            <p className="hero-description">
              {c(
                "Desenvolvemos sistemas, SaaS e experiências digitais sob medida para empresas que querem crescer com tecnologia de verdade.",
                "We build custom systems, SaaS and digital experiences for businesses ready to grow with technology that makes a difference.",
              )}
            </p>
            <div className="hero-buttons">
              <a href="#contato" className="btn btn-primary">
                {c("Falar sobre um projeto", "Let’s discuss your project")}
                <ArrowUpRight size={17} aria-hidden />
              </a>
              <a href="#projetos" className="btn btn-secondary">
                {c("Conhecer projetos", "Explore our work")}
                <ArrowDown size={16} aria-hidden />
              </a>
            </div>
            <div className="hero-proof">
              <span className="proof-symbol">
                <Globe2 size={21} strokeWidth={1.3} aria-hidden />
              </span>
              <p>
                <strong>
                  {c(
                    "Do Brasil para novos horizontes.",
                    "From Brazil to new horizons.",
                  )}
                </strong>
                <span>
                  {c(
                    "Soluções em produção no Brasil e em Angola.",
                    "Solutions in production in Brazil and Angola.",
                  )}
                </span>
              </p>
            </div>
          </div>
          <figure className="hero-visual">
            <span className="visual-index" aria-hidden>
              01 / MORELIDEV STUDIO
            </span>
            <Image
              src="/images/premium/software-hero.webp"
              alt={c(
                "Mockup ilustrativo de um sistema de gestão MoreliDev em um notebook",
                "Illustrative MoreliDev management dashboard on a laptop",
              )}
              width={1536}
              height={1024}
              sizes="(max-width: 767px) 100vw, (max-width: 1200px) 60vw, 790px"
              preload
              className="hero-image"
            />
            <figcaption className="visual-caption">
              <span>
                {c("IDEIAS. SISTEMAS. PESSOAS.", "IDEAS. SYSTEMS. PEOPLE.")}
              </span>
              <span>{c("MAIS DO QUE CÓDIGO.", "MORE THAN CODE.")}</span>
            </figcaption>
          </figure>
        </div>
        <div className="trust-strip">
          <p className="kicker">
            {c("CONFIANÇA QUE GERA", "TRUST THAT CREATES")}
            <br />
            {c("NOVAS HISTÓRIAS", "NEW POSSIBILITIES")}
          </p>
          <div>
            <strong>
              5<span>+</span>
            </strong>
            <p>{c("anos de experiência", "years of experience")}</p>
          </div>
          <div>
            <strong className="trust-place">
              Brasil <span>+</span> Angola
            </strong>
            <p>
              {c(
                "conexões que atravessam fronteiras",
                "connections that cross borders",
              )}
            </p>
          </div>
          <div>
            <strong className="trust-services">
              SaaS · {c("Sistemas", "Systems")} · Websites
            </strong>
            <p>
              {c(
                "tecnologia para empresas que não param",
                "technology for businesses that keep moving",
              )}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
