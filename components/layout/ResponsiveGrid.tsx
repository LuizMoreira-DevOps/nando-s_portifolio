import type { ComponentPropsWithoutRef, CSSProperties } from "react";

import styles from "./ResponsiveSystem.module.css";

type ResponsiveGridProps = ComponentPropsWithoutRef<"div"> & {
    minItemWidth?: string;
    gap?: string;
};

export default function ResponsiveGrid({
    minItemWidth = "280px",
    gap,
    className,
    style,
    ...props
}: ResponsiveGridProps) {
    const responsiveStyle = {
        ...style,
        "--rs-grid-min": minItemWidth,
        ...(gap ? { "--rs-gap": gap } : {}),
    } as CSSProperties;

    return (
        <div
            {...props}
            className={[styles.grid, className].filter(Boolean).join(" ")}
            style={responsiveStyle}
        />
    );
}
