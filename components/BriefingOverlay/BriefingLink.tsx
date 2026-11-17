"use client";

import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";

import ActionLink from "../ui/ActionLink/ActionLink";

import type { ActionIconVariant } from "../ui/ActionIcon/ActionIcon";

import { useBriefing } from "./BriefingProvider";

type BriefingLinkProps = Omit<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    "href" | "children" | "target" | "rel"
> & {
    children: ReactNode;
    service?: string;
    project?: string;
    variant?: "primary" | "secondary" | "text" | "plain";
    icon?: ActionIconVariant;
    closeAncestorDetails?: boolean;
};

export default function BriefingLink({
    children,
    service,
    project,
    variant = "primary",
    icon = "briefing",
    closeAncestorDetails = false,
    onClick,
    ...props
}: BriefingLinkProps) {
    const { openBriefing } = useBriefing();

    const params = new URLSearchParams();

    if (service) {
        params.set("servico", service);
    }

    if (project) {
        params.set("projeto", project);
    }

    const href = `/contrate${params.size ? `?${params.toString()}` : ""}` + "#briefing";

    function handleClick(event: MouseEvent<HTMLAnchorElement>) {
        onClick?.(event);

        if (
            event.defaultPrevented ||
            event.button !== 0 ||
            event.metaKey ||
            event.ctrlKey ||
            event.shiftKey ||
            event.altKey
        ) {
            return;
        }

        event.preventDefault();

        if (closeAncestorDetails) {
            const details = event.currentTarget.closest("details");

            if (details) {
                details.open = false;
            }
        }

        openBriefing({ service, project });
    }

    if (variant === "plain") {
        return (
            <a href={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${href}`} onClick={handleClick} {...props}>
                {children}
            </a>
        );
    }

    return (
        <ActionLink href={href} variant={variant} icon={icon} onClick={handleClick} {...props}>
            {children}
        </ActionLink>
    );
}
