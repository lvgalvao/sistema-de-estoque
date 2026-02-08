# PRD — Sistema de Almoxarifado de Estoque de Alimentos

**Versão:** 2.0
**Data:** 07/02/2026
**Autor:** Luciano
**Status:** Implementado

---

## 1. Visão Geral

Sistema local de controle de estoque (almoxarifado) para itens de alimento, com interface web moderna em **React** (Vite + Tailwind CSS), API REST em **Node.js/Express**, e persistência em **SQLite3** (via better-sqlite3). O objetivo é oferecer um CRUD completo com funcionalidades extras de busca, alertas de validade e histórico de movimentações.

O sistema é executado localmente, sem necessidade de deploy em nuvem ou autenticação de usuários.

---

## 2. Objetivos

- Permitir o cadastro, edição, visualização e exclusão de itens de alimento no estoque.
- Controlar entradas e saídas de itens com registro histórico.
- Alertar sobre itens com validade próxima do vencimento.
- Facilitar a busca e filtragem de itens por nome ou categoria.
- Manter tudo simples: rodar local, sem dependências pesadas.

---

## 3. Stack Tecnológica

| Camada | Tecnologia |
|--------|-----------|
| Frontend | React 19 (Vite), Tailwind CSS 4, React Router 7 |
| Backend | Node.js, Express, better-sqlite3 |
| Banco de Dados | SQLite3 |
| Ambiente | Local (localhost) |

### 3.1 Dependências Backend

```json
{
  "express": "^4.21.0",
  "better-sqlite3": "^11.7.0",
  "cors": "^2.8.5"
}
```

### 3.2 Dependências Frontend

```json
{
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "react-router-dom": "^7.1.0",
  "tailwindcss": "^4.0.0",
  "@tailwindcss/vite": "^4.0.0"
}
```

---

## 4. Modelo de Dados

### 4.1 Tabela: `itens`

| Coluna | Tipo | Descrição | Obrigatório |
|--------|------|-----------|-------------|
| `id` | INTEGER | PK, autoincrement | Sim (auto) |
| `nome` | TEXT | Nome do item de alimento | Sim |
| `categoria` | TEXT | Categoria | Sim |
| `quantidade` | REAL | Quantidade atual em estoque | Sim |
| `unidade` | TEXT | Unidade de medida | Sim |
| `preco_unitario` | REAL | Preço unitário do item (R$) | Sim |
| `lote` | TEXT | Código/identificador do lote | Não |
| `data_validade` | DATE | Data de validade do item | Sim |
| `estoque_minimo` | REAL | Quantidade mínima antes de alertar | Sim |
| `data_criacao` | DATETIME | Data/hora de cadastro do item | Sim (auto) |
| `data_atualizacao` | DATETIME | Data/hora da última atualização | Sim (auto) |

### 4.2 Tabela: `movimentacoes`

| Coluna | Tipo | Descrição | Obrigatório |
|--------|------|-----------|-------------|
| `id` | INTEGER | PK, autoincrement | Sim (auto) |
| `item_id` | INTEGER | FK → `itens.id` | Sim |
| `tipo` | TEXT | `entrada` ou `saida` | Sim |
| `quantidade` | REAL | Quantidade movimentada | Sim |
| `observacao` | TEXT | Observação opcional | Não |
| `data_movimentacao` | DATETIME | Data/hora da movimentação | Sim (auto) |

### 4.3 Diagrama de Relacionamento

```
itens (1) ──────< (N) movimentacoes
  │                      │
  └── id (PK)            └── item_id (FK → itens.id ON DELETE CASCADE)
```

---

## 5. API REST

### 5.1 Itens

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/itens?busca=&categoria=` | Listar com filtros |
| GET | `/api/itens/:id` | Obter item |
| POST | `/api/itens` | Criar item |
| PUT | `/api/itens/:id` | Atualizar item |
| DELETE | `/api/itens/:id` | Excluir item (cascade) |

### 5.2 Movimentações

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/api/movimentacoes` | Registrar movimentação |
| GET | `/api/movimentacoes?item_id=&tipo=&data_inicio=&data_fim=` | Listar com filtros |

