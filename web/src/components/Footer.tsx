"use client";
import { ChevronUp, Mail, Github, Linkedin } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function Footer() {
  const { language } = useLanguage();
  const backToTop = language === "pt" ? "Voltar ao topo" : "Back to top";
  const rights =
    language === "pt"
      ? `© ${new Date().getFullYear()} William Moreli. Todos os direitos reservados.`
      : `© ${new Date().getFullYear()} William Moreli. All Rights Reserved.`;

  return (
    <footer className="bg-black text-white">
      <div className="flex flex-col items-center py-16 px-6">
        <a
          href="#"
          className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-white/90 hover:text-white transition-colors mb-8"
        >
          <ChevronUp className="size-4" />
          {backToTop}
        </a>
        <div className="flex gap-6 mb-8">
          <a
            href="mailto:contato@morelidev.com"
            className="text-white/80 hover:text-white transition-colors"
            aria-label="Email"
          >
            <Mail className="size-5" />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/80 hover:text-white transition-colors"
            aria-label="GitHub"
          >
            <Github className="size-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/william-moreli"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/80 hover:text-white transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="size-5" />
          </a>
        </div>
        <p className="text-xs text-white/70">{rights}</p>
      </div>
    </footer>
  );
}
