import { Section } from "./Section";

const services = [
  { title: "Landing pages premium", desc: "Conversão alta, performance e SEO impecável." },
  { title: "Sites institucionais", desc: "Design refinado, acessível e fácil de manter." },
  { title: "Sistemas web", desc: "Arquitetura escalável com foco em DX e segurança." },
  { title: "Manutenção evolutiva", desc: "Refactors, performance e novas features contínuas." },
  { title: "Arquitetura & Performance", desc: "Auditoria, plano de ação e implementação." },
];

export function Services() {
  return (
    <Section id="services" title="Serviços">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <article key={s.title} className="rounded-xl border p-6 bg-white/50 dark:bg-black/30">
            <h3 className="font-semibold">{s.title}</h3>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{s.desc}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}

