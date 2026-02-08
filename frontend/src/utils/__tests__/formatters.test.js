import { formatarMoeda, formatarData, formatarDataHora } from '../formatters';

describe('formatarMoeda', () => {
  it('formata valor em reais', () => {
    const result = formatarMoeda(10.5);
    expect(result).toContain('R$');
    expect(result).toContain('10,50');
  });

  it('formata zero', () => {
    const result = formatarMoeda(0);
    expect(result).toContain('R$');
    expect(result).toContain('0,00');
  });

  it('formata milhares', () => {
    const result = formatarMoeda(1234.56);
    expect(result).toContain('R$');
    expect(result).toContain('1.234,56');
  });
});

describe('formatarData', () => {
  it('formata YYYY-MM-DD para DD/MM/YYYY', () => {
    expect(formatarData('2025-03-15')).toBe('15/03/2025');
  });

  it('retorna string vazia para null', () => {
    expect(formatarData(null)).toBe('');
  });

  it('retorna string vazia para vazio', () => {
    expect(formatarData('')).toBe('');
  });

  it('retorna valor original para data inválida', () => {
    expect(formatarData('invalido')).toBe('invalido');
  });
});

describe('formatarDataHora', () => {
  it('formata ISO datetime para pt-BR', () => {
    const result = formatarDataHora('2025-03-15T14:30:00');
    expect(result).toMatch(/15\/03\/2025/);
    expect(result).toMatch(/14:30/);
  });

  it('retorna string vazia para null', () => {
    expect(formatarDataHora(null)).toBe('');
  });

  it('retorna valor original para inválido', () => {
    expect(formatarDataHora('invalido')).toBe('invalido');
  });
});
