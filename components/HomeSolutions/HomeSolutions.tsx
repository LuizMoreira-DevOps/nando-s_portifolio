import { services, homeServiceIds } from "../../lib/solutions";

import SolutionCard from "../ui/SolutionCard";

import ActionLink from "../ui/ActionLink/ActionLink";

const featuredServices = homeServiceIds.map((id) => {
    const service = services.find((item) => item.id === id);

    if (!service) {
        throw new Error(`Solução não encontrada: ${id}`);
    }

    return service;
});

export default function HomeSolutions() {
    return (
        <section
            id="solucoes"
            data-review-id="HOME-02"
            data-reels-panel
            className="content-section content-section--solid home-solutions"
            aria-labelledby="home-solutions-title"
        >
            <div className="container">
                <header className="section-heading home-solutions-heading">
                    <h2 id="home-solutions-title">
                        Uma <span>solução</span> para cada necessidade.
                    </h2>

                    <p className="home-solutions-intro">
                        Três caminhos para começar. Explore os detalhes e descubra outras
                        possibilidades no catálogo completo.
                    </p>
                </header>

                <div className="solutions-preview">
                    {featuredServices.map((service) => (
                        <SolutionCard key={service.id} service={service} />
                    ))}
                </div>

                <div className="solutions-preview-footer">
                    <p className="fine-print">
                        Valores indicativos. Prazos, escopo e custos externos são confirmados na
                        proposta.
                    </p>

                    <ActionLink href="/solucoes" icon="explore">
                        Conhecer todas as soluções
                    </ActionLink>
                </div>
            </div>
        </section>
    );
}
