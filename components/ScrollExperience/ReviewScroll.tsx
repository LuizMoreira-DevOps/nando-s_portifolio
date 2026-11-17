"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

/** Inspeção e snap nativo de proximidade; não intercepta wheel nem toque. */
export default function ReviewScroll({ showControls = false }: { showControls?: boolean }) {
    const pathname = usePathname();
    const [reels, setReels] = useState(true);
    const [guides, setGuides] = useState(false);
    const [anchors, setAnchors] = useState<{ id: string; label: string }[]>([]);
    useEffect(() => {
        const root = document.documentElement;
        const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-review-id]"));
        const frame = requestAnimationFrame(() =>
            setAnchors(
                sections
                    .filter((x) => !!x.id)
                    .map((section) => ({
                        id: section.id,
                        label: section.dataset.reviewId ?? section.id,
                    })),
            ),
        );
        const header = document.querySelector<HTMLElement>(".site-header");
        const panels = Array.from(document.querySelectorAll<HTMLElement>("[data-reels-panel]"));
        const measure = () => {
            const offset = header?.getBoundingClientRect().height ?? 84;
            root.style.setProperty("--layout-scroll-offset", `${offset}px`);
            for (const panel of panels) {
                const styles = getComputedStyle(panel);
                const height = panel.getBoundingClientRect().height;
                panel.dataset.snapFits = String(
                    styles.display !== "none" && height <= window.innerHeight - offset - 7,
                );
            }
        };
        const observer = new ResizeObserver(measure);
        if (header) observer.observe(header);
        panels.forEach((panel) => observer.observe(panel));
        window.addEventListener("resize", measure);
        measure();
        return () => {
            cancelAnimationFrame(frame);
            observer.disconnect();
            window.removeEventListener("resize", measure);
        };
    }, [pathname]);
    useEffect(() => {
        const root = document.documentElement;
        root.dataset.scrollMode = reels && pathname === "/" ? "reels" : "off";
        root.dataset.uxReview = String(guides);
        return () => {
            root.dataset.scrollMode = "off";
            root.dataset.uxReview = "false";
        };
    }, [reels, guides, pathname]);
    if (!showControls) return null;
    return (
        <details className="ux-review" data-scroll-exempt>
            <summary>Revisão UX</summary>
            <div className="ux-review-controls">
                <label>
                    <input
                        type="checkbox"
                        checked={guides}
                        onChange={(event) => setGuides(event.target.checked)}
                    />{" "}
                    IDs e contornos
                </label>
                <label htmlFor="ux-scroll">Rolagem da Home</label>
                <select
                    id="ux-scroll"
                    value={reels ? "reels" : "native"}
                    onChange={(event) => setReels(event.target.value === "reels")}
                >
                    <option value="reels">Snap suave · painéis compactos</option>
                    <option value="native">Rolagem nativa · livre</option>
                </select>
                <p>
                    {pathname === "/"
                        ? "Seções que cabem na área útil usam snap suave. Conteúdos extensos rolam livremente."
                        : "Nesta página a rolagem é livre. Carrossel e linha do tempo são independentes."}
                </p>
                <nav aria-label="Âncoras de revisão">
                    {anchors.map((anchor) => (
                        <a key={anchor.id} href={`#${anchor.id}`}>
                            {anchor.label}
                        </a>
                    ))}
                </nav>
            </div>
        </details>
    );
}
