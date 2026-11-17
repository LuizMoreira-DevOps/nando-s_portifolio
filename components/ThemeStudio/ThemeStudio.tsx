"use client";

import { useEffect, useRef, useState } from "react";
import themeData from "../../design/theme-studio.json";
import styles from "./ThemeStudio.module.css";

type Appearance = "light" | "dark" | "system";
type ResolvedAppearance = "light" | "dark";
type Texture = "none" | "dots" | "grid" | "diagonal";
type ScrollMode = "off" | "soft" | "hybrid" | "reels";
type ColorKey =
    | "background"
    | "surface"
    | "text"
    | "muted"
    | "primary"
    | "secondary"
    | "tertiary"
    | "onPrimary"
    | "border";
type ColorSet = Record<ColorKey, string>;
type FontId = keyof typeof themeData.fonts;
type SpacingId = "compacto" | "equilibrado" | "amplo";
type PaletteId = keyof typeof themeData.palettes;

type GeometryKey =
    | "gutter"
    | "pageTop"
    | "pageBottom"
    | "sectionGap"
    | "blockGap"
    | "cardPadding"
    | "gridGap";
type GeometrySettings = Record<GeometryKey, number>;

/* Valores de referência para desktop; o editor aplica as proporções responsivas. */
const GEOMETRY_PRESETS: Record<SpacingId, GeometrySettings> = {
    compacto: {
        gutter: 32,
        pageTop: 48,
        pageBottom: 64,
        sectionGap: 72,
        blockGap: 48,
        cardPadding: 24,
        gridGap: 16,
    },
    equilibrado: {
        gutter: 40,
        pageTop: 64,
        pageBottom: 80,
        sectionGap: 88,
        blockGap: 60,
        cardPadding: 28,
        gridGap: 18,
    },
    amplo: {
        gutter: 80,
        pageTop: 60,
        pageBottom: 72,
        sectionGap: 96,
        blockGap: 64,
        cardPadding: 40,
        gridGap: 40,
    },
};
const GEOMETRY_CONTROLS: {
    key: GeometryKey;
    label: string;
    min: number;
    max: number;
    step: number;
}[] = [
    { key: "gutter", label: "Margem lateral", min: 24, max: 80, step: 4 },
    { key: "pageTop", label: "Respiro superior", min: 32, max: 120, step: 4 },
    { key: "pageBottom", label: "Respiro inferior", min: 40, max: 144, step: 4 },
    { key: "sectionGap", label: "Distância entre seções", min: 48, max: 160, step: 4 },
    { key: "blockGap", label: "Distância entre blocos", min: 32, max: 112, step: 4 },
    { key: "cardPadding", label: "Padding interno dos cartões", min: 16, max: 64, step: 4 },
    { key: "gridGap", label: "Distância entre cartões", min: 12, max: 40, step: 2 },
];

function geometryFor(spacing: SpacingId): GeometrySettings {
    return { ...GEOMETRY_PRESETS[spacing] };
}

type StudioSettings = {
    version: 4;
    scrollMode: ScrollMode;
    showLayoutGuides: boolean;
    appearance: Appearance;
    palette: PaletteId | "personalizado";
    colors: { light: ColorSet; dark: ColorSet };
    fonts: {
        heading: FontId;
        body: FontId;
        bodySize: number;
        lineHeight: number;
    };
    spacing: SpacingId;
    geometry: GeometrySettings;
    texture: Texture;
};

