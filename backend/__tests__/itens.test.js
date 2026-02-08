const request = require('supertest');
const { createTestDb, mockGetDb } = require('./setup');

let db;

const validItem = {
  nome: 'Arroz Integral',
  categoria: 'Grãos e Cereais',
  quantidade: 50,
  unidade: 'kg',
  preco_unitario: 8.5,
  lote: 'L001',
  data_validade: '2025-12-31',
  estoque_minimo: 10,
};

beforeEach(() => {
  jest.resetModules();
  db = createTestDb();
  mockGetDb(db);
});

afterEach(() => {
  db.close();
});

function getApp() {
  return require('../app');
}

describe('POST /api/itens', () => {
  it('cria item válido e retorna 201', async () => {
    const app = getApp();
    const res = await request(app).post('/api/itens').send(validItem);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.nome).toBe('Arroz Integral');
    expect(res.body.quantidade).toBe(50);
  });

  it('rejeita campos inválidos com 400', async () => {
    const app = getApp();
    const res = await request(app).post('/api/itens').send({ nome: '' });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('erro');
  });
});

describe('GET /api/itens', () => {
  it('retorna lista vazia inicialmente', async () => {
    const app = getApp();
    const res = await request(app).get('/api/itens');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  it('filtra por busca (nome)', async () => {
    const app = getApp();
    await request(app).post('/api/itens').send(validItem);
    await request(app).post('/api/itens').send({ ...validItem, nome: 'Feijão Preto' });

    const res = await request(app).get('/api/itens?busca=Arroz');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].nome).toBe('Arroz Integral');
  });

  it('filtra por categoria', async () => {
    const app = getApp();
    await request(app).post('/api/itens').send(validItem);
    await request(app).post('/api/itens').send({
      ...validItem,
      nome: 'Leite',
      categoria: 'Laticínios',
    });

    const res = await request(app).get('/api/itens?categoria=Laticínios');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].nome).toBe('Leite');
  });

  it('filtra por busca + categoria combinados', async () => {
    const app = getApp();
    await request(app).post('/api/itens').send(validItem);
    await request(app).post('/api/itens').send({
      ...validItem,
      nome: 'Feijão Preto',
    });

    const res = await request(app).get('/api/itens?busca=Feijão&categoria=Grãos e Cereais');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].nome).toBe('Feijão Preto');
  });
});

describe('GET /api/itens/:id', () => {
  it('retorna item existente com 200', async () => {
    const app = getApp();
    const created = await request(app).post('/api/itens').send(validItem);
    const res = await request(app).get(`/api/itens/${created.body.id}`);
    expect(res.status).toBe(200);
    expect(res.body.nome).toBe('Arroz Integral');
  });

  it('retorna 404 para item inexistente', async () => {
    const app = getApp();
    const res = await request(app).get('/api/itens/999');
    expect(res.status).toBe(404);
    expect(res.body.erro).toContain('não encontrado');
  });
});

describe('PUT /api/itens/:id', () => {
  it('atualiza item existente com 200', async () => {
    const app = getApp();
    const created = await request(app).post('/api/itens').send(validItem);
    const updated = { ...validItem, nome: 'Arroz Branco', quantidade: 30 };
    const res = await request(app).put(`/api/itens/${created.body.id}`).send(updated);
    expect(res.status).toBe(200);
    expect(res.body.nome).toBe('Arroz Branco');
    expect(res.body.quantidade).toBe(30);
  });

  it('retorna 404 para item inexistente', async () => {
    const app = getApp();
    const res = await request(app).put('/api/itens/999').send(validItem);
    expect(res.status).toBe(404);
  });

  it('valida input com 400', async () => {
    const app = getApp();
    const created = await request(app).post('/api/itens').send(validItem);
    const res = await request(app).put(`/api/itens/${created.body.id}`).send({ nome: '' });
    expect(res.status).toBe(400);
  });
});

describe('DELETE /api/itens/:id', () => {
  it('exclui item existente com 200', async () => {
    const app = getApp();
    const created = await request(app).post('/api/itens').send(validItem);
    const res = await request(app).delete(`/api/itens/${created.body.id}`);
    expect(res.status).toBe(200);
    expect(res.body.mensagem).toContain('excluído');

    const check = await request(app).get(`/api/itens/${created.body.id}`);
    expect(check.status).toBe(404);
  });

  it('retorna 404 para item inexistente', async () => {
    const app = getApp();
    const res = await request(app).delete('/api/itens/999');
    expect(res.status).toBe(404);
  });

  it('CASCADE: exclui movimentações do item (RN05)', async () => {
    const app = getApp();
    const created = await request(app).post('/api/itens').send(validItem);
    const itemId = created.body.id;

    // Registrar movimentação
    await request(app).post('/api/movimentacoes').send({
      item_id: itemId,
      tipo: 'entrada',
      quantidade: 5,
    });

    // Verificar que movimentação existe
    const movsBefore = db.prepare('SELECT COUNT(*) AS total FROM movimentacoes WHERE item_id = ?').get(itemId);
    expect(movsBefore.total).toBe(1);

    // Excluir item
    await request(app).delete(`/api/itens/${itemId}`);

    // Verificar que movimentação foi cascadeada
    const movsAfter = db.prepare('SELECT COUNT(*) AS total FROM movimentacoes WHERE item_id = ?').get(itemId);
    expect(movsAfter.total).toBe(0);
  });
});
