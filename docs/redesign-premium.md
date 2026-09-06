# Redesign MoreliDev

Implementado em 6 de setembro de 2026.

## Resultado

A apresentação institucional foi reconstruída a partir da direção visual enviada: fundo claro, tipografia editorial, blocos escuros, mockups de produtos e chamadas para contato. A home agora apresenta abertura, credenciais, SaldoCasa, OdontoApp, projetos selecionados, soluções, processo, empresa, perguntas frequentes e formulário. A listagem de projetos ganhou filtros; as páginas de case receberam a mesma identidade. O painel administrativo e as mídias reais dos projetos foram preservados.

O conteúdo principal continua disponível em português e inglês. Os números comerciais das artes de referência não foram incorporados como provas de resultado: a página utiliza a experiência e atuação geográfica já documentadas no repositório. Os mockups são representações ilustrativas; os vídeos e capturas existentes continuam nas páginas dos projetos.

## Manutenção

- Composição da home: `web/src/components/site/HomeExperience.tsx`.
- Seções independentes: `web/src/components/site/home/`.
- Identidade, layout e breakpoints: `web/src/app/premium.css`.
- Estilos compartilhados, incluindo administração: `web/src/app/globals.css`.
- Contatos e URLs dos produtos: `web/src/content/site.ts`.
- Dados, mídia e capas dos cases: `web/src/data/projects.ts`.
- Formulário: `web/src/components/site/ContactForm.tsx`.
- Validação no servidor: `web/src/app/api/contact/route.ts`.

As páginas públicas são pré-renderizadas. A imagem principal usa preload; as demais usam carregamento sob demanda, tamanhos responsivos e formatos WebP. Não há vídeo automático na home. GSAP, @gsap/react e animejs foram removidos, assim como os componentes substituídos. As transições utilizam CSS e a animação opcional dos cases usa APIs nativas; o conteúdo nunca começa oculto e a preferência por movimento reduzido é respeitada.

## Validação

- ESLint e TypeScript.
- Build de produção e renderização estática da home, listagem e sete cases.
- Navegador: larguras de 320, 375, 390, 768, 1024, 1440 e 1920 pixels, sem rolagem horizontal.
- Menu móvel: abrir, fechar, Escape, retorno do foco e seleção de âncora.
- Português/inglês, incluindo filtros de projetos e atributo `lang`.
- Filtros de sistemas e aplicativos, contador de resultados e página Empresa Capixaba.
- Perguntas frequentes com elementos nativos `details` e `summary`.
- Formulário: campos obrigatórios, foco no primeiro erro, envio local, confirmação e novo envio.
- Gravação do envio verificada no SQLite local; somente o registro de teste foi removido ao final.
- API: oito entradas inválidas rejeitadas; honeypot respondido sem gravar mensagem.
- Links SaldoCasa e OdontoApp: HTTP 200 em 06/09/2026.

Essas verificações cobrem o navegador Chromium disponível e os tamanhos registrados. Não equivalem a um teste físico de todos os aparelhos ou a uma auditoria completa em Safari e Firefox. Não foi atribuído um resultado Lighthouse, nem prometido aumento percentual de conversão. A conversão deve ser acompanhada após a publicação, usando o analytics existente e dados reais de contato.

## Assets finais

Todos os assets ficam no repositório, em `web/public/images/premium/`:

| Arquivo | Uso | Tamanho |
| --- | --- | --- |
| `software-hero.webp` | Abertura | 60.764 bytes |
| `saldocasa.webp` | Produto SaldoCasa | 40.620 bytes |
| `odontoapp.webp` | Produto OdontoApp | 54.040 bytes |
| `mameri-studio.webp` | Apresentação Mameri Export | 128.624 bytes |
| `capixaba-studio.webp` | Apresentação Empresa Capixaba | 74.252 bytes |

Total dos arquivos: 358.300 bytes, antes das variantes servidas pelo Next/Image.

Modo de criação: ferramenta integrada `image_gen`, sem API/CLI externa. Os originais foram preservados no diretório de imagens geradas do Codex. As versões WebP receberam apenas redução de resolução e compressão. A composição e os recortes responsivos são definidos no CSS.

### Prompts finais

**Software / hero**

> Use case: product-mockup. Asset: premium Brazilian software studio MoreliDev website hero. Generate a photorealistic studio product photograph of a sophisticated dark graphite aluminum laptop, open, three-quarter front view, screen facing the viewer and angled slightly to the left, entire laptop visible with ample 8% margins, isolated on a solid warm off-white background #f6f5f1 with a very soft realistic contact shadow. Landscape 3:2. The laptop screen displays a beautifully crisp B2B SaaS business dashboard with dark charcoal narrow left sidebar branded MORELI/DEV, light gray main workspace, Portuguese title 'Visão geral', three small summary cards and a large elegant thin blue upward line chart below, subtle blue and green accents. Editorial premium minimal luxurious high-end tech photography matching sophisticated white/black websites with serif headings. Laptop occupies 90% of image, no room, no desk edges, no props, no people. Only small dashboard interface labels on the laptop screen; no marketing headlines or typography anywhere outside laptop. The background must be uninterrupted uniform warm off-white, no vignette or gradients outside the natural shadow.

