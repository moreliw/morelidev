export type Language = "pt" | "en";

/** Links e contatos usados em todo o site — um único lugar para atualizar. */
export const LINKS = {
  email: "contato@morelidev.com",
  whatsapp: "https://wa.me/5527999999999",
  linkedin: "https://www.linkedin.com/in/william-moreli",
  github: "https://github.com/moreliw",
  site: "https://morelidev.com",
} as const;

/** Números reais — renderizados direto no HTML, nunca animados a partir de zero. */
export const PROOF = [
  { value: "5+", pt: "Anos de experiência", en: "Years of experience" },
  { value: "10+", pt: "Projetos entregues", en: "Projects delivered" },
  { value: "2", pt: "Países atendidos", en: "Countries served" },
] as const;

export const STACK_PRIMARY = [
  "Angular",
  "React / Next.js",
  "TypeScript",
  "C# / .NET",
  "PHP / Laravel",
  "Node.js",
  "PostgreSQL / SQL Server",
  "Docker / NGINX / CI-CD",
] as const;

export const STACK_SECONDARY = [
  "React Native",
  "Prisma",
  "Redis",
  "Stripe",
  "Tailwind CSS",
  "Firebase",
] as const;

type Localized = { pt: string; en: string };

export const COPY = {
  nav: {
    projects: { pt: "Projetos", en: "Projects" },
    capabilities: { pt: "Especialidades", en: "Expertise" },
    about: { pt: "Sobre", en: "About" },
    contact: { pt: "Contato", en: "Contact" },
    cta: { pt: "Falar sobre um projeto", en: "Discuss a project" },
    menuOpen: { pt: "Abrir menu", en: "Open menu" },
    menuClose: { pt: "Fechar menu", en: "Close menu" },
    skip: { pt: "Pular para o conteúdo", en: "Skip to content" },
  },
  hero: {
    title: {
      pt: "Engenharia de software para transformar operações complexas em produtos rápidos, escaláveis e fáceis de usar.",
      en: "Software engineering that turns complex operations into fast, scalable, easy-to-use products.",
    },
    sub: {
      pt: "Desenvolvo sistemas web, plataformas SaaS, dashboards e integrações para empresas que precisam substituir processos manuais por produtos digitais confiáveis.",
      en: "I build web systems, SaaS platforms, dashboards and integrations for companies that need to replace manual processes with reliable digital products.",
    },
    ctaPrimary: { pt: "Ver projetos", en: "View projects" },
    ctaSecondary: { pt: "Falar sobre um projeto", en: "Discuss a project" },
    proofLine: {
      pt: "5+ anos · Brasil e Angola · Front-end, back-end e arquitetura",
      en: "5+ years · Brazil and Angola · Front-end, back-end and architecture",
    },
  },
  projects: {
    eyebrow: { pt: "Projetos em destaque", en: "Featured projects" },
    title: {
      pt: "Sistemas reais, em produção, resolvendo problemas de negócio.",
      en: "Real systems in production, solving business problems.",
    },
    viewAll: { pt: "Ver todos os projetos", en: "View all projects" },
    viewCase: { pt: "Ver detalhes", en: "View details" },
    problem: { pt: "Problema", en: "Problem" },
    solution: { pt: "Solução", en: "Solution" },
    result: { pt: "Resultado", en: "Result" },
    context: { pt: "Contexto", en: "Context" },
    stack: { pt: "Stack", en: "Stack" },
    role: { pt: "Meu papel", en: "My role" },
    roleValue: { pt: "Desenvolvedor Full Stack", en: "Full Stack Developer" },
    confidential: {
      pt: "Projeto corporativo apresentado de forma anonimizada por confidencialidade.",
      en: "Corporate project presented in anonymized form for confidentiality.",
    },
    breadcrumbHome: { pt: "Início", en: "Home" },
    breadcrumbProjects: { pt: "Projetos", en: "Projects" },
    allTitle: { pt: "Todos os projetos", en: "All projects" },
    allSub: {
      pt: "Sistemas corporativos, marketplaces, aplicativos e sites que projetei e desenvolvi para empresas no Brasil e em Angola.",
      en: "Corporate systems, marketplaces, apps and websites I designed and built for companies in Brazil and Angola.",
    },
    backToProjects: { pt: "Voltar para projetos", en: "Back to projects" },
  },
  capabilities: {
    eyebrow: { pt: "Problemas que resolvo", en: "Problems I solve" },
    title: {
      pt: "Três frentes de trabalho, um mesmo objetivo: operação mais simples.",
      en: "Three areas of work, one goal: simpler operations.",
    },
    groups: [
      {
        title: { pt: "Produtos e sistemas web", en: "Web products and systems" },
        desc: {
          pt: "Sistemas internos, portais, dashboards e plataformas SaaS para operações que ainda dependem de planilhas, e-mails e controles manuais.",
          en: "Internal systems, portals, dashboards and SaaS platforms for operations that still run on spreadsheets, emails and manual controls.",
        },
        items: {
          pt: ["Sistemas internos e portais", "Dashboards e relatórios", "Plataformas SaaS"],
          en: ["Internal systems and portals", "Dashboards and reporting", "SaaS platforms"],
        },
      },
      {
        title: { pt: "Modernização e performance", en: "Modernization and performance" },
        desc: {
          pt: "Sistemas lentos ou difíceis de manter viram aplicações rápidas e seguras — sem parar a operação durante a transição.",
          en: "Slow or hard-to-maintain systems become fast, secure applications — without stopping the operation during the transition.",
        },
        items: {
          pt: ["Refatoração e migração de stack", "Core Web Vitals e otimização", "Arquitetura preparada para crescer"],
          en: ["Refactoring and stack migration", "Core Web Vitals and optimization", "Architecture built to grow"],
        },
      },
      {
        title: { pt: "Integrações e automação", en: "Integrations and automation" },
        desc: {
          pt: "Sistemas que não conversam geram retrabalho e erro. Conecto APIs, ERPs, pagamentos e workflows para eliminar tarefas manuais.",
          en: "Disconnected systems create rework and errors. I connect APIs, ERPs, payments and workflows to eliminate manual tasks.",
        },
        items: {
          pt: ["APIs, ERPs e pagamentos", "Automação de workflows", "IA aplicada a processos reais"],
          en: ["APIs, ERPs and payments", "Workflow automation", "AI applied to real processes"],
        },
      },
    ],
  },
  process: {
    eyebrow: { pt: "Como trabalho", en: "How I work" },
    title: {
      pt: "Um processo direto, do diagnóstico à evolução contínua.",
      en: "A direct process, from diagnosis to continuous evolution.",
    },
    steps: [
      {
        title: { pt: "Diagnóstico", en: "Diagnosis" },
        desc: {
          pt: "Entendo o contexto, os processos e os objetivos para definir o que realmente gera valor. Você recebe um escopo claro e uma proposta objetiva.",
          en: "I map the context, processes and goals to define what actually creates value. You get a clear scope and an objective proposal.",
        },
      },
      {
        title: { pt: "Arquitetura e protótipo", en: "Architecture and prototype" },
        desc: {
          pt: "Desenho a solução, defino a arquitetura e valido as telas principais antes de escrever código de produção.",
          en: "I design the solution, define the architecture and validate the main screens before writing production code.",
        },
      },
      {
        title: { pt: "Desenvolvimento e validação", en: "Development and validation" },
        desc: {
          pt: "Entregas incrementais que você acompanha e testa. Sem sumir por meses para aparecer com um sistema pronto e errado.",
          en: "Incremental deliveries you follow and test. No disappearing for months to return with a finished — and wrong — system.",
        },
      },
      {
        title: { pt: "Deploy e evolução", en: "Deploy and evolution" },
        desc: {
          pt: "Publicação com segurança, monitoramento e acompanhamento da evolução do sistema em produção.",
          en: "Safe releases, monitoring and ongoing support as the system evolves in production.",
        },
      },
    ],
  },
  about: {
    eyebrow: { pt: "Sobre", en: "About" },
    title: { pt: "William Moreli", en: "William Moreli" },
    paragraphs: {
      pt: [
        "Sou engenheiro de software full-stack com mais de 5 anos de experiência criando sistemas web, plataformas SaaS e integrações para empresas no Brasil e em Angola.",
        "Trabalho do banco de dados à interface: arquitetura, back-end, front-end e infraestrutura. Gosto de transformar processos complexos em produtos simples — centralizando o que antes dependia de planilhas, e-mails e conferências manuais.",
      ],
      en: [
        "I'm a full-stack software engineer with over 5 years of experience building web systems, SaaS platforms and integrations for companies in Brazil and Angola.",
        "I work from the database to the interface: architecture, back-end, front-end and infrastructure. I like turning complex processes into simple products — centralizing what used to depend on spreadsheets, emails and manual checks.",
      ],
    },
    stackTitle: { pt: "Stack principal", en: "Core stack" },
    stackMoreTitle: { pt: "Também trabalho com", en: "Also working with" },
    photoAlt: {
      pt: "Foto de William Moreli, engenheiro de software",
      en: "Photo of William Moreli, software engineer",
    },
  },
  contact: {
    title: {
      pt: "Tem um processo que precisa funcionar melhor?",
      en: "Is there a process in your company that should work better?",
    },
    sub: {
      pt: "Conte o problema, o cenário atual e o resultado que sua empresa precisa alcançar. Eu retorno com uma avaliação inicial e os próximos passos.",
      en: "Describe the problem, the current scenario and the result your company needs. I'll reply with an initial assessment and next steps.",
    },
    whatsapp: { pt: "Falar pelo WhatsApp", en: "Chat on WhatsApp" },
    email: { pt: "Enviar e-mail", en: "Send an email" },
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
    location: { pt: "Vitória, Espírito Santo — Brasil", en: "Vitória, Espírito Santo — Brazil" },
    coverage: { pt: "Atendimento Brasil e Angola", en: "Serving Brazil and Angola" },
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
