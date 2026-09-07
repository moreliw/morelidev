import Image from "next/image";
import { ArrowUpRight, Compass, Handshake, ShieldCheck, TrendingUp } from "lucide-react";
import type { Copy } from "./types";
import { LINKS, STACK } from "@/content/site";

export function Company({ c }: { c: Copy }) {
  const values = [
    [
      Compass,
      c("Clareza", "Clarity"),
      c(
        "Comunicação transparente do escopo ao lançamento.",
        "Transparent communication from scope to launch.",
      ),
    ],
    [
      Handshake,
      c("Proximidade", "Partnership"),
      c(
        "Um time ao lado do negócio, não um fornecedor distante.",
        "A team next to the business, not a distant vendor.",
      ),
    ],
    [
      ShieldCheck,
      c("Qualidade", "Quality"),
      c(
        "Engenharia cuidadosa em cada etapa da entrega.",
        "Careful engineering at every stage of delivery.",
      ),
    ],
    [
      TrendingUp,
      c("Evolução", "Evolution"),
      c(
        "Software preparado para o próximo passo da empresa.",
        "Software ready for the company's next step.",
      ),
    ],
  ] as const;
  return (
    <section id="empresa" className="company section-space" aria-labelledby="company-title">
      <div className="container-site">
        <div className="company-grid">
          <div>
            <p className="kicker" data-reveal>
              {c("A EMPRESA", "THE COMPANY")}
            </p>
            <h2 id="company-title" data-reveal style={{ "--i": 1 } as React.CSSProperties}>
              {c("Engenharia próxima do negócio.", "Engineering close to the business.")}
            </h2>
            <p className="company-lead" data-reveal style={{ "--i": 2 } as React.CSSProperties}>
              {c(
                "A MoreliDev é um estúdio de software que combina estratégia, design e engenharia para transformar desafios reais em produtos digitais preparados para evoluir. Trabalhamos com times multidisciplinares e foco em resultado.",
                "MoreliDev is a software studio that combines strategy, design and engineering to turn real challenges into digital products built to evolve. We work with multidisciplinary teams and a focus on results.",
              )}
            </p>
            <div className="company-founder" data-reveal style={{ "--i": 3 } as React.CSSProperties}>
              <Image src="/picture.png" alt="William Moreli" width={42} height={42} />
              <div>
                <strong>William Moreli</strong>
                <span>{c("Fundador · Engenharia", "Founder · Engineering")}</span>
              </div>
              <a
                href={LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={c("LinkedIn de William Moreli", "William Moreli on LinkedIn")}
              >
                <ArrowUpRight size={19} aria-hidden />
              </a>
            </div>
          </div>
          <div className="values" data-reveal style={{ "--i": 1 } as React.CSSProperties}>
            {values.map(([Icon, title, text]) => (
              <div key={title}>
                <Icon size={21} strokeWidth={1.5} aria-hidden />
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="stack" data-reveal>
          <span>{c("TECNOLOGIAS QUE UTILIZAMOS", "TECHNOLOGIES WE USE")}</span>
          <ul>
            {STACK.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
