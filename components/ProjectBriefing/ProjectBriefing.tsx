"use client";

import { Suspense, useId, useState, type FormEvent } from "react";

import { useSearchParams } from "next/navigation";

import { getWhatsAppUrl } from "../../lib/contact";
import { projects } from "../../lib/projects";
import ActionIcon from "../ui/ActionIcon/ActionIcon";

type ServiceKey =
    | "Landing Page"
    | "Site institucional / Portfólio"
    | "Catálogo digital"
    | "Loja virtual"
    | "Aplicação personalizada"
    | "Ainda não sei";

type Briefing = {
    name: string;
    phone: string;
    email: string;
    message: string;
    deadline: string;
    budget: string;
};

const serviceConfigs: Record<ServiceKey, { placeholder: string }> = {
    "Landing Page": {
        placeholder:
            "Ex.: Preciso de uma página para apresentar meu serviço e captar contatos pelo WhatsApp.",
    },
    "Site institucional / Portfólio": {
        placeholder:
            "Ex.: Quero um site profissional para apresentar minha empresa, meus serviços e meus canais de contato.",
    },
    "Catálogo digital": {
        placeholder:
            "Ex.: Preciso mostrar meus produtos na internet, com categorias e atendimento pelo WhatsApp.",
    },
    "Loja virtual": {
        placeholder:
            "Ex.: Quero vender meus produtos online com carrinho, checkout e uma estrutura simples para começar.",
    },
    "Aplicação personalizada": {
        placeholder:
            "Ex.: Preciso de uma solução para organizar pedidos, atendimentos ou processos internos.",
    },
    "Ainda não sei": {
        placeholder:
            "Ex.: Tenho uma ideia, mas ainda não sei qual solução digital faz mais sentido.",
    },
};

const services = Object.keys(serviceConfigs) as ServiceKey[];

const initialBriefing: Briefing = {
    name: "",
    phone: "",
    email: "",
    message: "",
    deadline: "A definir",
    budget: "Prefiro conversar",
};

type ProjectBriefingProps = {
    source?: "page" | "modal";
    initialService?: string;
    initialProject?: string;
};

