import type { ReactNode } from "react";

import ActionIcon from "../ActionIcon/ActionIcon";
import styles from "./SectionJumpLink.module.css";

type SectionJumpLinkProps = {
    href: string;
    children: ReactNode;
};

export default function SectionJumpLink({ href, children }: SectionJumpLinkProps) {
    return (
        <a href={href} className={styles.link}>
            <span>{children}</span>

            <ActionIcon variant="down" size={24} className={styles.icon} />
        </a>
    );
}
