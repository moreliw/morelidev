"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, HeartPulse, Wallet } from "lucide-react";
import type { Copy } from "./types";
import { LINKS } from "@/content/site";
import { OdontoAppMock, SaldoCasaMock } from "./ui/ProductMocks";
import { ensureGsap, gsap } from "@/lib/gsap";

/**
 * Produtos próprios em painéis que se expandem (hover, foco ou toque):
 * o produto em destaque ganha espaço, o outro recua. No mobile, empilham.
 */
export function Products({ c }: { c: Copy }) {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(0);

  const products = [
    {
      name: "OdontoApp",
      icon: HeartPulse,
      kind: c("SaaS · Odontologia", "SaaS · Dentistry"),
      title: c("Gestão para clínicas odontológicas.", "Management for dental clinics."),
      text: c(
        "Agenda, pacientes, prontuário e financeiro em um só sistema.",
        "Scheduling, patients, records and finance in one system.",
      ),
      href: LINKS.odontoapp,
      mock: <OdontoAppMock c={c} />,
    },
    {
      name: "SaldoCasa",
      icon: Wallet,
      kind: c("App · Finanças pessoais", "App · Personal finance"),
      title: c("Controle financeiro pessoal.", "Personal finance tracking."),
      text: c(
        "Gastos, metas e relatórios em um aplicativo simples.",
        "Expenses, goals and reports in a simple app.",
      ),
      href: LINKS.saldocasa,
      mock: <SaldoCasaMock c={c} />,
    },
  ];

  useEffect(() => {
    ensureGsap();
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.from(".pd-card", {
        y: 80,
        opacity: 0,
        rotateX: -8,
        transformPerspective: 1200,
        duration: 1.2,
        stagger: 0.12,
        ease: "expo.out",
        scrollTrigger: { trigger: el, start: "top 82%" },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section id="produtos" className="pd panel panel-light" data-theme="light" aria-labelledby="products-title">
      <div className="container-site">
        <div className="sec-head">
          <div>
            <p className="kicker">
              {c("Produtos próprios", "Own products")}
            </p>
            <h2 id="products-title" className="h-big">
              {c("Produtos", "Products")} <em>{c("da MoreliDev.", "by MoreliDev.")}</em>
            </h2>
          </div>
          <p className="sec-lead">
            {c(
              "Plataformas que desenvolvemos e mantemos em operação.",
              "Platforms we build and keep running.",
            )}
          </p>
        </div>

        <div className="pd-row" ref={ref}>
          {products.map((p, i) => (
            <article
              key={p.name}
              className="pd-card"
              data-open={open === i || undefined}
              onPointerEnter={() => setOpen(i)}
              onFocus={() => setOpen(i)}
              onClick={() => setOpen(i)}
            >
              <div className="pd-shot" aria-hidden>
                {p.mock}
              </div>
              <div className="pd-body">
                <p className="pd-brand">
                  <i>
                    <p.icon size={16} strokeWidth={1.8} aria-hidden />
                  </i>
                  <span>
                    <b>{p.name}</b>
                    <small className="num">{p.kind}</small>
                  </span>
                </p>
                <h3>{p.title}</h3>
                <p className="pd-text">{p.text}</p>
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pill pill-light"
                  data-cursor="view"
                >
                  {c(`Conhecer o ${p.name}`, `Explore ${p.name}`)}
                  <ArrowUpRight size={15} aria-hidden />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
