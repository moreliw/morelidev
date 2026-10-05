"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Blocks, Boxes, Globe2, Workflow, type LucideIcon } from "lucide-react";
import type { Copy } from "./types";
import { ensureGsap, gsap, ScrollTrigger } from "@/lib/gsap";
import { getLenis } from "../motion/SmoothScroll";
import { AutomationVisual } from "./ui/AutomationVisual";

type Service = {
  key: string;
  icon: LucideIcon;
  tab: string;
  label: string;
  title: string;
  text: string;
  items: string[];
  image?: string;
  alt?: string;
};

/**
 * "O que fazemos" — uma jornada fixa em tela cheia: cada frente de serviço
 * ocupa a tela inteira por um trecho de scroll, com imagem, número vazado
 * e barra de progresso clicável. Sem motion, vira uma lista empilhada.
 */
export function Services({ c }: { c: Copy }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const fillRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const services: Service[] = [
    {
      key: "systems",
      icon: Blocks,
      tab: c("Sistemas", "Systems"),
      label: c("Sistemas", "Systems"),
      title: c("Sistemas de gestão sob medida", "Custom management systems"),
      text: c(
        "ERPs, portais e ferramentas internas adaptados aos processos da sua empresa.",
        "ERPs, portals and internal tools built around your company's processes.",
      ),
      items: [
        c("ERPs e sistemas internos", "ERPs and internal systems"),
        c("Portais e áreas do cliente", "Portals and client areas"),
        c("Dashboards e relatórios", "Dashboards and reports"),
      ],
      image: "/images/premium/capixaba-studio.webp",
      alt: c("Sistema de gestão operacional em um notebook", "Operations management system on a laptop"),
    },
    {
      key: "products",
      icon: Boxes,
      tab: c("Produtos", "Products"),
      label: c("Produtos", "Products"),
      title: c("Produtos digitais e SaaS", "Digital products and SaaS"),
      text: c(
        "Planejamento, design e desenvolvimento de plataformas web e aplicativos.",
        "Planning, design and development of web platforms and apps.",
      ),
      items: [
        c("MVP e SaaS", "MVP and SaaS"),
        c("Web e mobile", "Web and mobile"),
        c("Assinaturas e pagamentos", "Subscriptions and payments"),
      ],
      image: "/images/premium/saldocasa.webp",
      alt: c("Aplicativo SaaS SaldoCasa no celular e no tablet", "SaldoCasa SaaS app on phone and tablet"),
    },
    {
      key: "web",
      icon: Globe2,
      tab: c("Sites", "Websites"),
      label: c("Sites", "Websites"),
      title: c("Sites institucionais", "Business websites"),
      text: c(
        "Sites rápidos, otimizados para o Google e preparados para gerar contatos.",
        "Fast websites, optimised for Google and built to generate leads.",
      ),
      items: [
        c("Landing pages", "Landing pages"),
        c("Experiências 3D e interativas", "3D and interactive experiences"),
        c("SEO técnico e performance", "Technical SEO and performance"),
      ],
      image: "/images/premium/mameri-studio.webp",
      alt: c("Site da Mameri Export em um notebook", "Mameri Export website on a laptop"),
    },
    {
      key: "automation",
      icon: Workflow,
      tab: c("Automação", "Automation"),
      label: c("Automação", "Automation"),
      title: c("Integrações e automações", "Integrations and automation"),
      text: c(
        "Integração entre ERPs, pagamentos, WhatsApp e outras ferramentas para reduzir trabalho manual.",
        "Connecting ERPs, payments, WhatsApp and other tools to reduce manual work.",
      ),
      items: [
        c("APIs e integrações com ERPs", "APIs and ERP integrations"),
        c("Pagamentos e WhatsApp", "Payments and WhatsApp"),
        c("Workflows automatizados", "Automated workflows"),
      ],
    },
  ];
  const total = services.length;

  useEffect(() => {
    ensureGsap();
    const track = trackRef.current;
    if (!track) return;
    if (document.documentElement.dataset.motion !== "on") return;

    const st = ScrollTrigger.create({
      trigger: track,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const raw = self.progress * total;
        const idx = Math.min(total - 1, Math.floor(raw));
        fillRefs.current.forEach((el, i) => {
          if (el) el.style.transform = `scaleX(${Math.min(1, Math.max(0, raw - i))})`;
        });
        if (idx !== activeRef.current) {
          activeRef.current = idx;
          setActive(idx);
        }
      },
    });
    return () => st.kill();
  }, [total]);

  // Transição entre frentes: texto sobe, imagem revela por cortina.
  useEffect(() => {
    const track = trackRef.current;
    if (!track || document.documentElement.dataset.motion !== "on") return;
    const slide = track.querySelector<HTMLElement>(`[data-slide="${active}"]`);
    const media = track.querySelector<HTMLElement>(`[data-media="${active}"]`);
    if (!slide || !media) return;
    const tl = gsap.timeline();
    tl.fromTo(
      slide.querySelectorAll("[data-stagger]"),
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.06, ease: "expo.out" },
    ).fromTo(
      media,
      { clipPath: "inset(100% 0% 0% 0% round 24px)" },
      { clipPath: "inset(0% 0% 0% 0% round 24px)", duration: 1, ease: "expo.inOut" },
      0,
    );
    const img = media.querySelector("img, svg");
    if (img) tl.fromTo(img, { scale: 1.18 }, { scale: 1, duration: 1.4, ease: "expo.out" }, 0);
    return () => {
      tl.kill();
    };
  }, [active]);

  const goTo = (i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const top = track.getBoundingClientRect().top + window.scrollY;
    const span = track.offsetHeight - window.innerHeight;
    const y = top + (span * (i + 0.5)) / total;
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(y, { duration: 1.2 });
    else window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <section id="servicos" className="sv" data-theme="dark" aria-labelledby="services-title">
      <div className="container-site sv-head">
        <p className="kicker">
          {c("Serviços", "Services")}
        </p>
        <h2 id="services-title" className="h-big">
          {c("O que a MoreliDev", "What MoreliDev")} <em>{c("desenvolve.", "builds.")}</em>
        </h2>
      </div>

      <div className="sv-track" ref={trackRef} style={{ ["--n" as string]: total }}>
        <div className="sv-pin">
          <div className="sv-ambient" aria-hidden>
            {services.map((s, i) =>
              s.image ? (
                <div
                  key={s.key}
                  className="sv-ambient-img"
                  data-on={i === active || undefined}
                  style={{ backgroundImage: `url(${s.image})` }}
                />
              ) : (
                <div key={s.key} className="sv-ambient-img sv-ambient-img--flow" data-on={i === active || undefined} />
              ),
            )}
          </div>

          <div className="container-site sv-stage">
            {services.map((s, i) => (
              <article
                key={s.key}
                className="sv-slide"
                data-slide={i}
                data-on={i === active || undefined}
              >
                <div className="sv-copy">
                  <p className="sv-label num" data-stagger>
                    <s.icon size={15} strokeWidth={1.6} aria-hidden />
                    {s.label}
                  </p>
                  <h3 data-stagger>{s.title}</h3>
                  <p className="sv-text" data-stagger>
                    {s.text}
                  </p>
                  <ul data-stagger>
                    {s.items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                </div>
                <div className="sv-media" data-media={i}>
                  {s.image ? (
                    <Image src={s.image} alt={s.alt ?? ""} fill sizes="(max-width: 1023px) 92vw, 50vw" />
                  ) : (
                    <AutomationVisual c={c} />
                  )}
                </div>
              </article>
            ))}
          </div>

          <nav className="container-site sv-tabs" aria-label={c("Frentes de serviço", "Service areas")}>
            {services.map((s, i) => (
              <button
                key={s.key}
                type="button"
                aria-current={i === active ? "step" : undefined}
                className="sv-tab num"
                data-on={i === active || undefined}
                onClick={() => goTo(i)}
                data-cursor="link"
              >
                <span>{s.tab}</span>
                <i aria-hidden>
                  <span
                    ref={(el) => {
                      fillRefs.current[i] = el;
                    }}
                  />
                </i>
              </button>
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
}
