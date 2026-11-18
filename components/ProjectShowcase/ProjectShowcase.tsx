import { IconTarget, IconBulb } from "@tabler/icons-react";

import AppIcon, { type AppIconName } from "../ui/AppIcon";

import ActionIcon from "../ui/ActionIcon/ActionIcon";

import styles from "./ProjectShowcase.module.css";

type Project = {
    readonly number: string;
    readonly title: string;
    readonly category: string;
    readonly status: "Entregue" | "Legado" | "Em desenvolvimento";
    readonly problem: string;
    readonly solution: string;
    readonly technologies: readonly string[];
    readonly repository: string;
    readonly liveUrl?: string;
    readonly liveLabel?: string;
    readonly preview: "game" | "catalog" | "application";
    readonly previewCaption: string;
};

type ProjectShowcaseProps = {
    project: Project;
    index: number;
    titleId: string;
};

const previewIcons: Record<Project["preview"], AppIconName> = {
    game: "gamepad",
    catalog: "globe",
    application: "browser",
};

const statusStyles = {
    Entregue: styles.statusDelivered,
    Legado: styles.statusLegacy,
    "Em desenvolvimento": styles.statusInProgress,
} as const;

export default function ProjectShowcase({ project, index, titleId }: ProjectShowcaseProps) {
    const reversed = index % 2 !== 0;

    const visualUrl = project.liveUrl ?? project.repository;

    const visualLabel = project.liveUrl
        ? `Acessar ${project.title} em nova aba`
        : `Ver repositório de ${project.title} em nova aba`;

    return (
        <div
            className={["container", styles.showcase, reversed ? styles.reversed : ""]
                .filter(Boolean)
                .join(" ")}
        >
            {/* Painel visual */}

            <a
                href={visualUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={visualLabel}
                className={[styles.visual, styles[project.preview]].join(" ")}
            >
                <span className={styles.visualTop}>
                    <span className={styles.previewCaption}>{project.previewCaption}</span>

                    <span className={styles.visualIcon} aria-hidden="true">
                        <AppIcon name={previewIcons[project.preview]} size={34} stroke={1.6} />
                    </span>
                </span>

                <span className={styles.visualArt} aria-hidden="true">
                    <span className={styles.orbit} />
                    <span className={styles.core} />
                </span>

                <span className={styles.visualBottom}>
                    <span className={styles.visualExplore}>
                        Explorar projeto
                        <ActionIcon variant="explore" size={25} stroke={1.5} />
                    </span>
                </span>
            </a>

            {/* Conteúdo editorial */}

            <div className={styles.body}>
                <div className={styles.projectMeta}>
                    <p className={styles.eyebrow}>{project.category}</p>

                    <span className={[styles.status, statusStyles[project.status]].join(" ")}>
                        <span className={styles.statusLight} aria-hidden="true" />

                        {project.status}
                    </span>
                </div>

                <h2 id={titleId}>{project.title}</h2>

                <div className={styles.details}>
                    <div className={styles.detail}>
                        <div className={styles.detailHeading}>
                            <IconTarget size={20} stroke={1.7} aria-hidden="true" />

                            <h3>O desafio</h3>
                        </div>

                        <p>{project.problem}</p>
                    </div>

                    <div className={styles.detail}>
                        <div className={styles.detailHeading}>
                            <IconBulb size={20} stroke={1.7} aria-hidden="true" />

                            <h3>A solução construída</h3>
                        </div>

                        <p>{project.solution}</p>
                    </div>
                </div>

                {/* Tecnologias */}

                <ul className={styles.technologies} aria-label="Tecnologias utilizadas">
                    {project.technologies.map((tech) => (
                        <li key={tech}>{tech}</li>
                    ))}
                </ul>

                {/* Ações */}

                <div className={styles.actions}>
                    <a
                        href={project.repository}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={[styles.action, styles.actionSecondary].join(" ")}
                    >
                        Ver código-fonte
                        <span className="visually-hidden"> (abre em nova aba)</span>
                        <ActionIcon variant="source" size={25} stroke={1.5} />
                    </a>
                </div>

                {!project.liveUrl && (
                    <p className={styles.notice}>
                        Demonstração pública ainda não disponível. O código pode ser consultado no
                        repositório.
                    </p>
                )}
            </div>
        </div>
    );
}
