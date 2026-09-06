import type { Copy } from "./types";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { LINKS, STACK } from "@/content/site";

export function About({ c }: { c: Copy }) {
  return (
    <section
      id="empresa"
      className="about-section"
      aria-labelledby="about-title"
    >
      <div className="container-site">
        <div className="about-grid">
          <div>
            <p className="kicker">
              {c("PRAZER, SOMOS A MORELIDEV", "MEET MORELIDEV")}
            </p>
            <h2 id="about-title" className="editorial-title">
              {c("Mais do que código.", "More than code.")}
              <br />
              <em>{c("Parceria de verdade.", "A real partnership.")}</em>
            </h2>
          </div>
          <div>
            <p>
              {c(
                "Somos um estúdio brasileiro de desenvolvimento de software. Unimos estratégia, design e engenharia para transformar desafios reais em soluções digitais simples de usar e preparadas para evoluir.",
                "We are a Brazilian software development studio. We bring strategy, design and engineering together to turn real challenges into digital solutions that are simple to use and ready to evolve.",
              )}
            </p>
            <div className="founder">
              <Image
                src="/picture.png"
                alt="William Moreli"
                width={48}
                height={48}
                sizes="48px"
              />
              <div>
                <strong>William Moreli</strong>
                <span>
                  {c(
                    "Fundador e engenheiro de software",
                    "Founder & software engineer",
                  )}
                </span>
              </div>
              <a
                href={LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn de William Moreli"
              >
                <ArrowUpRight size={21} aria-hidden />
              </a>
            </div>
          </div>
        </div>
        <div className="stack-strip">
          <span className="kicker">
            {c("TECNOLOGIA COM PROPÓSITO", "TECHNOLOGY WITH PURPOSE")}
          </span>
          <div>
            {STACK.filter((s) =>
              [
                ".NET",
                "React",
                "Next.js",
                "Node.js",
                "PostgreSQL",
                "Docker",
              ].includes(s),
            ).map((s) => (
              <span key={s}>{s}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
