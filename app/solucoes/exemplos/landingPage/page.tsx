"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import styles from "./landingPageDemo.module.css";
import ActionIcon from "../../../../components/ui/ActionIcon/ActionIcon";

const advantages = [
    {
        title: "Atendimento próximo",
        description: "Conversamos sobre sua necessidade antes de propor o serviço.",
    },
    {
        title: "Cuidado em cada detalhe",
        description: "Planejamos a manutenção conforme as características do seu espaço.",
    },
    {
        title: "Rotina mais tranquila",
        description: "Você aproveita seu jardim sem precisar cuidar de tudo sozinho.",
    },
];

const services = [
    {
        title: "Manutenção",
        description: "Poda, limpeza e cuidados periódicos com seu jardim.",
    },
    {
        title: "Revitalização",
        description: "Um novo visual para espaços que precisam de atenção.",
    },
    {
        title: "Planejamento",
        description: "Orientação para organizar plantas, vasos e áreas verdes.",
    },
];

export default function LandingPageExample() {
    const [submitted, setSubmitted] = useState(false);

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setSubmitted(true);
    }

    return (
        <main id="conteudo" className={styles.page}>
            {/* Barra de orientação do portfólio */}

            <div className={styles.demoBar}>
                <div className={styles.frame}>
                    <div className={styles.demoBarContent}>
                        <div>
                            <strong>Exemplo interativo</strong>
                            <p>Landing Page demonstrativa. Empresa e serviços fictícios.</p>
                        </div>

                        <Link href="/solucoes#landingPage" className="button button-primary">
                            <ActionIcon variant="back" size={24} stroke={1.6} />
                            Voltar para Landing Page
                        </Link>
                    </div>
                </div>
            </div>

            {/* Site fictício */}

            <div className={styles.site}>
                <header className={styles.siteHeader}>
                    <a href="#demo-inicio" className={styles.brand}>
                        jardim<span>vivo.</span>
                    </a>

                    <nav className={styles.navigation} aria-label="Navegação do site demonstrativo">
                        <a href="#demo-inicio">Início</a>
                        <a href="#demo-beneficios">Benefícios</a>
                        <a href="#demo-servicos">Serviços</a>
                        <a href="#demo-processo">Como funciona</a>
                    </nav>

                    <a href="#demo-contato" className={styles.headerCta}>
                        Contato
                    </a>
                </header>

                {/* 01 - Apresentação */}

                <section id="demo-inicio" className={styles.hero} aria-labelledby="demo-title">
                    <div className={styles.heroContent}>
                        <span className={styles.kicker}>01 / APRESENTAÇÃO</span>

                        <h1 id="demo-title">Seu jardim mais vivo, sem complicação.</h1>

                        <p>
                            Cuidamos de espaços verdes para que você tenha mais tempo de aproveitar
                            o que realmente importa.
                        </p>

                        <a href="#demo-contato" className={styles.primaryCta}>
                            Quero cuidar do meu jardim
                            <span aria-hidden="true">→</span>
                        </a>
                    </div>

                    <div className={styles.heroArtwork} aria-hidden="true">
                        <span className={styles.plantStem} />
                        <span className={styles.plantLeafOne} />
                        <span className={styles.plantLeafTwo} />
                        <span className={styles.plantLeafThree} />
                    </div>
                </section>

                {/* 02 - Benefícios */}

                <section
                    id="demo-beneficios"
                    className={`${styles.section} ${styles.sectionSoft}`}
                    aria-labelledby="benefits-title"
                >
                    <span className={styles.kicker}>02 / BENEFÍCIOS</span>

                    <h2 id="benefits-title">Mais verde, menos preocupação.</h2>

                    <p className={styles.sectionIntro}>
                        Veja algumas vantagens que o cliente pode encontrar ao contratar o serviço.
                    </p>

                    <div className={styles.cardGrid}>
                        {advantages.map((item, index) => (
                            <article key={item.title} className={styles.infoCard}>
                                <span className={styles.cardNumber}>
                                    {String(index + 1).padStart(2, "0")}
                                </span>

                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                            </article>
                        ))}
                    </div>
                </section>

                {/* 03 - Serviços */}

                <section
                    id="demo-servicos"
                    className={styles.section}
                    aria-labelledby="services-title"
                >
                    <span className={styles.kicker}>03 / SERVIÇOS</span>

                    <h2 id="services-title">Como podemos ajudar?</h2>

                    <p className={styles.sectionIntro}>
                        Três exemplos de serviços organizados para facilitar a escolha.
                    </p>

                    <div className={styles.cardGrid}>
                        {services.map((item) => (
                            <article key={item.title} className={styles.serviceCard}>
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>

                                <a href="#demo-contato">
                                    Tenho interesse
                                    <span aria-hidden="true"> →</span>
                                </a>
                            </article>
                        ))}
                    </div>
                </section>

                {/* 04 - Como funciona */}

                <section
                    id="demo-processo"
                    className={`${styles.section} ${styles.sectionSoft}`}
                    aria-labelledby="process-title"
                >
                    <span className={styles.kicker}>04 / COMO FUNCIONA</span>

                    <h2 id="process-title">Simples desde o primeiro contato.</h2>

                    <div className={styles.steps}>
                        <div>
                            <strong>01</strong>
                            <h3>Você conta o que precisa</h3>
                            <p>Compartilha sua ideia ou necessidade inicial.</p>
                        </div>

                        <div>
                            <strong>02</strong>
                            <h3>Planejamos a solução</h3>
                            <p>Avaliamos o espaço e apresentamos uma proposta.</p>
                        </div>

                        <div>
                            <strong>03</strong>
                            <h3>Colocamos em prática</h3>
                            <p>Executamos o serviço conforme o combinado.</p>
                        </div>
                    </div>
                </section>

                {/* 05 - Contato */}

                <section
                    id="demo-contato"
                    className={`${styles.section} ${styles.contact}`}
                    aria-labelledby="contact-title"
                >
                    <div className={styles.contactIntro}>
                        <span className={styles.kicker}>05 / CONTATO</span>

                        <h2 id="contact-title">Vamos cuidar do seu jardim?</h2>

                        <p>
                            Em um site real, este formulário permitiria solicitar um orçamento. Aqui
                            você pode testar o comportamento.
                        </p>
                    </div>

                    <form className={styles.form} onSubmit={handleSubmit}>
                        <label htmlFor="demo-name">Seu nome</label>

                        <input
                            id="demo-name"
                            type="text"
                            placeholder="Como podemos chamar você?"
                            autoComplete="off"
                            required
                            onChange={() => setSubmitted(false)}
                        />

                        <label htmlFor="demo-service">O que você procura?</label>

                        <select
                            id="demo-service"
                            defaultValue=""
                            required
                            onChange={() => setSubmitted(false)}
                        >
                            <option value="" disabled>
                                Escolha um serviço
                            </option>
                            <option value="manutencao">Manutenção</option>
                            <option value="revitalizacao">Revitalização</option>
                            <option value="planejamento">Planejamento</option>
                        </select>

                        <button type="submit">Simular pedido de orçamento</button>

                        {submitted && (
                            <p className={styles.confirmation} role="status">
                                Simulação concluída! Em um site real, o pedido seguiria para o canal
                                de atendimento.
                            </p>
                        )}

                        <p className={styles.formNotice}>
                            Demonstração: nenhum dado é enviado ou armazenado.
                        </p>
                    </form>
                </section>

                <footer className={styles.siteFooter}>
                    <strong>jardimvivo.</strong>
                    <span>Exemplo fictício criado para demonstrar uma Landing Page.</span>
                </footer>
            </div>

            {/* Saída da demonstração */}

            <div className={styles.exit}>
                <h2>Agora você conhece uma Landing Page na prática.</h2>

                <p>
                    Esta página contém cinco partes: apresentação, benefícios, serviços,
                    funcionamento e contato.
                </p>

                <Link href="/solucoes#landingPage" className={styles.returnLink}>
                    <ActionIcon variant="back" size={20} stroke={1.6} />
                    Voltar à solução
                </Link>
            </div>
        </main>
    );
}
