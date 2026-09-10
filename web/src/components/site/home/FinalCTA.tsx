"use client";
import { useEffect, useRef } from "react";
import { Mail, MessageCircle } from "lucide-react";
import type { Copy } from "./types";
import { LINKS } from "@/content/site";
import { ContactForm } from "../ContactForm";
import { ensureGsap, gsap, SplitText } from "@/lib/gsap";

export function FinalCTA({ c }: { c: Copy }) {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    ensureGsap();
    const section = sectionRef.current;
    const headline = headlineRef.current;
    if (!section || !headline) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let onMove: ((e: PointerEvent) => void) | null = null;
    const ctx = gsap.context(() => {
      if (!reduced) {
        const split = SplitText.create(headline, {
          type: "lines",
          mask: "lines",
          linesClass: "cta-line",
        });
        gsap.from(split.lines, {
          yPercent: 110,
          duration: 1,
          stagger: 0.08,
          ease: "expo.out",
          scrollTrigger: { trigger: section, start: "top 70%" },
        });
        gsap.from(".cta-reveal", {
          opacity: 0,
          y: 18,
          duration: 0.8,
          stagger: 0.08,
          scrollTrigger: { trigger: section, start: "top 55%" },
        });
      }

      if (!reduced && window.matchMedia("(pointer: fine)").matches) {
        const moveX = gsap.quickTo(headline, "x", { duration: 0.6, ease: "power3" });
        const moveY = gsap.quickTo(headline, "y", { duration: 0.6, ease: "power3" });
        onMove = (e: PointerEvent) => {
          const rect = section.getBoundingClientRect();
          const px = (e.clientX - rect.left) / rect.width - 0.5;
          const py = (e.clientY - rect.top) / rect.height - 0.5;
          moveX(px * 10);
          moveY(py * 8);
        };
        section.addEventListener("pointermove", onMove);
      }
    }, section);

    return () => {
      if (onMove) section.removeEventListener("pointermove", onMove);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contato"
      className="final-cta"
      data-theme="dark"
      aria-labelledby="cta-title"
    >
      <div className="container-site cta-grid">
        <div>
          <p className="eyebrow cta-reveal">{c("VAMOS CONVERSAR", "LET'S TALK")}</p>
          <h2 id="cta-title" className="cta-title h-hero" ref={headlineRef}>
            {c("Tem uma ideia?", "Have an idea?")}
            <br />
            {c("Vamos torná-la real.", "Let's make it real.")}
          </h2>
          <div className="cta-channels cta-reveal">
            <a href={`mailto:${LINKS.email}`} data-cursor="link">
              <Mail size={17} strokeWidth={1.7} aria-hidden />
              {LINKS.email}
            </a>
            <a href={LINKS.whatsapp} target="_blank" rel="noopener noreferrer" data-cursor="link">
              <MessageCircle size={17} strokeWidth={1.7} aria-hidden />
              WhatsApp
            </a>
          </div>
        </div>
        <div className="cta-form cta-reveal">
          <h3>{c("Conte sobre o seu projeto", "Tell us about your project")}</h3>
          <p>{c("Respondemos em até um dia útil.", "We reply within one business day.")}</p>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
