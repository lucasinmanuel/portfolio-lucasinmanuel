# portfolio-lucasinmanuel

Portfólio de Lucas Emanuel — engenheiro backend.

A maior parte do que construí é código fechado de cliente, então não há repositório para abrir.
O portfólio apresenta cada sistema pelo que dá para mostrar: o problema, a arquitetura que o
resolveu e a decisão por trás dela.

A interface é montada como a biblioteca de um launcher de jogos — cada projeto é um item com capa,
status e histórico.

## Stack

React 19, TypeScript, Vite 7 e Tailwind CSS 4. Sem backend: o conteúdo vive em
[`src/data/projects.ts`](src/data/projects.ts) e o roteamento é por hash, de modo que links diretos
funcionam em qualquer host estático.

## Rodando

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # gera dist/
npm run preview  # serve o build
```

## Estrutura

```
src/
├── data/projects.ts        conteúdo: projetos e perfil
├── components/
│   ├── Cover.tsx           capa gerada por hue — não há screenshot de código fechado
│   ├── Sidebar.tsx         navegação e lista da biblioteca
│   ├── Library.tsx         destaque e grade de projetos
│   ├── ProjectDetail.tsx   caso completo de um projeto
│   ├── Profile.tsx         perfil, ferramentas e contato
│   └── StatusPill.tsx
└── App.tsx                 roteamento por hash
```

Para editar o conteúdo, mexa só em `src/data/projects.ts`. Nenhum componente carrega texto fixo.
