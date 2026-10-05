"use client";
import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { Copy } from "./types";
import { getLenis } from "../motion/SmoothScroll";

const IDS = ["inicio", "estudio", "servicos", "trabalhos", "produtos", "processo", "alcance", "contato"];

/** Atalhos fixos "seção anterior / próxima seção" — só desktop. */
export function SectionNav({ c }: { c: Copy }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const update = () => {
      const mid = window.innerHeight * 0.4;
      let idx = 0;
      IDS.forEach((id, i) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= mid) idx = i;
      });
      setCurrent(idx);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  const go = (dir: -1 | 1) => {
    const el = document.getElementById(IDS[Math.max(0, Math.min(IDS.length - 1, current + dir))]);
    if (!el) return;
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(el, { duration: 1.3 });
    else el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="snav" aria-label={c("Navegar entre seções", "Navigate sections")} role="group">
      <button
        type="button"
        onClick={() => go(-1)}
        disabled={current === 0}
        aria-label={c("Seção anterior", "Previous section")}
        data-cursor="link"
      >
        <ChevronUp size={17} aria-hidden />
      </button>
      <button
        type="button"
        onClick={() => go(1)}
        disabled={current === IDS.length - 1}
        aria-label={c("Próxima seção", "Next section")}
        data-cursor="link"
        data-primary
      >
        <ChevronDown size={17} aria-hidden />
      </button>
    </div>
  );
}
