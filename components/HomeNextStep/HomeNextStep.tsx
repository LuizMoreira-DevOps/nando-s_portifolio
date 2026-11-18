import BriefingLink from "../BriefingOverlay/BriefingLink";
import { Container } from "../layout";

type HomeNextStepProps = {
    variant?: "home" | "solutions";
};

export default function HomeNextStep({ variant = "home" }: HomeNextStepProps) {
    const isSolutions = variant === "solutions";

    const sectionId = isSolutions ? "orientacao" : "proximo-passo";

    const titleId = isSolutions ? "solutions-contact-title" : "home-contact-title";

    return (
        <section
            id={sectionId}
            data-review-id={isSolutions ? "SOL-10" : "HOME-04"}
            data-reels-panel={isSolutions ? undefined : ""}
            className="content-section content-section--solid home-next-step"
            aria-labelledby={titleId}
        >
            <Container>
                <div className="home-next-step-panel">
                    <div className="home-next-step-intro">
                        <h2 id={titleId}>
                            Ainda não sabe por onde <span>começar?</span>
                        </h2>

                        <p>
                            Conte o problema ou a ideia. Não é preciso saber qual tecnologia ou
                            serviço contratar.
                        </p>
                    </div>

                    <div className="home-next-step-action">
                        <span className="home-next-step-tag">SEU PONTO DE PARTIDA</span>

                        <h3>Toda ideia merece uma primeira conversa.</h3>

                        <p>
                            Descreva sua necessidade e vamos avaliar as possibilidades e os próximos
                            passos.
                        </p>

                        <BriefingLink service="Ainda não sei" variant="primary">
                            Vamos conversar
                        </BriefingLink>
                    </div>
                </div>
            </Container>
        </section>
    );
}