const STORAGE_KEY = "nando-theme-studio-v4";
const LEGACY_STORAGE_KEY = "nando-theme-studio-v3";
const HEX = /^#[0-9a-fA-F]{6}$/;
const COLOR_KEYS: ColorKey[] = [
    "primary",
    "secondary",
    "tertiary",
    "background",
    "surface",
    "text",
    "muted",
    "border",
    "onPrimary",
];
const COLOR_NAMES: Record<ColorKey, string> = {
    primary: "Primária (ações)",
    secondary: "Secundária (hierarquia)",
    tertiary: "Terciária (detalhes)",
    background: "Fundo da página",
    surface: "Superfícies e cartões",
    text: "Texto principal",
    muted: "Texto secundário",
    border: "Bordas e divisórias",
    onPrimary: "Texto sobre primária",
};
const FONT_NAMES: Record<FontId, string> = {
    system: "Sistema",
    verdana: "Verdana",
    arial: "Arial",
    trebuchet: "Trebuchet MS",
    georgia: "Georgia",
};
const SPACING_NAMES: Record<SpacingId, string> = {
    compacto: "Compacto",
    equilibrado: "Equilibrado",
    amplo: "Amplo",
};
const TEXTURE_NAMES: Record<Texture, string> = {
    none: "Sem textura",
    dots: "Pontos discretos",
    grid: "Grade suave",
    diagonal: "Linhas diagonais",
};

function initialSettings(): StudioSettings {
    return {
        version: 4,
        scrollMode: "reels",
        showLayoutGuides: false,
        appearance: "system",
        palette: "offwhite-azul-preto",
        colors: {
            light: { ...themeData.default.colors.light },
            dark: { ...themeData.default.colors.dark },
        },
        fonts: { heading: "trebuchet", body: "verdana", bodySize: 18, lineHeight: 1.5 },
        spacing: "amplo",
        geometry: geometryFor("amplo"),
        texture: "dots",
    };
}

function validMember<T extends string>(value: unknown, allowed: readonly T[]): value is T {
    return typeof value === "string" && allowed.includes(value as T);
}

function readSavedSettings(): StudioSettings | null {
    try {
        const raw = localStorage.getItem(STORAGE_KEY) ?? localStorage.getItem(LEGACY_STORAGE_KEY);
        const data: unknown = JSON.parse(raw ?? "null");
        if (!data || typeof data !== "object") return null;
        const saved = data as Partial<Omit<StudioSettings, "version">> & { version?: number };
        if (
            (saved.version !== 3 && saved.version !== 4) ||
            !saved.colors?.light ||
            !saved.colors?.dark ||
            !saved.fonts
        )
            return null;
        const defaults = initialSettings();
        const clean: StudioSettings = {
            ...defaults,
            scrollMode: validMember(saved.scrollMode, ["off", "soft", "hybrid", "reels"])
                ? saved.scrollMode
                : "off",
            showLayoutGuides: saved.showLayoutGuides === true,
            appearance: validMember(saved.appearance, ["light", "dark", "system"])
                ? saved.appearance
                : defaults.appearance,
            palette: validMember(saved.palette, [
                ...(Object.keys(themeData.palettes) as PaletteId[]),
                "personalizado",
            ])
                ? saved.palette
                : defaults.palette,
            spacing: validMember(saved.spacing, Object.keys(GEOMETRY_PRESETS) as SpacingId[])
                ? saved.spacing
                : defaults.spacing,
            texture: validMember(saved.texture, ["none", "dots", "grid", "diagonal"])
                ? saved.texture
                : defaults.texture,
            colors: { light: { ...defaults.colors.light }, dark: { ...defaults.colors.dark } },
            fonts: { ...defaults.fonts },
            geometry: geometryFor(
                validMember(saved.spacing, Object.keys(GEOMETRY_PRESETS) as SpacingId[])
                    ? saved.spacing
                    : defaults.spacing,
            ),
        };
        for (const mode of ["light", "dark"] as const) {
            for (const key of COLOR_KEYS) {
                const candidate = saved.colors[mode][key];
                if (typeof candidate === "string" && HEX.test(candidate)) {
                    clean.colors[mode][key] = candidate.toUpperCase();
                }
            }
        }
        for (const field of ["heading", "body"] as const) {
            if (validMember(saved.fonts[field], Object.keys(themeData.fonts) as FontId[])) {
                clean.fonts[field] = saved.fonts[field];
            }
        }
        if (
            typeof saved.fonts.bodySize === "number" &&
            saved.fonts.bodySize >= 15 &&
            saved.fonts.bodySize <= 20
        ) {
            clean.fonts.bodySize = saved.fonts.bodySize;
        }
        if (
            typeof saved.fonts.lineHeight === "number" &&
            saved.fonts.lineHeight >= 1.4 &&
            saved.fonts.lineHeight <= 1.9
        ) {
            clean.fonts.lineHeight = saved.fonts.lineHeight;
        }
        const candidateGeometry = saved.geometry as Partial<GeometrySettings> | undefined;
        if (candidateGeometry && typeof candidateGeometry === "object") {
            for (const control of GEOMETRY_CONTROLS) {
                const value = candidateGeometry[control.key];
                if (
                    typeof value === "number" &&
                    Number.isFinite(value) &&
                    value >= control.min &&
                    value <= control.max
                ) {
                    clean.geometry[control.key] = value;
                }
            }
        }
        return clean;
    } catch {
        return null;
    }
}

