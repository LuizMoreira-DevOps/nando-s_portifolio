export type Service = {
    id: string;
    title: string;
    shortTitle: string;
    description: string;
    price: string;
    included: readonly string[];
    scope: string;
    format: string;
    purpose: string;
    briefingService: string;
};

/** Uma única fonte comercial para a Home e o catálogo. Valores são referências. */
export const services: readonly Service[] = [
    {
        id: "landingPage",
        title: "Landing Page",
        shortTitle: "Landing Page",
        description:
            "Uma página para apresentar seu produto, serviço ou campanha e transformar visitantes em contatos.",
        price: "R$ 1.200",
        included: [
            "Até cinco seções",
            "Layout responsivo",
            "Botões de contato",
            "Duas rodadas de revisão",
        ],
        scope: "Até 5 seções",
        format: "Página única",
        purpose: "Apresentar uma oferta",
        briefingService: "Landing Page",
    },
    {
        id: "institucional",
        title: "Portfólio ou Site Institucional",
        shortTitle: "Site Institucional",
        description:
            "Um endereço profissional para apresentar seu trabalho, seus serviços e sua identidade.",
        price: "R$ 2.000",
        included: [
            "Até quatro páginas",
            "Navegação responsiva",
            "Apresentação dos serviços",
            "Caminho de contato",
        ],
        scope: "Até 4 páginas",
        format: "Site multipágina",
        purpose: "Apresentar uma marca ou profissional",
        briefingService: "Site institucional / Portfólio",
    },
    {
        id: "catalogo",
        title: "Catálogo Digital",
        shortTitle: "Catálogo Digital",
        description:
            "Organize seus produtos e facilite o atendimento comercial sem precisar começar por uma loja completa.",
        price: "R$ 3.000",
        included: [
            "Até 20 produtos",
            "Categorias e filtros básicos",
            "Informações dos produtos",
            "Contato pelo WhatsApp",
        ],
        scope: "Até 20 produtos",
        format: "Catálogo navegável",
        purpose: "Mostrar produtos e variações",
        briefingService: "Catálogo digital",
    },
    {
        id: "loja",
        title: "Lojas Virtuais",
        shortTitle: "Loja Virtual",
        description:
            "Implantação ou personalização de lojas em plataformas como Shopify, Nuvemshop e WordPress, mediante avaliação técnica.",
        price: "Sob consulta",
        included: [
            "Análise da plataforma",
            "Definição das funcionalidades",
            "Avaliação de integrações",
            "Proposta personalizada",
        ],
        scope: "Após avaliação",
        format: "Plataforma de loja",
        purpose: "Estruturar a venda online",
        briefingService: "Loja virtual",
    },
    {
        id: "sob-demanda",
        title: "Desenvolvimento sob Demanda",
        shortTitle: "Sob Demanda",
        description:
            "Funcionalidades, melhorias e soluções específicas para projetos que já existem ou precisam começar.",
        price: "Sob consulta",
        included: [
            "Entendimento do problema",
            "Avaliação de viabilidade",
            "Escopo ou pacote de horas",
            "Entrega e validação",
        ],
        scope: "Personalizado",
        format: "Projeto sob escopo",
        purpose: "Resolver necessidades específicas",
        briefingService: "Aplicação personalizada",
    },
] as const;

export const homeServiceIds = ["landingPage", "institucional", "sob-demanda"] as const;
