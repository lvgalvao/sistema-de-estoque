import { useState, useEffect } from 'react';
import { api } from '../api/client';

export default function Movimentacoes() {
  const [itens, setItens] = useState([]);
  const [form, setForm] = useState({
    item_id: '',
    tipo: 'entrada',
    quantidade: '',
    observacao: '',
  });
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');

  useEffect(() => {
    api.listarItens().then(setItens).catch(console.error);
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    setMensagem('');

    if (!form.item_id) return setErro('Selecione um item.');
    if (!form.quantidade || Number(form.quantidade) <= 0) return setErro('Quantidade deve ser > 0.');

    setLoading(true);
    try {
      await api.registrarMovimentacao({
        item_id: Number(form.item_id),
        tipo: form.tipo,
        quantidade: Number(form.quantidade),
        observacao: form.observacao || null,
      });
      setMensagem('Movimentação registrada com sucesso!');
      setForm({ item_id: '', tipo: 'entrada', quantidade: '', observacao: '' });
      const updated = await api.listarItens();
      setItens(updated);
      setTimeout(() => setMensagem(''), 3000);
    } catch (err) {
      setErro(err.message);
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    'w-full border border-border rounded h-8 px-3 text-[13px] text-foreground bg-surface focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20';
  const labelClass = 'block text-[11px] font-semibold text-muted uppercase tracking-wide mb-1';

  return (
    <div className="space-y-4">
      <h2 className="text-foreground text-base font-semibold">Movimentações</h2>

      {mensagem && (
        <div className="bg-alert-green border border-green-200 text-green-700 px-3 py-2 rounded text-[13px]">
          {mensagem}
        </div>
      )}
      {erro && (
        <div className="bg-alert-red border border-red-200 text-red-700 px-3 py-2 rounded text-[13px]">
          {erro}
        </div>
      )}

      <div className="bg-surface border border-border rounded-md p-4">
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Item *</label>
              <select name="item_id" value={form.item_id} onChange={handleChange} className={inputClass}>
                <option value="">Selecione um item...</option>
                {itens.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.nome} (Estoque: {item.quantidade} {item.unidade})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>Tipo *</label>
              <div className="flex gap-4 h-8 items-center">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="tipo"
                    value="entrada"
                    checked={form.tipo === 'entrada'}
                    onChange={handleChange}
                    className="accent-accent"
                  />
                  <span className="text-[13px] font-medium text-green-700">Entrada</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="tipo"
                    value="saida"
                    checked={form.tipo === 'saida'}
                    onChange={handleChange}
                    className="accent-accent"
                  />
                  <span className="text-[13px] font-medium text-red-600">Saída</span>
                </label>
              </div>
            </div>
            <div>
              <label className={labelClass}>Quantidade *</label>
              <input
                name="quantidade"
                type="number"
                step="any"
                min="0.01"
                value={form.quantidade}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Observação</label>
              <input
                name="observacao"
                value={form.observacao}
                onChange={handleChange}
                className={inputClass}
                placeholder="Opcional"
              />
            </div>
          </div>

          <div className="pt-1">
            <button
              type="submit"
              disabled={loading}
              className="h-8 px-3 bg-accent text-white rounded text-[13px] font-medium hover:bg-accent-hover transition-colors disabled:opacity-50"
            >
              {loading ? 'Registrando...' : 'Registrar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
