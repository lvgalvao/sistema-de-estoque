import { render, screen } from '@testing-library/react';
import AlertTable from '../AlertTable';

describe('AlertTable', () => {
  it('lista vazia mostra mensagem "Nenhum alerta"', () => {
    render(<AlertTable itens={[]} tipo="validade" titulo="Alertas de Validade" />);
    expect(screen.getByText(/Nenhum alerta/)).toBeInTheDocument();
  });

  it('null itens mostra mensagem "Nenhum alerta"', () => {
    render(<AlertTable itens={null} tipo="validade" titulo="Alertas de Validade" />);
    expect(screen.getByText(/Nenhum alerta/)).toBeInTheDocument();
  });

  it('renderiza linhas de itens com validade', () => {
    const itens = [
      { id: 1, nome: 'Arroz', categoria: 'Grãos', quantidade: 10, unidade: 'kg', data_validade: '2025-01-01' },
      { id: 2, nome: 'Feijão', categoria: 'Grãos', quantidade: 5, unidade: 'kg', data_validade: '2025-06-15' },
    ];
    render(<AlertTable itens={itens} tipo="validade" titulo="Alertas de Validade" />);
    expect(screen.getByText('Arroz')).toBeInTheDocument();
    expect(screen.getByText('Feijão')).toBeInTheDocument();
    expect(screen.getByText('Validade')).toBeInTheDocument();
  });

  it('renderiza coluna Estoque Mín. para tipo estoque', () => {
    const itens = [
      { id: 1, nome: 'Arroz', categoria: 'Grãos', quantidade: 2, unidade: 'kg', estoque_minimo: 10 },
    ];
    render(<AlertTable itens={itens} tipo="estoque" titulo="Alertas de Estoque" />);
    expect(screen.getByText('Estoque Mín.')).toBeInTheDocument();
    expect(screen.queryByText('Validade')).not.toBeInTheDocument();
  });

  it('aplica bg-alert-red para item vencido (tipo=validade)', () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const itens = [
      { id: 1, nome: 'Vencido', categoria: 'Grãos', quantidade: 10, unidade: 'kg', data_validade: yesterday.toISOString().split('T')[0] },
    ];
    const { container } = render(<AlertTable itens={itens} tipo="validade" titulo="Alerta" />);
    const row = container.querySelector('tbody tr');
    expect(row.className).toContain('bg-alert-red');
  });

  it('aplica bg-alert-yellow para item dentro da validade (tipo=validade)', () => {
    const future = new Date();
    future.setDate(future.getDate() + 5);
    const itens = [
      { id: 1, nome: 'Quase', categoria: 'Grãos', quantidade: 10, unidade: 'kg', data_validade: future.toISOString().split('T')[0] },
    ];
    const { container } = render(<AlertTable itens={itens} tipo="validade" titulo="Alerta" />);
    const row = container.querySelector('tbody tr');
    expect(row.className).toContain('bg-alert-yellow');
  });
});