/* Compatibilidade dos controles salvos: a proporção responsiva existe somente
   no editor ativo. O site público usa os pixels explícitos de spacing.css. */
function responsiveGeometry(key: GeometryKey, value: number): number {
    const tablet: Record<GeometryKey, [number, number, number]> = {
        gutter: [24, 0.75, 40],
        pageTop: [44, 0.8, 88],
        pageBottom: [56, 0.8, 104],
        sectionGap: [52, 0.8, 112],
        blockGap: [36, 0.8, 88],
        cardPadding: [22, 0.9, 48],
        gridGap: [14, 0.9, 32],
    };
    const mobile: Record<GeometryKey, [number, number, number]> = {
        gutter: [16, 0.42, 24],
        pageTop: [32, 0.56, 64],
        pageBottom: [44, 0.67, 84],
        sectionGap: [40, 0.67, 92],
        blockGap: [24, 0.67, 72],
        cardPadding: [18, 0.75, 36],
        gridGap: [12, 0.8, 26],
    };
    const range = window.matchMedia("(max-width: 600px)").matches
        ? mobile[key]
        : window.matchMedia("(max-width: 1050px)").matches
          ? tablet[key]
          : null;
    return range ? Math.min(range[2], Math.max(range[0], value * range[1])) : value;
}

function applyToDocument(settings: StudioSettings, appearance: ResolvedAppearance) {
    const root = document.documentElement;
    const colors = settings.colors[appearance];
    const cssColors: Record<ColorKey, string> = {
        ...colors,
    };
    for (const [key, value] of Object.entries(cssColors)) {
        root.style.setProperty(`--color-${key === "onPrimary" ? "on-primary" : key}`, value);
    }

    for (const [key, value] of Object.entries(settings.geometry)) {
        const name = key.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
        root.style.setProperty(
            `--layout-${name}`,
            `${responsiveGeometry(key as GeometryKey, value)}px`,
        );
    }
    root.style.setProperty("--font-heading", themeData.fonts[settings.fonts.heading]);
    root.style.setProperty("--font-body", themeData.fonts[settings.fonts.body]);
    root.style.setProperty("--font-size-body", `${settings.fonts.bodySize}px`);
    root.style.setProperty("--line-height-body", String(settings.fonts.lineHeight));
    root.dataset.siteMode = appearance;
    root.dataset.siteTexture = settings.texture;
    root.dataset.scrollMode = settings.scrollMode;
    root.dataset.layoutGuides = settings.showLayoutGuides ? "on" : "off";
}

function contrastRatio(foreground: string, background: string): number {
    function luminance(hex: string): number {
        const channels = [1, 3, 5].map((index) => {
            const value = parseInt(hex.slice(index, index + 2), 16) / 255;
            return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
        });
        return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
    }
    const a = luminance(foreground);
    const b = luminance(background);
    return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}

type ColorFieldProps = {
    field: ColorKey;
    value: string;
    onChange: (value: string) => void;
};

