"use client";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const { language, setLanguage } = useLanguage();

  const labels = useMemo(
    () =>
      language === "pt"
        ? {
            about: "Sobre",
            services: "Serviços",
            projects: "Projetos",
            clients: "Clientes",
            contact: "Contato",
            cta: "Conversar",
          }
        : {
            about: "About",
            services: "Services",
            projects: "Work",
            clients: "Clients",
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
    const ids = ["about", "services", "projects", "clients", "contact"];
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
    { href: "#projects", id: "projects", label: labels.projects },
    { href: "#clients", id: "clients", label: labels.clients },
    { href: "#contact", id: "contact", label: labels.contact },
  ];

  return (
    <header
      className={
        "fixed top-0 left-0 right-0 z-50 transition-[background,backdrop-filter,border-color] duration-500 " +
        (scrolled
          ? "bg-[color:var(--bg)]/85 backdrop-blur-md border-b border-[color:var(--hairline)]"
          : "bg-transparent border-b border-transparent")
      }
    >
      <nav
        className="mx-auto flex items-center justify-between px-6 lg:px-10 py-5"
        style={{ maxWidth: "var(--max)" }}
      >
        <Link
          href="#"
          className="group inline-flex items-baseline gap-1 text-[color:var(--ink)]"
          aria-label="Will Tech — home"
        >
          <span className="font-serif text-xl tracking-tight">Will</span>
          <span className="text-xs tracking-[0.25em] uppercase text-[color:var(--muted)] group-hover:text-[color:var(--accent)] transition-colors">
            Tech
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-9">
          {navLinks.map((link) => {
            const isActive = active === link.id;
            return (
              <a
                key={link.href}
                href={link.href}
                className="relative text-[13px] font-medium tracking-wide text-[color:var(--ink-soft)] hover:text-[color:var(--ink)] transition-colors"
              >
                {link.label}
                <span
                  className={
                    "absolute -bottom-1 left-0 h-px bg-[color:var(--ink)] transition-all duration-300 " +
                    (isActive ? "w-full" : "w-0")
                  }
                />
              </a>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center text-[11px] font-medium tracking-[0.18em] uppercase text-[color:var(--muted)]">
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
            <span className="text-[color:var(--hairline)]">/</span>
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
            className="hidden sm:inline-flex items-center gap-1.5 text-[12px] font-medium tracking-[0.16em] uppercase text-[color:var(--ink)] group"
          >
            <span className="relative">
              {labels.cta}
              <span className="absolute left-0 right-0 -bottom-1 h-px bg-[color:var(--ink)] origin-left scale-x-100 group-hover:scale-x-0 transition-transform duration-300" />
              <span className="absolute left-0 right-0 -bottom-1 h-px bg-[color:var(--accent)] origin-right scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </span>
            <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[color:var(--accent)]" />
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

      {mobileOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[color:var(--bg)] border-t border-[color:var(--hairline)]">
          <nav className="flex flex-col py-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-6 py-3.5 text-sm font-medium text-[color:var(--ink-soft)] hover:bg-black/[0.03] hover:text-[color:var(--ink)] transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
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
        </div>
      )}
    </header>
  );
}
