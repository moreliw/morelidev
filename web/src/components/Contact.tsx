"use client";
import { Section } from "./Section";
import { useLanguage } from "@/context/LanguageContext";

export function Contact() {
  const { language } = useLanguage();
  const copy =
    language === "pt"
      ? {
          title: "Contato",
          intro:
            "Pronto para levar seu projeto ao próximo nível? Envie um resumo e receba uma proposta objetiva.",
          name: "Digite seu nome*",
          email: "Digite seu email*",
          phone: "Telefone",
          message: "Sua mensagem*",
          send: "Enviar",
        }
      : {
          title: "Contact",
          intro:
            "Ready to take your project to the next level? Share a brief and get an objective proposal.",
          name: "Enter your name*",
          email: "Enter your email*",
          phone: "Phone number",
          message: "Your message*",
          send: "Submit",
        };

  return (
    <Section id="contact" title={copy.title.toUpperCase()}>
      <p className="text-center text-sm text-[#6b6b6b] leading-relaxed max-w-xl mx-auto mb-12">
        {copy.intro}
      </p>
      <div className="section-divider">
        <span>\\\///</span>
      </div>
      <form className="max-w-2xl mx-auto space-y-6">
        <div>
          <label className="block text-xs font-medium uppercase tracking-widest text-[#6b6b6b] mb-2">
            {copy.name}
          </label>
          <input
            type="text"
            className="input-l-shape w-full"
            placeholder={copy.name}
            aria-label={copy.name}
          />
        </div>
        <div>
          <label className="block text-xs font-medium uppercase tracking-widest text-[#6b6b6b] mb-2">
            {copy.email}
          </label>
          <input
            type="email"
            className="input-l-shape w-full"
            placeholder={copy.email}
            aria-label={copy.email}
          />
        </div>
        <div>
          <label className="block text-xs font-medium uppercase tracking-widest text-[#6b6b6b] mb-2">
            {copy.phone}
          </label>
          <input
            type="tel"
            className="input-l-shape w-full"
            placeholder={copy.phone}
            aria-label={copy.phone}
          />
        </div>
        <div>
          <label className="block text-xs font-medium uppercase tracking-widest text-[#6b6b6b] mb-2">
            {copy.message}
          </label>
          <textarea
            className="input-l-shape w-full min-h-[120px] resize-none"
            placeholder={copy.message}
            aria-label={copy.message}
            rows={4}
          />
        </div>
        <div className="flex justify-center pt-6">
          <button type="submit" className="link-pipe">
            {copy.send.toUpperCase()}
          </button>
        </div>
      </form>
    </Section>
  );
}
