import type { Metadata } from "next";
import ActionLink from "../../components/ui/ActionLink/ActionLink";

import { services, type Service } from "../../lib/solutions";
import BriefingLink from "../../components/BriefingOverlay/BriefingLink";

import ProcessJourney from "../../components/ProcessJourney/ProcessJourney";
import HomeNextStep from "../../components/HomeNextStep/HomeNextStep";

import SolutionsComparison from "../../components/SolutionsComparison/SolutionsComparison";

import ScrollCue from "@/components/ui/ScrollCue/ScrollCue";

export const metadata: Metadata = {
    title: "Soluções | Nando Moreira",
    description:
        "Conheça soluções digitais, escopos de referência, comparação e processo de desenvolvimento.",
};

const questions = [
    {
        q: "Os valores apresentados são finais?",
        a: "Não. São valores iniciais de referência. O investimento definitivo depende das funcionalidades, do conteúdo e das necessidades do projeto. Você receberá uma proposta antes da contratação.",
    },
    {
        q: "Quanto tempo leva para desenvolver meu projeto?",
        a: "Depende da complexidade e das entregas combinadas. O prazo será definido na proposta, depois de entendermos suas necessidades.",
    },
    {
        q: "Preciso ter textos, imagens e identidade visual prontos?",
        a: "Não necessariamente. Podemos avaliar o material que você já possui e identificar o que falta. A criação de novos conteúdos ou identidade visual deve ser combinada separadamente.",
    },
    {
        q: "Domínio e hospedagem estão incluídos?",
        a: "Não estão automaticamente incluídos nos valores de referência. A contratação, os custos e a responsabilidade pelas contas serão definidos na proposta.",
    },
    {
        q: "Poderei atualizar meu site depois da entrega?",
        a: "Depende da solução contratada. Se você precisa alterar textos, imagens ou produtos por conta própria, podemos avaliar essa funcionalidade antes de iniciar o desenvolvimento.",
    },
    {
        q: "Posso pedir alterações durante o projeto?",
        a: "Sim, dentro dos limites de revisão estabelecidos na proposta. A Landing Page de referência inclui duas rodadas de revisão. Mudanças fora do escopo serão avaliadas separadamente.",
    },
    {
        q: "Existe suporte depois da publicação?",
        a: "O acompanhamento e o suporte dependem do que for contratado. As condições e responsabilidades serão informadas antes da aprovação do projeto.",
    },
    {
        q: "E se minha necessidade não estiver entre as soluções?",
        a: "Podemos conversar sobre um desenvolvimento sob demanda. A ideia é entender seu problema e avaliar a viabilidade de uma solução personalizada.",
    },
];

const exampleRoutes: Record<string, string> = {
    landingPage: "/solucoes/exemplos/landingPage",
    institucional: "/solucoes/exemplos/siteInstitucional",
    catalogo: "/solucoes/exemplos/catalogoDigital",
    loja: "/solucoes/exemplos/lojaVirtual",
};

function SolutionDetail({ service, index }: { service: Service; index: number }) {
    const exampleUrl = exampleRoutes[service.id];

    return (
        <section
            id={service.id}
            className={[
                "content-section",
                "solutions-band",
                "solutions-detail",
                index % 2 === 0 ? "content-section--solid" : "",
                index % 2 !== 0 ? "solutions-detail--reverse" : "",
            ]
                .filter(Boolean)
                .join(" ")}
            data-review-id={`SOL-${String(index + 2).padStart(2, "0")}`}
            aria-labelledby={`${service.id}-title`}
        >
            <div className="container solutions-detail-grid">
                <div className="solutions-detail-main">
                    <h2 id={`${service.id}-title`}>{service.title}</h2>

                    <p className="solutions-detail-description">{service.description}</p>

                    <div className="solutions-detail-purpose">
                        <span>INDICADO PARA</span>
                        <p>{service.purpose}</p>
                    </div>
                </div>

                <div className="solutions-detail-panel">
                    <div className="solutions-detail-panel-content">
                        <h3>O que está incluído</h3>

                        <ul className="solutions-detail-included">
                            {service.included.map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>

                        <dl className="solutions-detail-specs">
                            <div>
                                <dt>Formato</dt>
                                <dd>{service.format}</dd>
                            </div>

                            <div>
                                <dt>Escopo inicial</dt>
                                <dd>{service.scope}</dd>
                            </div>
                        </dl>
                    </div>

                    <div className="solutions-detail-bottom">
                        <div className="solutions-detail-price">
                            <span>
                                {service.price === "Sob consulta"
                                    ? "Investimento"
                                    : "Valor de referência"}
                            </span>

                            <strong>{service.price}</strong>
                        </div>

                        <div className="solutions-detail-actions">
                            {exampleUrl && (
                                <ActionLink href={exampleUrl} icon="explore">
                                    Explorar exemplo interativo
                                </ActionLink>
                            )}

                            <BriefingLink service={service.briefingService}>
                                Vamos conversar
                            </BriefingLink>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default function SolucoesPage() {
    return (
        <main id="conteudo" className="solutions-page">
            {/* Abertura */}

            <header className="solutions-hero" id="inicio-solucoes" data-review-id="SOL-01">
                <div className="container">
                    <h1>
                        O que faz sentido para <span>seu projeto</span>?
                    </h1>

                    <p className="solutions-hero-description">
                        Cada necessidade pede uma abordagem. Conheça as possibilidades, entenda o
                        que cada solução oferece e descubra por onde começar.
                    </p>

                    <ScrollCue
                        href="#landingPage"
                        label="Explorar soluções"
                        className="solutions-hero-scroll"
                    />
                </div>
            </header>

            {/* Cinco soluções detalhadas */}

            {services.map((service, index) => (
                <SolutionDetail key={service.id} service={service} index={index} />
            ))}

            {/* Comparação */}

            <SolutionsComparison />

            {/* Processo */}

            <section
                className="content-section content-section--solid solutions-band"
                id="processo"
                data-review-id="SOL-08"
                aria-labelledby="process-title"
                data-scroll-exempt
            >
                <div className="container">
                    <div className="section-heading">
                        <div>
                            <h2 id="process-title">Da primeira conversa à entrega.</h2>
                        </div>

                        <p>
                            Entenda como trabalhamos juntos, o que acontece em cada fase e o que
                            você pode esperar da entrega.
                        </p>
                    </div>

                    <ProcessJourney />
                </div>
            </section>

            {/* Perguntas frequentes */}

            <section
                className="content-section solutions-band"
                id="duvidas"
                data-review-id="SOL-09"
                aria-labelledby="faq-title"
            >
                <div className="container">
                    <div className="section-heading">
                        <div>
                            <h2 id="faq-title">O que vale esclarecer.</h2>
                        </div>
                        <p>
                            Respostas para as principais dúvidas sobre contratação, investimento e
                            continuidade do projeto.
                        </p>{" "}
                    </div>

                    <div className="solutions-faq">
                        {questions.map((item) => (
                            <details key={item.q}>
                                <summary>
                                    {item.q}
                                    <span aria-hidden="true">+</span>
                                </summary>

                                <p>{item.a}</p>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            {/* Encerramento compartilhado com a Home */}

            <HomeNextStep variant="solutions" />
        </main>
    );
}
