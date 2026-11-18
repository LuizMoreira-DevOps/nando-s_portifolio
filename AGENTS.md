# AGENTS.md

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## 1. Contexto do projeto

O nando.dev\_ é um portfólio profissional de desenvolvimento
de software e experiências interativas.

O projeto prioriza:

- Qualidade técnica.
- Experiência do usuário.
- Acessibilidade.
- Responsividade.
- Desempenho.
- Segurança.
- Manutenibilidade.
- Evolução incremental.

## 2. Autonomia e responsabilidade

O desenvolvedor é a autoridade responsável pelas decisões
técnicas, arquiteturais, visuais e comerciais do projeto.

O agente de inteligência artificial atua como colaborador
técnico, não como proprietário do projeto.

O agente deve:

- Respeitar o escopo solicitado.
- Compreender o problema antes de propor uma solução.
- Analisar a implementação existente antes de modificá-la.
- Apresentar alternativas quando houver decisões relevantes.
- Questionar requisitos ambíguos que afetem a implementação.
- Alertar sobre riscos e consequências técnicas.
- Preservar decisões anteriormente estabelecidas.

O agente não deve:

- Presumir autorização.
- Ampliar o escopo por iniciativa própria.
- Implementar melhorias não solicitadas.
- Remover funcionalidades sem autorização.
- Sobrescrever alterações realizadas pelo desenvolvedor.
- Prosseguir para uma nova etapa sem autorização.

## 3. Princípios de engenharia

Aplicar, quando pertinentes:

- SOLID: responsabilidades e acoplamento adequado.
- DRY: evitar duplicação desnecessária.
- KISS: priorizar soluções simples.
- YAGNI: não implementar necessidades hipotéticas.
- Separation of Concerns: separar responsabilidades.
- Clean Code: favorecer legibilidade e manutenção.

Esses princípios devem orientar decisões, não justificar
abstrações prematuras ou complexidade desnecessária.

## 4. Arquitetura

Respeitar a organização existente:

| Diretório   | Responsabilidade                     |
| ----------- | ------------------------------------ |
| app/        | Páginas, rotas e composição          |
| components/ | Componentes reutilizáveis            |
| design/     | Configurações do Design System       |
| docs/       | Documentação técnica                 |
| lib/        | Bibliotecas e dados                  |
| licenses/   | Licenças de terceiros                |
| public/     | Recursos estáticos                   |
| scripts/    | Automação e scripts auxiliares       |
| styles/     | Estilos compartilhados               |
| .github/    | Workflows e políticas do repositório |

Antes de criar um componente, verificar se já existe
uma implementação que possa ser reutilizada.

Não reorganizar diretórios, alterar rotas ou introduzir
novos padrões arquiteturais sem autorização.

## 5. Padrões de desenvolvimento

- Utilizar TypeScript.
- Priorizar tipagem explícita quando necessária.
- Evitar o uso indiscriminado de any.
- Utilizar nomes descritivos.
- Preferir componentes com responsabilidades claras.
- Evitar estados, efeitos e dependências desnecessários.
- Priorizar Server Components quando aplicável.
- Utilizar Client Components quando houver necessidade
  de estado, eventos ou APIs do navegador.
- Verificar a documentação da versão instalada antes
  de utilizar APIs do framework.
- Preservar a compatibilidade com a exportação estática.

Não adicionar, remover ou atualizar dependências
sem autorização do desenvolvedor.

## 6. Design System e identidade visual

Respeitar a identidade visual estabelecida.

Utilizar os tokens existentes de:

- Cores.
- Tipografia.
- Espaçamento.
- Geometria.
- Superfícies.
- Bordas.
- Estados de interação.

Fontes de referência:

- design/approved-themes.json
- design/theme-studio.json
- styles/theme.css
- styles/typography.css
- styles/spacing.css
- styles/shared.css

O arquivo styles/approved-themes.css é gerado
automaticamente e não deve ser editado manualmente.

Para atualizar as paletas autorizadas, utilizar:

    npm run sync:themes

O arquivo app/globals.css centraliza a importação
dos estilos globais.

Utilizar CSS Modules quando apropriado para
estilos específicos de componentes.

Não alterar a identidade visual, paletas,
fontes ou composição sem autorização.

## 7. Acessibilidade e experiência do usuário

Priorizar as recomendações aplicáveis da WCAG 2.2 AA.

Considerar:

- HTML semântico.
- Hierarquia de títulos.
- Navegação por teclado.
- Indicadores visíveis de foco.
- Contraste de cores.
- Rótulos acessíveis.
- Leitores de tela.
- Responsividade.
- Preferência por movimento reduzido.

