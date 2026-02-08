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
      // Refresh item list (quantities may have changed)
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
    'w-full border border-navy-light rounded-md px-3 py-2 text-sm focus:outline-none focus:border-navy-blue focus:ring-1 focus:ring-navy-blue';
  const labelClass = 'block text-sm font-semibold text-navy-mid mb-1';

  return (
    <div className="space-y-6">
      <h2 className="text-navy-dark text-2xl font-bold border-b-3 border-yellow-gov pb-2">
        Movimentações
      </h2>

      {mensagem && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-2 rounded-md text-sm">
          {mensagem}
        </div>
      )}
      {erro && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-md text-sm">
          {erro}
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <div className="flex gap-4 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="tipo"
                    value="entrada"
                    checked={form.tipo === 'entrada'}
                    onChange={handleChange}
                    className="accent-navy-blue"
                  />
                  <span className="text-sm font-medium text-green-700">Entrada</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="tipo"
                    value="saida"
                    checked={form.tipo === 'saida'}
                    onChange={handleChange}
                    className="accent-navy-blue"
                  />
                  <span className="text-sm font-medium text-red-600">Saída</span>
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

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="bg-navy-blue text-white px-6 py-2.5 rounded-md font-semibold text-sm hover:bg-navy-mid transition-colors disabled:opacity-50"
            >
              {loading ? 'Registrando...' : 'Registrar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
