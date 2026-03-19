"use client";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Menu, X } from "lucide-react";
import { ScrollProgressBar } from "./ScrollProgressBar";
import { useLanguage } from "@/context/LanguageContext";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { language, setLanguage } = useLanguage();

  const labels = useMemo(
    () =>
      language === "pt"
        ? {
            home: "Início",
            profile: "Perfil",
            about: "Sobre",
            stack: "Stack",
            experience: "Experiência",
            projects: "Projetos",
            languages: "Idiomas",
            contact: "Contato",
            cta: "Fale comigo",
          }
        : {
            home: "Home",
            profile: "Profile",
            about: "About",
            stack: "Stack",
            experience: "Experience",
            projects: "Projects",
            languages: "Languages",
            contact: "Contact",
            cta: "Hire Me",
          },
    [language]
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "#", label: labels.home },
    { href: "#info", label: labels.profile },
    { href: "#about", label: labels.about },
    { href: "#stack", label: labels.stack },
    { href: "#experience", label: labels.experience },
    { href: "#portfolio", label: labels.projects },
    { href: "#languages", label: labels.languages },
    { href: "#contact", label: labels.contact },
  ];

  return (
    <header
      className={
        `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out ` +
        (scrolled
          ? "bg-zinc-950/80 border-b border-white/5 backdrop-blur-xl shadow-[0_1px_0_0_rgba(255,255,255,0.03)]"
          : "bg-transparent")
      }
    >
      <ScrollProgressBar />
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="#"
          className="font-display text-xl font-semibold tracking-tight"
        >
          <span className="text-zinc-100">Moreli</span>
          <span className="text-accent">.dev</span>
        </Link>
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-400 transition-colors hover:text-zinc-100 hover:bg-white/5"
            >
              {link.label}
            </a>
          ))}
        </div>
        <button
          type="button"
          aria-label="Menu"
          className="md:hidden rounded-lg p-2 text-zinc-400 hover:bg-white/5 hover:text-zinc-100 transition-colors"
          onClick={() => setMobileOpen((o) => !o)}
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-0.5 rounded-full border border-white/10 bg-white/[0.02] p-1 text-xs backdrop-blur-sm">
            <button
              type="button"
              onClick={() => setLanguage("pt")}
              className={
                "rounded-full px-3 py-1.5 font-medium transition-colors " +
                (language === "pt"
                  ? "bg-white/10 text-zinc-100"
                  : "text-zinc-500 hover:text-zinc-300")
              }
            >
              PT
            </button>
            <button
              type="button"
              onClick={() => setLanguage("en")}
              className={
                "rounded-full px-3 py-1.5 font-medium transition-colors " +
                (language === "en"
                  ? "bg-white/10 text-zinc-100"
                  : "text-zinc-500 hover:text-zinc-300")
              }
            >
              EN
            </button>
          </div>
          <a
            href="#contact"
            className="btn-accent rounded-full px-4 py-2 text-sm font-semibold"
          >
            {labels.cta}
          </a>
        </div>
      </nav>
      {mobileOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 border-t border-white/5 bg-zinc-950/95 backdrop-blur-xl">
          <nav className="flex flex-col gap-0 py-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-6 py-3 text-sm font-medium text-zinc-400 transition-colors hover:bg-white/5 hover:text-zinc-100"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
