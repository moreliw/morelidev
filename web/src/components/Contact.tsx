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
          name: "Nome",
          email: "Email",
          budget: "Orçamento",
          budgetOptions: ["R$ 2k–R$ 5k", "R$ 5k–R$ 10k", "R$ 10k+"],
          subject: "Assunto",
          message: "Mensagem",
          send: "Enviar",
        }
      : {
          title: "Contact",
          intro:
            "Ready to take your project to the next level? Share a brief and get an objective proposal.",
          name: "Name",
          email: "Email",
          budget: "Budget",
          budgetOptions: ["$2k–$5k", "$5k–$10k", "$10k+"],
          subject: "Subject",
          message: "Message",
          send: "Send",
        };

  return (
    <Section id="contact" title={copy.title}>
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="text-lg leading-relaxed text-zinc-300">
            {copy.intro}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="mailto:contato@morelidev.com"
              className="btn-accent inline-flex h-11 items-center justify-center rounded-full px-5 text-sm font-semibold"
            >
              Email
            </a>
            <a
              href="https://wa.me/5500000000000"
              className="btn-outline inline-flex h-11 items-center justify-center rounded-full px-5 text-sm font-medium"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>
            <a
              href="https://www.linkedin.com/in/william-moreli"
              className="btn-outline inline-flex h-11 items-center justify-center rounded-full px-5 text-sm font-medium"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </div>
        </div>
        <form className="grid gap-4 sm:grid-cols-2">
          <input
            className="w-full rounded-xl px-4 py-3 card text-sm"
            placeholder={copy.name}
            aria-label={copy.name}
          />
          <input
            className="w-full rounded-xl px-4 py-3 card text-sm"
            placeholder={copy.email}
            aria-label={copy.email}
            type="email"
          />
          <select className="w-full rounded-xl px-4 py-3 card text-sm sm:col-span-2">
            <option>{copy.budget}</option>
            {copy.budgetOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
          <input
            className="w-full rounded-xl px-4 py-3 card text-sm sm:col-span-2"
            placeholder={copy.subject}
            aria-label={copy.subject}
          />
          <textarea
            className="sm:col-span-2 w-full rounded-xl px-4 py-3 card text-sm resize-none"
            rows={4}
            placeholder={copy.message}
            aria-label={copy.message}
          />
          <button
            className="btn-accent sm:col-span-2 rounded-full px-6 py-3 text-sm font-semibold"
            type="submit"
          >
            {copy.send}
          </button>
        </form>
      </div>
    </Section>
  );
}
