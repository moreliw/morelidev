"use client";
import { useEffect, useRef } from "react";
import { gsap, ensureGsap } from "@/lib/gsap";

/**
 * Abertura curta (~1,5 s) só na primeira visita da sessão. O CSS só mostra
 * a camada quando há motion e a sessão ainda não carregou — e um failsafe
 * em CSS a esconde sozinho se o JS falhar. Nunca bloqueia o conteúdo: o h1
 * já está pintado por baixo.
 */
export function Preloader() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const html = document.documentElement;
    const done = () => {
      html.dataset.loaded = "1";
      try {
        sessionStorage.setItem("md-loaded", "1");
      } catch {}
      window.dispatchEvent(new Event("md:loaded"));
    };
    if (!root || html.dataset.loaded || html.dataset.motion !== "on") {
      done();
      return;
    }

    ensureGsap();
    // Esconde em vez de remover: o nó pertence ao React.
    const tl = gsap.timeline({ onComplete: () => void (root.style.display = "none") });
    tl.to(root.querySelectorAll(".pl-mark path"), {
      opacity: 1,
      y: 0,
      duration: 0.7,
      stagger: 0.12,
      ease: "expo.out",
    })
      .to(root.querySelector(".pl-bar i"), { scaleX: 1, duration: 1.15, ease: "power2.inOut" }, 0)
      .to(root.querySelector(".pl-inner"), { opacity: 0, y: -24, duration: 0.45, ease: "power2.in" }, 1.25)
      .add(done, 1.45)
      .to(
        root,
        { clipPath: "inset(0% 0% 100% 0%)", duration: 0.95, ease: "expo.inOut" },
        1.4,
      );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="pl" ref={rootRef} aria-hidden="true">
      <div className="pl-inner">
        <svg className="pl-mark" viewBox="0 0 1000 1000" width="72" height="72">
          <defs>
            <linearGradient id="pl-g" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0" stopColor="#3AA0FF" />
              <stop offset="0.55" stopColor="#2F6BFF" />
              <stop offset="1" stopColor="#5A6CFF" />
            </linearGradient>
          </defs>
          <g transform="translate(80,110)">
            <path
              d="M70 600 L280 170 Q295 140 332 140 H430 L220 620 Q205 655 168 655 H70 Q45 655 60 625 Z"
              fill="#F7F8FA"
            />
            <path
              d="M260 600 L500 100 Q515 70 552 70 H655 L410 620 Q395 655 360 655 H255 Q232 655 245 625 Z"
              fill="url(#pl-g)"
            />
            <path d="M445 360 L555 190 L760 620 Q775 655 738 655 H650 Q620 655 605 626 Z" fill="#3a4458" />
          </g>
        </svg>
        <p className="pl-name">MORELI/DEV</p>
        <div className="pl-bar">
          <i />
        </div>
      </div>
    </div>
  );
}
