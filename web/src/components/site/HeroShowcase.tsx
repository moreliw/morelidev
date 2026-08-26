"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { FEATURED_PROJECTS } from "@/data/projects";

const primary = FEATURED_PROJECTS[0];
const secondary = FEATURED_PROJECTS[1];

/**
 * Composição editorial com interfaces reais dos projetos — não ilustração,
 * não laptop 3D genérico. Paralaxe sutil ao mover o mouse (desktop, ponteiro
 * fino, sem prefers-reduced-motion); estático em qualquer outro caso.
 */
export function HeroShowcase() {
  const rootRef = useRef<HTMLDivElement>(null);
  const frameA = useRef<HTMLDivElement>(null);
  const frameB = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    function onMove(e: MouseEvent) {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const rect = root!.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        if (frameA.current) {
          frameA.current.style.transform = `translate3d(${px * -8}px, ${py * -8}px, 0)`;
        }
        if (frameB.current) {
          frameB.current.style.transform = `translate3d(${px * 10}px, ${py * 10}px, 0)`;
        }
      });
    }
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  if (!primary) return null;

  return (
    <div ref={rootRef} className="anim-fade-2 relative aspect-[4/5] sm:aspect-[5/4] lg:aspect-[9/10]">
      <div
        ref={frameA}
        className="absolute left-0 top-0 w-[78%] border border-[color:var(--hairline-strong)] bg-[color:var(--bg-raised)] shadow-[0_1px_0_var(--hairline)] will-change-transform"
      >
        <div className="relative aspect-[16/10]">
          <Image
            src={primary.poster}
            alt={`${primary.title} — ${primary.category.pt}`}
            fill
            sizes="(max-width: 1024px) 78vw, 34vw"
            priority
            className="object-cover object-top"
          />
        </div>
        <p className="px-4 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.08em] text-[color:var(--muted)] border-t border-[color:var(--hairline)]">
          {primary.title} <span className="text-[color:var(--muted-2)] font-normal normal-case tracking-normal">— {primary.category.pt}</span>
        </p>
      </div>

      {secondary && (
        <div
          ref={frameB}
          className="hidden sm:block absolute right-0 bottom-0 w-[52%] border border-[color:var(--hairline-strong)] bg-[color:var(--bg-raised)] will-change-transform"
        >
          <div className="relative aspect-[16/10]">
            <Image
              src={secondary.poster}
              alt={`${secondary.title} — ${secondary.category.pt}`}
              fill
              sizes="(max-width: 1024px) 40vw, 20vw"
              className="object-cover object-top"
            />
          </div>
          <p className="px-3 py-2.5 text-[0.68rem] font-semibold uppercase tracking-[0.08em] text-[color:var(--muted)] border-t border-[color:var(--hairline)]">
            {secondary.title}
          </p>
        </div>
      )}
    </div>
  );
}
