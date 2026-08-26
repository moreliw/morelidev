"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { COPY, t } from "@/content/site";

const SECTION_IDS = ["projetos", "servicos", "processo", "empresa"] as const;

export function Header() {
  const { language, setLanguage } = useLanguage();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isHome) return;
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => Boolean(el)
    );
    if (!sections.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [isHome]);

  // Microfeedback da troca PT/EN (anime.js, isolado deste elemento)
  function switchLanguage(next: "pt" | "en") {
    if (next === language) return;
    setLanguage(next);
    const el = langRef.current;
    if (el && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      import("animejs").then(({ animate }) => {
        animate(el, { scale: [1, 1.12, 1], duration: 260, ease: "outQuad" });
      });
    }
  }

  const navLinks = [
    { id: "projetos", label: t(COPY.nav.projects, language) },
    { id: "servicos", label: t(COPY.nav.services, language) },
    { id: "processo", label: t(COPY.nav.process, language) },
    { id: "empresa", label: t(COPY.nav.company, language) },
  ];

  const hrefFor = (id: string) => (isHome ? `#${id}` : `/#${id}`);

  return (
    <header
      className={
        "fixed top-0 inset-x-0 z-[var(--z-header)] transition-[background-color,border-color,backdrop-filter] duration-300 " +
        (scrolled || mobileOpen
          ? "bg-[rgba(246,245,241,0.92)] backdrop-blur-md border-b border-[color:var(--hairline)]"
          : "bg-transparent border-b border-transparent")
      }
    >
      <nav
        aria-label={language === "pt" ? "Navegação principal" : "Main navigation"}
        className="container-site flex items-center justify-between h-[4.25rem]"
      >
        <Link
          href="/"
          className="inline-flex items-center font-semibold tracking-[0.02em] text-[0.95rem] text-[color:var(--ink)]"
          aria-label="MoreliDev — home"
        >
          MORELI<span className="text-[color:var(--accent)]">DEV</span>
        </Link>

        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={hrefFor(link.id)}
                aria-current={active === link.id ? "true" : undefined}
                className={
                  "px-3.5 py-2 text-[0.86rem] font-medium transition-colors duration-200 " +
                  (active === link.id
                    ? "text-[color:var(--ink)]"
                    : "text-[color:var(--muted)] hover:text-[color:var(--ink)]")
                }
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <div
            ref={langRef}
            className="hidden sm:flex items-center text-[0.78rem] font-semibold tracking-wide"
          >
            <button
              type="button"
              onClick={() => switchLanguage("pt")}
              aria-pressed={language === "pt"}
              className={
                "px-1.5 py-2 transition-colors " +
                (language === "pt"
                  ? "text-[color:var(--ink)]"
                  : "text-[color:var(--muted-2)] hover:text-[color:var(--muted)]")
              }
            >
              PT
            </button>
            <span aria-hidden className="text-[color:var(--muted-2)]">/</span>
            <button
              type="button"
              onClick={() => switchLanguage("en")}
              aria-pressed={language === "en"}
              className={
                "px-1.5 py-2 transition-colors " +
                (language === "en"
                  ? "text-[color:var(--ink)]"
                  : "text-[color:var(--muted-2)] hover:text-[color:var(--muted)]")
              }
            >
              EN
            </button>
          </div>

          <a
            href={hrefFor("contato")}
            className="max-sm:!hidden btn btn-primary !min-h-9 !py-2 !px-4 text-[0.82rem]"
          >
            {t(COPY.nav.cta, language)}
          </a>

          <button
            type="button"
            aria-label={t(mobileOpen ? COPY.nav.menuClose : COPY.nav.menuOpen, language)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            className="md:hidden -mr-2 size-11 flex items-center justify-center text-[color:var(--ink)]"
            onClick={() => setMobileOpen((o) => !o)}
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div
          id="mobile-menu"
          className="md:hidden border-t border-[color:var(--hairline)] bg-[color:var(--bg)]"
        >
          <nav
            aria-label={language === "pt" ? "Menu móvel" : "Mobile menu"}
            className="container-site flex flex-col py-2"
          >
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={hrefFor(link.id)}
                onClick={() => setMobileOpen(false)}
                className="py-3.5 text-[0.95rem] font-medium text-[color:var(--ink-soft)] hover:text-[color:var(--ink)] transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="flex items-center justify-between py-4 mt-1 border-t border-[color:var(--hairline)]">
              <div className="flex items-center text-[0.8rem] font-semibold">
                <button
                  type="button"
                  onClick={() => switchLanguage("pt")}
                  aria-pressed={language === "pt"}
                  className={
                    "px-2 py-2 " +
                    (language === "pt"
                      ? "text-[color:var(--ink)]"
                      : "text-[color:var(--muted-2)]")
                  }
                >
                  PT
                </button>
                <span aria-hidden className="text-[color:var(--muted-2)]">/</span>
                <button
                  type="button"
                  onClick={() => switchLanguage("en")}
                  aria-pressed={language === "en"}
                  className={
                    "px-2 py-2 " +
                    (language === "en"
                      ? "text-[color:var(--ink)]"
                      : "text-[color:var(--muted-2)]")
                  }
                >
                  EN
                </button>
              </div>
              <a
                href={hrefFor("contato")}
                onClick={() => setMobileOpen(false)}
                className="btn btn-primary !min-h-10 !py-2 text-[0.85rem]"
              >
                {t(COPY.nav.cta, language)}
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
