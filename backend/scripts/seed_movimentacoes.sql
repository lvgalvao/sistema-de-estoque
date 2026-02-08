-- =============================================================
-- Seed: 90 movimentações nos últimos 30 dias
-- Simula operações reais do almoxarifado da Marinha do Brasil
-- =============================================================

-- ===== DIA -30 a -26: Recebimento inicial do rancho mensal =====

INSERT INTO movimentacoes (item_id, tipo, quantidade, observacao, data_movimentacao) VALUES
-- Grande entrada de rancho (abastecimento do navio)
(1,  'entrada', 100, 'Recebimento rancho mensal — Base Naval do Rio de Janeiro',          datetime('now', '-30 days', '+8 hours')),
(2,  'entrada',  50, 'Recebimento rancho mensal — Base Naval do Rio de Janeiro',          datetime('now', '-30 days', '+8 hours')),
(3,  'entrada',  40, 'Recebimento rancho mensal — Base Naval do Rio de Janeiro',          datetime('now', '-30 days', '+9 hours')),
(4,  'entrada',  80, 'Recebimento rancho mensal — Base Naval do Rio de Janeiro',          datetime('now', '-30 days', '+9 hours')),
(7,  'entrada',  50, 'Recebimento carnes — Frigorífico Marinha',                          datetime('now', '-30 days', '+10 hours')),
(8,  'entrada',  80, 'Recebimento carnes — Frigorífico Marinha',                          datetime('now', '-30 days', '+10 hours')),
(11, 'entrada', 120, 'Recebimento laticínios — Cooperativa Naval',                        datetime('now', '-30 days', '+11 hours')),
(14, 'entrada', 100, 'Recebimento enlatados — Depósito de Subsistência',                  datetime('now', '-30 days', '+11 hours')),
(15, 'entrada',  50, 'Recebimento enlatados — Depósito de Subsistência',                  datetime('now', '-30 days', '+12 hours')),
(19, 'entrada',  30, 'Recebimento bebidas — Depósito Central',                            datetime('now', '-29 days', '+8 hours')),

-- ===== DIA -28 a -25: Início das operações de cozinha =====

(1,  'saida',   12, 'Preparo almoço — 150 refeições tripulação',                          datetime('now', '-28 days', '+6 hours')),
(2,  'saida',    8, 'Preparo feijoada tripulação',                                        datetime('now', '-28 days', '+6 hours')),
(7,  'saida',   10, 'Preparo almoço — carne assada',                                      datetime('now', '-28 days', '+7 hours')),
(22, 'saida',    3, 'Uso diário cozinha',                                                 datetime('now', '-28 days', '+7 hours')),
(11, 'saida',   15, 'Café da manhã e lanches',                                            datetime('now', '-28 days', '+5 hours')),

(1,  'saida',   12, 'Preparo almoço — arroz para 150 refeições',                          datetime('now', '-27 days', '+6 hours')),
(8,  'saida',   15, 'Preparo frango grelhado',                                            datetime('now', '-27 days', '+7 hours')),
(4,  'saida',    8, 'Preparo macarronada tripulação',                                     datetime('now', '-27 days', '+7 hours')),
(19, 'saida',    3, 'Café da manhã oficiais e praças',                                    datetime('now', '-27 days', '+5 hours')),
(26, 'saida',    5, 'Café da manhã — pão para guarnição',                                 datetime('now', '-27 days', '+5 hours')),

-- ===== DIA -24 a -21: Semana operacional =====

(1,  'saida',   12, 'Preparo almoço diário',                                              datetime('now', '-26 days', '+6 hours')),
(3,  'saida',    6, 'Preparo feijão carioca',                                             datetime('now', '-26 days', '+6 hours')),
(9,  'saida',    5, 'Preparo calabresa acebolada',                                        datetime('now', '-26 days', '+7 hours')),
(11, 'saida',   15, 'Consumo diário laticínios',                                          datetime('now', '-26 days', '+5 hours')),
(16, 'saida',    5, 'Molho para macarronada',                                             datetime('now', '-26 days', '+7 hours')),

(1,  'saida',   12, 'Preparo almoço diário',                                              datetime('now', '-25 days', '+6 hours')),
(7,  'saida',   10, 'Preparo bife acebolado',                                             datetime('now', '-25 days', '+7 hours')),
(5,  'saida',    4, 'Farofa para acompanhamento',                                         datetime('now', '-25 days', '+7 hours')),
(14, 'saida',   10, 'Preparo sardinha para jantar',                                       datetime('now', '-25 days', '+18 hours')),
(24, 'saida',    3, 'Uso cozinha — açúcar para sobremesa',                                datetime('now', '-25 days', '+14 hours')),