Animações devem possuir propósito e não prejudicar
a leitura, a navegação ou o desempenho.

Não ocultar conteúdo apenas para acomodá-lo
em dimensões fixas.

Não declarar conformidade com padrões de
acessibilidade sem validação correspondente.

## 8. Segurança e privacidade

- Não expor credenciais, tokens ou informações secretas.
- Não versionar arquivos locais de ambiente.
- Respeitar o arquivo .gitignore.
- Validar dados fornecidos pelo usuário.
- Evitar coleta desnecessária de informações pessoais.
- Não transmitir dados a serviços externos sem autorização.
- Respeitar as licenças dos recursos utilizados.

Variáveis NEXT_PUBLIC são públicas no build
e não devem conter segredos.

Os exemplos comerciais possuem finalidade demonstrativa.

Não implementar pagamentos reais, envio de formulários,
persistência de dados pessoais ou integrações comerciais
adicionais sem autorização.

O briefing comercial não deve enviar mensagens
automaticamente pelo WhatsApp.

## 9. Git e controle de versão

Utilizar Conventional Commits.

Formato:

    tipo(escopo): descrição

Tipos utilizados:

- feat
- fix
- docs
- style
- refactor
- perf
- test
- build
- ci
- chore
- revert

As branches devem ser criadas conforme a necessidade
de cada alteração, respeitando a estratégia documentada
em docs/PIPELINE.md.

Sem autorização explícita, o agente não deve:

- Criar ou excluir branches.
- Adicionar arquivos ao staging.
- Criar commits.
- Executar push.
- Realizar merges ou rebases.
- Criar ou modificar tags.
- Alterar o histórico do repositório.
- Modificar permissões ou proteções de branches.

Não utilizar comandos de staging indiscriminado:

    git add .
    git add -A

Priorizar a seleção explícita dos arquivos
pertencentes ao escopo autorizado.

Não executar operações destrutivas sem
autorização específica.

Preservar a codificação UTF-8 e os finais
de linha LF.

## 10. CI, Release e Deploy

Respeitar os workflows existentes:

- .github/workflows/ci.yml
- .github/workflows/release.yml
- .github/workflows/cd.yml

A documentação de referência está em:

    docs/PIPELINE.md

O agente não deve, sem autorização:

- Alterar workflows.
- Desabilitar verificações de qualidade.
- Reduzir proteções de segurança.
- Alterar versões de publicação.
- Criar releases.
- Executar deploys.
- Modificar o ambiente de produção.

Preservar a correspondência entre as versões
do package.json e do package-lock.json.

Garantir que as soluções propostas sejam compatíveis
com a hospedagem estática no GitHub Pages,
incluindo o base path da aplicação.

## 11. Validação

Para alterações na aplicação, executar ou recomendar
as validações pertinentes:

    npm run lint
    npm run typecheck
    npm run build

Para alterações nas paletas:

    npm run sync:themes

    git diff --exit-code -- styles/approved-themes.css

O segundo comando permite verificar se o CSS gerado
possui alterações em relação ao índice do Git.

Para validação do staging:

    git diff --cached --check

Verificações adicionais devem ser proporcionais
ao escopo e aos riscos da alteração.

Nunca:

- Inventar resultados de testes.
- Omitir erros de compilação.
- Ignorar falhas de validação.
- Declarar uma funcionalidade homologada sem evidências.
- Modificar testes apenas para ocultar falhas reais.

Diferenciar claramente:

- Revisão estática.
- Validação automatizada.
- Homologação visual.
- Homologação funcional.

## 12. Documentação

Manter a documentação coerente com a implementação.

Referências:

- README.md
- AGENTS.md
- CHANGELOG.md
- docs/PIPELINE.md
- .github/SECURITY.md

Documentar decisões relevantes quando autorizado.

Não apresentar funcionalidades planejadas
como funcionalidades implementadas.

## 13. Comunicação e colaboração

Utilizar português brasileiro na comunicação
com o desenvolvedor.

Priorizar:

- Clareza.
- Objetividade.
- Transparência.
- Fundamentação técnica.
- Aprendizado contínuo.

Ao concluir uma tarefa, informar:

- O que foi realizado.
- Quais arquivos foram alterados.
- Por que as alterações foram necessárias.
- Quais validações foram executadas.
- Quais riscos ou limitações permanecem.

Quando a tarefa envolver aprendizado, explicar
o raciocínio técnico em vez de apenas fornecer
a solução final.

---

nando.dev\_

Desenvolver. Validar. Evoluir.
