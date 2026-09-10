"use client";
import Link from "next/link";
import { ArrowUpRight, Github, Linkedin } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { LINKS } from "@/content/site";

export function Footer() {
  const { language } = useLanguage();
  const c = (pt: string, en: string) => (language === "pt" ? pt : en);
  const links: [string, string][] = [
    ["/#capacidades", c("Capacidades", "Capabilities")],
    ["/#trabalhos", c("Trabalhos", "Work")],
    ["/#estudio", c("Estúdio", "Studio")],
    ["/#contato", c("Contato", "Contact")],
  ];
  return (
    <footer className="site-footer">
      <div className="container-site">
        <div className="footer-top">
          <p className="footer-word">
            MORELI<span>/</span>DEV
          </p>
          <p className="footer-tag">
            {c("Software. Produtos. Experiências.", "Software. Products. Experiences.")}
          </p>
        </div>

        <div className="footer-mid">
          <nav aria-label={c("Rodapé", "Footer")}>
            {links.map(([href, label]) => (
              <Link key={href} href={href}>
                {label}
              </Link>
            ))}
          </nav>
          <div className="footer-contact">
            <a href={`mailto:${LINKS.email}`}>{LINKS.email}</a>
            <a href={LINKS.whatsapp} target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
          </div>
          <div className="footer-social">
            <a
              href={LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <Linkedin size={17} aria-hidden />
            </a>
            <a
              href={LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <Github size={17} aria-hidden />
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <span>{c("Estúdio remoto · atuação global", "Remote studio · working worldwide")}</span>
          <span>
            © {new Date().getFullYear()} MoreliDev.{" "}
            {c("Todos os direitos reservados.", "All rights reserved.")}
          </span>
          <a href="#top" data-cursor="link">
            {c("Topo", "Top")}
            <ArrowUpRight size={13} aria-hidden />
          </a>
        </div>
      </div>
    </footer>
  );
}