function ColorField({ field, value, onChange }: ColorFieldProps) {
    const [draft, setDraft] = useState(value);
    return (
        <label className={styles.colorField}>
            <span>{COLOR_NAMES[field]}</span>
            <span className={styles.colorControls}>
                <input
                    className={styles.colorPicker}
                    type="color"
                    value={value}
                    onChange={(event) => {
                        setDraft(event.target.value.toUpperCase());
                        onChange(event.target.value.toUpperCase());
                    }}
                    aria-label={`Escolher cor: ${COLOR_NAMES[field]}`}
                />
                <input
                    className={styles.hexInput}
                    type="text"
                    value={draft}
                    maxLength={7}
                    spellCheck={false}
                    aria-label={`Código hexadecimal: ${COLOR_NAMES[field]}`}
                    onChange={(event) => {
                        const next = event.target.value;
                        setDraft(next);
                        if (HEX.test(next)) onChange(next.toUpperCase());
                    }}
                    onBlur={() => setDraft(value)}
                />
            </span>
        </label>
    );
}

export default function ThemeStudio() {
    const [settings, setSettings] = useState<StudioSettings>(() => {
        if (typeof window === "undefined") return initialSettings();
        return readSavedSettings() ?? initialSettings();
    });
    const [systemDark, setSystemDark] = useState(
        () =>
            typeof window !== "undefined" &&
            window.matchMedia("(prefers-color-scheme: dark)").matches,
    );
    const [open, setOpen] = useState(false);
    const [colorVersion, setColorVersion] = useState(0);
    const [feedback, setFeedback] = useState("");
    const toggleRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const media = window.matchMedia("(prefers-color-scheme: dark)");
        const onChange = (event: MediaQueryListEvent) => setSystemDark(event.matches);
        media.addEventListener("change", onChange);
        return () => media.removeEventListener("change", onChange);
    }, []);

    const resolved: ResolvedAppearance =
        settings.appearance === "system" ? (systemDark ? "dark" : "light") : settings.appearance;
    const currentColors = settings.colors[resolved];

    useEffect(() => {
        const apply = () => applyToDocument(settings, resolved);
        apply();
        window.addEventListener("resize", apply);
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
        } catch {
            /* armazenamento opcional */
        }
        return () => window.removeEventListener("resize", apply);
    }, [settings, resolved]);

    function updateColor(field: ColorKey, value: string) {
        setSettings((current) => ({
            ...current,
            palette: "personalizado",
            colors: {
                ...current.colors,
                [resolved]: { ...current.colors[resolved], [field]: value },
            },
        }));
        setFeedback("");
    }

    function applyPalette(value: string) {
        if (!(value in themeData.palettes)) return;
        const name = value as PaletteId;
        setSettings((current) => ({
            ...current,
            palette: name,
            colors: {
                light: { ...themeData.palettes[name].light },
                dark: { ...themeData.palettes[name].dark },
            },
        }));
        setColorVersion((version) => version + 1);
        setFeedback("");
    }

    function reset() {
        setSettings(initialSettings());
        setColorVersion((version) => version + 1);
        setFeedback("Configuração inicial restaurada.");
    }

    async function copyJson() {
        try {
            await navigator.clipboard.writeText(
                JSON.stringify(
                    {
                        ...settings,
                        resolvedAppearance: resolved,
                    },
                    null,
                    2,
                ),
            );
            setFeedback("JSON copiado. Cole-o em um arquivo para guardar esta versão.");
        } catch {
            setFeedback("Cópia automática indisponível. Selecione o texto no campo abaixo.");
        }
    }

    const outputJson = JSON.stringify({ ...settings, resolvedAppearance: resolved }, null, 2);
    const textContrast = contrastRatio(currentColors.text, currentColors.background);
    const buttonContrast = contrastRatio(currentColors.onPrimary, currentColors.primary);
    const warnings = [
        textContrast < 4.5 ? `Texto/fundo: ${textContrast.toFixed(2)}:1` : null,
        buttonContrast < 4.5 ? `Botão principal: ${buttonContrast.toFixed(2)}:1` : null,
        contrastRatio(currentColors.secondary, currentColors.background) < 4.5
            ? "Cor secundária tem baixo contraste no fundo"
            : null,
        contrastRatio(currentColors.muted, currentColors.surface) < 4.5
            ? "Texto secundário tem baixo contraste nos cartões"
            : null,
        contrastRatio(currentColors.text, currentColors.surface) < 4.5
            ? "Texto principal tem baixo contraste nos cartões"
            : null,
    ].filter(Boolean);

    return (
        <div
            className={styles.studio}
            data-scroll-exempt="true"
            data-open={open}
            onKeyDown={(event) => {
                if (event.key === "Escape" && open) {
                    setOpen(false);
                    toggleRef.current?.focus();
                }
            }}
        >
            {open && (
                <aside
                    id="theme-studio-panel"
                    className={styles.panel}
                    aria-label="Editor de identidade visual"
                >
                    <div className={styles.panelHeader}>
                        <div>
                            <p className={styles.kicker}>EXPERIMENTAÇÃO VISUAL</p>
                            <h2>Editar identidade</h2>
                            <p>Alterações aplicadas em todas as páginas.</p>
                        </div>
                        <button
                            className={styles.close}
                            type="button"
                            onClick={() => setOpen(false)}
                            aria-label="Fechar editor"
                        >
                            ×
                        </button>
                    </div>

                    <div className={styles.panelBody}>
                        <fieldset className={styles.group}>
                            <legend>1. Aparência</legend>
                            <label className={styles.field}>
                                Modo de exibição
                                <select
                                    value={settings.appearance}
                                    onChange={(event) =>
                                        setSettings((s) => ({
                                            ...s,
                                            appearance: event.target.value as Appearance,
                                        }))
                                    }
                                >
                                    <option value="system">Sistema</option>
                                    <option value="light">Claro</option>
                                    <option value="dark">Escuro</option>
                                </select>
                            </label>
                            <p className={styles.hint}>
                                Tema em uso: {resolved === "dark" ? "escuro" : "claro"}.
                            </p>
                        </fieldset>

                        <fieldset className={styles.group}>
                            <legend>2. Espaçamento</legend>
                            <label className={styles.field}>
                                Densidade da interface
                                <select
                                    value={settings.spacing}
                                    onChange={(event) =>
                                        setSettings((s) => ({
                                            ...s,
                                            spacing: event.target.value as SpacingId,
                                            geometry: geometryFor(event.target.value as SpacingId),
                                        }))
                                    }
                                >
                                    {(Object.keys(GEOMETRY_PRESETS) as SpacingId[]).map((value) => (
                                        <option key={value} value={value}>
                                            {SPACING_NAMES[value]}
                                        </option>
                                    ))}
                                </select>
                            </label>
                            <p className={styles.hint}>
                                Os presets são pontos de partida. Escolher outro preset redefine os
                                controles abaixo.
                            </p>
                            <div className={styles.geometryControls}>
                                {GEOMETRY_CONTROLS.map(({ key, label, min, max, step }) => (
                                    <label className={styles.geometryRange} key={key}>
                                        <span className={styles.geometryRangeHeading}>
                                            <span>{label}</span>
                                            <output>{settings.geometry[key]}px</output>
                                        </span>
                                        <input
                                            type="range"
                                            min={min}
                                            max={max}
                                            step={step}
                                            value={settings.geometry[key]}
                                            onChange={(event) =>
                                                setSettings((current) => ({
                                                    ...current,
                                                    geometry: {
                                                        ...current.geometry,
                                                        [key]: Number(event.target.value),
                                                    },
                                                }))
                                            }
                                        />
                                    </label>
                                ))}
                            </div>
                            <p className={styles.hint}>
                                Valores de referência para desktop. Tablet e celular recebem
                                proporções responsivas, sem reduzir o texto nem forçar cartões a
                                caber em uma tela.
                            </p>
                            <button
                                type="button"
                                className={styles.geometryReset}
                                onClick={() =>
                                    setSettings((current) => ({
                                        ...current,
                                        geometry: geometryFor(current.spacing),
                                    }))
                                }
                            >
                                Restaurar somente os espaçamentos
                            </button>
                        </fieldset>

                        <fieldset className={styles.group}>
                            <legend>3. Tipografia</legend>
                            <label className={styles.field}>
                                Fonte dos títulos
                                <select
                                    value={settings.fonts.heading}
                                    onChange={(event) =>
                                        setSettings((s) => ({
                                            ...s,
                                            fonts: {
                                                ...s.fonts,
                                                heading: event.target.value as FontId,
                                            },
                                        }))
                                    }
                                >
                                    {(Object.keys(themeData.fonts) as FontId[]).map((id) => (
                                        <option key={id} value={id}>
                                            {FONT_NAMES[id]}
                                        </option>
                                    ))}
                                </select>
                            </label>
                            <label className={styles.field}>
                                Fonte dos textos
                                <select
                                    value={settings.fonts.body}
                                    onChange={(event) =>
                                        setSettings((s) => ({
                                            ...s,
                                            fonts: {
                                                ...s.fonts,
                                                body: event.target.value as FontId,
                                            },
                                        }))
                                    }
                                >
                                    {(Object.keys(themeData.fonts) as FontId[]).map((id) => (
                                        <option key={id} value={id}>
                                            {FONT_NAMES[id]}
                                        </option>
                                    ))}
                                </select>
                            </label>
                            <label className={styles.rangeLabel}>
                                Tamanho do corpo: {settings.fonts.bodySize}px
                                <input
                                    type="range"
                                    min={15}
                                    max={20}
                                    step={1}
                                    value={settings.fonts.bodySize}
                                    onChange={(event) =>
                                        setSettings((s) => ({
                                            ...s,
                                            fonts: {
                                                ...s.fonts,
                                                bodySize: Number(event.target.value),
                                            },
                                        }))
                                    }
                                />
                            </label>
                            <label className={styles.rangeLabel}>
                                Entrelinhas: {settings.fonts.lineHeight.toFixed(1)}
                                <input
                                    type="range"
                                    min={1.4}
                                    max={1.9}
                                    step={0.1}
                                    value={settings.fonts.lineHeight}
                                    onChange={(event) =>
                                        setSettings((s) => ({
                                            ...s,
                                            fonts: {
                                                ...s.fonts,
                                                lineHeight: Number(event.target.value),
                                            },
                                        }))
                                    }
                                />
                            </label>
                        </fieldset>

                        <fieldset className={styles.group}>
                            <legend>4. Cores</legend>
                            <label className={styles.field}>
                                Paleta de partida
                                <select
                                    value={settings.palette}
                                    onChange={(event) => applyPalette(event.target.value)}
                                >
                                    {settings.palette === "personalizado" && (
                                        <option value="personalizado">Personalizada</option>
                                    )}
                                    {(
                                        Object.entries(themeData.palettes) as [
                                            PaletteId,
                                            (typeof themeData.palettes)[PaletteId],
                                        ][]
                                    ).map(([id, entry]) => (
                                        <option value={id} key={id}>
                                            {entry.label}
                                        </option>
                                    ))}
                                </select>
                            </label>
                            <p className={styles.hint}>
                                Editando as cores do modo{" "}
                                {resolved === "light" ? "claro" : "escuro"}. Os dois modos guardam
                                cores próprias.
                            </p>
                            <div className={styles.colorFields}>
                                {COLOR_KEYS.map((field) => (
                                    <ColorField
                                        key={`${resolved}-${field}-${colorVersion}`}
                                        field={field}
                                        value={currentColors[field]}
                                        onChange={(value) => updateColor(field, value)}
                                    />
                                ))}
                            </div>
                            {warnings.length > 0 ? (
                                <p className={styles.warning} role="status">
                                    Contraste abaixo de 4,5:1: {warnings.join("; ")}. Teste a
                                    legibilidade antes de aprovar.
                                </p>
                            ) : (
                                <p className={styles.hint}>
                                    Contraste das combinações principais de texto: pelo menos 4,5:1.
                                </p>
                            )}
                        </fieldset>

                        <fieldset className={styles.group}>
                            <legend>5. Fundo e textura</legend>
                            <label className={styles.field}>
                                Tratamento do fundo
                                <select
                                    value={settings.texture}
                                    onChange={(event) =>
                                        setSettings((s) => ({
                                            ...s,
                                            texture: event.target.value as Texture,
                                        }))
                                    }
                                >
                                    {(Object.keys(TEXTURE_NAMES) as Texture[]).map((id) => (
                                        <option key={id} value={id}>
                                            {TEXTURE_NAMES[id]}
                                        </option>
                                    ))}
                                </select>
                            </label>
                            <p className={styles.hint}>
                                A cor do fundo e dos cartões pode ser ajustada na seção Cores.
                            </p>
                        </fieldset>

                        <fieldset className={styles.group}>
                            <legend>6. Navegação e rolagem</legend>
                            <label className={styles.field} htmlFor="studio-scroll-mode">
                                Encaixe entre blocos de conteúdo
                                <select
                                    id="studio-scroll-mode"
                                    value={settings.scrollMode}
                                    onChange={(event) =>
                                        setSettings((current) => ({
                                            ...current,
                                            scrollMode: event.target.value as ScrollMode,
                                        }))
                                    }
                                >
                                    <option value="off">Desativado (padrão)</option>
                                    <option value="soft">Suave: pontos principais</option>
                                    <option value="hybrid">Híbrido: mais pontos de leitura</option>
                                    <option value="reels">Reels: seção por seção (firme)</option>
                                </select>
                            </label>
                            <p className={styles.hint}>
                                O encaixe acontece ao terminar ou desacelerar a rolagem, conforme o
                                navegador. No modo Reels, o navegador encaixa no próximo painel e
                                evita saltar pontos de leitura. Textos e formulários longos
                                continuam percorríveis. A preferência por movimento reduzido sempre
                                desativa o efeito.
                            </p>
                            <label className={styles.guideToggle}>
                                <input
                                    type="checkbox"
                                    checked={settings.showLayoutGuides}
                                    onChange={(event) =>
                                        setSettings((current) => ({
                                            ...current,
                                            showLayoutGuides: event.target.checked,
                                        }))
                                    }
                                />
                                Exibir contornos dos pontos de leitura
                            </label>
                            <p className={styles.hint}>
                                Guias disponíveis somente no editor de desenvolvimento. Não alteram
                                o tamanho dos componentes.
                            </p>
                        </fieldset>

                        <div className={styles.saveArea}>
                            <button type="button" className={styles.export} onClick={copyJson}>
                                Copiar JSON
                            </button>
                            <button type="button" className={styles.reset} onClick={reset}>
                                Restaurar padrão
                            </button>
                            <details className={styles.jsonDetails}>
                                <summary>Ver JSON da configuração</summary>
                                <textarea
                                    readOnly
                                    aria-label="JSON da configuração visual"
                                    value={outputJson}
                                    rows={7}
                                />
                            </details>
                            <p className={styles.hint} role="status">
                                {feedback ||
                                    "Prévia salva apenas neste navegador. Nenhum arquivo do projeto é alterado."}
                            </p>
                        </div>
                    </div>
                </aside>
            )}
            <button
                ref={toggleRef}
                className={styles.toggle}
                type="button"
                onClick={() => setOpen((value) => !value)}
                aria-expanded={open}
                aria-controls="theme-studio-panel"
                aria-label={open ? "Fechar edição visual" : "Abrir edição visual"}
            >
                <span aria-hidden="true">◈</span>
                <span className={styles.toggleLabel}>
                    {open ? "Fechar editor" : "Editar visual"}
                </span>
            </button>
        </div>
    );
}
