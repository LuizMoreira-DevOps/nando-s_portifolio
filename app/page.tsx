import HomeNextStep from "../components/HomeNextStep/HomeNextStep";
import HomeProjects from "../components/HomeProjects/HomeProjects";
import HomeSolutions from "../components/HomeSolutions/HomeSolutions";
import HomeHero from "../components/HomeHero/HomeHero";
export default function HomePage() {
    return (
        <main id="conteudo" className="home-page">
            <HomeHero />

            <HomeSolutions />

            <HomeProjects />

            <HomeNextStep />
        </main>
    );
}
