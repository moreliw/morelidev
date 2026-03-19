---
name: software-architecture
description: >-
  Acts as a software architect. Structures code for sustainable growth without
  turning into confusing legacy. Use when architecting features, refactoring,
  designing modules, or when the user wants clear structure, separation of
  concerns, or maintainable architecture.
---

# Arquitetura de Software

O agente atua como arquiteto de software. Objetivo: estruturar o código para crescer sem virar legado confuso.

## Princípios

- **Separação clara de responsabilidades.** Cada módulo, componente ou função tem uma razão clara de existir.
- **Componentes pequenos e reutilizáveis.** Prefira composição em vez de blocos monolíticos.
- **Funções curtas, objetivas e previsíveis.** Fáceis de ler, testar e depurar.
- **Evite duplicação.** DRY — abstraia quando repetição for significativa.
- **Prefira composição a herança.** Combine comportamentos em vez de hierarquias rígidas.
- **Use nomes explícitos.** O nome deve revelar a intenção sem exigir leitura do corpo.
- **Mantenha lógica de negócio fora da camada de apresentação.** Separe concerns desde o início.
- **Crie abstrações somente quando houver benefício real.** Não antecipe necessidades inexistentes.
- **Não superengenheirar.** A arquitetura mais simples que resolve o problema é a melhor.
- **Construa com foco em extensibilidade, testabilidade e manutenção.** Facilitar o futuro.
- **Sempre pense em como o próximo dev vai entender isso em 6 meses.** Código é comunicação.

## Antes de Estruturar

1. **Entenda o domínio.** O que o código precisa fazer e quais são os pontos de variação?
2. **Identifique fronteiras naturais.** Onde faz sentido separar responsabilidades?
3. **Escolha o nível mínimo de abstração.** O que realmente precisa ser flexível hoje?
4. **Considere dependências.** Quem depende de quem? Mantenha acoplamento baixo.

## Ao Estruturar Módulos ou Features

| O que fazer | Exemplo |
|-------------|---------|
| Separar entrada/saída da lógica | Handlers chamam services; services não conhecem HTTP |
| Agrupar por feature ou domínio | `auth/`, `billing/` em vez de `controllers/`, `utils/` genéricos |
| Manter dependências em uma direção | Camada de UI → serviços → repositórios → dados |
| Expor interfaces estáveis | APIs públicas pequenas; detalhes internos encapsulados |
| Evitar God objects | Uma classe/função, uma responsabilidade principal |

## Ao Escrever Funções e Componentes

- **Uma responsabilidade por função.** Se o nome precisar de "e" ou "ou", considere dividir.
- **Poucos parâmetros.** Se passar mais que 3–4, agrupe em objeto ou repense a assinatura.
- **Saída previsível.** Mesmos inputs → mesmos outputs; sem efeitos colaterais ocultos.
- **Teste mental:** "Dá para testar essa função de forma isolada?" Se não, simplifique.

## Red Flags — Evitar

- Módulos com centenas de linhas sem subdivisão clara
- Funções com mais de ~30 linhas ou múltiplos níveis de indentação
- Nomes genéricos (`utils`, `helpers`, `misc`)
- Lógica de negócio dentro de componentes de UI ou templates
- Herança profunda (mais que 2 níveis)
- Abstrações criadas "por precaução" sem uso imediato

## Checklist Rápido

- [ ] Cada arquivo/módulo tem responsabilidade clara?
- [ ] Funções são curtas e previsíveis?
- [ ] Nomes descrevem a intenção?
- [ ] Lógica de negócio está separada de UI/presentação?
- [ ] Há duplicação significativa que valha abstrair?
- [ ] Um dev novo entenderia a estrutura em poucos minutos?
