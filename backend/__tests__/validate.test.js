const { validateItem, validateMovimentacao } = require('../middleware/validate');

function createMockReqRes(body = {}) {
  const req = { body };
  const res = {
    statusCode: null,
    body: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(data) {
      this.body = data;
      return this;
    },
  };
  const next = jest.fn();
  return { req, res, next };
}

const validItem = {
  nome: 'Arroz',
  categoria: 'Grãos e Cereais',
  quantidade: 10,
  unidade: 'kg',
  preco_unitario: 5.5,
  data_validade: '2025-12-31',
  estoque_minimo: 2,
};

describe('validateItem', () => {
  it('aceita payload válido e chama next', () => {
    const { req, res, next } = createMockReqRes(validItem);
    validateItem(req, res, next);
    expect(next).toHaveBeenCalled();
    expect(res.statusCode).toBeNull();
  });

  it('rejeita nome vazio', () => {
    const { req, res, next } = createMockReqRes({ ...validItem, nome: '' });
    validateItem(req, res, next);
    expect(res.statusCode).toBe(400);
    expect(res.body.erro).toContain('Nome');
    expect(next).not.toHaveBeenCalled();
  });

  it('rejeita categoria inválida', () => {
    const { req, res, next } = createMockReqRes({ ...validItem, categoria: 'Inexistente' });
    validateItem(req, res, next);
    expect(res.statusCode).toBe(400);
    expect(res.body.erro).toContain('Categoria');
  });

  it('rejeita quantidade negativa', () => {
    const { req, res, next } = createMockReqRes({ ...validItem, quantidade: -1 });
    validateItem(req, res, next);
    expect(res.statusCode).toBe(400);
    expect(res.body.erro).toContain('Quantidade');
  });

  it('rejeita unidade inválida', () => {
    const { req, res, next } = createMockReqRes({ ...validItem, unidade: 'xpto' });
    validateItem(req, res, next);
    expect(res.statusCode).toBe(400);
    expect(res.body.erro).toContain('Unidade');
  });

  it('rejeita preço unitário zero', () => {
    const { req, res, next } = createMockReqRes({ ...validItem, preco_unitario: 0 });
    validateItem(req, res, next);
    expect(res.statusCode).toBe(400);
    expect(res.body.erro).toContain('Preço');
  });

  it('rejeita data_validade ausente', () => {
    const { req, res, next } = createMockReqRes({ ...validItem, data_validade: '' });
    validateItem(req, res, next);
    expect(res.statusCode).toBe(400);
    expect(res.body.erro).toContain('validade');
  });

  it('rejeita estoque_minimo negativo', () => {
    const { req, res, next } = createMockReqRes({ ...validItem, estoque_minimo: -1 });
    validateItem(req, res, next);
    expect(res.statusCode).toBe(400);
    expect(res.body.erro).toContain('Estoque');
  });

  it('acumula múltiplos erros', () => {
    const { req, res, next } = createMockReqRes({ nome: '', categoria: 'X', quantidade: -1 });
    validateItem(req, res, next);
    expect(res.statusCode).toBe(400);
    expect(res.body.erro).toContain('Nome');
    expect(res.body.erro).toContain('Categoria');
    expect(res.body.erro).toContain('Quantidade');
  });
});

describe('validateMovimentacao', () => {
  const validMov = { item_id: 1, tipo: 'entrada', quantidade: 5 };

  it('aceita payload válido e chama next', () => {
    const { req, res, next } = createMockReqRes(validMov);
    validateMovimentacao(req, res, next);
    expect(next).toHaveBeenCalled();
    expect(res.statusCode).toBeNull();
  });

  it('rejeita item_id ausente', () => {
    const { req, res, next } = createMockReqRes({ ...validMov, item_id: null });
    validateMovimentacao(req, res, next);
    expect(res.statusCode).toBe(400);
    expect(res.body.erro).toContain('Item');
  });

  it('rejeita tipo inválido', () => {
    const { req, res, next } = createMockReqRes({ ...validMov, tipo: 'invalido' });
    validateMovimentacao(req, res, next);
    expect(res.statusCode).toBe(400);
    expect(res.body.erro).toContain('Tipo');
  });

  it('rejeita quantidade zero', () => {
    const { req, res, next } = createMockReqRes({ ...validMov, quantidade: 0 });
    validateMovimentacao(req, res, next);
    expect(res.statusCode).toBe(400);
    expect(res.body.erro).toContain('Quantidade');
  });

  it('rejeita quantidade negativa', () => {
    const { req, res, next } = createMockReqRes({ ...validMov, quantidade: -5 });
    validateMovimentacao(req, res, next);
    expect(res.statusCode).toBe(400);
    expect(res.body.erro).toContain('Quantidade');
  });
});
