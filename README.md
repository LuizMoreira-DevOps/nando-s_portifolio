# nando.dev\_

**Desenvolvimento de software e experiências interativas.**

![Version](https://img.shields.io/badge/version-0.10.0--alpha.1-29995B)
![Next.js](https://img.shields.io/badge/Next.js-000000?logo=nextdotjs)
![React](https://img.shields.io/badge/React-20232A?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?logo=githubactions&logoColor=white)

## Sobre o projeto

Portfólio profissional de Nando Moreira, desenvolvido
para apresentar projetos, competências técnicas e
soluções digitais para pessoas e negócios.

A aplicação também funciona como um ambiente de
experimentação de interfaces, arquitetura de software,
acessibilidade e automação de publicação.

## Funcionalidades

- Portfólio profissional responsivo.
- Apresentação de projetos de software e jogos.
- Catálogo de soluções comerciais.
- Exemplos comerciais interativos.
- Comparação entre soluções.
- Apresentação das etapas de desenvolvimento.
- Briefing comercial integrado ao WhatsApp.
- Seletor de temas claro, escuro e automático.
- Paletas de cores azul e verde.
- Componentes reutilizáveis.
- Ferramentas de experimentação visual em desenvolvimento.
- Automação de CI, Release e CD.

## Tecnologias

| Tecnologia     | Finalidade                   |
| -------------- | ---------------------------- |
| Next.js        | Framework e App Router       |
| React          | Componentização da interface |
| TypeScript     | Tipagem estática             |
| CSS3           | Estilização e responsividade |
| Tabler Icons   | Iconografia                  |
| ESLint         | Análise estática             |
| Git            | Controle de versão           |
| GitHub Actions | Automação de workflows       |
| GitHub Pages   | Hospedagem estática          |

## Arquitetura

    .
    ├── .github/       # Workflows e políticas
    ├── app/           # Páginas e rotas
    ├── components/    # Componentes reutilizáveis
    ├── design/        # Configurações visuais
    ├── docs/          # Documentação técnica
    ├── lib/           # Bibliotecas e dados
    ├── licenses/      # Licenças de terceiros
    ├── public/        # Recursos estáticos
    ├── scripts/       # Scripts auxiliares
    └── styles/        # Estilos compartilhados

## Executar localmente

### Pré-requisitos

- Git
- Node.js 24
- npm

### Instalação

```bash
git clone https://github.com/LuizMoreira-DevOps/nando-s_portifolio.git
cd nando-s_portifolio
npm ci
```

### Desenvolvimento

```bash
npm run dev
```

Acesse http://localhost:3000.

## Variáveis de ambiente

Utilize o arquivo `.env.example` como referência
para criar um arquivo `.env.local`.

| Variável                        | Finalidade                                            |
| ------------------------------- | ----------------------------------------------------- |
| NEXT_PUBLIC_WHATSAPP_NUMBER     | Número comercial com país e DDD, somente dígitos      |
| NEXT_PUBLIC_ENABLE_THEME_EDITOR | Habilita o editor visual em desenvolvimento           |
| NEXT_PUBLIC_ENABLE_UX_TOOLS     | Habilita ferramentas de revisão UX em desenvolvimento |

O número comercial é público e incorporado ao build.

O briefing informa indisponibilidade quando o número
não está configurado corretamente. Nenhuma mensagem
é enviada automaticamente.

## Validação

```bash
npm run sync:themes
npm run lint
npm run typecheck
npm run build
```

O projeto ainda não dispõe de uma suíte de testes
automatizados registrada no package.json.

## Onde editar

| Aspecto                    | Arquivo                       |
| -------------------------- | ----------------------------- |
| Espaçamento e geometria    | `styles/spacing.css`          |
| Tipografia                 | `styles/typography.css`       |
| Paletas                    | `design/approved-themes.json` |
| Texturas e cores derivadas | `styles/theme.css`            |
| Estilos compartilhados     | `styles/shared.css`           |
| Navegação por rolagem      | `styles/scroll.css`           |
| Composição da Home         | `app/home.css`                |
| Componentes                | `components/`                 |
| Páginas internas           | `app/`                        |
| Serviços e preços          | `lib/solutions.ts`            |
| Projetos                   | `lib/projects.ts`             |
| Contato comercial          | `lib/contact.ts`              |

### Design System

O arquivo `app/globals.css` centraliza a importação
dos estilos globais.

Os arquivos CSS dos componentes mantêm suas regras
específicas. CSS Modules são importados pelos
respectivos componentes.

O arquivo `styles/approved-themes.css` é gerado
automaticamente. Não deve ser editado manualmente.

Para atualizar as paletas, modifique
`design/approved-themes.json` e execute:

```bash
npm run sync:themes
```

Os espaçamentos globais possuem configurações
específicas para desktop, tablet e mobile.

Evite alturas fixas ou ocultação de conteúdo
para acomodar textos em uma seção.

### Ferramentas de desenvolvimento

O Theme Studio permite experimentar cores,
tipografia, geometria e texturas.

As ferramentas de revisão UX auxiliam na análise
das seções e do comportamento da rolagem.

Ambos os recursos são restritos ao ambiente de
desenvolvimento quando habilitados.

## CI/CD e versionamento

O projeto utiliza versionamento semântico (SemVer)
e workflows independentes para:

- Continuous Integration (CI).
- Versionamento e Release.
- Continuous Delivery (CD).

Consulte a [documentação da pipeline](docs/PIPELINE.md)
para conhecer o processo completo.

## Licenças de terceiros

Consulte [THIRD_PARTY_NOTICES](licenses/THIRD_PARTY_NOTICES.md).

## Autor

**Luiz Fernando Alves Moreira (Nando)**

Desenvolvedor de software e criador de experiências
interativas.

- [GitHub](https://github.com/LuizMoreira-DevOps)
- [LinkedIn](https://www.linkedin.com/in/luiz-moreira-dev/)

---

**nando.dev\_ | Desenvolver. Validar. Evoluir.**
