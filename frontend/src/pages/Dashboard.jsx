import { api } from '../api/client';
import { useFetch } from '../hooks/useFetch';
import { formatarMoeda } from '../utils/formatters';
import MetricCard from '../components/MetricCard';
import AlertTable from '../components/AlertTable';

export default function Dashboard() {
  const { data, loading, error } = useFetch(() => api.obterDashboard(), []);

  if (loading) return <p className="text-gray-500">Carregando...</p>;
  if (error) return <p className="text-red-600">Erro: {error}</p>;

  return (
    <div className="space-y-6">
      <h2 className="text-navy-dark text-2xl font-bold border-b-3 border-yellow-gov pb-2">
        Dashboard
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard label="Total de Itens" value={data.totalItens} />
        <MetricCard label="Validade Próxima" value={data.itensValidadeProxima.length} />
        <MetricCard label="Estoque Baixo" value={data.itensEstoqueBaixo.length} />
        <MetricCard label="Valor Total" value={formatarMoeda(data.valorTotal)} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AlertTable
          itens={data.itensValidadeProxima}
          tipo="validade"
          titulo="Alertas de Validade"
        />
        <AlertTable
          itens={data.itensEstoqueBaixo}
          tipo="estoque"
          titulo="Alertas de Estoque Baixo"
        />
      </div>
    </div>
  );
}
