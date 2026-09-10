export type Language = "pt" | "en";

/** Links e contatos usados em todo o site — um único lugar para atualizar. */
export const LINKS = {
  email: "williammorelli07@gmail.com",
  whatsapp: "https://wa.me/5527999552024",
  linkedin: "https://www.linkedin.com/in/william-moreli",
  github: "https://github.com/moreliw",
  site: "https://morelidev.com",
  saldocasa: "https://saldocasa.morelidev.com",
  odontoapp: "https://odontoapp.morelidev.com",
} as const;

/** Linha de posicionamento — factual, sem números inventados. */
export const SIGNAL = {
  pt: "5+ anos de atuação · Sistemas em produção em diferentes setores",
  en: "5+ years in operation · Systems in production across different sectors",
} as const;

export const STACK = [
  ".NET",
  "Angular",
  "React",
  "Next.js",
  "Laravel",
  "Node.js",
  "PostgreSQL",
  "SQL Server",
  "Docker",
  "Cloud",
] as const;

type Localized = { pt: string; en: string };

export const COPY = {
  nav: {
    projects: { pt: "Projetos", en: "Projects" },
    services: { pt: "Serviços", en: "Services" },
    process: { pt: "Processo", en: "Process" },
    company: { pt: "Empresa", en: "Company" },
    contact: { pt: "Contato", en: "Contact" },
    cta: { pt: "Falar sobre um projeto", en: "Discuss a project" },
    menuOpen: { pt: "Abrir menu", en: "Open menu" },
    menuClose: { pt: "Fechar menu", en: "Close menu" },
    skip: { pt: "Pular para o conteúdo", en: "Skip to content" },
  },
  hero: {
    titleLine1: { pt: "Software construído", en: "Software built" },
    titleLine2: { pt: "para negócios reais.", en: "for real businesses." },
    sub: {
      pt: "Sistemas, produtos digitais e experiências web projetados para simplificar operações e fazer empresas evoluírem.",
      en: "Systems, digital products and web experiences designed to simplify operations and help companies evolve.",
    },
    ctaPrimary: { pt: "Falar sobre um projeto", en: "Discuss a project" },
    ctaSecondary: { pt: "Ver trabalhos", en: "View work" },
  },
  manifesto: {
    text: {
      pt: "Cada sistema que entregamos nasce de um problema real de negócio — não de uma lista de tecnologias da moda.",
      en: "Every system we ship starts from a real business problem — not a list of trendy technologies.",
    },
  },
  cases: {
    eyebrow: { pt: "Trabalhos selecionados", en: "Selected work" },
    title: {
      pt: "Sistemas em produção, não protótipos.",
      en: "Systems in production, not prototypes.",
    },
    viewAll: { pt: "Ver todos os projetos", en: "View all projects" },
    viewCase: { pt: "Ver projeto", en: "View project" },
    viewDetails: { pt: "Ver detalhes", en: "View details" },
  },
  projects: {
    context: { pt: "Contexto", en: "Context" },
    problem: { pt: "Problema", en: "Problem" },
    solution: { pt: "Solução", en: "Solution" },
    result: { pt: "Resultado", en: "Result" },
    stack: { pt: "Stack", en: "Stack" },
    decisions: { pt: "Decisões técnicas", en: "Technical decisions" },
    companyRole: { pt: "Atuação da MoreliDev", en: "MoreliDev's role" },
    companyRoleValue: {
      pt: "Estratégia, arquitetura e desenvolvimento full-stack.",
      en: "Strategy, architecture and full-stack development.",
    },
    confidential: {
      pt: "Projeto corporativo apresentado de forma anonimizada por confidencialidade.",
      en: "Corporate project presented in anonymized form for confidentiality.",
    },
    liveDemo: { pt: "Ver ao vivo", en: "View live" },
    breadcrumbHome: { pt: "Início", en: "Home" },
    breadcrumbProjects: { pt: "Projetos", en: "Projects" },
    allTitle: { pt: "Projetos", en: "Projects" },
    allSub: {
      pt: "Sistemas corporativos, marketplaces, aplicativos e sites desenvolvidos pela MoreliDev para empresas de diferentes setores.",
      en: "Corporate systems, marketplaces, apps and websites built by MoreliDev for companies across different sectors.",
    },
    backToProjects: { pt: "Voltar para projetos", en: "Back to projects" },
  },
  services: {
    eyebrow: { pt: "O que construímos", en: "What we build" },
    title: {
      pt: "Quatro frentes, um mesmo compromisso: menos ruído entre a ideia e a produção.",
      en: "Four areas, one commitment: less noise between the idea and production.",
    },
    items: [
      {
        title: { pt: "Sistemas sob medida", en: "Custom-built systems" },
        desc: {
          pt: "Sistemas internos, plataformas operacionais, portais e ferramentas desenvolvidos de acordo com os processos específicos da empresa.",
          en: "Internal systems, operational platforms, portals and tools built around the company's specific processes.",
        },
      },
      {
        title: { pt: "Produtos digitais & SaaS", en: "Digital products & SaaS" },
        desc: {
          pt: "Planejamento, UX, arquitetura e desenvolvimento de produtos web preparados para evoluir.",
          en: "Planning, UX, architecture and development of web products built to evolve.",
        },
      },
      {
        title: { pt: "Sites & experiências web", en: "Websites & web experiences" },
        desc: {
          pt: "Sites institucionais rápidos, modernos e construídos para posicionar empresas de forma profissional.",
          en: "Fast, modern institutional websites built to position companies professionally.",
        },
      },
      {
        title: { pt: "Integrações & automações", en: "Integrations & automation" },
        desc: {
          pt: "APIs, pagamentos, ERPs, workflows e automações que conectam operações e reduzem trabalho manual.",
          en: "APIs, payments, ERPs, workflows and automation that connect operations and cut manual work.",
        },
      },
    ],
  },
  process: {
    eyebrow: { pt: "Como trabalhamos", en: "How we work" },
    title: { pt: "Da ideia à produção.", en: "From idea to production." },
    steps: [
      {
        title: { pt: "Descoberta", en: "Discovery" },
        desc: {
          pt: "Entendemos o contexto, os processos e os objetivos do negócio antes de propor qualquer solução.",
          en: "We map the business context, processes and goals before proposing any solution.",
        },
      },
      {
        title: { pt: "Estratégia & arquitetura", en: "Strategy & architecture" },
        desc: {
          pt: "Definimos escopo, arquitetura técnica e prioridades com base no que gera valor primeiro.",
          en: "We define scope, technical architecture and priorities based on what creates value first.",
        },
      },
      {
        title: { pt: "Design & protótipo", en: "Design & prototype" },
        desc: {
          pt: "Desenhamos as telas principais e validamos o fluxo antes de escrever código de produção.",
          en: "We design the core screens and validate the flow before writing production code.",
        },
      },
      {
        title: { pt: "Desenvolvimento", en: "Development" },
        desc: {
          pt: "Entregas incrementais, acompanhadas e testadas — sem meses de silêncio até o resultado final.",
          en: "Incremental deliveries, followed and tested — no months of silence before the final result.",
        },
      },
      {
        title: { pt: "Entrega & evolução", en: "Delivery & evolution" },
        desc: {
          pt: "Publicação com monitoramento e acompanhamento contínuo da evolução do sistema em produção.",
          en: "Release with monitoring and ongoing support as the system evolves in production.",
        },
      },
    ],
  },
  principles: {
    title: { pt: "Menos camadas.\nMais produto.", en: "Fewer layers.\nMore product." },
    lead: {
      pt: "Negócio, design e engenharia trabalhando juntos desde o início. Menos ruído entre a necessidade da empresa e aquilo que realmente chega à produção.",
      en: "Business, design and engineering working together from day one. Less noise between what a company needs and what actually reaches production.",
    },
    items: {
      pt: [
        "Produto antes de tecnologia.",
        "Código preparado para evoluir.",
        "Interface simples para problemas complexos.",
        "Comunicação direta durante todo o projeto.",
      ],
      en: [
        "Product before technology.",
        "Code built to evolve.",
        "Simple interfaces for complex problems.",
        "Direct communication throughout the project.",
      ],
    },
  },
  company: {
    eyebrow: { pt: "Empresa", en: "Company" },
    title: { pt: "MoreliDev", en: "MoreliDev" },
    paragraphs: {
      pt: [
        "A MoreliDev é um estúdio de software especializado na criação de sistemas, produtos digitais e experiências web.",
        "Os projetos unem estratégia, UX e engenharia para transformar processos empresariais em software simples de utilizar, confiável e preparado para evoluir. Atuação remota em projetos locais e internacionais.",
      ],
      en: [
        "MoreliDev is a software studio specialized in building systems, digital products and web experiences.",
        "Projects bring together strategy, UX and engineering to turn business processes into software that's simple to use, reliable and built to evolve. Working remotely on local and international projects.",
      ],
    },
    stackLabel: { pt: "Tecnologia adequada ao produto.", en: "Technology suited to the product." },
    founderLabel: { pt: "Fundação", en: "Founded by" },
    founderText: {
      pt: "Fundada por William Moreli, engenheiro de software full-stack responsável pela arquitetura e execução técnica dos projetos.",
      en: "Founded by William Moreli, a full-stack software engineer responsible for the architecture and technical execution of projects.",
    },
  },
  contact: {
    eyebrow: { pt: "Contato", en: "Contact" },
    title: {
      pt: "Tem algo que sua empresa\nprecisa construir?",
      en: "Is there something your company\nneeds to build?",
    },
    sub: {
      pt: "Fale com a MoreliDev. Conte o problema, o cenário atual e o resultado que sua empresa precisa alcançar.",
      en: "Talk to MoreliDev. Tell us the problem, the current scenario and the result your company needs.",
    },
    ctaPrimary: { pt: "Iniciar um projeto", en: "Start a project" },
    whatsapp: { pt: "WhatsApp", en: "WhatsApp" },
    email: { pt: "E-mail", en: "Email" },
    form: {
      name: { pt: "Nome", en: "Name" },
      email: { pt: "E-mail", en: "Email" },
      company: { pt: "Empresa", en: "Company" },
      phone: { pt: "Telefone (opcional)", en: "Phone (optional)" },
      message: { pt: "Descreva seu projeto ou desafio", en: "Describe your project or challenge" },
      send: { pt: "Enviar mensagem", en: "Send message" },
      sending: { pt: "Enviando…", en: "Sending…" },
      successTitle: { pt: "Mensagem enviada.", en: "Message sent." },
      successMsg: {
        pt: "Obrigado pelo contato. Você recebe uma resposta em até 24 horas úteis.",
        en: "Thanks for reaching out. You'll get a reply within 24 business hours.",
      },
      again: { pt: "Enviar outra mensagem", en: "Send another message" },
      errRequired: { pt: "Preencha este campo.", en: "This field is required." },
      errEmail: { pt: "Informe um e-mail válido.", en: "Enter a valid email." },
      errServer: {
        pt: "Não foi possível enviar. Tente novamente ou use o WhatsApp.",
        en: "Could not send. Try again or use WhatsApp.",
      },
      privacy: {
        pt: "Suas informações são usadas apenas para responder ao seu contato.",
        en: "Your information is used only to reply to your message.",
      },
    },
  },
  footer: {
    tagline: { pt: "Software & Produtos Digitais", en: "Software & Digital Products" },
    location: { pt: "Atuação remota", en: "Remote studio" },
    coverage: { pt: "Projetos locais e internacionais", en: "Local and international projects" },
    rights: { pt: "Todos os direitos reservados.", en: "All rights reserved." },
    backToTop: { pt: "Voltar ao topo", en: "Back to top" },
  },
  notFound: {
    title: { pt: "Página não encontrada", en: "Page not found" },
    desc: {
      pt: "O endereço que você acessou não existe ou foi movido.",
      en: "The address you visited doesn't exist or has moved.",
    },
    back: { pt: "Ir para o início", en: "Go to homepage" },
  },
} as const;

/** Resolve um par {pt, en} para o idioma ativo. */
export function t(l: Localized, lang: Language): string {
  return l[lang];
}
