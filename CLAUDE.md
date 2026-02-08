# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Sistema de Almoxarifado de Estoque de Alimentos — a local food inventory management system built with React, Node.js/Express, and SQLite3. The full PRD is at `.llm/prd.md`.

## Commands

```bash
# Backend
cd backend && npm install && npm run dev    # Express on port 3001

# Frontend
cd frontend && npm install && npm run dev   # Vite on port 5173 (proxies /api → 3001)
```

## Architecture

### Backend (`backend/`)

- **`server.js`** — Express entry point (port 3001)
- **`constants.js`** — CATEGORIAS, UNIDADES arrays
- **`database/connection.js`** — better-sqlite3 connection + auto-init from `schema.sql`
- **`database/schema.sql`** — CREATE TABLE statements (same schema as original)
- **`controllers/`** — Business logic: `itensController.js`, `movimentacoesController.js`, `dashboardController.js`
- **`routes/`** — Express routers: `itens.js`, `movimentacoes.js`, `dashboard.js`
- **`middleware/`** — `errorHandler.js` (global), `validate.js` (request body validation)
- **`data/almoxarifado.db`** — SQLite database (generated at runtime, do not commit)

### Frontend (`frontend/`)

- **`src/App.jsx`** — BrowserRouter with routes
- **`src/components/`** — Layout, Sidebar, Topbar, MetricCard, AlertTable, ItemForm, ConfirmDialog
- **`src/pages/`** — Dashboard, Cadastrar, Listar, Movimentacoes, Historico
- **`src/api/client.js`** — Fetch wrapper for all API routes
- **`src/hooks/useFetch.js`** — Data fetching hook
- **`src/constants/index.js`** — CATEGORIAS, UNIDADES (mirrors backend)
- **`src/utils/formatters.js`** — formatarMoeda, formatarData, formatarDataHora

### API Routes

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/itens?busca=&categoria=` | List items with filters |
| GET | `/api/itens/:id` | Get single item |
| POST | `/api/itens` | Create item |
| PUT | `/api/itens/:id` | Update item |
| DELETE | `/api/itens/:id` | Delete item (cascade) |
| POST | `/api/movimentacoes` | Register movement |
| GET | `/api/movimentacoes?item_id=&tipo=&data_inicio=&data_fim=` | List movements |
| GET | `/api/dashboard` | Dashboard metrics |

### Data Model

Two tables with a 1:N relationship (`itens` → `movimentacoes` via `item_id` FK with CASCADE delete). See `backend/database/schema.sql` for exact CREATE TABLE statements.

### Key Business Rules

- Outgoing movements (`saida`) must not result in negative stock (RN01)
- Items expiring within 7 days → yellow alert; already expired → red alert (RN02, RN03)
- Items at or below `estoque_minimo` → visual alert (RN04)
- Deleting an item cascades to its movements (RN05)
- `data_atualizacao` auto-updates on any item change (RN06)
- Price and quantity must be positive (RN07)

## Conventions

- All UI text, database column names, and API field names use **Portuguese**
- JavaScript naming: `camelCase` for functions/variables, component files in `PascalCase.jsx`
- Predefined enums for categories (`CATEGORIAS`) and units (`UNIDADES`) in both `backend/constants.js` and `frontend/src/constants/index.js`
- Movement types are strictly `'entrada'` or `'saida'`
- Tailwind CSS v4 with custom theme colors defined in `frontend/src/index.css` (`@theme` block)
- Navy theme: `navy-dark: #071D41`, `navy-blue: #1351B4`, `yellow-gov: #FFCD07`, `green-gov: #168821`
