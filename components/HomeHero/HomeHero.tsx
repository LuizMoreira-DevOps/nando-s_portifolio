import ScrollCue from "../ui/ScrollCue/ScrollCue";

export default function HomeHero() {
    return (
        <section
            id="inicio"
            data-review-id="HOME-01"
            data-reels-panel
            className="container home-hero"
        >
            <div className="hero-content">
                <h1>
                    Sua ideia merece
                    <span> sair do papel.</span>
                </h1>

                <p className="hero-description">
                    Desenvolvo sites, catálogos digitais e aplicações web para pessoas e negócios
                    que precisam de soluções simples e funcionais.
                </p>

                <ScrollCue
                    href="#solucoes"
                    label="Explorar soluções"
                    className="home-hero-scroll"
                />
            </div>
        </section>
    );
}
