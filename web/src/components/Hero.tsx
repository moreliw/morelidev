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
          intro: "Hi, I'm William Moreli",
          headline: "Software Engineer | Full Stack Developer",
          desc: "Building scalable web applications with .NET, Angular, React and modern architectures.",
          ctaPrimary: "Contact me",
          ctaSecondary: "View projects",
        };

  const tech = [".NET", "ASP.NET Core", "Angular", "React", "Node.js", "PHP"];

  return (
    <div className="relative overflow-hidden">
      <GradientMesh />

      <div className="mx-auto max-w-6xl px-6 pt-40 pb-28">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="order-2 lg:order-1 text-center lg:text-left"
          >
            <p className="font-display text-sm font-medium tracking-wide text-accent uppercase">
              {copy.intro}
            </p>
            <h1 className="font-display mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-100 leading-[1.08]">
              {copy.headline}
            </h1>
            <p className="mt-6 text-base sm:text-lg text-zinc-400 leading-relaxed max-w-lg">
              {copy.desc}
            </p>
            <div className="mt-8 flex flex-wrap gap-2 justify-center lg:justify-start">
              {tech.map((t, i) => (
                <motion.span
                  key={t}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.05 }}
                  className="rounded-full border border-white/10 bg-white/[0.02] px-3.5 py-1.5 text-xs font-medium text-zinc-300 backdrop-blur-sm"
                >
                  {t}
                </motion.span>
              ))}
            </div>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <MagneticButton
                href="#contact"
                className="btn-accent rounded-full px-6 py-3 text-sm font-semibold"
              >
                {copy.ctaPrimary}
              </MagneticButton>
              <MagneticButton
                href="#portfolio"
                className="btn-outline rounded-full px-6 py-3 text-sm font-medium"
              >
                {copy.ctaSecondary}
              </MagneticButton>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="order-1 lg:order-2 flex justify-center"
          >
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl border border-white/5 bg-gradient-to-b from-white/[0.03] to-transparent" />
              <div className="relative rounded-2xl">
                <PortraitHighlight src="/picture.png" />
              </div>
              {/* Decorative glow behind portrait */}
              <div
                className="absolute -z-10 -inset-8 rounded-full opacity-30 blur-3xl"
                style={{ background: "radial-gradient(circle, rgba(249,115,22,0.2) 0%, transparent 70%)" }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
