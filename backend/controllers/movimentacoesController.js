const { getDb } = require('../database/connection');

exports.registrar = (req, res) => {
  const db = getDb();
  const { item_id, tipo, quantidade, observacao } = req.body;

  const item = db.prepare('SELECT * FROM itens WHERE id = ?').get(item_id);
  if (!item) {
    return res.status(404).json({ erro: 'Item não encontrado.' });
  }

  if (tipo === 'saida' && item.quantidade < quantidade) {
    return res.status(400).json({
      erro: `Estoque insuficiente. Disponível: ${item.quantidade}`,
    });
  }

  const transaction = db.transaction(() => {
    if (tipo === 'entrada') {
      db.prepare(`
        UPDATE itens
        SET quantidade = quantidade + ?, data_atualizacao = datetime('now')
        WHERE id = ?
      `).run(quantidade, item_id);
    } else {
      db.prepare(`
        UPDATE itens
        SET quantidade = quantidade - ?, data_atualizacao = datetime('now')
        WHERE id = ?
      `).run(quantidade, item_id);
    }

    db.prepare(`
      INSERT INTO movimentacoes (item_id, tipo, quantidade, observacao)
      VALUES (?, ?, ?, ?)
    `).run(item_id, tipo, quantidade, observacao || null);
  });

  transaction();

  const updatedItem = db.prepare('SELECT * FROM itens WHERE id = ?').get(item_id);
  res.status(201).json({
    mensagem: 'Movimentação registrada com sucesso.',
    item: updatedItem,
  });
};

exports.listar = (req, res) => {
  const db = getDb();
  const { item_id, tipo, data_inicio, data_fim } = req.query;

  let query = `
    SELECT m.*, i.nome AS item_nome
    FROM movimentacoes m
    JOIN itens i ON m.item_id = i.id
    WHERE 1=1
  `;
  const params = [];

  if (item_id) {
    query += ' AND m.item_id = ?';
    params.push(item_id);
  }
  if (tipo) {
    query += ' AND m.tipo = ?';
    params.push(tipo);
  }
  if (data_inicio) {
    query += ' AND DATE(m.data_movimentacao) >= ?';
    params.push(data_inicio);
  }
  if (data_fim) {
    query += ' AND DATE(m.data_movimentacao) <= ?';
    params.push(data_fim);
  }

  query += ' ORDER BY m.data_movimentacao DESC';
  const movimentacoes = db.prepare(query).all(...params);
  res.json(movimentacoes);
};
