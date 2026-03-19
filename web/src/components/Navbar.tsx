"use client";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Menu, X } from "lucide-react";
import { ScrollProgressBar } from "./ScrollProgressBar";
import { useLanguage } from "@/context/LanguageContext";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { language, setLanguage } = useLanguage();

  const labels = useMemo(
    () =>
      language === "pt"
        ? {
            about: "Sobre",
            skills: "Skills",
            portfolio: "Projetos",
            contact: "Contato",
            cta: "Fale comigo",
          }
        : {
            about: "About me",
            skills: "Skills",
            portfolio: "Portfolio",
            contact: "Contact",
            cta: "Contact me",
          },
    [language]
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "#about", label: labels.about },
    { href: "#stack", label: labels.skills },
    { href: "#portfolio", label: labels.portfolio },
    { href: "#contact", label: labels.contact },
  ];

  return (
    <header
      className={
        `fixed top-0 left-0 right-0 z-50 transition-all duration-300 text-black ` +
        (scrolled
          ? "bg-white/95 backdrop-blur-sm border-b border-gray-200"
          : "bg-transparent")
      }
    >
      <ScrollProgressBar />
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="#"
          className="text-xl font-bold tracking-tight text-black"
        >
          Moreli<span className="font-extrabold">.dev</span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-black hover:underline underline-offset-4"
            >
              {link.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Menu"
            className="md:hidden p-2 text-black hover:bg-black/5 rounded transition-colors"
            onClick={() => setMobileOpen((o) => !o)}
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
          <div className="flex items-center gap-2 rounded-full border border-black/20 p-1 text-xs">
            <button
              type="button"
              onClick={() => setLanguage("pt")}
              className={
                "rounded-full px-3 py-1 font-medium transition-colors " +
                (language === "pt"
                  ? "bg-black text-white"
                  : "text-black hover:bg-black/5")
              }
            >
              PT
            </button>
            <button
              type="button"
              onClick={() => setLanguage("en")}
              className={
                "rounded-full px-3 py-1 font-medium transition-colors " +
                (language === "en"
                  ? "bg-black text-white"
                  : "text-black hover:bg-black/5")
              }
            >
              EN
            </button>
          </div>
          <a
            href="#contact"
            className="btn-cta hidden sm:inline-flex text-xs py-2 px-4"
          >
            {labels.cta}
          </a>
        </div>
      </nav>
      {mobileOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-200">
          <nav className="flex flex-col py-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-6 py-3 text-sm font-medium text-black hover:bg-gray-100"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="mx-6 my-2 btn-cta justify-center"
              onClick={() => setMobileOpen(false)}
            >
              {labels.cta}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
