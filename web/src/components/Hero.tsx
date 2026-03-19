"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin } from "lucide-react";
import { MagneticButton } from "./MagneticButton";
import { useLanguage } from "@/context/LanguageContext";

export function Hero() {
  const { language } = useLanguage();
  const copy =
    language === "pt"
      ? {
          hi: "Olá, eu sou",
          name: "William Moreli",
          headline: "Software Engineer | Full Stack Developer",
          desc: "Construo aplicações web escaláveis com .NET, Angular, React e arquiteturas modernas.",
          ctaPrimary: "Fale comigo",
          ctaSecondary: "Ver projetos",
        }
      : {
          hi: "Hi, I am",
          name: "William Moreli",
          headline: "Front-end Developer / Full Stack",
          desc: "Building scalable web applications with .NET, Angular, React and modern architectures.",
          ctaPrimary: "Contact me",
          ctaSecondary: "View projects",
        };

  return (
    <section className="relative min-h-[90vh] lg:min-h-screen overflow-hidden bg-[#d9d9d9]">
      {/* Desktop: diagonal split — light gray left, black right */}
      <div
        className="hidden lg:block absolute inset-0 bg-black"
        style={{
          clipPath: "polygon(55% 0, 100% 0, 100% 100%, 45% 100%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6 pt-32 pb-20 lg:flex lg:min-h-[85vh] lg:items-center">
        {/* Left — text on light gray */}
        <div className="lg:w-1/2 lg:pr-12 order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-xl"
          >
            <p className="text-base lg:text-lg font-bold text-black mb-1">
              {copy.hi}
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-black tracking-tight leading-[1.05]">
              {copy.name}
            </h1>
            <p className="mt-3 text-base lg:text-lg font-bold text-[#4a4a4a]">
              {copy.headline}
            </p>
            <p className="mt-4 text-sm text-[#6b6b6b] leading-relaxed">
              {copy.desc}
            </p>

            {/* Social icons — neumorphic on gray */}
            <div className="mt-8 flex gap-3">
              <a
                href="mailto:contato@morelidev.com"
                className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#d9d9d9] text-black shadow-[4px_4px_8px_rgba(0,0,0,0.1),-4px_-4px_8px_rgba(255,255,255,0.9)] hover:shadow-[2px_2px_4px_rgba(0,0,0,0.1),-2px_-2px_4px_rgba(255,255,255,0.9)] transition-shadow"
                aria-label="Email"
              >
                <Mail className="size-5" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#d9d9d9] text-black shadow-[4px_4px_8px_rgba(0,0,0,0.1),-4px_-4px_8px_rgba(255,255,255,0.9)] hover:shadow-[2px_2px_4px_rgba(0,0,0,0.1),-2px_-2px_4px_rgba(255,255,255,0.9)] transition-shadow"
                aria-label="GitHub"
              >
                <Github className="size-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/william-moreli"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#d9d9d9] text-black shadow-[4px_4px_8px_rgba(0,0,0,0.1),-4px_-4px_8px_rgba(255,255,255,0.9)] hover:shadow-[2px_2px_4px_rgba(0,0,0,0.1),-2px_-2px_4px_rgba(255,255,255,0.9)] transition-shadow"
                aria-label="LinkedIn"
              >
                <Linkedin className="size-5" />
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <MagneticButton href="#contact" className="btn-cta">
                {copy.ctaPrimary}
              </MagneticButton>
              <a
                href="#portfolio"
                className="link-pipe hover:underline"
              >
                {copy.ctaSecondary}
              </a>
            </div>
          </motion.div>
        </div>

        {/* Right — portrait on black */}
        <div className="lg:w-1/2 order-1 lg:order-2 flex justify-center lg:justify-end lg:pl-12 mt-8 lg:mt-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="relative h-[320px] w-[260px] sm:h-[420px] sm:w-[340px] lg:h-[520px] lg:w-[420px] overflow-hidden">
              <Image
                src="/picture.png"
                alt="William Moreli"
                fill
                priority
                sizes="(max-width: 640px) 260px, (max-width: 1024px) 340px, 420px"
                className="object-cover object-[65%_42%]"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Logo monogram — top left on light gray */}
      <div className="absolute top-24 left-6 lg:left-12 z-10">
        <span className="text-2xl font-extrabold tracking-tighter text-black">
          MD
        </span>
      </div>
    </section>
  );
}
