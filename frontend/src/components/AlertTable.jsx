import { formatarData, formatarMoeda } from '../utils/formatters';

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
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-navy-dark font-bold text-lg mb-3 border-b-3 border-yellow-gov pb-2">
          {titulo}
        </h3>
        <p className="text-gray-500 text-sm">Nenhum alerta no momento.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-navy-dark font-bold text-lg mb-3 border-b-3 border-yellow-gov pb-2">
        {titulo}
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-2 px-3 text-navy-mid font-semibold">Nome</th>
              <th className="text-left py-2 px-3 text-navy-mid font-semibold">Categoria</th>
              <th className="text-right py-2 px-3 text-navy-mid font-semibold">Quantidade</th>
              <th className="text-left py-2 px-3 text-navy-mid font-semibold">Unidade</th>
              {tipo === 'validade' && (
                <th className="text-left py-2 px-3 text-navy-mid font-semibold">Validade</th>
              )}
              {tipo === 'estoque' && (
                <th className="text-right py-2 px-3 text-navy-mid font-semibold">Estoque Mín.</th>
              )}
            </tr>
          </thead>
          <tbody>
            {itens.map((item) => (
              <tr key={item.id} className={`${getRowClass(item, tipo)} border-b border-gray-100`}>
                <td className="py-2 px-3">{item.nome}</td>
                <td className="py-2 px-3">{item.categoria}</td>
                <td className="py-2 px-3 text-right">{item.quantidade}</td>
                <td className="py-2 px-3">{item.unidade}</td>
                {tipo === 'validade' && (
                  <td className="py-2 px-3">{formatarData(item.data_validade)}</td>
                )}
                {tipo === 'estoque' && (
                  <td className="py-2 px-3 text-right">{item.estoque_minimo}</td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
