export interface ProjectData {
  id: string;
  title: string;
  shortDesc: { pt: string; en: string };
  category: { pt: string; en: string };
  problem: { pt: string; en: string };
  solution: { pt: string; en: string };
  result: { pt: string; en: string };
  stack: string[];
  videoUrl?: string;
  imageUrl?: string;
  demoUrl?: string;
  featured?: boolean;
}

export const PROJECTS: ProjectData[] = [
  {
    id: "cipritex",
    title: "Cipritex",
    shortDesc: {
      pt: "Sistema corporativo com gestão integrada, fluxos personalizados e relatórios em tempo real.",
      en: "Corporate system with integrated management, custom workflows and real-time reports.",
    },
    category: { pt: "Sistema corporativo", en: "Corporate system" },
    problem: {
      pt: "Empresa controlava processos críticos em planilhas e e-mails, sem visibilidade central.",
      en: "Company managed critical processes via spreadsheets and emails, with no central visibility.",
    },
    solution: {
      pt: "Plataforma web com módulos de gestão, dashboards de KPI e workflows automatizados.",
      en: "Web platform with management modules, KPI dashboards and automated workflows.",
    },
    result: {
      pt: "Redução de 70% no tempo de fechamento mensal e eliminou erros manuais.",
      en: "70% reduction in monthly closing time and eliminated manual errors.",
    },
    stack: [".NET", "Angular", "SQL Server", "Docker"],
    videoUrl: "/videos/cipritex.mp4",
    featured: true,
  },
  {
    id: "takki",
    title: "Takki.ao",
    shortDesc: {
      pt: "Marketplace responsivo focado em curadoria, performance e experiência do usuário.",
      en: "Responsive marketplace built around curation, performance and great UX.",
    },
    category: { pt: "Marketplace", en: "Marketplace" },
    problem: {
      pt: "Vendedores angolanos sem canal digital estruturado para expor e vender seus produtos.",
      en: "Angolan sellers had no structured digital channel to list and sell their products.",
    },
    solution: {
      pt: "Marketplace com catálogo, carrinho, checkout e painel do vendedor integrados.",
      en: "Marketplace with catalog, cart, checkout and integrated seller panel.",
    },
    result: {
      pt: "Plataforma com dezenas de vendedores ativos e experiência de compra mobile-first.",
      en: "Platform with dozens of active sellers and a mobile-first shopping experience.",
    },
    stack: ["React", "Node.js", "PostgreSQL", "UX"],
    videoUrl: "/videos/takki.mp4",
    imageUrl: "/projetos/takki.png",
    featured: true,
  },
  {
    id: "saldo-casa",
    title: "Saldo Casa",
    shortDesc: {
      pt: "App de finanças com dashboards interativos, metas e categorização inteligente.",
      en: "Finance app with interactive dashboards, goals and smart categorization.",
    },
    category: { pt: "Finanças pessoais", en: "Personal finance" },
    problem: {
      pt: "Usuário não tinha visão clara de para onde o dinheiro ia mês a mês.",
      en: "User had no clear picture of where money was going month to month.",
    },
    solution: {
      pt: "App mobile com categorização automática, gráficos interativos e alertas de meta.",
      en: "Mobile app with automatic categorization, interactive charts and goal alerts.",
    },
    result: {
      pt: "Usuário reduziu gastos desnecessários em 35% no primeiro mês de uso.",
      en: "User reduced unnecessary spending by 35% in the first month of use.",
    },
    stack: ["React Native", "API REST", "Charts", "Firebase"],
    videoUrl: "/videos/saldo-casa.mp4",
    featured: false,
  },
  {
    id: "site-mameri",
    title: "Mameri",
    shortDesc: {
      pt: "Site institucional minimalista com identidade visual cuidadosa e CMS leve.",
      en: "Minimalist institutional site with careful brand identity and a lightweight CMS.",
    },
    category: { pt: "Site institucional", en: "Institutional site" },
    problem: {
      pt: "Empresa sem presença digital, dependia 100% de indicações para gerar negócios.",
      en: "Company had no digital presence and relied 100% on referrals for business.",
    },
    solution: {
      pt: "Site institucional com identidade forte, SEO técnico e formulário de captação.",
      en: "Institutional site with strong identity, technical SEO and a lead capture form.",
    },
    result: {
      pt: "Primeiros 3 clientes captados via buscas orgânicas em menos de 60 dias.",
      en: "First 3 clients acquired via organic search in under 60 days.",
    },
    stack: ["Next.js", "Tailwind", "SEO", "CMS"],
    videoUrl: "/videos/site-mameri.mp4",
    featured: false,
  },
  {
    id: "padel",
    title: "Padel App",
    shortDesc: {
      pt: "Aplicativo para reservas de quadras, gestão de partidas e estatísticas.",
      en: "Court booking, match management and player statistics in one app.",
    },
    category: { pt: "Aplicativo esportivo", en: "Sports app" },
    problem: {
      pt: "Arena gerenciava reservas no WhatsApp, gerando conflitos e perda de receita.",
      en: "Arena managed bookings via WhatsApp, causing conflicts and lost revenue.",
    },
    solution: {
      pt: "App com agenda visual, reservas em tempo real, pagamento e ranking de jogadores.",
      en: "App with visual schedule, real-time bookings, payment and player ranking.",
    },
    result: {
      pt: "Eliminação total de conflitos de reserva e aumento de 40% na ocupação das quadras.",
      en: "Total elimination of booking conflicts and 40% increase in court occupancy.",
    },
    stack: ["React Native", "Node.js", "Realtime", "Stripe"],
    videoUrl: "/videos/padel.mp4",
    featured: true,
  },
  {
    id: "will-market",
    title: "Will Market",
    shortDesc: {
      pt: "E-commerce completo com catálogo, checkout, pagamentos e painel administrativo.",
      en: "Full e-commerce with catalog, checkout, payments and an admin dashboard.",
    },
    category: { pt: "E-commerce", en: "E-commerce" },
    problem: {
      pt: "Loja física sem canal de vendas online, limitando seu alcance de mercado.",
      en: "Physical store with no online sales channel, limiting its market reach.",
    },
    solution: {
      pt: "E-commerce com catálogo dinâmico, carrinho, checkout via Stripe e painel de gestão.",
      en: "E-commerce with dynamic catalog, cart, Stripe checkout and management panel.",
    },
    result: {
      pt: "Canal digital representando 30% das vendas totais já no segundo mês.",
      en: "Digital channel representing 30% of total sales by the second month.",
    },
    stack: ["Next.js", "Stripe", "Prisma", "PostgreSQL"],
    videoUrl: "/videos/will-market.mp4",
    imageUrl: "/projetos/empresa-capixaba.png",
    featured: false,
  },
];
