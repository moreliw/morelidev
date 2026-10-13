import type { Copy } from "../types";
import { AutomationVisual } from "./AutomationVisual";
import "./service-visuals.css";

/**
 * Composições de interface para a seção de serviços, desenhadas em código:
 * mesmo enquadramento, mesma paleta e mesma luz nas quatro frentes, nítidas
 * em qualquer densidade de tela. Os dados são de demonstração.
 *
 * Tudo é medido em `em`, e o `em` acompanha a largura do card (container
 * query) — a composição escala inteira, sem reflow.
 */

export type ServiceVisualKind = "systems" | "product" | "web" | "automation";

export function ServiceVisual({ kind, c }: { kind: ServiceVisualKind; c: Copy }) {
  const label = {
    systems: c("Exemplo de sistema de gestão", "Management system example"),
    product: c("Exemplo de plataforma SaaS com aplicativo", "SaaS platform with app example"),
    web: c("Exemplo de site institucional", "Business website example"),
    automation: c("Diagrama de integrações", "Integrations diagram"),
  }[kind];

  return (
    <div className={`svx svx--${kind}`} role="img" aria-label={label}>
      <div className="svx-stage" aria-hidden>
        {kind === "systems" && <Systems c={c} />}
        {kind === "product" && <Product c={c} />}
        {kind === "web" && <Web c={c} />}
        {kind === "automation" && <AutomationVisual c={c} decorative />}
      </div>
    </div>
  );
}

function WindowBar({ url }: { url?: string }) {
  return (
    <div className="svx-bar">
      <span className="svx-dots">
        <i />
        <i />
        <i />
      </span>
      {url && <span className="svx-url">{url}</span>}
    </div>
  );
}

