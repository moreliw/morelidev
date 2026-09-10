"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowUpRight, Compass, Gem, Handshake, TrendingUp } from "lucide-react";
import type { Copy } from "./types";
import { LINKS } from "@/content/site";
import { ensureGsap, gsap } from "@/lib/gsap";

export function Studio({ c }: { c: Copy }) {
  const ref = useRef<HTMLDivElement>(null);

  const principles = [
    [Compass, c("Clareza", "Clarity"), c(
      "Comunicação direta, sem jargão desnecessário.",
      "Direct communication, no unnecessary jargon.",
    )],
    [Gem, c("Ofício", "Craft"), c(
      "Atenção aos detalhes que fazem a diferença.",
      "Attention to the details that make the difference.",
    )],
    [Handshake, c("Parceria", "Partnership"), c(
      "Um time ao lado do negócio, não um fornecedor distante.",
      "A team beside the business, not a distant vendor.",
    )],
    [TrendingUp, c("Evolução", "Evolution"), c(
      "Software pensado para o próximo passo, não só para hoje.",
      "Software built for the next step, not just for today.",
    )],
  ] as const;

  useEffect(() => {
    ensureGsap();
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.from(el.querySelectorAll(".principle"), {
        opacity: 0,
        y: 24,
        duration: 0.7,
        stagger: 0.08,
        scrollTrigger: { trigger: el, start: "top 82%" },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section id="estudio" className="studio section-space" data-theme="light" aria-labelledby="studio-title">
      <div className="container-site studio-grid">
        <div>
          <p className="eyebrow">{c("O ESTÚDIO", "THE STUDIO")}</p>
          <h2 id="studio-title" className="h-section">
            MORELI/DEV
            <br />
            {c("Estúdio de tecnologia criativa.", "Creative technology studio.")}
          </h2>
          <p className="studio-lead lead">
            {c(
              "Unimos estratégia, design e engenharia para transformar operações complexas em produtos digitais que funcionam de verdade.",
              "We bring strategy, design and engineering together to turn complex operations into digital products that actually work.",
            )}
          </p>
          <div className="studio-founder">
            <Image src="/picture.png" alt="William Moreli" width={40} height={40} />
            <div>
              <strong>William Moreli</strong>
              <span>{c("Fundador · Engenharia", "Founder · Engineering")}</span>
            </div>
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

        <div className="principles" ref={ref}>
          {principles.map(([Icon, title, text]) => (
            <div className="principle" key={title}>
              <Icon size={20} strokeWidth={1.5} aria-hidden />
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
