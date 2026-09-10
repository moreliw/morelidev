"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/**
 * Cursor customizado — desktop apenas (pointer: fine). Nunca substitui o
 * cursor do sistema em toque ou quando o motion está desligado; o CSS em
 * globals.css garante isso independentemente deste componente montar.
 *
 * Elementos que precisam de um estado (link, projeto, arraste, CTA) levam
 * `data-cursor="link" | "view" | "drag" | "go"` — delegação de evento em
 * vez de um listener por elemento.
 */
const LABELS: Record<string, string> = {
  view: "VIEW",
  drag: "DRAG",
  go: "GO",
};

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduced.matches) return;

    const dot = dotRef.current;
    const label = labelRef.current;
    if (!dot || !label) return;

    document.body.classList.add("cursor-none");

    const moveX = gsap.quickTo(dot, "x", { duration: 0.5, ease: "power3" });
    const moveY = gsap.quickTo(dot, "y", { duration: 0.5, ease: "power3" });
    let visible = false;

    const onMove = (event: PointerEvent) => {
      moveX(event.clientX);
      moveY(event.clientY);
      if (!visible) {
        visible = true;
        gsap.to(dot, { opacity: 1, duration: 0.25 });
      }
    };
    const onLeaveWindow = () => {
      visible = false;
      gsap.to(dot, { opacity: 0, duration: 0.25 });
    };

    const setState = (state: string | null) => {
      dot.dataset.state = state ?? "default";
      label.textContent = state ? (LABELS[state] ?? "") : "";
    };

    const onOver = (event: PointerEvent) => {
      const target = (event.target as HTMLElement)?.closest<HTMLElement>("[data-cursor]");
      setState(target?.dataset.cursor ?? null);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    document.addEventListener("mouseleave", onLeaveWindow);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      document.removeEventListener("mouseleave", onLeaveWindow);
      document.body.classList.remove("cursor-none");
    };
  }, []);

  return (
    <div className="cursor" ref={dotRef} aria-hidden="true">
      <span className="cursor-ring" />
      <span className="cursor-label" ref={labelRef} />
    </div>
  );
}
