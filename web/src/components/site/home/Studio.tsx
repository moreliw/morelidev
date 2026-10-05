"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Copy } from "./types";
import { LINKS } from "@/content/site";
import { ensureGsap, gsap, SplitText } from "@/lib/gsap";

export function Studio({ c }: { c: Copy }) {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  const pillars: [string, string, string][] = [
    [
      "01",
      c("Estratégia", "Strategy"),
      c(
        "Entendemos o negócio, o processo e o objetivo antes de escrever uma linha de código.",
        "We understand the business, the process and the goal before writing a single line of code.",
      ),
    ],
    [
      "02",
      c("Design", "Design"),
      c(
        "Interfaces que fazem a complexidade desaparecer para quem usa todos os dias.",
        "Interfaces that make complexity disappear for the people who use them every day.",
      ),
    ],
    [
      "03",
      c("Engenharia", "Engineering"),
      c(
        "Código sólido, testado e preparado para evoluir junto com a empresa.",
        "Solid, tested code built to evolve alongside the company.",
      ),
    ],
  ];

  useEffect(() => {
    ensureGsap();
    const section = sectionRef.current;
    const text = textRef.current;
    if (!section || !text) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      // Leitura guiada: cada palavra acende conforme o scroll avança.
      const split = SplitText.create(text, { type: "words", wordsClass: "st-word" });
      gsap.set(split.words, { opacity: 0.16 });
      gsap.to(split.words, {
        opacity: 1,
        stagger: 0.08,
        ease: "none",
        scrollTrigger: { trigger: text, start: "top 80%", end: "bottom 40%", scrub: true },
      });

      gsap.from(".st-figure", {
        clipPath: "inset(18% 12% 18% 12% round 28px)",
        scale: 0.92,
        duration: 1.4,
        ease: "expo.out",
        scrollTrigger: { trigger: ".st-figure", start: "top 85%" },
      });
      gsap.to(".st-figure img", {
        yPercent: 8,
        ease: "none",
        scrollTrigger: { trigger: ".st-figure", start: "top bottom", end: "bottom top", scrub: true },
      });
      gsap.from(".st-pillar", {
        opacity: 0,
        y: 36,
        duration: 0.9,
        stagger: 0.12,
        ease: "expo.out",
        scrollTrigger: { trigger: ".st-pillars", start: "top 82%" },
      });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="estudio"
      className="st panel panel-light"
      data-theme="light"
      aria-labelledby="studio-title"
    >
      <div className="container-site">
        <p className="kicker">
          <span>01</span> {c("O estúdio", "The studio")}
        </p>
        <h2 id="studio-title" className="st-text" ref={textRef}>
          {c("A MoreliDev é um estúdio de software. Transformamos ", "MoreliDev is a software studio. We turn ")}
          <em>{c("processos complexos, ideias e operações", "complex processes, ideas and operations")}</em>
          {c(
            " em sistemas simples de usar, rápidos e ",
            " into systems that are simple to use, fast and ",
          )}
          <em>{c("prontos para crescer.", "ready to grow.")}</em>
        </h2>

        <div className="st-grid">
          <figure className="st-figure">
            <Image
              src="/images/premium/software-hero.webp"
              alt={c(
                "Painel de gestão desenvolvido pela MoreliDev aberto em um notebook",
                "Management dashboard built by MoreliDev on a laptop",
              )}
              width={1536}
              height={1024}
              sizes="(max-width: 1023px) 100vw, 46vw"
            />
            <figcaption className="num">
              <span>{c("Da ideia", "From idea")}</span>
              <span>{c("À produção", "To production")}</span>
            </figcaption>
          </figure>

          <div className="st-side">
            <ol className="st-pillars">
              {pillars.map(([n, title, text]) => (
                <li className="st-pillar" key={n}>
                  <span className="st-n">{n}</span>
                  <div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="st-founder">
              <Image src="/picture.png" alt="" width={48} height={48} />
              <p>
                <strong>William Moreli</strong>
                <span>
                  {c(
                    "Fundador — arquitetura e engenharia de todos os projetos.",
                    "Founder — architecture and engineering on every project.",
                  )}
                </span>
              </p>
              <a
                href={LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="link"
                aria-label={c("LinkedIn de William Moreli", "William Moreli on LinkedIn")}
              >
                <ArrowUpRight size={18} aria-hidden />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
