"use client";
import { useEffect } from "react";

/**
 * Camada de movimento do site.
 * Tudo é opcional: o conteúdo já vem visível do servidor e o script inline
 * do layout só ativa data-motion quando o usuário não pede movimento reduzido.
 */
export function Motion() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches || !("IntersectionObserver" in window)) {
      document.documentElement.removeAttribute("data-motion");
      document
        .querySelectorAll("[data-reveal]")
        .forEach((node) => node.classList.add("is-in"));
      return;
    }

    const cleanups: (() => void)[] = [];

    /* ── 1. Reveals: fade + translateY / máscara ── */
    const reveal = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-in");
          reveal.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.05 },
    );
    document
      .querySelectorAll("[data-reveal]")
      .forEach((node) => reveal.observe(node));
    cleanups.push(() => reveal.disconnect());

    /* ── 2. Números contando ── */
    const counter = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          counter.unobserve(entry.target);
          const node = entry.target as HTMLElement;
          const target = Number(node.dataset.count);
          const suffix = node.dataset.suffix ?? "";
          if (!Number.isFinite(target)) continue;
          const duration = 900;
          const start = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            node.textContent = `${Math.round(target * eased)}${suffix}`;
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.6 },
    );
    document.querySelectorAll("[data-count]").forEach((node) => {
      const rect = node.getBoundingClientRect();
      // já visível no carregamento: mantém o valor final, sem "pulo"
      if (rect.top < window.innerHeight && rect.bottom > 0) return;
      counter.observe(node);
    });
    cleanups.push(() => counter.disconnect());

    /* ── 3. Linha de progresso do processo ── */
    const progress = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-in");
          progress.unobserve(entry.target);
        }
      },
      { threshold: 0.35 },
    );
    document
      .querySelectorAll("[data-progress]")
      .forEach((node) => progress.observe(node));
    cleanups.push(() => progress.disconnect());

    /* ── 4. Parallax de ponteiro (2–3 graus, nada mais) ── */
    const stage = document.querySelector<HTMLElement>("[data-parallax]");
    const fine = window.matchMedia("(pointer: fine)");
    if (stage && fine.matches) {
      let frame = 0;
      const onMove = (event: PointerEvent) => {
        if (frame) return;
        frame = requestAnimationFrame(() => {
          frame = 0;
          const x = event.clientX / window.innerWidth - 0.5;
          const y = event.clientY / window.innerHeight - 0.5;
          stage.style.setProperty("--mx", x.toFixed(3));
          stage.style.setProperty("--my", y.toFixed(3));
        });
      };
      window.addEventListener("pointermove", onMove, { passive: true });
      cleanups.push(() => {
        window.removeEventListener("pointermove", onMove);
        if (frame) cancelAnimationFrame(frame);
      });
    }

    /* ── 5. Hover magnético, discreto, só nos CTAs principais ── */
    if (fine.matches) {
      document
        .querySelectorAll<HTMLElement>("[data-magnetic]")
        .forEach((node) => {
          const onMove = (event: PointerEvent) => {
            const rect = node.getBoundingClientRect();
            const x = (event.clientX - rect.left - rect.width / 2) * 0.16;
            const y = (event.clientY - rect.top - rect.height / 2) * 0.22;
            node.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
          };
          const onLeave = () => {
            node.style.transform = "";
          };
          node.addEventListener("pointermove", onMove);
          node.addEventListener("pointerleave", onLeave);
          cleanups.push(() => {
            node.removeEventListener("pointermove", onMove);
            node.removeEventListener("pointerleave", onLeave);
          });
        });
    }

    /* ── Se a preferência mudar no meio da sessão, tudo para. ── */
    const stop = () => {
      if (!reduced.matches) return;
      document.documentElement.removeAttribute("data-motion");
      document
        .querySelectorAll("[data-reveal]")
        .forEach((node) => node.classList.add("is-in"));
    };
    reduced.addEventListener("change", stop);
    cleanups.push(() => reduced.removeEventListener("change", stop));

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}
