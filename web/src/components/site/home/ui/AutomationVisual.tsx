import type { Copy } from "../types";

const HUB = { x: 300, y: 200 };

/**
 * Diagrama vivo de integrações: ferramentas da empresa ligadas a um núcleo,
 * com pulsos de dados correndo pelas conexões (CSS offset-path — pausa
 * sozinho para quem pede movimento reduzido).
 */
export function AutomationVisual({ c }: { c: Copy }) {
  const nodes: { label: string; x: number; y: number }[] = [
    { label: "ERP", x: 96, y: 78 },
    { label: c("Pagamentos", "Payments"), x: 504, y: 78 },
    { label: "CRM", x: 66, y: 204 },
    { label: "WhatsApp", x: 534, y: 204 },
    { label: "E-mail", x: 110, y: 330 },
    { label: "Dashboard", x: 490, y: 330 },
  ];
  const path = (x: number, y: number) => {
    const mx = (x + HUB.x) / 2;
    return `M${x} ${y} C${mx} ${y}, ${mx} ${HUB.y}, ${HUB.x} ${HUB.y}`;
  };

  return (
    <svg className="av" viewBox="0 0 600 400" role="img" aria-label={c(
      "Diagrama: ERP, pagamentos, CRM, WhatsApp, e-mail e dashboard conectados a um núcleo de integração",
      "Diagram: ERP, payments, CRM, WhatsApp, email and dashboard connected to an integration core",
    )}>
      <defs>
        <pattern id="av-grid" width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M24 0H0V24" fill="none" stroke="rgba(160,185,255,0.07)" />
        </pattern>
        <radialGradient id="av-glow">
          <stop offset="0" stopColor="#2f6bff" stopOpacity="0.55" />
          <stop offset="1" stopColor="#2f6bff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="av-g" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#3AA0FF" />
          <stop offset="0.55" stopColor="#2F6BFF" />
          <stop offset="1" stopColor="#5A6CFF" />
        </linearGradient>
      </defs>
      <rect width="600" height="400" fill="#080d1a" />
      <rect width="600" height="400" fill="url(#av-grid)" />
      <circle cx={HUB.x} cy={HUB.y} r="150" fill="url(#av-glow)" />

      {nodes.map((n, i) => (
        <g key={n.label}>
          <path className="av-line" d={path(n.x, n.y)} />
          <circle
            className="av-pulse"
            r="3.2"
            style={{
              offsetPath: `path("${path(n.x, n.y)}")`,
              animationDelay: `${i * -0.55}s`,
              animationDirection: i % 2 ? "reverse" : "normal",
            }}
          />
        </g>
      ))}

      {nodes.map((n) => {
        const w = n.label.length * 7.4 + 34;
        return (
          <g key={`n-${n.label}`} transform={`translate(${n.x - w / 2} ${n.y - 17})`}>
            <rect className="av-node" width={w} height="34" rx="17" />
            <circle cx="17" cy="17" r="3.5" fill="#6d8bff" />
            <text x="27" y="21.5" className="av-text">
              {n.label}
            </text>
          </g>
        );
      })}

      <g transform={`translate(${HUB.x - 46} ${HUB.y - 46})`}>
        <rect className="av-hub" width="92" height="92" rx="26" />
        <g transform="translate(14 16) scale(0.075)">
          <path d="M70 600 L280 170 Q295 140 332 140 H430 L220 620 Q205 655 168 655 H70 Q45 655 60 625 Z" fill="#F7F8FA" />
          <path d="M260 600 L500 100 Q515 70 552 70 H655 L410 620 Q395 655 360 655 H255 Q232 655 245 625 Z" fill="url(#av-g)" />
          <path d="M445 360 L555 190 L760 620 Q775 655 738 655 H650 Q620 655 605 626 Z" fill="#46516a" />
        </g>
      </g>
    </svg>
  );
}
