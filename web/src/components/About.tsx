export function About() {
  return (
    <div className="grid gap-6 sm:grid-cols-3">
      <div className="sm:col-span-2">
        <p className="text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
          Sou um desenvolvedor sênior com mentalidade de engenharia. Projeto e entrego
          soluções digitais com foco em performance, acessibilidade e experiência do usuário.
          Trabalho com arquiteturas escaláveis, CI/CD, testes e observabilidade para garantir
          qualidade de ponta a ponta.
        </p>
      </div>
      <div>
        <ul className="space-y-2 text-sm">
          <li>• Arquitetura Frontend/Backend</li>
          <li>• Design Systems e UI escalável</li>
          <li>• Performance, SEO e A11y</li>
          <li>• Entrega contínua e Cloud</li>
        </ul>
      </div>
    </div>
  );
}

