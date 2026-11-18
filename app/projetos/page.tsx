import type { Metadata } from "next";

import { projects } from "../../lib/projects";
import ProjectShowcase from "../../components/ProjectShowcase/ProjectShowcase";
import ScrollCue from "@/components/ui/ScrollCue/ScrollCue";

import HomeNextStep from "../../components/HomeNextStep/HomeNextStep";

export const metadata: Metadata = {
    title: "Projetos | Nando Moreira",
    description: "Jogos, catálogos e aplicações web com problemas, soluções e evidências técnicas.",
};

const slugs = ["pirate-battle", "chouga-online", "chouga-v2"] as const;

export default function ProjetosPage() {
    return (
        <main id="conteudo" className="projects-page">
            {/* Abertura */}

            <header className="projects-hero" id="galeria" data-review-id="PROJ-01">
                <div className="container projects-hero-content">
                    <h1>
                        Ideias que viraram <span>experiências.</span>
                    </h1>

                    <p className="projects-hero-description">
                        Uma seleção de trabalhos e desafios técnicos. Conheça os problemas, as
                        decisões e as soluções construídas.
                    </p>

                    <ScrollCue
                        href="#pirate-battle"
                        label="Explorar projetos"
                        className="projects-hero-scroll"
                    />
                </div>
            </header>

            {/* Projetos */}

            {projects.map((project, index) => (
                <section
                    key={project.number}
                    id={slugs[index]}
                    className={[
                        "content-section",
                        "projects-band",
                        index % 2 === 0 ? "content-section--solid" : "",
                    ]
                        .filter(Boolean)
                        .join(" ")}
                    data-review-id={`PROJ-${String(index + 3).padStart(2, "0")}`}
                    aria-labelledby={`${slugs[index]}-title`}
                >
                    <ProjectShowcase
                        project={project}
                        index={index}
                        titleId={`${slugs[index]}-title`}
                    />
                </section>
            ))}

            {/* Observação */}

            <aside className="projects-note">
                <div className="container">
                    <p>
                        Os painéis visuais são composições gráficas, não capturas de tela. Para
                        conhecer as experiências, acesse os projetos pelos links apresentados.
                    </p>
                </div>
            </aside>
            <HomeNextStep />
        </main>
    );
}