(1,  'saida',   12, 'Preparo almoço diário',                                              datetime('now', '-24 days', '+6 hours')),
(2,  'saida',    8, 'Feijoada de terça-feira',                                            datetime('now', '-24 days', '+6 hours')),
(10, 'saida',    5, 'Preparo charque com abóbora',                                        datetime('now', '-24 days', '+7 hours')),
(11, 'saida',   15, 'Consumo diário laticínios',                                          datetime('now', '-24 days', '+5 hours')),
(30, 'saida',    5, 'Copos para rancho e refeitório',                                     datetime('now', '-24 days', '+12 hours')),

-- ===== DIA -20 a -17: Reabastecimento parcial + consumo =====

(11, 'entrada',  80, 'Reabastecimento leite — Cooperativa Naval',                         datetime('now', '-20 days', '+9 hours')),
(26, 'entrada',  15, 'Entrega padaria — Base Naval',                                      datetime('now', '-20 days', '+7 hours')),
(7,  'entrada',  30, 'Reabastecimento carne — Frigorífico',                               datetime('now', '-20 days', '+10 hours')),

(1,  'saida',   12, 'Preparo almoço diário',                                              datetime('now', '-20 days', '+6 hours')),
(8,  'saida',   15, 'Preparo frango à milanesa',                                          datetime('now', '-20 days', '+7 hours')),
(4,  'saida',   10, 'Macarrão ao molho',                                                  datetime('now', '-20 days', '+7 hours')),

(1,  'saida',   12, 'Preparo almoço diário',                                              datetime('now', '-19 days', '+6 hours')),
(3,  'saida',    6, 'Feijão carioca',                                                     datetime('now', '-19 days', '+6 hours')),
(7,  'saida',   10, 'Carne moída para escondidinho',                                      datetime('now', '-19 days', '+7 hours')),
(11, 'saida',   15, 'Consumo diário laticínios',                                          datetime('now', '-19 days', '+5 hours')),
(20, 'saida',    5, 'Suco para refeições',                                                datetime('now', '-19 days', '+11 hours')),

(1,  'saida',   12, 'Preparo almoço diário',                                              datetime('now', '-18 days', '+6 hours')),
(8,  'saida',   12, 'Preparo frango assado',                                              datetime('now', '-18 days', '+7 hours')),
(17, 'saida',    5, 'Milho verde para salada',                                            datetime('now', '-18 days', '+7 hours')),
(21, 'saida',    4, 'Achocolatado café da manhã',                                         datetime('now', '-18 days', '+5 hours')),
(27, 'saida',    8, 'Biscoito para café da tarde',                                        datetime('now', '-18 days', '+15 hours')),

-- ===== DIA -16 a -12: Exercício naval — consumo intenso =====

(1,  'saida',   15, 'Exercício naval — rancho reforçado',                                  datetime('now', '-16 days', '+5 hours')),
(2,  'saida',   10, 'Exercício naval — feijoada da tripulação',                            datetime('now', '-16 days', '+5 hours')),
(7,  'saida',   12, 'Exercício naval — churrasco no convés',                               datetime('now', '-16 days', '+11 hours')),
(8,  'saida',   18, 'Exercício naval — frango para 200 refeições',                         datetime('now', '-16 days', '+6 hours')),
(11, 'saida',   20, 'Exercício naval — consumo intensificado',                             datetime('now', '-16 days', '+5 hours')),

(1,  'saida',   15, 'Exercício naval — segundo dia',                                       datetime('now', '-15 days', '+5 hours')),
(14, 'saida',   15, 'Exercício naval — sardinha reserva',                                  datetime('now', '-15 days', '+18 hours')),
(4,  'saida',   12, 'Exercício naval — macarrão instantâneo',                              datetime('now', '-15 days', '+6 hours')),
(19, 'saida',    5, 'Exercício naval — café para vigília noturna',                         datetime('now', '-15 days', '+22 hours')),
(30, 'saida',   10, 'Exercício naval — copos descartáveis',                                datetime('now', '-15 days', '+8 hours')),

(1,  'saida',   12, 'Retorno à Base — almoço tripulação',                                  datetime('now', '-14 days', '+6 hours')),
(3,  'saida',    6, 'Retorno à Base — feijão carioca',                                     datetime('now', '-14 days', '+6 hours')),
(11, 'saida',   15, 'Consumo diário laticínios',                                          datetime('now', '-14 days', '+5 hours')),
(22, 'saida',    4, 'Uso cozinha — óleo de soja',                                         datetime('now', '-14 days', '+7 hours')),

-- ===== DIA -11 a -7: Reabastecimento pós-exercício =====

