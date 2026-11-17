import {
    IconArrowBadgeDown,
    IconArrowBadgeUp,
    IconArrowBadgeLeft,
    IconArrowBadgeRight,
    IconMessage2Share,
    IconMessageCircleShare,
    IconSearch,
    IconFolderCode,
    IconFolderSearch,
} from "@tabler/icons-react";

import styles from "./ActionIcon.module.css";

export type ActionIconVariant =
    | "down"
    | "up"
    | "forward"
    | "back"
    | "navigate"
    | "external"
    | "briefing"
    | "whatsapp"
    | "explore"
    | "source"
    | "search";

export type ActionIconMotion = "hover" | "loop" | "none";

type ActionIconProps = {
    variant?: ActionIconVariant;
    motion?: ActionIconMotion;
    size?: number;
    stroke?: number;
    className?: string;
};

const iconMap = {
    // Direcionais
    down: IconArrowBadgeDown,
    up: IconArrowBadgeUp,
    forward: IconArrowBadgeRight,
    back: IconArrowBadgeLeft,
    navigate: IconArrowBadgeRight,
    external: IconArrowBadgeRight,

    // Semânticos
    briefing: IconMessage2Share,
    whatsapp: IconMessageCircleShare,
    explore: IconSearch,
    source: IconFolderCode,
    search: IconFolderSearch,
} as const;

export default function ActionIcon({
    variant = "forward",
    motion = "hover",
    size = 24,
    stroke = 1.6,
    className,
}: ActionIconProps) {
    const Icon = iconMap[variant];

    return (
        <Icon
            size={size}
            stroke={stroke}
            className={[styles.icon, styles[motion], className].filter(Boolean).join(" ")}
            aria-hidden="true"
            focusable="false"
        />
    );
}
