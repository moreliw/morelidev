"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Check, HeartPulse, Wallet } from "lucide-react";
import type { Copy } from "./types";
import { LINKS } from "@/content/site";

/**
 * Showcase sticky: a composição da direita troca de produto conforme
 * o bloco de texto correspondente entra na viewport. Sem carrossel
 * automático e sem sequestrar o scroll.
 */
export function Products({ c }: { c: Copy }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLElement | null)[]>([]);

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
      // linha de leitura no centro da viewport: só um bloco a cruza por vez
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

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
      image: "/images/premium/odontoapp.webp",
      alt: c(
        "Interface do OdontoApp em computador e celular",
        "OdontoApp interface on desktop and mobile",
      ),
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
      image: "/images/premium/saldocasa.webp",
      alt: c(
        "Interface do SaldoCasa em computador e celular",
        "SaldoCasa interface on desktop and mobile",
      ),
    },
  ];

  return (
    <section id="produtos" className="products" aria-labelledby="products-title">
      <div className="container-site">
        <div className="products-head">
          <div>
            <p className="kicker" data-reveal>
              {c("PRODUTOS MORELIDEV", "MORELIDEV PRODUCTS")}
            </p>
            <h2
              id="products-title"
              data-reveal
              style={{ "--i": 1 } as React.CSSProperties}
            >
              {c(
                "Também construímos o que acreditamos.",
                "We also build what we believe in.",
              )}
            </h2>
          </div>
          <p data-reveal style={{ "--i": 2 } as React.CSSProperties}>
            {c(
              "Nossos produtos próprios nascem da experiência real com o mercado — e voltam para os projetos dos clientes como repertório.",
              "Our own products come from real market experience — and feed back into client projects as craft.",
            )}
          </p>
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
                <div className="prod-shot">
                  <Image
                    src={product.image}
                    alt={product.alt}
                    width={1200}
                    height={800}
                    sizes="100vw"
                    loading="lazy"
                  />
                </div>
                <span className="prod-brand">
                  <i>
                    <product.icon size={17} strokeWidth={1.7} aria-hidden />
                  </i>
                  {product.name}
                </span>
                <h3>{product.title}</h3>
                <p>{product.text}</p>
                <div className="prod-tags">
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
                  className="btn btn-ghost-dark"
                  href={product.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {c(`Conhecer ${product.name}`, `Explore ${product.name}`)}
                  <ArrowUpRight size={17} aria-hidden />
                </a>
              </article>
            ))}
          </div>

          <div className="products-visual-col">
            <div className="products-visual">
              {products.map((product, index) => (
                <figure key={product.name} data-on={active === index}>
                  <Image
                    src={product.image}
                    alt={product.alt}
                    width={1200}
                    height={800}
                    sizes="(max-width: 1023px) 100vw, 55vw"
                    loading="lazy"
                  />
                </figure>
              ))}
              <div className="products-dots" aria-hidden>
                {products.map((product, index) => (
                  <span key={product.name} data-on={active === index} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
