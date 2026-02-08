const request = require('supertest');
const { createTestDb, mockGetDb } = require('./setup');

let db;

const validItem = {
  nome: 'Arroz Integral',
  categoria: 'Grãos e Cereais',
  quantidade: 20,
  unidade: 'kg',
  preco_unitario: 8.5,
  data_validade: '2025-12-31',
  estoque_minimo: 5,
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

async function createItem(app, overrides = {}) {
  const res = await request(app).post('/api/itens').send({ ...validItem, ...overrides });
  return res.body;
}

describe('POST /api/movimentacoes', () => {
  it('entrada aumenta estoque', async () => {
    const app = getApp();
    const item = await createItem(app);

    const res = await request(app).post('/api/movimentacoes').send({
      item_id: item.id,
      tipo: 'entrada',
      quantidade: 10,
    });

    expect(res.status).toBe(201);
    expect(res.body.item.quantidade).toBe(30); // 20 + 10
  });

  it('saída diminui estoque', async () => {
    const app = getApp();
    const item = await createItem(app);

    const res = await request(app).post('/api/movimentacoes').send({
      item_id: item.id,
      tipo: 'saida',
      quantidade: 5,
    });

    expect(res.status).toBe(201);
    expect(res.body.item.quantidade).toBe(15); // 20 - 5
  });

  it('RN01: saída com estoque insuficiente retorna 400', async () => {
    const app = getApp();
    const item = await createItem(app);

    const res = await request(app).post('/api/movimentacoes').send({
      item_id: item.id,
      tipo: 'saida',
      quantidade: 25, // mais que 20 disponível
    });

    expect(res.status).toBe(400);
    expect(res.body.erro).toContain('Estoque insuficiente');
  });

  it('saída exata (estoque vai a zero) funciona', async () => {
    const app = getApp();
    const item = await createItem(app);

    const res = await request(app).post('/api/movimentacoes').send({
      item_id: item.id,
      tipo: 'saida',
      quantidade: 20, // exatamente o estoque
    });

    expect(res.status).toBe(201);
    expect(res.body.item.quantidade).toBe(0);
  });

  it('item inexistente retorna 404', async () => {
    const app = getApp();

    const res = await request(app).post('/api/movimentacoes').send({
      item_id: 999,
      tipo: 'entrada',
      quantidade: 10,
    });

    expect(res.status).toBe(404);
    expect(res.body.erro).toContain('não encontrado');
  });
});

describe('GET /api/movimentacoes', () => {
  it('lista movimentações', async () => {
    const app = getApp();
    const item = await createItem(app);

    await request(app).post('/api/movimentacoes').send({
      item_id: item.id,
      tipo: 'entrada',
      quantidade: 5,
    });
    await request(app).post('/api/movimentacoes').send({
      item_id: item.id,
      tipo: 'saida',
      quantidade: 3,
    });

    const res = await request(app).get('/api/movimentacoes');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(2);
  });

  it('filtra por item_id', async () => {
    const app = getApp();
    const item1 = await createItem(app);
    const item2 = await createItem(app, { nome: 'Feijão' });

    await request(app).post('/api/movimentacoes').send({
      item_id: item1.id,
      tipo: 'entrada',
      quantidade: 5,
    });
    await request(app).post('/api/movimentacoes').send({
      item_id: item2.id,
      tipo: 'entrada',
      quantidade: 3,
    });

    const res = await request(app).get(`/api/movimentacoes?item_id=${item1.id}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].item_id).toBe(item1.id);
  });

  it('filtra por tipo', async () => {
    const app = getApp();
    const item = await createItem(app);

    await request(app).post('/api/movimentacoes').send({
      item_id: item.id,
      tipo: 'entrada',
      quantidade: 5,
    });
    await request(app).post('/api/movimentacoes').send({
      item_id: item.id,
      tipo: 'saida',
      quantidade: 3,
    });

    const res = await request(app).get('/api/movimentacoes?tipo=entrada');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].tipo).toBe('entrada');
  });
});
