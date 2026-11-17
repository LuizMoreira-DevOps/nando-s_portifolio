import type { ComponentPropsWithoutRef, CSSProperties } from "react";

import styles from "./ResponsiveSystem.module.css";

type StackProps = ComponentPropsWithoutRef<"div"> & {
    direction?: "column" | "row";
    align?: "start" | "center" | "end" | "stretch";
    wrap?: boolean;
    gap?: string;
};

export default function Stack({
    direction = "column",
    align = "stretch",
    wrap = false,
    gap,
    className,
    style,
    ...props
}: StackProps) {
    const alignClass = {
        start: styles.alignStart,
        center: styles.alignCenter,
        end: styles.alignEnd,
        stretch: styles.alignStretch,
    }[align];

    const responsiveStyle = {
        ...style,
        ...(gap ? { "--rs-gap": gap } : {}),
    } as CSSProperties;

    return (
        <div
            {...props}
            className={[
                styles.stack,
                direction === "row" ? styles.row : "",
                alignClass,
                wrap ? styles.wrap : "",
                className,
            ]
                .filter(Boolean)
                .join(" ")}
            style={responsiveStyle}
        />
    );
}
