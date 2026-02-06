"use client";
import { useLanguage } from "@/context/LanguageContext";

export function Footer() {
  const { language } = useLanguage();
  const text =
    language === "pt"
      ? "Qualidade, performance e design."
      : "Quality, performance and design.";

  return (
    <footer className="mx-auto max-w-6xl px-6 py-16 text-sm text-zinc-500">
      © {new Date().getFullYear()} Moreli Dev — {text}
    </footer>
  );
}
