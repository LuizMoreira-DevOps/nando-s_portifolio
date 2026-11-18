"use client";

import { useEffect, useId, useRef, useState } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconChevronDown } from "@tabler/icons-react";

import { services } from "../../lib/solutions";
import ActionIcon from "../ui/ActionIcon/ActionIcon";

import styles from "./HeaderSolutionsDropdown.module.css";

import {
    IconAppWindow,
    IconBuilding,
    IconLayoutGrid,
    IconShoppingBag,
    IconPuzzle,
} from "@tabler/icons-react";

type Props = {
    onNavigate?: () => void;
};

function getSolutionIcon(id: string) {
    switch (id) {
        case "landingPage":
            return IconAppWindow;

        case "institucional":
            return IconBuilding;

        case "catalogo":
            return IconLayoutGrid;

        case "loja":
            return IconShoppingBag;

        default:
            return IconPuzzle;
    }
}

export default function HeaderSolutionsDropdown({ onNavigate }: Props) {
    const [open, setOpen] = useState(false);
    const rootRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const panelId = useId();
    const pathname = usePathname();

    const isActive = pathname === "/solucoes" || pathname.startsWith("/solucoes/");

    useEffect(() => {
        if (!open) return;

        function handlePointerDown(event: PointerEvent) {
            if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        }

        document.addEventListener("pointerdown", handlePointerDown);

        return () => {
            document.removeEventListener("pointerdown", handlePointerDown);
        };
    }, [open]);

    function closeAndNavigate() {
        setOpen(false);
        onNavigate?.();
    }

    return (
        <div
            ref={rootRef}
            className={styles.root}
            onKeyDown={(event) => {
                if (event.key === "Escape" && open) {
                    event.stopPropagation();
                    setOpen(false);
                    buttonRef.current?.focus();
                }
            }}
        >
            <Link
                href="/solucoes"
                className={styles.parent}
                aria-current={isActive ? "page" : undefined}
                onClick={closeAndNavigate}
            >
                Soluções
            </Link>

            <button
                ref={buttonRef}
                type="button"
                className={styles.toggle}
                aria-label={open ? "Fechar lista de soluções" : "Mostrar lista de soluções"}
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpen((current) => !current)}
            >
                <IconChevronDown
                    size={18}
                    stroke={1.7}
                    aria-hidden="true"
                    className={[styles.chevron, open ? styles.chevronOpen : ""]
                        .filter(Boolean)
                        .join(" ")}
                />
            </button>

            <div
                id={panelId}
                className={styles.panel}
                role="group"
                aria-label="Soluções disponíveis"
                hidden={!open}
            >
                {services.map((service) => {
                    const SolutionIcon = getSolutionIcon(service.id);

                    return (
                        <Link
                            key={service.id}
                            href={`/solucoes#${service.id}`}
                            className={styles.item}
                            onClick={closeAndNavigate}
                        >
                            <span className={styles.solutionIcon} aria-hidden="true">
                                <SolutionIcon size={23} stroke={1.6} />
                            </span>

                            <span className={styles.label}>{service.shortTitle}</span>

                            <ActionIcon variant="explore" size={19} stroke={1.6} />
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
