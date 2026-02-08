function errorHandler(err, req, res, next) {
  console.error(err.stack || err.message);

  if (err.status) {
    return res.status(err.status).json({ erro: err.message });
  }

  if (err.code === 'SQLITE_CONSTRAINT') {
    return res.status(400).json({ erro: 'Violação de restrição do banco de dados.' });
  }

  res.status(500).json({ erro: 'Erro interno do servidor.' });
}

module.exports = errorHandler;
