import type { Copy } from "./types";
import { Plus } from "lucide-react";

export function FAQ({ c }: { c: Copy }) {
  const questions = [
    [
      c(
        "Minha ideia ainda está no começo. Podemos conversar?",
        "My idea is still early. Can we talk?",
      ),
      c(
        "Sim. A primeira conversa serve para entender seu cenário, esclarecer possibilidades e identificar o próximo passo. Você não precisa chegar com um escopo técnico pronto.",
        "Yes. The first conversation helps us understand your situation, explore possibilities and identify the next step. You do not need a technical specification to get started.",
      ),
    ],
    [
      c(
        "Quanto custa e quanto tempo leva um projeto?",
        "How much does a project cost and how long does it take?",
      ),
      c(
        "Depende do escopo, das integrações e da complexidade. Depois de entender suas necessidades, preparamos uma proposta com entregas, investimento e cronograma definidos.",
        "That depends on scope, integrations and complexity. After understanding your needs, we prepare a proposal with clear deliverables, investment and timeline.",
      ),
    ],
    [
      c(
        "Vocês dão suporte após o lançamento?",
        "Do you provide support after launch?",
      ),
      c(
        "Sim. O suporte e a evolução são combinados na proposta, com responsabilidades claras. Podemos acompanhar a operação, corrigir problemas e desenvolver novas funcionalidades.",
        "Yes. Support and continued development are agreed in the proposal, with clear responsibilities. We can monitor operations, resolve issues and build new features.",
      ),
    ],
    [
      c(
        "Atendem empresas de outras cidades e países?",
        "Do you work with companies in other cities and countries?",
      ),
      c(
        "Sim. Trabalhamos de forma remota, com comunicação próxima e entregas acompanhadas. Já atuamos em projetos no Brasil e em Angola.",
        "Yes. We work remotely with close communication and regular delivery reviews. We have worked on projects in Brazil and Angola.",
      ),
    ],
  ];
  return (
    <section className="faq-section section-space" aria-labelledby="faq-title">
      <div className="container-site faq-grid">
        <div>
          <p className="kicker">
            {c("ANTES DA PRIMEIRA CONVERSA", "BEFORE OUR FIRST CONVERSATION")}
          </p>
          <h2 id="faq-title" className="editorial-title">
            {c("Boas perguntas.", "Good questions.")}
            <br />
            {c("Respostas claras.", "Clear answers.")}
          </h2>
        </div>
        <div>
          {questions.map(([q, a]) => (
            <details key={q} className="faq-item">
              <summary>
                {q}
                <Plus size={19} aria-hidden />
              </summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