### 5.3 Dashboard

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/dashboard` | Retorna totalItens, itensValidadeProxima[], itensEstoqueBaixo[], valorTotal |

---

## 6. Funcionalidades (User Stories)

### 6.1 CRUD de Itens

| ID | História | Prioridade |
|----|----------|------------|
| US01 | Como usuário, quero **cadastrar** um novo item de alimento com todas as informações. | Alta |
| US02 | Como usuário, quero **visualizar** todos os itens cadastrados em uma tabela com filtros. | Alta |
| US03 | Como usuário, quero **editar** as informações de um item existente. | Alta |
| US04 | Como usuário, quero **excluir** um item do estoque. | Alta |

### 6.2 Movimentações

| ID | História | Prioridade |
|----|----------|------------|
| US05 | Como usuário, quero **registrar entrada** de itens no estoque. | Alta |
| US06 | Como usuário, quero **registrar saída** de itens do estoque. | Alta |
| US07 | Como usuário, quero **visualizar o histórico** de todas as movimentações. | Média |

### 6.3 Busca e Filtros

| ID | História | Prioridade |
|----|----------|------------|
| US08 | Como usuário, quero **buscar** itens pelo nome. | Média |
| US09 | Como usuário, quero **filtrar** itens por categoria. | Média |

### 6.4 Alertas

| ID | História | Prioridade |
|----|----------|------------|
| US10 | Como usuário, quero ver um **alerta visual** para itens com validade nos próximos 7 dias. | Média |
| US11 | Como usuário, quero ver um **alerta visual** para itens com estoque abaixo do mínimo. | Média |

---

## 7. Telas / Layout

### 7.1 Navegação (Sidebar)

Sidebar fixa à esquerda com tema Marinha do Brasil (navy-dark):

```
📦 Almoxarifado
├── 🏠 Dashboard
├── ➕ Cadastrar Item
├── 📋 Listar Itens
├── 🔄 Movimentações
└── 📊 Histórico
```

### 7.2 Dashboard

- 4 cards de métricas (total itens, validade próxima, estoque baixo, valor total)
- Tabela de alertas de validade (vermelho = vencido, amarelo = ≤ 7 dias)
- Tabela de alertas de estoque baixo (amarelo)

### 7.3 Cadastrar Item

- Formulário com todos os campos da tabela `itens`
- Validações no frontend e backend
- Feedback de sucesso/erro

### 7.4 Listar Itens

- Busca por nome + filtro por categoria
- Tabela com destaque visual (cores) para alertas
- Botões Editar/Excluir por item
- Modal de confirmação para exclusão

### 7.5 Movimentações

- Seleção do item, tipo (entrada/saída), quantidade, observação
- Validação de estoque para saídas

### 7.6 Histórico

- Filtros: item, tipo, data início, data fim (padrão: últimos 30 dias)
- Tabela com destaque: verde = entrada, vermelho = saída

---

## 8. Regras de Negócio

| ID | Regra |
|----|-------|
| RN01 | Não é permitido registrar saída que resulte em quantidade negativa no estoque. |
| RN02 | Itens com validade ≤ 7 dias devem ser exibidos com alerta amarelo. |
| RN03 | Itens com validade vencida devem ser exibidos com alerta vermelho. |
| RN04 | Itens com quantidade ≤ estoque mínimo devem ser exibidos com alerta visual. |
| RN05 | Ao excluir um item, todas as movimentações associadas devem ser excluídas (CASCADE). |
| RN06 | O campo `data_atualizacao` deve ser atualizado automaticamente em qualquer alteração. |
| RN07 | O preço unitário e a quantidade devem ser sempre valores positivos (> 0). |

---

## 9. Scripts SQL de Inicialização

```sql
CREATE TABLE IF NOT EXISTS itens (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    categoria TEXT NOT NULL,
    quantidade REAL NOT NULL CHECK(quantidade >= 0),
    unidade TEXT NOT NULL,
    preco_unitario REAL NOT NULL CHECK(preco_unitario > 0),
    lote TEXT,
    data_validade DATE NOT NULL,
    estoque_minimo REAL NOT NULL CHECK(estoque_minimo >= 0),
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS movimentacoes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    item_id INTEGER NOT NULL,
    tipo TEXT NOT NULL CHECK(tipo IN ('entrada', 'saida')),
    quantidade REAL NOT NULL CHECK(quantidade > 0),
    observacao TEXT,
    data_movimentacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (item_id) REFERENCES itens(id) ON DELETE CASCADE
);
```

---

## 10. Categorias Pré-definidas

```javascript
const CATEGORIAS = [
  'Grãos e Cereais',
  'Laticínios',
  'Carnes e Frios',
  'Bebidas',
  'Hortifruti',
  'Enlatados e Conservas',
  'Temperos e Condimentos',
  'Massas',
  'Congelados',
  'Padaria e Confeitaria',
  'Limpeza e Descartáveis',
  'Outros',
];
```

---

## 11. Unidades de Medida

```javascript
const UNIDADES = [
  'un',   // unidade
  'kg',   // quilograma
  'g',    // grama
  'L',    // litro
  'ml',   // mililitro
  'cx',   // caixa
  'pct',  // pacote
  'dz',   // dúzia
  'fd',   // fardo
  'lata', // lata
];
```

---

## 12. Estrutura de Pastas

```
sistema-de-estoque/
├── backend/
│   ├── package.json
│   ├── server.js
│   ├── constants.js
│   ├── database/
│   │   ├── connection.js
│   │   └── schema.sql
│   ├── routes/
│   │   ├── itens.js
│   │   ├── movimentacoes.js
│   │   └── dashboard.js
│   ├── controllers/
│   │   ├── itensController.js
│   │   ├── movimentacoesController.js
│   │   └── dashboardController.js
│   ├── middleware/
│   │   ├── errorHandler.js
│   │   └── validate.js
│   └── data/
├── frontend/
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   ├── public/
│   │   └── logo.png
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── index.css
│       ├── api/client.js
│       ├── constants/index.js
│       ├── utils/formatters.js
│       ├── hooks/useFetch.js
│       ├── components/
│       │   ├── Layout.jsx
│       │   ├── Sidebar.jsx
│       │   ├── Topbar.jsx
│       │   ├── MetricCard.jsx
│       │   ├── AlertTable.jsx
│       │   ├── ItemForm.jsx
│       │   └── ConfirmDialog.jsx
│       └── pages/
│           ├── Dashboard.jsx
│           ├── Cadastrar.jsx
│           ├── Listar.jsx
│           ├── Movimentacoes.jsx
│           └── Historico.jsx
├── logo.png
├── .gitignore
├── CLAUDE.md
└── .llm/prd.md
```

---

## 13. Como Rodar o Projeto

```bash
# 1. Backend
cd backend
npm install
npm run dev    # Servidor na porta 3001

