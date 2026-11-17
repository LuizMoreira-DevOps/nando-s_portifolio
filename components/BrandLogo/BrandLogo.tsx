import Link from "next/link";
import styles from "./BrandLogo.module.css";

type BrandLogoProps = {
    animated?: boolean;
};

const name = [..."nando.dev"];

export default function BrandLogo({ animated = false }: BrandLogoProps) {
    return (
        <Link
            href="/"
            className={["brand", styles.logo, animated ? styles.animated : ""]
                .filter(Boolean)
                .join(" ")}
            aria-label="Nando Moreira, página inicial"
        >
            <span className={styles.word} aria-hidden="true">
                {name.map((letter, index) => (
                    <span
                        key={index}
                        className={[styles.letter, letter === "." ? styles.dot : ""]
                            .filter(Boolean)
                            .join(" ")}
                    >
                        {letter}
                    </span>
                ))}

                <span className={styles.cursor}>_</span>
            </span>
        </Link>
    );
}
