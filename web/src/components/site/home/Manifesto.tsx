"use client";
import { useEffect, useRef } from "react";
import type { Copy } from "./types";
import { ensureGsap, gsap, SplitText } from "@/lib/gsap";

export function Manifesto({ c }: { c: Copy }) {
  const textRef = useRef<HTMLHeadingElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    ensureGsap();
    const text = textRef.current;
    const para = paraRef.current;
    if (!text || !para) return;
    // Sem o reveal palavra a palavra tingido no scroll: o texto já nasce
    // inteiro e legível.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const split = SplitText.create(text, { type: "words" });
      gsap.set(split.words, { opacity: 0.14 });
      gsap.to(split.words, {
        opacity: 1,
        stagger: 0.06,
        ease: "none",
        scrollTrigger: {
          trigger: text,
          start: "top 78%",
          end: "bottom 45%",
          scrub: true,
        },
      });

      gsap.from(para, {
        opacity: 0,
        y: 24,
        duration: 0.9,
        scrollTrigger: { trigger: para, start: "top 88%" },
      });
    }, text);

    return () => ctx.revert();
  }, []);

  return (
    <section className="manifesto section-space" data-theme="light" aria-labelledby="manifesto-title">
      <div className="container-site manifesto-grid">
        <h2 id="manifesto-title" className="manifesto-text h-display" ref={textRef}>
          {c(
            "Tecnologia não deveria aumentar a complexidade. Ela deveria removê-la.",
            "Technology shouldn't add complexity. It should remove it.",
          )}
        </h2>
        <p className="manifesto-lead lead" ref={paraRef}>
          {c(
            "Transformamos processos complexos, ideias ambiciosas e problemas do dia a dia em produtos digitais que as pessoas realmente usam.",
            "We turn complex processes, ambitious ideas and everyday problems into digital products people actually want to use.",
          )}
        </p>
      </div>
    </section>
  );
}
