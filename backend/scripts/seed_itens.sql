-- =============================================================
-- Seed: 30 itens de alimentos — Almoxarifado da Marinha do Brasil
-- =============================================================

DELETE FROM movimentacoes;
DELETE FROM itens;

INSERT INTO itens (nome, categoria, quantidade, unidade, preco_unitario, lote, data_validade, estoque_minimo, data_criacao) VALUES
-- Grãos e Cereais (rancho básico)
('Arroz Parboilizado Tipo 1 (5kg)',       'Grãos e Cereais',        180, 'pct', 22.90, 'MN-2025-001', '2026-03-15', 50,  datetime('now', '-28 days')),
('Feijão Preto Tipo 1 (1kg)',             'Grãos e Cereais',         95, 'pct', 8.50,  'MN-2025-002', '2025-11-20', 30,  datetime('now', '-28 days')),
('Feijão Carioca Tipo 1 (1kg)',           'Grãos e Cereais',         70, 'pct', 7.90,  'MN-2025-003', '2025-12-10', 30,  datetime('now', '-28 days')),
('Macarrão Espaguete (500g)',             'Massas',                 120, 'pct', 4.50,  'MN-2025-004', '2026-06-01', 40,  datetime('now', '-27 days')),
('Farinha de Mandioca Torrada (1kg)',     'Grãos e Cereais',         60, 'pct', 6.80,  'MN-2025-005', '2026-01-20', 20,  datetime('now', '-27 days')),
('Fubá de Milho (1kg)',                   'Grãos e Cereais',         45, 'pct', 5.20,  'MN-2025-006', '2026-04-10', 15,  datetime('now', '-26 days')),

-- Carnes e Frios
('Carne Bovina Patinho Congelada (kg)',   'Carnes e Frios',          80, 'kg',  38.90, 'MN-2025-007', '2025-04-15', 30,  datetime('now', '-26 days')),
('Frango Inteiro Congelado (kg)',         'Carnes e Frios',         120, 'kg',  14.90, 'MN-2025-008', '2025-05-01', 40,  datetime('now', '-25 days')),
('Linguiça Calabresa (kg)',              'Carnes e Frios',          35, 'kg',  22.50, 'MN-2025-009', '2025-03-20', 15,  datetime('now', '-25 days')),
('Charque Dianteiro (kg)',               'Carnes e Frios',          25, 'kg',  45.00, 'MN-2025-010', '2025-06-30', 10,  datetime('now', '-24 days')),

-- Laticínios
('Leite UHT Integral (1L)',              'Laticínios',             200, 'un',  5.90,  'MN-2025-011', '2025-04-10', 60,  datetime('now', '-24 days')),
('Leite em Pó Integral (400g)',          'Laticínios',              40, 'un',  12.50, 'MN-2025-012', '2025-08-15', 15,  datetime('now', '-23 days')),
('Manteiga com Sal (200g)',              'Laticínios',              30, 'un',  9.80,  'MN-2025-013', '2025-03-01', 10,  datetime('now', '-23 days')),

-- Enlatados e Conservas
('Sardinha em Óleo (125g)',              'Enlatados e Conservas',   150, 'lata', 5.90, 'MN-2025-014', '2027-01-01', 50,  datetime('now', '-22 days')),
('Atum em Pedaços (170g)',               'Enlatados e Conservas',    80, 'lata', 8.90, 'MN-2025-015', '2027-03-15', 30,  datetime('now', '-22 days')),
('Extrato de Tomate (340g)',             'Enlatados e Conservas',    90, 'un',  4.50,  'MN-2025-016', '2026-02-28', 25,  datetime('now', '-21 days')),
('Milho Verde em Conserva (200g)',       'Enlatados e Conservas',    60, 'lata', 4.20, 'MN-2025-017', '2026-05-10', 20,  datetime('now', '-21 days')),
('Ervilha em Conserva (200g)',           'Enlatados e Conservas',    55, 'lata', 4.50, 'MN-2025-018', '2026-05-10', 20,  datetime('now', '-20 days')),

-- Bebidas
('Café Torrado e Moído (500g)',          'Bebidas',                  50, 'pct', 18.90, 'MN-2025-019', '2025-09-01', 15,  datetime('now', '-20 days')),
('Suco Concentrado Laranja (1L)',        'Bebidas',                  40, 'un',  7.50,  'MN-2025-020', '2025-06-15', 15,  datetime('now', '-19 days')),
('Achocolatado em Pó (400g)',            'Bebidas',                  35, 'un',  8.90,  'MN-2025-021', '2025-10-01', 10,  datetime('now', '-19 days')),

-- Temperos e Condimentos
('Óleo de Soja (900ml)',                 'Temperos e Condimentos',   80, 'un',  7.90,  'MN-2025-022', '2025-12-01', 25,  datetime('now', '-18 days')),
('Sal Refinado (1kg)',                   'Temperos e Condimentos',   40, 'pct', 3.50,  'MN-2025-023', '2027-12-01', 15,  datetime('now', '-18 days')),
('Açúcar Cristal (5kg)',                 'Temperos e Condimentos',   30, 'pct', 19.90, 'MN-2025-024', '2026-06-01', 10,  datetime('now', '-17 days')),
('Vinagre de Álcool (750ml)',            'Temperos e Condimentos',   25, 'un',  3.90,  'MN-2025-025', '2026-08-01', 10,  datetime('now', '-17 days')),

-- Padaria e Confeitaria
('Pão de Forma Integral (500g)',         'Padaria e Confeitaria',    20, 'pct', 8.90,  'MN-2025-026', '2025-02-14', 10,  datetime('now', '-16 days')),
('Biscoito Cream Cracker (400g)',        'Padaria e Confeitaria',    60, 'pct', 5.50,  'MN-2025-027', '2025-07-01', 20,  datetime('now', '-16 days')),

-- Hortifruti (congelados/desidratados)
('Batata Palito Congelada (2kg)',        'Congelados',               40, 'pct', 16.90, 'MN-2025-028', '2025-08-01', 15,  datetime('now', '-15 days')),
('Seleta de Legumes Congelada (1kg)',    'Congelados',               35, 'pct', 12.50, 'MN-2025-029', '2025-07-15', 12,  datetime('now', '-15 days')),

-- Limpeza e Descartáveis
('Copo Descartável 200ml (100un)',       'Limpeza e Descartáveis',   50, 'pct', 6.90,  'MN-2025-030', '2027-12-31', 15,  datetime('now', '-14 days'));
