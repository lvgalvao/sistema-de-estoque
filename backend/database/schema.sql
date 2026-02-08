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
