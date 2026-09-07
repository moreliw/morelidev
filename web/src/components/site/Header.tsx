"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowRight, ArrowUpRight, Menu, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { LINKS } from "@/content/site";
import { Brand } from "./Brand";

export function Header() {
  const { language, setLanguage } = useLanguage();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const pt = language === "pt";
  const home = pathname === "/";
  const links: [string, string][] = [
    ["solucoes", pt ? "Soluções" : "Solutions"],
    ["produtos", pt ? "Produtos" : "Products"],
    ["cases", pt ? "Cases" : "Work"],
    ["empresa", pt ? "Empresa" : "Company"],
    ["contato", pt ? "Contato" : "Contact"],
  ];
  const href = (id: string) => `${home ? "" : "/"}#${id}`;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    const desktop = window.matchMedia("(min-width: 1024px)");
    const closeOnDesktop = () => desktop.matches && setOpen(false);
    document.addEventListener("keydown", onKey);
    desktop.addEventListener("change", closeOnDesktop);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", closeOnDesktop);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className="site-header"
      data-scrolled={scrolled || undefined}
      data-solid={!home || undefined}
    >
      <div className="container-site header-inner">
        <Brand />
        <nav
          className="desktop-nav"
          aria-label={pt ? "Navegação principal" : "Main navigation"}
        >
          {links.map(([id, label]) => (
            <a key={id} href={href(id)}>
              {label}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <button
            type="button"
            className="language-toggle"
            onClick={() => setLanguage(pt ? "en" : "pt")}
            aria-label={pt ? "Switch to English" : "Mudar para português"}
          >
            <b>{pt ? "PT" : "EN"}</b>
            <span aria-hidden>/</span>
            {pt ? "EN" : "PT"}
          </button>
          <a className="btn btn-primary header-cta" href={href("contato")}>
            {pt ? "Falar sobre um projeto" : "Start a project"}
            <ArrowRight size={16} aria-hidden />
          </a>
          <button
            ref={toggle}
            type="button"
            className="menu-toggle"
            aria-label={
              open
                ? pt
                  ? "Fechar menu"
                  : "Close menu"
                : pt
                  ? "Abrir menu"
                  : "Open menu"
            }
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(!open)}
          >
            {open ? <X aria-hidden /> : <Menu aria-hidden />}
          </button>
        </div>
      </div>

      <div id="mobile-menu" className="mobile-menu" hidden={!open}>
        <nav className="container-site" aria-label={pt ? "Menu" : "Menu"}>
          {links.map(([id, label], index) => (
            <a key={id} href={href(id)} onClick={() => setOpen(false)}>
              <span className="menu-number">0{index + 1}</span>
              {label}
              <ArrowUpRight size={20} aria-hidden />
            </a>
          ))}
        </nav>
        <div className="container-site mobile-menu-foot">
          <a
            className="btn btn-primary"
            href={href("contato")}
            onClick={() => setOpen(false)}
          >
            {pt ? "Falar sobre um projeto" : "Start a project"}
            <ArrowRight size={16} aria-hidden />
          </a>
          <p>{LINKS.email}</p>
        </div>
      </div>
    </header>
  );
}
