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
    'border border-border rounded h-8 px-3 text-[13px] text-foreground bg-surface focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20';

  const thClass = 'text-left py-2 px-3 text-[11px] font-semibold text-muted uppercase tracking-wide';

  return (
    <div className="space-y-4">
      <h2 className="text-foreground text-base font-semibold">Histórico de Movimentações</h2>

      <div className="flex flex-wrap gap-2">
        <select name="item_id" value={filtros.item_id} onChange={handleChange} className={`${inputClass} w-44`}>
          <option value="">Todos os itens</option>
          {itens.map((item) => (
            <option key={item.id} value={item.id}>{item.nome}</option>
          ))}
        </select>
        <select name="tipo" value={filtros.tipo} onChange={handleChange} className={`${inputClass} w-36`}>
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
        <p className="text-muted text-[13px]">Carregando...</p>
      ) : movimentacoes.length === 0 ? (
        <p className="text-muted text-[13px]">Nenhuma movimentação encontrada.</p>
      ) : (
        <div className="bg-surface border border-border rounded-md overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-faint">
                <th className={thClass}>Data</th>
                <th className={thClass}>Item</th>
                <th className={thClass}>Tipo</th>
                <th className={`${thClass} text-right`}>Quantidade</th>
                <th className={thClass}>Observação</th>
              </tr>
            </thead>
            <tbody>
              {movimentacoes.map((mov) => (
                <tr
                  key={mov.id}
                  className={`border-b border-faint last:border-0 ${
                    mov.tipo === 'entrada' ? 'bg-alert-green' : 'bg-alert-red'
                  }`}
                >
                  <td className="py-2 px-3 text-[13px] text-secondary tabular-nums">{formatarDataHora(mov.data_movimentacao)}</td>
                  <td className="py-2 px-3 text-[13px] text-foreground font-medium">{mov.item_nome}</td>
                  <td className="py-2 px-3">
                    <span
                      className={`inline-block px-1.5 py-0.5 rounded text-[11px] font-medium ${
                        mov.tipo === 'entrada'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {mov.tipo === 'entrada' ? 'Entrada' : 'Saída'}
                    </span>
                  </td>
                  <td className="py-2 px-3 text-[13px] text-foreground text-right tabular-nums">{mov.quantidade}</td>
                  <td className="py-2 px-3 text-[13px] text-muted">{mov.observacao || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
