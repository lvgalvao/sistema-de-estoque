const { getDb } = require('../database/connection');

exports.obter = (req, res) => {
  const db = getDb();

  const totalItens = db.prepare('SELECT COUNT(*) AS total FROM itens').get().total;

  // Items expiring within 7 days (including already expired)
  const itensValidadeProxima = db.prepare(`
    SELECT * FROM itens
    WHERE data_validade <= date('now', '+7 days')
    ORDER BY data_validade
  `).all();

  const itensEstoqueBaixo = db.prepare(`
    SELECT * FROM itens
    WHERE quantidade <= estoque_minimo
    ORDER BY quantidade
  `).all();

  const valorTotal = db.prepare(`
    SELECT COALESCE(SUM(quantidade * preco_unitario), 0) AS total FROM itens
  `).get().total;

  res.json({
    totalItens,
    itensValidadeProxima,
    itensEstoqueBaixo,
    valorTotal,
  });
};
