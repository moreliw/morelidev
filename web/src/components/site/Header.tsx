"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowRight, ArrowUpRight, Menu, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { LINKS } from "@/content/site";
import { Brand } from "./Brand";
import { ensureGsap, ScrollTrigger } from "@/lib/gsap";

export function Header() {
  const { language, setLanguage } = useLanguage();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [current, setCurrent] = useState<string | null>(null);
  const pt = language === "pt";
  const home = pathname === "/";
  // Hero (home) nasce escuro; páginas internas nascem sobre claro — o
  // estado inicial já reflete isso, sem precisar de um setState em efeito.
  const [onDark, setOnDark] = useState(home);
  const toggle = useRef<HTMLButtonElement>(null);
  const links: [string, string][] = [
    ["estudio", pt ? "Estúdio" : "Studio"],
    ["servicos", pt ? "Serviços" : "Services"],
    ["trabalhos", pt ? "Projetos" : "Work"],
    ["processo", pt ? "Processo" : "Process"],
    ["contato", pt ? "Contato" : "Contact"],
  ];
  const href = (id: string) => `${home ? "" : "/"}#${id}`;

  // Esconde ao descer, mostra ao subir — o conteúdo ganha a tela inteira.
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (Math.abs(y - lastY) < 6) return;
      setHidden(y > lastY && y > 480);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Navbar contextual: inverte texto/ícones conforme a seção escura ou clara
  // que está por baixo do header fixo, e marca o link da seção atual.
  useEffect(() => {
    if (!home) return;
    ensureGsap();
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("section[data-theme]"),
    );
    if (!sections.length) return;
    const triggers = sections.map((section) =>
      ScrollTrigger.create({
        trigger: section,
        start: "top top+=60",
        end: "bottom top+=60",
        onToggle: (self) => {
          if (!self.isActive) return;
          setOnDark(section.dataset.theme === "dark");
          setCurrent(section.id || null);
        },
      }),
    );
    return () => triggers.forEach((t) => t.kill());
  }, [home]);

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
      data-on-dark={onDark || open || undefined}
      data-hidden={(hidden && !open) || undefined}
    >
      <div className="container-site header-inner">
        <Brand />
        <nav className="desktop-nav" aria-label={pt ? "Navegação principal" : "Main navigation"}>
          {links.map(([id, label]) => (
            <a
              key={id}
              href={href(id)}
              data-cursor="link"
              aria-current={home && current === id ? "location" : undefined}
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <button
            type="button"
            className="language-toggle"
            data-cursor="link"
            onClick={() => setLanguage(pt ? "en" : "pt")}
            aria-label={pt ? "Switch to English" : "Mudar para português"}
          >
            <b>{pt ? "PT" : "EN"}</b>
            <span aria-hidden>/</span>
            {pt ? "EN" : "PT"}
          </button>
          <a className="header-cta" href={href("contato")} data-cursor="go">
            {pt ? "Fale com a MoreliDev" : "Talk to MoreliDev"}
            <ArrowUpRight size={15} aria-hidden />
          </a>
          <button
            ref={toggle}
            type="button"
            className="menu-toggle"
            data-cursor="link"
            aria-label={open ? (pt ? "Fechar menu" : "Close menu") : pt ? "Abrir menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(!open)}
          >
            {open ? <X aria-hidden /> : <Menu aria-hidden />}
          </button>
        </div>
      </div>

      <div id="mobile-menu" className="mobile-menu" hidden={!open}>
        <nav className="container-site" aria-label={pt ? "Menu principal (móvel)" : "Main menu (mobile)"}>
          {links.map(([id, label], index) => (
            <a key={id} href={href(id)} onClick={() => setOpen(false)}>
              <span className="menu-number">0{index + 1}</span>
              {label}
              <ArrowUpRight size={20} aria-hidden />
            </a>
          ))}
        </nav>
        <div className="container-site mobile-menu-foot">
          <a className="pill pill-accent" href={href("contato")} onClick={() => setOpen(false)}>
            {pt ? "Iniciar um projeto" : "Start a project"}
            <ArrowRight size={16} aria-hidden />
          </a>
          <p>{LINKS.email}</p>
        </div>
      </div>
    </header>
  );
}
