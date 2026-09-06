import type { Copy } from "./types";
import { ArrowUpRight, House, Smile } from "lucide-react";
import Image from "next/image";
import { LINKS } from "@/content/site";

export function Products({ c }: { c: Copy }) {
  const products = [
    {
      name: "SaldoCasa",
      type: c("FINANÇAS PESSOAIS, VIDA REAL", "PERSONAL FINANCE, REAL LIFE"),
      title: c(
        "Mais controle para o seu dinheiro.",
        "More control over your money.",
      ),
      description: c(
        "Organize suas finanças, acompanhe seus gastos e transforme planos em conquistas. Simples assim.",
        "Organize your finances, track expenses and turn plans into achievements. Simple as that.",
      ),
      image: "saldocasa",
      href: LINKS.saldocasa,
      icon: House,
      className: "product-purple",
    },
    {
      name: "OdontoApp",
      type: c("TECNOLOGIA PARA CUIDAR MELHOR", "TECHNOLOGY FOR BETTER CARE"),
      title: c("Sua clínica mais organizada.", "A more organized practice."),
      description: c(
        "Agenda, pacientes e finanças em um só lugar. Mais tempo para o que realmente importa: sorrisos.",
        "Appointments, patients and finances in one place. More time for what really matters: smiles.",
      ),
      image: "odontoapp",
      href: LINKS.odontoapp,
      icon: Smile,
      className: "product-blue",
    },
  ];
  return (
    <section
      id="produtos"
      className="products-section section-space"
      aria-labelledby="products-title"
    >
      <div className="container-site">
        <div className="section-heading">
          <div>
            <p className="kicker">
              {c("IDEIAS QUE VIRAM PRODUTOS", "IDEAS THAT BECOME PRODUCTS")}
            </p>
            <h2 id="products-title" className="editorial-title">
              {c("Soluções reais", "Real solutions")}
              <br />
              {c("para o dia a dia.", "for everyday life.")}
            </h2>
          </div>
          <p className="section-intro">
            {c(
              "Também criamos nossos próprios produtos. Tecnologia que aproxima, simplifica e faz parte da vida real.",
              "We also create our own products. Technology that connects, simplifies and becomes part of real life.",
            )}
          </p>
        </div>
        <div className="product-grid">
          {products.map((p) => (
            <article key={p.name} className={`product-card ${p.className}`}>
              <div className="product-copy">
                <div className="product-brand">
                  <span>
                    <p.icon size={23} strokeWidth={1.8} aria-hidden />
                  </span>
                  {p.name}
                  <small>{c("PRODUTO MORELIDEV", "BY MORELIDEV")}</small>
                </div>
                <p className="kicker">{p.type}</p>
                <h3>{p.title}</h3>
                <p className="product-description">{p.description}</p>
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-link"
                >
                  {c(`Conhecer o ${p.name}`, `Explore ${p.name}`)}
                  <ArrowUpRight size={17} aria-hidden />
                  <span className="sr-only">
                    {c(" (abre em nova aba)", " (opens in a new tab)")}
                  </span>
                </a>
              </div>
              <div className="product-image">
                <Image
                  src={`/images/premium/${p.image}.webp`}
                  alt={c(
                    `Apresentação ilustrativa do ${p.name} no computador e no celular`,
                    `Illustrative ${p.name} presentation on desktop and mobile`,
                  )}
                  width={1536}
                  height={1024}
                  sizes="(max-width: 767px) 100vw, 50vw"
                />
              </div>
            </article>
          ))}
        </div>
        <p className="product-footnote">
          <span className="status-dot" />
          {c(
            "Feitos por nós. Pensados para você.",
            "Built by us. Designed for you.",
          )}
          <span>
            {c(
              "Interfaces ilustrativas dos produtos.",
              "Illustrative product interfaces.",
            )}
          </span>
        </p>
      </div>
    </section>
  );
}
