import styles from "./AboutSignature.module.css";

export default function AboutSignature() {
    return (
        <div className={styles.signature} role="img" aria-label="Assinatura nando.dev">
            <span className={styles.signatureTag} aria-hidden="true">
                <span className={styles.typed}>nando.dev</span>
                <span className={styles.cursor}>_</span>
            </span>

            <span className={styles.signatureDetail} aria-hidden="true">
                IDEIAS EM CONSTRUÇÃO
            </span>
        </div>
    );
}
