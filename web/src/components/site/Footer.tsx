"use client";
import Link from "next/link";
import { ArrowUp, ArrowUpRight, Github, Linkedin } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { LINKS } from "@/content/site";
import { Brand } from "./Brand";

export function Footer() {
  const { language } = useLanguage();
  const c = (pt: string, en: string) => (language === "pt" ? pt : en);
  return (
    <footer className="site-footer">
      <div className="container-site">
        <div className="footer-top">
          <div className="footer-brand">
            <Brand />
            <p>
              {c(
                "Tecnologia para um futuro com mais possibilidades. Estratégia, design e engenharia em um só time.",
                "Technology for a future with more possibilities. Strategy, design and engineering in a single team.",
              )}
            </p>
            <div className="footer-social">
              <a
                href={LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} aria-hidden />
              </a>
              <a
                href={LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <Github size={18} aria-hidden />
              </a>
            </div>
          </div>
          <div className="footer-nav">
            <nav aria-label={c("Soluções", "Solutions")}>
              <h2>{c("Soluções", "Solutions")}</h2>
              <Link href="/#solucoes">{c("Produtos digitais", "Digital products")}</Link>
              <Link href="/#solucoes">{c("Sistemas sob medida", "Custom systems")}</Link>
              <Link href="/#solucoes">{c("Websites premium", "Premium websites")}</Link>
              <Link href="/#solucoes">
                {c("Automações & integrações", "Automation & integrations")}
              </Link>
            </nav>
            <nav aria-label={c("Produtos", "Products")}>
              <h2>{c("Produtos", "Products")}</h2>
              <a href={LINKS.odontoapp} target="_blank" rel="noopener noreferrer">
                OdontoApp
                <ArrowUpRight size={13} aria-hidden />
              </a>
              <a href={LINKS.saldocasa} target="_blank" rel="noopener noreferrer">
                SaldoCasa
                <ArrowUpRight size={13} aria-hidden />
              </a>
            </nav>
            <nav aria-label={c("Empresa", "Company")}>
              <h2>{c("Empresa", "Company")}</h2>
              <Link href="/#empresa">{c("Sobre nós", "About us")}</Link>
              <Link href="/#processo">{c("Como trabalhamos", "How we work")}</Link>
              <Link href="/projetos">{c("Cases", "Work")}</Link>
            </nav>
            <nav aria-label={c("Contato", "Contact")}>
              <h2>{c("Contato", "Contact")}</h2>
              <a href={`mailto:${LINKS.email}`}>{LINKS.email}</a>
              <a href={LINKS.whatsapp} target="_blank" rel="noopener noreferrer">
                WhatsApp
                <ArrowUpRight size={13} aria-hidden />
              </a>
              <Link href="/#contato">{c("Falar sobre um projeto", "Start a project")}</Link>
            </nav>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} MoreliDev.{" "}
            {c("Todos os direitos reservados.", "All rights reserved.")}
          </p>
          <p className="footer-sign">
            {c(
              "Construindo hoje o amanhã que queremos.",
              "Building today the tomorrow we want.",
            )}
          </p>
          <a href="#top">
            {c("Voltar ao topo", "Back to top")}
            <ArrowUp size={14} aria-hidden />
          </a>
        </div>
      </div>
    </footer>
  );
}
