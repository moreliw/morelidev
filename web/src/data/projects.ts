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
  /** Campos do estudo de caso: só aparecem na página quando existem. */
  context?: L;
  problem?: L;
  solution?: L;
  result?: L;
  decisions?: { pt: string[]; en: string[] };
  stack?: string[];
  poster: string;
  videoUrl?: string;
  imageUrl?: string;
  demoUrl?: string;
  /** Imagem editorial de apresentação; a mídia do projeto permanece separada. */
  cover?: string;
}

export const PROJECTS: ProjectData[] = [
  {
    slug: "mameri",
    title: "Mameri Export",
    cover: "/images/premium/mameri-studio.webp",
    category: { pt: "Site institucional", en: "Institutional site" },
    resultTitle: {
      pt: "Site institucional encontrado por quem busca o serviço no Google.",
      en: "Business website found by people searching for the service on Google.",
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
    poster: "/images/projects/mameri.webp",
    videoUrl: "/videos/site-mameri.mp4",
  },
  {
    slug: "empresa-capixaba",
    title: "Empresa Capixaba",
    featured: true,
    category: { pt: "Sistema operacional", en: "Operations system" },
    resultTitle: {
      pt: "Sistema de gestão para acompanhar a operação em um só lugar.",
      en: "Management system to track operations in one place.",
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
    poster: "/images/projects/empresa-capixaba.webp",
    cover: "/images/premium/capixaba-studio.webp",
  },
  {
    slug: "site-empresa-capixaba",
    title: "Site Empresa Capixaba",
    category: { pt: "Site institucional", en: "Business website" },
    resultTitle: {
      pt: "Site institucional para uma empresa de serviços de apoio.",
      en: "Business website for a support services company.",
    },
    shortDesc: {
      pt: "Apresentação dos serviços e canal direto de contato com a equipe comercial.",
      en: "Service presentation with a direct contact channel to the sales team.",
    },
    poster: "/images/projects/site-empresa-capixaba.webp",
  },
  {
    slug: "corujitos",
    title: "Corujitos",
    category: { pt: "Vitrine de fornecedores", en: "Vendor showcase" },
    resultTitle: {
      pt: "Vitrine online dos fornecedores recomendados para eventos.",
      en: "Online showcase of recommended event vendors.",
    },
    shortDesc: {
      pt: "Catálogo de fornecedores por categoria com contato direto pelo WhatsApp.",
      en: "Vendor catalog by category with direct WhatsApp contact.",
    },
    poster: "/images/projects/corujitos.webp",
  },
  {
    slug: "intimite",
    title: "Intimité",
    category: { pt: "E-commerce", en: "E-commerce" },
    resultTitle: {
      pt: "Loja online de moda íntima com identidade própria.",
      en: "Online lingerie store with its own identity.",
    },
    shortDesc: {
      pt: "Loja virtual com catálogo, carrinho e atendimento pelo WhatsApp.",
      en: "Online store with catalog, cart and WhatsApp support.",
    },
    poster: "/images/projects/intimite.webp",
  },
  {
    slug: "odontoapp",
    title: "OdontoApp",
    demoUrl: LINKS.odontoapp,
    category: { pt: "SaaS para clínicas", en: "Clinic SaaS" },
    resultTitle: {
      pt: "Agenda, pacientes e financeiro de clínicas odontológicas em um só sistema.",
      en: "Scheduling, patients and finance for dental clinics in one system.",
    },
    shortDesc: {
      pt: "Sistema de gestão para clínicas odontológicas, desenvolvido e mantido pela MoreliDev.",
      en: "Management system for dental clinics, built and run by MoreliDev.",
    },
    poster: "/images/projects/odontoapp.webp",
  },
  {
    slug: "saldo-casa",
    title: "SaldoCasa",
    cover: "/images/premium/saldocasa.webp",
    demoUrl: LINKS.saldocasa,
    category: { pt: "Finanças pessoais", en: "Personal finance" },
    resultTitle: {
      pt: "Controle de gastos e metas em um único painel.",
      en: "Expenses and goals tracked in a single dashboard.",
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
    poster: "/images/projects/saldo-casa.webp",
    videoUrl: "/videos/saldo-casa.mp4",
  },
];

export const FEATURED_PROJECTS = PROJECTS.filter((p) => p.featured);

export function getProject(slug: string): ProjectData | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
