"use client";
import { useEffect, useRef } from "react";
import type { Copy } from "./types";
import { ensureGsap, gsap } from "@/lib/gsap";

/** Posições fixas (não aleatórias a cada render) — evita divergência SSR/CSR. */
const SCATTER = [
  { x: -6, y: -8, r: -7 },
  { x: 10, y: 4, r: 5 },
  { x: -12, y: 18, r: 4 },
  { x: 8, y: -14, r: -4 },
  { x: -4, y: 10, r: 8 },
  { x: 14, y: 16, r: -6 },
];

export function Transformation({ c }: { c: Copy }) {
  const systemRef = useRef<HTMLDivElement>(null);

  const chaos = [
    c("Planilhas soltas", "Loose spreadsheets"),
    c("Grupos de WhatsApp", "WhatsApp threads"),
    c("E-mails perdidos", "Lost emails"),
    c("Retrabalho manual", "Manual rework"),
    c("Sem visibilidade", "No visibility"),
    c("Dados espalhados", "Scattered data"),
  ];

  useEffect(() => {
    ensureGsap();
    const system = systemRef.current;
    if (!system) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rows = system.querySelectorAll(".sys-row");
    const ctx = gsap.context(() => {
      gsap.from(rows, {
        opacity: 0,
        x: 16,
        duration: 0.6,
        stagger: 0.09,
        scrollTrigger: { trigger: system, start: "top 78%" },
      });
    }, system);
    return () => ctx.revert();
  }, []);

  return (
    <section className="transformation section-space" data-theme="light" aria-labelledby="transformation-title">
      <div className="container-site">
        <div className="transformation-head">
          <p className="eyebrow">{c("TRANSFORMAÇÃO", "TRANSFORMATION")}</p>
          <h2 id="transformation-title" className="h-section">
            {c("Caos na entrada.", "Complex in.")}
            <br />
            <span className="transformation-accent">
              {c("Simples na saída.", "Simple out.")}
            </span>
          </h2>
        </div>

        <div className="transformation-grid">
          <div className="chaos-panel">
            <p className="panel-label num">{c("HOJE", "TODAY")}</p>
            <div className="chaos-field">
              {chaos.map((label, i) => {
                const s = SCATTER[i % SCATTER.length];
                return (
                  <span
                    className="chaos-chip"
                    key={label}
                    style={{
                      transform: `translate(${s.x}px, ${s.y}px) rotate(${s.r}deg)`,
                    }}
                  >
                    {label}
                  </span>
                );
              })}
            </div>
          </div>

          <div className="system-panel" ref={systemRef}>
            <p className="panel-label num">{c("COM A MORELIDEV", "WITH MORELIDEV")}</p>
            <div className="system-field">
              <div className="sys-row sys-row--wide" />
              <div className="sys-row sys-row--pair">
                <span />
                <span />
              </div>
              <div className="sys-row sys-row--pair">
                <span />
                <span />
              </div>
              <div className="sys-row" />
              <div className="sys-row sys-row--short" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