# 2. Frontend (em outro terminal)
cd frontend
npm install
npm run dev    # App na porta 5173, proxy /api → 3001
```

---

## 14. Tema Visual — Marinha do Brasil

Cores definidas no Tailwind CSS (`@theme` em `src/index.css`):

| Token | Hex | Uso |
|-------|-----|-----|
| `navy-dark` | #071D41 | Sidebar, headers |
| `navy-mid` | #0C326F | Labels |
| `navy-blue` | #1351B4 | Botões, bordas, link ativo |
| `navy-light` | #C5D4EB | Bordas de inputs |
| `green-gov` | #168821 | Faixa superior |
| `yellow-gov` | #FFCD07 | Faixa superior |
| `alert-red` | #ffcccc | Alerta vermelho (vencido) |
| `alert-yellow` | #ffffcc | Alerta amarelo (vencendo/estoque baixo) |
| `alert-green` | #ccffcc | Movimentação entrada |

---

## 15. Critérios de Aceite

- [ ] Banco SQLite criado automaticamente na primeira execução.
- [ ] CRUD completo de itens funcionando (criar, ler, editar, excluir).
- [ ] Movimentações de entrada e saída atualizando o estoque corretamente.
- [ ] Busca por nome e filtro por categoria funcionando.
- [ ] Alertas visuais para validade próxima (≤ 7 dias) e estoque abaixo do mínimo.
- [ ] Histórico de movimentações com filtros por item, tipo e período.
- [ ] Dashboard com métricas resumidas.
- [ ] Validações impedindo dados inválidos (frontend + backend).
- [ ] Exclusão de item remove movimentações associadas (CASCADE).
- [ ] Backend rodando via `npm run dev` na porta 3001.
- [ ] Frontend rodando via `npm run dev` na porta 5173.
