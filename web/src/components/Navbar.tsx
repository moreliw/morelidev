"use client";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ScrollProgressBar } from "./ScrollProgressBar";
import { useLanguage } from "@/context/LanguageContext";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
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
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={
        `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ` +
        (scrolled
          ? "backdrop-blur bg-black/60 border-b border-white/5"
          : "bg-transparent")
      }
    >
      <ScrollProgressBar />
      <nav className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
        <Link href="#" className="font-semibold tracking-tight text-xl">
          <span className="text-zinc-100">Moreli</span>
          <span className="text-[var(--accent)]">.dev</span>
        </Link>
        <div className="hidden sm:flex items-center gap-6 text-sm text-zinc-300">
          <a href="#" className="hover:text-[var(--accent)] transition-colors">{labels.home}</a>
          <a href="#info" className="hover:text-[var(--accent)] transition-colors">{labels.profile}</a>
          <a href="#about" className="hover:text-[var(--accent)] transition-colors">{labels.about}</a>
          <a href="#stack" className="hover:text-[var(--accent)] transition-colors">{labels.stack}</a>
          <a href="#experience" className="hover:text-[var(--accent)] transition-colors">{labels.experience}</a>
          <a href="#portfolio" className="hover:text-[var(--accent)] transition-colors">{labels.projects}</a>
          <a href="#languages" className="hover:text-[var(--accent)] transition-colors">{labels.languages}</a>
          <a href="#contact" className="hover:text-[var(--accent)] transition-colors">{labels.contact}</a>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 rounded-full border border-white/10 p-1 text-xs text-zinc-400">
            <button
              type="button"
              onClick={() => setLanguage("pt")}
              className={
                "rounded-full px-3 py-1 transition " +
                (language === "pt" ? "bg-white/10 text-white" : "hover:text-white")
              }
            >
              PT
            </button>
            <button
              type="button"
              onClick={() => setLanguage("en")}
              className={
                "rounded-full px-3 py-1 transition " +
                (language === "en" ? "bg-white/10 text-white" : "hover:text-white")
              }
            >
              EN
            </button>
          </div>
          <a href="#contact" className="btn-accent rounded-full px-4 py-2 text-sm font-medium shadow-[0_10px_20px_rgba(255,122,0,0.25)]">{labels.cta}</a>
        </div>
      </nav>
    </header>
  );
}
