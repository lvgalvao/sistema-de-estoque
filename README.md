# Sistema de Almoxarifado de Estoque de Alimentos

Sistema local de controle de estoque (almoxarifado) para itens de alimento, com interface web moderna em React, API REST em Node.js/Express e persistência em SQLite3.

![Logo](logo.png)

## Stack Tecnológica

| Camada | Tecnologia |
|--------|-----------|
| Frontend | React 19, Vite, Tailwind CSS 4, React Router 7 |
| Backend | Node.js, Express, better-sqlite3 |
| Banco de Dados | SQLite3 |
| Testes Backend | Jest + Supertest (41 testes) |
| Testes Frontend | Vitest + React Testing Library (52 testes) |

## Como Rodar

```bash
# Backend
cd backend
npm install
npm run dev    # Servidor na porta 3001

# Frontend (em outro terminal)
cd frontend
npm install
npm run dev    # App na porta 5173, proxy /api → 3001
```

## Testes

```bash
# Backend — 41 testes, 4 suites
cd backend && npm test

# Frontend — 52 testes, 9 suites
cd frontend && npm test
```

## Funcionalidades

- CRUD completo de itens de alimento
- Registro de entrada e saída de estoque com histórico
- Dashboard com métricas (total de itens, valor total, alertas)
- Busca por nome e filtro por categoria
- Alertas visuais de validade (vencido/vencendo) e estoque baixo
- Validação de dados no frontend e backend

## Regras de Negócio

| ID | Regra |
|----|-------|
| RN01 | Saída não pode resultar em estoque negativo |
| RN02 | Itens com validade <= 7 dias exibem alerta amarelo |
| RN03 | Itens vencidos exibem alerta vermelho |
| RN04 | Itens com quantidade <= estoque mínimo exibem alerta |
| RN05 | Exclusão de item remove movimentações em cascata |
| RN06 | `data_atualizacao` atualiza automaticamente em qualquer alteração |
| RN07 | Preço e quantidade devem ser positivos |

## API

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/itens?busca=&categoria=` | Listar itens com filtros |
| GET | `/api/itens/:id` | Obter item |
| POST | `/api/itens` | Criar item |
| PUT | `/api/itens/:id` | Atualizar item |
| DELETE | `/api/itens/:id` | Excluir item (cascade) |
| POST | `/api/movimentacoes` | Registrar movimentação |
| GET | `/api/movimentacoes?item_id=&tipo=&data_inicio=&data_fim=` | Listar movimentações |
| GET | `/api/dashboard` | Métricas do dashboard |

## Estrutura do Projeto

```
sistema-de-estoque/
├── backend/
│   ├── app.js                  # Configuração Express
│   ├── server.js               # Entry point (porta 3001)
│   ├── constants.js            # CATEGORIAS, UNIDADES
│   ├── database/
│   │   ├── connection.js       # Conexão SQLite
│   │   └── schema.sql          # Schema do banco
│   ├── controllers/            # Lógica de negócio
│   ├── routes/                 # Rotas Express
│   ├── middleware/             # Validação e error handler
│   └── __tests__/             # Testes Jest + Supertest
├── frontend/
│   ├── src/
│   │   ├── App.jsx            # Rotas da aplicação
│   │   ├── api/client.js      # Cliente HTTP
│   │   ├── hooks/useFetch.js  # Hook de data fetching
│   │   ├── components/        # Componentes reutilizáveis
│   │   ├── pages/             # Páginas da aplicação
│   │   ├── utils/formatters.js
│   │   └── constants/index.js
│   └── vite.config.js
├── CLAUDE.md
└── .llm/prd.md
```

## Tema Visual

Tema inspirado na Marinha do Brasil com cores navy, verde e amarelo governamentais.

| Token | Cor | Uso |
|-------|-----|-----|
| `navy-dark` | #071D41 | Sidebar, headers |
| `navy-blue` | #1351B4 | Botoes, links ativos |
| `green-gov` | #168821 | Faixa superior |
| `yellow-gov` | #FFCD07 | Destaques |
