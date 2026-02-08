import { formatarData } from '../utils/formatters';

function getRowClass(item, tipo) {
  if (tipo === 'validade') {
    const today = new Date().toISOString().split('T')[0];
    if (item.data_validade < today) return 'bg-alert-red';
    return 'bg-alert-yellow';
  }
  if (tipo === 'estoque') {
    return 'bg-alert-yellow';
  }
  return '';
}

export default function AlertTable({ itens, tipo, titulo }) {
  if (!itens || itens.length === 0) {
    return (
      <div className="bg-surface border border-border rounded-md p-3">
        <h3 className="text-foreground font-semibold text-[14px] mb-2">
          {titulo}
        </h3>
        <p className="text-muted text-[13px]">Nenhum alerta no momento.</p>
      </div>
    );
  }

  return (
    <div className="bg-surface border border-border rounded-md p-3">
      <h3 className="text-foreground font-semibold text-[14px] mb-2">
        {titulo}
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-faint">
              <th className="text-left py-2 px-3 text-[11px] font-semibold text-muted uppercase tracking-wide">Nome</th>
              <th className="text-left py-2 px-3 text-[11px] font-semibold text-muted uppercase tracking-wide">Categoria</th>
              <th className="text-right py-2 px-3 text-[11px] font-semibold text-muted uppercase tracking-wide">Qtd</th>
              <th className="text-left py-2 px-3 text-[11px] font-semibold text-muted uppercase tracking-wide">Unid</th>
              {tipo === 'validade' && (
                <th className="text-left py-2 px-3 text-[11px] font-semibold text-muted uppercase tracking-wide">Validade</th>
              )}
              {tipo === 'estoque' && (
                <th className="text-right py-2 px-3 text-[11px] font-semibold text-muted uppercase tracking-wide">Est. Mín.</th>
              )}
            </tr>
          </thead>
          <tbody>
            {itens.map((item) => (
              <tr key={item.id} className={`${getRowClass(item, tipo)} border-b border-faint last:border-0`}>
                <td className="py-2 px-3 text-[13px] text-foreground font-medium">{item.nome}</td>
                <td className="py-2 px-3 text-[13px] text-secondary">{item.categoria}</td>
                <td className="py-2 px-3 text-[13px] text-foreground text-right tabular-nums">{item.quantidade}</td>
                <td className="py-2 px-3 text-[13px] text-secondary">{item.unidade}</td>
                {tipo === 'validade' && (
                  <td className="py-2 px-3 text-[13px] text-secondary tabular-nums">{formatarData(item.data_validade)}</td>
                )}
                {tipo === 'estoque' && (
                  <td className="py-2 px-3 text-[13px] text-foreground text-right tabular-nums">{item.estoque_minimo}</td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
