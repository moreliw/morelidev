"use client";
import { motion } from "framer-motion";
import {
  Globe,
  Rocket,
  Code2,
  Layers3,
  Sparkles,
  Wrench,
  Search,
  PenTool,
  Hammer,
  LineChart,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const services = [
  {
    icon: Globe,
    title: { pt: "Sites institucionais", en: "Institutional websites" },
    desc: {
      pt: "Presença digital sólida com narrativa clara e identidade consistente — o cartão de visitas da sua empresa, feito sob medida.",
      en: "A solid digital presence with clear narrative and consistent identity — your company's calling card, tailored to you.",
    },
    bullets: {
      pt: ["Design exclusivo", "SEO incluso", "Painel para editar"],
      en: ["Unique design", "SEO included", "Editing dashboard"],
    },
  },
  {
    icon: Rocket,
    title: { pt: "Landing pages", en: "Landing pages" },
    desc: {
      pt: "Páginas focadas em conversão para campanhas, lançamentos e captação de clientes — rápidas, claras e diretas ao ponto.",
      en: "Pages focused on conversion for campaigns, launches and lead capture — fast, clear and to the point.",
    },
    bullets: {
      pt: ["Foco em conversão", "Carregamento rápido", "Integração com anúncios"],
      en: ["Conversion-focused", "Fast loading", "Ad-platform ready"],
    },
  },
  {
    icon: Code2,
    title: { pt: "Sistemas sob medida", en: "Custom systems" },
    desc: {
      pt: "Software que organiza a sua operação: cadastros, vendas, agendamentos, controle financeiro e relatórios — tudo no seu fluxo.",
      en: "Software that organises your operation: records, sales, bookings, finance and reports — built around your workflow.",
    },
    bullets: {
      pt: ["Multi-usuário", "Relatórios", "Crescimento sem limites"],
      en: ["Multi-user", "Reports", "Scales with you"],
    },
  },
  {
    icon: Sparkles,
    title: { pt: "Lojas virtuais", en: "Online stores" },
    desc: {
      pt: "E-commerces completos com catálogo, pagamentos, frete e painel — pronto para vender e crescer com a sua marca.",
      en: "Full e-commerce with catalog, payments, shipping and admin — ready to sell and grow with your brand.",
    },
    bullets: {
      pt: ["Pagamentos online", "Estoque", "Marketing integrado"],
      en: ["Online payments", "Inventory", "Marketing-ready"],
    },
  },
  {
    icon: Layers3,
    title: { pt: "Aplicativos mobile", en: "Mobile apps" },
    desc: {
      pt: "Aplicativos para iOS e Android com experiência fluida, design moderno e foco no que importa para o seu cliente.",
      en: "iOS and Android apps with a smooth experience, modern design and focus on what matters to your user.",
    },
    bullets: {
      pt: ["iOS e Android", "Notificações", "Publicação nas lojas"],
      en: ["iOS and Android", "Push notifications", "Store publishing"],
    },
  },
  {
    icon: Wrench,
    title: { pt: "Suporte & evolução", en: "Support & evolution" },
    desc: {
      pt: "Acompanhamento contínuo, melhorias mensais e suporte técnico — para o seu produto digital seguir performando.",
      en: "Continuous care, monthly improvements and technical support — keeping your digital product performing.",
    },
    bullets: {
      pt: ["Suporte dedicado", "Melhorias mensais", "Monitoramento"],
      en: ["Dedicated support", "Monthly improvements", "Monitoring"],
    },
  },
];

const process = [
  {
    icon: Search,
    title: { pt: "Descoberta", en: "Discovery" },
    desc: {
      pt: "Entendemos seu negócio, público e objetivos antes de qualquer linha de código.",
      en: "We learn about your business, audience and goals before writing a single line of code.",
    },
  },
  {
    icon: PenTool,
    title: { pt: "Design", en: "Design" },
    desc: {
      pt: "Telas refinadas, identidade visual coerente e foco na experiência do usuário.",
      en: "Refined screens, coherent visual identity and a sharp focus on user experience.",
    },
  },
  {
    icon: Hammer,
    title: { pt: "Construção", en: "Build" },
    desc: {
      pt: "Desenvolvimento com entregas semanais, testes e ajustes alinhados ao seu time.",
      en: "Development with weekly deliveries, testing and adjustments aligned with your team.",
    },
  },
  {
    icon: LineChart,
    title: { pt: "Evolução", en: "Evolution" },
    desc: {
      pt: "Após o lançamento, continuamos por perto: medindo, ajustando e crescendo junto.",
      en: "After launch, we stay close: measuring, tuning and growing alongside you.",
    },
  },
];

export function Services() {
  const { language } = useLanguage();
  const labels =
    language === "pt"
      ? {
          eyebrow: "Serviços",
          headline: "Soluções digitais sob medida — do conceito à entrega.",
          processEyebrow: "Como trabalhamos",
          processHeadline:
            "Um processo claro, com você acompanhando cada etapa.",
        }
      : {
          eyebrow: "Services",
          headline: "Tailored digital solutions — from concept to launch.",
          processEyebrow: "How we work",
          processHeadline:
            "A clear process, with you informed every step of the way.",
        };

  return (
    <section id="services" className="relative py-24 lg:py-36 bg-[color:var(--bg)]">
      <div
        className="relative mx-auto px-6 lg:px-10"
        style={{ maxWidth: "var(--max)" }}
      >
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 mb-16 lg:mb-20">
          <div className="lg:col-span-3">
            <span className="eyebrow">{labels.eyebrow}</span>
            <p className="mt-6 text-xs font-mono tracking-widest text-[color:var(--muted-2)]">
              02 / 06
            </p>
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-9 display text-[clamp(1.7rem,3.5vw,2.8rem)] max-w-3xl"
          >
            {labels.headline}
          </motion.h2>
        </div>

        {/* Services */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[color:var(--hairline)] border border-[color:var(--hairline)] rounded-[2px] overflow-hidden">
          {services.map((s, i) => (
            <motion.article
              key={s.title.en}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ delay: i * 0.06, duration: 0.6 }}
              className="group relative bg-[color:var(--bg-elevated)] p-8 lg:p-10 transition-colors duration-300 hover:bg-[color:var(--bg)]"
            >
              <div className="flex items-start justify-between mb-7">
                <div className="inline-flex items-center justify-center w-11 h-11 rounded-full border border-[color:var(--hairline)] text-[color:var(--ink)] group-hover:border-[color:var(--ink)] group-hover:text-[color:var(--accent)] transition-colors duration-300">
                  <s.icon className="size-[18px]" strokeWidth={1.5} />
                </div>
                <span className="font-mono text-[11px] tracking-widest text-[color:var(--muted-2)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              <h3 className="font-serif text-[1.35rem] leading-tight text-[color:var(--ink)] mb-3">
                {language === "pt" ? s.title.pt : s.title.en}
              </h3>
              <p className="text-sm leading-relaxed text-[color:var(--muted)] mb-6">
                {language === "pt" ? s.desc.pt : s.desc.en}
              </p>

              <ul className="space-y-1.5 text-[12px] tracking-wide text-[color:var(--ink-soft)]">
                {(language === "pt" ? s.bullets.pt : s.bullets.en).map((b) => (
                  <li key={b} className="flex items-center gap-2">
                    <span className="inline-block w-3 h-px bg-[color:var(--accent)]" />
                    {b}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>

        {/* Process */}
        <div className="mt-24 lg:mt-32 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-3">
            <span className="eyebrow">{labels.processEyebrow}</span>
            <p className="mt-6 text-xs font-mono tracking-widest text-[color:var(--muted-2)]">
              03 / 06
            </p>
          </div>
          <div className="lg:col-span-9">
            <motion.h3
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7 }}
              className="display text-[clamp(1.5rem,3vw,2.2rem)] max-w-2xl mb-12"
            >
              {labels.processHeadline}
            </motion.h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10 relative">
              {/* connecting line */}
              <div
                aria-hidden
                className="hidden lg:block absolute top-[22px] left-[5%] right-[5%] h-px bg-[color:var(--hairline)]"
              />
              {process.map((step, i) => (
                <motion.div
                  key={step.title.en}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  className="relative"
                >
                  <div className="relative z-10 inline-flex items-center justify-center w-11 h-11 rounded-full bg-[color:var(--bg)] border border-[color:var(--hairline)] text-[color:var(--ink)] mb-5">
                    <step.icon className="size-[18px]" strokeWidth={1.5} />
                  </div>
                  <p className="font-mono text-[10px] tracking-widest text-[color:var(--muted-2)] mb-2">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h4 className="font-serif text-lg text-[color:var(--ink)] mb-2">
                    {language === "pt" ? step.title.pt : step.title.en}
                  </h4>
                  <p className="text-[13px] leading-relaxed text-[color:var(--muted)]">
                    {language === "pt" ? step.desc.pt : step.desc.en}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
