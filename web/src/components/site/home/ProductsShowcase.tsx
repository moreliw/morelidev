"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check, HeartPulse, Wallet } from "lucide-react";
import type { Copy } from "./types";
import { LINKS } from "@/content/site";
import { OdontoAppMock, SaldoCasaMock } from "./ui/ProductMocks";
import { ensureGsap, gsap } from "@/lib/gsap";

/**
 * "Não construímos só para clientes." — showcase fixo: a composição da
 * direita troca de produto conforme o bloco de texto correspondente
 * cruza o centro da viewport. Sem carrossel automático.
 */
export function ProductsShowcase({ c }: { c: Copy }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLElement | null)[]>([]);
  const visualRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const nodes = refs.current.filter(Boolean) as HTMLElement[];
    if (!nodes.length || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(Number((entry.target as HTMLElement).dataset.index));
          }
        }
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    ensureGsap();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    visualRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.to(el, {
        opacity: i === active ? 1 : 0,
        scale: reduced ? 1 : i === active ? 1 : 0.97,
        duration: reduced ? 0.001 : 0.6,
        ease: "power2.out",
        pointerEvents: i === active ? "auto" : "none",
      });
    });
  }, [active]);

  const products = [
    {
      name: "OdontoApp",
      icon: HeartPulse,
      title: c(
        "Gestão simples para clínicas que querem cuidar melhor.",
        "Simple management for clinics that want to care better.",
      ),
      text: c(
        "Agenda, pacientes, tratamentos e financeiro em um só lugar — com a rotina da clínica no centro do produto.",
        "Scheduling, patients, treatments and finance in one place — with the clinic's routine at the centre of the product.",
      ),
      tags: ["SaaS", c("Odontologia", "Dentistry"), c("Gestão", "Management")],
      features: [
        c("Agenda inteligente", "Smart scheduling"),
        c("Gestão de pacientes", "Patient management"),
        c("Financeiro e relatórios", "Finance and reports"),
      ],
      href: LINKS.odontoapp,
      mock: <OdontoAppMock c={c} />,
    },
    {
      name: "SaldoCasa",
      icon: Wallet,
      title: c(
        "Finanças pessoais sem complicação.",
        "Personal finance without the friction.",
      ),
      text: c(
        "Controle de gastos, metas e relatórios visuais para transformar planos em conquistas — no ritmo da vida real.",
        "Expense tracking, goals and visual reports that turn plans into achievements — at the pace of real life.",
      ),
      tags: [
        c("Aplicativo", "Application"),
        c("Finanças", "Finance"),
        c("Produto próprio", "In-house product"),
      ],
      features: [
        c("Controle de gastos", "Expense tracking"),
        c("Metas e objetivos", "Goals and targets"),
        c("Relatórios visuais", "Visual reports"),
      ],
      href: LINKS.saldocasa,
      mock: <SaldoCasaMock c={c} />,
    },
  ];

  return (
    <section id="produtos" className="products" data-theme="dark" aria-labelledby="products-title">
      <div className="container-site">
        <div className="products-head">
          <p className="eyebrow">{c("PRODUTOS PRÓPRIOS", "OWN PRODUCTS")}</p>
          <h2 id="products-title" className="h-section">
            {c("Não construímos só para clientes.", "We don't just build for clients.")}
            <br />
            <span className="products-accent">
              {c("Construímos os nossos.", "We build our own.")}
            </span>
          </h2>
        </div>

        <div className="products-stage">
          <div className="products-copy">
            {products.map((product, index) => (
              <article
                key={product.name}
                data-index={index}
                ref={(node) => {
                  refs.current[index] = node;
                }}
              >
                <div className="prod-shot">{product.mock}</div>
                <span className="prod-brand">
                  <i>
                    <product.icon size={17} strokeWidth={1.7} aria-hidden />
                  </i>
                  {product.name}
                </span>
                <h3>{product.title}</h3>
                <p>{product.text}</p>
                <div className="prod-tags num">
                  {product.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <ul className="prod-features">
                  {product.features.map((feature) => (
                    <li key={feature}>
                      <Check size={15} strokeWidth={2.2} aria-hidden />
                      {feature}
                    </li>
                  ))}
                </ul>
                <a
                  className="text-link"
                  href={product.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="go"
                >
                  {c(`Conhecer ${product.name}`, `Explore ${product.name}`)}
                  <ArrowUpRight size={16} aria-hidden />
                </a>
              </article>
            ))}
          </div>

          <div className="products-visual-col">
            <div className="products-visual">
              {products.map((product, index) => (
                <figure
                  key={product.name}
                  ref={(node) => {
                    visualRefs.current[index] = node;
                  }}
                  style={{ opacity: index === 0 ? 1 : 0 }}
                >
                  {product.mock}
                </figure>
              ))}
              <div className="products-dots" aria-hidden>
                {products.map((product, index) => (
                  <span key={product.name} data-on={active === index || undefined} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
