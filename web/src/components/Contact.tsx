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
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <p className="text-lg text-zinc-300">{copy.intro}</p>
          <div className="mt-6 flex gap-4 flex-wrap">
            <a
              href="mailto:contato@morelidev.com"
              className="inline-flex h-10 items-center justify-center rounded-full btn-accent px-5 hover:opacity-90 transition"
            >
              Email
            </a>
            <a
              href="https://wa.me/5500000000000"
              className="inline-flex h-10 items-center justify-center rounded-full border border-white/10 px-5 hover:bg-white/5 transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>
            <a
              href="https://www.linkedin.com/in/william-moreli"
              className="inline-flex h-10 items-center justify-center rounded-full border border-white/10 px-5 hover:bg-white/5 transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </div>
        </div>
        <form className="grid gap-4 sm:grid-cols-2">
          <input className="w-full rounded-lg px-4 py-2 card" placeholder={copy.name} aria-label={copy.name} />
          <input className="w-full rounded-lg px-4 py-2 card" placeholder={copy.email} aria-label={copy.email} />
          <select className="w-full rounded-lg px-4 py-2 card">
            <option>{copy.budget}</option>
            {copy.budgetOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
          <input className="w-full rounded-lg px-4 py-2 card" placeholder={copy.subject} aria-label={copy.subject} />
          <textarea className="sm:col-span-2 w-full rounded-lg px-4 py-2 card" rows={4} placeholder={copy.message} aria-label={copy.message} />
          <button className="sm:col-span-2 btn-accent rounded-full px-6 py-2 font-medium" type="submit">
            {copy.send}
          </button>
        </form>
      </div>
    </Section>
  );
}
