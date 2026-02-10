"use client";
import { PortraitHighlight } from "./PortraitHighlight";
import { useLanguage } from "@/context/LanguageContext";
import { Section } from "./Section";

export function About() {
  const { language } = useLanguage();
  const copy =
    language === "pt"
      ? {
          title: "Resumo profissional",
          text: "Sou Full Stack Software Engineer com mais de 5 anos de experiência em aplicações web escaláveis, seguras e de alta performance. Especialista em .NET (ASP.NET Core) no backend e Angular & React no frontend, com experiência sólida em Node.js e PHP (Laravel + Blade). Atuei em sistemas corporativos, plataformas de gestão e dashboards, sempre com foco em clean code, performance e manutenibilidade. Atualmente aberto a oportunidades remotas como Software Engineer, Senior Frontend Developer ou Full Stack Engineer, colaborando com times globais e stacks modernas.",
          cta: "Vamos conversar",
        }
      : {
          title: "About me",
          text: "I am a Full Stack Software Engineer with over 5 years of experience building scalable, secure, and high-performance web applications. I specialize in .NET (ASP.NET Core) on the backend and Angular & React on the frontend, with solid experience in Node.js and PHP (Laravel + Blade). I have worked on enterprise systems, management platforms, dashboards, and business-critical applications, always focusing on clean code, performance, and maintainability. I am currently open to remote opportunities as a Software Engineer, Senior Frontend Developer, or Full Stack Engineer, collaborating with global teams and modern tech stacks.",
          cta: "Let’s talk",
        };

  return (
    <Section id="about" title={copy.title}>
      <div className="grid gap-10 sm:grid-cols-2 items-center">
        <div>
          <PortraitHighlight src="/picture.png" />
        </div>
        <div>
          <p className="text-sm text-zinc-400 leading-relaxed">{copy.text}</p>
          <a
            href="#contact"
            className="mt-6 inline-block btn-accent rounded-full px-4 py-2 text-sm font-medium"
          >
            {copy.cta}
          </a>
        </div>
      </div>
    </Section>
  );
}
