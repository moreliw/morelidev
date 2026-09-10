"use client";
import { useEffect, useRef, useState } from "react";
import type { Copy } from "./types";
import { ensureGsap, gsap, ScrollTrigger } from "@/lib/gsap";

export function Capabilities({ c }: { c: Copy }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [pinned, setPinned] = useState(false);

  const panels = [
    {
      word: "DESIGN",
      desc: c(
        "Interfaces que fazem a complexidade desaparecer.",
        "Interfaces that make complexity disappear.",
      ),
    },
    {
      word: c("ENGENHARIA", "ENGINEERING"),
      desc: c(
        "Software construído para o mundo real.",
        "Software built for the real world.",
      ),
    },
    {
      word: c("PRODUTO", "PRODUCT"),
      desc: c(
        "Do zero a algo que as pessoas usam de verdade.",
        "From zero to something people actually use.",
      ),
    },
    {
      word: c("AUTOMAÇÃO", "AUTOMATION"),
      desc: c(
        "Menos trabalho repetitivo. Mais trabalho que importa.",
        "Less repetitive work. More work that matters.",
      ),
    },
  ];

  useEffect(() => {
    ensureGsap();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const track = trackRef.current;
    if (!track || reduced) return;

    setPinned(true);
    let current = 0;

    const crossfade = (idx: number) => {
      wordRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.to(el, {
          opacity: i === idx ? 1 : 0,
          y: i === idx ? 0 : i < idx ? -26 : 26,
          duration: 0.55,
          ease: "power2.out",
        });
      });
    };
    crossfade(0);

    const trigger = ScrollTrigger.create({
      trigger: track,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const idx = Math.min(
          panels.length - 1,
          Math.floor(self.progress * panels.length),
        );
        if (idx !== current) {
          current = idx;
          setActive(idx);
          crossfade(idx);
        }
      },
    });

    return () => trigger.kill();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section
      className="capabilities"
      data-theme="dark"
      id="capacidades"
      aria-label={c("Capacidades", "Capabilities")}
    >
      <div
        className="capabilities-track"
        ref={trackRef}
        data-pinned={pinned || undefined}
        style={pinned ? { height: `${panels.length * 100}vh` } : undefined}
      >
        <div className="capabilities-sticky">
          <div className="container-site capabilities-inner">
            <p className="eyebrow">{c("O QUE FAZEMOS", "WHAT WE DO")}</p>
            <div className="capabilities-stage">
              {panels.map((p, i) => (
                <div
                  className="capabilities-word"
                  key={p.word}
                  ref={(el) => {
                    wordRefs.current[i] = el;
                  }}
                  data-active={!pinned || i === active || undefined}
                >
                  <h3 className="h-display">{p.word}</h3>
                  <p className="capabilities-desc lead">{p.desc}</p>
                </div>
              ))}
            </div>
            {pinned && (
              <div className="capabilities-progress" aria-hidden>
                {panels.map((p, i) => (
                  <span key={p.word} data-on={i === active || undefined} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
