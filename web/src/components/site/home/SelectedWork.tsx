"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Copy } from "./types";
import { LINKS } from "@/content/site";
import { OdontoAppMock, SaldoCasaMock } from "./ui/ProductMocks";
import { ensureGsap, gsap } from "@/lib/gsap";

type Row = {
  slug: string;
  name: string;
  sector: string;
  result: string;
  href: string;
  external?: boolean;
  media: React.ReactNode;
};

export function SelectedWork({ c }: { c: Copy }) {
  const listRef = useRef<HTMLDivElement>(null);

  const rows: Row[] = [
    {
      slug: "mameri",
      name: "Mameri Export",
      sector: c("WEBSITE / EXPERIÊNCIA DIGITAL", "WEBSITE / DIGITAL EXPERIENCE"),
      result: c(
        "De invisível no Google a encontrado por quem buscava o serviço.",
        "From invisible on Google to found by people searching for the service.",
      ),
      href: "/projetos/mameri",
      media: (
        <div className="case-frame">
          <Image
            src="/images/cases/mameri-site.webp"
            alt=""
            width={1280}
            height={520}
            sizes="(max-width: 1023px) 100vw, 55vw"
            loading="lazy"
          />
        </div>
      ),
    },
    {
      slug: "empresa-capixaba",
      name: "Empresa Capixaba",
      sector: c("OPERAÇÕES / SOFTWARE", "OPERATIONS / SOFTWARE"),
      result: c(
        "Mais controle. Uma operação conectada.",
        "More control. A connected operation.",
      ),
      href: "/projetos/empresa-capixaba",
      media: (
        <div className="case-frame">
          <Image
            src="/images/cases/empresa-capixaba.webp"
            alt=""
            width={1905}
            height={938}
            sizes="(max-width: 1023px) 100vw, 55vw"
            loading="lazy"
          />
        </div>
      ),
    },
    {
      slug: "odontoapp",
      name: "OdontoApp",
      sector: c("SAAS / PRODUTO PRÓPRIO", "SAAS / OWN PRODUCT"),
      result: c(
        "Gestão simples para clínicas que querem cuidar melhor.",
        "Simple management for clinics that want to care better.",
      ),
      href: LINKS.odontoapp,
      external: true,
      media: (
        <div className="case-fragment case-fragment--a">
          <OdontoAppMock c={c} />
        </div>
      ),
    },
    {
      slug: "saldo-casa",
      name: "SaldoCasa",
      sector: c("FINTECH / PRODUTO PRÓPRIO", "FINTECH / OWN PRODUCT"),
      result: c(
        "Extratos soltos viraram uma visão clara do mês.",
        "Loose statements became a clear view of the month.",
      ),
      href: "/projetos/saldo-casa",
      media: (
        <div className="case-fragment case-fragment--b">
          <SaldoCasaMock c={c} />
        </div>
      ),
    },
  ];

  useEffect(() => {
    ensureGsap();
    const list = listRef.current;
    if (!list) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const items = Array.from(list.querySelectorAll(".case-row"));
    const ctx = gsap.context(() => {
      if (!reduced) {
        gsap.from(items, {
          opacity: 0,
          y: 40,
          duration: 0.9,
          stagger: 0.12,
          scrollTrigger: { trigger: list, start: "top 82%" },
        });
      }

      if (!reduced && window.matchMedia("(pointer: fine)").matches) {
        items.forEach((item) => {
          const media = item.querySelector<HTMLElement>(".case-media");
          if (!media) return;
          const onMove = (e: PointerEvent) => {
            const rect = media.getBoundingClientRect();
            const px = (e.clientX - rect.left) / rect.width - 0.5;
            const py = (e.clientY - rect.top) / rect.height - 0.5;
            gsap.to(media, {
              rotateX: py * -4,
              rotateY: px * 5,
              duration: 0.5,
              ease: "power2.out",
              transformPerspective: 900,
            });
          };
          const onLeave = () => {
            gsap.to(media, { rotateX: 0, rotateY: 0, duration: 0.6 });
          };
          media.addEventListener("pointermove", onMove);
          media.addEventListener("pointerleave", onLeave);
        });
      }
    }, list);
    return () => ctx.revert();
  }, []);

  return (
    <section className="selected-work section-space" id="trabalhos" data-theme="light" aria-labelledby="work-title">
      <div className="container-site">
        <div className="work-head">
          <div>
            <p className="eyebrow">{c("TRABALHOS SELECIONADOS", "SELECTED WORK")}</p>
            <h2 id="work-title" className="h-section">
              {c("Projetos em", "Projects in")}
              <br />
              {c("produção.", "production.")}
            </h2>
          </div>
          <Link href="/projetos" className="text-link work-head-link" data-cursor="link">
            {c("Ver todos os projetos", "View all projects")}
            <ArrowUpRight size={16} aria-hidden />
          </Link>
        </div>
      </div>

      <div className="work-list" ref={listRef}>
        {rows.map((row, i) => {
          const linkProps = row.external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {};
          return (
            <article className="case-row container-site" key={row.slug}>
              <Link
                href={row.href}
                className="case-media"
                data-cursor="view"
                aria-label={`${row.name} — ${c("ver case", "view case")}`}
                {...linkProps}
              >
                {row.media}
              </Link>
              <div className="case-info">
                <span className="case-index num">0{i + 1}</span>
                <h3 className="case-name">{row.name}</h3>
                <p className="case-sector num">{row.sector}</p>
                <p className="case-result">{row.result}</p>
                <Link href={row.href} className="text-link" data-cursor="link" {...linkProps}>
                  {c("Ver case", "View case")}
                  <ArrowUpRight size={16} aria-hidden />
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
