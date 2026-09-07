import { ArrowRight, ArrowUpRight, Star } from "lucide-react";
import type { Copy } from "./types";
import { AppMock, Sparkline } from "./ui/AppMock";

export function Hero({ c }: { c: Copy }) {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container-site hero-grid">
        <div className="hero-copy">
          <p className="kicker hero-eyebrow fade-up">
            {c(
              "DESIGN · SOFTWARE · PRODUTOS DIGITAIS",
              "DESIGN · SOFTWARE · DIGITAL PRODUCTS",
            )}
          </p>
          <h1 id="hero-title" className="hero-title">
            <span className="line" style={{ "--i": 0 } as React.CSSProperties}>
              <span>{c("Software feito", "Software built")}</span>
            </span>
            <span className="line" style={{ "--i": 1 } as React.CSSProperties}>
              <span>
                {c("para ", "to ")}
                <b>{c("mover", "move")}</b>
              </span>
            </span>
            <span className="line" style={{ "--i": 2 } as React.CSSProperties}>
              <span>{c("negócios.", "business.")}</span>
            </span>
          </h1>
          <p className="hero-sub fade-up" style={{ "--i": 2 } as React.CSSProperties}>
            {c(
              "Estratégia, design e engenharia para criar sistemas, produtos digitais e experiências que simplificam operações e ajudam empresas a crescer.",
              "Strategy, design and engineering to build systems, digital products and experiences that simplify operations and help companies grow.",
            )}
          </p>
          <div
            className="hero-actions fade-up"
            style={{ "--i": 3 } as React.CSSProperties}
          >
            <a href="#contato" className="btn btn-primary" data-magnetic>
              {c("Falar sobre um projeto", "Start a project")}
              <ArrowRight size={17} aria-hidden />
            </a>
            <a href="#cases" className="btn btn-secondary">
              {c("Conhecer nosso trabalho", "See our work")}
              <ArrowUpRight size={17} aria-hidden />
            </a>
          </div>
          <p className="hero-note fade-up" style={{ "--i": 4 } as React.CSSProperties}>
            {c(
              "Atuação remota · projetos locais e internacionais",
              "Remote studio · local and international projects",
            )}
          </p>
        </div>

        <div className="hero-stage fade-up" style={{ "--i": 2 } as React.CSSProperties}>
          <p className="stage-mark">
            {c(
              "Tecnologia que aproxima pessoas do resultado.",
              "Technology that brings people closer to results.",
            )}
          </p>
          <div className="stage-inner" data-parallax>
            <AppMock c={c} />
            <div className="ui-float stage-float stage-float--a" aria-hidden>
              <small>{c("SATISFAÇÃO", "SATISFACTION")}</small>
              <b>4,9</b>
              <span className="ui-stars">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} size={11} fill="currentColor" strokeWidth={0} />
                ))}
              </span>
            </div>
            <div className="ui-float stage-float stage-float--b" aria-hidden>
              <small>{c("RECEITA", "REVENUE")}</small>
              <b>+18%</b>
              <u>{c("vs. mês anterior", "vs. last month")}</u>
              <Sparkline height={30} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
