"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import ThemeSelector from "../ThemeStudio/ThemeSelector";
import BriefingLink from "../BriefingOverlay/BriefingLink";
import ActionIcon from "../ui/ActionIcon/ActionIcon";
import BrandLogo from "../BrandLogo/BrandLogo";
import { usePathname } from "next/navigation";
import HeaderSolutionsDropdown from "./HeaderSolutionsDropdown";

const navigation = [
    { label: "Início", href: "/" },
    { label: "Soluções", href: "/solucoes" },
    { label: "Projetos", href: "/projetos" },
    { label: "Sobre", href: "/sobre" },
];

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuButtonRef = useRef<HTMLButtonElement>(null);
    const pathname = usePathname();

    const isCurrentPage = (href: string) => {
        if (href === "/") {
            return pathname === "/";
        }

        return pathname === href || pathname.startsWith(`${href}/`);
    };

    return (
        <header
            className="site-header"
            onKeyDown={(event) => {
                if (event.key === "Escape" && menuOpen) {
                    setMenuOpen(false);
                    menuButtonRef.current?.focus();
                }
            }}
        >
            <div className="container header-inner">
                <BrandLogo animated />

                <nav className="desktop-nav" aria-label="Navegação principal">
                    {navigation.map((item) =>
                        item.href === "/solucoes" ? (
                            <HeaderSolutionsDropdown key={item.href} />
                        ) : (
                            <Link
                                key={item.href}
                                href={item.href}
                                aria-current={isCurrentPage(item.href) ? "page" : undefined}
                            >
                                {item.label}
                            </Link>
                        ),
                    )}
                </nav>

                <div className="header-actions">
                    <BriefingLink variant="primary" className="header-cta">
                        Solicitar orçamento
                    </BriefingLink>

                    {(process.env.NODE_ENV !== "development" ||
                        process.env.NEXT_PUBLIC_ENABLE_THEME_EDITOR !== "true") && (
                        <ThemeSelector />
                    )}

                    <button
                        ref={menuButtonRef}
                        type="button"
                        className={`mobile-menu-toggle${menuOpen ? " is-open" : ""}`}
                        aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
                        aria-expanded={menuOpen}
                        aria-controls="site-mobile-nav"
                        onClick={() => setMenuOpen((current) => !current)}
                    >
                        <span className="menu-lines" aria-hidden="true">
                            <span />
                            <span />
                            <span />
                        </span>
                    </button>
                </div>
            </div>

            <div id="site-mobile-nav" className="mobile-nav-panel" hidden={!menuOpen}>
                <nav className="container mobile-nav-inner" aria-label="Navegação mobile">
                    {navigation.map((item) =>
                        item.href === "/solucoes" ? (
                            <HeaderSolutionsDropdown
                                key={item.href}
                                onNavigate={() => setMenuOpen(false)}
                            />
                        ) : (
                            <Link
                                key={item.href}
                                href={item.href}
                                aria-current={isCurrentPage(item.href) ? "page" : undefined}
                                onClick={() => setMenuOpen(false)}
                            >
                                {item.label}
                            </Link>
                        ),
                    )}

                    <BriefingLink
                        variant="plain"
                        className="mobile-nav-cta"
                        onClick={() => setMenuOpen(false)}
                    >
                        Solicitar orçamento
                        <ActionIcon variant="briefing" size={22} />
                    </BriefingLink>
                </nav>
            </div>
        </header>
    );
}
