"use client";
import { useEffect, useRef } from "react";
import type { Copy } from "./types";
import { HeroCanvas } from "./canvas/HeroCanvas";
import { ensureGsap, gsap, ScrollTrigger, SplitText } from "@/lib/gsap";

export function Hero({ c }: { c: Copy }) {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ensureGsap();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const group = groupRef.current;
    if (!section || !headline || !group) return;

    // Quem pede movimento reduzido recebe o hero inteiro, já no estado
    // final — sem reveal, sem decomposição no scroll, sem paralaxe.
    if (reduced) return;

    let onMove: ((e: PointerEvent) => void) | null = null;

    const ctx = gsap.context(() => {
      const split = SplitText.create(headline, {
        type: "lines",
        mask: "lines",
        linesClass: "hero-line",
      });

      const tl = gsap.timeline({ delay: 0.15 });
      tl.from(
        split.lines,
        { yPercent: 112, duration: 1.1, stagger: 0.09, ease: "expo.out" },
        0,
      )
        .from(".hero-eyebrow", { opacity: 0, y: 10, duration: 0.7 }, 0.15)
        .from(".hero-sub", { opacity: 0, y: 10, duration: 0.7 }, 0.45)
        .from(".hero-cue", { opacity: 0, duration: 0.8 }, 0.9);

      {
        // Decomposição sutil: as duas linhas se afastam em velocidades
        // diferentes conforme o hero sai de cena, dando lugar ao manifesto.
        const lines = split.lines as HTMLElement[];
        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 0.4,
          onUpdate: (self) => {
            const p = self.progress;
            lines.forEach((line, i) => {
              gsap.set(line, {
                yPercent: -p * (26 + i * 22),
                opacity: 1 - p * 1.15,
              });
            });
            gsap.set(".hero-eyebrow, .hero-sub, .hero-cue", {
              opacity: 1 - p * 1.6,
              y: -p * 20,
            });
          },
        });

        // Paralaxe de ponteiro — poucos pixels, só em mouse/trackpad.
        if (window.matchMedia("(pointer: fine)").matches) {
          const moveX = gsap.quickTo(group, "x", { duration: 0.6, ease: "power3" });
          const moveY = gsap.quickTo(group, "y", { duration: 0.6, ease: "power3" });
          onMove = (e: PointerEvent) => {
            const rect = section.getBoundingClientRect();
            const px = (e.clientX - rect.left) / rect.width - 0.5;
            const py = (e.clientY - rect.top) / rect.height - 0.5;
            moveX(px * 14);
            moveY(py * 10);
          };
          section.addEventListener("pointermove", onMove);
        }
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
      className="hero"
      data-theme="dark"
      aria-labelledby="hero-title"
    >
      <HeroCanvas />
      <div className="hero-vignette" aria-hidden />
      <div className="container-site hero-inner" ref={groupRef}>
        <p className="eyebrow hero-eyebrow">
          MORELI/DEV — {c("ESTÚDIO DE TECNOLOGIA CRIATIVA", "CREATIVE TECHNOLOGY STUDIO")}
        </p>
        <h1 id="hero-title" className="hero-title h-hero" ref={headlineRef}>
          {c("A gente constrói", "We build")}
          <br />
          {c("o que vem ", "what's ")}
          <span className="hero-accent">{c("depois.", "next.")}</span>
        </h1>
        <p className="hero-sub num">
          {c("ESTRATÉGIA — DESIGN — ENGENHARIA", "STRATEGY — DESIGN — ENGINEERING")}
        </p>
      </div>
      <div className="hero-cue" aria-hidden>
        <span className="hero-cue-line" />
        <span className="num">{c("ROLE", "SCROLL")}</span>
      </div>
    </section>
  );
}
