"use client";
import Link from "next/link";
import { ArrowUpRight, Github, Linkedin, ArrowUp } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { LINKS } from "@/content/site";
import { Brand } from "./Brand";

export function Footer() {
  const { language } = useLanguage();
  const c = (pt: string, en: string) => (language === "pt" ? pt : en);
  return (
    <footer className="site-footer">
      <div className="container-site">
        <div className="footer-grid">
          <div className="footer-brand">
            <Brand />
            <p>
              {c(
                "Tecnologia que move negócios. Um estúdio de software para quem acredita no próximo passo.",
                "Technology that moves business. A software studio for those who believe in the next step.",
              )}
            </p>
          </div>
          <nav aria-label={c("Navegação do rodapé", "Footer navigation")}>
            <h2>Explore</h2>
            <Link href="/#servicos">{c("Soluções", "Solutions")}</Link>
            <Link href="/#produtos">{c("Produtos", "Products")}</Link>
            <Link href="/projetos">{c("Projetos", "Projects")}</Link>
            <Link href="/#empresa">{c("Sobre nós", "About us")}</Link>
            <Link href="/#contato">{c("Contato", "Contact")}</Link>
          </nav>
          <nav aria-label={c("Nossos produtos", "Our products")}>
            <h2>{c("Nossos produtos", "Our products")}</h2>
            <a
              href={LINKS.saldocasa}
              target="_blank"
              rel="noopener noreferrer"
            >
              SaldoCasa
              <ArrowUpRight size={13} aria-hidden />
            </a>
            <a
              href={LINKS.odontoapp}
              target="_blank"
              rel="noopener noreferrer"
            >
              OdontoApp
              <ArrowUpRight size={13} aria-hidden />
            </a>
            <Link href="/#processo">
              {c("Como trabalhamos", "Our process")}
            </Link>
          </nav>
          <div className="footer-location">
            <h2>Brasil + Angola</h2>
            <p>
              {c(
                "Proximidade em cada conversa. Qualidade em cada entrega. Onde seu negócio estiver.",
                "Close collaboration in every conversation. Quality in every delivery. Wherever your business is.",
              )}
            </p>
            <div className="social-links">
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
                <Github size={19} aria-hidden />
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} MoreliDev.{" "}
            {c("Todos os direitos reservados.", "All rights reserved.")}
          </p>
          <a href="#top">
            {c("De volta ao topo", "Back to top")}
            <ArrowUp size={14} aria-hidden />
          </a>
        </div>
      </div>
    </footer>
  );
}
