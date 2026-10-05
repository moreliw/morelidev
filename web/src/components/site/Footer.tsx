"use client";
import Link from "next/link";
import { ArrowUp, Github, Linkedin } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { LINKS } from "@/content/site";

export function Footer() {
  const { language } = useLanguage();
  const c = (pt: string, en: string) => (language === "pt" ? pt : en);
  const links: [string, string][] = [
    ["/#estudio", c("Estúdio", "Studio")],
    ["/#servicos", c("Serviços", "Services")],
    ["/#trabalhos", c("Projetos", "Work")],
    ["/#processo", c("Processo", "Process")],
    ["/#contato", c("Contato", "Contact")],
  ];
  return (
    <footer className="site-footer">
      <div className="container-site">
        <div className="footer-top">
          <p className="footer-statement">
            {c("Software que faz", "Software that makes")}{" "}
            <em>{c("empresas crescerem.", "companies grow.")}</em>
          </p>
          <a href="#top" className="pill pill-ghost" data-cursor="link">
            {c("Voltar ao topo", "Back to top")}
            <ArrowUp size={15} aria-hidden />
          </a>
        </div>

        <div className="footer-cols">
          <div>
            <h3>{c("Navegação", "Navigation")}</h3>
            <ul>
              {links.map(([href, label]) => (
                <li key={href}>
                  <Link href={href}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>{c("Contato", "Contact")}</h3>
            <ul>
              <li>
                <a href={`mailto:${LINKS.email}`}>{LINKS.email}</a>
              </li>
              <li>
                <a href={LINKS.whatsapp} target="_blank" rel="noopener noreferrer">
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3>{c("Estúdio", "Studio")}</h3>
            <ul>
              <li>{c("Estúdio de software · remoto", "Software studio · remote")}</li>
              <li>{c("Projetos locais e internacionais", "Local and international projects")}</li>
            </ul>
            <div className="footer-social">
              <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin size={16} aria-hidden />
              </a>
              <a href={LINKS.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github size={16} aria-hidden />
              </a>
            </div>
          </div>
        </div>
      </div>

      <p className="footer-giant" aria-hidden>
        MORELI<span>/</span>
        <small>DEV</small>
      </p>

      <div className="container-site footer-bottom">
        <span>
          © {new Date().getFullYear()} MoreliDev. {c("Todos os direitos reservados.", "All rights reserved.")}
        </span>
        <span>{c("Construído do zero pela MoreliDev", "Built from scratch by MoreliDev")}</span>
      </div>
    </footer>
  );
}
