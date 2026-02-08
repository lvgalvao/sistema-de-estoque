import { useState } from 'react';
import { CATEGORIAS, UNIDADES } from '../constants';

const defaultValues = {
  nome: '',
  categoria: CATEGORIAS[0],
  quantidade: '',
  unidade: 'un',
  preco_unitario: '',
  lote: '',
  data_validade: '',
  estoque_minimo: '1',
};

export default function ItemForm({ initial, onSubmit, submitLabel = 'Salvar' }) {
  const [form, setForm] = useState(() => ({
    ...defaultValues,
    ...initial,
    quantidade: initial?.quantidade != null ? String(initial.quantidade) : '',
    preco_unitario: initial?.preco_unitario != null ? String(initial.preco_unitario) : '',
    estoque_minimo: initial?.estoque_minimo != null ? String(initial.estoque_minimo) : '1',
  }));
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');

    if (!form.nome.trim()) return setErro('Nome é obrigatório.');
    if (!form.quantidade || Number(form.quantidade) < 0) return setErro('Quantidade deve ser >= 0.');
    if (!form.preco_unitario || Number(form.preco_unitario) <= 0) return setErro('Preço deve ser > 0.');
    if (!form.data_validade) return setErro('Data de validade é obrigatória.');
    if (Number(form.estoque_minimo) < 0) return setErro('Estoque mínimo deve ser >= 0.');

    setLoading(true);
    try {
      await onSubmit({
        ...form,
        quantidade: Number(form.quantidade),
        preco_unitario: Number(form.preco_unitario),
        estoque_minimo: Number(form.estoque_minimo),
        lote: form.lote || null,
      });
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
    <form onSubmit={handleSubmit} className="space-y-3">
      {erro && (
        <div className="bg-alert-red border border-red-200 text-red-700 px-3 py-2 rounded text-[13px]">
          {erro}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>Nome *</label>
          <input name="nome" value={form.nome} onChange={handleChange} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Categoria *</label>
          <select name="categoria" value={form.categoria} onChange={handleChange} className={inputClass}>
            {CATEGORIAS.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>Quantidade *</label>
          <input name="quantidade" type="number" step="any" min="0" value={form.quantidade} onChange={handleChange} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Unidade *</label>
          <select name="unidade" value={form.unidade} onChange={handleChange} className={inputClass}>
            {UNIDADES.map((u) => (
              <option key={u} value={u}>{u}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>Preço Unitário (R$) *</label>
          <input name="preco_unitario" type="number" step="0.01" min="0.01" value={form.preco_unitario} onChange={handleChange} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Lote</label>
          <input name="lote" value={form.lote || ''} onChange={handleChange} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Data de Validade *</label>
          <input name="data_validade" type="date" value={form.data_validade} onChange={handleChange} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Estoque Mínimo *</label>
          <input name="estoque_minimo" type="number" step="any" min="0" value={form.estoque_minimo} onChange={handleChange} className={inputClass} />
        </div>
      </div>

      <div className="pt-1">
        <button
          type="submit"
          disabled={loading}
          className="h-8 px-3 bg-accent text-white rounded text-[13px] font-medium hover:bg-accent-hover transition-colors disabled:opacity-50"
        >
          {loading ? 'Salvando...' : submitLabel}
        </button>
      </div>
    </form>
  );
}
