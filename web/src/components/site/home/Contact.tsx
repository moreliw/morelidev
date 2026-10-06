"use client";
import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import type { Copy } from "./types";
import { LINKS } from "@/content/site";
import { ContactForm } from "../ContactForm";
import { ensureGsap, gsap, SplitText } from "@/lib/gsap";

export function Contact({ c }: { c: Copy }) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    ensureGsap();
    const section = sectionRef.current;
    const title = titleRef.current;
    if (!section || !title) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const split = SplitText.create(title, { type: "lines", mask: "lines" });
      gsap.from(split.lines, {
        yPercent: 110,
        duration: 1.1,
        stagger: 0.08,
        ease: "expo.out",
        scrollTrigger: { trigger: section, start: "top 70%" },
      });
      gsap.from(".ct-reveal", {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.08,
        ease: "expo.out",
        scrollTrigger: { trigger: section, start: "top 62%" },
      });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="contato" className="ct" data-theme="dark" aria-labelledby="contact-title">
      <div className="ct-glow" aria-hidden />
      <div className="container-site ct-grid">
        <div className="ct-copy">
          <p className="kicker ct-reveal">
            {c("Contato", "Contact")}
          </p>
          <h2 id="contact-title" className="ct-title" ref={titleRef}>
            {c("Vamos falar sobre", "Let's talk about")} <em>{c("o seu projeto.", "your project.")}</em>
          </h2>
          <p className="sec-lead ct-reveal">
            {c(
              "Descreva o que você precisa. Respondemos em até um dia útil.",
              "Tell us what you need. We reply within one business day.",
            )}
          </p>
          <div className="ct-channels ct-reveal">
            <a href={`mailto:${LINKS.email}`} data-cursor="link">
              <span>
                <small className="num">E-mail</small>
                {LINKS.email}
              </span>
              <ArrowUpRight size={16} aria-hidden />
            </a>
            <a href={LINKS.whatsapp} target="_blank" rel="noopener noreferrer" data-cursor="link">
              <span>
                <small className="num">WhatsApp</small>
                +55 27 99955-2024
              </span>
              <ArrowUpRight size={16} aria-hidden />
            </a>
          </div>
        </div>
        <div className="ct-card ct-reveal">
          <h3>{c("Solicitar orçamento", "Request a quote")}</h3>
          <p>{c("Campos com * são obrigatórios.", "Fields marked * are required.")}</p>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
