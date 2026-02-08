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
    'border border-navy-light rounded-md px-3 py-2 text-sm focus:outline-none focus:border-navy-blue focus:ring-1 focus:ring-navy-blue';

  return (
    <div className="space-y-6">
      <h2 className="text-navy-dark text-2xl font-bold border-b-3 border-yellow-gov pb-2">
        Listar Itens
      </h2>

      {mensagem && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-2 rounded-md text-sm">
          {mensagem}
        </div>
      )}

      <div className="flex flex-wrap gap-4">
        <input
          type="text"
          placeholder="Buscar por nome..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className={`${inputClass} w-64`}
        />
        <select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          className={`${inputClass} w-52`}
        >
          <option value="">Todas as categorias</option>
          {CATEGORIAS.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <p className="text-gray-500">Carregando...</p>
      ) : itens.length === 0 ? (
        <p className="text-gray-500">Nenhum item encontrado.</p>
      ) : (
        <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left py-3 px-3 text-navy-mid font-semibold">ID</th>
                <th className="text-left py-3 px-3 text-navy-mid font-semibold">Nome</th>
                <th className="text-left py-3 px-3 text-navy-mid font-semibold">Categoria</th>
                <th className="text-right py-3 px-3 text-navy-mid font-semibold">Qtd</th>
                <th className="text-left py-3 px-3 text-navy-mid font-semibold">Unid</th>
                <th className="text-right py-3 px-3 text-navy-mid font-semibold">Preço</th>
                <th className="text-left py-3 px-3 text-navy-mid font-semibold">Lote</th>
                <th className="text-left py-3 px-3 text-navy-mid font-semibold">Validade</th>
                <th className="text-right py-3 px-3 text-navy-mid font-semibold">Est. Mín.</th>
                <th className="text-center py-3 px-3 text-navy-mid font-semibold">Ações</th>
              </tr>
            </thead>
            <tbody>
              {itens.map((item) => (
                <tr key={item.id} className={`${getRowClass(item)} border-b border-gray-100 hover:bg-gray-50/50`}>
                  <td className="py-2 px-3">{item.id}</td>
                  <td className="py-2 px-3 font-medium">{item.nome}</td>
                  <td className="py-2 px-3">{item.categoria}</td>
                  <td className="py-2 px-3 text-right">{item.quantidade}</td>
                  <td className="py-2 px-3">{item.unidade}</td>
                  <td className="py-2 px-3 text-right">{formatarMoeda(item.preco_unitario)}</td>
                  <td className="py-2 px-3">{item.lote || '—'}</td>
                  <td className="py-2 px-3">{formatarData(item.data_validade)}</td>
                  <td className="py-2 px-3 text-right">{item.estoque_minimo}</td>
                  <td className="py-2 px-3 text-center space-x-2">
                    <button
                      onClick={() => setEditandoId(editandoId === item.id ? null : item.id)}
                      className="text-navy-blue hover:underline text-xs font-semibold"
                    >
                      {editandoId === item.id ? 'Fechar' : 'Editar'}
                    </button>
                    <button
                      onClick={() => setExcluindo(item.id)}
                      className="text-red-600 hover:underline text-xs font-semibold"
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
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-navy-dark font-bold text-lg mb-4">Editar Item #{editandoId}</h3>
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