**SaldoCasa**

> Use case product-mockup. Create a premium studio photograph for a website product card, landscape 3:2. A black smartphone in the foreground on the left and a larger black tablet behind on the right, both complete devices visible with small margins, on uniform extremely pale lavender #efedfa background and soft realistic contact shadows. Devices show a beautiful crisp white personal finance application with purple accents named 'SaldoCasa': phone has 'Olá, Ana', a balance card, small lavender bar chart and saving goals; tablet shows a financial dashboard with a line chart, small purple donut chart and transaction list. High end Apple style product photography, realistic hardware and screen glass, no hands, no props, no extra advertising text or headlines outside screens. Devices fill the frame. Interface is illustrative. Soft daylight. Elegant sophisticated minimalist.

**OdontoApp**

> Use case product-mockup. Premium photorealistic studio photograph for a Brazilian software website product card. Landscape 3:2. Full dark graphite laptop showing elegant white dental clinic management SaaS dashboard branded 'OdontoApp' with blue accent, dark blue sidebar, appointment list, patient initials, small blue chart, heading 'Olá, Dra. Mariana', calendar. A black smartphone in front on right shows mobile version of the same application with simple appointment cards. Both devices fully visible small margins, fill frame, front three-quarter view, slightly angled left. Uniform extremely pale ice blue #edf4fb seamless background with very soft realistic contact shadows. Realistic glass screens, tactile aluminum metal, soft daylight, understated luxury. No text outside device screens, no headline, no advertisement layout, no people, no dental tools, no props, no floor edge. Interface illustrative.

**Mameri Export**

> Use case: product-mockup. A premium editorial photograph for a website portfolio project card for Mameri Export, Brazilian natural stone exporter. Landscape 3:2, photorealistic. A complete open black laptop slightly to the right sits on a beautiful large cream travertine stone block. On left are two small polished black-and-gold veined natural stone samples. Neutral cream modern stone showroom backdrop, sunlight from left, tactile surfaces. Laptop screen shows luxury minimal black corporate website with a large slab of exotic black white gold quartzite on right side, restrained elegant serif heading 'Pedras naturais que conectam o mundo.' on left side, small brand 'MAMERI EXPORT' upper left, tiny white navigation. Entire laptop screen visible, whole laptop keyboard and base visible. Composition fills frame, close view, sophisticated polished luxury architectural photography, understated. IMPORTANT no marketing headlines or text outside the actual laptop screen, no page layout, no typography over the photograph, no extra logos, no watermarks. Photo only.

**Empresa Capixaba**

> Use case: product-mockup. Premium cinematic photorealistic studio photography for an operations management software project portfolio case named Empresa Capixaba. Landscape 3:2. A beautiful complete graphite laptop on a dark stone reception desk in a modern corporate office, laptop screen facing viewer slightly angled, showing a white sophisticated operations SaaS dashboard with dark navy sidebar, tiny brand 'Empresa Capixaba', heading 'Visão geral', clean blue line chart and daily service appointment cards. To the left background subtly out of focus, a professional janitorial service cart with neatly organized supplies, glass office architecture and a softly visible potted plant. Dark midnight blue charcoal color scheme, beautiful cool soft daylight, understated luxury corporate photography, realistic sharp laptop screen. Composition laptop dominates center-right but fully visible within frame, slight angle. No people. IMPORTANT no text or marketing headlines outside laptop screen, no advertisements, no typography overlays, no watermark, no layout banners. Photograph only.

## Executar

Dentro de `web`, execute `npm ci`, `npx prisma generate` e `npm run dev`. Para verificar produção: `npm run build` seguido de `npm run start`. O banco de desenvolvimento permanece em `web/prisma/dev.db` quando `DATABASE_URL` não está configurado.

Esta entrega altera o repositório e oferece uma prévia local. Não realiza publicação no domínio de produção.

## Dependências

- Next.js e eslint-config-next atualizados de 16.1.6 para 16.3.4.
- Prisma, cliente e adapter alinhados em 7.10.0.
- Correções compatíveis das dependências transitivas aplicadas ao lockfile.
- Overrides limitados ao Prisma: `@prisma/config > deepmerge-ts ^8.0.0` e `prisma > mysql2 ^3.24.3`, para eliminar os alertas sem rebaixar o Prisma para a versão 6. A geração do cliente e o build são verificados com esses overrides. Reavaliá-los quando o Prisma incorporar as correções diretamente.
- `npm audit`: nenhuma vulnerabilidade reportada ao finalizar as atualizações em 06/09/2026.
