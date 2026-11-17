"use client";

import type { PointerEvent, ReactNode } from "react";

type SpotlightCardProps = {
    children: ReactNode;
};

export default function SpotlightCard({ children }: SpotlightCardProps) {
    function handlePointerMove(event: PointerEvent<HTMLElement>) {
        if (event.pointerType !== "mouse") return;

        const element = event.currentTarget;
        const rect = element.getBoundingClientRect();

        element.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);

        element.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
    }

    return (
        <article className="solutions-preview-item" onPointerMove={handlePointerMove}>
            {children}
        </article>
    );
}
