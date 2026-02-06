"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={
        `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ` +
        (scrolled
          ? "backdrop-blur supports-[backdrop-filter]:bg-black/5 dark:supports-[backdrop-filter]:bg-white/5"
          : "bg-transparent")
      }
    >
      <nav className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
        <Link href="#" className="font-semibold tracking-tight text-xl">
          <span className="text-zinc-900 dark:text-zinc-100">Moreli</span>
          <span className="text-zinc-500">.dev</span>
        </Link>
        <div className="flex items-center gap-6 text-sm">
          <a href="#about" className="hover:opacity-80">Sobre</a>
          <a href="#experience" className="hover:opacity-80">Experiência</a>
          <a href="#stack" className="hover:opacity-80">Stack</a>
          <a href="#projects" className="hover:opacity-80">Projetos</a>
          <a href="#services" className="hover:opacity-80">Serviços</a>
          <a href="#contact" className="hover:opacity-80">Contato</a>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}

