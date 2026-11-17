import type { Service } from "../../lib/solutions";

import BriefingLink from "../BriefingOverlay/BriefingLink";
import SpotlightCard from "../ui/SpotlightCard";
import ActionIcon from "./ActionIcon/ActionIcon";

type SolutionCardProps = {
    service: Service;
};

export default function SolutionCard({ service }: SolutionCardProps) {
    return (
        <SpotlightCard>
            <BriefingLink
                variant="plain"
                service={service.briefingService}
                className="solutions-preview-link"
                aria-label={`Preencher briefing sobre ${service.title}`}
            >
                <div className="solutions-preview-copy">
                    <h3>{service.shortTitle}</h3>

                    <p>{service.description}</p>

                    <ul className="solutions-preview-included">
                        {service.included.map((item) => (
                            <li key={item}>{item}</li>
                        ))}
                    </ul>

                    <div className="solutions-preview-details">
                        <span>{service.scope}</span>
                        <span>{service.format}</span>
                    </div>
                </div>

                <div className="solutions-preview-bottom">
                    <div className="solutions-preview-price">
                        <span>
                            {service.price === "Sob consulta"
                                ? "Investimento"
                                : "Valor de referência"}
                        </span>

                        <strong>{service.price}</strong>
                    </div>

                    <span className="solutions-preview-action">
                        Vamos conversar
                        <ActionIcon variant="briefing" size={22} stroke={1.6} />
                    </span>
                </div>
            </BriefingLink>
        </SpotlightCard>
    );
}
