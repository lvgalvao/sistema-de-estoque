-- =============================================================
-- Seed: 30 itens de alimentos — Almoxarifado da Marinha do Brasil
-- Datas de validade relativas a date('now') para alertas realistas:
--   3 vencidos (vermelho), 5 vencendo em 3-7 dias (amarelo), 22 OK
-- =============================================================

DELETE FROM movimentacoes;
DELETE FROM itens;
DELETE FROM sqlite_sequence;

INSERT INTO itens (nome, categoria, quantidade, unidade, preco_unitario, lote, data_validade, estoque_minimo, data_criacao) VALUES
-- Grãos e Cereais (rancho básico) — validade longa
('Arroz Parboilizado Tipo 1 (5kg)',       'Grãos e Cereais',        180, 'pct', 22.90, 'MN-2025-001', date('now', '+120 days'), 50,  datetime('now', '-28 days')),
('Feijão Preto Tipo 1 (1kg)',             'Grãos e Cereais',         95, 'pct', 8.50,  'MN-2025-002', date('now', '+90 days'),  30,  datetime('now', '-28 days')),
('Feijão Carioca Tipo 1 (1kg)',           'Grãos e Cereais',         70, 'pct', 7.90,  'MN-2025-003', date('now', '+85 days'),  30,  datetime('now', '-28 days')),
('Macarrão Espaguete (500g)',             'Massas',                 120, 'pct', 4.50,  'MN-2025-004', date('now', '+200 days'), 40,  datetime('now', '-27 days')),
('Farinha de Mandioca Torrada (1kg)',     'Grãos e Cereais',         60, 'pct', 6.80,  'MN-2025-005', date('now', '+150 days'), 20,  datetime('now', '-27 days')),
('Fubá de Milho (1kg)',                   'Grãos e Cereais',         45, 'pct', 5.20,  'MN-2025-006', date('now', '+180 days'), 15,  datetime('now', '-26 days')),

-- Carnes e Frios — alguns com validade curta
('Carne Bovina Patinho Congelada (kg)',   'Carnes e Frios',          80, 'kg',  38.90, 'MN-2025-007', date('now', '+4 days'),   30,  datetime('now', '-26 days')),
('Frango Inteiro Congelado (kg)',         'Carnes e Frios',         120, 'kg',  14.90, 'MN-2025-008', date('now', '+5 days'),   40,  datetime('now', '-25 days')),
('Linguiça Calabresa (kg)',              'Carnes e Frios',          35, 'kg',  22.50, 'MN-2025-009', date('now', '-1 days'),   15,  datetime('now', '-25 days')),
('Charque Dianteiro (kg)',               'Carnes e Frios',          25, 'kg',  45.00, 'MN-2025-010', date('now', '+60 days'),  10,  datetime('now', '-24 days')),

-- Laticínios — perecíveis, validade curta
('Leite UHT Integral (1L)',              'Laticínios',             200, 'un',  5.90,  'MN-2025-011', date('now', '+6 days'),   60,  datetime('now', '-24 days')),
('Leite em Pó Integral (400g)',          'Laticínios',              40, 'un',  12.50, 'MN-2025-012', date('now', '+45 days'),  15,  datetime('now', '-23 days')),
('Manteiga com Sal (200g)',              'Laticínios',              30, 'un',  9.80,  'MN-2025-013', date('now', '-2 days'),   10,  datetime('now', '-23 days')),

-- Enlatados e Conservas — validade longa
('Sardinha em Óleo (125g)',              'Enlatados e Conservas',   150, 'lata', 5.90, 'MN-2025-014', date('now', '+365 days'), 50,  datetime('now', '-22 days')),
('Atum em Pedaços (170g)',               'Enlatados e Conservas',    80, 'lata', 8.90, 'MN-2025-015', date('now', '+300 days'), 30,  datetime('now', '-22 days')),
('Extrato de Tomate (340g)',             'Enlatados e Conservas',    90, 'un',  4.50,  'MN-2025-016', date('now', '+3 days'),   25,  datetime('now', '-21 days')),
('Milho Verde em Conserva (200g)',       'Enlatados e Conservas',    60, 'lata', 4.20, 'MN-2025-017', date('now', '+240 days'), 20,  datetime('now', '-21 days')),
('Ervilha em Conserva (200g)',           'Enlatados e Conservas',    55, 'lata', 4.50, 'MN-2025-018', date('now', '+240 days'), 20,  datetime('now', '-20 days')),

-- Bebidas
('Café Torrado e Moído (500g)',          'Bebidas',                  50, 'pct', 18.90, 'MN-2025-019', date('now', '+30 days'),  15,  datetime('now', '-20 days')),
('Suco Concentrado Laranja (1L)',        'Bebidas',                  40, 'un',  7.50,  'MN-2025-020', date('now', '+7 days'),   15,  datetime('now', '-19 days')),
('Achocolatado em Pó (400g)',            'Bebidas',                  35, 'un',  8.90,  'MN-2025-021', date('now', '+90 days'),  10,  datetime('now', '-19 days')),

-- Temperos e Condimentos — validade longa
('Óleo de Soja (900ml)',                 'Temperos e Condimentos',   80, 'un',  7.90,  'MN-2025-022', date('now', '+180 days'), 25,  datetime('now', '-18 days')),
('Sal Refinado (1kg)',                   'Temperos e Condimentos',   40, 'pct', 3.50,  'MN-2025-023', date('now', '+700 days'), 15,  datetime('now', '-18 days')),
('Açúcar Cristal (5kg)',                 'Temperos e Condimentos',   30, 'pct', 19.90, 'MN-2025-024', date('now', '+200 days'), 10,  datetime('now', '-17 days')),
('Vinagre de Álcool (750ml)',            'Temperos e Condimentos',   25, 'un',  3.90,  'MN-2025-025', date('now', '+300 days'), 10,  datetime('now', '-17 days')),

-- Padaria e Confeitaria — perecíveis
('Pão de Forma Integral (500g)',         'Padaria e Confeitaria',    20, 'pct', 8.90,  'MN-2025-026', date('now', '-3 days'),   10,  datetime('now', '-16 days')),
('Biscoito Cream Cracker (400g)',        'Padaria e Confeitaria',    60, 'pct', 5.50,  'MN-2025-027', date('now', '+6 days'),   20,  datetime('now', '-16 days')),

-- Congelados
('Batata Palito Congelada (2kg)',        'Congelados',               40, 'pct', 16.90, 'MN-2025-028', date('now', '+45 days'),  15,  datetime('now', '-15 days')),
('Seleta de Legumes Congelada (1kg)',    'Congelados',               35, 'pct', 12.50, 'MN-2025-029', date('now', '+40 days'),  12,  datetime('now', '-15 days')),

-- Limpeza e Descartáveis — sem validade relevante
('Copo Descartável 200ml (100un)',       'Limpeza e Descartáveis',   50, 'pct', 6.90,  'MN-2025-030', date('now', '+700 days'), 15,  datetime('now', '-14 days'));
