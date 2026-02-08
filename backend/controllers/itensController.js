const { getDb } = require('../database/connection');

exports.listar = (req, res) => {
  const db = getDb();
  const { busca, categoria } = req.query;

  let query = 'SELECT * FROM itens WHERE 1=1';
  const params = [];

  if (busca) {
    query += ' AND nome LIKE ?';
    params.push(`%${busca}%`);
  }
  if (categoria) {
    query += ' AND categoria = ?';
    params.push(categoria);
  }

  query += ' ORDER BY nome';
  const itens = db.prepare(query).all(...params);
  res.json(itens);
};

exports.obter = (req, res) => {
  const db = getDb();
  const item = db.prepare('SELECT * FROM itens WHERE id = ?').get(req.params.id);

  if (!item) {
    return res.status(404).json({ erro: 'Item não encontrado.' });
  }
  res.json(item);
};

exports.criar = (req, res) => {
  const db = getDb();
  const { nome, categoria, quantidade, unidade, preco_unitario, lote, data_validade, estoque_minimo } = req.body;

  const result = db.prepare(`
    INSERT INTO itens (nome, categoria, quantidade, unidade, preco_unitario, lote, data_validade, estoque_minimo)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).run(nome.trim(), categoria, quantidade, unidade, preco_unitario, lote || null, data_validade, estoque_minimo);

  const item = db.prepare('SELECT * FROM itens WHERE id = ?').get(result.lastInsertRowid);
  res.status(201).json(item);
};

exports.atualizar = (req, res) => {
  const db = getDb();
  const { nome, categoria, quantidade, unidade, preco_unitario, lote, data_validade, estoque_minimo } = req.body;

  const existing = db.prepare('SELECT * FROM itens WHERE id = ?').get(req.params.id);
  if (!existing) {
    return res.status(404).json({ erro: 'Item não encontrado.' });
  }

  db.prepare(`
    UPDATE itens
    SET nome = ?, categoria = ?, quantidade = ?, unidade = ?,
        preco_unitario = ?, lote = ?, data_validade = ?,
        estoque_minimo = ?, data_atualizacao = datetime('now')
    WHERE id = ?
  `).run(nome.trim(), categoria, quantidade, unidade, preco_unitario, lote || null, data_validade, estoque_minimo, req.params.id);

  const item = db.prepare('SELECT * FROM itens WHERE id = ?').get(req.params.id);
  res.json(item);
};

exports.excluir = (req, res) => {
  const db = getDb();
  const existing = db.prepare('SELECT * FROM itens WHERE id = ?').get(req.params.id);
  if (!existing) {
    return res.status(404).json({ erro: 'Item não encontrado.' });
  }

  db.prepare('DELETE FROM itens WHERE id = ?').run(req.params.id);
  res.json({ mensagem: 'Item excluído com sucesso.' });
};
