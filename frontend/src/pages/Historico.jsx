import { useState, useEffect } from 'react';
import { api } from '../api/client';
import { formatarDataHora } from '../utils/formatters';

export default function Historico() {
  const [itens, setItens] = useState([]);
  const [movimentacoes, setMovimentacoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtros, setFiltros] = useState({
    item_id: '',
    tipo: '',
    data_inicio: defaultDataInicio(),
    data_fim: new Date().toISOString().split('T')[0],
  });

  function defaultDataInicio() {
    const d = new Date();
    d.setDate(d.getDate() - 30);
    return d.toISOString().split('T')[0];
  }

  useEffect(() => {
    api.listarItens().then(setItens).catch(console.error);
  }, []);

  useEffect(() => {
    carregar();
  }, [filtros]);

  const carregar = async () => {
    setLoading(true);
    try {
      const params = {};
      if (filtros.item_id) params.item_id = filtros.item_id;
      if (filtros.tipo) params.tipo = filtros.tipo;
      if (filtros.data_inicio) params.data_inicio = filtros.data_inicio;
      if (filtros.data_fim) params.data_fim = filtros.data_fim;
      const data = await api.listarMovimentacoes(params);
      setMovimentacoes(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFiltros((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const inputClass =
    'border border-navy-light rounded-md px-3 py-2 text-sm focus:outline-none focus:border-navy-blue focus:ring-1 focus:ring-navy-blue';

  return (
    <div className="space-y-6">
      <h2 className="text-navy-dark text-2xl font-bold border-b-3 border-yellow-gov pb-2">
        Histórico de Movimentações
      </h2>

      <div className="flex flex-wrap gap-4">
        <select name="item_id" value={filtros.item_id} onChange={handleChange} className={`${inputClass} w-52`}>
          <option value="">Todos os itens</option>
          {itens.map((item) => (
            <option key={item.id} value={item.id}>{item.nome}</option>
          ))}
        </select>
        <select name="tipo" value={filtros.tipo} onChange={handleChange} className={`${inputClass} w-40`}>
          <option value="">Todos os tipos</option>
          <option value="entrada">Entrada</option>
          <option value="saida">Saída</option>
        </select>
        <input
          name="data_inicio"
          type="date"
          value={filtros.data_inicio}
          onChange={handleChange}
          className={inputClass}
        />
        <input
          name="data_fim"
          type="date"
          value={filtros.data_fim}
          onChange={handleChange}
          className={inputClass}
        />
      </div>

      {loading ? (
        <p className="text-gray-500">Carregando...</p>
      ) : movimentacoes.length === 0 ? (
        <p className="text-gray-500">Nenhuma movimentação encontrada.</p>
      ) : (
        <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left py-3 px-3 text-navy-mid font-semibold">Data</th>
                <th className="text-left py-3 px-3 text-navy-mid font-semibold">Item</th>
                <th className="text-left py-3 px-3 text-navy-mid font-semibold">Tipo</th>
                <th className="text-right py-3 px-3 text-navy-mid font-semibold">Quantidade</th>
                <th className="text-left py-3 px-3 text-navy-mid font-semibold">Observação</th>
              </tr>
            </thead>
            <tbody>
              {movimentacoes.map((mov) => (
                <tr
                  key={mov.id}
                  className={`border-b border-gray-100 ${
                    mov.tipo === 'entrada' ? 'bg-alert-green' : 'bg-alert-red'
                  }`}
                >
                  <td className="py-2 px-3">{formatarDataHora(mov.data_movimentacao)}</td>
                  <td className="py-2 px-3 font-medium">{mov.item_nome}</td>
                  <td className="py-2 px-3">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${
                        mov.tipo === 'entrada'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {mov.tipo === 'entrada' ? 'Entrada' : 'Saída'}
                    </span>
                  </td>
                  <td className="py-2 px-3 text-right">{mov.quantidade}</td>
                  <td className="py-2 px-3 text-gray-600">{mov.observacao || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
