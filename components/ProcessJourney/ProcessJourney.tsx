"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";

import {
    IconMessageCircle,
    IconClipboardList,
    IconCode,
    IconCircleCheck,
} from "@tabler/icons-react";

type JourneyMoment = {
    label: string;
    title: string;
    description: string;
    activity: string;
    result: string;
};

const moments: JourneyMoment[] = [
    {
        label: "Entender",
        title: "Começamos com a sua ideia.",
        description:
            "Conversamos sobre seu objetivo e o que precisa funcionar. Você não precisa trazer uma solução pronta.",
        activity: "Conversa inicial para identificar necessidades e prioridades.",
        result: "Objetivo e direção inicial definidos.",
    },
    {
        label: "Planejar",
        title: "Definimos o caminho.",
        description:
            "Alinhamos o que será desenvolvido, o investimento e os prazos antes de começar.",
        activity: "Planejamento, proposta e, quando prevista, uma prévia do projeto.",
        result: "Escopo e condições aprovados.",
    },
    {
        label: "Construir",
        title: "Sua ideia ganha forma.",
        description:
            "Desenvolvo a solução e verifico se tudo funciona conforme o que foi combinado.",
        activity: "Desenvolvimento, testes e revisões previstas na proposta.",
        result: "Projeto conferido para a entrega.",
    },
    {
        label: "Entregar",
        title: "Tudo pronto para usar.",
        description:
            "Finalizamos a entrega, com publicação quando prevista, acessos e orientações combinadas.",
        activity: "Publicação, quando contratada, e entrega dos materiais e acessos.",
        result: "Projeto entregue e próximos passos definidos.",
    },
];

const momentIcons = [IconMessageCircle, IconClipboardList, IconCode, IconCircleCheck] as const;

export default function ProcessJourney() {
    const [active, setActive] = useState(0);

    const id = useId();

    const tabsRef = useRef<Array<HTMLButtonElement | null>>([]);

    const moment = moments[active];

    function choose(index: number, focus = false) {
        setActive(index);

        if (focus) {
            tabsRef.current[index]?.focus();
        }
    }

    function onTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
        let next: number | undefined;

        if (event.key === "ArrowRight" || event.key === "ArrowDown") {
            next = (index + 1) % moments.length;
        }

        if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
            next = (index - 1 + moments.length) % moments.length;
        }

        if (event.key === "Home") {
            next = 0;
        }

        if (event.key === "End") {
            next = moments.length - 1;
        }

        if (next === undefined) return;

        event.preventDefault();
        choose(next, true);
    }

    return (
        <div className="process-journey" data-scroll-exempt>
            {/* Seletores das fases */}

            <div
                className="process-journey-tabs"
                role="tablist"
                aria-label="Etapas do processo de desenvolvimento"
            >
                {moments.map((item, index) => {
                    const StepIcon = momentIcons[index];

                    return (
                        <button
                            key={item.label}
                            ref={(element) => {
                                tabsRef.current[index] = element;
                            }}
                            type="button"
                            role="tab"
                            id={`${id}-tab-${index}`}
                            aria-controls={`${id}-panel`}
                            aria-selected={active === index}
                            tabIndex={active === index ? 0 : -1}
                            className={
                                `process-journey-tab` + (active === index ? " is-active" : "")
                            }
                            onClick={() => choose(index)}
                            onKeyDown={(event) => onTabKeyDown(event, index)}
                        >
                            <span className="process-journey-tab-icon" aria-hidden="true">
                                <StepIcon size={25} stroke={1.7} />
                            </span>

                            <span className="process-journey-tab-label">
                                <span className="process-journey-tab-number">
                                    {String(index + 1).padStart(2, "0")}.
                                </span>

                                {item.label}
                            </span>
                        </button>
                    );
                })}
            </div>

            {/* Painel único de informações */}

            <div
                id={`${id}-panel`}
                role="tabpanel"
                aria-labelledby={`${id}-tab-${active}`}
                tabIndex={0}
                className="process-journey-panel"
            >
                <div className="process-journey-intro">
                    <h3>{moment.title}</h3>

                    <p>{moment.description}</p>
                </div>

                <div className="process-journey-summary">
                    <div className="process-journey-info">
                        <span className="process-journey-info-label">
                            <IconClipboardList size={20} stroke={1.7} aria-hidden="true" />O que
                            acontece
                        </span>

                        <p>{moment.activity}</p>
                    </div>

                    <div className="process-journey-info">
                        <span className="process-journey-info-label">
                            <IconCircleCheck size={20} stroke={1.7} aria-hidden="true" />
                            Resultado
                        </span>

                        <p>{moment.result}</p>
                    </div>
                </div>

                <p className="process-journey-note">
                    As atividades e entregas seguem as condições da proposta aprovada.
                </p>
            </div>
        </div>
    );
}
