import type { Copy } from "../types";

/**
 * Recriações da interface dos nossos produtos em HTML/CSS.
 * Fiéis à estrutura real de cada app, com dados de demonstração —
 * nítidas em qualquer tela e sem expor dados de usuários reais.
 */

export function OdontoAppMock({ c }: { c: Copy }) {
  const menu = [
    c("Dashboard", "Dashboard"),
    c("Agenda", "Schedule"),
    c("Pacientes", "Patients"),
    c("Prontuário", "Records"),
    c("Financeiro", "Finance"),
  ];
  const admin = [c("Equipe", "Team"), c("Plano", "Plan")];
  const kpis: [string, string, string][] = [
    [
      c("Consultas hoje", "Appointments today"),
      "14",
      c("3 em espera", "3 waiting"),
    ],
    [
      c("Próximos 7 dias", "Next 7 days"),
      "62",
      c("+12% na semana", "+12% this week"),
    ],
    [c("Novos pacientes", "New patients"), "48", c("no mês", "this month")],
    [
      c("Faturamento", "Revenue"),
      "R$ 32.480",
      c("+18% vs. agosto", "+18% vs. August"),
    ],
  ];
  const agenda: [string, string, string, string][] = [
    [
      "08:00",
      c("Ana Clara Souza", "Ana Clara Souza"),
      c("Limpeza", "Cleaning"),
      "ok",
    ],
    [
      "09:30",
      c("Rafael Nunes", "Rafael Nunes"),
      c("Ortodontia", "Orthodontics"),
      "",
    ],
    [
      "11:00",
      c("Juliana Prado", "Juliana Prado"),
      c("Clareamento", "Whitening"),
      "",
    ],
    [
      "14:00",
      c("Marco Antônio", "Marco Antônio"),
      c("Restauração", "Filling"),
      "wait",
    ],
    [
      "16:30",
      c("Fernanda Lima", "Fernanda Lima"),
      c("Avaliação", "Assessment"),
      "",
    ],
  ];
  return (
    <div className="pm-wrap" aria-hidden>
      <div className="pm pm-odonto">
        <aside className="pm-side">
          <span className="pm-logo">
            <i />
            {c("Clínica Lumina", "Lumina Clinic")}
          </span>
          <span className="pm-label">{c("Principal", "Main")}</span>
          <nav>
            {menu.map((item, i) => (
              <span key={item} data-on={i === 0 ? "" : undefined}>
                {item}
              </span>
            ))}
          </nav>
          <span className="pm-label">{c("Gestão", "Management")}</span>
          <nav>
            {admin.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </nav>
          <span className="pm-user">
            <b>
              Marina Albuquerque
              <u>{c("Administradora", "Administrator")}</u>
            </b>
          </span>
        </aside>

        <div className="pm-main">
          <header className="pm-head">
            <div>
              <b>{c("Bom dia, Marina", "Good morning, Marina")}</b>
              <span>
                {c("Segunda-feira, 8 de setembro", "Monday, September 8")}
              </span>
            </div>
            <span className="pm-search">
              {c(
                "Buscar paciente, agendamento…",
                "Search patient, appointment…",
              )}
            </span>
          </header>

          <div className="pm-kpis">
            {kpis.map(([label, value, hint]) => (
              <div className="pm-kpi" key={label}>
                <small>{label}</small>
                <b>{value}</b>
                <u>{hint}</u>
              </div>
            ))}
          </div>

          <div className="pm-cols">
            <div className="pm-card">
              <header>
                {c("Agenda de hoje", "Today's schedule")}
                <span>{c("14 consultas", "14 appointments")}</span>
              </header>
              {agenda.map(([time, name, kind, tone]) => (
                <div className="pm-row" key={time}>
                  <time>{time}</time>
                  <b>
                    {name}
                    <u>{kind}</u>
                  </b>
                  <em data-tone={tone || undefined}>
                    {tone === "ok"
                      ? c("Em atendimento", "In session")
                      : tone === "wait"
                        ? c("Aguardando", "Pending")
                        : c("Confirmado", "Confirmed")}
                  </em>
                </div>
              ))}
            </div>

            <div className="pm-card">
              <header>{c("Faturamento", "Revenue")}</header>
              <div className="pm-bars">
                {[46, 58, 51, 67, 74, 88].map((height, i) => (
                  <span key={i} style={{ height: `${height}%` }} />
                ))}
              </div>
              <div className="pm-legend">
                <span>
                  <b>R$ 32.480</b>
                  {c("recebido no mês", "received this month")}
                </span>
                <span data-tone="ok">+18%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Curva de tendência — traçado simples, sem biblioteca de gráfico. */
function Trend() {
  const line =
    "M0 34 L26 30 L52 31 L78 24 L104 18 L130 20 L156 12 L182 8 L208 4";
  return (
    <svg
      viewBox="0 0 208 40"
      preserveAspectRatio="none"
      className="pm-trend"
      role="presentation"
    >
      <defs>
        <linearGradient id="pmTrend" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#17845a" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#17845a" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${line} L208 40 L0 40 Z`} fill="url(#pmTrend)" />
      <path
        d={line}
        fill="none"
        stroke="#17845a"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

export function SaldoCasaMock({ c }: { c: Copy }) {
  const tabs = [
    c("Dashboard", "Dashboard"),
    c("Lançamentos", "Entries"),
    c("Recorrências", "Recurring"),
    c("Orçamentos", "Budgets"),
    c("Relatórios", "Reports"),
  ];
  const kpis: [string, string, string, string][] = [
    [
      c("Saldo atual", "Current balance"),
      "R$ 8.420,60",
      c("Previsto: R$ 9.980,00", "Forecast: R$ 9,980.00"),
      "ok",
    ],
    [
      c("Entradas", "Income"),
      "R$ 12.950,00",
      c("5 lançamentos", "5 entries"),
      "ok",
    ],
    [
      c("Saídas", "Expenses"),
      "R$ 4.529,40",
      c("23 lançamentos", "23 entries"),
      "",
    ],
    [
      c("Economia", "Savings"),
      "35%",
      c("da renda do mês", "of monthly income"),
      "ok",
    ],
  ];
  const entries: [string, string, string, string, string][] = [
    [
      c("Salário", "Salary"),
      c("Renda", "Income"),
      "01/09",
      "+ R$ 7.500,00",
      "in",
    ],
    [
      c("Aluguel", "Rent"),
      c("Moradia", "Housing"),
      "05/09",
      "- R$ 1.850,00",
      "",
    ],
    [
      c("Mercado", "Groceries"),
      c("Alimentação", "Food"),
      "06/09",
      "- R$ 486,90",
      "",
    ],
  ];
  const categories: [string, number, string][] = [
    [c("Moradia", "Housing"), 38, "#2457ff"],
    [c("Alimentação", "Food"), 24, "#17845a"],
    [c("Transporte", "Transport"), 15, "#f0a92b"],
    [c("Lazer", "Leisure"), 13, "#7c5cf5"],
    [c("Outros", "Other"), 10, "#98a0b0"],
  ];
  return (
    <div className="pm-wrap" aria-hidden>
      <div className="pm pm-saldo">
        <header className="pm-topnav">
          <span className="pm-logo">
            <i />
            saldocasa
          </span>
          <nav>
            {tabs.map((tab, i) => (
              <span key={tab} data-on={i === 0 ? "" : undefined}>
                {tab}
              </span>
            ))}
          </nav>
          <span className="pm-plan">Pro+</span>
        </header>

        <div className="pm-main">
          <header className="pm-head">
            <div>
              <b>{c("Olá, William", "Hi, William")}</b>
              <span>
                {c(
                  "Casa Silva — setembro de 2026",
                  "Casa Silva — September 2026",
                )}
              </span>
            </div>
            <span className="pm-btn">{c("Novo lançamento", "New entry")}</span>
          </header>

          <div className="pm-kpis">
            {kpis.map(([label, value, hint, tone]) => (
              <div className="pm-kpi" key={label}>
                <small>{label}</small>
                <b data-tone={tone || undefined}>{value}</b>
                <u>{hint}</u>
              </div>
            ))}
          </div>

          <div className="pm-cols">
            <div className="pm-card">
              <header>
                {c("Últimos lançamentos", "Latest entries")}
                <span>{c("Ver todos", "See all")}</span>
              </header>
              {entries.map(([title, category, date, value, tone]) => (
                <div className="pm-row" key={title}>
                  <b>
                    {title}
                    <u>
                      {category} · {date}
                    </u>
                  </b>
                  <em data-tone={tone || undefined}>{value}</em>
                </div>
              ))}
            </div>

            <div className="pm-card">
              <header>
                {c("Gastos por categoria", "Spending by category")}
              </header>
              <div className="pm-donut">
                <Donut
                  slices={categories.map(([, value, color]) => [value, color])}
                />
                <div className="pm-cats">
                  {categories.map(([label, value, color]) => (
                    <span key={label}>
                      <i style={{ background: color }} />
                      {label}
                      <u>{value}%</u>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="pm-card pm-evolution">
            <header>
              {c("Evolução de 6 meses", "Six-month trend")}
              <span>{c("saldo acumulado", "accumulated balance")}</span>
            </header>
            <Trend />
          </div>
        </div>
      </div>
    </div>
  );
}

/** Donut desenhado com dasharray — sem biblioteca de gráfico. */
function Donut({ slices }: { slices: [number, string][] }) {
  const radius = 15.9155;
  const circumference = 2 * Math.PI * radius;
  // deslocamento acumulado de cada fatia, calculado antes de desenhar
  const offsets = slices.reduce<number[]>(
    (acc, [value], i) => [...acc, (acc[i] ?? 0) + value],
    [0],
  );
  return (
    <svg viewBox="0 0 40 40" className="pm-donut-svg" role="presentation">
      {slices.map(([value, color], i) => {
        const length = (value / 100) * circumference;
        return (
          <circle
            key={color}
            cx="20"
            cy="20"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="5.5"
            strokeDasharray={`${length} ${circumference - length}`}
            transform={`rotate(${-90 + (offsets[i] / 100) * 360} 20 20)`}
          />
        );
      })}
    </svg>
  );
}