/* ── Sistema de gestão ─────────────────────────────────────────── */
function Systems({ c }: { c: Copy }) {
  const nav = [
    c("Visão geral", "Overview"),
    c("Pedidos", "Orders"),
    c("Clientes", "Customers"),
    c("Estoque", "Inventory"),
    c("Financeiro", "Finance"),
    c("Relatórios", "Reports"),
  ];
  const kpis: [string, string, string][] = [
    [c("Pedidos no mês", "Orders this month"), "1.284", "+12%"],
    [c("Faturamento", "Revenue"), c("R$ 342 mil", "$68.4k"), "+8%"],
    [c("Em produção", "In production"), "96", c("hoje", "today")],
  ];
  const rows: [string, string, "ok" | "run" | "wait"][] = [
    [c("Construtora Alvorada", "Alvorada Builders"), c("Aprovado", "Approved"), "ok"],
    [c("Clínica Bem Estar", "Wellness Clinic"), c("Em produção", "In production"), "run"],
    [c("Mercado Central", "Central Market"), c("Aguardando", "Pending"), "wait"],
    [c("Hotel Atlântico", "Atlantic Hotel"), c("Aprovado", "Approved"), "ok"],
    [c("Escola Horizonte", "Horizon School"), c("Em produção", "In production"), "run"],
    [c("Padaria Estação", "Station Bakery"), c("Aprovado", "Approved"), "ok"],
  ];
  return (
    <>
      <div className="svx-win svx-sys">
        <WindowBar url="gestao.suaempresa.com.br" />
        <div className="svx-sys-body">
          <aside className="svx-side">
            <div className="svx-brand">
              <i />
              <b>{c("Operações", "Operations")}</b>
            </div>
            {nav.map((n, i) => (
              <span key={n} data-on={i === 0 || undefined}>
                <i />
                {n}
              </span>
            ))}
          </aside>
          <main className="svx-main">
            <header className="svx-head">
              <div>
                <b>{c("Visão geral", "Overview")}</b>
                <small>{c("Atualizado agora", "Updated just now")}</small>
              </div>
              <span className="svx-seg">
                <i>{c("Hoje", "Today")}</i>
                <i data-on>{c("30 dias", "30 days")}</i>
                <i>{c("Ano", "Year")}</i>
              </span>
            </header>
            <div className="svx-kpis">
              {kpis.map(([k, v, d]) => (
                <div key={k} className="svx-card">
                  <small>{k}</small>
                  <b>{v}</b>
                  <em>{d}</em>
                </div>
              ))}
            </div>
            <div className="svx-cols">
              <div className="svx-card svx-chart">
                <small>{c("Pedidos por semana", "Orders per week")}</small>
                <svg viewBox="0 0 300 110" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="svx-area" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0" stopColor="#4f7cff" stopOpacity="0.45" />
                      <stop offset="1" stopColor="#4f7cff" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  {[22, 50, 78].map((y) => (
                    <line key={y} x1="0" x2="300" y1={y} y2={y} className="svx-grid" />
                  ))}
                  <path
                    d="M0 86 C25 82 40 70 62 72 S100 58 124 60 S160 40 186 46 S226 30 248 24 S284 18 300 12 L300 110 L0 110 Z"
                    fill="url(#svx-area)"
                  />
                  <path
                    d="M0 86 C25 82 40 70 62 72 S100 58 124 60 S160 40 186 46 S226 30 248 24 S284 18 300 12"
                    className="svx-line"
                  />
                </svg>
              </div>
              <div className="svx-card svx-list">
                <small>{c("Pedidos recentes", "Recent orders")}</small>
                {rows.map(([name, status, tone]) => (
                  <div key={name} className="svx-row">
                    <span>{name}</span>
                    <em data-tone={tone}>{status}</em>
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="svx-toast">
        <i data-tone="ok" />
        <span>
          <b>{c("Pedido aprovado", "Order approved")}</b>
          <small>{c("Nota fiscal emitida automaticamente", "Invoice issued automatically")}</small>
        </span>
      </div>
    </>
  );
}

/* ── Produto digital / SaaS + app ──────────────────────────────── */
function Product({ c }: { c: Copy }) {
  const bars = [38, 46, 44, 58, 62, 70, 68, 82, 88, 96];
  const plans: [string, string, number][] = [
    ["Starter", "412", 46],
    ["Pro", "268", 72],
    ["Business", "94", 30],
  ];
  return (
    <>
      <div className="svx-win svx-saas">
        <WindowBar url="app.seuproduto.com" />
        <div className="svx-saas-body">
          <header className="svx-head">
            <div>
              <b>{c("Assinaturas", "Subscriptions")}</b>
              <small>{c("Receita recorrente", "Recurring revenue")}</small>
            </div>
            <span className="svx-btn">{c("Novo plano", "New plan")}</span>
          </header>
          <div className="svx-kpis svx-kpis--2">
            <div className="svx-card">
              <small>{c("Receita mensal", "Monthly revenue")}</small>
              <b>{c("R$ 86,4 mil", "$17.3k")}</b>
              <em>+14%</em>
            </div>
            <div className="svx-card">
              <small>{c("Assinantes ativos", "Active subscribers")}</small>
              <b>774</b>
              <em>+38</em>
            </div>
          </div>
          <div className="svx-cols">
            <div className="svx-card svx-bars">
              <small>{c("Crescimento", "Growth")}</small>
              <div>
                {bars.map((h, i) => (
                  <i key={i} style={{ height: `${h}%` }} data-on={i === bars.length - 1 || undefined} />
                ))}
              </div>
            </div>
            <div className="svx-card svx-plans">
              <small>{c("Por plano", "By plan")}</small>
              {plans.map(([n, v, w]) => (
                <div key={n}>
                  <span>
                    {n}
                    <b>{v}</b>
                  </span>
                  <u>
                    <i style={{ width: `${w}%` }} />
                  </u>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="svx-phone">
        <div className="svx-phone-screen">
          <span className="svx-notch" />
          <small>{c("Olá, Marina", "Hi, Marina")}</small>
          <div className="svx-balance">
            <small>{c("Seu plano", "Your plan")}</small>
            <b>Pro</b>
            <em>{c("Renova em 12 de nov.", "Renews Nov 12")}</em>
          </div>
          {[
            [c("Relatórios", "Reports"), c("Novo", "New")],
            [c("Equipe", "Team"), "5"],
            [c("Integrações", "Integrations"), "3"],
          ].map(([a, b]) => (
            <div key={a} className="svx-phone-row">
              <span>{a}</span>
              <em>{b}</em>
            </div>
          ))}
          <div className="svx-usage">
            <span>
              {c("Uso do mês", "Monthly usage")}
              <b>64%</b>
            </span>
            <u>
              <i />
            </u>
          </div>
          <span className="svx-phone-cta">{c("Ver uso do mês", "View monthly usage")}</span>
        </div>
      </div>
    </>
  );
}

/* ── Site institucional + resultado de busca ───────────────────── */
function Web({ c }: { c: Copy }) {
  return (
    <>
      <div className="svx-win svx-web">
        <WindowBar url="norte-arquitetura.com.br" />
        <div className="svx-site">
          <nav className="svx-site-nav">
            <b>
              <i />
              Norte
            </b>
            <span>{c("Projetos", "Projects")}</span>
            <span>{c("Estúdio", "Studio")}</span>
            <span>{c("Contato", "Contact")}</span>
            <em>{c("Agendar visita", "Book a visit")}</em>
          </nav>
          <div className="svx-site-hero">
            <div className="svx-site-copy">
              <small>{c("Arquitetura residencial", "Residential architecture")}</small>
              <h4>{c("Espaços pensados para quem vive neles.", "Spaces designed for the people who live in them.")}</h4>
              <p>
                {c(
                  "Projetos residenciais e comerciais do primeiro traço à entrega da obra.",
                  "Residential and commercial projects from first sketch to handover.",
                )}
              </p>
              <span className="svx-site-btn">{c("Ver projetos", "See projects")}</span>
            </div>
            <div className="svx-photo">
              <i className="svx-photo-sun" />
              <i className="svx-photo-wall" />
              <i className="svx-photo-window" />
              <i className="svx-photo-floor" />
            </div>
          </div>
        </div>
      </div>
      <div className="svx-serp">
        <span className="svx-serp-site">
          <i />
          <span>
            <b>Norte Arquitetura</b>
            <small>norte-arquitetura.com.br</small>
          </span>
        </span>
        <b className="svx-serp-title">
          {c("Norte Arquitetura | Projetos residenciais", "Norte Architecture | Residential projects")}
        </b>
        <small>
          {c(
            "Projetos residenciais e comerciais do primeiro traço à entrega da obra.",
            "Residential and commercial projects from first sketch to handover.",
          )}
        </small>
      </div>
    </>
  );
}
