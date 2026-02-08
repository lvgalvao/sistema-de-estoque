const request = require('supertest');
const { createTestDb, mockGetDb } = require('./setup');

let db;

const baseItem = {
  nome: 'Arroz',
  categoria: 'Grãos e Cereais',
  quantidade: 50,
  unidade: 'kg',
  preco_unitario: 10,
  data_validade: '2026-12-31',
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

function insertItem(overrides = {}) {
  const item = { ...baseItem, ...overrides };
  const result = db.prepare(`
    INSERT INTO itens (nome, categoria, quantidade, unidade, preco_unitario, lote, data_validade, estoque_minimo)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    item.nome, item.categoria, item.quantidade, item.unidade,
    item.preco_unitario, item.lote || null, item.data_validade, item.estoque_minimo
  );
  return result.lastInsertRowid;
}

describe('GET /api/dashboard', () => {
  it('DB vazio: retorna zeros e arrays vazios', async () => {
    const app = getApp();
    const res = await request(app).get('/api/dashboard');
    expect(res.status).toBe(200);
    expect(res.body.totalItens).toBe(0);
    expect(res.body.valorTotal).toBe(0);
    expect(res.body.itensValidadeProxima).toEqual([]);
    expect(res.body.itensEstoqueBaixo).toEqual([]);
  });

  it('totalItens conta corretamente', async () => {
    insertItem({ nome: 'Arroz' });
    insertItem({ nome: 'Feijão' });
    insertItem({ nome: 'Leite', categoria: 'Laticínios' });

    const app = getApp();
    const res = await request(app).get('/api/dashboard');
    expect(res.body.totalItens).toBe(3);
  });

  it('valorTotal soma quantidade * preco_unitario', async () => {
    insertItem({ nome: 'Arroz', quantidade: 10, preco_unitario: 5 }); // 50
    insertItem({ nome: 'Feijão', quantidade: 20, preco_unitario: 3 }); // 60

    const app = getApp();
    const res = await request(app).get('/api/dashboard');
    expect(res.body.valorTotal).toBe(110);
  });

  it('RN02/RN03: detecta itens com validade próxima e vencidos', async () => {
    const today = new Date();

    // Item vencido (ontem)
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    insertItem({ nome: 'Vencido', data_validade: yesterday.toISOString().split('T')[0] });

    // Item vencendo em 3 dias
    const in3days = new Date(today);
    in3days.setDate(today.getDate() + 3);
    insertItem({ nome: 'Quase vencendo', data_validade: in3days.toISOString().split('T')[0] });

    // Item com 30 dias - não deve aparecer
    const in30days = new Date(today);
    in30days.setDate(today.getDate() + 30);
    insertItem({ nome: 'Normal', data_validade: in30days.toISOString().split('T')[0] });

    const app = getApp();
    const res = await request(app).get('/api/dashboard');

    const names = res.body.itensValidadeProxima.map((i) => i.nome);
    expect(names).toContain('Vencido');
    expect(names).toContain('Quase vencendo');
    expect(names).not.toContain('Normal');
  });

  it('RN04: detecta itens com estoque baixo', async () => {
    // Estoque abaixo do mínimo
    insertItem({ nome: 'Pouco', quantidade: 3, estoque_minimo: 10 });

    // Estoque igual ao mínimo
    insertItem({ nome: 'Limite', quantidade: 5, estoque_minimo: 5 });

    // Estoque acima do mínimo - não deve aparecer
    insertItem({ nome: 'OK', quantidade: 50, estoque_minimo: 5 });

    const app = getApp();
    const res = await request(app).get('/api/dashboard');

    const names = res.body.itensEstoqueBaixo.map((i) => i.nome);
    expect(names).toContain('Pouco');
    expect(names).toContain('Limite');
    expect(names).not.toContain('OK');
  });
});
