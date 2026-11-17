"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import approved from "../../design/approved-themes.json";
import styles from "./ThemeSelector.module.css";
import { IconPalette } from "@tabler/icons-react";

type Family = "green" | "blue";
type Appearance = "light" | "dark" | "system";
type ThemeChoice = `${Family}-${Appearance}`;

const STORAGE_KEY = "nando-theme-preset-v1";
const CHANGE_EVENT = "nando-theme-change";
const DEFAULT_CHOICE: ThemeChoice = "blue-light";
const FAMILIES: Family[] = ["green", "blue"];
const APPEARANCES: { id: Appearance; label: string }[] = [
    { id: "light", label: "Claro" },
    { id: "dark", label: "Escuro" },
    { id: "system", label: "Sistema" },
];

let sessionChoice: ThemeChoice | null = null;

function isThemeChoice(candidate: string | null): candidate is ThemeChoice {
    return /^(green|blue)-(light|dark|system)$/.test(candidate ?? "");
}

function getSnapshot(): ThemeChoice {
    if (sessionChoice !== null) return sessionChoice;

    try {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        return isThemeChoice(stored) ? stored : DEFAULT_CHOICE;
    } catch {
        return DEFAULT_CHOICE;
    }
}

function getServerSnapshot(): ThemeChoice {
    return DEFAULT_CHOICE;
}

function subscribe(callback: () => void): () => void {
    window.addEventListener("storage", callback);
    window.addEventListener(CHANGE_EVENT, callback);
    return () => {
        window.removeEventListener("storage", callback);
        window.removeEventListener(CHANGE_EVENT, callback);
    };
}

function applyChoice(choice: ThemeChoice) {
    const [family, appearance] = choice.split("-") as [Family, Appearance];
    const resolved =
        appearance === "system"
            ? window.matchMedia("(prefers-color-scheme: dark)").matches
                ? "dark"
                : "light"
            : appearance;

    const root = document.documentElement;
    root.dataset.themeFamily = family;
    root.dataset.siteMode = resolved;
    root.dataset.siteTexture = "dots";
}

export default function ThemeSelector() {
    const selected = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
    const [open, setOpen] = useState(false);
    const pickerRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);

    // Também acompanha mudanças no tema do sistema operacional quando necessário.
    useEffect(() => {
        const media = window.matchMedia("(prefers-color-scheme: dark)");
        // Lê a preferência atual para evitar um flash do tema padrão na hidratação.
        const onChange = () => applyChoice(getSnapshot());
        onChange();
        media.addEventListener("change", onChange);
        return () => media.removeEventListener("change", onChange);
    }, [selected]);

    useEffect(() => {
        if (!open) return;
        function dismiss(event: PointerEvent) {
            if (event.target instanceof Node && !pickerRef.current?.contains(event.target)) {
                setOpen(false);
            }
        }
        document.addEventListener("pointerdown", dismiss);
        return () => document.removeEventListener("pointerdown", dismiss);
    }, [open]);

    function choose(choice: ThemeChoice) {
        try {
            window.localStorage.setItem(STORAGE_KEY, choice);
            sessionChoice = null;
        } catch {
            sessionChoice = choice;
        }

        window.dispatchEvent(new Event(CHANGE_EVENT));

        applyChoice(choice);
        setOpen(false);
        triggerRef.current?.focus();
    }

    const [family, appearance] = selected.split("-") as [Family, Appearance];
    const selectionLabel = `${approved.palettes[family].name}, ${appearance === "system" ? "sistema" : appearance === "light" ? "claro" : "escuro"}`;

    return (
        <div
            className={`${styles.picker} theme-picker`}
            ref={pickerRef}
            data-scroll-exempt="true"
            onKeyDown={(event) => {
                if (event.key === "Escape" && open) {
                    event.stopPropagation();
                    setOpen(false);
                    triggerRef.current?.focus();
                }
            }}
        >
            <button
                className={`${styles.trigger} theme-trigger`}
                type="button"
                ref={triggerRef}
                onClick={() => setOpen((value) => !value)}
                aria-label={`Selecionar tema. Atual: ${selectionLabel}`}
                aria-expanded={open}
                aria-controls="site-theme-options"
                title={`Tema: ${selectionLabel}`}
            >
                <IconPalette
                    size={22}
                    stroke={1.7}
                    className={styles.paletteIcon}
                    aria-hidden="true"
                />
            </button>
            {open && (
                <div
                    id="site-theme-options"
                    className={`${styles.panel} theme-panel`}
                    aria-label="Escolher tema visual"
                >
                    <div className={styles.panelHeading}>
                        <strong>Aparência</strong>
                        <span>Escolha uma combinação aprovada</span>
                    </div>
                    {FAMILIES.map((colorFamily) => {
                        const palette = approved.palettes[colorFamily];
                        return (
                            <section
                                key={colorFamily}
                                className={styles.family}
                                aria-label={`Paleta ${palette.name}`}
                            >
                                <h3>{palette.name}</h3>
                                <div className={styles.options}>
                                    {APPEARANCES.map(({ id, label }) => {
                                        const choice: ThemeChoice = `${colorFamily}-${id}`;
                                        const isSelected = selected === choice;
                                        const preview = palette[id === "dark" ? "dark" : "light"];
                                        const previewDark = palette.dark;
                                        return (
                                            <button
                                                type="button"
                                                key={choice}
                                                className={styles.option}
                                                data-selected={isSelected}
                                                aria-pressed={isSelected}
                                                onClick={() => choose(choice)}
                                                title={`${palette.name} ${label}`}
                                            >
                                                <span
                                                    className={styles.preview}
                                                    style={{
                                                        background:
                                                            id === "system"
                                                                ? `linear-gradient(90deg, ${palette.light.background} 50%, ${previewDark.background} 50%)`
                                                                : preview.background,
                                                        borderColor: preview.border,
                                                    }}
                                                >
                                                    <span
                                                        className={styles.previewAccent}
                                                        style={{
                                                            background:
                                                                id === "system"
                                                                    ? `linear-gradient(90deg, ${palette.light.primary} 50%, ${previewDark.primary} 50%)`
                                                                    : preview.primary,
                                                        }}
                                                    />
                                                    {isSelected && (
                                                        <span
                                                            className={styles.selectedMark}
                                                            aria-hidden="true"
                                                        >
                                                            ✓
                                                        </span>
                                                    )}
                                                </span>
                                                <span className={styles.optionLabel}>{label}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </section>
                        );
                    })}
                    <p className={styles.note}>
                        O modo Sistema acompanha o claro/escuro do seu dispositivo. A escolha fica
                        salva neste navegador.
                    </p>
                </div>
            )}
        </div>
    );
}
