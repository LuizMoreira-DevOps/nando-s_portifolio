"use client";

import { Children, useEffect, useId, useRef, useState } from "react";
import type { ReactNode } from "react";

type CarouselVariant = "services" | "projects";

type ContentCarouselProps = {
    children: ReactNode;
    label: string;
    variant: CarouselVariant;
};

function Arrow({ direction }: { direction: "left" | "right" }) {
    return (
        <svg
            aria-hidden="true"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            {direction === "left" ? (
                <path d="m14 5-7 7 7 7M7 12h13" />
            ) : (
                <path d="m10 5 7 7-7 7M17 12H4" />
            )}
        </svg>
    );
}

export default function ContentCarousel({ children, label, variant }: ContentCarouselProps) {
    const slides = Children.toArray(children);
    const viewportId = useId();
    const viewportRef = useRef<HTMLDivElement>(null);
    const [navigation, setNavigation] = useState({
        active: 0,
        previous: false,
        next: slides.length > 1,
    });
    const [announcement, setAnnouncement] = useState("");

    useEffect(() => {
        const viewport = viewportRef.current;
        if (!viewport) return;

        const sync = () => {
            const items = Array.from(viewport.children) as HTMLElement[];
            const currentLeft = viewport.scrollLeft;
            const maxScroll = Math.max(0, viewport.scrollWidth - viewport.clientWidth);
            const atEnd = maxScroll - currentLeft <= 3;
            let active = 0;
            let distance = Number.POSITIVE_INFINITY;

            for (let i = 0; i < items.length; i += 1) {
                const left =
                    items[i].getBoundingClientRect().left -
                    viewport.getBoundingClientRect().left +
                    currentLeft;
                const delta = Math.abs(left - currentLeft);
                if (delta < distance) {
                    distance = delta;
                    active = i;
                }
            }
            if (atEnd && maxScroll > 3) active = Math.max(0, items.length - 1);
            setNavigation({ active, previous: currentLeft > 3, next: maxScroll - currentLeft > 3 });
        };

        sync();
        viewport.addEventListener("scroll", sync, { passive: true });
        const observer = new ResizeObserver(sync);
        observer.observe(viewport);
        Array.from(viewport.children).forEach((item) => observer.observe(item));
        return () => {
            viewport.removeEventListener("scroll", sync);
            observer.disconnect();
        };
    }, [slides.length]);

    const goTo = (direction: -1 | 1) => {
        const viewport = viewportRef.current;
        if (!viewport) return;

        const items = Array.from(viewport.children) as HTMLElement[];

        if (items.length === 0) return;

        const currentLeft = viewport.scrollLeft;

        const maxScroll = Math.max(0, viewport.scrollWidth - viewport.clientWidth);

        const viewportLeft = viewport.getBoundingClientRect().left;

        const scrollPadding = parseFloat(window.getComputedStyle(viewport).scrollPaddingLeft) || 0;

        const positions = items.map((item, index) => ({
            index,
            left: Math.min(
                maxScroll,
                Math.max(
                    0,
                    item.getBoundingClientRect().left - viewportLeft + currentLeft - scrollPadding,
                ),
            ),
        }));

        const target =
            direction === 1
                ? positions.find((item) => item.left > currentLeft + 3)
                : [...positions].reverse().find((item) => item.left < currentLeft - 3);

        if (!target) return;

        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        viewport.scrollTo({
            left: target.left,
            behavior: reduceMotion ? "instant" : "smooth",
        });

        const targetIndex =
            maxScroll > 3 && maxScroll - target.left <= 3 ? items.length - 1 : target.index;

        setAnnouncement(`${label}: item ${targetIndex + 1} de ${items.length}`);
    };

    return (
        <div className={`content-carousel content-carousel--${variant}`} data-scroll-exempt>
            <div
                className="content-carousel-toolbar"
                role="group"
                aria-label={`Navegação do carrossel: ${label}`}
            >
                <span className="content-carousel-counter" aria-hidden="true">
                    <strong>{String(navigation.active + 1).padStart(2, "0")}</strong>
                    <span> / {String(slides.length).padStart(2, "0")}</span>
                </span>
                <div className="content-carousel-actions">
                    <button
                        type="button"
                        className="content-carousel-arrow"
                        aria-label={`Anterior: ${label}`}
                        aria-controls={viewportId}
                        disabled={!navigation.previous}
                        onClick={() => goTo(-1)}
                    >
                        <Arrow direction="left" />
                    </button>
                    <button
                        type="button"
                        className="content-carousel-arrow"
                        aria-label={`Próximo: ${label}`}
                        aria-controls={viewportId}
                        disabled={!navigation.next}
                        onClick={() => goTo(1)}
                    >
                        <Arrow direction="right" />
                    </button>
                </div>
            </div>

            <div
                id={viewportId}
                className="content-carousel-viewport"
                ref={viewportRef}
                tabIndex={0}
                role="region"
                aria-roledescription="carrossel"
                aria-label={label}
            >
                {slides.map((slide, index) => (
                    <div
                        className="content-carousel-slide"
                        role="group"
                        aria-roledescription="slide"
                        aria-label={`${index + 1} de ${slides.length}`}
                        key={index}
                    >
                        {slide}
                    </div>
                ))}
            </div>
            <span className="visually-hidden" role="status" aria-live="polite" aria-atomic="true">
                {announcement}
            </span>
            <p className="content-carousel-hint">
                Use as setas ou deslize horizontalmente para explorar.
            </p>
        </div>
    );
}
