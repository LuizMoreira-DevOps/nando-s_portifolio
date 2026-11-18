import Link from "next/link";
import { projects } from "../../lib/projects";

import AppIcon from "../ui/AppIcon";
import ActionLink from "../ui/ActionLink/ActionLink";

const projectIcons = {
    game: "gamepad",
    catalog: "globe",
    application: "browser",
} as const;

export default function HomeProjects() {
    return (
        <section
            id="projetos"
            data-reels-panel
            data-review-id="HOME-03"
            className="container content-section home-projects"
            aria-labelledby="home-projects-title"
        >
            <header className="section-heading">
                <div>
                    <h2 id="home-projects-title">
                        Projetos são <span>experiências</span>.
                    </h2>
                </div>
                <p>
                    Jogos, interfaces e aplicações. Uma amostra do que acontece quando curiosidade
                    encontra desenvolvimento.
                </p>
            </header>
            <div className="projects-showcase">
                {projects.map((project) => (
                    <Link
                        key={project.number}
                        className={`project-portal project-portal--${project.preview}`}
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.liveLabel}: ${project.title} (abre em nova aba)`}
                    >
                        <span className="project-portal-top">
                            <span className="project-portal-icon" aria-hidden="true">
                                <AppIcon
                                    name={projectIcons[project.preview]}
                                    size={28}
                                    stroke={1.8}
                                />
                            </span>
                        </span>

                        <span className="project-portal-art" aria-hidden="true">
                            <span className="project-portal-orbit" />
                            <span className="project-portal-core" />
                        </span>
                        <span className="project-portal-bottom">
                            <span>{project.category}</span>
                            <strong>{project.title}</strong>
                            <small>{project.previewCaption}</small>
                        </span>
                    </Link>
                ))}
            </div>

            <div className="home-projects-footer">
                <p>
                    Cada projeto tem uma história, desafios e soluções. Conheça os detalhes por trás
                    de cada experiência.
                </p>

                <ActionLink href="/projetos" icon="search">
                    Conhecer todos os projetos
                </ActionLink>
            </div>
        </section>
    );
}
