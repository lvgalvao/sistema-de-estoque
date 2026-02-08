const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const DB_DIR = path.join(__dirname, '..', 'data');
const DB_PATH = path.join(DB_DIR, 'almoxarifado.db');
const SCHEMA_PATH = path.join(__dirname, 'schema.sql');
const SEED_ITENS_PATH = path.join(__dirname, '..', 'scripts', 'seed_itens.sql');
const SEED_MOVIMENTACOES_PATH = path.join(__dirname, '..', 'scripts', 'seed_movimentacoes.sql');

let db;

function getDb() {
  if (!db) {
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }
    db = new Database(DB_PATH);
    db.pragma('journal_mode = WAL');
    db.pragma('foreign_keys = ON');
    initDb();
  }
  return db;
}

function initDb() {
  const schema = fs.readFileSync(SCHEMA_PATH, 'utf-8');
  db.exec(schema);

  // Seed com dados de exemplo se o banco estiver vazio
  const count = db.prepare('SELECT COUNT(*) as total FROM itens').get();
  if (count.total === 0) {
    console.log('Banco vazio — inserindo dados de exemplo...');
    const seedItens = fs.readFileSync(SEED_ITENS_PATH, 'utf-8');
    const seedMovimentacoes = fs.readFileSync(SEED_MOVIMENTACOES_PATH, 'utf-8');
    db.exec(seedItens);
    db.exec(seedMovimentacoes);
    console.log('Seed concluído.');
  }
}

module.exports = { getDb };
