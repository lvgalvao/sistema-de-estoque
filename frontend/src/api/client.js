const BASE = '/api';

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.erro || 'Erro desconhecido');
  }

  return data;
}

export const api = {
  // Itens
  listarItens: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return request(`/itens${qs ? `?${qs}` : ''}`);
  },
  obterItem: (id) => request(`/itens/${id}`),
  criarItem: (data) => request('/itens', { method: 'POST', body: JSON.stringify(data) }),
  atualizarItem: (id, data) => request(`/itens/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  excluirItem: (id) => request(`/itens/${id}`, { method: 'DELETE' }),

  // Movimentacoes
  registrarMovimentacao: (data) => request('/movimentacoes', { method: 'POST', body: JSON.stringify(data) }),
  listarMovimentacoes: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return request(`/movimentacoes${qs ? `?${qs}` : ''}`);
  },

  // Dashboard
  obterDashboard: () => request('/dashboard'),
};
