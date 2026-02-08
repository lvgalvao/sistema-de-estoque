import { api } from '../client';

const mockResponse = (body, ok = true) => ({
  ok,
  json: () => Promise.resolve(body),
});

beforeEach(() => {
  globalThis.fetch = vi.fn();
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('api.listarItens', () => {
  it('chama GET /api/itens sem params', async () => {
    fetch.mockResolvedValue(mockResponse([]));
    await api.listarItens();
    expect(fetch).toHaveBeenCalledWith('/api/itens', expect.objectContaining({ headers: expect.any(Object) }));
  });

  it('constrói query string com filtros', async () => {
    fetch.mockResolvedValue(mockResponse([]));
    await api.listarItens({ busca: 'arroz', categoria: 'Grãos e Cereais' });
    const url = fetch.mock.calls[0][0];
    expect(url).toContain('busca=arroz');
    expect(url).toContain('categoria=');
  });
});

describe('api.obterItem', () => {
  it('chama GET /api/itens/:id', async () => {
    fetch.mockResolvedValue(mockResponse({ id: 1 }));
    await api.obterItem(1);
    expect(fetch).toHaveBeenCalledWith('/api/itens/1', expect.any(Object));
  });
});

describe('api.criarItem', () => {
  it('chama POST /api/itens', async () => {
    fetch.mockResolvedValue(mockResponse({ id: 1 }));
    await api.criarItem({ nome: 'Arroz' });
    expect(fetch).toHaveBeenCalledWith('/api/itens', expect.objectContaining({ method: 'POST' }));
  });
});

describe('api.atualizarItem', () => {
  it('chama PUT /api/itens/:id', async () => {
    fetch.mockResolvedValue(mockResponse({ id: 1 }));
    await api.atualizarItem(1, { nome: 'Arroz' });
    expect(fetch).toHaveBeenCalledWith('/api/itens/1', expect.objectContaining({ method: 'PUT' }));
  });
});

describe('api.excluirItem', () => {
  it('chama DELETE /api/itens/:id', async () => {
    fetch.mockResolvedValue(mockResponse({ mensagem: 'ok' }));
    await api.excluirItem(1);
    expect(fetch).toHaveBeenCalledWith('/api/itens/1', expect.objectContaining({ method: 'DELETE' }));
  });
});

describe('api.registrarMovimentacao', () => {
  it('chama POST /api/movimentacoes', async () => {
    fetch.mockResolvedValue(mockResponse({ id: 1 }));
    await api.registrarMovimentacao({ item_id: 1, tipo: 'entrada', quantidade: 5 });
    expect(fetch).toHaveBeenCalledWith('/api/movimentacoes', expect.objectContaining({ method: 'POST' }));
  });
});

describe('api.listarMovimentacoes', () => {
  it('chama GET /api/movimentacoes', async () => {
    fetch.mockResolvedValue(mockResponse([]));
    await api.listarMovimentacoes();
    expect(fetch).toHaveBeenCalledWith('/api/movimentacoes', expect.any(Object));
  });
});

describe('api.obterDashboard', () => {
  it('chama GET /api/dashboard', async () => {
    fetch.mockResolvedValue(mockResponse({}));
    await api.obterDashboard();
    expect(fetch).toHaveBeenCalledWith('/api/dashboard', expect.any(Object));
  });
});

describe('erro de API', () => {
  it('lança Error com mensagem do servidor quando res.ok=false', async () => {
    fetch.mockResolvedValue(mockResponse({ erro: 'Item não encontrado.' }, false));
    await expect(api.obterItem(999)).rejects.toThrow('Item não encontrado.');
  });
});
