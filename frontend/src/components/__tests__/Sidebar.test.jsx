import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Sidebar from '../Sidebar';

function renderSidebar() {
  return render(
    <MemoryRouter>
      <Sidebar />
    </MemoryRouter>
  );
}

describe('Sidebar', () => {
  it('renderiza 5 links de navegação', () => {
    renderSidebar();
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(5);
  });

  it('contém link para Dashboard', () => {
    renderSidebar();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  it('contém link para Cadastrar Item', () => {
    renderSidebar();
    expect(screen.getByText('Cadastrar Item')).toBeInTheDocument();
  });

  it('contém link para Listar Itens', () => {
    renderSidebar();
    expect(screen.getByText('Listar Itens')).toBeInTheDocument();
  });

  it('contém link para Movimentações', () => {
    renderSidebar();
    expect(screen.getByText('Movimentações')).toBeInTheDocument();
  });

  it('contém link para Histórico', () => {
    renderSidebar();
    expect(screen.getByText('Histórico')).toBeInTheDocument();
  });

  it('links possuem href corretos', () => {
    renderSidebar();
    const links = screen.getAllByRole('link');
    const hrefs = links.map((l) => l.getAttribute('href'));
    expect(hrefs).toContain('/');
    expect(hrefs).toContain('/cadastrar');
    expect(hrefs).toContain('/listar');
    expect(hrefs).toContain('/movimentacoes');
    expect(hrefs).toContain('/historico');
  });
});
