"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import styles from "./siteInstitucional.module.css";
import ActionIcon from "../../../../components/ui/ActionIcon/ActionIcon";

type PageName = "inicio" | "sobre" | "servicos" | "contato";

type Props = {
    page: PageName;
};

const base = "/solucoes/exemplos/siteInstitucional";

const navigation = [
    { id: "inicio", label: "Início", href: base },
    { id: "sobre", label: "Sobre", href: `${base}/sobre` },
    { id: "servicos", label: "Serviços", href: `${base}/servicos` },
    { id: "contato", label: "Contato", href: `${base}/contato` },
] as const;

const services = [
    {
        number: "01",
        title: "Planejamento de ambientes",
        description: "Organização dos espaços para melhorar conforto, circulação e aproveitamento.",
    },
    {
        number: "02",
        title: "Consultoria de cores",
        description: "Orientação na escolha de cores, materiais e combinações para o ambiente.",
    },
    {
        number: "03",
        title: "Renovação de espaços",
        description:
            "Ideias para transformar ambientes existentes sem necessariamente começar do zero.",
    },
];

export default function SiteInstitucionalDemo({ page }: Props) {
    const [submitted, setSubmitted] = useState(false);

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setSubmitted(true);
    }

    return (
        <div className={styles.demo}>
            {/* Barra de orientação do portfólio */}

            <div className={styles.demoBar}>
                <div className={styles.demoBarContent}>
                    <div>
                        <strong>Exemplo interativo</strong>
                        <p>Site institucional fictício com quatro páginas navegáveis.</p>
                    </div>

                    <Link href="/solucoes#institucional" className="button button-primary">
                        <ActionIcon variant="back" size={24} stroke={1.6} />
                        Voltar para Site Institucional
                    </Link>
                </div>
            </div>

            {/* Site fictício */}

            <div className={styles.site}>
                <header className={styles.siteHeader}>
                    <Link href={base} className={styles.brand}>
                        norte<span>.</span>
                    </Link>

                    <nav className={styles.navigation} aria-label="Navegação do site demonstrativo">
                        {navigation.map((item) => (
                            <Link
                                key={item.id}
                                href={item.href}
                                aria-current={page === item.id ? "page" : undefined}
                                className={page === item.id ? styles.active : ""}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    <Link href={`${base}/contato`} className={styles.headerCta}>
                        Solicitar contato
                    </Link>
                </header>

                <main id="conteudo" className={styles.siteBody}>
                    {/* PÁGINA INÍCIO */}

                    {page === "inicio" && (
                        <>
                            <section className={styles.hero}>
                                <div className={styles.heroCopy}>
                                    <span className={styles.eyebrow}>DESIGN DE INTERIORES</span>

                                    <h1>Espaços que fazem sentido para você.</h1>

                                    <p>
                                        Acreditamos que um ambiente bem planejado transforma a
                                        maneira como vivemos e trabalhamos.
                                    </p>

                                    <Link
                                        href={`${base}/servicos`}
                                        className={styles.primaryButton}
                                    >
                                        Conhecer nossos serviços
                                        <span aria-hidden="true">→</span>
                                    </Link>
                                </div>

                                <div className={styles.heroVisual} aria-hidden="true">
                                    <div className={styles.visualShape} />
                                    <div className={styles.visualCard}>
                                        <span>FORMA</span>
                                        <strong>&</strong>
                                        <span>FUNÇÃO</span>
                                    </div>
                                </div>
                            </section>

                            <section className={styles.introSection}>
                                <span className={styles.eyebrow}>NOSSA PROPOSTA</span>

                                <h2>Cada ambiente tem uma história.</h2>

                                <p>
                                    Nosso trabalho começa entendendo quem utiliza o espaço e o que
                                    precisa funcionar melhor.
                                </p>

                                <Link href={`${base}/sobre`} className={styles.textLink}>
                                    Conheça o estúdio →
                                </Link>
                            </section>
                        </>
                    )}

                    {/* PÁGINA SOBRE */}

                    {page === "sobre" && (
                        <>
                            <section className={styles.pageIntro}>
                                <span className={styles.eyebrow}>QUEM SOMOS</span>

                                <h1>Projetar também é saber ouvir.</h1>

                                <p>
                                    O Norte Estúdio é um exemplo fictício de escritório de design de
                                    interiores que valoriza funcionalidade, simplicidade e
                                    personalidade.
                                </p>
                            </section>

                            <section className={styles.storyGrid}>
                                <div className={styles.storyVisual}>
                                    <span>N / ESTÚDIO</span>
                                    <strong>Ideias que encontram seu lugar.</strong>
                                </div>

                                <div className={styles.storyText}>
                                    <span className={styles.eyebrow}>NOSSA FILOSOFIA</span>

                                    <h2>Primeiro as pessoas. Depois os espaços.</h2>

                                    <p>
                                        Antes de pensar em móveis, cores e materiais, buscamos
                                        entender hábitos, necessidades e objetivos.
                                    </p>

                                    <p>
                                        O resultado é um caminho de planejamento mais claro, pensado
                                        para cada contexto.
                                    </p>

                                    <Link href={`${base}/servicos`} className={styles.textLink}>
                                        Explore nossos serviços →
                                    </Link>
                                </div>
                            </section>
                        </>
                    )}

                    {/* PÁGINA SERVIÇOS */}

                    {page === "servicos" && (
                        <>
                            <section className={styles.pageIntro}>
                                <span className={styles.eyebrow}>O QUE FAZEMOS</span>

                                <h1>Soluções para cada espaço.</h1>

                                <p>
                                    Conheça algumas maneiras pelas quais podemos ajudar a
                                    transformar seu ambiente.
                                </p>
                            </section>

                            <section
                                className={styles.servicesGrid}
                                aria-label="Serviços demonstrativos"
                            >
                                {services.map((service) => (
                                    <article key={service.number} className={styles.serviceCard}>
                                        <span className={styles.serviceNumber}>
                                            {service.number}
                                        </span>

                                        <h2>{service.title}</h2>

                                        <p>{service.description}</p>

                                        <Link href={`${base}/contato`} className={styles.textLink}>
                                            Tenho interesse →
                                        </Link>
                                    </article>
                                ))}
                            </section>
                        </>
                    )}

                    {/* PÁGINA CONTATO */}

                    {page === "contato" && (
                        <section className={styles.contactGrid}>
                            <div className={styles.contactCopy}>
                                <span className={styles.eyebrow}>VAMOS CONVERSAR</span>

                                <h1>Seu próximo espaço começa com uma ideia.</h1>

                                <p>
                                    Conte um pouco sobre o que procura. Em um site real, essas
                                    informações poderiam iniciar um atendimento.
                                </p>

                                <div className={styles.demoNotice}>
                                    <strong>Demonstração segura</strong>
                                    <p>
                                        Este formulário é fictício. Nenhuma mensagem será enviada ou
                                        armazenada.
                                    </p>
                                </div>
                            </div>

                            <form className={styles.contactForm} onSubmit={handleSubmit}>
                                <label htmlFor="institutional-name">Seu nome</label>

                                <input
                                    id="institutional-name"
                                    placeholder="Como podemos chamar você?"
                                    maxLength={100}
                                    autoComplete="off"
                                    required
                                    onChange={() => setSubmitted(false)}
                                />

                                <label htmlFor="institutional-service">Serviço de interesse</label>

                                <select
                                    id="institutional-service"
                                    defaultValue=""
                                    required
                                    onChange={() => setSubmitted(false)}
                                >
                                    <option value="" disabled>
                                        Escolha uma opção
                                    </option>
                                    <option value="planejamento">Planejamento de ambientes</option>
                                    <option value="cores">Consultoria de cores</option>
                                    <option value="renovacao">Renovação de espaços</option>
                                </select>

                                <label htmlFor="institutional-message">Sua ideia</label>

                                <textarea
                                    id="institutional-message"
                                    rows={4}
                                    maxLength={1000}
                                    placeholder="Conte o que gostaria de transformar..."
                                    required
                                    onChange={() => setSubmitted(false)}
                                />

                                <button type="submit" className={styles.primaryButton}>
                                    Simular envio
                                </button>

                                {submitted && (
                                    <p className={styles.successMessage} role="status">
                                        Simulação concluída! Nenhuma informação foi enviada.
                                    </p>
                                )}
                            </form>
                        </section>
                    )}
                </main>

                {/* Rodapé do site demonstrativo */}

                <footer className={styles.siteFooter}>
                    <div>
                        <strong>norte.</strong>
                        <p>Design de interiores. Empresa fictícia.</p>
                    </div>

                    <nav aria-label="Navegação do rodapé">
                        {navigation.map((item) => (
                            <Link key={item.id} href={item.href}>
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                </footer>
            </div>

            {/* Saída da demonstração */}

            <div className={styles.exit}>
                <span className={styles.eyebrow}>FIM DA DEMONSTRAÇÃO</span>

                <h2>Percebeu a diferença?</h2>

                <p>
                    Você navegou entre páginas independentes, cada uma com seu endereço e objetivo.
                    Essa é uma das características de um site institucional.
                </p>

                <Link href="/solucoes#institucional" className={styles.returnLink}>
                    <ActionIcon variant="back" size={20} stroke={1.6} />
                    Voltar à solução
                </Link>
            </div>
        </div>
    );
}
