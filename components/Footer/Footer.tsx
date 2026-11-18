import Link from "next/link";
import Image from "next/image";
import BrandLogo from "../BrandLogo/BrandLogo";

// Prefixo do GitHub Pages, vazio na execução local.
const staticBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const navigationLinks = [
    { label: "Início", href: "/" },
    { label: "Soluções", href: "/solucoes" },
    { label: "Projetos", href: "/projetos" },
    { label: "Sobre", href: "/sobre" },
];

export default function Footer() {
    return (
        <footer className="site-footer">
            <div className="container footer-content">
                <div className="footer-brand">
                    <BrandLogo />
                    <p>Software e soluções digitais para pessoas, negócios e projetos reais.</p>
                </div>

                <nav className="footer-nav" aria-label="Navegação do rodapé">
                    <h2>Navegação</h2>
                    <div className="footer-nav-links">
                        {navigationLinks.map((item) => (
                            <Link key={item.href} href={item.href}>
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </nav>

                <div className="footer-contact">
                    <div className="footer-contact-group">
                        <h2>Acompanhe meu trabalho</h2>
                        <div className="footer-social-links">
                            <a
                                href="https://github.com/LuizMoreira-DevOps"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="GitHub de Nando Moreira (abre em nova aba)"
                                title="GitHub"
                            >
                                <Image
                                    src={`${staticBasePath}/brands/github-invertocat-black.svg`}
                                    alt=""
                                    width={46}
                                    height={46}
                                    className="footer-social-img footer-social-img--github"
                                    unoptimized
                                    aria-hidden="true"
                                />
                            </a>
                            <a
                                href="https://www.linkedin.com/in/luiz-moreira-dev/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="LinkedIn de Nando Moreira (abre em nova aba)"
                                title="LinkedIn"
                            >
                                <Image
                                    src={`${staticBasePath}/brands/linkedin-in-blue.png`}
                                    alt=""
                                    width={39}
                                    height={33}
                                    className="footer-social-img footer-social-img--linkedin"
                                    unoptimized
                                    aria-hidden="true"
                                />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container footer-bottom">
                <span>© 2026 Nando Moreira.</span>
                <span>Desenvolver. Validar. Evoluir.</span>
            </div>
        </footer>
    );
}
