import { useState, useEffect } from 'react';
import { api } from '../api/client';
import { CATEGORIAS } from '../constants';
import { formatarData, formatarMoeda } from '../utils/formatters';
import ItemForm from '../components/ItemForm';
import ConfirmDialog from '../components/ConfirmDialog';

export default function Listar() {
  const [itens, setItens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busca, setBusca] = useState('');
  const [categoria, setCategoria] = useState('');
  const [editandoId, setEditandoId] = useState(null);
  const [excluindo, setExcluindo] = useState(null);
  const [mensagem, setMensagem] = useState('');

  const carregar = async () => {
    setLoading(true);
    try {
      const params = {};
      if (busca) params.busca = busca;
      if (categoria) params.categoria = categoria;
      const data = await api.listarItens(params);
      setItens(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregar();
  }, [busca, categoria]);

  const handleEditar = async (data) => {
    await api.atualizarItem(editandoId, data);
    setEditandoId(null);
    setMensagem('Item atualizado com sucesso!');
    setTimeout(() => setMensagem(''), 3000);
    carregar();
  };

  const handleExcluir = async () => {
    await api.excluirItem(excluindo);
    setExcluindo(null);
    setMensagem('Item excluído com sucesso!');
    setTimeout(() => setMensagem(''), 3000);
    carregar();
  };

  const getRowClass = (item) => {
    const today = new Date().toISOString().split('T')[0];
    const in7days = new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0];

    if (item.data_validade < today) return 'bg-alert-red';
    if (item.data_validade <= in7days) return 'bg-alert-yellow';
    if (item.quantidade <= item.estoque_minimo) return 'bg-alert-yellow';
    return '';
  };

  const inputClass =
    'border border-border rounded h-8 px-3 text-[13px] text-foreground bg-surface focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20';

  const thClass = 'text-left py-2 px-3 text-[11px] font-semibold text-muted uppercase tracking-wide';

  return (
    <div className="space-y-4">
      <h2 className="text-foreground text-base font-semibold">Listar Itens</h2>

      {mensagem && (
        <div className="bg-alert-green border border-green-200 text-green-700 px-3 py-2 rounded text-[13px]">
          {mensagem}
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        <input
          type="text"
          placeholder="Buscar por nome..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className={`${inputClass} w-56`}
        />
        <select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          className={`${inputClass} w-44`}
        >
          <option value="">Todas as categorias</option>
          {CATEGORIAS.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <p className="text-muted text-[13px]">Carregando...</p>
      ) : itens.length === 0 ? (
        <p className="text-muted text-[13px]">Nenhum item encontrado.</p>
      ) : (
        <div className="bg-surface border border-border rounded-md overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-faint">
                <th className={thClass}>ID</th>
                <th className={thClass}>Nome</th>
                <th className={thClass}>Categoria</th>
                <th className={`${thClass} text-right`}>Qtd</th>
                <th className={thClass}>Unid</th>
                <th className={`${thClass} text-right`}>Preço</th>
                <th className={thClass}>Lote</th>
                <th className={thClass}>Validade</th>
                <th className={`${thClass} text-right`}>Est. Mín.</th>
                <th className={`${thClass} text-center`}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {itens.map((item) => (
                <tr key={item.id} className={`${getRowClass(item)} border-b border-faint last:border-0 hover:bg-black/2`}>
                  <td className="py-2 px-3 text-[13px] text-muted tabular-nums">{item.id}</td>
                  <td className="py-2 px-3 text-[13px] text-foreground font-medium">{item.nome}</td>
                  <td className="py-2 px-3 text-[13px] text-secondary">{item.categoria}</td>
                  <td className="py-2 px-3 text-[13px] text-foreground text-right tabular-nums">{item.quantidade}</td>
                  <td className="py-2 px-3 text-[13px] text-secondary">{item.unidade}</td>
                  <td className="py-2 px-3 text-[13px] text-foreground text-right tabular-nums">{formatarMoeda(item.preco_unitario)}</td>
                  <td className="py-2 px-3 text-[13px] text-secondary">{item.lote || '—'}</td>
                  <td className="py-2 px-3 text-[13px] text-secondary tabular-nums">{formatarData(item.data_validade)}</td>
                  <td className="py-2 px-3 text-[13px] text-foreground text-right tabular-nums">{item.estoque_minimo}</td>
                  <td className="py-2 px-3 text-center space-x-2">
                    <button
                      onClick={() => setEditandoId(editandoId === item.id ? null : item.id)}
                      className="text-accent hover:underline text-[12px] font-medium"
                    >
                      {editandoId === item.id ? 'Fechar' : 'Editar'}
                    </button>
                    <button
                      onClick={() => setExcluindo(item.id)}
                      className="text-red-600 hover:underline text-[12px] font-medium"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editandoId && (
        <div className="bg-surface border border-border rounded-md p-4">
          <h3 className="text-foreground font-semibold text-[14px] mb-3">Editar Item #{editandoId}</h3>
          <ItemForm
            initial={itens.find((i) => i.id === editandoId)}
            onSubmit={handleEditar}
            submitLabel="Atualizar"
          />
        </div>
      )}

      <ConfirmDialog
        open={excluindo !== null}
        title="Excluir Item"
        message="Tem certeza que deseja excluir este item? Todas as movimentações associadas também serão excluídas."
        onConfirm={handleExcluir}
        onCancel={() => setExcluindo(null)}
      />
    </div>
  );
}