function ProjectBriefingForm({
    initialService: requestedService,
    initialProject: referenceParam,
}: Pick<ProjectBriefingProps, "initialService" | "initialProject">) {
    const uid = useId();

    const fieldId = (name: string) => `${uid}-${name}`;

    const initialService = services.find((item) => item === requestedService) ?? "";

    const projectReference = projects.find((project) => project.title === referenceParam)?.title;

    const [serviceOverride, setServiceOverride] = useState<ServiceKey | "" | null>(null);

    const selectedService = serviceOverride ?? initialService;

    const [data, setData] = useState<Briefing>(initialBriefing);

    const [error, setError] = useState("");

    const currentConfig = selectedService ? serviceConfigs[selectedService] : null;

    function update<K extends keyof Briefing>(field: K, value: Briefing[K]) {
        setData((current) => ({
            ...current,
            [field]: value,
        }));
    }

    function buildMessage(): string {
        const lines = [
            "Olá, Nando!",
            "",
            "Vim pelo seu site e gostaria de conversar sobre um projeto.",
            "",
            `*Nome:* ${data.name.trim()}`,
            `*Telefone (DDD):* ${data.phone.trim()}`,
        ];

        if (data.email.trim()) {
            lines.push(`*E-mail:* ${data.email.trim()}`);
        }

        lines.push(`*Tipo de projeto:* ${selectedService}`);

        if (projectReference) {
            lines.push(`*Referência do portfólio:* ${projectReference}`);
        }

        // Mensagem opcional:
        // somente incluir o que o visitante digitou.
        if (data.message.trim()) {
            lines.push("", "*Mensagem:*", data.message.trim());
        }

        lines.push(
            "",
            `*Prazo desejado:* ${data.deadline || "A definir"}`,
            `*Investimento previsto:* ${data.budget || "Prefiro conversar"}`,
            "",
            "Podemos conversar sobre a viabilidade e os próximos passos?",
        );

        return lines.join("\n");
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError("");

        if (data.name.trim().length < 2) {
            setError("Informe seu nome.");
            return;
        }

        const phoneDigits = data.phone.replace(/\D/g, "");

        const validPhone = /^[1-9]\d(?:9\d{8}|[2-9]\d{7})$/.test(phoneDigits);

        if (!validPhone) {
            setError("Informe um telefone válido com DDD.");
            return;
        }

        if (!selectedService) {
            setError("Selecione o tipo de projeto.");
            return;
        }

        const url = getWhatsAppUrl(buildMessage());

        if (!url) {
            setError(
                "O número comercial ainda não foi configurado. Não é possível abrir o WhatsApp neste momento.",
            );
            return;
        }

        window.open(url, "_blank", "noopener,noreferrer");
    }

    return (
        <div className="briefing">
            {projectReference && (
                <p className="briefing-project-reference">
                    <strong>Projeto de referência:</strong> {projectReference}. Podemos conversar
                    sobre uma solução com necessidades e escopo próprios.
                </p>
            )}

            <form className="briefing-form" onSubmit={handleSubmit}>
                {/* 01 - Dados de contato */}

                <div className="briefing-columns">
                    <div>
                        <label htmlFor={fieldId("name")}>Nome *</label>

                        <input
                            id={fieldId("name")}
                            type="text"
                            name="name"
                            autoComplete="name"
                            required
                            minLength={2}
                            maxLength={100}
                            placeholder="Nome e sobrenome"
                            value={data.name}
                            onChange={(event) => {
                                setError("");
                                update("name", event.target.value);
                            }}
                        />
                    </div>

                    <div>
                        <label htmlFor={fieldId("phone")}>Telefone (DDD) *</label>

                        <input
                            id={fieldId("phone")}
                            type="tel"
                            name="tel"
                            autoComplete="tel"
                            inputMode="tel"
                            required
                            maxLength={20}
                            placeholder="(41) 99999-9999"
                            value={data.phone}
                            onChange={(event) => {
                                setError("");
                                update("phone", event.target.value);
                            }}
                        />
                    </div>
                </div>

                {/* 02 - E-mail opcional */}

                <div className="briefing-field">
                    <label htmlFor={fieldId("email")}>E-mail (opcional)</label>

                    <input
                        id={fieldId("email")}
                        type="email"
                        name="email"
                        autoComplete="email"
                        maxLength={254}
                        placeholder="voce@exemplo.com"
                        value={data.email}
                        onChange={(event) => {
                            setError("");
                            update("email", event.target.value);
                        }}
                    />
                </div>

                {/* 03 - Serviço */}

                <div className="briefing-field">
                    <label htmlFor={fieldId("service")}>O que deseja desenvolver? *</label>

                    <select
                        id={fieldId("service")}
                        required
                        value={selectedService}
                        onChange={(event) => {
                            setError("");
                            setServiceOverride(event.target.value as ServiceKey | "");
                        }}
                    >
                        <option value="">Selecione uma opção</option>

                        {services.map((service) => (
                            <option key={service} value={service}>
                                {service}
                            </option>
                        ))}
                    </select>
                </div>

                {/* 04 - Mensagem opcional */}

                <div className="briefing-field">
                    <label htmlFor={fieldId("message")}>Mensagem (opcional)</label>

                    <textarea
                        id={fieldId("message")}
                        maxLength={2000}
                        rows={3}
                        placeholder={
                            currentConfig?.placeholder ??
                            "Ex.: Tenho uma ideia e gostaria de conversar sobre as possibilidades."
                        }
                        value={data.message}
                        onChange={(event) => {
                            setError("");
                            update("message", event.target.value);
                        }}
                    />
                </div>

                {/* 05 - Prazo e investimento */}

                <div className="briefing-columns">
                    <div>
                        <label htmlFor={fieldId("deadline")}>Prazo desejado (opcional)</label>

                        <select
                            id={fieldId("deadline")}
                            value={data.deadline}
                            onChange={(event) => update("deadline", event.target.value)}
                        >
                            <option value="A definir">A definir</option>

                            <option value="Até 15 dias">Até 15 dias</option>

                            <option value="Até 30 dias">Até 30 dias</option>

                            <option value="1 a 3 meses">1 a 3 meses</option>

                            <option value="Mais de 3 meses">Mais de 3 meses</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor={fieldId("budget")}>Investimento (opcional)</label>

                        <select
                            id={fieldId("budget")}
                            value={data.budget}
                            onChange={(event) => update("budget", event.target.value)}
                        >
                            <option value="Prefiro conversar">Prefiro conversar</option>

                            <option value="Até R$ 1.500">Até R$ 1.500</option>

                            <option value="R$ 1.500 a R$ 3.000">R$ 1.500 a R$ 3.000</option>

                            <option value="R$ 3.000 a R$ 6.000">R$ 3.000 a R$ 6.000</option>

                            <option value="Acima de R$ 6.000">Acima de R$ 6.000</option>
                        </select>
                    </div>
                </div>

                {/* Validação */}

                {error && (
                    <p className="briefing-error" role="alert">
                        {error}
                    </p>
                )}

                {/* CTA */}

                <button type="submit" className="button button-primary">
                    Continuar no WhatsApp
                    <ActionIcon variant="whatsapp" size={24} stroke={1.6} />
                </button>

                <p className="briefing-note">
                    Os dados preenchidos serão utilizados para montar uma mensagem no WhatsApp.
                    Revise a mensagem antes de enviá-la.
                </p>
            </form>
        </div>
    );
}

function RouteBriefing() {
    const searchParams = useSearchParams();

    return (
        <ProjectBriefingForm
            initialService={searchParams.get("servico") ?? undefined}
            initialProject={searchParams.get("projeto") ?? undefined}
        />
    );
}

export default function ProjectBriefing({
    source = "page",
    initialService,
    initialProject,
}: ProjectBriefingProps) {
    if (source === "modal") {
        return (
            <ProjectBriefingForm initialService={initialService} initialProject={initialProject} />
        );
    }

    return (
        <Suspense fallback={<p role="status">Preparando briefing...</p>}>
            <RouteBriefing />
        </Suspense>
    );
}
