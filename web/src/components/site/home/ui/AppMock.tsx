import type { Copy } from "../types";

/**
 * Mockup de interface desenhado em HTML/CSS — nítido em qualquer densidade
 * de tela, sem custo de imagem e sem cara de screenshot de banco de imagens.
 */
export function AppMock({ c }: { c: Copy }) {
  const agenda = [
    ["09:00", c("Juliana Costa", "Juliana Costa"), c("Em atendimento", "In session"), "ok"],
    ["10:30", c("Rafael Mendes", "Rafael Mendes"), c("Confirmado", "Confirmed"), ""],
    ["13:00", c("Camila Oliveira", "Camila Oliveira"), c("Confirmado", "Confirmed"), ""],
    ["15:30", c("Bruno Almeida", "Bruno Almeida"), c("Aguardando", "Pending"), ""],
  ];
  return (
    <div className="ui" aria-hidden>
      <div className="ui-app">
        <aside className="ui-side">
          <span className="ui-brand">
            <i>M</i>
            {c("Operação", "Operations")}
          </span>
          <nav className="ui-menu">
            <span data-on="">{c("Início", "Home")}</span>
            <span>{c("Agenda", "Schedule")}</span>
            <span>{c("Clientes", "Clients")}</span>
            <span>{c("Financeiro", "Finance")}</span>
            <span>{c("Relatórios", "Reports")}</span>
            <span>{c("Integrações", "Integrations")}</span>
          </nav>
          <span className="ui-user">
            <i />
            <b>
              {c("Equipe", "Team")}
              <u>{c("4 pessoas online", "4 people online")}</u>
            </b>
          </span>
        </aside>
        <div className="ui-main">
          <div className="ui-head">
            <div>
              <b className="ui-title">{c("Visão geral", "Overview")}</b>
              <p>{c("Atualizado agora", "Updated just now")}</p>
            </div>
            <span className="ui-avatar">
              <i />
              {c("Equipe", "Team")}
            </span>
          </div>
          <div className="ui-stats">
            <div className="ui-stat">
              <small>{c("ATENDIMENTOS", "SESSIONS")}</small>
              <b>128</b>
              <u>+18%</u>
            </div>
            <div className="ui-stat">
              <small>{c("EM ANDAMENTO", "IN PROGRESS")}</small>
              <b>24</b>
              <u>+6%</u>
            </div>
            <div className="ui-stat">
              <small>{c("HORAS POUPADAS", "HOURS SAVED")}</small>
              <b>312h</b>
              <u>+22%</u>
            </div>
          </div>
          <div className="ui-two">
            <div className="ui-panel">
              <header>
                {c("Agenda de hoje", "Today's schedule")}
                <span>{c("4 registros", "4 records")}</span>
              </header>
              {agenda.map(([time, name, status, tone]) => (
                <div className="ui-row" key={time}>
                  <time>{time}</time>
                  <b>{name}</b>
                  <em data-tone={tone || undefined}>{status}</em>
                </div>
              ))}
            </div>
            <div className="ui-panel">
              <header>
                {c("Receita", "Revenue")}
                <span>{c("30 dias", "30 days")}</span>
              </header>
              <Sparkline height={74} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Linha de tendência — traçada, não desenhada em bitmap. */
export function Sparkline({ height = 44 }: { height?: number }) {
  const d =
    "M0 40 L14 36 L28 38 L42 30 L56 33 L70 24 L84 27 L98 18 L112 21 L126 12 L140 15 L154 6 L168 8";
  return (
    <svg
      className="ui-chart"
      viewBox="0 0 168 48"
      preserveAspectRatio="none"
      style={{ height }}
      role="presentation"
    >
      <defs>
        <linearGradient id="spark" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.18" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${d} L168 48 L0 48 Z`} fill="url(#spark)" />
      <path
        d={d}
        fill="none"
        stroke="var(--accent)"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
