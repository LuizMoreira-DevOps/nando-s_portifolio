import Link from "next/link";

import type { AnchorHTMLAttributes, ReactNode } from "react";

import ActionIcon, { type ActionIconVariant } from "../ActionIcon/ActionIcon";

import styles from "./ActionLink.module.css";

type ActionLinkProps = Omit<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    "href" | "children" | "target" | "rel"
> & {
    href: string;
    children: ReactNode;
    variant?: "primary" | "secondary" | "text";
    direction?: ActionIconVariant;
    icon?: ActionIconVariant;
    external?: boolean;
};

export default function ActionLink({
    href,
    children,
    variant = "primary",
    icon,
    direction = "forward",
    external = false,
    className,
    ...props
}: ActionLinkProps) {
    const classes = [
        styles.root,
        variant === "text" ? styles.text : `button button-${variant}`,
        className,
    ]
        .filter(Boolean)
        .join(" ");

    const content = (
        <>
            <span>{children}</span>

            <ActionIcon variant={icon ?? direction} size={24} stroke={1.6} />
        </>
    );

    if (external) {
        return (
            <a href={href} className={classes} target="_blank" rel="noopener noreferrer" {...props}>
                {content}

                <span className="visually-hidden">(abre em nova aba)</span>
            </a>
        );
    }

    return (
        <Link href={href} className={classes} {...props}>
            {content}
        </Link>
    );
}
