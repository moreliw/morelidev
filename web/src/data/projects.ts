import { LINKS } from "@/content/site";

type L = { pt: string; en: string };

export interface ProjectData {
  /** slug da URL /projetos/[slug] */
  slug: string;
  title: string;
  featured?: boolean;
  /** projeto corporativo sem demo pública */
  confidential?: boolean;
  category: L;
  /** título curto e editorial descrevendo o resultado — usado nos cases grandes */
  resultTitle: L;
  shortDesc: L;
  context: L;
  problem: L;
  solution: L;
  result: L;
  decisions: { pt: string[]; en: string[] };
  stack: string[];
  poster: string;
  videoUrl?: string;
  imageUrl?: string;
  demoUrl?: string;
  /** Imagem editorial de apresentação; a mídia do projeto permanece separada. */
  cover?: string;
}

export const PROJECTS: ProjectData[] = [
  {
    slug: "empresa-capixaba",
    title: "Empresa Capixaba",
    featured: true,
    category: { pt: "Sistema operacional", en: "Operations system" },
    resultTitle: {
      pt: "Mais controle. Uma operação conectada.",
      en: "More control. A connected operation.",
    },
    shortDesc: {
      pt: "Sistema de gestão empresarial com monitoramento operacional e relatórios.",
      en: "Business management system with operational monitoring and reporting.",
    },
    context: {
      pt: "Gestão empresarial e acompanhamento das rotinas operacionais da Empresa Capixaba.",
      en: "Business management and day-to-day operations at Empresa Capixaba.",
    },
    problem: {
      pt: "Organizar informações da operação e facilitar o acompanhamento das atividades em um único ambiente.",
      en: "Organize operational information and make activities easier to track in one workspace.",
    },
    solution: {
      pt: "Sistema web de gestão com monitoramento operacional e relatórios, desenvolvido com Laravel, Blade e MySQL.",
      en: "A web management system with operational monitoring and reporting, built with Laravel, Blade and MySQL.",
    },
    result: {
      pt: "Informações e relatórios operacionais reunidos em uma plataforma de gestão empresarial.",
      en: "Operational information and reports brought together in a business management platform.",
    },
    decisions: {
      pt: [
        "Laravel para organizar as regras de negócio e os fluxos do sistema.",
        "Blade para as interfaces web da plataforma.",
        "MySQL para persistência dos dados operacionais.",
      ],
      en: [
        "Laravel to organize business logic and system workflows.",
        "Blade for the platform’s web interfaces.",
        "MySQL to persist operational data.",
      ],
    },
    stack: ["Laravel", "Blade", "MySQL"],
    poster: "/projetos/empresa-capixaba.png",
    imageUrl: "/projetos/empresa-capixaba.png",
    cover: "/images/premium/capixaba-studio.webp",
  },
  {
    slug: "cipritex",
    title: "Cipritex",
    featured: true,
    confidential: true,
    category: { pt: "Sistema corporativo", en: "Corporate system" },
    resultTitle: {
      pt: "Uma operação inteira, centralizada em um único sistema.",
      en: "An entire operation, centralized in a single system.",
    },
    shortDesc: {
      pt: "Sistema corporativo com gestão integrada, fluxos personalizados e relatórios em tempo real.",
      en: "Corporate system with integrated management, custom workflows and real-time reports.",
    },
    context: {
      pt: "Indústria com operação distribuída entre setores que precisavam trocar informações diariamente para fechar o mês.",
      en: "Industrial company with operations spread across departments that had to exchange information daily to close the month.",
    },
    problem: {
      pt: "A empresa controlava processos críticos em planilhas e e-mails, sem visibilidade central e com retrabalho constante de conferência manual.",
      en: "The company managed critical processes via spreadsheets and emails, with no central visibility and constant manual double-checking.",
    },
    solution: {
      pt: "Plataforma web com módulos de gestão por setor, dashboards de KPI e workflows automatizados que substituíram as conferências manuais.",
      en: "Web platform with per-department management modules, KPI dashboards and automated workflows replacing manual checks.",
    },
    result: {
      pt: "Fechamento mensal centralizado em um fluxo único, com visibilidade entre setores e sem conferência cruzada de planilhas.",
      en: "Monthly closing centralized into a single flow, with cross-department visibility and no more cross-checking spreadsheets.",
    },
    decisions: {
      pt: [
        "Back-end em .NET com módulos separados por domínio, facilitando manutenção por setor.",
        "Front-end em Angular com formulários tipados e validação compartilhada com a API.",
        "SQL Server com views otimizadas para os relatórios de fechamento.",
        "Ambientes containerizados com Docker para padronizar deploy.",
      ],
      en: [
        ".NET back-end with modules split by domain, keeping each department maintainable.",
        "Angular front-end with typed forms and validation shared with the API.",
        "SQL Server with optimized views for closing reports.",
        "Docker containers to standardize deployment across environments.",
      ],
    },
    stack: [".NET", "Angular", "SQL Server", "Docker"],
    poster: "/projetos/posters/cipritex.webp",
    videoUrl: "/videos/cipritex.mp4",
  },
  {
    slug: "takki",
    title: "Takki.ao",
    featured: true,
    category: { pt: "Marketplace", en: "Marketplace" },
    resultTitle: {
      pt: "De redes sociais a um marketplace estruturado.",
      en: "From social media to a structured marketplace.",
    },
    shortDesc: {
      pt: "Marketplace angolano com catálogo, carrinho, checkout e painel do vendedor integrados.",
      en: "Angolan marketplace with catalog, cart, checkout and an integrated seller panel.",
    },
    context: {
      pt: "Em Angola, muitos vendedores dependiam de redes sociais e mensagens diretas para vender, sem catálogo estruturado nem gestão de pedidos.",
      en: "In Angola, many sellers relied on social media and direct messages to sell, with no structured catalog or order management.",
    },
    problem: {
      pt: "Vendedores sem canal digital estruturado para expor produtos, receber pedidos e acompanhar vendas em um único lugar.",
      en: "Sellers had no structured digital channel to list products, receive orders and track sales in one place.",
    },
    solution: {
      pt: "Marketplace mobile-first com catálogo, carrinho, checkout e painel do vendedor — do cadastro do produto ao acompanhamento do pedido.",
      en: "Mobile-first marketplace with catalog, cart, checkout and seller panel — from product listing to order tracking.",
    },
    result: {
      pt: "Plataforma em produção com vendedores ativos e uma experiência de compra pensada para redes móveis instáveis.",
      en: "Platform in production with active sellers and a shopping experience designed for unstable mobile networks.",
    },
    decisions: {
      pt: [
        "Front-end em React com foco em carregamento rápido em conexões móveis instáveis.",
        "API em Node.js com PostgreSQL para catálogo, pedidos e contas de vendedor.",
        "Imagens otimizadas e interface leve para aparelhos de entrada.",
      ],
      en: [
        "React front-end focused on fast loading over unstable mobile connections.",
        "Node.js API with PostgreSQL for catalog, orders and seller accounts.",
        "Optimized images and a lightweight UI for entry-level devices.",
      ],
    },
    stack: ["React", "Node.js", "PostgreSQL"],
    poster: "/projetos/posters/takki.webp",
    videoUrl: "/videos/takki.mp4",
    imageUrl: "/projetos/takki.png",
  },
  {
    slug: "padel",
    title: "Padel App",
    featured: true,
    category: { pt: "Aplicativo de reservas", en: "Booking app" },
    resultTitle: {
      pt: "Reservas por WhatsApp viraram agenda em tempo real.",
      en: "WhatsApp bookings became a real-time schedule.",
    },
    shortDesc: {
      pt: "Aplicativo de reservas de quadras com agenda em tempo real, pagamento e ranking de jogadores.",
      en: "Court booking app with real-time schedule, payments and player ranking.",
    },
    context: {
      pt: "Arena de padel com quadras disputadas e agenda controlada manualmente pelo WhatsApp da recepção.",
      en: "Padel arena with high court demand and a schedule managed manually through the front desk's WhatsApp.",
    },
    problem: {
      pt: "Reservas por mensagem geravam conflitos de horário, cancelamentos sem controle e perda de receita em horários vagos.",
      en: "Bookings via chat caused schedule conflicts, untracked cancellations and lost revenue on idle time slots.",
    },
    solution: {
      pt: "App com agenda visual, reservas em tempo real, pagamento integrado e ranking para engajar os jogadores da casa.",
      en: "App with visual schedule, real-time bookings, integrated payments and a ranking to engage regular players.",
    },
    result: {
      pt: "Reservas concentradas em um único fluxo, sem conflito de horário e com pagamento confirmado no ato.",
      en: "Bookings concentrated in a single flow, with no schedule conflicts and payment confirmed on the spot.",
    },
    decisions: {
      pt: [
        "React Native para um único código nas duas plataformas.",
        "Agenda com atualização em tempo real para impedir reserva dupla.",
        "Pagamento no ato da reserva via Stripe, reduzindo não comparecimento.",
      ],
      en: [
        "React Native for a single codebase on both platforms.",
        "Real-time schedule updates to prevent double booking.",
        "Pay-at-booking via Stripe, reducing no-shows.",
      ],
    },
    stack: ["React Native", "Node.js", "Stripe"],
    poster: "/projetos/posters/padel.webp",
    videoUrl: "/videos/padel.mp4",
  },
  {
    slug: "will-market",
    title: "Will Market",
    category: { pt: "E-commerce", en: "E-commerce" },
    resultTitle: {
      pt: "Uma loja de bairro ganhou canal de vendas próprio.",
      en: "A neighborhood store got its own sales channel.",
    },
    shortDesc: {
      pt: "E-commerce completo com catálogo, checkout, pagamentos e painel administrativo.",
      en: "Full e-commerce with catalog, checkout, payments and an admin dashboard.",
    },
    context: {
      pt: "Loja física com clientela fiel, mas alcance limitado ao bairro e vendas restritas ao horário comercial.",
      en: "Physical store with loyal customers but reach limited to the neighborhood and sales restricted to business hours.",
    },
    problem: {
      pt: "Sem canal de vendas online, a loja perdia pedidos fora do horário e não alcançava novos clientes.",
      en: "With no online sales channel, the store lost after-hours orders and couldn't reach new customers.",
    },
    solution: {
      pt: "E-commerce com catálogo dinâmico, carrinho, checkout via Stripe e painel de gestão de produtos e pedidos.",
      en: "E-commerce with dynamic catalog, cart, Stripe checkout and a product/order management panel.",
    },
    result: {
      pt: "Vendas fora do horário comercial passaram a ser possíveis, com gestão de pedidos centralizada em um painel único.",
      en: "After-hours sales became possible, with order management centralized in a single dashboard.",
    },
    decisions: {
      pt: [
        "Next.js com renderização no servidor para SEO do catálogo.",
        "Prisma + PostgreSQL para produtos, estoque e pedidos.",
        "Checkout com Stripe, sem armazenar dados de cartão.",
      ],
      en: [
        "Next.js with server rendering for catalog SEO.",
        "Prisma + PostgreSQL for products, inventory and orders.",
        "Stripe checkout, with no card data stored.",
      ],
    },
    stack: ["Next.js", "Stripe", "Prisma", "PostgreSQL"],
    poster: "/projetos/posters/will-market.webp",
    videoUrl: "/videos/will-market.mp4",
  },
  {
    slug: "saldo-casa",
    title: "SaldoCasa",
    cover: "/images/premium/saldocasa.webp",
    demoUrl: LINKS.saldocasa,
    category: { pt: "Finanças pessoais", en: "Personal finance" },
    resultTitle: {
      pt: "Extratos soltos viraram uma visão clara do mês.",
      en: "Loose statements became a clear view of the month.",
    },
    shortDesc: {
      pt: "App de finanças com dashboards interativos, metas e categorização automática de gastos.",
      en: "Finance app with interactive dashboards, goals and automatic expense categorization.",
    },
    context: {
      pt: "Controle financeiro doméstico feito de memória e extratos soltos, sem visão consolidada do mês.",
      en: "Household finances tracked from memory and loose statements, with no consolidated monthly view.",
    },
    problem: {
      pt: "Sem visão clara de para onde o dinheiro ia mês a mês, era impossível planejar ou cortar gastos com critério.",
      en: "With no clear picture of where money went each month, planning or cutting expenses with any criteria was impossible.",
    },
    solution: {
      pt: "App mobile com categorização automática, gráficos interativos e alertas de meta por categoria.",
      en: "Mobile app with automatic categorization, interactive charts and per-category goal alerts.",
    },
    result: {
      pt: "Categorização automática dos gastos e visão consolidada do mês em um único painel.",
      en: "Automatic expense categorization and a consolidated monthly view in a single dashboard.",
    },
    decisions: {
      pt: [
        "React Native com gráficos otimizados para interação por toque.",
        "API REST com regras de categorização no servidor.",
        "Firebase para autenticação e sincronização entre aparelhos.",
      ],
      en: [
        "React Native with charts optimized for touch interaction.",
        "REST API with categorization rules on the server.",
        "Firebase for auth and cross-device sync.",
      ],
    },
    stack: ["React Native", "API REST", "Firebase"],
    poster: "/projetos/posters/saldo-casa.webp",
    videoUrl: "/videos/saldo-casa.mp4",
  },
  {
    slug: "mameri",
    title: "Mameri Export",
    cover: "/images/premium/mameri-studio.webp",
    category: { pt: "Site institucional", en: "Institutional site" },
    resultTitle: {
      pt: "De invisível no Google a encontrado por quem buscava o serviço.",
      en: "From invisible on Google to found by people searching for the service.",
    },
    shortDesc: {
      pt: "Site institucional minimalista com identidade visual cuidadosa, SEO técnico e CMS leve.",
      en: "Minimalist institutional site with careful brand identity, technical SEO and a lightweight CMS.",
    },
    context: {
      pt: "Empresa consolidada no boca a boca, mas invisível para quem pesquisava o serviço no Google.",
      en: "Company well established by word of mouth, but invisible to anyone searching for the service on Google.",
    },
    problem: {
      pt: "Sem presença digital, a empresa dependia quase inteiramente de indicações para gerar negócios.",
      en: "With almost no digital presence, the company relied nearly entirely on referrals for new business.",
    },
    solution: {
      pt: "Site institucional com identidade forte, SEO técnico e formulário de captação conectado ao fluxo comercial.",
      en: "Institutional site with strong identity, technical SEO and a lead form connected to the sales flow.",
    },
    result: {
      pt: "Primeiros clientes captados via busca orgânica, com página indexada e posicionada para o serviço pesquisado.",
      en: "First clients acquired via organic search, with the page indexed and ranking for the service searched.",
    },
    decisions: {
      pt: [
        "Next.js com páginas estáticas para carregamento imediato.",
        "SEO técnico: dados estruturados, sitemap e metadados por página.",
        "CMS leve para a equipe atualizar conteúdo sem depender de desenvolvedor.",
      ],
      en: [
        "Next.js with static pages for instant loading.",
        "Technical SEO: structured data, sitemap and per-page metadata.",
        "Lightweight CMS so the team updates content without a developer.",
      ],
    },
    stack: ["Next.js", "Tailwind CSS", "SEO"],
    poster: "/projetos/posters/site-mameri.webp",
    videoUrl: "/videos/site-mameri.mp4",
  },
];

export const FEATURED_PROJECTS = PROJECTS.filter((p) => p.featured);

export function getProject(slug: string): ProjectData | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
