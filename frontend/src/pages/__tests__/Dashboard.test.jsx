import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

// Mock the api client
vi.mock('../../api/client', () => ({
  api: {
    obterDashboard: vi.fn(),
  },
}));

import { api } from '../../api/client';
import Dashboard from '../Dashboard';

describe('Dashboard', () => {
  it('mostra loading state', () => {
    api.obterDashboard.mockReturnValue(new Promise(() => {})); // never resolves
    render(<Dashboard />);
    expect(screen.getByText('Carregando...')).toBeInTheDocument();
  });

  it('mostra error state', async () => {
    api.obterDashboard.mockRejectedValue(new Error('Falha na conexão'));
    render(<Dashboard />);
    const errorEl = await screen.findByText(/Erro:.*Falha na conexão/);
    expect(errorEl).toBeInTheDocument();
  });

  it('renderiza 4 métricas e 2 tabelas de alertas', async () => {
    api.obterDashboard.mockResolvedValue({
      totalItens: 15,
      valorTotal: 1250.5,
      itensValidadeProxima: [
        { id: 1, nome: 'Arroz', categoria: 'Grãos', quantidade: 10, unidade: 'kg', data_validade: '2025-01-15' },
      ],
      itensEstoqueBaixo: [
        { id: 2, nome: 'Feijão', categoria: 'Grãos', quantidade: 2, unidade: 'kg', estoque_minimo: 10 },
      ],
    });

    render(<Dashboard />);

    // Wait for loading to finish
    await screen.findByText('15');

    // Metrics
    expect(screen.getByText('Total de Itens')).toBeInTheDocument();
    expect(screen.getByText('15')).toBeInTheDocument();
    expect(screen.getByText('Validade Próxima')).toBeInTheDocument();
    expect(screen.getByText('Estoque Baixo')).toBeInTheDocument();
    expect(screen.getByText('Valor Total')).toBeInTheDocument();

    // Alert tables
    expect(screen.getByText('Alertas de Validade')).toBeInTheDocument();
    expect(screen.getByText('Alertas de Estoque Baixo')).toBeInTheDocument();
    expect(screen.getByText('Arroz')).toBeInTheDocument();
    expect(screen.getByText('Feijão')).toBeInTheDocument();
  });
});
