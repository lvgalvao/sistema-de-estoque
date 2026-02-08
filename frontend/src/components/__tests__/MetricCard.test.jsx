import { render, screen } from '@testing-library/react';
import MetricCard from '../MetricCard';

describe('MetricCard', () => {
  it('renderiza label e value', () => {
    render(<MetricCard label="Total de Itens" value={42} />);
    expect(screen.getByText('Total de Itens')).toBeInTheDocument();
    expect(screen.getByText('42')).toBeInTheDocument();
  });

  it('renderiza value como string', () => {
    render(<MetricCard label="Valor Total" value="R$ 1.000,00" />);
    expect(screen.getByText('Valor Total')).toBeInTheDocument();
    expect(screen.getByText('R$ 1.000,00')).toBeInTheDocument();
  });
});
