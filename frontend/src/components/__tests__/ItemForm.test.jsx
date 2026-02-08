import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ItemForm from '../ItemForm';

// Helper to get form inputs by name attribute
function getInput(container, name) {
  return container.querySelector(`[name="${name}"]`);
}

describe('ItemForm', () => {
  it('renderiza todos os 8 campos e botão', () => {
    const { container } = render(<ItemForm onSubmit={() => {}} />);

    expect(screen.getByText(/Nome/)).toBeInTheDocument();
    expect(screen.getByText(/Categoria/)).toBeInTheDocument();
    expect(screen.getByText(/Quantidade/)).toBeInTheDocument();
    expect(screen.getByText(/Unidade/)).toBeInTheDocument();
    expect(screen.getByText(/Preço/)).toBeInTheDocument();
    expect(screen.getByText('Lote')).toBeInTheDocument();
    expect(screen.getByText(/Data de Validade/)).toBeInTheDocument();
    expect(screen.getByText(/Estoque Mínimo/)).toBeInTheDocument();

    expect(getInput(container, 'nome')).toBeInTheDocument();
    expect(getInput(container, 'categoria')).toBeInTheDocument();
    expect(getInput(container, 'quantidade')).toBeInTheDocument();
    expect(getInput(container, 'unidade')).toBeInTheDocument();
    expect(getInput(container, 'preco_unitario')).toBeInTheDocument();
    expect(getInput(container, 'lote')).toBeInTheDocument();
    expect(getInput(container, 'data_validade')).toBeInTheDocument();
    expect(getInput(container, 'estoque_minimo')).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /Salvar/ })).toBeInTheDocument();
  });

  it('validação: nome vazio mostra erro', async () => {
    const user = userEvent.setup();
    const { container } = render(<ItemForm onSubmit={() => {}} />);

    await user.type(getInput(container, 'quantidade'), '10');
    await user.type(getInput(container, 'preco_unitario'), '5');
    await user.type(getInput(container, 'data_validade'), '2025-12-31');

    await user.click(screen.getByRole('button', { name: /Salvar/ }));
    expect(screen.getByText(/Nome é obrigatório/)).toBeInTheDocument();
  });

  it('validação: preço vazio mostra erro', async () => {
    const user = userEvent.setup();
    const { container } = render(<ItemForm onSubmit={() => {}} />);

    await user.type(getInput(container, 'nome'), 'Arroz');
    await user.type(getInput(container, 'quantidade'), '10');
    // preco_unitario left empty (default "")
    await user.type(getInput(container, 'data_validade'), '2025-12-31');

    await user.click(screen.getByRole('button', { name: /Salvar/ }));
    expect(screen.getByText(/Preço deve ser > 0/)).toBeInTheDocument();
  });

  it('validação: data vazia mostra erro', async () => {
    const user = userEvent.setup();
    const { container } = render(<ItemForm onSubmit={() => {}} />);

    await user.type(getInput(container, 'nome'), 'Arroz');
    await user.type(getInput(container, 'quantidade'), '10');
    await user.type(getInput(container, 'preco_unitario'), '5');

    await user.click(screen.getByRole('button', { name: /Salvar/ }));
    expect(screen.getByText(/Data de validade é obrigatória/)).toBeInTheDocument();
  });

  it('onSubmit recebe valores numéricos convertidos', async () => {
    const onSubmit = vi.fn().mockResolvedValue(undefined);
    const user = userEvent.setup();
    const { container } = render(<ItemForm onSubmit={onSubmit} />);

    await user.type(getInput(container, 'nome'), 'Arroz');
    await user.type(getInput(container, 'quantidade'), '10');
    await user.type(getInput(container, 'preco_unitario'), '5.5');
    await user.type(getInput(container, 'data_validade'), '2025-12-31');

    await user.click(screen.getByRole('button', { name: /Salvar/ }));

    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        nome: 'Arroz',
        quantidade: 10,
        preco_unitario: 5.5,
        estoque_minimo: 1,
      })
    );
  });

  it('modo edição preenche campos do initial', () => {
    const initial = {
      nome: 'Feijão',
      categoria: 'Grãos e Cereais',
      quantidade: 25,
      unidade: 'kg',
      preco_unitario: 7.9,
      lote: 'L002',
      data_validade: '2025-06-30',
      estoque_minimo: 5,
    };
    const { container } = render(<ItemForm initial={initial} onSubmit={() => {}} />);

    expect(getInput(container, 'nome')).toHaveValue('Feijão');
    expect(getInput(container, 'quantidade')).toHaveValue(25);
    expect(getInput(container, 'preco_unitario')).toHaveValue(7.9);
    expect(getInput(container, 'lote')).toHaveValue('L002');
    expect(getInput(container, 'data_validade')).toHaveValue('2025-06-30');
    expect(getInput(container, 'estoque_minimo')).toHaveValue(5);
  });
});
