import type { Metadata } from "next";

import { IconMessageCircle, IconBulb, IconCode, IconDeviceGamepad2 } from "@tabler/icons-react";

import AboutSignature from "../../components/AboutSignature/AboutSignature";
import HomeNextStep from "../../components/HomeNextStep/HomeNextStep";

import ActionLink from "../../components/ui/ActionLink/ActionLink";
import ScrollCue from "@/components/ui/ScrollCue/ScrollCue";

export const metadata: Metadata = {
    title: "Sobre | Nando Moreira",
    description:
        "Conheça a trajetória de Nando Moreira, sua experiência em tecnologia e seu trabalho com desenvolvimento de software e jogos.",
};

const journey = [
    {
        period: "2012",
        marker: "O começo",
        title: "A tecnologia virou profissão.",
        description:
            "Comecei como aprendiz e descobri que compreender um problema é tão importante quanto conhecer a ferramenta usada para resolvê-lo.",
    },
    {
        period: "A experiência",
        marker: "Pessoas e sistemas",
        title: "Aprendi a enxergar os dois lados.",
        description:
            "Trabalhei com suporte, implantação, consultoria, Linux, PostgreSQL e treinamento. Experiências que me ensinaram a investigar problemas e conversar com quem precisa das soluções.",
    },
    {
        period: "Hoje",
        marker: "Desenvolvimento",
        title: "Agora também construo as soluções.",
        description:
            "Formado em Análise e Desenvolvimento de Sistemas, desenvolvo aplicações web e experiências interativas com tecnologias como React, TypeScript, Next.js e PixiJS.",
    },
] as const;

const principles = [
    {
        title: "Entender",
        description:
            "Antes de escolher uma tecnologia, procuro compreender a necessidade, o contexto e as pessoas envolvidas.",
        icon: IconMessageCircle,
    },
    {
        title: "Investigar",
        description:
            "Gosto de explorar possibilidades, aprender com os obstáculos e encontrar soluções que realmente façam sentido.",
        icon: IconBulb,
    },
    {
        title: "Construir",
        description:
            "Transformar uma ideia em algo utilizável exige organização, testes, responsabilidade e atenção aos detalhes.",
        icon: IconCode,
    },
] as const;

export default function SobrePage() {
    return (
        <main id="conteudo" className="about-page">
            {/* 01 / Abertura */}

            <header className="about-hero" id="sobre-inicio" data-review-id="SOBRE-01">
                <div className="container about-hero-grid">
                    <div className="about-hero-copy">
                        <h1>
                            Muito antes do código, veio a <span>curiosidade.</span>
                        </h1>

                        <p className="about-hero-description">
                            Sou o Nando. Minha trajetória na tecnologia começou resolvendo problemas
                            de pessoas reais. Hoje, transformo essa experiência em soluções digitais
                            e experiências interativas.
                        </p>

                        <ScrollCue
                            href="#sobre-trajetoria"
                            label="Conhecer minha trajetória"
                            className="about-hero-scroll"
                        />
                    </div>
                </div>
            </header>

            {/* 02 / Trajetória */}

            <section
                className="content-section content-section--solid about-band"
                id="sobre-trajetoria"
                data-review-id="SOBRE-02"
                aria-labelledby="about-journey-title"
            >
                <div className="container">
                    <div className="about-section-heading">
                        <p className="eyebrow">A TRAJETÓRIA</p>

                        <h2 id="about-journey-title">
                            Uma história construída com perguntas e respostas.
                        </h2>

                        <p>
                            Antes de escrever software, passei anos aprendendo a entender sistemas,
                            problemas e pessoas.
                        </p>
                    </div>

                    <ol className="about-timeline">
                        {journey.map((item, index) => (
                            <li key={item.period} className="about-timeline-item">
                                <div className="about-timeline-marker">
                                    <span>{String(index + 1).padStart(2, "0")}</span>

                                    <strong>{item.period}</strong>
                                </div>

                                <div className="about-timeline-copy">
                                    <p className="eyebrow">{item.marker}</p>

                                    <h3>{item.title}</h3>
                                    <p>{item.description}</p>
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            {/* 03 / Princípios */}

            <section
                className="content-section about-band about-principles"
                id="sobre-iniciativa"
                data-review-id="SOBRE-03"
                aria-labelledby="about-principles-title"
            >
                <div className="container">
                    <div className="about-section-heading">
                        <p className="eyebrow">MINHA MANEIRA DE TRABALHAR</p>

                        <h2 id="about-principles-title">
                            Boas soluções começam com boas perguntas.
                        </h2>

                        <p>
                            A tecnologia é uma ferramenta. O objetivo é construir algo que faça
                            sentido para quem vai usar.
                        </p>
                    </div>

                    <div className="about-principles-grid">
                        {principles.map((item, index) => {
                            const PrincipleIcon = item.icon;

                            return (
                                <article className="about-principle" key={item.title}>
                                    <div className="about-principle-top">
                                        <span className="about-principle-icon">
                                            <PrincipleIcon
                                                size={30}
                                                stroke={1.6}
                                                aria-hidden="true"
                                            />
                                        </span>

                                        <span className="about-principle-number">
                                            {String(index + 1).padStart(2, "0")}
                                        </span>
                                    </div>

                                    <h3>{item.title}</h3>
                                    <p>{item.description}</p>
                                </article>
                            );
                        })}
                    </div>

                    <p className="about-independent-note">
                        Este é um trabalho independente. Hoje, a responsabilidade pelo
                        desenvolvimento técnico está concentrada em mim. Quando houver outras
                        pessoas envolvidas, os papéis e as responsabilidades serão apresentados com
                        clareza.
                    </p>
                </div>
            </section>

            {/* 04 / Lado criativo */}

            <section
                className="content-section content-section--solid about-band about-creative"
                id="sobre-criatividade"
                data-review-id="SOBRE-04"
                aria-labelledby="about-creative-title"
            >
                <div className="container about-creative-grid">
                    <div className="about-creative-copy">
                        <p className="eyebrow">O LADO CRIATIVO</p>

                        <h2 id="about-creative-title">Criar também é uma forma de aprender.</h2>

                        <p>
                            Os videogames fazem parte da minha história desde a infância. Hoje,
                            desenvolvimento de jogos é uma maneira de explorar regras, escolhas,
                            feedback e interação.
                        </p>

                        <p>
                            Essa curiosidade também aparece quando desenvolvo interfaces e penso na
                            experiência de quem utiliza um software.
                        </p>

                        <ActionLink href="/projetos" icon="explore" className="about-creative-cta">
                            Conhecer meus projetos
                        </ActionLink>
                    </div>

                    <div className="about-creative-panel">
                        <span className="about-creative-symbol">
                            <IconDeviceGamepad2 size={54} stroke={1.25} aria-hidden="true" />
                        </span>

                        <p className="about-creative-label">CRIATIVIDADE EM CÓDIGO</p>

                        <blockquote>
                            Desenvolvo software para ganhar experiência. Crio jogos para viver a
                            experiência.
                        </blockquote>

                        <div className="about-creative-tags">
                            <span>Regras</span>
                            <span>Escolhas</span>
                            <span>Interação</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Encerramento reutilizável */}

            <HomeNextStep />
        </main>
    );
}
