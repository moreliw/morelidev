"use client";
import { useLanguage } from "@/context/LanguageContext";

export function Footer() {
  const { language } = useLanguage();
  const text =
    language === "pt"
      ? "Qualidade, performance e design."
      : "Quality, performance and design.";

  return (
    <footer className="border-t border-white/5">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-12 sm:flex-row sm:py-16">
        <div className="font-display text-sm font-medium text-zinc-500">
          © {new Date().getFullYear()} Moreli Dev — {text}
        </div>
        <div className="flex items-center gap-6 text-sm text-zinc-500">
          <a
            href="#"
            className="transition-colors hover:text-zinc-300"
          >
            {language === "pt" ? "Início" : "Home"}
          </a>
          <a
            href="#contact"
            className="transition-colors hover:text-zinc-300"
          >
            {language === "pt" ? "Contato" : "Contact"}
          </a>
          <a
            href="https://www.linkedin.com/in/william-moreli"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-zinc-300"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
