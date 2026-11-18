import {
    IconBrowser,
    IconWorld,
    IconLayoutGrid,
    IconShoppingCart,
    IconCode,
    IconTarget,
    IconListDetails,
    IconHelp,
} from "@tabler/icons-react";

import { services } from "../../lib/solutions";

import ComparisonMatrix, {
    type ComparisonColumn,
    type ComparisonCriterion,
} from "../ComparisonMatrix/ComparisonMatrix";

const comparisonContent: Record<string, Record<string, string>> = {
    landingPage: {
        solves: "Divulgar uma oferta e transformar visitantes em contatos.",
        difference: "Uma única página, com foco em uma ação principal.",
        whenToChoose: "Você quer promover um produto, serviço ou campanha.",
    },

    institucional: {
        solves: "Apresentar uma empresa, profissional ou marca com clareza.",
        difference: "Várias páginas para organizar informações e serviços.",
        whenToChoose: "Você precisa de uma presença profissional na internet.",
    },

    catalogo: {
        solves: "Exibir produtos e facilitar o contato com interessados.",
        difference: "Produtos organizados, com pesquisa e filtros, sem compra online.",
        whenToChoose: "Você quer mostrar produtos e negociar diretamente com clientes.",
    },

    loja: {
        solves: "Permitir que clientes escolham produtos e façam pedidos online.",
        difference: "Carrinho e finalização de compras, conforme a plataforma contratada.",
        whenToChoose: "Você precisa de uma estrutura para vender pela internet.",
    },

    "sob-demanda": {
        solves: "Resolver necessidades que não se encaixam nas soluções anteriores.",
        difference: "As funcionalidades são definidas após entender o projeto.",
        whenToChoose: "Você precisa de uma integração, melhoria ou aplicação específica.",
    },
};

const serviceIcons = {
    landingPage: <IconBrowser size={23} stroke={1.7} />,
    institucional: <IconWorld size={23} stroke={1.7} />,
    catalogo: <IconLayoutGrid size={23} stroke={1.7} />,
    loja: <IconShoppingCart size={23} stroke={1.7} />,
    "sob-demanda": <IconCode size={23} stroke={1.7} />,
};

const criteria: ComparisonCriterion[] = [
    {
        key: "solves",
        label: "O que resolve",
        icon: <IconTarget size={20} stroke={1.8} />,
    },
    {
        key: "difference",
        label: "Principal diferença",
        icon: <IconListDetails size={20} stroke={1.8} />,
    },
    {
        key: "whenToChoose",
        label: "Quando escolher",
        icon: <IconHelp size={20} stroke={1.8} />,
    },
];

const columns: ComparisonColumn[] = services.map((service) => ({
    id: service.id,
    label: service.shortTitle,
    href: `#${service.id}`,
    icon: serviceIcons[service.id as keyof typeof serviceIcons] ?? (
        <IconCode size={23} stroke={1.7} />
    ),
    values: comparisonContent[service.id] ?? {},
}));

export default function SolutionsComparison() {
    return (
        <section
            className="content-section solutions-band"
            id="comparar"
            data-review-id="SOL-07"
            aria-labelledby="comparison-title"
        >
            <div className="container">
                <div className="section-heading">
                    <div>
                        <h2 id="comparison-title">Compare sem adivinhar.</h2>
                    </div>

                    <p>
                        Entenda as diferenças entre as soluções e descubra qual combina melhor com o
                        que você precisa.
                    </p>
                </div>

                <ComparisonMatrix
                    columns={columns}
                    criteria={criteria}
                    caption="Comparação das cinco soluções"
                    note="Selecione o nome de uma solução para conhecer seus detalhes e, quando disponível, explorar um exemplo interativo."
                />
            </div>
        </section>
    );
}
