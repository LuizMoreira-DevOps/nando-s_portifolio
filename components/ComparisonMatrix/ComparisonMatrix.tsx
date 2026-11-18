import type { ReactNode } from "react";
import styles from "./ComparisonMatrix.module.css";

export type ComparisonColumn = {
    id: string;
    label: string;
    href: string;
    icon: ReactNode;
    values: Record<string, string>;
};

export type ComparisonCriterion = {
    key: string;
    label: string;
    icon?: ReactNode;
};

type ComparisonMatrixProps = {
    columns: readonly ComparisonColumn[];
    criteria: readonly ComparisonCriterion[];
    caption: string;
    note?: string;
};

export default function ComparisonMatrix({
    columns,
    criteria,
    caption,
    note,
}: ComparisonMatrixProps) {
    return (
        <div className={styles.root}>
            <div className={styles.scroll} role="region" aria-label={caption} tabIndex={0}>
                <table className={styles.table}>
                    <caption>{caption}</caption>

                    <thead>
                        <tr>
                            <th scope="col">Característica</th>

                            {columns.map((column) => (
                                <th scope="col" key={column.id}>
                                    <a
                                        href={column.href}
                                        className={styles.columnLink}
                                        aria-label={`Ver detalhes de ${column.label}`}
                                    >
                                        <span className={styles.columnIcon} aria-hidden="true">
                                            {column.icon}
                                        </span>

                                        <span className={styles.columnTitle}>{column.label}</span>
                                    </a>
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {criteria.map((criterion) => (
                            <tr key={criterion.key}>
                                <th scope="row">
                                    <span className={styles.criterion}>
                                        {criterion.icon && (
                                            <span
                                                className={styles.criterionIcon}
                                                aria-hidden="true"
                                            >
                                                {criterion.icon}
                                            </span>
                                        )}

                                        <span>{criterion.label}</span>
                                    </span>
                                </th>

                                {columns.map((column) => (
                                    <td key={`${criterion.key}-${column.id}`}>
                                        {column.values[criterion.key] ?? "Consulte os detalhes."}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {note && (
                <p className={styles.note}>
                    <span aria-hidden="true">ⓘ</span>
                    {note}
                </p>
            )}
        </div>
    );
}
