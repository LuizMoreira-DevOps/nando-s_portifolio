export const projects = [
    {
        number: "01",
        title: "Pirate Battle",
        category: "Desenvolvimento de jogo",
        status: "Entregue",
        problem:
            "Criar uma experiência de combate naval jogável dentro de um desafio técnico de 48 horas.",
        solution:
            "Desenvolvimento de uma aplicação interativa com controles de jogo, gerenciamento de estados, interface e testes automatizados.",
        technologies: ["React", "TypeScript", "PixiJS", "Playwright"],
        repository: "https://github.com/LuizMoreira-DevOps/game-developer-challenge",
        liveUrl: "https://luizmoreira-devops.github.io/game-developer-challenge/",
        liveLabel: "Jogar",
        preview: "game",
        previewCaption: "Experiência interativa",
    },
    {
        number: "02",
        title: "Chouga Online",
        category: "Catálogo digital",
        status: "Legado",
        problem:
            "Apresentar produtos e suas variações em uma experiência de compra organizada, com atendimento pelo WhatsApp.",
        solution:
            "Construção de um catálogo web com filtros, seleção de variantes, integração de dados e direcionamento para atendimento comercial.",
        technologies: ["React", "Vite", "Supabase"],
        repository: "https://github.com/LuizMoreira-DevOps/chouga-online",
        liveUrl: "https://www.chouga.com.br/",
        liveLabel: "Acessar projeto",
        preview: "catalog",
        previewCaption: "Catálogo e produtos",
    },
    {
        number: "03",
        title: "Chouga V2",
        category: "Aplicação web",
        status: "Em desenvolvimento",
        problem:
            "Evoluir a estrutura de uma loja virtual, separando responsabilidades e preparando funcionalidades mais completas.",
        solution:
            "Criação de uma nova base com Next.js, componentes reutilizáveis e contratos de dados tipados.",
        technologies: ["Next.js", "React", "TypeScript"],
        repository: "https://github.com/LuizMoreira-DevOps/ChougaSkateboard",
        liveUrl: "https://luizmoreira-devops.github.io/ChougaSkateboard/",
        liveLabel: "Acessar projeto",
        preview: "application",
        previewCaption: "Arquitetura web",
    },
] as const;
