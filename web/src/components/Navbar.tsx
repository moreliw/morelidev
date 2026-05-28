"use client";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "motion/react";
import { useLanguage } from "@/context/LanguageContext";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const { language, setLanguage } = useLanguage();
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const labels = useMemo(
    () =>
      language === "pt"
        ? {
            about: "Sobre",
            services: "Serviços",
            stack: "Stack",
            projects: "Projetos",
            contact: "Contato",
            cta: "Fale comigo",
          }
        : {
            about: "About",
            services: "Services",
            stack: "Stack",
            projects: "Work",
            contact: "Contact",
            cta: "Let's talk",
          },
    [language]
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = ["about", "services", "stack", "projects", "contact"];
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const navLinks = [
    { href: "#about", id: "about", label: labels.about },
    { href: "#services", id: "services", label: labels.services },
    { href: "#stack", id: "stack", label: labels.stack },
    { href: "#projects", id: "projects", label: labels.projects },
    { href: "#contact", id: "contact", label: labels.contact },
  ];

  return (
    <header
      className={
        "fixed top-0 left-0 right-0 z-50 transition-[background,backdrop-filter,border-color] duration-500 " +
        (scrolled
          ? "bg-[rgba(7,7,10,0.65)] backdrop-blur-xl border-b border-[color:var(--hairline)]"
          : "bg-transparent border-b border-transparent")
      }
    >
      <nav
        className="mx-auto flex items-center justify-between px-6 lg:px-10 py-4"
        style={{ maxWidth: "var(--max)" }}
      >
        <Link
          href="#top"
          className="group inline-flex items-center gap-2.5 text-[color:var(--ink)]"
          aria-label="Moreli Dev — home"
        >
          <span className="relative inline-flex items-center justify-center w-8 h-8 rounded-lg border border-[color:var(--hairline-strong)] bg-[color:var(--bg-card)] overflow-hidden">
            <span
              aria-hidden
              className="absolute inset-0 opacity-50"
              style={{
                background:
                  "radial-gradient(circle at 50% 0%, rgba(124,147,255,0.6), transparent 70%)",
              }}
            />
            <span className="relative font-serif text-[15px] tracking-tight">
              M
            </span>
          </span>
          <span className="hidden sm:inline-flex items-baseline gap-1">
            <span className="font-serif text-[15px] tracking-tight">
              moreli
            </span>
            <span className="text-[10px] tracking-[0.25em] uppercase text-[color:var(--muted)] group-hover:text-[color:var(--accent)] transition-colors">
              .dev
            </span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1 glass rounded-full px-2 py-1.5">
          {navLinks.map((link) => {
            const isActive = active === link.id;
            return (
              <a
                key={link.href}
                href={link.href}
                className="relative px-3.5 py-1.5 text-[12.5px] font-medium tracking-wide text-[color:var(--ink-soft)] hover:text-[color:var(--ink)] transition-colors"
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-full bg-white/[0.07] border border-white/10"
                    transition={{
                      type: "spring",
                      stiffness: 320,
                      damping: 28,
                    }}
                  />
                )}
                <span className="relative">{link.label}</span>
              </a>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center text-[10px] font-medium tracking-[0.18em] uppercase text-[color:var(--muted)]">
            <button
              type="button"
              onClick={() => setLanguage("pt")}
              className={
                "px-1.5 transition-colors " +
                (language === "pt"
                  ? "text-[color:var(--ink)]"
                  : "hover:text-[color:var(--ink-soft)]")
              }
            >
              PT
            </button>
            <span className="text-[color:var(--muted-3)]">/</span>
            <button
              type="button"
              onClick={() => setLanguage("en")}
              className={
                "px-1.5 transition-colors " +
                (language === "en"
                  ? "text-[color:var(--ink)]"
                  : "hover:text-[color:var(--ink-soft)]")
              }
            >
              EN
            </button>
          </div>

          <a
            href="#contact"
            className="hidden sm:inline-flex items-center gap-1.5 pl-4 pr-3 py-2 rounded-full bg-[color:var(--ink)] text-[#06060a] text-[11px] font-semibold tracking-[0.14em] uppercase group hover:bg-[color:var(--accent)] transition-colors"
          >
            {labels.cta}
            <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          <button
            type="button"
            aria-label="Menu"
            className="md:hidden p-2 -mr-2 text-[color:var(--ink)]"
            onClick={() => setMobileOpen((o) => !o)}
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {/* scroll progress */}
      <motion.div
        style={{ scaleX, transformOrigin: "0%" }}
        className="h-px w-full bg-gradient-to-r from-[color:var(--accent)] via-[color:var(--accent-2)] to-[color:var(--accent-warm)]"
      />

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="md:hidden absolute top-full left-0 right-0 bg-[color:var(--bg-deep)] border-t border-[color:var(--hairline)]"
          >
            <nav className="flex flex-col py-2">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="px-6 py-3.5 text-sm font-medium text-[color:var(--ink-soft)] hover:bg-white/5 hover:text-[color:var(--ink)] transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </motion.a>
              ))}
              <div className="flex items-center gap-2 px-6 py-4 border-t border-[color:var(--hairline)] text-xs font-medium uppercase tracking-[0.18em] text-[color:var(--muted)]">
                <button
                  type="button"
                  onClick={() => setLanguage("pt")}
                  className={language === "pt" ? "text-[color:var(--ink)]" : ""}
                >
                  PT
                </button>
                <span>/</span>
                <button
                  type="button"
                  onClick={() => setLanguage("en")}
                  className={language === "en" ? "text-[color:var(--ink)]" : ""}
                >
                  EN
                </button>
                <a
                  href="#contact"
                  onClick={() => setMobileOpen(false)}
                  className="ml-auto btn-primary text-[11px] py-2 px-4"
                >
                  {labels.cta}
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
