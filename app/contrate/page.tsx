import type { Metadata } from "next";

import ProjectBriefing from "../../components/ProjectBriefing/ProjectBriefing";

export const metadata: Metadata = {
    title: "Solicitar orçamento | Nando Moreira",
    description: "Conte sua necessidade em um briefing simples para avaliar uma solução digital.",
};

export default function ContratePage() {
    return (
        <main id="conteudo" className="container page-shell briefing-page">
            <section
                className="contact-section"
                id="briefing"
                aria-labelledby="briefing-title"
                data-review-id="CONT-02"
                data-scroll-exempt
            >
                <header className="briefing-heading" id="contrate-inicio" data-review-id="CONT-01">
                    <h1 id="briefing-title">
                        Conte o que precisa <span>resolver</span>.
                    </h1>

                    <p className="briefing-heading-description">
                        Você não precisa chegar com a solução pronta. Compartilhe sua necessidade,
                        prazo e investimento previsto para começarmos uma conversa sobre o melhor
                        caminho.
                    </p>

                    <p className="briefing-heading-note">
                        O envio não gera compromisso de contratação.
                    </p>
                </header>

                <div className="contact-panel">
                    <ProjectBriefing />
                </div>
            </section>
        </main>
    );
}
