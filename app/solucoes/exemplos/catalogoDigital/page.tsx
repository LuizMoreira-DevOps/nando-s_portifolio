"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "./catalogoDigital.module.css";
import ActionIcon from "../../../../components/ui/ActionIcon/ActionIcon";

const categories = ["Todos", "Cerâmica", "Têxteis", "Aromas"] as const;

const products = [
    {
        id: 1,
        name: "Vaso Horizonte",
        category: "Cerâmica",
        price: 89.9,
        emoji: "🏺",
        color: "#e9d4c4",
        description: "Vaso decorativo com acabamento artesanal.",
    },
    {
        id: 2,
        name: "Caneca Areia",
        category: "Cerâmica",
        price: 49.9,
        emoji: "☕",
        color: "#f0e1cb",
        description: "Caneca de cerâmica para momentos de pausa.",
    },
    {
        id: 3,
        name: "Bowl Terracota",
        category: "Cerâmica",
        price: 64.9,
        emoji: "🥣",
        color: "#e7c9b8",
        description: "Peça versátil para compor sua mesa.",
    },
    {
        id: 4,
        name: "Almofada Aurora",
        category: "Têxteis",
        price: 79.9,
        emoji: "🛋️",
        color: "#dce5d7",
        description: "Conforto e textura para sua sala.",
    },
    {
        id: 5,
        name: "Manta Natural",
        category: "Têxteis",
        price: 139.9,
        emoji: "🧶",
        color: "#ebe1d5",
        description: "Manta decorativa de toque macio.",
    },
    {
        id: 6,
        name: "Toalha Folha",
        category: "Têxteis",
        price: 59.9,
        emoji: "🌿",
        color: "#d7e3d5",
        description: "Detalhe delicado para o dia a dia.",
    },
    {
        id: 7,
        name: "Vela Calmaria",
        category: "Aromas",
        price: 45.9,
        emoji: "🕯️",
        color: "#f1dfca",
        description: "Vela decorativa com aroma suave.",
    },
    {
        id: 8,
        name: "Difusor Jardim",
        category: "Aromas",
        price: 69.9,
        emoji: "🌼",
        color: "#e5ead4",
        description: "Fragrância para ambientes acolhedores.",
    },
    {
        id: 9,
        name: "Kit Essência",
        category: "Aromas",
        price: 99.9,
        emoji: "🌸",
        color: "#eddbe5",
        description: "Seleção ilustrativa de três aromas.",
    },
] as const;

type Category = (typeof categories)[number];

const formatPrice = (value: number) =>
    new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(value);

