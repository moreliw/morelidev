"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Brand } from "./Brand";

export function Header() {
  const { language, setLanguage } = useLanguage();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  const pt = language === "pt";
  const links = [
    ["servicos", pt ? "Soluções" : "Solutions"],
    ["produtos", pt ? "Produtos" : "Products"],
    ["projetos", pt ? "Projetos" : "Projects"],
    ["empresa", pt ? "Sobre" : "About"],
    ["contato", pt ? "Contato" : "Contact"],
  ];
  const href = (id: string) => `${pathname === "/" ? "" : "/"}#${id}`;
  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    }
    function onClick(event: PointerEvent) {
      if (
        !menu.current?.contains(event.target as Node) &&
        !toggle.current?.contains(event.target as Node)
      )
        setOpen(false);
    }
    const desktop = window.matchMedia("(min-width: 1024px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onClick);
    desktop.addEventListener("change", closeOnDesktop);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onClick);
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, [open]);
  return (
    <header className="site-header">
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
            {pt ? "EN" : "PT"}
          </button>
          <a className="btn btn-primary header-cta" href={href("contato")}>
            {pt ? "Falar sobre um projeto" : "Let’s talk"}
            <ArrowUpRight size={16} aria-hidden />
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
      <div ref={menu} id="mobile-menu" className="mobile-menu" hidden={!open}>
        <nav
          className="container-site"
          aria-label={pt ? "Menu móvel" : "Mobile menu"}
        >
          {links.map(([id, label], index) => (
            <a key={id} href={href(id)} onClick={() => setOpen(false)}>
              <span className="menu-number">0{index + 1}</span>
              {label}
              <ArrowUpRight size={18} aria-hidden />
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
