export function formatarMoeda(valor) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(valor);
}

export function formatarData(valor) {
  if (!valor) return '';
  const date = new Date(valor + 'T00:00:00');
  if (isNaN(date.getTime())) return valor;
  return date.toLocaleDateString('pt-BR');
}

export function formatarDataHora(valor) {
  if (!valor) return '';
  const date = new Date(valor);
  if (isNaN(date.getTime())) return valor;
  return date.toLocaleString('pt-BR');
}