export default function CatalogoDigitalPage() {
    const [category, setCategory] = useState<Category>("Todos");
    const [search, setSearch] = useState("");
    const [interest, setInterest] = useState<number[]>([]);
    const [requestDone, setRequestDone] = useState(false);

    const query = search.trim().toLocaleLowerCase("pt-BR");

    const filteredProducts = products.filter((product) => {
        const matchesCategory = category === "Todos" || product.category === category;

        const matchesSearch = `${product.name} ${product.description}`
            .toLocaleLowerCase("pt-BR")
            .includes(query);

        return matchesCategory && matchesSearch;
    });

    const selectedProducts = products.filter((product) => interest.includes(product.id));

    function toggleInterest(id: number) {
        setRequestDone(false);

        setInterest((current) =>
            current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
        );
    }

    return (
        <main id="conteudo" className={styles.demo}>
            <div className={styles.demoBar}>
                <div>
                    <strong>Exemplo interativo / Catálogo Digital</strong>
                    <p>Explore os produtos e monte uma lista de interesse.</p>
                </div>

                <Link href="/solucoes#catalogo" className="button button-primary">
                    <ActionIcon variant="back" size={24} stroke={1.6} />
                    Voltar para Catálogo Digital
                </Link>
            </div>

            <div className={styles.site}>
                <header className={styles.header}>
                    <a href="#inicio" className={styles.logo}>
                        casa<span>brisa.</span>
                    </a>

                    <nav aria-label="Navegação do catálogo">
                        <a href="#produtos">Produtos</a>
                        <a href="#interesse">Minha seleção ({interest.length})</a>
                    </nav>
                </header>

                <section id="inicio" className={styles.hero}>
                    <div className={styles.heroContent}>
                        <span className={styles.eyebrow}>CASA & DECORAÇÃO</span>

                        <h1>Detalhes que transformam ambientes.</h1>

                        <p>
                            Descubra objetos que combinam conforto, beleza e personalidade. Explore
                            a coleção e escolha seus favoritos.
                        </p>

                        <a href="#produtos" className={styles.primaryButton}>
                            Explorar coleção
                            <span aria-hidden="true">→</span>
                        </a>
                    </div>

                    <div className={styles.heroVisual} aria-hidden="true">
                        <span>✺</span>
                        <strong>ESSENCIAIS</strong>
                        <p>para o seu espaço</p>
                    </div>
                </section>

                <section id="produtos" className={styles.catalog}>
                    <div className={styles.sectionHeading}>
                        <div>
                            <span className={styles.eyebrow}>NOSSA SELEÇÃO</span>
                            <h2>Explore o catálogo</h2>
                        </div>

                        <p>Encontre produtos por nome ou categoria. Os valores são ilustrativos.</p>
                    </div>

                    <div className={styles.toolbar}>
                        <div className={styles.categories} aria-label="Filtrar por categoria">
                            {categories.map((item) => (
                                <button
                                    key={item}
                                    type="button"
                                    aria-pressed={category === item}
                                    className={category === item ? styles.categoryActive : ""}
                                    onClick={() => setCategory(item)}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>

                        <input
                            type="search"
                            aria-label="Pesquisar produtos"
                            placeholder="Pesquisar produtos..."
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                        />
                    </div>

                    <p className={styles.resultCount} role="status">
                        {filteredProducts.length} produto(s) encontrado(s)
                    </p>

                    {filteredProducts.length > 0 ? (
                        <div className={styles.productGrid}>
                            {filteredProducts.map((product) => {
                                const selected = interest.includes(product.id);

                                return (
                                    <article key={product.id} className={styles.productCard}>
                                        <div
                                            className={styles.productVisual}
                                            style={{
                                                background: product.color,
                                            }}
                                        >
                                            <span aria-hidden="true">{product.emoji}</span>
                                        </div>

                                        <div className={styles.productInfo}>
                                            <span className={styles.productCategory}>
                                                {product.category}
                                            </span>

                                            <h3>{product.name}</h3>
                                            <p>{product.description}</p>

                                            <strong>{formatPrice(product.price)}</strong>

                                            <button
                                                type="button"
                                                aria-pressed={selected}
                                                className={
                                                    selected
                                                        ? styles.selectedButton
                                                        : styles.productButton
                                                }
                                                onClick={() => toggleInterest(product.id)}
                                            >
                                                {selected
                                                    ? "✓ Na minha seleção"
                                                    : "+ Tenho interesse"}
                                            </button>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    ) : (
                        <div className={styles.emptyState}>
                            <strong>Nenhum produto encontrado.</strong>
                            <p>Experimente outro termo ou categoria.</p>
                            <button
                                type="button"
                                onClick={() => {
                                    setCategory("Todos");
                                    setSearch("");
                                }}
                            >
                                Limpar filtros
                            </button>
                        </div>
                    )}
                </section>

                <section id="interesse" className={styles.interest}>
                    <div>
                        <span className={styles.eyebrow}>SUA LISTA DE INTERESSE</span>

                        <h2>Gostou de alguma coisa?</h2>

                        <p>
                            Em um catálogo real, você poderia enviar esta seleção ao vendedor para
                            consultar detalhes e disponibilidade.
                        </p>

                        <p className={styles.notice}>
                            Demonstração: nenhuma mensagem será enviada.
                        </p>
                    </div>

                    <div className={styles.interestPanel}>
                        <h3>
                            Minha seleção
                            <span>{interest.length}</span>
                        </h3>

                        {selectedProducts.length === 0 ? (
                            <p className={styles.emptySelection}>
                                Sua lista está vazia. Escolha um produto usando o botão “Tenho
                                interesse”.
                            </p>
                        ) : (
                            <ul className={styles.interestList}>
                                {selectedProducts.map((product) => (
                                    <li key={product.id}>
                                        <span>
                                            <strong>{product.name}</strong>
                                            <small>{product.category}</small>
                                        </span>

                                        <button
                                            type="button"
                                            onClick={() => toggleInterest(product.id)}
                                            aria-label={`Remover ${product.name}`}
                                        >
                                            Remover
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}

                        <button
                            type="button"
                            className={styles.primaryButton}
                            disabled={interest.length === 0}
                            onClick={() => setRequestDone(true)}
                        >
                            Simular solicitação
                            <span aria-hidden="true">→</span>
                        </button>

                        {requestDone && (
                            <p className={styles.confirmation} role="status">
                                Simulação concluída! Sua seleção foi preparada, mas não foi enviada
                                ou salva.
                            </p>
                        )}
                    </div>
                </section>

                <footer className={styles.footer}>
                    <strong>casabrisa.</strong>
                    <p>Empresa fictícia. Produtos e preços ilustrativos.</p>
                </footer>
            </div>

            <div className={styles.exit}>
                <span className={styles.eyebrow}>FIM DA DEMONSTRAÇÃO</span>

                <h2>Um catálogo facilita a escolha.</h2>

                <p>
                    Aqui você pesquisou produtos, filtrou categorias e separou itens de interesse.
                    Diferentemente de uma loja virtual, não existe carrinho nem pagamento.
                </p>

                <Link href="/solucoes#catalogo" className={styles.returnLink}>
                    <ActionIcon variant="back" size={20} stroke={1.6} />
                    Voltar à solução
                </Link>
            </div>
        </main>
    );
}