(1,  'entrada',  80, 'Reabastecimento pós-exercício — Depósito de Subsistência',           datetime('now', '-11 days', '+9 hours')),
(2,  'entrada',  30, 'Reabastecimento pós-exercício — feijão preto',                       datetime('now', '-11 days', '+9 hours')),
(8,  'entrada',  60, 'Reabastecimento carnes — Frigorífico Marinha',                       datetime('now', '-11 days', '+10 hours')),
(11, 'entrada', 100, 'Reabastecimento leite — urgente (estoque crítico)',                  datetime('now', '-11 days', '+8 hours')),
(14, 'entrada',  60, 'Reabastecimento enlatados — sardinha',                               datetime('now', '-11 days', '+11 hours')),
(19, 'entrada',  20, 'Reabastecimento café — Depósito Central',                            datetime('now', '-11 days', '+11 hours')),

(1,  'saida',   12, 'Preparo almoço diário',                                              datetime('now', '-10 days', '+6 hours')),
(7,  'saida',    8, 'Preparo strogonoff',                                                 datetime('now', '-10 days', '+7 hours')),
(6,  'saida',    3, 'Polenta para acompanhamento',                                        datetime('now', '-10 days', '+7 hours')),
(18, 'saida',    5, 'Ervilha para salada',                                                datetime('now', '-10 days', '+7 hours')),

(1,  'saida',   12, 'Preparo almoço diário',                                              datetime('now', '-8 days', '+6 hours')),
(2,  'saida',    8, 'Feijoada semanal',                                                   datetime('now', '-8 days', '+6 hours')),
(9,  'saida',    5, 'Calabresa para feijoada',                                            datetime('now', '-8 days', '+6 hours')),
(11, 'saida',   15, 'Consumo diário laticínios',                                          datetime('now', '-8 days', '+5 hours')),
(12, 'saida',    3, 'Leite em pó para sobremesa',                                         datetime('now', '-8 days', '+14 hours')),

-- ===== DIA -6 a -1: Semana atual — consumo regular =====

(1,  'saida',   12, 'Preparo almoço diário',                                              datetime('now', '-6 days', '+6 hours')),
(8,  'saida',   12, 'Preparo frango grelhado',                                            datetime('now', '-6 days', '+7 hours')),
(28, 'saida',    5, 'Batata frita para acompanhamento',                                   datetime('now', '-6 days', '+7 hours')),
(23, 'saida',    2, 'Sal para cozinha',                                                   datetime('now', '-6 days', '+7 hours')),

(1,  'saida',   10, 'Preparo almoço — arroz',                                             datetime('now', '-4 days', '+6 hours')),
(3,  'saida',    6, 'Preparo feijão carioca',                                             datetime('now', '-4 days', '+6 hours')),
(7,  'saida',   10, 'Preparo carne de panela',                                            datetime('now', '-4 days', '+7 hours')),
(11, 'saida',   15, 'Consumo diário laticínios',                                          datetime('now', '-4 days', '+5 hours')),
(29, 'saida',    4, 'Legumes para sopa',                                                  datetime('now', '-4 days', '+17 hours')),

(1,  'saida',   10, 'Preparo almoço — arroz',                                             datetime('now', '-2 days', '+6 hours')),
(8,  'saida',   10, 'Preparo frango à parmegiana',                                        datetime('now', '-2 days', '+7 hours')),
(15, 'saida',    5, 'Atum para salada jantar',                                            datetime('now', '-2 days', '+17 hours')),
(25, 'saida',    2, 'Vinagrete para salada',                                              datetime('now', '-2 days', '+7 hours')),
(13, 'saida',    3, 'Manteiga para preparo',                                              datetime('now', '-2 days', '+7 hours')),

-- Hoje: movimentações da manhã
(1,  'saida',   10, 'Preparo almoço de hoje',                                             datetime('now', '-1 hours')),
(2,  'saida',    6, 'Preparo feijão de hoje',                                             datetime('now', '-1 hours')),
(11, 'saida',   12, 'Café da manhã — leite',                                              datetime('now', '-3 hours'));

-- =============================================================
-- Atualizar quantidades dos itens conforme movimentações
-- (recalcula estoque = quantidade_inicial + entradas - saidas)
-- =============================================================

UPDATE itens SET quantidade = (
  SELECT itens.quantidade
    + COALESCE((SELECT SUM(m.quantidade) FROM movimentacoes m WHERE m.item_id = itens.id AND m.tipo = 'entrada'), 0)
    - COALESCE((SELECT SUM(m.quantidade) FROM movimentacoes m WHERE m.item_id = itens.id AND m.tipo = 'saida'), 0)
), data_atualizacao = datetime('now');
