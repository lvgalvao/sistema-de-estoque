const { CATEGORIAS, UNIDADES } = require('../constants');

function validateItem(req, res, next) {
  const { nome, categoria, quantidade, unidade, preco_unitario, data_validade, estoque_minimo } = req.body;

  const erros = [];

  if (!nome || !nome.trim()) erros.push('Nome é obrigatório.');
  if (!categoria || !CATEGORIAS.includes(categoria)) erros.push('Categoria inválida.');
  if (quantidade == null || quantidade < 0) erros.push('Quantidade deve ser >= 0.');
  if (!unidade || !UNIDADES.includes(unidade)) erros.push('Unidade inválida.');
  if (preco_unitario == null || preco_unitario <= 0) erros.push('Preço unitário deve ser > 0.');
  if (!data_validade) erros.push('Data de validade é obrigatória.');
  if (estoque_minimo == null || estoque_minimo < 0) erros.push('Estoque mínimo deve ser >= 0.');

  if (erros.length > 0) {
    return res.status(400).json({ erro: erros.join(' ') });
  }

  next();
}

function validateMovimentacao(req, res, next) {
  const { item_id, tipo, quantidade } = req.body;

  const erros = [];

  if (!item_id) erros.push('Item é obrigatório.');
  if (!tipo || !['entrada', 'saida'].includes(tipo)) erros.push('Tipo deve ser "entrada" ou "saida".');
  if (quantidade == null || quantidade <= 0) erros.push('Quantidade deve ser > 0.');

  if (erros.length > 0) {
    return res.status(400).json({ erro: erros.join(' ') });
  }

  next();
}

module.exports = { validateItem, validateMovimentacao };
