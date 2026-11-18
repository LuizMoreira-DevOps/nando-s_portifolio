"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "./lojaVirtual.module.css";
import ActionIcon from "../../../../components/ui/ActionIcon/ActionIcon";

const products = [
    {
        id: "camiseta",
        name: "Camiseta Solar",
        category: "Vestuário",
        price: 89.9,
        emoji: "👕",
        color: "#ffd6ba",
    },
    {
        id: "ecobag",
        name: "Ecobag Horizonte",
        category: "Acessórios",
        price: 39.9,
        emoji: "👜",
        color: "#f7e6ac",
    },
    {
        id: "bone",
        name: "Boné Aurora",
        category: "Acessórios",
        price: 69.9,
        emoji: "🧢",
        color: "#c9e1dc",
    },
    {
        id: "garrafa",
        name: "Garrafa Traço",
        category: "Acessórios",
        price: 59.9,
        emoji: "🥤",
        color: "#d4d9f3",
    },
    {
        id: "moletom",
        name: "Moletom Pôr do Sol",
        category: "Vestuário",
        price: 189.9,
        emoji: "🧥",
        color: "#eccddd",
    },
    {
        id: "caderno",
        name: "Caderno Criativo",
        category: "Papelaria",
        price: 34.9,
        emoji: "📒",
        color: "#d8e6be",
    },
] as const;

type Shipping = "padrao" | "expressa";

const formatPrice = (value: number) =>
    new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(value);

