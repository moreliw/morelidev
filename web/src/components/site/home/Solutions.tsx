import type { Copy } from "./types";
import { ArrowUpRight, Braces, Globe2, Layers3, Workflow } from "lucide-react";

export function Solutions({ c }: { c: Copy }) {
  const solutions = [
    {
      icon: Layers3,
      title: c("Produtos digitais e SaaS", "Digital products & SaaS"),
      text: c(
        "Da primeira versão à evolução do produto. Uma base sólida para sua ideia ganhar mercado.",
        "From your first release to product growth. A solid foundation to bring your idea to market.",
      ),
      tag: c("DA IDEIA AO PRODUTO", "FROM IDEA TO PRODUCT"),
    },
    {
      icon: Braces,
      title: c("Sistemas sob medida", "Custom software"),
      text: c(
        "Sua operação tem suas particularidades. Seu software também deveria ter.",
        "Your operation has its own needs. Your software should be built around them.",
      ),
      tag: c("MENOS ATRITO, MAIS EFICIÊNCIA", "LESS FRICTION, MORE EFFICIENCY"),
    },
    {
      icon: Globe2,
      title: c("Websites premium", "Premium websites"),
      text: c(
        "Design que traduz sua marca. Performance e experiência que transformam visitas em oportunidades.",
        "Design that reflects your brand. Performance and experiences that turn visits into opportunities.",
      ),
      tag: c("PRESENÇA QUE GERA VALOR", "A PRESENCE THAT CREATES VALUE"),
    },
    {
      icon: Workflow,
      title: c("Automações e integrações", "Automation & integrations"),
      text: c(
        "Conecte ferramentas, elimine tarefas repetitivas e devolva tempo para sua equipe.",
        "Connect tools, eliminate repetitive tasks and give your team their time back.",
      ),
      tag: c("TUDO TRABALHANDO JUNTO", "EVERYTHING WORKING TOGETHER"),
    },
  ];
  return (
    <section
      id="servicos"
      className="solutions-section section-space"
      aria-labelledby="solutions-title"
    >
      <div className="container-site">
        <div className="section-heading">
          <div>
            <p className="kicker">
              {c(
                "O QUE PODEMOS CONSTRUIR JUNTOS",
                "WHAT WE CAN BUILD TOGETHER",
              )}
            </p>
            <h2 id="solutions-title" className="editorial-title">
              {c(
                "O próximo passo do seu negócio",
                "Your next business milestone",
              )}
              <br />
              {c(
                "começa com a solução certa.",
                "starts with the right solution.",
              )}
            </h2>
          </div>
        </div>
        <div className="solutions-grid">
          {solutions.map((s, i) => (
            <a href="#contato" className="solution-card" key={s.title}>
              <div className="solution-top">
                <s.icon size={27} strokeWidth={1.3} aria-hidden />
                <span>0{i + 1}</span>
              </div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              <div className="solution-bottom">
                <span>{s.tag}</span>
                <ArrowUpRight size={18} aria-hidden />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
