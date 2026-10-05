"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import type { Copy } from "./types";
import { PROJECTS } from "@/data/projects";
import { useLanguage } from "@/context/LanguageContext";
import { ensureGsap, gsap, ScrollTrigger } from "@/lib/gsap";
import { getLenis } from "../motion/SmoothScroll";

// Ordem editorial da vitrine e a melhor imagem de cada projeto.
const ORDER = ["mameri", "empresa-capixaba", "cipritex", "takki", "saldo-casa", "padel", "will-market"];
const IMAGE: Record<string, string> = {
  "empresa-capixaba": "/images/cases/empresa-capixaba.webp",
};

/**
 * Projetos numa fita curva em 3D (vista por dentro do cilindro, como um
 * rolo de filme). O scroll gira a fita, encaixando um projeto por vez.
 * Sem motion, a mesma lista vira uma faixa horizontal com scroll nativo.
 */
export function WorkReel({ c }: { c: Copy }) {
  const { language } = useLanguage();
  const trackRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);

  const projects = ORDER.map((slug) => PROJECTS.find((p) => p.slug === slug)!).filter(Boolean);
  const n = projects.length;
  // A fita completa tem o dobro de quadros — a segunda volta é decorativa.
  const slots = n * 2;
  const step = 360 / slots;

  useEffect(() => {
    ensureGsap();
    const track = trackRef.current;
    const ring = ringRef.current;
    if (!track || !ring || document.documentElement.dataset.motion !== "on") return;

    const cards = Array.from(ring.querySelectorAll<HTMLElement>(".wr-card"));
    const state = { angle: 0 };

    const paint = () => {
      ring.style.setProperty("--rot", `${state.angle}deg`);
      cards.forEach((card, i) => {
        // Quadro i fica em -i·passo; a fita gira +ângulo — o próximo entra pela direita.
        let rel = (((state.angle - i * step) % 360) + 540) % 360 - 180;
        rel = Math.abs(rel);
        // Quadros muito laterais somem antes de "passar" pela câmera.
        const o = Math.max(0, Math.min(1, (78 - rel) / 26));
        card.style.opacity = String(o);
        card.style.visibility = o < 0.01 ? "hidden" : "visible";
        card.style.setProperty("--dim", String(Math.min(1, rel / step) * 0.62));
      });
    };

    const st = ScrollTrigger.create({
      trigger: track,
      start: "top top",
      end: "bottom bottom",
      snap: {
        snapTo: 1 / (n - 1),
        duration: { min: 0.25, max: 0.7 },
        ease: "power2.inOut",
        delay: 0.08,
      },
      onUpdate: (self) => {
        gsap.to(state, {
          angle: self.progress * (n - 1) * step,
          duration: 0.6,
          ease: "power3.out",
          overwrite: true,
          onUpdate: paint,
        });
        const idx = Math.round(self.progress * (n - 1));
        if (idx !== activeRef.current) {
          activeRef.current = idx;
          setActive(idx);
        }
      },
    });
    paint();

    // Inclinação sutil da fita seguindo o ponteiro.
    let onMove: ((e: PointerEvent) => void) | null = null;
    if (window.matchMedia("(pointer: fine)").matches) {
      const tiltX = gsap.quickTo(ring.parentElement!, "--tx", { duration: 0.8, ease: "power3" });
      const tiltY = gsap.quickTo(ring.parentElement!, "--ty", { duration: 0.8, ease: "power3" });
      onMove = (e) => {
        tiltY((e.clientX / window.innerWidth - 0.5) * 6);
        tiltX((e.clientY / window.innerHeight - 0.5) * -4);
      };
      window.addEventListener("pointermove", onMove, { passive: true });
    }

    return () => {
      st.kill();
      gsap.killTweensOf(state);
      if (onMove) window.removeEventListener("pointermove", onMove);
    };
  }, [n, step]);

  const goTo = (i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const idx = Math.max(0, Math.min(n - 1, i));
    if (document.documentElement.dataset.motion !== "on") {
      track.querySelectorAll<HTMLElement>(".wr-card")[idx]?.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
      setActive(idx);
      return;
    }
    const top = track.getBoundingClientRect().top + window.scrollY;
    const y = top + ((track.offsetHeight - window.innerHeight) * idx) / (n - 1);
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(y, { duration: 1.1 });
    else window.scrollTo({ top: y, behavior: "smooth" });
  };

  const current = projects[active];

  return (
    <section id="trabalhos" className="wr" data-theme="dark" aria-labelledby="work-title">
      <div className="container-site wr-head">
        <div>
          <p className="kicker">
            <span>03</span> {c("Projetos", "Work")}
          </p>
          <h2 id="work-title" className="h-big">
            {c("Sistemas em produção,", "Systems in production,")} <em>{c("não protótipos.", "not prototypes.")}</em>
          </h2>
        </div>
        <Link href="/projetos" className="pill pill-ghost" data-cursor="link">
          {c("Todos os projetos", "All projects")}
          <ArrowUpRight size={15} aria-hidden />
        </Link>
      </div>

      <div className="wr-track" ref={trackRef} style={{ ["--n" as string]: n }}>
        <div className="wr-pin">
          <div className="wr-scene">
            <div
              className="wr-ring"
              ref={ringRef}
              style={{ ["--slots" as string]: slots, ["--step" as string]: `${step}deg` }}
            >
              {Array.from({ length: slots }, (_, i) => {
                const p = projects[i % n];
                const decorative = i >= n;
                return (
                  <Link
                    key={`${p.slug}-${i}`}
                    href={`/projetos/${p.slug}`}
                    className="wr-card"
                    style={{ ["--i" as string]: i }}
                    data-cursor="view"
                    data-decorative={decorative || undefined}
                    aria-hidden={decorative || undefined}
                    tabIndex={decorative ? -1 : undefined}
                    aria-label={decorative ? undefined : `${p.title} — ${p.category[language]}`}
                  >
                    <Image
                      src={IMAGE[p.slug] ?? p.poster}
                      alt=""
                      width={1280}
                      height={664}
                      sizes="(max-width: 767px) 78vw, 36vw"
                    />
                    <span className="wr-card-tag num">
                      {String((i % n) + 1).padStart(2, "0")} — {p.category[language]}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="container-site wr-info">
            <div className="wr-count num" aria-hidden>
              <b>{String(active + 1).padStart(2, "0")}</b> / {String(n).padStart(2, "0")}
            </div>
            <div className="wr-meta" aria-live="polite">
              <h3 key={current.slug}>{current.title}</h3>
              <p>{current.resultTitle[language]}</p>
            </div>
            <div className="wr-actions">
              <button
                type="button"
                className="round-btn"
                onClick={() => goTo(active - 1)}
                disabled={active === 0}
                aria-label={c("Projeto anterior", "Previous project")}
                data-cursor="link"
              >
                <ArrowLeft size={17} aria-hidden />
              </button>
              <button
                type="button"
                className="round-btn"
                onClick={() => goTo(active + 1)}
                disabled={active === n - 1}
                aria-label={c("Próximo projeto", "Next project")}
                data-cursor="link"
              >
                <ArrowRight size={17} aria-hidden />
              </button>
              <Link href={`/projetos/${current.slug}`} className="pill pill-accent" data-cursor="view">
                {c("Ver case", "View case")}
                <ArrowUpRight size={15} aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
