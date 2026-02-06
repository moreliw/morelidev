import { Section } from "./Section";

export function Contact() {
  return (
    <Section id="contact" title="Contato">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <p className="text-lg text-zinc-700 dark:text-zinc-300">
            Pronto para levar seu produto ao próximo nível? Envie uma mensagem e
            receba uma proposta personalizada.
          </p>
          <div className="mt-6 flex gap-4 flex-wrap">
            <a
              href="mailto:contato@morelidev.com"
              className="inline-flex h-10 items-center justify-center rounded-full bg-black text-white px-5 dark:bg-white dark:text-black hover:opacity-90 transition"
            >
              Email
            </a>
            <a
              href="https://www.linkedin.com/in/"
              className="inline-flex h-10 items-center justify-center rounded-full border px-5 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/moreliw"
              className="inline-flex h-10 items-center justify-center rounded-full border px-5 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </div>
        </div>
        <form className="space-y-4">
          <input className="w-full rounded-lg border px-4 py-2 bg-white/70 dark:bg-black/40" placeholder="Seu nome" aria-label="Seu nome" />
          <input className="w-full rounded-lg border px-4 py-2 bg-white/70 dark:bg-black/40" placeholder="Seu email" aria-label="Seu email" />
          <textarea className="w-full rounded-lg border px-4 py-2 bg-white/70 dark:bg-black/40" rows={4} placeholder="Mensagem" aria-label="Mensagem" />
          <button className="inline-flex h-10 items-center justify-center rounded-full bg-black text-white px-5 dark:bg-white dark:text-black hover:opacity-90 transition" type="submit">
            Enviar
          </button>
        </form>
      </div>
    </Section>
  );
}

