# Sistema de Almoxarifado de Estoque de Alimentos

<p align="center">
  <img src="logo.png" alt="Logo Marinha" width="200" />
</p>

<p align="center">
  Sistema local de controle de estoque (almoxarifado) para itens de alimento, com interface web em React, API REST em Node.js/Express e persistência em SQLite3.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white" alt="React 19" />
  <img src="https://img.shields.io/badge/Node.js-Express-339933?logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/SQLite-3-003B57?logo=sqlite&logoColor=white" alt="SQLite3" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS 4" />
</p>

---

## Quickstart

```bash
# 1. Backend (terminal 1)
cd backend && npm install && npm run dev    # porta 3001

# 2. Frontend (terminal 2)
cd frontend && npm install && npm run dev   # porta 5173, proxy /api → 3001
```

Acesse **http://localhost:5173** no navegador.

## Stack

| Camada | Tecnologia |
|--------|-----------|
| Frontend | React 19, Vite, Tailwind CSS 4, React Router 7 |
| Backend | Node.js, Express, better-sqlite3 |
| Banco de Dados | SQLite3 (arquivo local, zero config) |
| Testes Backend | Jest + Supertest — 41 testes, 4 suites |
| Testes Frontend | Vitest + React Testing Library — 52 testes, 9 suites |

## Funcionalidades

- **CRUD completo** de itens de alimento (nome, categoria, unidade, preço, quantidade, validade, estoque mínimo)
- **Movimentações** de entrada e saída de estoque com histórico completo
- **Dashboard** com métricas em tempo real (total de itens, valor total, alertas)
- **Busca e filtros** por nome e categoria
- **Alertas visuais** de validade (vencido / vencendo em 7 dias) e estoque baixo
- **Validação** de dados no frontend e backend
- **Exclusão em cascata** — remover um item apaga suas movimentações

## Regras de Negócio

| ID | Regra |
|----|-------|
| RN01 | Saída não pode resultar em estoque negativo |
| RN02 | Itens com validade em 7 dias ou menos recebem alerta amarelo |
| RN03 | Itens vencidos recebem alerta vermelho |
| RN04 | Itens com quantidade igual ou abaixo do estoque mínimo recebem alerta |
| RN05 | Exclusão de item remove movimentações em cascata |
| RN06 | `data_atualizacao` atualiza automaticamente em qualquer alteração |
| RN07 | Preço e quantidade devem ser positivos |

## API REST

Todos os endpoints estão sob o prefixo `/api`.

| Verbo | Rota | Descrição |
|-------|------|-----------|
| `GET` | `/api/itens?busca=&categoria=` | Listar itens com filtros |
| `GET` | `/api/itens/:id` | Obter item por ID |
| `POST` | `/api/itens` | Criar item |
| `PUT` | `/api/itens/:id` | Atualizar item |
| `DELETE` | `/api/itens/:id` | Excluir item (cascade) |
| `POST` | `/api/movimentacoes` | Registrar movimentação |
| `GET` | `/api/movimentacoes?item_id=&tipo=&data_inicio=&data_fim=` | Listar movimentações |
| `GET` | `/api/dashboard` | Métricas do dashboard |

## Testes

```bash
# Backend
cd backend && npm test

# Frontend
cd frontend && npm test
```

## Estrutura do Projeto

```
sistema-de-estoque/
├── backend/
│   ├── app.js                  # Configuração Express (exporta app)
│   ├── server.js               # Entry point (porta 3001)
│   ├── constants.js            # CATEGORIAS, UNIDADES
│   ├── database/
│   │   ├── connection.js       # Conexão better-sqlite3
│   │   └── schema.sql          # CREATE TABLE statements
│   ├── controllers/            # Lógica de negócio
│   ├── routes/                 # Rotas Express
│   ├── middleware/             # Validação e error handler
│   ├── scripts/                # Seeds SQL
│   └── __tests__/              # Jest + Supertest
├── frontend/
│   ├── src/
│   │   ├── App.jsx             # Rotas da aplicação
│   │   ├── api/client.js       # Cliente HTTP (fetch wrapper)
│   │   ├── hooks/useFetch.js   # Hook de data fetching
│   │   ├── components/         # Layout, Sidebar, Topbar, MetricCard, AlertTable, ItemForm, ConfirmDialog
│   │   ├── pages/              # Dashboard, Cadastrar, Listar, Movimentacoes, Historico
│   │   ├── utils/formatters.js # formatarMoeda, formatarData, formatarDataHora
│   │   └── constants/index.js  # CATEGORIAS, UNIDADES (espelho do backend)
│   └── vite.config.js
├── .llm/                       # PRD e design system docs
├── CLAUDE.md                   # Instruções para Claude Code
└── README.md
```

## Design System

Interface com foco em **precisão e densidade de informação**, ideal para uso operacional.

| Token | Valor | Uso |
|-------|-------|-----|
| `accent` | `#2563eb` | Botões, links ativos, indicadores |
| `foreground` | `#0f172a` | Texto principal |
| `secondary` | `#475569` | Texto secundário |
| `border` | `rgba(0,0,0,0.08)` | Bordas sutis entre seções |
| `surface` | `#ffffff` | Cards e painéis |
| `bg` | `#f8fafc` | Fundo da aplicação |

- Tipografia: `system-ui`, escala 11–18px
- Espaçamento base: 4px (escala: 4, 8, 12, 16, 24, 32)
- Bordas sem sombra — separação visual por linhas
- Raios: 4px, 6px, 8px (técnico e compacto)

## Licença

Uso interno.
