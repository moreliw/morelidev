"use client";
import { ArrowUp, Mail, Github, Linkedin, MessageCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function Footer() {
  const { language } = useLanguage();
  const year = new Date().getFullYear();
  const copy =
    language === "pt"
      ? {
          tagline: "Engenharia de software & produtos digitais bem feitos.",
          backToTop: "Voltar ao topo",
          rights: `© ${year} William Moreli — Todos os direitos reservados.`,
          made: "Feito em Vitória, ES — com atenção ao detalhe.",
          nav: [
            { href: "#about", label: "Sobre" },
            { href: "#services", label: "Serviços" },
            { href: "#projects", label: "Projetos" },
            { href: "#clients", label: "Clientes" },
            { href: "#contact", label: "Contato" },
          ],
          socialLabel: "Conecte-se",
        }
      : {
          tagline: "Software engineering & well-made digital products.",
          backToTop: "Back to top",
          rights: `© ${year} William Moreli — All rights reserved.`,
          made: "Made in Vitória, ES — with attention to detail.",
          nav: [
            { href: "#about", label: "About" },
            { href: "#services", label: "Services" },
            { href: "#projects", label: "Work" },
            { href: "#clients", label: "Clients" },
            { href: "#contact", label: "Contact" },
          ],
          socialLabel: "Connect",
        };

  return (
    <footer className="relative bg-[color:var(--bg-deep)] text-[color:var(--bg)]">
      <div
        className="mx-auto px-6 lg:px-10 py-20 lg:py-28"
        style={{ maxWidth: "var(--max)" }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-6">
            <p className="font-serif text-3xl lg:text-[2.4rem] leading-[1.15] max-w-md">
              {copy.tagline}
            </p>
            <p className="mt-6 text-sm text-white/50 max-w-sm">{copy.made}</p>
          </div>

          <div className="lg:col-span-3">
            <p className="eyebrow eyebrow-light mb-6">Index</p>
            <ul className="space-y-3">
              {copy.nav.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <p className="eyebrow eyebrow-light mb-6">{copy.socialLabel}</p>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:contato@morelidev.com"
                  className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
                >
                  <Mail className="size-3.5" /> contato@morelidev.com
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/william-moreli"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
                >
                  <Linkedin className="size-3.5" /> LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/5527999999999"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
                >
                  <MessageCircle className="size-3.5" /> WhatsApp
                </a>
              </li>
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
                >
                  <Github className="size-3.5" /> GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-xs tracking-wider text-white/40">{copy.rights}</p>
          <a
            href="#top"
            className="group inline-flex items-center gap-2 text-[12px] tracking-[0.18em] uppercase text-white/60 hover:text-white transition-colors"
          >
            <ArrowUp className="size-3.5 transition-transform group-hover:-translate-y-0.5" />
            {copy.backToTop}
          </a>
        </div>
      </div>

      {/* Massive watermark */}
      <div className="overflow-hidden border-t border-white/10">
        <p
          aria-hidden
          className="select-none font-serif text-[18vw] leading-none text-white/[0.04] text-center pb-2"
          style={{ letterSpacing: "-0.04em" }}
        >
          moreli.dev
        </p>
      </div>
    </footer>
  );
}