export default function LojaVirtualPage() {
    const [cart, setCart] = useState<Record<string, number>>({});
    const [shipping, setShipping] = useState<Shipping>("padrao");
    const [checkoutDone, setCheckoutDone] = useState(false);

    const cartItems = products.filter((product) => (cart[product.id] ?? 0) > 0);

    const itemCount = cartItems.reduce((sum, product) => sum + cart[product.id], 0);

    const subtotal = cartItems.reduce((sum, product) => sum + product.price * cart[product.id], 0);

    const shippingPrice = itemCount === 0 ? 0 : shipping === "padrao" ? 12.9 : 24.9;

    const total = subtotal + shippingPrice;

    function changeQuantity(productId: string, change: number) {
        setCheckoutDone(false);

        setCart((current) => {
            const next = { ...current };
            const quantity = Math.max(0, (current[productId] ?? 0) + change);

            if (quantity === 0) {
                delete next[productId];
            } else {
                next[productId] = quantity;
            }

            return next;
        });
    }

    return (
        <main id="conteudo" className={styles.demo}>
            <div className={styles.demoBar}>
                <div>
                    <strong>Exemplo interativo / Loja Virtual</strong>
                    <p>Experimente o carrinho e a finalização de uma compra fictícia.</p>
                </div>

                <Link href="/solucoes#loja" className="button button-primary">
                    <ActionIcon variant="back" size={24} stroke={1.6} />
                    Voltar para Loja Virtual
                </Link>
            </div>

            <div className={styles.store}>
                <div className={styles.announcement}>
                    ✳ LOJA DEMONSTRATIVA · PRODUTOS FICTÍCIOS ✳
                </div>

                <header className={styles.header}>
                    <a href="#inicio" className={styles.logo}>
                        clube<span>solar.</span>
                    </a>

                    <nav aria-label="Navegação da loja">
                        <a href="#loja-produtos">Produtos</a>
                        <a href="#sobre-loja">A marca</a>
                    </nav>

                    <a href="#carrinho" className={styles.cartLink}>
                        <span aria-hidden="true">🛍️</span>
                        Carrinho
                        <strong>{itemCount}</strong>
                    </a>
                </header>

                <section id="inicio" className={styles.hero}>
                    <div className={styles.heroCopy}>
                        <span className={styles.eyebrow}>NOVA COLEÇÃO / 2026</span>

                        <h1>Leve um pouco de sol com você.</h1>

                        <p>
                            Objetos, roupas e acessórios para deixar os dias mais leves. Escolha
                            seus favoritos e experimente nossa loja.
                        </p>

                        <a href="#loja-produtos" className={styles.primaryButton}>
                            Comprar coleção
                            <span aria-hidden="true">→</span>
                        </a>
                    </div>

                    <div className={styles.heroArt} aria-hidden="true">
                        <div className={styles.sun} />
                        <span>GOOD DAYS</span>
                    </div>
                </section>

                <section id="loja-produtos" className={styles.collection}>
                    <div className={styles.sectionHeading}>
                        <div>
                            <span className={styles.eyebrow}>ESCOLHA SEUS FAVORITOS</span>

                            <h2>Nossos produtos</h2>
                        </div>

                        <p>Adicione itens ao carrinho. Todos os preços são ilustrativos.</p>
                    </div>

                    <div className={styles.productGrid}>
                        {products.map((product) => (
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
                                    <span className={styles.category}>{product.category}</span>

                                    <h3>{product.name}</h3>

                                    <strong>{formatPrice(product.price)}</strong>

                                    <button
                                        type="button"
                                        className={styles.addButton}
                                        onClick={() => changeQuantity(product.id, 1)}
                                    >
                                        + Adicionar ao carrinho
                                    </button>

                                    {(cart[product.id] ?? 0) > 0 && (
                                        <small className={styles.inCart}>
                                            {cart[product.id]} no carrinho
                                        </small>
                                    )}
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

                <section id="sobre-loja" className={styles.brandSection}>
                    <span className={styles.eyebrow}>NOSSA ENERGIA</span>

                    <h2>Feito para dias que valem a pena.</h2>

                    <p>
                        Clube Solar é uma marca fictícia criada para demonstrar a experiência de uma
                        loja virtual. Aqui, a navegação já inclui seleção de produtos, carrinho e
                        checkout.
                    </p>

                    <a href="#carrinho" className={styles.textLink}>
                        Ver meu carrinho →
                    </a>
                </section>

                <section id="carrinho" className={styles.checkout}>
                    <div className={styles.checkoutIntro}>
                        <span className={styles.eyebrow}>SUA SACOLA</span>

                        <h2>Meu carrinho</h2>

                        <p>
                            Confira os produtos, altere quantidades e simule a etapa final de uma
                            compra.
                        </p>

                        <div className={styles.demoNotice}>
                            <strong>Compra demonstrativa</strong>
                            <p>
                                Nenhum pagamento será cobrado. Não solicitamos dados pessoais ou
                                informações de cartão.
                            </p>
                        </div>
                    </div>

                    <div className={styles.cartPanel}>
                        <div className={styles.cartHeading}>
                            <h3>Resumo do pedido</h3>
                            <span>{itemCount} item(ns)</span>
                        </div>

                        {cartItems.length === 0 ? (
                            <div className={styles.emptyCart}>
                                <span aria-hidden="true">🛒</span>
                                <strong>Seu carrinho está vazio.</strong>
                                <p>Escolha um produto para começar.</p>
                                <a href="#loja-produtos">Explorar produtos →</a>
                            </div>
                        ) : (
                            <ul className={styles.cartItems}>
                                {cartItems.map((product) => (
                                    <li key={product.id}>
                                        <div
                                            className={styles.cartThumbnail}
                                            style={{
                                                background: product.color,
                                            }}
                                            aria-hidden="true"
                                        >
                                            {product.emoji}
                                        </div>

                                        <div className={styles.cartItemInfo}>
                                            <strong>{product.name}</strong>

                                            <small>{formatPrice(product.price)}</small>

                                            <div
                                                className={styles.quantity}
                                                aria-label={`Quantidade de ${product.name}`}
                                            >
                                                <button
                                                    type="button"
                                                    onClick={() => changeQuantity(product.id, -1)}
                                                    aria-label={`Diminuir quantidade de ${product.name}`}
                                                >
                                                    −
                                                </button>

                                                <span>{cart[product.id]}</span>

                                                <button
                                                    type="button"
                                                    onClick={() => changeQuantity(product.id, 1)}
                                                    aria-label={`Aumentar quantidade de ${product.name}`}
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>

                                        <strong className={styles.lineTotal}>
                                            {formatPrice(product.price * cart[product.id])}
                                        </strong>
                                    </li>
                                ))}
                            </ul>
                        )}

                        <div className={styles.shipping}>
                            <h4>Entrega demonstrativa</h4>

                            <label>
                                <input
                                    type="radio"
                                    name="shipping"
                                    checked={shipping === "padrao"}
                                    onChange={() => {
                                        setShipping("padrao");
                                        setCheckoutDone(false);
                                    }}
                                />

                                <span>Entrega padrão</span>
                                <strong>{formatPrice(12.9)}</strong>
                            </label>

                            <label>
                                <input
                                    type="radio"
                                    name="shipping"
                                    checked={shipping === "expressa"}
                                    onChange={() => {
                                        setShipping("expressa");
                                        setCheckoutDone(false);
                                    }}
                                />

                                <span>Entrega expressa</span>
                                <strong>{formatPrice(24.9)}</strong>
                            </label>
                        </div>

                        <div className={styles.totals}>
                            <div>
                                <span>Subtotal</span>
                                <strong>{formatPrice(subtotal)}</strong>
                            </div>

                            <div>
                                <span>Entrega</span>
                                <strong>{formatPrice(shippingPrice)}</strong>
                            </div>

                            <div className={styles.grandTotal}>
                                <strong>Total</strong>
                                <strong>{formatPrice(total)}</strong>
                            </div>
                        </div>

                        <button
                            type="button"
                            className={styles.primaryButton}
                            disabled={itemCount === 0}
                            onClick={() => setCheckoutDone(true)}
                        >
                            Simular finalização
                            <span aria-hidden="true">→</span>
                        </button>

                        {checkoutDone && (
                            <div className={styles.success} role="status">
                                <strong>Simulação concluída! ✓</strong>
                                <p>
                                    Você concluiu o fluxo de compra demonstrativo. Nenhum pedido foi
                                    registrado e nenhum pagamento foi processado.
                                </p>
                            </div>
                        )}
                    </div>
                </section>

                <footer className={styles.footer}>
                    <strong>clubesolar.</strong>
                    <p>Loja fictícia. Valores e entregas apenas demonstrativos.</p>
                </footer>
            </div>

            <div className={styles.exit}>
                <span className={styles.eyebrow}>FIM DA DEMONSTRAÇÃO</span>

                <h2>Agora você conhece uma Loja Virtual.</h2>

                <p>
                    Diferentemente do catálogo, uma loja permite montar um carrinho, calcular o
                    valor dos produtos e avançar até a finalização de uma compra.
                </p>

                <Link href="/solucoes#landingPage" className={styles.returnLink}>
                    <ActionIcon variant="back" size={20} stroke={1.6} />
                    Voltar à solução
                </Link>
            </div>
        </main>
    );
}
