"use client";
import { motion } from "framer-motion";
import { GradientMesh } from "./GradientMesh";
import { MagneticButton } from "./MagneticButton";
import { PortraitHighlight } from "./PortraitHighlight";
import { useLanguage } from "@/context/LanguageContext";

export function Hero() {
  const { language } = useLanguage();
  const copy =
    language === "pt"
      ? {
          intro: "William Moreli",
          headline: "Software Engineer | Full Stack Developer",
          desc: "Construo aplicações web escaláveis com .NET, Angular, React e arquiteturas modernas.",
          ctaPrimary: "Fale comigo",
          ctaSecondary: "Ver projetos",
        }
      : {
          intro: "Hi, I’m William Moreli",
          headline: "Software Engineer | Full Stack Developer",
          desc: "Building scalable web applications with .NET, Angular, React and modern architectures.",
          ctaPrimary: "Contact me",
          ctaSecondary: "View projects",
        };

  return (
    <div className="relative overflow-hidden">
      <GradientMesh />

      <div className="mx-auto max-w-6xl px-6 pt-36 pb-24">
        <div className="grid gap-10 sm:grid-cols-2 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="order-2 sm:order-1 text-center sm:text-left"
          >
            <p className="text-[var(--accent)] font-medium">{copy.intro}</p>
            <h1 className="mt-2 text-4xl sm:text-6xl font-semibold tracking-tight text-zinc-100">
              {copy.headline}
            </h1>
            <p className="mt-4 text-base sm:text-lg text-zinc-300 leading-relaxed">
              {copy.desc}
            </p>
            <div className="mt-6 flex flex-wrap gap-2 text-xs">
              {[
                ".NET",
                "ASP.NET Core",
                "Angular",
                "React",
                "Node.js",
                "PHP",
              ].map((t) => (
                <span
                  key={t}
                  className="rounded-full px-3 py-1 border border-white/10 text-zinc-300"
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center sm:justify-start">
              <MagneticButton
                href="#contact"
                className="btn-accent shadow-[0_12px_24px_rgba(255,122,0,0.25)]"
              >
                {copy.ctaPrimary}
              </MagneticButton>
              <MagneticButton
                href="#portfolio"
                className="btn-outline hover:bg-white/5"
              >
                {copy.ctaSecondary}
              </MagneticButton>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="order-1 sm:order-2 flex justify-center"
          >
            <div className="relative">
              <div className="absolute inset-0 -z-10 h-[540px] w-[540px] rounded-full border border-white/10" />
              <PortraitHighlight src="/picture.png" />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
