import type { Metadata } from "next";
import type { ReactNode } from "react";

import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import ThemeStudio from "../components/ThemeStudio/ThemeStudio";
import ScrollExperience from "../components/ScrollExperience/ReviewScroll";
import BriefingProvider from "../components/BriefingOverlay/BriefingProvider";

import "./globals.css";

export const metadata: Metadata = {
    title: "Nando Moreira | Desenvolvedor de Software",
    description:
        "Desenvolvimento de sites, catálogos digitais e aplicações web para pessoas e negócios.",
};

// Aplica a preferência salva antes da pintura inicial para evitar flashes entre
// temas claro/escuro. A lista de identificadores é fechada e validada.
const themeBootstrap = `(function () {
  try {
    var selected = localStorage.getItem("nando-theme-preset-v1") || "blue-light";
    if (!/^(green|blue)-(light|dark|system)$/.test(selected)) selected = "blue-light";
    var parts = selected.split("-");
    var mode = parts[1] === "system"
      ? (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
      : parts[1];
    document.documentElement.dataset.themeFamily = parts[0];
    document.documentElement.dataset.siteMode = mode;
  } catch (error) { /* Preferências opcionais: fallback azul claro do HTML. */ }
})();`;

export default function RootLayout({ children }: { children: ReactNode }) {
    const editorEnabled =
        process.env.NODE_ENV === "development" &&
        process.env.NEXT_PUBLIC_ENABLE_THEME_EDITOR === "true";

    return (
        <html
            lang="pt-BR"
            data-scroll-behavior="smooth"
            suppressHydrationWarning
            data-theme-family="blue"
            data-site-mode="light"
            data-site-texture="dots"
            data-scroll-mode="off"
            data-layout-guides="off"
        >
            <head>
                <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
            </head>

            <body>
                <BriefingProvider>
                    <Header />

                    {children}

                    <Footer />

                    <ScrollExperience
                        showControls={
                            process.env.NODE_ENV === "development" &&
                            process.env.NEXT_PUBLIC_ENABLE_UX_TOOLS === "true"
                        }
                    />

                    {editorEnabled && <ThemeStudio />}
                </BriefingProvider>
            </body>
        </html>
    );
}
