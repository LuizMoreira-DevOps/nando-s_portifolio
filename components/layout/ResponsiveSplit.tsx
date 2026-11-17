import type { ComponentPropsWithoutRef, CSSProperties } from "react";

import styles from "./ResponsiveSystem.module.css";

type ResponsiveSplitProps = ComponentPropsWithoutRef<"div"> & {
    ratio?: "equal" | "wide-first" | "wide-second";
    gap?: string;
};

export default function ResponsiveSplit({
    ratio = "equal",
    gap,
    className,
    style,
    children,
    ...props
}: ResponsiveSplitProps) {
    const responsiveStyle = {
        ...style,
        ...(gap ? { "--rs-gap": gap } : {}),
    } as CSSProperties;

    const ratioClass = {
        equal: styles.equal,
        "wide-first": styles.wideFirst,
        "wide-second": styles.wideSecond,
    }[ratio];

    return (
        <div
            {...props}
            className={`${styles.splitContainer} ${className ?? ""}`.trim()}
            style={responsiveStyle}
        >
            <div className={`${styles.splitGrid} ${ratioClass}`.trim()}>{children}</div>
        </div>
    );
}
