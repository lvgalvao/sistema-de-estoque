import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ConfirmDialog from '../ConfirmDialog';

describe('ConfirmDialog', () => {
  it('open=false não renderiza nada', () => {
    const { container } = render(
      <ConfirmDialog open={false} title="Título" message="Msg" onConfirm={() => {}} onCancel={() => {}} />
    );
    expect(container.innerHTML).toBe('');
  });

  it('open=true renderiza título, mensagem e botões', () => {
    render(
      <ConfirmDialog open={true} title="Excluir?" message="Tem certeza?" onConfirm={() => {}} onCancel={() => {}} />
    );
    expect(screen.getByText('Excluir?')).toBeInTheDocument();
    expect(screen.getByText('Tem certeza?')).toBeInTheDocument();
    expect(screen.getByText('Confirmar')).toBeInTheDocument();
    expect(screen.getByText('Cancelar')).toBeInTheDocument();
  });

  it('callback onConfirm funciona', async () => {
    const onConfirm = vi.fn();
    render(
      <ConfirmDialog open={true} title="T" message="M" onConfirm={onConfirm} onCancel={() => {}} />
    );
    await userEvent.click(screen.getByText('Confirmar'));
    expect(onConfirm).toHaveBeenCalledOnce();
  });

  it('callback onCancel funciona', async () => {
    const onCancel = vi.fn();
    render(
      <ConfirmDialog open={true} title="T" message="M" onConfirm={() => {}} onCancel={onCancel} />
    );
    await userEvent.click(screen.getByText('Cancelar'));
    expect(onCancel).toHaveBeenCalledOnce();
  });
});
